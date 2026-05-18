import { SlideEyebrow, SlideFrame, SlideTitle } from "@/components/SlideFrame";

const apps = [
  {
    title: "Private order books",
    body: "Commit to order state without exposing inventory or intent before execution.",
    buyers: "Exchanges, market makers, regulated securities desks",
  },
  {
    title: "Sealed-bid auctions",
    body: "Encrypted bids with public settlement and proofs that the clearing rule was followed.",
    buyers: "Investment firms, DVP / settlement, RWA platforms",
  },
  {
    title: "Encrypted governance",
    body: "Votes, allocations, and state transitions that reveal outcomes without exposing every input.",
    buyers: "DAOs, institutional voting, allocation committees",
  },
];

export function Slide15BeyondPayments() {
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
              The same ZK ElGamal Proof Program that backs confidential
              balances also backs trading, securities settlement, and
              governance: order books, auctions, DVP, regulated securities,
              encrypted votes.
            </p>
          </div>

          <div className="grid grid-rows-3 gap-3">
            {apps.map((app) => (
              <div
                key={app.title}
                className="flex flex-col rounded-md border border-sol-purple/40 bg-sol-purple/5 p-5"
              >
                <div className="font-sans text-deck-base font-semibold text-bone">
                  {app.title}
                </div>
                <p className="mt-2 font-sans text-deck-sm text-bone-dim">
                  {app.body}
                </p>
                <div className="mt-auto pt-3 font-mono text-deck-xs uppercase text-sol-purple">
                  {app.buyers}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
