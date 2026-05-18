import { SlideEyebrow, SlideFrame, SlideTitle } from "@/components/SlideFrame";

type Tone = "green" | "purple" | "magenta";

interface Block {
  head: string;
  body: string[];
}

interface Stage {
  label: string;
  where: string;
  tone: Tone;
  blocks: Block[];
}

const stages: Stage[] = [
  {
    label: "Prover",
    where: "client · solana_zk_sdk",
    tone: "green",
    blocks: [
      {
        head: "witness",
        body: ["m  amount", "r  randomness", "sk_s, AES key"],
      },
      {
        head: "statement",
        body: ["pk_s, pk_r, pk_a", "ct_balance under pk_s"],
      },
      {
        head: "encrypt",
        body: [
          "C   = g^m · h^r",
          "D_s = pk_s^r",
          "D_r = pk_r^r,  D_a = pk_a^r",
        ],
      },
      {
        head: "prove",
        body: [
          "π_val  Σ  3-handle validity",
          "π_eq   Σ  cipher ↔ cipher",
          "π_rng  IPA  m ∈ [0, 2^128)",
        ],
      },
    ],
  },
  {
    label: "ZK ElGamal Proof Program",
    where: "onchain · native program",
    tone: "purple",
    blocks: [
      {
        head: "verify",
        body: [
          "✓ Schnorr   π_val",
          "✓ Schnorr   π_eq",
          "✓ Bulletproof IPA   π_rng",
        ],
      },
      {
        head: "pin",
        body: [
          "context accounts ←",
          "{ C, D_s, D_r, D_a }",
          "(public inputs only)",
        ],
      },
      {
        head: "no balance logic",
        body: ["math claims only", "reusable beyond Token-2022"],
      },
    ],
  },
  {
    label: "Token-2022 transfer",
    where: "onchain · token program",
    tone: "magenta",
    blocks: [
      {
        head: "bind",
        body: ["pinned cts == tx cts", "auditor handle if required"],
      },
      {
        head: "apply (homomorphic)",
        body: [
          "sender.balance ⊟ ct_s",
          "receiver.pending ⊞ ct_r",
          "pending counter ++",
        ],
      },
      {
        head: "guards",
        body: ["auth · freeze · mint policy"],
      },
    ],
  },
];

export function Slide09ProofFlow() {
  return (
    <SlideFrame align="start">
      <div className="flex h-full w-full flex-col gap-6">
        <div className="space-y-2">
          <SlideEyebrow>Protocol</SlideEyebrow>
          <SlideTitle size="lg">Proof flow</SlideTitle>
        </div>

        <div className="grid flex-1 grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-3">
          <Lane stage={stages[0]} />
          <Chevron tone="purple" label="tx + proof ctx accts" />
          <Lane stage={stages[1]} />
          <Chevron tone="magenta" label="pinned context" />
          <Lane stage={stages[2]} />
        </div>

        <p className="font-mono text-deck-xs uppercase text-bone-mute">
          witness stays client-side · only public inputs and proofs cross the
          wire · only ciphertexts and balance updates land in state
        </p>
      </div>
    </SlideFrame>
  );
}

function Lane({ stage }: { stage: Stage }) {
  const accent =
    stage.tone === "green"
      ? "border-sol-green/50 bg-sol-green/5"
      : stage.tone === "purple"
        ? "border-sol-purple/50 bg-sol-purple/5"
        : "border-sol-magenta/40 bg-sol-magenta/5";
  const headColor =
    stage.tone === "green"
      ? "text-sol-green"
      : stage.tone === "purple"
        ? "text-sol-purple"
        : "text-sol-magenta";
  return (
    <div className={`flex flex-col rounded-md border p-4 ${accent}`}>
      <div className={`font-mono text-deck-xs uppercase ${headColor}`}>
        {stage.where}
      </div>
      <div className="mt-1 font-sans text-deck-base font-semibold text-bone">
        {stage.label}
      </div>
      <div className="mt-3 flex flex-1 flex-col gap-3">
        {stage.blocks.map((b) => (
          <div
            key={b.head}
            className="rounded border border-ink-line bg-ink/40 px-3 py-2"
          >
            <div className="font-mono text-deck-xs uppercase text-bone-mute">
              {b.head}
            </div>
            <ul className="mt-1 space-y-0.5 font-mono text-deck-xs text-bone">
              {b.body.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function Chevron({ tone, label }: { tone: Tone; label: string }) {
  const color =
    tone === "purple" ? "text-sol-purple" : "text-sol-magenta";
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-1">
      <svg width="20" height="36" viewBox="0 0 20 36" fill="none">
        <path
          d="M2 4 L16 18 L2 32"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={color}
        />
      </svg>
      <div
        className={`max-w-[7rem] text-center font-mono text-[0.65rem] uppercase leading-tight ${color}`}
      >
        {label}
      </div>
    </div>
  );
}
