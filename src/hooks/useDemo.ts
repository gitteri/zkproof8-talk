"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { api, Health, LedgerState, subscribeProgress, TransferProgress } from "@/lib/api";

export type HealthStatus = "unknown" | "ok" | "down";

export function useHealth(pollMs = 5000) {
  const [health, setHealth] = useState<Health | null>(null);
  const [status, setStatus] = useState<HealthStatus>("unknown");

  useEffect(() => {
    let alive = true;

    const tick = async () => {
      try {
        const h = await api.health();
        if (!alive) return;
        setHealth(h);
        setStatus(h.ok && h.validator_reachable ? "ok" : "down");
      } catch {
        if (!alive) return;
        setStatus("down");
      }
    };

    void tick();
    const id = window.setInterval(tick, pollMs);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, [pollMs]);

  return { health, status };
}

export function useDemoState(active: boolean, pollMs = 1000) {
  const [state, setState] = useState<LedgerState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const aliveRef = useRef(true);
  const busyRef = useRef(false);

  useEffect(() => {
    busyRef.current = busy;
  }, [busy]);

  useEffect(() => {
    aliveRef.current = true;
    if (!active) return undefined;

    const tick = async () => {
      if (!aliveRef.current) return;
      // Skip polls while a mutation is in flight — the mutation returns the
      // new state on completion, and competing RPC traffic slows the demo.
      if (busyRef.current) return;
      try {
        const r = await api.state();
        if (!aliveRef.current) return;
        setState(r.state);
        setError(null);
      } catch (e) {
        if (!aliveRef.current) return;
        setError((e as Error).message);
      }
    };

    void tick();
    const id = window.setInterval(tick, pollMs);
    return () => {
      aliveRef.current = false;
      window.clearInterval(id);
    };
  }, [active, pollMs]);

  const runTransfer = useCallback(async (amount_ui?: number) => {
    setBusy(true);
    try {
      const r = await api.transfer(amount_ui);
      setState(r.state);
      setError(null);
      return r;
    } catch (e) {
      setError((e as Error).message);
      return null;
    } finally {
      setBusy(false);
    }
  }, []);

  const runApply = useCallback(async (who: "sender" | "receiver") => {
    setBusy(true);
    try {
      const r = await api.applyPending(who);
      setState(r.state);
      setError(null);
      return r;
    } catch (e) {
      setError((e as Error).message);
      return null;
    } finally {
      setBusy(false);
    }
  }, []);

  const runInit = useCallback(async () => {
    setBusy(true);
    try {
      const r = await api.init();
      setState(r.state);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }, []);

  return { state, busy, error, runTransfer, runApply, runInit };
}

/**
 * Live transfer progress: a rolling list of events from the backend SSE stream.
 * Resets when `reset()` is called (e.g., when starting a new transfer).
 */
export function useTransferProgress() {
  const [events, setEvents] = useState<TransferProgress[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const cleanup = subscribeProgress(
      (ev) => {
        setEvents((prev) => [...prev, ev]);
        setConnected(true);
      },
      () => setConnected(false),
    );
    setConnected(true);
    return cleanup;
  }, []);

  const reset = useCallback(() => setEvents([]), []);

  /** Append events programmatically (e.g., synthetic fallback when SSE is silent). */
  const push = useCallback((items: TransferProgress[]) => {
    setEvents((prev) => [...prev, ...items]);
  }, []);

  return { events, connected, reset, push };
}
