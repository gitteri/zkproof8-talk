# Twitter thread: Cryptography on Solana

Image: cryptography-map.html (open and screenshot at 1600x900) attached to post 1.

Thread is ordered by impact, not by reading the map clockwise. Strongest hooks first.

---

**1/**

What ZK actually ships on Solana, May 2026.

Most takes on this are 18+ months stale. Here's the real map: what's live, what's pending, what's still open, and why the post-quantum story is way ahead of where most people think.

🧵

[map image]

---

**2/ Post-quantum is not theoretical**

Solana has post-quantum signatures usable on-chain TODAY via BPF programs. No protocol changes needed.

Winternitz / WOTS+ via https://github.com/blueshift-gg/winterwallet
Falcon-512 via https://github.com/blueshift-gg/solana-falcon512 (verifies under 200k CUs)

You can opt into PQ protection right now.

---

**3/ Groth16 is already in production**

The alt_bn128 (BN254) pairing check is a syscall. Groth16, KZG, and Plonk verifiers all run on chain inside the CU budget.

Light Protocol verifies Groth16 inside Solana programs in production. That's the foundation for ZK Compression.

---

**4/ The ZK ElGamal Proof Program**

A native program that verifies 13 sigma protocol shapes: pubkey validity, ciphertext-commitment equality, batched range proofs, grouped ciphertext validity, and more.

The interesting bit: verify-into-context-state-account. Pre-verify a proof, reference it later. Solves the "proof too big for one tx" problem in a Solana-native way.

---

**5/ Hashes**

sha256, keccak256, and Poseidon are all live syscalls.

Yes, Poseidon. The ZK-friendly one. Been a syscall since v1.17.

---

**6/ Curves**

Curve25519 isn't just for Ed25519 sigs. Solana exposes Ristretto + Edwards group ops plus MSM as syscalls.

That's why twisted ElGamal, Pedersen commitments, and sigma protocols are cheap enough to do per transfer.

---

**7/ Coming with Agave v4.0**

BLS12-381 syscalls (SIMD-0388): BLS aggregation for Alpenglow consensus, plus 128-bit SNARK verifiers on chain.

alt_bn128 G2 add/mul (SIMD-0302): completes BN254 group ops.

ZK ElGamal Proof Program re-enables.

Rolling out the next few weeks.

---

**8/ Coming with Agave v4.1**

A sha512 syscall.

Small change, big quality-of-life win. Plenty of crypto stacks need SHA-512 internals (Ed25519, FN-DSA hashing modes) and currently have to roll their own in BPF.

---

**9/ What's still genuinely open**

Folding-scheme verifiers (Nova, ProtoStar, HyperNova) inside the CU budget.

A programmable sigma verifier so new constructions don't need a hard fork per protocol.

Newer ZK-friendly hashes (Tip5, Anemoi, Reinforced Concrete).

Encrypted-state composability across programs.

Real research targets.

---

**10/ Sources**

Live syscall list: https://solana.com/docs/core/programs/syscall-reference

Feature gate tracker: https://github.com/anza-xyz/agave/wiki/Feature-Gate-Tracker-Schedule

Note: the docs page lists feature-gated syscalls without distinguishing activated from dormant. Cross-check with the tracker before relying on something.

I'm giving the long version of this at zkproof8 in Rome.

---

## Alternate hooks for post 1

Pick whichever fits the moment:

- **PQ-led**: "Most people don't realize Solana already has post-quantum signatures running on-chain. No protocol changes needed."
- **Skeptic-flip**: "If you still think Solana doesn't have ZK primitives, this is for you."
- **Direct**: "What ZK actually ships on Solana, May 2026. Most takes on this are 18+ months stale."
- **Builder-pitch**: "If you're building a ZK protocol and skipping Solana because of perceived primitive gaps, read this."

## Alternate close for post 10

Pick one:

- **CTA to talk**: "Long version of this at zkproof8 Rome next week."
- **CTA to discuss**: "What's missing from this map that you'd want next?"
- **Drop entirely**: just leave it at the sources, don't self-promote.

## Notes

- Post 2 is the strongest hook for engagement. PQ-on-Solana-today is a contrarian fact most people won't expect.
- Post 3 is the second strongest. Groth16-in-production via Light Protocol surprises people who don't follow ZK Compression.
- Post 4 (verify-into-context-state-account) is a Solana-specific design pattern worth socializing in any audience that does crypto.
- Posts 5-6 are easy reads to keep momentum.
- Posts 7-8 are the news (v4.0, v4.1).
- Post 9 reframes for researchers / academics.
