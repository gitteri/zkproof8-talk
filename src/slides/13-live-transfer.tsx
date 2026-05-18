"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { SlideEyebrow, SlideFrame, SlideTitle } from "@/components/SlideFrame";
import { TransferProgressPopup } from "@/components/TransferProgressPopup";
import { useDemoState, useHealth, useTransferProgress } from "@/hooks/useDemo";
import {
  explorerUrl,
  type ActionResponse,
  type LedgerState,
  type TransferProgress,
} from "@/lib/api";

type ActiveOp = "transfer" | "apply" | null;

export function Slide13LiveTransfer() {
  const { state, busy, error, runTransfer, runApply } = useDemoState(true);
  const { events, reset, push } = useTransferProgress();
  const { health } = useHealth();
  const rpcUrl = health?.rpc_url ?? null;
  const [popupOpen, setPopupOpen] = useState(false);
  const [activeOp, setActiveOp] = useState<ActiveOp>(null);

  // Refs that mirror state + callbacks so the keydown listener can be
  // registered exactly once (no re-registration on every popup change).
  const busyRef = useRef(false);
  const popupOpenRef = useRef(false);
  const eventsRef = useRef<TransferProgress[]>([]);
  const runTransferRef = useRef(runTransfer);
  const runApplyRef = useRef(runApply);
  const resetRef = useRef(reset);
  const pushRef = useRef(push);

  useEffect(() => {
    busyRef.current = busy;
  }, [busy]);
  useEffect(() => {
    popupOpenRef.current = popupOpen;
  }, [popupOpen]);
  useEffect(() => {
    eventsRef.current = events;
  }, [events]);
  useEffect(() => {
    runTransferRef.current = runTransfer;
    runApplyRef.current = runApply;
    resetRef.current = reset;
    pushRef.current = push;
  }, [runTransfer, runApply, reset, push]);

  // Auto-close popup ~2s after a terminal event arrives.
  useEffect(() => {
    const last = events.at(-1);
    if (!last) return;
    if (last.type === "done" || last.type === "error") {
      const id = window.setTimeout(() => setPopupOpen(false), 2200);
      return () => window.clearTimeout(id);
    }
    return undefined;
  }, [events]);

  // Fallback: if the underlying mutation resolves (busy → false) and we never
  // got a terminal SSE event, close the popup anyway so it doesn't sit on
  // "waiting for backend…" forever.
  useEffect(() => {
    if (busy || !popupOpen) return undefined;
    const last = events.at(-1);
    if (last?.type === "done" || last?.type === "error") return undefined;
    const id = window.setTimeout(() => setPopupOpen(false), 1500);
    return () => window.clearTimeout(id);
  }, [busy, popupOpen, events]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;

      if (e.key === "Escape") {
        if (popupOpenRef.current) {
          e.preventDefault();
          e.stopPropagation();
          setPopupOpen(false);
        }
        return;
      }

      if (busyRef.current) return;

      if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        e.stopPropagation();
        resetRef.current();
        setActiveOp("transfer");
        setPopupOpen(true);
        void runTransferRef.current().then((r) => synthesizeIfSilent(r, "transfer"));
      } else if (e.key === "a" || e.key === "A") {
        e.preventDefault();
        e.stopPropagation();
        resetRef.current();
        setActiveOp("apply");
        setPopupOpen(true);
        void runApplyRef.current("receiver").then((r) =>
          synthesizeIfSilent(r, "apply-pending-receiver"),
        );
      }
    }

    function synthesizeIfSilent(r: ActionResponse | null, label: string) {
      if (!r) return;
      // If real SSE events arrived, no synthesis needed.
      const hasRealEvents = eventsRef.current.some(
        (e) => e.type === "signature" || e.type === "done",
      );
      if (hasRealEvents) return;
      const synthetic: TransferProgress[] = r.signatures.map((sig, idx) => ({
        type: "signature" as const,
        label: r.signatures.length === 1 ? label : `${label}-${idx + 1}`,
        sig,
      }));
      synthetic.push({ type: "done", sigs: r.signatures });
      pushRef.current(synthetic);
    }
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, []);

  const cols = buildColumns(state);

  return (
    <SlideFrame align="start">
      <div className="flex h-full w-full flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <SlideEyebrow>Demo</SlideEyebrow>
            <SlideTitle size="lg">Live transfer / selective disclosure</SlideTitle>
          </div>
          <span
            className={clsx(
              "rounded border px-3 py-1 font-mono text-deck-xs uppercase",
              state
                ? "border-sol-green/40 bg-sol-green/5 text-sol-green"
                : "border-bone-mute bg-ink-softer/40 text-bone-mute",
            )}
          >
            {state ? "live" : busy ? "syncing" : "offline"}
          </span>
        </div>

        <div className="grid flex-1 grid-cols-4 gap-3">
          {cols.map((c) => (
            <div
              key={c.role}
              className={clsx(
                "flex flex-col rounded-md border bg-ink-softer/40",
                c.accent,
              )}
            >
              <div className="border-b border-ink-line px-5 py-4">
                <div className="font-mono text-deck-xs uppercase text-bone-mute">
                  {c.sub}
                </div>
                <div className="font-sans text-deck-base font-semibold text-bone">
                  {c.role}
                </div>
              </div>
              <div className="flex flex-col gap-5 px-5 py-5">
                <div>
                  <div className="font-mono text-deck-xs uppercase text-bone-mute">
                    ciphertext
                  </div>
                  <code className="mt-1 block break-all font-mono text-deck-sm text-bone-dim">
                    {c.ciphertext}
                  </code>
                </div>
                <div>
                  <div className="font-mono text-deck-xs uppercase text-bone-mute">
                    decrypted
                  </div>
                  {c.plaintext != null ? (
                    <code className="mt-1 block font-mono text-deck-sm text-bone">
                      {c.plaintext}
                    </code>
                  ) : (
                    <span className="mt-1 block font-mono text-deck-sm text-sol-magenta">
                      -- not authorized --
                    </span>
                  )}
                  {c.pendingPlain && (
                    <code className="mt-1 block font-mono text-deck-sm text-sol-purple">
                      {c.pendingPlain}
                    </code>
                  )}
                </div>
                {c.extra && (
                  <div>
                    <div className="font-mono text-deck-xs uppercase text-bone-mute">
                      events
                    </div>
                    <ul className="mt-1 flex flex-col gap-1 font-mono text-deck-xs text-bone-dim">
                      {c.extra.map((row, i) => (
                        <li
                          key={`${row.sig ?? row.label}-${i}`}
                          className="flex items-baseline gap-1.5"
                        >
                          {row.sig ? (
                            <a
                              href={explorerUrl(row.sig, rpcUrl)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex min-w-0 flex-1 items-baseline gap-1.5 hover:text-sol-teal hover:underline"
                              title="open in Solana Explorer"
                            >
                              <span className="truncate">{row.label}</span>
                              <span className="flex-none text-sol-green">↗</span>
                            </a>
                          ) : (
                            <span className="truncate">{row.label}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-baseline justify-between gap-6 border-t border-ink-line pt-4">
          <div className="flex items-center gap-3 font-mono text-deck-xs uppercase text-bone-mute">
            {!state && !busy && (
              <span className="text-bone-mute">
                start backend: cargo run --bin demo-server
              </span>
            )}
            {error && (
              <span className="max-w-[36ch] truncate text-sol-magenta" title={error}>
                {error}
              </span>
            )}
            <KeyHint label="run" hint="R" />
            <KeyHint label="apply" hint="A" />
            {busy && <span className="text-sol-green">running…</span>}
          </div>
        </div>
      </div>
      <TransferProgressPopup
        open={popupOpen}
        events={events}
        title={activeOp === "apply" ? "Apply pending balance" : "Live transfer"}
        rpcUrl={rpcUrl}
        onClose={() => setPopupOpen(false)}
      />
    </SlideFrame>
  );
}

function KeyHint({ label, hint }: { label: string; hint: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span>{label}</span>
      <kbd className="rounded border border-ink-line bg-ink-softer/60 px-1.5 py-0.5 font-mono text-[0.7rem] text-bone">
        {hint}
      </kbd>
    </span>
  );
}

type AuditorRow = { label: string; sig?: string };

type Column = {
  role: string;
  sub: string;
  ciphertext: string;
  plaintext: string | null;
  pendingPlain?: string | null;
  accent: string;
  extra?: AuditorRow[];
};

function buildColumns(state: LedgerState | null): Column[] {
  if (!state) return placeholderColumns;

  const senderCt = shortCt(state.sender.available_ct);
  const recvAvailableCt = shortCt(state.receiver.available_ct);
  const recvPendingCt = shortCt(state.receiver.pending_ct);
  const lastTransfer = state.auditor.recent_events.find(
    (e) => e.kind === "transfer",
  );

  return [
    {
      role: "Sender / Treasury",
      sub: "owner decrypt",
      ciphertext: senderCt,
      plaintext: `${formatUi(state.sender.available_ui)}`,
      accent: "border-ink-line",
    },
    {
      role: "Receiver / Vendor",
      sub: "owner decrypt",
      ciphertext: state.receiver.pending_ui > 0 ? recvPendingCt : recvAvailableCt,
      plaintext: `${formatUi(state.receiver.available_ui)} avail`,
      pendingPlain:
        state.receiver.pending_ui > 0
          ? `+ ${formatUi(state.receiver.pending_ui)} pending`
          : null,
      accent: "border-sol-green/60",
    },
    {
      role: "Auditor / Regulator",
      sub: "global decrypt",
      ciphertext: lastTransfer ? shortSig(lastTransfer.sig) : "—",
      plaintext: lastTransfer ? `transfer / ${formatUi(lastTransfer.amount_ui)}` : "—",
      accent: "border-sol-purple/60",
      extra: state.auditor.recent_events.slice(0, 3).map((e) => ({
        label: `${e.kind} · ${formatUi(e.amount_ui)}`,
        sig: e.sig,
      })),
    },
    {
      role: "Chain analyst / Public",
      sub: "no key",
      ciphertext: senderCt,
      plaintext: null,
      accent: "border-sol-magenta/60",
    },
  ];
}

function shortCt(ct: string | null | undefined): string {
  if (!ct) return "—";
  if (ct.length <= 18) return ct;
  return `${ct.slice(0, 10)}…${ct.slice(-6)}`;
}

function shortSig(sig: string): string {
  if (!sig || sig.length <= 14) return sig;
  return `${sig.slice(0, 8)}…${sig.slice(-4)}`;
}

function formatUi(n: number): string {
  return `${n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} USDC`;
}

const placeholderColumns: Column[] = [
  {
    role: "Sender / Treasury",
    sub: "owner decrypt",
    ciphertext: "enc(…)",
    plaintext: "—",
    accent: "border-ink-line",
  },
  {
    role: "Receiver / Vendor",
    sub: "owner decrypt",
    ciphertext: "enc(…)",
    plaintext: "—",
    accent: "border-sol-green/60",
  },
  {
    role: "Auditor / Regulator",
    sub: "global decrypt",
    ciphertext: "—",
    plaintext: "—",
    accent: "border-sol-purple/60",
  },
  {
    role: "Chain analyst / Public",
    sub: "no key",
    ciphertext: "enc(…)",
    plaintext: null,
    accent: "border-sol-magenta/60",
  },
];
