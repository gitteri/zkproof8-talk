"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

import { HealthDot } from "@/components/HealthDot";
import {
  getNeighbors,
  getSlide,
  sectionLabel,
  slideCount,
  slides,
  totalSeconds,
} from "@/lib/slides";

interface DeckShellProps {
  slideId: number;
}

export function DeckShell({ slideId }: DeckShellProps) {
  const router = useRouter();
  const meta = getSlide(slideId);
  const { prev, next } = getNeighbors(slideId);

  const [showNotes, setShowNotes] = useState(false);
  const [blanked, setBlanked] = useState(false);
  const [showOverview, setShowOverview] = useState(false);

  const goto = useCallback(
    (id?: number) => {
      if (id == null) return;
      router.push(`/s/${id}`);
    },
    [router],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;

      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "PageDown":
          e.preventDefault();
          goto(next);
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          goto(prev);
          break;
        case "Home":
          e.preventDefault();
          goto(1);
          break;
        case "End":
          e.preventDefault();
          goto(slideCount);
          break;
        case "p":
        case "P":
          setShowNotes((v) => !v);
          break;
        case "b":
        case "B":
        case ".":
          setBlanked((v) => !v);
          break;
        case "Escape":
          setShowNotes(false);
          setShowOverview(false);
          setBlanked(false);
          break;
        case "o":
        case "O":
          setShowOverview((v) => !v);
          break;
        default:
          if (/^[0-9]$/.test(e.key)) {
            // numeric jump: collect for 800ms
            // simple variant: jump to single-digit slide if valid
            const id = Number(e.key);
            if (id >= 1 && id <= slideCount) goto(id);
          }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goto, prev, next]);

  if (!meta) {
    return (
      <main className="flex h-screen items-center justify-center">
        <p className="font-mono text-deck-sm text-bone-dim">
          slide {slideId} not found
        </p>
      </main>
    );
  }

  const Slide = meta.Component;
  const progressPct = (meta.id / slideCount) * 100;

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-ink text-bone">
      {/* Background grid, subtle */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />

      {/* Slide content */}
      <div
        className={clsx(
          "absolute inset-0 transition-opacity duration-300",
          blanked ? "opacity-0" : "opacity-100",
        )}
      >
        <Slide />
      </div>

      {blanked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <span className="font-mono text-deck-xs text-bone-mute">
            press B to resume
          </span>
        </div>
      )}

      {/* Top progress bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-ink-line">
        <div
          className="h-full bg-sol-gradient transition-[width] duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* HUD: bottom-right slide number */}
      <div className="pointer-events-none absolute bottom-6 right-8 flex items-center gap-3 font-mono text-deck-xs text-bone-mute">
        <span className="uppercase">{sectionLabel[meta.section]}</span>
        <span className="opacity-50">/</span>
        <span>
          {String(meta.id).padStart(2, "0")} · {slideCount}
        </span>
      </div>

      {/* HUD: bottom-left mini-title */}
      <div className="absolute bottom-6 left-8 flex items-center gap-3 whitespace-nowrap font-mono text-deck-xs text-bone-mute">
        <HealthDot />
        <span>zkproof8 · confidential transfers on Solana</span>
      </div>

      {/* Presenter notes overlay */}
      {showNotes && (
        <div className="absolute bottom-16 left-1/2 z-10 max-h-[40vh] w-[min(900px,calc(100vw-4rem))] -translate-x-1/2 overflow-auto rounded-lg border border-ink-line bg-ink-softer/95 p-6 shadow-2xl backdrop-blur">
          <div className="mb-2 flex items-center justify-between font-mono text-deck-xs uppercase text-bone-mute">
            <span>Notes · slide {meta.id}</span>
            <span>{Math.round(meta.timeSeconds)}s budget</span>
          </div>
          <p className="text-deck-sm leading-relaxed text-bone">
            {meta.notes}
          </p>
        </div>
      )}

      {/* Overview overlay */}
      {showOverview && <OverviewOverlay onPick={goto} currentId={meta.id} />}
    </main>
  );
}

function OverviewOverlay({
  onPick,
  currentId,
}: {
  onPick: (id: number) => void;
  currentId: number;
}) {
  return (
    <div className="absolute inset-0 z-20 overflow-auto bg-ink/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-12 py-16">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="font-sans text-deck-lg font-semibold">Overview</h2>
          <span className="font-mono text-deck-xs uppercase text-bone-mute">
            press O to close · {Math.round(totalSeconds / 60)}m total
          </span>
        </div>
        <OverviewList currentId={currentId} onPick={onPick} />
      </div>
    </div>
  );
}

function OverviewList({
  currentId,
  onPick,
}: {
  currentId: number;
  onPick: (id: number) => void;
}) {
  return (
    <ol className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {slides.map((s) => (
        <li key={s.id}>
          <button
            type="button"
            onClick={() => onPick(s.id)}
            className={clsx(
              "flex w-full items-center justify-between rounded-md border px-4 py-3 text-left transition-colors",
              s.id === currentId
                ? "border-sol-purple/60 bg-sol-purple/10"
                : "hairline border bg-ink-softer hover:border-bone-mute",
            )}
          >
            <span className="flex items-baseline gap-3">
              <span className="font-mono text-deck-xs text-bone-mute">
                {String(s.id).padStart(2, "0")}
              </span>
              <span className="font-sans text-deck-sm">{s.title}</span>
            </span>
            <span className="font-mono text-deck-xs text-bone-mute">
              {s.timeSeconds}s
            </span>
          </button>
        </li>
      ))}
    </ol>
  );
}
