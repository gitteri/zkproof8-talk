import { SlideEyebrow, SlideFrame, SlideTitle } from "@/components/SlideFrame";

const mappings = [
  {
    primitive: "Twisted ElGamal encryption",
    paper: "Anza twisted-elgamal notes; Chen, Ma, Li",
    used: "Encrypts every balance and transfer amount",
    sdk: "solana_zk_sdk::encryption::elgamal",
  },
  {
    primitive: "Pedersen commitments",
    paper: "Pedersen 1991",
    used: "Hides amounts inside ElGamal ciphertexts and proof witnesses",
    sdk: "embedded in every ElGamal ciphertext",
  },
  {
    primitive: "Sigma protocols (Fiat-Shamir)",
    paper: "Schnorr 1989; Maurer 2009",
    used: "Pubkey validity, zero-ciphertext, equality",
    sdk: "PubkeyValidity, ZeroCiphertext, CiphertextCiphertextEquality",
  },
  {
    primitive: "Grouped multi-recipient validity",
    paper: "Sigma extension over grouped ciphertexts",
    used: "Sender + receiver + auditor encryptions match",
    sdk: "GroupedCiphertext3HandlesValidity",
  },
  {
    primitive: "Bulletproof range proofs",
    paper: "Bünz, Bootle, Boneh et al. 2018",
    used: "Hidden amount fits in [0, 2^64) — no negative spend",
    sdk: "BatchedRangeProofU64 / U128",
  },
];

const deploymentOnly = [
  "AES-GCM-SIV second ciphertext on every available balance — owner reads without solving DLP",
  "Proofs as sibling instructions in the same v1 transaction — 4096-byte limit fits all three",
  "ZK ElGamal Proof Program as a separate Solana program, CPI'd from Token-2022",
  "16-bit lo / 16-bit hi ElGamal split on pending balance for tractable u32 decryption",
];

export function Slide08ProtocolVsPaper() {
  return (
    <SlideFrame align="start">
      <div className="flex h-full w-full flex-col gap-6">
        <div className="space-y-2">
          <SlideEyebrow>Protocol</SlideEyebrow>
          <SlideTitle size="lg">Protocol vs paper</SlideTitle>
        </div>

        <div className="overflow-hidden rounded-md border border-ink-line hairline">
          <div className="grid grid-cols-[1.1fr_1.1fr_1.4fr_1.2fr] border-b border-ink-line bg-ink-softer/60 px-5 py-2.5 font-mono text-deck-xs uppercase text-bone-mute">
            <span>Primitive</span>
            <span>Paper</span>
            <span>Used for</span>
            <span>SDK</span>
          </div>
          {mappings.map((m, i) => (
            <div
              key={m.primitive}
              className={[
                "grid grid-cols-[1.1fr_1.1fr_1.4fr_1.2fr] gap-4 px-5 py-3 border-b border-ink-line last:border-b-0",
                i % 2 === 0 ? "bg-ink" : "bg-ink-softer/30",
              ].join(" ")}
            >
              <div className="font-sans text-deck-sm font-semibold text-bone">
                {m.primitive}
              </div>
              <div className="font-sans text-deck-sm text-bone-dim">
                {m.paper}
              </div>
              <div className="font-sans text-deck-sm text-bone">
                {m.used}
              </div>
              <code className="font-mono text-deck-xs text-bone-dim">
                {m.sdk}
              </code>
            </div>
          ))}
        </div>

        <div className="rounded-md border border-sol-magenta/40 bg-sol-magenta/5 px-6 py-5">
          <div className="font-mono text-deck-xs uppercase text-sol-magenta">
            Not in the papers
          </div>
          <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-1.5 font-sans text-deck-sm text-bone">
            {deploymentOnly.map((d) => (
              <li key={d} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-sol-magenta" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SlideFrame>
  );
}
