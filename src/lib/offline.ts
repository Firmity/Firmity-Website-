"use client";
// Offline resilience for the surveyor.
//
// Two responsibilities:
//   1. Cache the survey bundle + answers in localStorage so the survey reopens
//      without a network (read-through cache = "last known good" snapshot).
//   2. An outbox: un-synced answer edits are persisted keyed by client_uuid, so
//      they survive a reload and are flushed when connectivity returns.
//
// Analogy: the outbox is a drafts folder. You keep writing while offline; the
// moment the network is back, everything queued gets delivered, deduped by its
// idempotency key (client_uuid) so re-sends never double-apply.

import { useEffect, useState } from "react";

const NS = "fh"; // firmity-health namespace
const keyOf = (surveyId: string, kind: string) => `${NS}:${surveyId}:${kind}`;

export interface OutboxPayload {
  question_id: string;
  area: string;
  value: string | null;
  remark: string | null;
  client_uuid: string;
}

function safeGet<T>(k: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(k);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function safeSet<T>(k: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(k, JSON.stringify(data));
  } catch {
    /* quota or serialization failure — cache is best-effort, never throws */
  }
}

// ---- read-through cache (survey bundle, answers) ----
export const cacheSet = <T>(surveyId: string, kind: string, data: T): void =>
  safeSet(keyOf(surveyId, kind), data);

export const cacheGet = <T>(surveyId: string, kind: string): T | null =>
  safeGet<T>(keyOf(surveyId, kind));

// ---- outbox (map of client_uuid -> payload, so re-enqueues dedupe) ----
type OutboxMap = Record<string, OutboxPayload>;

export function outboxMerge(surveyId: string, payloads: OutboxPayload[]): void {
  const cur = safeGet<OutboxMap>(keyOf(surveyId, "outbox")) ?? {};
  for (const p of payloads) cur[p.client_uuid] = p;
  safeSet(keyOf(surveyId, "outbox"), cur);
}

export function outboxAll(surveyId: string): OutboxPayload[] {
  return Object.values(safeGet<OutboxMap>(keyOf(surveyId, "outbox")) ?? {});
}

export function outboxClear(surveyId: string, uuids: string[]): void {
  const cur = safeGet<OutboxMap>(keyOf(surveyId, "outbox")) ?? {};
  for (const u of uuids) delete cur[u];
  safeSet(keyOf(surveyId, "outbox"), cur);
}

export function outboxCount(surveyId: string): number {
  return Object.keys(safeGet<OutboxMap>(keyOf(surveyId, "outbox")) ?? {}).length;
}

// ---- connectivity hook ----
export function useOnline(): boolean {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);
  return online;
}
