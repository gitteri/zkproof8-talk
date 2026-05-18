import { SlideEyebrow, SlideFrame, SlideTitle } from "@/components/SlideFrame";

const asks = [
  {
    title: "Private trading",
    body: "Sealed orders, threshold decryption at fill, MEV-resistant matching engines.",
  },
  {
    title: "Programmable encrypted state",
    body: "selective homomorphic ops, encrypted state transitions, threshold decryption.",
  },
  {
    title: "Aggregation primitives",
    body: "Folding, IPA, sumcheck. Batched confidential updates.",
  },
  {
    title: "Hybrid stacks",
    body: "TEE, MPC, and ZK combined. Pure cryptographic privacy is often too slow for Solana's latency target.",
  },
  {
    title: "Private composability",
    body: "AMMs, lending, liquidation under encryption.",
  },
];

export function Slide16OpenProblems() {
  return (
    <SlideFrame align="start">
      <div className="flex h-full w-full flex-col gap-6">
        <div className="space-y-3">
          <SlideEyebrow>Questions</SlideEyebrow>
          <SlideTitle size="lg">Open problems for this room</SlideTitle>
        </div>

        <div className="grid flex-1 grid-cols-[1fr_2fr] gap-6">
          <div className="flex flex-col rounded-md border border-sol-green/40 bg-sol-green/5 p-6">
            <div className="font-mono text-deck-xs uppercase text-sol-green">
              Goals
            </div>
            <p className="mt-4 font-sans text-deck-base font-semibold text-bone leading-snug">
              Solana optimizes for reduced onchain state and computation complexity.
              The ecosystem is prioritizing privacy and composibility with these constraints.
            </p>
          </div>

          <div className="grid grid-cols-2 grid-rows-3 gap-3">
            {asks.map((ask) => (
              <div
                key={ask.title}
                className="rounded-md border border-sol-purple/40 bg-sol-purple/5 p-5"
              >
                <div className="font-sans text-deck-base font-semibold text-bone">
                  {ask.title}
                </div>
                <p className="mt-2 font-sans text-deck-sm text-bone-dim">
                  {ask.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
