import { SlideEyebrow, SlideFrame, SlideTitle } from "@/components/SlideFrame";

const hurdles = [
  {
    title: "Ecosystem adoption",
    body: "Wallets, exchanges, custodians, and indexers all have to learn a new account shape. Standards work is in progress; coverage is not yet uniform.",
    detail: "Token Extensions support across the stack is the gating item.",
  },
  {
    title: "Transaction sizes",
    body: "Equality, ciphertext-validity, and range proofs do not fit in one transaction. They go in proof context state accounts: create, reference, close.",
    detail: "A confidential transfer is 4 transactions on the wire today.",
  },
  {
    title: "Composability",
    body: "Programs that need to read amounts (AMMs, lending, oracles) cannot read encrypted balances directly. Most flows reveal at the boundary, then re-shield.",
    detail: "Encrypted-input composability is an open problem.",
  },
];

export function Slide09DemoKeyDerivation() {
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
