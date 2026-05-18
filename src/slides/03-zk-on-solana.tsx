import { SlideEyebrow, SlideFrame, SlideTitle } from "@/components/SlideFrame";

type Tone = "green" | "purple" | "magenta" | "teal" | "muted";

interface Primitive {
  name: string;
  detail: string;
  unlocks: string;
  tone: Tone;
}

interface Project {
  name: string;
  role: string;
  tone: Tone;
}

const primitives: Primitive[] = [
  {
    name: "curve25519 + MSM",
    detail: "Edwards / Ristretto group ops, multi-scalar mul",
    unlocks: "Twisted ElGamal, Pedersen, sigma protocols",
    tone: "green",
  },
  {
    name: "ZK ElGamal Proof Program",
    detail: "13 sigma protocol shapes verified natively",
    unlocks: "Token-2022 confidential balances",
    tone: "green",
  },
  {
    name: "alt_bn128 (BN254)",
    detail: "G1 add / mul + pairing check + compression",
    unlocks: "Groth16, KZG, Plonk on-chain",
    tone: "purple",
  },
  {
    name: "Poseidon + sha256/keccak/blake3",
    detail: "ZK-friendly hash plus the standard set",
    unlocks: "STARK / Halo2 Merkle paths, EVM compat",
    tone: "purple",
  },
  {
    name: "Ed25519 / Secp256k1 sigverify",
    detail: "Native batch signature verification programs",
    unlocks: "Wallet sigs, EVM signature compat",
    tone: "teal",
  },
  {
    name: "BLS12-381 (pending mainnet)",
    detail: "G1, G2, pairing — landing with Alpenglow / v4.0",
    unlocks: "BLS aggregation, 128-bit SNARKs",
    tone: "muted",
  },
];

const projects: Project[] = [
  { name: "Confidential Transfers", role: "this talk", tone: "green" },
  { name: "ZK Compression", role: "Light Protocol", tone: "purple" },
  { name: "Sunspot", role: "Noir on Solana", tone: "purple" },
  { name: "RISC Zero", role: "zkVM verifier", tone: "purple" },
  { name: "Encifher", role: "encrypted DEX", tone: "magenta" },
  { name: "Privacy Cash", role: "shielded transfers", tone: "magenta" },
  { name: "Yona", role: "private trading", tone: "magenta" },
  { name: "Darklake", role: "encrypted DEX", tone: "magenta" },
];

export function Slide03ZkOnSolana() {
  return (
    <SlideFrame align="start">
      <div className="flex h-full w-full flex-col gap-5">
        <div className="space-y-2">
          <SlideEyebrow>Landscape</SlideEyebrow>
          <SlideTitle>ZK on Solana, at a glance</SlideTitle>
        </div>

        <section className="flex flex-col gap-2">
          <SlideEyebrow>Native primitives</SlideEyebrow>
          <div className="grid grid-cols-3 gap-3">
            {primitives.map((p) => (
              <PrimitiveCard key={p.name} primitive={p} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <SlideEyebrow>Projects shipping</SlideEyebrow>
          <div className="grid grid-cols-4 gap-3">
            {projects.map((p) => (
              <ProjectChip key={p.name} project={p} />
            ))}
          </div>
        </section>
      </div>
    </SlideFrame>
  );
}

function toneClasses(tone: Tone): { border: string; role: string } {
  switch (tone) {
    case "green":
      return {
        border: "border-sol-green/50 bg-sol-green/5",
        role: "text-sol-green",
      };
    case "purple":
      return {
        border: "border-sol-purple/50 bg-sol-purple/5",
        role: "text-sol-purple",
      };
    case "magenta":
      return {
        border: "border-sol-magenta/40 bg-sol-magenta/5",
        role: "text-sol-magenta",
      };
    case "teal":
      return {
        border: "border-sol-teal/40 bg-sol-teal/5",
        role: "text-sol-teal",
      };
    case "muted":
      return {
        border: "border-bone-mute/40 bg-ink-softer/40",
        role: "text-bone-mute",
      };
  }
}

function PrimitiveCard({ primitive }: { primitive: Primitive }) {
  const classes = toneClasses(primitive.tone);
  return (
    <div
      className={`flex flex-col rounded-md border px-4 py-3 ${classes.border}`}
    >
      <div className="font-mono text-deck-base font-semibold text-bone">
        {primitive.name}
      </div>
      <div className="mt-1 font-sans text-deck-sm text-bone-dim">
        {primitive.detail}
      </div>
      <div
        className={`mt-2 font-mono text-deck-xs uppercase ${classes.role}`}
      >
        {primitive.unlocks}
      </div>
    </div>
  );
}

function ProjectChip({ project }: { project: Project }) {
  const classes = toneClasses(project.tone);
  return (
    <div className={`flex flex-col rounded-md border px-4 py-3 ${classes.border}`}>
      <div className={`font-mono text-deck-xs uppercase ${classes.role}`}>
        {project.role}
      </div>
      <div className="mt-1 font-sans text-deck-base font-semibold text-bone">
        {project.name}
      </div>
    </div>
  );
}
