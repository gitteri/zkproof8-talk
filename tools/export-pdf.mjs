// Render every slide of the deck to a single PDF.
//
// Usage:
//   pnpm build && pnpm start --port 3000   # in one terminal
//   pnpm export-pdf                        # in another
//
// Output:
//   ./zkproof8-confidential-transfers.pdf

import { writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";

const BASE = process.env.DECK_BASE_URL ?? "http://localhost:3000";
const OUT = process.env.DECK_PDF_OUT ?? "zkproof8-confidential-transfers.pdf";
const WIDTH = 1920;
const HEIGHT = 1080;

async function fetchSlideCount() {
  const res = await fetch(`${BASE}/s/1`);
  if (!res.ok) throw new Error(`deck not reachable at ${BASE} (${res.status})`);
  const html = await res.text();
  const match = html.match(/(\d{1,3})\s*<\/span>\s*<\/div>\s*<\/div>/);
  return match ? Number(match[1]) : null;
}

async function main() {
  const total = (await fetchSlideCount()) ?? 17;
  console.log(`exporting ${total} slides from ${BASE}`);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  const merged = await PDFDocument.create();

  for (let i = 1; i <= total; i++) {
    const url = `${BASE}/s/${i}`;
    process.stdout.write(`  ${String(i).padStart(2, "0")}/${total}  ${url}  `);
    await page.goto(url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);

    const pdfBuf = await page.pdf({
      width: `${WIDTH}px`,
      height: `${HEIGHT}px`,
      printBackground: true,
      pageRanges: "1",
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    const src = await PDFDocument.load(pdfBuf);
    const [copied] = await merged.copyPages(src, [0]);
    merged.addPage(copied);
    process.stdout.write("ok\n");
  }

  await browser.close();

  const bytes = await merged.save();
  await writeFile(OUT, bytes);
  console.log(`wrote ${OUT} (${(bytes.length / 1024).toFixed(0)} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
