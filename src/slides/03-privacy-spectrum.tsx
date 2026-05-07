import { SlideEyebrow, SlideFrame } from "@/components/SlideFrame";

export function Slide03PrivacySpectrum() {
  return (
    <SlideFrame align="start">
      <div className="flex h-full w-full flex-col justify-center gap-12">
        <SlideEyebrow>Problem</SlideEyebrow>
        <blockquote className="max-w-[28ch] font-sans text-deck-3xl font-semibold text-bone">
          &ldquo;Can anyone see our
          <br />
          business flows onchain?&rdquo;
        </blockquote>

        <p className="max-w-[60ch] font-mono text-deck-sm text-bone-mute">
          Today&apos;s honest answer on public chains:
          <span className="text-bone"> yes.</span>
        </p>
      </div>
    </SlideFrame>
  );
}
