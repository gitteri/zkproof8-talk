import type { ComponentType } from "react";

import { Slide01Title } from "@/slides/01-title";
import { Slide02AboutMe } from "@/slides/02-about-me";
import { Slide03ZkOnSolana } from "@/slides/03-zk-on-solana";
import { Slide04TreasuryQuestion } from "@/slides/04-treasury-question";
import { Slide05PublicAmounts } from "@/slides/05-public-amounts";
import { Slide06AtAGlance } from "@/slides/06-at-a-glance";
import { Slide07ProtocolOverview } from "@/slides/07-protocol-overview";
import { Slide08ProtocolVsPaper } from "@/slides/08-protocol-vs-paper";
import { Slide09WhyNotUtxos } from "@/slides/09-why-not-utxos";
import { Slide10AdoptionHurdles } from "@/slides/10-adoption-hurdles";
import { Slide11AuditorKey } from "@/slides/11-auditor-key";
import { Slide12DemoSetup } from "@/slides/12-demo-setup";
import { Slide13LiveTransfer } from "@/slides/13-live-transfer";
import { Slide14PaymentProducts } from "@/slides/14-payment-products";
import { Slide15BeyondPayments } from "@/slides/15-beyond-payments";
import { Slide16Buyers } from "@/slides/16-buyers";
import { Slide17Preconditions } from "@/slides/17-preconditions";
import { Slide18OpenProblems } from "@/slides/18-open-problems";
import { Slide19FindMe } from "@/slides/19-find-me";

export type Section =
  | "intro"
  | "problem"
  | "protocol"
  | "deployment"
  | "demo"
  | "ecosystem"
  | "adoption"
  | "questions";

export interface SlideMeta {
  id: number;
  title: string;
  section: Section;
  timeSeconds: number;
  isDemo?: boolean;
  notes: string;
  Component: ComponentType;
}

export const sectionLabel: Record<Section, string> = {
  intro: "Intro",
  problem: "Problem",
  protocol: "Protocol",
  deployment: "Deployment",
  demo: "Demo",
  ecosystem: "Ecosystem",
  adoption: "Adoption",
  questions: "Questions",
};

