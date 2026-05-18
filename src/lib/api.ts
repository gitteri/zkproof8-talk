const BASE = process.env.NEXT_PUBLIC_DEMO_API ?? "http://localhost:8088";

export type AccountView = {
  owner: string;
  token_account: string;
  public_ui: number;
  pending_ct: string | null;
  pending_ui: number;
  available_ct: string | null;
  available_ui: number;
};

export type EventLog = {
  sig: string;
  kind: string;
  amount_ui: number;
  ts: string;
};

export type AuditorView = {
  authority: string;
  elgamal_pubkey: string;
  recent_events: EventLog[];
};

export type LedgerState = {
  mint: string;
  decimals: number;
  sender: AccountView;
  receiver: AccountView;
  auditor: AuditorView;
};

export type Health = {
  ok: boolean;
  validator_reachable: boolean;
  mint: string;
  port: number;
  rpc_url: string;
};

export type ActionResponse = {
  ok: boolean;
  signatures: string[];
  state: LedgerState;
};

/**
 * Stage-by-stage events emitted by the demo backend during a confidential
 * transfer. Mirrors `conf_balances_examples::types::TransferProgress`.
 */
export type TransferProgress =
  | { type: "phase"; name: string; detail: string }
  | { type: "signature"; label: string; sig: string }
  | { type: "done"; sigs: string[] }
  | { type: "error"; message: string };

/** Build a Solana Explorer URL for a transaction signature, picking the right
 *  cluster query string based on the backend's RPC URL. */
export function explorerUrl(sig: string, rpcUrl?: string | null): string {
  const base = `https://explorer.solana.com/tx/${sig}`;
  if (!rpcUrl) return base;
  if (rpcUrl.includes("devnet")) return `${base}?cluster=devnet`;
  if (rpcUrl.includes("testnet")) return `${base}?cluster=testnet`;
  if (
    rpcUrl.includes("localhost") ||
    rpcUrl.includes("127.0.0.1") ||
    rpcUrl.includes("surfnet")
  ) {
    return `${base}?cluster=custom&customUrl=${encodeURIComponent(rpcUrl)}`;
  }
  return base; // mainnet-beta default
}

/** Subscribe to the SSE event stream. Returns a cleanup function. */
export function subscribeProgress(
  onEvent: (ev: TransferProgress) => void,
  onError?: () => void,
): () => void {
  const es = new EventSource(`${BASE}/demo/events`);
  es.onmessage = (msg) => {
    try {
      const ev = JSON.parse(msg.data) as TransferProgress;
      onEvent(ev);
    } catch {
      /* ignore malformed payload */
    }
  };
  es.onerror = () => {
    if (onError) onError();
  };
  return () => es.close();
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const text = await res.text();
  let body: unknown;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text };
  }
  if (!res.ok) {
    const detail = (body as { error?: string })?.error ?? text;
    throw new Error(`${res.status} ${res.statusText}: ${detail}`);
  }
  return body as T;
}

export const api = {
  base: BASE,
  health: () => fetchJson<Health>("/demo/health"),
  state: () => fetchJson<{ ok: boolean; state: LedgerState }>("/demo/state"),
  init: () =>
    fetchJson<ActionResponse>("/demo/init", { method: "POST" }),
  transfer: (amount_ui?: number) =>
    fetchJson<ActionResponse>("/demo/transfer", {
      method: "POST",
      body: JSON.stringify({ amount_ui }),
    }),
  applyPending: (account: "sender" | "receiver") =>
    fetchJson<ActionResponse>("/demo/apply-pending", {
      method: "POST",
      body: JSON.stringify({ account }),
    }),
};
