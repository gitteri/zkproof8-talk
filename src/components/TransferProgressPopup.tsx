"use client";

import clsx from "clsx";

import type { TransferProgress } from "@/lib/api";

interface Props {
  open: boolean;
  events: TransferProgress[];
  title?: string;
  onClose?: () => void;
}

type Status = "running" | "done" | "error";

export function TransferProgressPopup({
  open,
  events,
  title = "Live transfer",
  onClose,
}: Props) {
  if (!open) return null;

  const phases = events.filter(
    (e): e is Extract<TransferProgress, { type: "phase" }> => e.type === "phase",
  );
  const sigs = events.filter(
    (e): e is Extract<TransferProgress, { type: "signature" }> => e.type === "signature",
  );
  const done = events.find(
    (e): e is Extract<TransferProgress, { type: "done" }> => e.type === "done",
  );
  const errored = events.find(
    (e): e is Extract<TransferProgress, { type: "error" }> => e.type === "error",
  );

  const status: Status = errored ? "error" : done ? "done" : "running";

  // Build the timeline in original order, then reverse so newest is at top.
  const timeline = events
    .map((ev, idx) => ({ ev, idx }))
    .filter(({ ev }) => ev.type === "phase" || ev.type === "signature")
    .reverse();

  const lastPhase = phases.at(-1);
  const subtitle =
    status === "done"
      ? "Complete"
      : status === "error"
        ? "Failed"
        : lastPhase?.detail ?? "Starting…";

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-ink/85 backdrop-blur">
      <div className="flex max-h-[min(80vh,720px)] w-[min(900px,calc(100vw-4rem))] flex-col overflow-hidden rounded-lg border border-ink-line bg-ink-softer/95 shadow-2xl">
        <div className="flex flex-none items-center justify-between border-b border-ink-line px-6 py-4">
          <div className="flex items-center gap-3">
            <StatusDot status={status} />
            <div>
              <div className="font-mono text-deck-xs uppercase text-bone-mute">
                {title}
              </div>
              <div className="font-sans text-deck-base font-semibold text-bone">
                {subtitle}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 font-mono text-deck-xs uppercase text-bone-mute">
            <span>
              {sigs.length} {sigs.length === 1 ? "tx" : "txs"}
            </span>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="hover:text-bone"
              >
                close · esc
              </button>
            )}
          </div>
        </div>

        <ol className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-6 py-5">
          {timeline.map(({ ev, idx }) => (
            <TimelineRow
              key={`${ev.type}-${idx}`}
              ev={ev}
              isLatest={idx === events.length - 1}
              status={status}
            />
          ))}
          {timeline.length === 0 && (
            <li className="font-mono text-deck-xs text-bone-mute">
              waiting for backend…
            </li>
          )}
        </ol>

        {errored && (
          <div className="flex-none border-t border-ink-line bg-sol-magenta/10 px-6 py-3 font-mono text-deck-xs text-sol-magenta">
            {errored.message}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: Status }) {
  const base = "h-3 w-3 rounded-full";
  if (status === "done") return <span className={clsx(base, "bg-sol-green")} />;
  if (status === "error")
    return <span className={clsx(base, "bg-sol-magenta")} />;
  return <span className={clsx(base, "bg-sol-purple animate-pulse")} />;
}

function TimelineRow({
  ev,
  isLatest,
  status,
}: {
  ev: TransferProgress;
  isLatest: boolean;
  status: Status;
}) {
  if (ev.type === "phase") {
    const isPending = isLatest && status === "running";
    return (
      <li className="event-appear flex items-start gap-4 rounded-md border border-ink-line bg-ink/40 px-4 py-3">
        <span
          className={clsx(
            "mt-2 h-2 w-2 flex-none rounded-full",
            isPending ? "bg-sol-purple animate-pulse" : "bg-sol-green",
          )}
        />
        <div className="flex min-w-0 flex-col">
          <span className="font-mono text-deck-xs uppercase text-bone-mute">
            {ev.name}
          </span>
          <span className="font-sans text-deck-sm text-bone">{ev.detail}</span>
        </div>
      </li>
    );
  }
  if (ev.type === "signature") {
    return (
      <li className="event-appear flex items-start gap-4 rounded-md border border-sol-green/40 bg-sol-green/5 px-4 py-3">
        <span className="mt-2 inline-flex flex-none items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-sol-green">
          tx
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="font-mono text-deck-xs uppercase text-bone-mute">
            {ev.label}
          </span>
          <code className="truncate font-mono text-deck-sm text-bone">
            {ev.sig}
          </code>
        </div>
      </li>
    );
  }
  return null;
}
