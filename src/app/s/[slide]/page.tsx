import { notFound } from "next/navigation";

import { DeckShell } from "@/components/DeckShell";
import { getSlide, slides } from "@/lib/slides";

export function generateStaticParams() {
  return slides.map((s) => ({ slide: String(s.id) }));
}

export default async function SlidePage({
  params,
}: {
  params: Promise<{ slide: string }>;
}) {
  const { slide } = await params;
  const id = Number(slide);
  if (!Number.isFinite(id) || !getSlide(id)) {
    notFound();
  }
  return <DeckShell slideId={id} />;
}
