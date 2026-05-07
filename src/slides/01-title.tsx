import { SlideEyebrow, SlideFrame } from "@/components/SlideFrame";

export function Slide01Title() {
  return (
    <SlideFrame align="center">
      <div className="flex w-full max-w-[68rem] flex-col items-start gap-8">
        <SlideEyebrow>zkproof8 / Rome / Day 2 / 16:30</SlideEyebrow>
        <h1 className="font-sans text-deck-2xl font-semibold text-bone">
          <span className="text-gradient">Confidential Transfers</span>
          <br />
          for Global Payments
        </h1>
        <p className="max-w-[44ch] font-sans text-deck-base text-bone-dim">
          How Solana enables private, auditable treasury and B2B payments.
        </p>
        <div className="mt-8 flex items-center gap-6 font-mono text-deck-xs uppercase text-bone-mute">
          <span>Ilan Gitter</span>
          <span className="opacity-50">·</span>
          <span>Solana Foundation</span>
        </div>
      </div>
    </SlideFrame>
  );
}
