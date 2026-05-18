# Cryptography on Solana, May 2026

Most takes on what cryptographic primitives Solana supports are 18 months stale. The official syscall reference page lists everything that has a feature gate, regardless of whether the gate has actually fired on mainnet, which makes it easy to over-claim. The Agave feature gate tracker is the source of truth, but it's organized around upcoming SIMDs rather than a current-state table.

This article is the table I wish existed: what's live on mainnet today, what's landing in the next two Agave releases, what's already usable on-chain via BPF programs without protocol changes, and what's still genuinely open work.

The headline most people miss: post-quantum signatures are already deployable on Solana. Today. Without consensus changes.

## Post-quantum is already on-chain

Two PQ signature schemes are usable on Solana right now via BPF programs. They are not native syscalls, they are not part of consensus, but they are deployed code you can compose with.

**Winternitz / WOTS+** is hash-based one-time signatures. The current recommended implementation is [blueshift-gg/winterwallet](https://github.com/blueshift-gg/winterwallet), an end-to-end implementation by Dean Little that supersedes his earlier `solana-winternitz-vault` repo. Each withdrawal consumes the current Winternitz key and derives the next one from a pre-committed hash chain, so users have to actively manage key exhaustion. At the current 1232-byte transaction limit it inherits about 196 bits of post-quantum security; once Solana lifts the tx size to 4kb (in flight), the same construction inherits the full 256 bits.

**Falcon-512 (FN-DSA)** is lattice-based. [blueshift-gg/solana-falcon512](https://github.com/blueshift-gg/solana-falcon512) is an SVM-optimized BPF verifier that checks a Falcon-512 signature in under 200,000 compute units. That's well inside the per-instruction CU budget. Zero protocol changes required. You can deploy a program that gates withdrawals on a Falcon signature today.

This is a different conversation than the consensus-level migration. The Anza team has a published three-step plan for moving Solana itself to post-quantum sigs (research, then PQ for new wallets, then migrate existing wallets) and the Firedancer team has an optimized native Falcon verifier 2 to 3 times faster than the reference implementation, which will eventually become a syscall. But individual users and applications don't have to wait. The BPF route is real, and it's available now.

The threat model that still matters: Token-2022 confidential balances rest on Curve25519 (Ristretto + Edwards + ElGamal), which is pre-quantum. Encrypted balances on chain are subject to harvest-now-decrypt-later. The PQ migration story for confidential payloads (re-encryption schemes, lattice-based ElGamal analogs) is still open research.

## SNARK verification is already in production

The `sol_alt_bn128_group_op` syscall has been live since v1.17. It exposes G1 add, G1 scalar multiplication, and the pairing check on BN254. With those three operations you can verify any pairing-based SNARK that works over BN254: Groth16, Plonk, KZG-based commitments, you name it.

This is not theoretical. Light Protocol's ZK Compression verifies Groth16 proofs inside Solana programs in production, at scale, on mainnet. The compressed account state that Helius and others rely on for cheap NFTs and indexing is enabled by this primitive.

A few caveats. G2 add and G2 scalar multiplication are not yet exposed as syscalls; SIMD-0302 fills that gap and lands with Agave v4.0.0-beta.0. Most pairing-based SNARK verifiers don't actually need standalone G2 ops because the pairing check itself takes G1 and G2 inputs and operates on both; G1 ops cover preprocessing on the prover's side. Point compression, on the other hand, has covered both G1 and G2 since v1.17, so deserialization of compressed proofs Just Works.

What this also means: BLS12-381 SNARKs (Halo2-on-BLS, Plonk-on-BLS) need to wait. Those start working when SIMD-0388 activates, which is currently rolling out as part of Agave v4.0 (see below).

## The ZK ElGamal Proof Program

The ZK ElGamal Proof Program (`ZkE1Gama1Proof11111111111111111111111111111`) is a native program that verifies 13 fixed sigma protocol shapes: pubkey validity, ciphertext-ciphertext equality, ciphertext-commitment equality, batched range proofs (U64, U128, U256), grouped ciphertext validity (2 and 3 handles, batched and unbatched), zero-ciphertext, percentage-with-cap, and close-context-state.

The interesting design choice is the *verify-into-context-state-account* pattern. Most chains either inline the proof bytes in the transaction (and hit the tx size limit immediately) or require an off-chain verifier that the chain has to trust. Solana threads the needle: you submit a proof in one transaction, the program verifies it and writes the verification result into a context-state account, and a later transaction references that account by address as evidence the proof checked out. The downstream consumer doesn't need to re-verify or even understand the proof. When the work is done you close the context state and recover the rent.

Token-2022 confidential balances use this pattern in production. A confidential transfer involves three proofs (equality, ciphertext validity, range) plus the actual transfer instruction, which collectively don't fit in a single Solana transaction. The bypass-mode flow pre-verifies each proof into a context-state account, then the transfer instruction references the three accounts and runs.

There's an open question worth flagging: the program is hardcoded to those 13 protocols. New confidentiality constructions need either a hard-fork SIMD per protocol or to live entirely in BPF (which is fine for some sigma protocols but loses the tx-size escape hatch). A general-purpose programmable sigma verifier inside the CU budget is one of the more interesting research targets.

## The boring foundation

Three families of primitives that don't get a headline but underpin everything above.

**Hashes**: `sol_sha256`, `sol_keccak256`, and `sol_poseidon`. The Poseidon one matters for ZK work and has been a syscall since v1.17. ZK Compression's Merkle tree paths use it. The official syscall reference page also lists `sol_blake3` but the gate has not been activated on mainnet, so don't rely on it. Same story for `sol_big_mod_exp` (Modular exponentiation in the EVM precompile shape).

**Curves and signatures**: `sol_secp256k1_recover` for ECDSA recovery, plus the full Curve25519 stack: `sol_curve_validate_point`, `sol_curve_group_op` (add, sub, mul on Edwards and Ristretto), and `sol_curve_multiscalar_mul` for MSM. The MSM syscall is what makes twisted ElGamal, Pedersen commitments, and sigma protocols cheap enough to do per transfer. On the precompile side, the Ed25519 and Secp256k1 sigverify native programs handle batch signature verification at consensus speeds.

**Sigverify precompiles**: the two native programs at `Ed25519SigVerify111111111111111111111111111` and `KeccakSecp256k11111111111111111111111111111` give you batch verification for both signature schemes in one instruction. They're the canonical way for higher-layer programs to validate large batches of off-chain attestations.

## Coming with Agave v4.0

Agave v4.0 is rolling out as I write this and brings a cluster of cryptographically interesting changes:

**SIMD-0388, BLS12-381 syscalls**: G1, G2, and pairing operations on BLS12-381. This is the consensus-critical primitive for Alpenglow, since Alpenglow's BLS aggregate signatures are how Solana shifts finality from ~12 seconds to ~150ms. It also unlocks BLS12-381-based SNARK verifiers on chain at 128-bit security, which BN254 doesn't reach (BN254 lands closer to 100 bits depending on how you measure).

**SIMD-0302, alt_bn128 G2 add and mul**: completes the BN254 group operations. Pairing already works because pairing inherently uses both groups, and compression already covers G1 and G2; this just rounds out the G2 prep ops.

**ZK ElGamal Proof Program re-enable**: the program was disabled during sigma-protocol audits and returns in v4.0 with the v6.0.1 wire format.

The net effect is roughly: BLS-based identity and consensus protocols become natively cheap, and 128-bit SNARKs become viable in addition to the 100-bit ones.

## Coming with Agave v4.1

A `sha512` syscall arrives in v4.1.

This sounds boring but it's a quality-of-life win. SHA-512 shows up in a surprising number of places: Ed25519's internal hash is SHA-512, FN-DSA's hash modes lean on it, and various Bitcoin-adjacent protocols rely on it. Today, programs that need SHA-512 have to ship their own implementation in BPF, which costs CUs and audit surface. Once the syscall lands, those programs save real money and audit time.

## What's still genuinely open

The gaps that aren't tracked by any in-flight SIMD as of May 2026:

**Folding-scheme verifiers**. Nova, ProtoStar, and HyperNova all amortize verification cost beautifully across many statements, which is exactly the property a high-throughput chain wants. But the on-chain verifier for any of them doesn't fit the per-instruction CU budget without a dedicated syscall or precompile. This is the most directly impactful research target.

**A programmable sigma-protocol verifier**. The ZK ElGamal Proof Program is hardcoded to 13 protocols. New confidentiality constructions either need a SIMD per protocol or have to live entirely in BPF. A small VM for sigma circuits (along the lines of a Schnorr-style protocol DSL) would let new protocols ship without consensus changes.

**ZK-friendly hashes beyond Poseidon**. Tip5, Anemoi, Reinforced Concrete, and Vision are faster than Poseidon for STARKs and AIR-style arithmetization. Poseidon is the only ZK-friendly hash with a syscall today. Whether to standardize a second is a real question.

**Encrypted-state composability**. Confidential balances live in Token-2022 extensions, but most DeFi protocols don't yet handle extensions properly. CPI-based composability assumes accounts are readable, which is false under encryption. Lending, staking, and AMM constructions over confidential balances are open design problems.

## How to verify any of this

The Solana docs page at [solana.com/docs/core/programs/syscall-reference](https://solana.com/docs/core/programs/syscall-reference) lists every syscall that has a feature gate. It does not distinguish activated gates from dormant ones. `sol_blake3` and `sol_big_mod_exp` are both listed as "feature-gated" syscalls, but neither has been activated on mainnet. If you write code against either, your program will fail to load.

The authoritative live-status source is the [Agave Feature Gate Tracker](https://github.com/anza-xyz/agave/wiki/Feature-Gate-Tracker-Schedule). It's organized around upcoming activations rather than a complete current-state table, but it's the single best place to verify that a feature you're depending on is actually on. Cross-check with [simd.watch](https://simd.watch) for live activation slots.

The third source is asking someone who works on this directly. I got several of these wrong on first pass and Dean Little corrected them in a few minutes. The community is small enough that this works.

## What this means for builders

If you're picking a chain for a ZK protocol and skipping Solana on the assumption that the primitives aren't there, the assumption is wrong. Groth16 verification works in production. Poseidon is a syscall. The full Curve25519 stack including MSM is a syscall. There is a native sigma-protocol verifier serving real Token-2022 traffic. BLS12-381 lands this month. PQ signatures are deployable today via BPF.

The genuinely open work is fairly narrow and well-defined: folding-scheme verifiers, programmable sigma, encrypted-state composability, post-quantum support for confidential payloads. These are all good research targets and most of them don't require consensus changes.

I'm giving the long version of this at zkproof8 in Rome, with a focus on Token-2022 confidential balances as the worked example.
