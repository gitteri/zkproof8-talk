import type { ComponentType } from "react";

import { Slide01Title } from "@/slides/01-title";
import { Slide02ColdOpen } from "@/slides/02-cold-open";
import { Slide03PrivacySpectrum } from "@/slides/03-privacy-spectrum";
import { Slide04Treasury } from "@/slides/04-treasury";
import { Slide05B2B } from "@/slides/05-b2b";
import { Slide06DemoProtocol } from "@/slides/06-demo-protocol";
import { Slide07PendingAvailable } from "@/slides/07-pending-available";
import { Slide08Auditor } from "@/slides/08-auditor";
import { Slide09DemoKeyDerivation } from "@/slides/09-demo-key-derivation";
import { Slide11Audits } from "@/slides/11-audits";
import { Slide13Compliance } from "@/slides/13-compliance";
import { Slide14Adoption } from "@/slides/14-adoption";
import { Slide15AsksPrimitives } from "@/slides/15-asks-primitives";
import { Slide16AsksSystem } from "@/slides/16-asks-system";
import { Slide17Ecosystem } from "@/slides/17-ecosystem";
import { Slide18Quantum } from "@/slides/18-quantum";
import { Slide19DemoTransfer } from "@/slides/19-demo-transfer";
import { Slide20FindMe } from "@/slides/20-find-me";

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
    Component: Slide02ColdOpen,
  },
  {
    id: 3,
    title: "The treasury question",
    section: "problem",
    timeSeconds: 80,
    notes:
      "The recurring buyer question. End on: today's honest answer on public chains is yes.",
    Component: Slide03PrivacySpectrum,
  },
  {
    id: 4,
    title: "Public amounts leak business strategy",
    section: "problem",
    timeSeconds: 80,
    notes:
      "Five concrete leak vectors for payment companies. Right column compares legacy rails on counterparty visibility.",
    Component: Slide04Treasury,
  },
  {
    id: 5,
    title: "Confidential transfers at a glance",
    section: "protocol",
    timeSeconds: 60,
    isDemo: true,
    notes:
      "System shape before details: account graph public, amount encrypted, accountable views (auditor optional).",
    Component: Slide06DemoProtocol,
  },
  {
    id: 6,
    title: "Protocol overview",
    section: "protocol",
    timeSeconds: 130,
    isDemo: true,
    notes:
      "Right arrow steps through configure mint → opt-in → deposit → apply → transfer → withdraw. Each step shows public/owner/auditor view.",
    Component: Slide07PendingAvailable,
  },
  {
    id: 7,
    title: "Protocol vs paper",
    section: "protocol",
    timeSeconds: 110,
    isDemo: true,
    notes:
      "Map deployed primitives to paper citations and SDK types. Sidebar lists deployment-only details (AES dual-encrypt, proof context state accounts, ZK ElGamal Proof Program separation, lo/hi 16-bit split).",
    Component: Slide08Auditor,
  },
  {
    id: 8,
    title: "Why not UTXOs?",
    section: "protocol",
    timeSeconds: 80,
    notes:
      "Pre-answer the cryptographer's first question now that the protocol is on screen. UTXOs optimize anonymity sets; confidential accounts optimize institutional deployment.",
    Component: Slide05B2B,
  },
  {
    id: 9,
    title: "Adoption hurdles",
    section: "deployment",
    timeSeconds: 70,
    notes:
      "Ecosystem adoption, transaction sizes, composability. Each one a real product constraint, not a research footnote.",
    Component: Slide09DemoKeyDerivation,
  },
  {
    id: 10,
    title: "Auditor key",
    section: "deployment",
    timeSeconds: 70,
    notes:
      "Grouped 3-handle validity proof. What it gives, what institutions still need (selective disclosure, regulatory clarity, long-term key mgmt).",
    Component: Slide11Audits,
  },
  {
    id: 11,
    title: "Demo setup",
    section: "demo",
    timeSeconds: 45,
    notes: "Local cluster vs devnet. Same protocol, controlled latency.",
    Component: Slide13Compliance,
  },
  {
    id: 12,
    title: "Live transfer",
    section: "demo",
    timeSeconds: 110,
    isDemo: true,
    notes:
      "Sender / receiver / auditor / chain analyst. Same transaction, different authorized views.",
    Component: Slide14Adoption,
  },
  {
    id: 13,
    title: "Payment products",
    section: "ecosystem",
    timeSeconds: 60,
    notes:
      "Treasury rebalancing, B2B settlement, stablecoin operations.",
    Component: Slide15AsksPrimitives,
  },
  {
    id: 14,
    title: "Beyond payments",
    section: "ecosystem",
    timeSeconds: 60,
    notes:
      "Twisted ElGamal as a substrate. Adjacent stacks (MPC, FHE, TEE) explore different points in the design space.",
    Component: Slide16AsksSystem,
  },
  {
    id: 15,
    title: "Who's going to use this",
    section: "adoption",
    timeSeconds: 70,
    notes:
      "Use cleared names only. Stablecoin issuers, payment networks, treasury operators.",
    Component: Slide17Ecosystem,
  },
  {
    id: 16,
    title: "What has to be true",
    section: "adoption",
    timeSeconds: 50,
    notes:
      "Custody, audit operations, performance, integrations.",
    Component: Slide18Quantum,
  },
  {
    id: 17,
    title: "Open problems",
    section: "questions",
    timeSeconds: 90,
    notes:
      "Concrete asks for the room: smaller range proofs, threshold auditor, bounded balance reads, programmable disclosure, encrypted composability, account UX standards.",
    Component: Slide19DemoTransfer,
  },
  {
    id: 18,
    title: "Questions",
    section: "questions",
    timeSeconds: 15,
    notes: "Q&A magnet. Invite challenge.",
    Component: Slide20FindMe,
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
