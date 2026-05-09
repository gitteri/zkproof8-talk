import { SlideEyebrow, SlideFrame, SlideTitle } from "@/components/SlideFrame";

const products = [
  {
    title: "Treasury rebalancing",
    body: "Move liquidity between issuers, regions, and custodians without broadcasting strategy.",
  },
  {
    title: "B2B settlement",
    body: "Vendor, payroll, intercompany, and cross-border flows with public settlement and private amounts.",
  },
  {
    title: "Stablecoin operations",
    body: "Issuer and processor flows where the market should not learn working capital in real time.",
  },
];

export function Slide14PaymentProducts() {
  return (
    <SlideFrame align="start">
      <div className="flex h-full w-full flex-col gap-10">
        <div className="space-y-4">
          <SlideEyebrow>Ecosystem</SlideEyebrow>
          <SlideTitle>What payment companies can build</SlideTitle>
        </div>

        <div className="grid flex-1 grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.title}
              className="flex flex-col gap-4 rounded-md border border-sol-green/40 bg-sol-green/5 p-6"
            >
              <div className="font-sans text-deck-base font-semibold text-bone">
                {product.title}
              </div>
              <p className="font-sans text-deck-sm text-bone-dim">
                {product.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
