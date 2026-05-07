import { SlideEyebrow, SlideFrame, SlideTitle } from "@/components/SlideFrame";

const views = [
  {
    title: "Public chain",
    body: "Accounts, mints, instructions, and ciphertexts remain visible.",
    accent: "border-sol-magenta/50 bg-sol-magenta/5",
  },
  {
    title: "Owners",
    body: "Sender and receiver decrypt their own balances and statements.",
    accent: "border-sol-green/50 bg-sol-green/5",
  },
  {
    title: "Auditor",
    body: "A configured auditor key can decrypt transfer amounts for the mint.",
    accent: "border-sol-purple/50 bg-sol-purple/5",
  },
];

export function Slide06DemoProtocol() {
  return (
    <SlideFrame align="start">
      <div className="flex h-full w-full flex-col gap-10">
        <div className="space-y-4">
          <SlideEyebrow>Protocol</SlideEyebrow>
          <SlideTitle>Confidential transfers at a glance</SlideTitle>
        </div>

        <div className="grid flex-1 grid-cols-[1fr_0.6fr_1fr] items-center gap-8">
          <Account label="Treasury" balance="enc(1,250,000)" />
          <div className="flex flex-col items-center gap-4">
            <div className="font-mono text-deck-xs uppercase text-bone-mute">
              transfer
            </div>
            <Arrow />
            <div className="rounded border border-sol-green/40 bg-sol-green/5 px-4 py-2 font-mono text-deck-xs uppercase text-sol-green">
              amount hidden
            </div>
          </div>
          <Account label="Vendor" balance="enc(250,000)" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {views.map((view) => (
            <div
              key={view.title}
              className={`rounded-md border p-5 ${view.accent}`}
            >
              <div className="font-mono text-deck-xs uppercase text-bone-mute">
                {view.title}
              </div>
              <p className="mt-2 font-sans text-deck-sm text-bone">
                {view.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

function Account({ label, balance }: { label: string; balance: string }) {
  return (
    <div className="rounded-md border border-ink-line bg-ink-softer/40 p-7 hairline">
      <div className="font-mono text-deck-xs uppercase text-bone-mute">
        token account
      </div>
      <div className="mt-3 font-sans text-deck-lg font-semibold text-bone">
        {label}
      </div>
      <code className="mt-8 block font-mono text-deck-base text-bone-dim">
        {balance}
      </code>
    </div>
  );
}

function Arrow() {
  return (
    <svg width="180" height="26" viewBox="0 0 180 26" fill="none">
      <line
        x1="4"
        y1="13"
        x2="162"
        y2="13"
        stroke="currentColor"
        strokeWidth="2"
        className="text-sol-green"
      />
      <polygon points="180,13 158,2 158,24" className="fill-sol-green" />
    </svg>
  );
}
