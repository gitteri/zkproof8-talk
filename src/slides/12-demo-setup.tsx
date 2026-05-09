import { SlideEyebrow, SlideFrame, SlideTitle } from "@/components/SlideFrame";

const steps = [
  "Configure mint and accounts",
  "Opt-in to confidential transfers",
  "Mint USDC to treasury account",
];

export function Slide12DemoSetup() {
  return (
    <SlideFrame align="start">
      <div className="flex h-full w-full flex-col gap-10">
        <div className="space-y-4">
          <SlideEyebrow>Demo</SlideEyebrow>
          <SlideTitle>Demo setup</SlideTitle>
        </div>

        <div className="grid flex-1 grid-cols-[0.95fr_1.05fr] gap-8">
          <div className="grid grid-rows-2 gap-4">
            <Mode
              title="Devnet"
              body="Live cluster running."
              active
            />
          </div>

          <div className="rounded-md border border-ink-line bg-ink-softer/40 p-6 hairline">
            <div className="font-mono text-deck-xs uppercase text-bone-mute">
              Setup Completed
            </div>
            <ol className="mt-5 grid grid-cols-2 gap-3">
              {steps.map((step, i) => (
                <li
                  key={step}
                  className="rounded border border-ink-line bg-ink px-4 py-3"
                >
                  <span className="font-mono text-deck-xs text-bone-mute">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1 font-sans text-deck-sm text-bone">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function Mode({
  title,
  body,
  active,
}: {
  title: string;
  body: string;
  active?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-md border p-6",
        active
          ? "border-sol-green/50 bg-sol-green/5"
          : "border-ink-line bg-ink-softer/40 hairline",
      ].join(" ")}
    >
      <div className="font-sans text-deck-lg font-semibold text-bone">
        {title}
      </div>
      <p className="mt-3 font-sans text-deck-base text-bone-dim">{body}</p>
    </div>
  );
}
