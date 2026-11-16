// 오키나와 일정 페이지 체크 상태(일정·체크리스트·쇼핑)를 두 사람 폰이 함께 보도록 저장한다.
// 객체 하나에 모든 키를 두어 읽기·쓰기가 바로 일관되게 보인다.
import { DurableObject } from "cloudflare:workers";

const ORIGINS = ["https://fivetaku.github.io", "http://localhost:8765"];
const LISTS = ["stop", "ck", "shop"];
const KEY_RE = /^[\w\-\/@:.]{1,80}$/;
const MAX_KEYS = 3000;

export class SyncState extends DurableObject {
  async state() {
    const out = { stop: [], ck: [], shop: [] };
    for (const [k] of await this.ctx.storage.list()) { const i = k.indexOf("|"); const l = k.slice(0, i); if (out[l]) out[l].push(k.slice(i + 1)); }
    return out;
  }
  async set(list, key, on) {
    const k = `${list}|${key}`;
    if (on) { if ((await this.ctx.storage.list({ limit: MAX_KEYS + 1 })).size >= MAX_KEYS) throw new Error("full"); await this.ctx.storage.put(k, 1); }
    else await this.ctx.storage.delete(k);
  }
}

const cors = origin => ({
  "Access-Control-Allow-Origin": ORIGINS.includes(origin) ? origin : ORIGINS[0],
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
  "Vary": "Origin",
});
const json = (body, status, origin) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...cors(origin) } });

export default {
  async fetch(req, env) {
    const origin = req.headers.get("Origin") || "";
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
    const url = new URL(req.url);
    if (url.pathname !== "/state") return json({ error: "not found" }, 404, origin);
    const stub = env.STATE.get(env.STATE.idFromName("okinawa-2026"));
    if (req.method === "GET") return json(await stub.state(), 200, origin);
    if (req.method !== "POST") return json({ error: "method" }, 405, origin);
    if (origin && !ORIGINS.includes(origin)) return json({ error: "origin" }, 403, origin);
    let ops; try { const b = await req.json(); ops = Array.isArray(b.ops) ? b.ops : [b]; } catch { return json({ error: "bad json" }, 400, origin); }
    if (!ops.length || ops.length > 200) return json({ error: "ops" }, 400, origin);
    for (const o of ops) if (!LISTS.includes(o.list) || typeof o.key !== "string" || !KEY_RE.test(o.key) || typeof o.on !== "boolean") return json({ error: "bad op" }, 400, origin);
    try { for (const o of ops) await stub.set(o.list, o.key, o.on); } catch { return json({ error: "full" }, 507, origin); }
    return json(await stub.state(), 200, origin);
  },
};
