import { SlideEyebrow, SlideFrame } from "@/components/SlideFrame";

export function Slide20FindMe() {
  return (
    <SlideFrame align="center">
      <div className="flex w-full max-w-[68rem] flex-col items-start gap-10">
        <SlideEyebrow>Questions</SlideEyebrow>
        <h2 className="font-sans text-deck-2xl font-semibold text-bone">
          Challenge the construction.
          <br />
          <span className="text-gradient">
            Then help ship
            <br />
            the next one.
          </span>
        </h2>
        <div className="flex flex-col gap-2 font-mono text-deck-base text-bone">
          <span>ilan.gitter@solana.org</span>
          <span className="text-bone-dim">@gitteri · everywhere</span>
        </div>
        <p className="font-mono text-deck-xs uppercase text-bone-mute">
          slides · github.com/&hellip;[fill]
        </p>
      </div>
    </SlideFrame>
  );
}