export const slides: SlideMeta[] = [
  {
    id: 1,
    title: "Title",
    section: "intro",
    timeSeconds: 15,
    notes: "Frame the talk. Don't read the title.",
    Component: Slide01Title,
  },
  {
    id: 2,
    title: "About me",
    section: "intro",
    timeSeconds: 30,
    notes: "One line on screen. Establish the bridge role verbally; don't read the slide.",
    Component: Slide02AboutMe,
  },
  {
    id: 3,
    title: "ZK on Solana, at a glance",
    section: "intro",
    timeSeconds: 45,
    notes:
      "Pan the landscape before diving into one slice. Confidential transfers is this talk; Sunspot/RISC Zero/ZK Compression are proving infra; Encifher/Privacy Cash/Yona/Darklake are encrypted apps. Reinforce: many more shipping.",
    Component: Slide03ZkOnSolana,
  },
  {
    id: 4,
    title: "The treasury question",
    section: "problem",
    timeSeconds: 80,
    notes:
      "The recurring buyer question. End on: today's honest answer on public chains is yes.",
    Component: Slide04TreasuryQuestion,
  },
  {
    id: 5,
    title: "Public amounts leak business strategy",
    section: "problem",
    timeSeconds: 80,
    notes:
      "Five concrete leak vectors for payment companies. Right column compares legacy rails on counterparty visibility.",
    Component: Slide05PublicAmounts,
  },
  {
    id: 6,
    title: "Confidential transfers at a glance",
    section: "protocol",
    timeSeconds: 60,
    isDemo: true,
    notes:
      "System shape before details: account graph public, amount encrypted, accountable views (auditor optional). Credit Sam Kim (Anza) as protocol designer.",
    Component: Slide06AtAGlance,
  },
  {
    id: 7,
    title: "Protocol overview",
    section: "protocol",
    timeSeconds: 130,
    isDemo: true,
    notes:
      "Right arrow steps through configure mint → opt-in → deposit → apply → transfer → withdraw. Each step shows public/owner/auditor view plus the underlying primitives.",
    Component: Slide07ProtocolOverview,
  },
  {
    id: 8,
    title: "Protocol vs paper",
    section: "protocol",
    timeSeconds: 110,
    isDemo: true,
    notes:
      "Map deployed primitives to paper citations and SDK types. Sidebar lists deployment-only details (AES dual-encrypt, proof context state accounts, ZK ElGamal Proof Program separation, lo/hi 16-bit split).",
    Component: Slide08ProtocolVsPaper,
  },
  {
    id: 9,
    title: "Why not UTXOs?",
    section: "protocol",
    timeSeconds: 80,
    notes:
      "Pre-answer the cryptographer's first question now that the protocol is on screen. UTXOs optimize anonymity sets; confidential accounts optimize institutional deployment.",
    Component: Slide09WhyNotUtxos,
  },
  {
    id: 10,
    title: "Adoption hurdles",
    section: "deployment",
    timeSeconds: 70,
    notes:
      "Ecosystem adoption, transaction sizes, composability. Each one a real product constraint, not a research footnote.",
    Component: Slide10AdoptionHurdles,
  },
  {
    id: 11,
    title: "Auditor key",
    section: "deployment",
    timeSeconds: 70,
    notes:
      "Grouped 3-handle validity proof. What it gives, what institutions still need (selective disclosure, regulatory clarity, long-term key mgmt).",
    Component: Slide11AuditorKey,
  },
  {
    id: 12,
    title: "Demo setup",
    section: "demo",
    timeSeconds: 45,
    notes: "Local cluster vs devnet. Same protocol, controlled latency.",
    Component: Slide12DemoSetup,
  },
  {
    id: 13,
    title: "Live transfer",
    section: "demo",
    timeSeconds: 110,
    isDemo: true,
    notes:
      "Sender / receiver / auditor / chain analyst. Same transaction, different authorized views.",
    Component: Slide13LiveTransfer,
  },
  {
    id: 14,
    title: "Payment products",
    section: "ecosystem",
    timeSeconds: 60,
    notes:
      "Treasury rebalancing, B2B settlement, stablecoin operations.",
    Component: Slide14PaymentProducts,
  },
  {
    id: 15,
    title: "Beyond payments",
    section: "ecosystem",
    timeSeconds: 60,
    notes:
      "Twisted ElGamal as a substrate. Adjacent stacks (MPC, FHE, TEE) explore different points in the design space.",
    Component: Slide15BeyondPayments,
  },
  {
    id: 16,
    title: "Who's going to use this",
    section: "adoption",
    timeSeconds: 70,
    notes:
      "Use cleared names only. Stablecoin issuers, payment networks, treasury operators.",
    Component: Slide16Buyers,
  },
  {
    id: 17,
    title: "What has to be true",
    section: "adoption",
    timeSeconds: 50,
    notes:
      "Custody, audit operations, performance, integrations.",
    Component: Slide17Preconditions,
  },
  {
    id: 18,
    title: "Open problems",
    section: "questions",
    timeSeconds: 90,
    notes:
      "Concrete asks for the room: smaller range proofs, threshold auditor, bounded balance reads, programmable disclosure, encrypted composability, account UX standards.",
    Component: Slide18OpenProblems,
  },
  {
    id: 19,
    title: "Questions",
    section: "questions",
    timeSeconds: 15,
    notes: "Q&A magnet. Invite challenge. Email + x.com/nocircuit + GitHub.",
    Component: Slide19FindMe,
  },
];

export const slideCount = slides.length;

export function getSlide(id: number): SlideMeta | undefined {
  return slides.find((s) => s.id === id);
}

export function getNeighbors(id: number): { prev?: number; next?: number } {
  const idx = slides.findIndex((s) => s.id === id);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? slides[idx - 1].id : undefined,
    next: idx < slides.length - 1 ? slides[idx + 1].id : undefined,
  };
}

export const totalSeconds = slides.reduce((acc, s) => acc + s.timeSeconds, 0);
