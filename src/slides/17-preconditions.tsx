import { SlideEyebrow, SlideFrame, SlideTitle } from "@/components/SlideFrame";

const gates = [
  {
    label: "Custody",
    body: "Encryption keys have recovery, rotation, and policy controls.",
  },
  {
    label: "Audit ops",
    body: "Disclosure is operationally useful, not just cryptographically possible.",
  },
  {
    label: "Performance",
    body: "Proof size and verification cost fit payment latency and fee budgets.",
  },
  {
    label: "Integrations",
    body: "Wallets, ledgers, ERP systems, and processors can reconcile accounts.",
  },
];

export function Slide17Preconditions() {
  return (
    <SlideFrame align="start">
      <div className="flex h-full w-full flex-col gap-10">
        <div className="space-y-4">
          <SlideEyebrow>Adoption</SlideEyebrow>
          <SlideTitle>What has to be true before traffic moves</SlideTitle>
        </div>

        <div className="grid flex-1 grid-cols-4 gap-4">
          {gates.map((gate) => (
            <div
              key={gate.label}
              className="flex flex-col justify-between rounded-md border border-sol-green/40 bg-sol-green/5 p-6"
            >
              <div className="font-sans text-deck-base font-semibold text-bone">
                {gate.label}
              </div>
              <p className="mt-5 font-sans text-deck-sm text-bone-dim">
                {gate.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
