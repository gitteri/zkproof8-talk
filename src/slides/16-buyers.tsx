import { SlideEyebrow, SlideFrame, SlideTitle } from "@/components/SlideFrame";

const buyers = [
  {
    label: "Stablecoin issuers",
    examples: "USDC / USDG conversations, issuer ops",
    need: "private mint, burn, treasury, and processor movement",
  },
  {
    label: "Payment networks",
    examples: "cross-border and B2B rails",
    need: "settlement transparency without exposing commercial terms",
  },
  {
    label: "Treasury operators",
    examples: "corporates, market makers, custodians",
    need: "rebalance and stage capital without telegraphing strategy",
  },
];

export function Slide16Buyers() {
  return (
    <SlideFrame align="start">
      <div className="flex h-full w-full flex-col gap-10">
        <div className="space-y-4">
          <SlideEyebrow>Adoption</SlideEyebrow>
          <SlideTitle>Who&apos;s going to use this?</SlideTitle>
        </div>

        <div className="grid flex-1 grid-cols-3 gap-4">
          {buyers.map((buyer) => (
            <div
              key={buyer.label}
              className="flex flex-col justify-between rounded-md border border-ink-line bg-ink-softer/40 p-6 hairline"
            >
              <div>
                <div className="font-sans text-deck-base font-semibold text-bone">
                  {buyer.label}
                </div>
                <p className="mt-3 font-mono text-deck-xs uppercase text-bone-mute">
                  {buyer.examples}
                </p>
              </div>
              <p className="mt-8 font-sans text-deck-sm text-bone-dim">
                {buyer.need}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
