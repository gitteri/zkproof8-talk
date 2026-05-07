import clsx from "clsx";
import type { ReactNode } from "react";

interface SlideFrameProps {
  children: ReactNode;
  align?: "center" | "start";
  padded?: boolean;
  className?: string;
}

export function SlideFrame({
  children,
  align = "center",
  padded = true,
  className,
}: SlideFrameProps) {
  return (
    <div
      className={clsx(
        "absolute inset-0 flex flex-col mb-8",
        align === "center" ? "items-center justify-center" : "items-start justify-start",
        padded && "px-20 py-12",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface SlideEyebrowProps {
  children: ReactNode;
  className?: string;
}

export function SlideEyebrow({ children, className }: SlideEyebrowProps) {
  return (
    <div
      className={clsx(
        "font-mono text-deck-xs uppercase text-bone-mute",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface SlideTitleProps {
  children: ReactNode;
  size?: "lg" | "xl" | "2xl";
  className?: string;
}

export function SlideTitle({ children, size = "xl", className }: SlideTitleProps) {
  const sizeClass =
    size === "2xl"
      ? "text-deck-2xl"
      : size === "xl"
        ? "text-deck-xl"
        : "text-deck-lg";
  return (
    <h1
      className={clsx(
        "font-sans font-semibold text-bone",
        sizeClass,
        className,
      )}
    >
      {children}
    </h1>
  );
}
