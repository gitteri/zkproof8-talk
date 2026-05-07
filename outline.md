# Confidential Transfers for Payment Companies

**Venue:** zkproof8 Rome, Day 2, 16:30  
**Length:** 25 minutes, target ~22 spoken + buffer  
**Audience:** cryptographers and ZK researchers  
**Speaker:** Ilan Gitter, Solana Foundation

**Thesis:**
> Large payment companies do not need public-chain anonymity as the first step. They need private amounts, recognizable account operations, and accountable disclosure. Solana confidential transfers are the deployable middle, and the next bottlenecks are exactly where this room can help.

---

## Revised Flow

1. **Intro** — why I am the translator between ZK research, Solana protocol work, and payment-company deployment.
2. **Problem** — public balances leak business strategy; legacy rails already hide this.
3. **Protocol** — visually step through the confidential transfer lifecycle, then map deployed pieces back to papers, then defend the design choice (accounts vs UTXOs).
4. **Deployment hurdles** — adoption, transaction sizes, composability, auditor key.
5. **Live demo** — sender / receiver / auditor / public analyst see different truths from the same transfer.
6. **What gets built** — payment products, then encrypted applications more broadly.
7. **Adoption** — who has a reason to use this and what has to be true before traffic moves.
8. **Questions / open problems** — specific primitive and system asks for zkproof8.

---

## Slide Map

Total target: 18 slides, ~22 minutes spoken.

| # | Section | Title | Time |
|---|---|---|---|
| 1 | Intro | Title | 0:15 |
| 2 | Intro | About me | 0:30 |
| 3 | Problem | The treasury question | 1:20 |
| 4 | Problem | Public amounts leak business strategy | 1:20 |
| 5 | Protocol | Confidential transfers at a glance | 1:00 |
| 6 | Protocol | Protocol overview | 2:10 |
| 7 | Protocol | Protocol vs paper | 1:50 |
| 8 | Protocol | Why not UTXOs? | 1:20 |
| 9 | Deployment | Adoption hurdles | 1:10 |
| 10 | Deployment | Auditor key | 1:10 |
| 11 | Demo | Demo setup | 0:45 |
| 12 | Demo | Live transfer | 1:50 |
| 13 | Ecosystem | Payment products | 1:00 |
| 14 | Ecosystem | Beyond payments | 1:00 |
| 15 | Adoption | Who's going to use this | 1:10 |
| 16 | Adoption | What has to be true | 0:50 |
| 17 | Questions | Open problems | 1:30 |
| 18 | Questions | Questions | 0:15 |

Spoken total: ~21 minutes. Leaves buffer for transitions and slip.

---

## Notes To Fill Before Rome

- Confirm exactly which names are cleared for slide 15. The slide is written to work with archetypes even if names are withheld.
- Replace the placeholder GitHub URL on slide 18.
- Decide demo mode during rehearsal: local cluster should be the talk-safe default; devnet is optional if the network environment is stable.
- If there is a verified audit incident worth telling, keep it in Q&A or backup unless the talk needs more credibility-through-honesty.
- Quantum is off-deck. It can be backup material if someone asks about harvest-now-decrypt-later.
- Mobile companion view (speaker notes + remote control) — defer until deck content is locked.

---

## Slide-by-slide Intent

### 1 — Title
Set the promise: confidential transfers for payment companies, not generic privacy discourse.

### 2 — About me
One sentence on screen. Establish the bridge role verbally. Don't read the slide.

### 3 — The treasury question
Anchor the talk in the recurring buyer question: "Can anyone see our business flows onchain?" The answer on public-chain rails is yes.

### 4 — Public amounts leak business strategy
Five concrete leak vectors specific to payment companies (cross-border settlement, mint/burn, payroll/vendor, treasury rebalancing, interbank). Right column compares ACH / SWIFT / Card networks / public chains on counterparty visibility.

### 5 — Confidential transfers at a glance
Model before details: two accounts with encrypted balances, transfer arrow between them, three audience views (public chain, owners, auditor — auditor optional per mint).

### 6 — Protocol overview
Right-arrow steps through the lifecycle: configure mint → opt-in → deposit → apply pending → transfer → withdraw. Each step shows what the public chain sees, what the owner sees, what the auditor sees. Substep nav is local; arrow keys advance to next slide once last substep is reached.

### 7 — Protocol vs paper
The zkproof8 photo slide. Five primitives mapped to paper citations and SDK types (Twisted ElGamal, Pedersen, Sigma protocols, grouped multi-recipient validity, Bulletproof range). Sidebar lists deployment-only details: AES-GCM-SIV second ciphertext, proof context state accounts, ZK ElGamal Proof Program separation, lo/hi 16-bit pending split.

### 8 — Why not UTXOs?
Pre-answer the cryptographer's first question now that the protocol is on screen. Three-row comparison (UTXOs / accounts / plain SPL) on best-at and cost. Constraint set on the right: account-based reconciliation, per-mint policy hooks, recoverable identity, compliance hooks at issuance.

### 9 — Adoption hurdles
Three real product constraints: ecosystem adoption (Token Extensions coverage uneven), transaction sizes (proofs split across 4 transactions today), composability (encrypted-input composability is unsolved).

### 10 — Auditor key
Grouped 3-handle validity proof binds sender, receiver, and auditor ciphertexts. What it gives (mint-level decryption, SAR review, compliance story) vs what institutions still need (selective disclosure protocol, regulatory clarity, long-term key management).

### 11 — Demo setup
Local cluster vs devnet. The protocol story is the same either way; local is talk-safe.

### 12 — Live transfer
Four perspectives: sender, receiver, auditor, public analyst. Same transaction, different authorized views. The closing demo.

### 13 — Payment products
Treasury rebalancing, B2B settlement, stablecoin operations.

### 14 — Beyond payments
Twisted ElGamal as a Solana primitive: private order books, sealed-bid auctions, encrypted governance. Adjacent stacks (Arcium MPC, MagicBlock TEE, Bonsol ZK) explore other points in the design space.

### 15 — Who's going to use this
Stablecoin issuers, payment networks, treasury operators. Cleared names where possible; archetypes elsewhere.

### 16 — What has to be true
Deployment scorecard: custody, audit operations, performance, integrations.

### 17 — Open problems
Concrete asks for the room: smaller range proofs, threshold auditor keys, bounded balance reads, programmable disclosure, encrypted composability, account UX standards.

### 18 — Questions
Q&A magnet. Invite technical challenge and follow-up.

---

## Backup Material

- Detailed audit timeline, if cleared and useful.
- Post-quantum / harvest-now-decrypt-later discussion.
- Multi-source key derivation walkthrough (sRFC) — kept for wallet-developer audiences.
- Transaction byte breakdown and verification-cost details.
- Full source links for confidential transfer primitives and Solana proof program internals.
