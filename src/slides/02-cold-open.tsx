import { SlideEyebrow, SlideFrame, SlideTitle } from "@/components/SlideFrame";

export function Slide02ColdOpen() {
  return (
    <SlideFrame align="start">
      <div className="flex h-full w-full flex-col justify-center gap-8">
        <SlideEyebrow>Intro</SlideEyebrow>
        <SlideTitle>Ilan Gitter</SlideTitle>
        <p className="max-w-[60ch] font-sans text-deck-lg text-bone">
          Head of Ecosystem Engineering, Solana Foundation
        </p>
      </div>
    </SlideFrame>
  );
}
