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
