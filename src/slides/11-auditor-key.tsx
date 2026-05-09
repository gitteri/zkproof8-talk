import { SlideEyebrow, SlideFrame, SlideTitle } from "@/components/SlideFrame";

const gives = [
  "Mint-level decryption of every transfer amount",
  "Issuer-side suspicious activity review",
  "Compliance story that full anonymity cannot offer",
];

const stillNeed = [
  "Internal selective disclosure protocol (per-counterparty, per-transaction)",
  "Regulatory clarity on auditor scope, retention, and chain of custody",
  "Long-term key management story (rotation, threshold control, revocation)",
];

export function Slide11AuditorKey() {
  return (
    <SlideFrame align="start">
      <div className="flex h-full w-full flex-col gap-8">
        <div className="space-y-3">
          <SlideEyebrow>Deployment</SlideEyebrow>
          <SlideTitle>Auditor key</SlideTitle>
        </div>

        <div className="grid flex-1 grid-cols-[1fr_0.9fr] gap-8">
          <div className="rounded-md border border-ink-line bg-ink-softer/40 p-7 hairline">
            <div className="grid grid-cols-3 items-center gap-5">
              <Block label="Sender" mono="enc(amount, pk_sender)" />
              <Arrow />
              <div className="flex flex-col gap-3">
                <Block label="Receiver" mono="enc(amount, pk_receiver)" />
                <Block label="Auditor" mono="enc(amount, pk_auditor)" accent />
              </div>
            </div>
            <p className="mt-7 font-mono text-deck-xs uppercase text-bone-mute">
              Grouped 3-handle validity proof: all three encrypt the same scalar.
            </p>
          </div>

          <div className="grid grid-rows-2 gap-4">
            <List title="What it gives" items={gives} tone="green" />
            <List title="Institutions still need" items={stillNeed} tone="purple" />
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function Block({
  label,
  mono,
  accent,
}: {
  label: string;
  mono: string;
  accent?: boolean;
}) {
  return (
    <div
      className={[
        "rounded border p-4",
        accent ? "border-sol-purple/60 bg-sol-purple/10" : "border-ink-line bg-ink",
      ].join(" ")}
    >
      <div className="font-mono text-deck-xs uppercase text-bone-mute">
        {label}
      </div>
      <code className="mt-2 block font-mono text-deck-sm text-bone">{mono}</code>
    </div>
  );
}

function Arrow() {
  return (
    <svg width="100%" height="18" viewBox="0 0 160 18" fill="none">
      <line
        x1="0"
        y1="9"
        x2="140"
        y2="9"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-bone-mute"
      />
      <polygon points="160,9 138,0 138,18" className="fill-bone-mute" />
    </svg>
  );
}

function List({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "green" | "purple";
}) {
  const dot = tone === "green" ? "bg-sol-green" : "bg-sol-purple";
  return (
    <div className="rounded-md border border-ink-line bg-ink-softer/40 p-5 hairline">
      <div className="font-mono text-deck-xs uppercase text-bone-mute">
        {title}
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 font-sans text-deck-sm text-bone"
          >
            <span className={`mt-2 h-2 w-2 flex-none rounded-full ${dot}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
