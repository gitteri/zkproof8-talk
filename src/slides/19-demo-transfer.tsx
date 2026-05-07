import { SlideEyebrow, SlideFrame, SlideTitle } from "@/components/SlideFrame";

const primitiveAsks = [
  {
    title: "Smaller range proofs",
    body: "Payment UX improves when hidden amounts get cheaper to prove and verify.",
  },
  {
    title: "Threshold auditor keys",
    body: "Issuer-scale disclosure should be controlled by committees with rotation.",
  },
  {
    title: "Bounded balance reads",
    body: "Encrypted balances still need fast, reliable owner-side decryption.",
  },
];

const systemAsks = [
  {
    title: "Programmable disclosure",
    body: "Predicate proofs for thresholds, windows, and policy checks.",
  },
  {
    title: "Encrypted composability",
    body: "AMMs, bridges, oracles, and lending without reveal-and-re-shield loops.",
  },
  {
    title: "Account UX standards",
    body: "Receiving, recovery, statements, and reconciliation that feel boring.",
  },
];

export function Slide19DemoTransfer() {
  return (
    <SlideFrame align="start">
      <div className="flex h-full w-full flex-col gap-8">
        <div className="space-y-4">
          <SlideEyebrow>Questions</SlideEyebrow>
          <SlideTitle size="lg">Open problems for this room</SlideTitle>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-6">
          <AskColumn title="Primitives" asks={primitiveAsks} tone="green" />
          <AskColumn title="Systems" asks={systemAsks} tone="purple" />
        </div>

        <p className="max-w-[80ch] font-sans text-deck-base text-bone">
          If your next paper or prototype attacks one of these, payment
          companies have a reason to care.
        </p>
      </div>
    </SlideFrame>
  );
}

function AskColumn({
  title,
  asks,
  tone,
}: {
  title: string;
  asks: { title: string; body: string }[];
  tone: "green" | "purple";
}) {
  const border = tone === "green" ? "border-sol-green/40" : "border-sol-purple/40";
  const bg = tone === "green" ? "bg-sol-green/5" : "bg-sol-purple/5";
  return (
    <div className={`rounded-md border p-6 ${border} ${bg}`}>
      <div className="font-mono text-deck-xs uppercase text-bone-mute">
        {title}
      </div>
      <div className="mt-5 flex flex-col gap-4">
        {asks.map((ask) => (
          <div key={ask.title} className="border-t border-ink-line pt-4">
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
  );
}
