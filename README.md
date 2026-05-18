# zkproof8 — Confidential Transfers for Payment Orgs

Slides and supporting material for a 25-minute talk at [zkproof8](https://zkproof.org/events/zkproof-8/) in Rome (Day 2, 16:30) by Ilan Gitter, Solana Foundation.

The deck is a Next.js webapp rather than a static slide export, so it can host live demos against a Rust backend talking to Solana's Token-2022 confidential transfer extension.

## What's in here

- `src/slides/NN-name.tsx` — one React component per slide
- `src/lib/slides.ts` — slide registry (titles, sections, time budgets, presenter notes)
- `src/components/` — shared `SlideFrame`, deck chrome, demo widgets
- `src/lib/api.ts` — typed client for the optional demo backend
- `outline.md` — narrative structure and time budget
- `cryptography-article.md` — long-form companion article on the cryptographic primitives Solana exposes
- `cryptography-thread.md` — short-form social thread version
- `cryptography-map.html` — standalone interactive map of Solana's ZK-relevant syscalls and programs

## Run the deck

```bash
pnpm install
pnpm dev          # http://localhost:3000 → redirects to /s/1
```

Without the demo backend running, the live-transfer slide will show a connection error in place of the interactive panel; every other slide works standalone.

## Demo backend

The live-transfer slide drives a Rust backend in a companion repo:

**[gitteri/confidential-balances-exploration](https://github.com/gitteri/confidential-balances-exploration)**

It exposes `init / transfer / apply-pending / state / health / events` over HTTP + SSE and talks to Solana's Token-2022 confidential transfer extension. Point the deck at it via `NEXT_PUBLIC_DEMO_API` (see `.env.example`); the default is `http://localhost:8088`.

## Talk-day setup

```bash
# optional: local validator with the ZK ElGamal Proof program enabled,
# matching the surface area available on devnet/mainnet
surfpool

# demo backend — see https://github.com/gitteri/confidential-balances-exploration
cargo run --release --bin demo-server

# slides
pnpm dev --port 3000
```

## Keyboard

| Key | Action |
| --- | --- |
| `←` `→` `Space` | prev / next |
| `Home` `End` | first / last |
| `1`–`9` | jump to slide |
| `O` | overview |
| `P` | presenter notes |
| `B` `.` | blank screen |
| `Esc` | close overlays |

## Outline

17 slides across intro → problem → protocol → deployment → demo → ecosystem → questions. Full structure with time budgets in [`outline.md`](./outline.md); presenter notes live inline in `src/lib/slides.ts`.

## Brand

Colors approximate the Solana palette:

- `sol-purple` `#9945FF`, `sol-magenta` `#DC1FFF`, `sol-green` `#14F195`
- Background `#0B0B0F`, foreground `#F5F5F2`

Fonts are Inter + JetBrains Mono via `next/font/google`. Solana's licensed brand font (Diatype) is not redistributable; swap it into `src/app/layout.tsx` if you have a license.

## Build

```bash
pnpm build && pnpm start --port 3000
```

Every slide prerenders, so an offline PDF backup can be generated with Playwright if needed.

## License

[MIT](./LICENSE). Slide content, code, and the companion writeups are all free to read, fork, and remix with attribution. The Solana brand assets and Diatype font are not included and are not covered by this license.

## Contact

- x: [@nocircuit](https://x.com/nocircuit)
- github: [@gitteri](https://github.com/gitteri)
