import { SlideEyebrow, SlideFrame, SlideTitle } from "@/components/SlideFrame";

const apps = [
  {
    title: "Private order books",
    body: "Commit to order state without exposing inventory or intent before execution.",
  },
  {
    title: "Sealed-bid auctions",
    body: "Encrypted bids with public settlement and proofs that the clearing rule was followed.",
  },
  {
    title: "Encrypted governance",
    body: "Votes, allocations, and state transitions that reveal outcomes without exposing every input.",
  },
];

export function Slide16AsksSystem() {
  return (
    <SlideFrame align="start">
      <div className="flex h-full w-full flex-col gap-8">
        <div className="space-y-3">
          <SlideEyebrow>Ecosystem</SlideEyebrow>
          <SlideTitle>Beyond payments</SlideTitle>
        </div>

        <div className="grid flex-1 grid-cols-[1fr_1fr] gap-6">
          <div className="rounded-md border border-sol-green/40 bg-sol-green/5 p-6">
            <div className="font-mono text-deck-xs uppercase text-sol-green">
              Solana primitive
            </div>
            <p className="mt-4 font-sans text-deck-lg font-semibold text-bone">
              Encrypted value plus public verification becomes a substrate, not
              just a payments feature.
            </p>
            <p className="mt-5 font-sans text-deck-base text-bone-dim">
              The ZK ElGamal Proof Program gives builders a common verification
              path for applications that need hidden amounts or hidden inputs.
            </p>
          </div>

          <div className="grid grid-rows-3 gap-3">
            {apps.map((app) => (
              <div
                key={app.title}
                className="rounded-md border border-sol-purple/40 bg-sol-purple/5 p-5"
              >
                <div className="font-sans text-deck-base font-semibold text-bone">
                  {app.title}
                </div>
                <p className="mt-2 font-sans text-deck-sm text-bone-dim">
                  {app.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="max-w-[82ch] font-sans text-deck-sm text-bone-dim">
          Adjacent stacks like MPC-based confidential SPL explore different
          points in the trust and compute design space.
        </p>
      </div>
    </SlideFrame>
  );
}
