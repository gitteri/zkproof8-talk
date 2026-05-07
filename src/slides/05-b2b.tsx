import { SlideEyebrow, SlideFrame, SlideTitle } from "@/components/SlideFrame";

const rows = [
  {
    design: "Shielded UTXOs",
    best: "Graph privacy, anonymity sets, unlinkability",
    cost: "Note scanning, fragmentation, harder accounting and policy hooks",
  },
  {
    design: "Confidential accounts",
    best: "Treasury ops, custody, reconciliation, audit views",
    cost: "Account graph remains visible; metadata privacy is limited",
    target: true,
  },
  {
    design: "Plain token accounts",
    best: "Simple integration and composability",
    cost: "Balances and transfer amounts are public business intelligence",
  },
];

export function Slide05B2B() {
  return (
    <SlideFrame align="start">
      <div className="flex h-full w-full flex-col gap-10">
        <div className="space-y-4">
          <SlideEyebrow>Problem</SlideEyebrow>
          <SlideTitle>Why not UTXOs?</SlideTitle>
        </div>

        <div className="grid flex-1 grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="overflow-hidden rounded-md border border-ink-line bg-ink-softer/40 hairline">
            <div className="grid grid-cols-[0.8fr_1fr_1.1fr] border-b border-ink-line px-5 py-3 font-mono text-deck-xs uppercase text-bone-mute">
              <span>Design</span>
              <span>Best at</span>
              <span>Cost</span>
            </div>
            {rows.map((row) => (
              <div
                key={row.design}
                className={[
                  "grid grid-cols-[0.8fr_1fr_1.1fr] gap-4 border-b border-ink-line px-5 py-5 last:border-b-0",
                  row.target ? "bg-sol-green/5" : "",
                ].join(" ")}
              >
                <div className="font-sans text-deck-base font-semibold text-bone">
                  {row.design}
                </div>
                <div className="font-sans text-deck-sm text-bone">
                  {row.best}
                </div>
                <div className="font-sans text-deck-sm text-bone-dim">
                  {row.cost}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-5 rounded-md border border-sol-green/50 bg-sol-green/5 p-7">
            <div className="font-mono text-deck-xs uppercase text-sol-green">
              Constraint set
            </div>
            <ul className="flex flex-col gap-3 font-sans text-deck-base text-bone">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-sol-green" />
                <span>Account-based reconciliation, not note scanning</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-sol-green" />
                <span>Per-mint policy hooks (auditor, freeze, transfer hooks)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-sol-green" />
                <span>Recoverable identity tied to existing custody</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-sol-green" />
                <span>Compliance hooks at issuance, not retrofitted</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
