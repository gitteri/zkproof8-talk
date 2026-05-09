import { SlideEyebrow, SlideFrame, SlideTitle } from "@/components/SlideFrame";

const leaks = [
  {
    label: "Cross-border settlement",
    body: "Corridor volumes, FX positioning, and per-transfer amounts visible to anyone watching the ledger.",
  },
  {
    label: "Stablecoin mint and burn",
    body: "Issuer working capital and processor settlement flows readable in real time.",
  },
  {
    label: "Payroll and vendor payments",
    body: "Salary bands, supplier terms, and contracted discounts exposed in transfer history.",
  },
  {
    label: "Treasury rebalancing",
    body: "Liquidity provisioning between custodians and regions reveals strategy before execution.",
  },
  {
    label: "Interbank settlement",
    body: "Counterparty pairs and amounts visible to competitors and chain analysts.",
  },
];

const rails = [
  { rail: "ACH", confidential: true },
  { rail: "SWIFT", confidential: true },
  { rail: "Card networks", confidential: true },
  { rail: "Public chains today", confidential: false },
];

export function Slide05PublicAmounts() {
  return (
    <SlideFrame align="start">
      <div className="flex h-full w-full flex-col gap-6">
        <div className="space-y-3">
          <SlideEyebrow>Problem</SlideEyebrow>
          <SlideTitle size="lg">Public amounts leak business strategy</SlideTitle>
        </div>

        <div className="grid flex-1 grid-cols-[1.4fr_1fr] gap-8">
          <ul className="flex flex-col gap-2.5">
            {leaks.map((leak) => (
              <li
                key={leak.label}
                className="rounded-md border border-ink-line bg-ink-softer/40 px-5 py-3 hairline"
              >
                <div className="font-sans text-deck-base font-semibold text-bone">
                  {leak.label}
                </div>
                <p className="mt-1 font-sans text-deck-sm text-bone-dim">
                  {leak.body}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 rounded-md border border-ink-line bg-ink-softer/40 p-6 hairline">
            <div className="font-mono text-deck-xs uppercase text-bone-mute">
              Counterparty visibility
            </div>
            {rails.map((row) => (
              <div
                key={row.rail}
                className="flex items-baseline justify-between border-t border-ink-line pt-3 first:border-t-0 first:pt-0"
              >
                <span className="font-sans text-deck-base text-bone">
                  {row.rail}
                </span>
                <span
                  className={[
                    "font-mono text-deck-xs uppercase",
                    row.confidential ? "text-sol-green" : "text-sol-magenta",
                  ].join(" ")}
                >
                  {row.confidential ? "amounts hidden" : "amounts public"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
