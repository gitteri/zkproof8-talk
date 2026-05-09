import { SlideEyebrow, SlideFrame, SlideTitle } from "@/components/SlideFrame";

type Tone = "green" | "purple" | "magenta";

interface Project {
  name: string;
  role: string;
  tagline: string;
  meta?: string;
  tone: Tone;
}

const projects: Project[] = [
  {
    name: "Confidential Transfers",
    role: "this talk",
    tagline: "Token-2022 extension. Hidden amounts, optional auditor.",
    meta: "spl-token-2022",
    tone: "green",
  },
  {
    name: "Sunspot",
    role: "Noir on Solana",
    tagline: "Noir circuits compiled to Solana programs.",
    meta: "reilabs/sunspot",
    tone: "purple",
  },
  {
    name: "RISC Zero",
    role: "zkVM",
    tagline: "Prove arbitrary Rust execution. Verifier on Solana.",
    meta: "risczero",
    tone: "purple",
  },
  {
    name: "ZK Compression",
    role: "compressed state",
    tagline: "Rent-free accounts. Private payments and trading shipping.",
    meta: "light protocol",
    tone: "purple",
  },
  {
    name: "Encifher",
    role: "encrypted DEX",
    tagline: "ElGamal + ZK proofs for encrypted trades.",
    meta: "docs.encifher.io",
    tone: "magenta",
  },
  {
    name: "Privacy Cash",
    role: "shielded transfers",
    tagline: "Anonymous payments on Solana.",
    tone: "magenta",
  },
  {
    name: "Yona",
    role: "private trading",
    tagline: "ZK-enabled private order flow.",
    tone: "magenta",
  },
  {
    name: "Darklake",
    role: "encrypted DEX",
    tagline: "Acquired by SolStrategies.",
    tone: "magenta",
  },
];

export function Slide03ZkOnSolana() {
  return (
    <SlideFrame align="start">
      <div className="flex h-full w-full flex-col gap-6">
        <div className="space-y-2">
          <SlideEyebrow>Landscape</SlideEyebrow>
          <SlideTitle>ZK on Solana, at a glance</SlideTitle>
        </div>

        <div className="grid flex-1 grid-cols-4 grid-rows-2 gap-3">
          {projects.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>

        <p className="font-mono text-deck-xs uppercase text-bone-mute">
          + many more shipping — DeFi, payments, identity, all with ZK on Solana
        </p>
      </div>
    </SlideFrame>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const accent =
    project.tone === "green"
      ? "border-sol-green/50 bg-sol-green/5"
      : project.tone === "purple"
        ? "border-sol-purple/50 bg-sol-purple/5"
        : "border-sol-magenta/40 bg-sol-magenta/5";
  const roleColor =
    project.tone === "green"
      ? "text-sol-green"
      : project.tone === "purple"
        ? "text-sol-purple"
        : "text-sol-magenta";
  return (
    <div className={`flex flex-col rounded-md border p-4 ${accent}`}>
      <div className={`font-mono text-deck-xs uppercase ${roleColor}`}>
        {project.role}
      </div>
      <div className="mt-2 font-sans text-deck-base font-semibold text-bone">
        {project.name}
      </div>
      <p className="mt-2 font-sans text-deck-sm text-bone-dim">
        {project.tagline}
      </p>
      {project.meta && (
        <div className="mt-auto pt-3 font-mono text-deck-xs text-bone-mute">
          {project.meta}
        </div>
      )}
    </div>
  );
}
