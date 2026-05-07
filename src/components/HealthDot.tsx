"use client";

import clsx from "clsx";

import { useHealth } from "@/hooks/useDemo";

export function HealthDot() {
  const { status } = useHealth();
  const color =
    status === "ok"
      ? "bg-sol-green"
      : status === "down"
        ? "bg-sol-magenta"
        : "bg-bone-mute";
  const label =
    status === "ok"
      ? "demo backend ok"
      : status === "down"
        ? "demo backend down"
        : "demo backend unknown";
  return (
    <span
      className="inline-flex items-center gap-2"
      title={label}
      aria-label={label}
    >
      <span
        className={clsx(
          "h-2 w-2 rounded-full transition-colors",
          color,
          status === "down" && "animate-pulse",
        )}
      />
    </span>
  );
}
