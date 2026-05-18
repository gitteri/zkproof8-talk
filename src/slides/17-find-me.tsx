import { SlideEyebrow, SlideFrame } from "@/components/SlideFrame";

const links = [
  { label: "x", value: "x.com/nocircuit", href: "https://x.com/nocircuit" },
  { label: "github", value: "github.com/gitteri", href: "https://github.com/gitteri" },
];

export function Slide17FindMe() {
  return (
    <SlideFrame align="center">
      <div className="flex w-full max-w-[68rem] flex-col items-start gap-10">
        <SlideEyebrow>Questions</SlideEyebrow>
        <h2 className="font-sans text-deck-2xl font-semibold text-bone">
          Connect
        </h2>
        <ul className="flex flex-col gap-3 font-mono text-deck-base text-bone">
          {links.map((l) => (
            <li key={l.label} className="flex items-baseline gap-4">
              <span className="w-20 text-deck-xs uppercase text-bone-mute">
                {l.label}
              </span>
              <a
                href={l.href}
                className="text-bone transition-colors hover:text-sol-green"
              >
                {l.value}
              </a>
            </li>
          ))}
        </ul>
        <p className="font-mono text-deck-xs uppercase text-bone-mute">
          slides · github.com/gitteri/zkproof8-talk
        </p>
      </div>
    </SlideFrame>
  );
}
