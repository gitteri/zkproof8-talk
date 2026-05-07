"use client";

import { useEffect, useRef, useState } from "react";

import { SlideEyebrow, SlideFrame, SlideTitle } from "@/components/SlideFrame";

const steps = [
  {
    op: "configure mint",
    title: "Issuer enables confidential transfers",
    body: "Mint is created with the ConfidentialTransferMint extension. Issuer optionally sets an auditor ElGamal pubkey and a privacy level (disabled / opt-in / whitelisted / required).",
    publicView: "extension data, auditor pubkey",
    ownerView: "issuer policy is fixed",
    auditorView: "registered audit target",
  },
  {
    op: "opt-in",
    title: "Holder configures their account",
    body: "Each holder reallocates their token account for the ConfidentialTransferAccount extension, derives an ElGamal keypair and AES key from their signature, and submits a pubkey-validity proof.",
    publicView: "account extension, ElGamal pubkey",
    ownerView: "ElGamal sk + AES key derived",
    auditorView: "holder is recognizable",
  },
  {
    op: "deposit",
    title: "Public balance becomes pending",
    body: "Owner deposits public token balance into encrypted pending balance. Pending uses a 16-bit lo / 16-bit hi ElGamal split for tractable owner-side decryption.",
    publicView: "deposit amount visible",
    ownerView: "pending ciphertext decrypts",
    auditorView: "deposit amount visible",
  },
  {
    op: "apply pending",
    title: "Owner moves pending to available",
    body: "Both sides do this: sender after deposit, receiver after incoming transfer. The instruction recomputes the AES-encrypted available balance for fast owner-side reads.",
    publicView: "apply instruction, counter advance",
    ownerView: "new available balance (AES)",
    auditorView: "state transition recorded",
  },
  {
    op: "transfer",
    title: "Encrypted amount, three ciphertexts",
    body: "Transfer instruction carries ciphertexts under sender, receiver, and (if configured) auditor keys. Equality, ciphertext-validity, and range proofs live in proof context state accounts so the transfer fits in a normal transaction.",
    publicView: "ciphertexts + 3 proof accounts",
    ownerView: "sender debit, receiver credit",
    auditorView: "amount via auditor handle",
  },
  {
    op: "withdraw",
    title: "Available becomes public again",
    body: "Owner withdraws encrypted available balance back to public token balance. Withdrawal carries a ciphertext-commitment equality proof binding the encrypted amount to the public amount.",
    publicView: "withdraw amount visible",
    ownerView: "available balance decrements",
    auditorView: "withdrawal recorded",
  },
];

export function Slide07PendingAvailable() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" && activeRef.current < steps.length - 1) {
        e.preventDefault();
        e.stopPropagation();
        setActive((a) => Math.min(a + 1, steps.length - 1));
      } else if (e.key === "ArrowLeft" && activeRef.current > 0) {
        e.preventDefault();
        e.stopPropagation();
        setActive((a) => Math.max(a - 1, 0));
      }
    }
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, []);

  const step = steps[active];

  return (
    <SlideFrame align="start">
      <div className="flex h-full w-full flex-col gap-6">
        <div className="space-y-2">
          <SlideEyebrow>Protocol</SlideEyebrow>
          <SlideTitle size="lg">Protocol overview</SlideTitle>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {steps.map((s, i) => (
            <button
              key={s.op}
              type="button"
              onClick={() => setActive(i)}
              className={[
                "rounded-md border px-3 py-2 text-left font-mono text-deck-xs uppercase transition-colors",
                i === active
                  ? "border-sol-green/60 bg-sol-green/10 text-sol-green"
                  : i < active
                    ? "border-ink-line bg-ink-softer/40 text-bone"
                    : "border-ink-line bg-ink-softer/40 text-bone-mute hover:border-bone-mute",
              ].join(" ")}
            >
              {String(i + 1).padStart(2, "0")} {s.op}
            </button>
          ))}
        </div>

        <div className="grid flex-1 grid-cols-[0.95fr_1.05fr] gap-5">
          <div className="rounded-md border border-sol-green/50 bg-sol-green/5 p-6">
            <div className="font-mono text-deck-xs uppercase text-sol-green">
              {step.op}
            </div>
            <h2 className="mt-2 font-sans text-deck-lg font-semibold text-bone">
              {step.title}
            </h2>
            <p className="mt-3 font-sans text-deck-sm text-bone-dim">
              {step.body}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <ViewCard label="Public chain" value={step.publicView} tone="magenta" />
            <ViewCard label="Owner" value={step.ownerView} tone="green" />
            <ViewCard label="Auditor" value={step.auditorView} tone="purple" />
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function ViewCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "magenta" | "green" | "purple";
}) {
  const accent =
    tone === "green"
      ? "border-sol-green/50"
      : tone === "purple"
        ? "border-sol-purple/50"
        : "border-sol-magenta/50";
  return (
    <div className={`rounded-md border bg-ink-softer/40 p-5 ${accent}`}>
      <div className="font-mono text-deck-xs uppercase text-bone-mute">
        {label}
      </div>
      <p className="mt-3 font-sans text-deck-base text-bone">{value}</p>
    </div>
  );
}
