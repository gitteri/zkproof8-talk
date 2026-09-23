import { SlideEyebrow, SlideFrame, SlideTitle } from "@/components/SlideFrame";

const hurdles = [
  {
    title: "Ecosystem adoption",
    body: "Issuers, wallets, exchanges, and indexers all have to learn a new account shape. Standards work is in progress; coverage is not yet uniform.",
    detail: "Token Extensions support across the stack is the gating item.",
  },
  {
    title: "Transaction sizes",
    body: "The three transfer proofs total ~1.9 KB, above the 1232-byte legacy transaction limit. The v1 format raises the limit to 4096 bytes, so a transfer with inline proofs is a single transaction.",
    detail: "v1 is live on mainnet; most client tooling still emits legacy txs.",
  },
  {
    title: "Composability",
    body: "Programs that need to read amounts (AMMs, lending, oracles) cannot read encrypted balances directly. Most flows reveal at the boundary, then re-shield.",
    detail: "Encrypted-input composability is an open problem.",
  },
];

export function Slide10AdoptionHurdles() {
  return (
    <SlideFrame align="start">
      <div className="flex h-full w-full flex-col gap-10">
        <div className="space-y-4">
          <SlideEyebrow>Deployment</SlideEyebrow>
          <SlideTitle>Adoption hurdles</SlideTitle>
        </div>

        <div className="grid flex-1 grid-cols-3 gap-4">
          {hurdles.map((hurdle) => (
            <div
              key={hurdle.title}
              className="flex flex-col justify-between rounded-md border border-ink-line bg-ink-softer/40 p-6 hairline"
            >
              <div>
                <div className="font-sans text-deck-base font-semibold text-bone">
                  {hurdle.title}
                </div>
                <p className="mt-4 font-sans text-deck-sm text-bone-dim">
                  {hurdle.body}
                </p>
              </div>
              <p className="mt-8 font-mono text-deck-xs uppercase text-bone-mute">
                {hurdle.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
