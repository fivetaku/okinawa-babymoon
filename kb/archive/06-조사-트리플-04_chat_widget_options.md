# 조사: 트리플 앱 기능 — 04_chat_widget_options

> 출처: 리서치 2026-11-09 (일정 페이지 기능 보완용)
> 공개 보관용 사본. 예약번호·실명·연락처는 마스킹했다. 최종 일정의 정본은 kb/okinawa-itinerary.md 다.

조사가 끝났습니다. 결론부터 말하면 **추천안은 (A) Cloudflare Workers 프록시 + Claude Haiku 5.5 + 프롬프트 캐시**입니다. 월 비용은 사실상 0원(Workers 무료 + Haiku 토큰 1달러 미만), 키는 서버에만 있고, 모바일 사파리에서 그냥 `fetch` 하나로 동작하며, 코드는 Worker 40줄 + 프론트 30줄 수준입니다. 아래 근거입니다.

## 전제: 사용량 산정

- data.js 약 20KB(한국어 UTF-8 ≈ 6,500~7,000자) ≈ 시스템 프롬프트 약 8~12K 토큰. Claude 4.7 이후 토크나이저는 같은 텍스트에 약 30% 토큰이 더 나오므로 넉넉히 12K로 잡았습니다([가격 문서](https://platform.claude.com/docs/en/about-claude/pricing)).
- 가족 2인 × 5일 × 하루 20문답 = 최대 200회, 현실적으로 100회 안팎.

## 방안별 비교

### (A) 서버리스 프록시(Cloudflare Workers / Pages Functions / Vercel)

| 항목 | 내용 |
|---|---|
| 월 비용 | Workers 무료: 하루 10만 요청, 요청당 CPU 10ms(네트워크 대기는 미포함), 메모리 128MB, HTTP 요청 시간 제한 없음 — [Limits](https://developers.cloudflare.com/workers/platform/limits/). Pages Functions 요청도 이 10만/일에 합산 — [Pages Functions 요금](https://developers.cloudflare.com/pages/functions/pricing/). Vercel Hobby: 함수 호출 월 100만, 최대 300초, 2GB/1vCPU, 단 비상업 개인용만 — [Limits](https://vercel.com/docs/limits), [Fair Use](https://vercel.com/docs/limits/fair-use-guidelines). 토큰비: Haiku 5.5 입력 $0.10/M·출력 $0.50/M·캐시 히트 $0.01/M → 200회 × (12K 입력 + 300 출력) ≈ $0.27, 캐시 적용 시 $0.05 안팎. Sonnet 5.5($2/$10)면 약 $5. |
| 키 노출·남용 방지 | 키는 Worker 시크릿에만 존재. 방어 3겹: ① `Origin`이 `fivetaku.github.io`일 때만 CORS 허용, ② Rate Limiting 바인딩(`simple.limit/period`, 10초 또는 60초 단위, 위치별 근사치) — [Rate limit 바인딩](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/), ③ 선택: Turnstile 토큰을 `POST https://challenges.cloudflare.com/turnstile/v0/siteverify`로 검증(토큰 5분·1회용) — [서버 검증](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/). 가족용이면 ①+②에 `max_tokens` 상한, 또는 URL 쿼리에 가족 공유 비밀번호 하나만 붙여도 충분합니다. |
| 모바일 사파리 | 일반 fetch + SSE 스트리밍 모두 동작. 제약 없음. |
| 구현 난이도 | Worker 약 40줄, 프론트 약 30줄. wrangler 설치·`wrangler secret put` 1회. |
| 오프라인 | 불가(네트워크 필수). 일정 페이지 자체는 정적이라 열리고, 채팅만 비활성화. |
| 컨텍스트 주입 | Worker 쪽에서 `system: [{type:"text", text: DATA, cache_control:{type:"ephemeral"}}]`로 data.js 전문을 넣음. data.js를 Worker에 번들하거나 Worker가 GitHub Pages의 `data.js`를 fetch해 캐시. 주의: 브라우저 요청을 그대로 전달하면 `Origin` 헤더 때문에 Anthropic이 거부할 수 있으니 Worker가 **새 요청을 만들어** 호출해야 함 — [Authentication 문서](https://platform.claude.com/docs/en/manage-claude/authentication). |

### (B) 브라우저 내 온디바이스 LLM(WebLLM / transformers.js)

| 항목 | 내용 |
|---|---|
| 월 비용 | $0. 모델 파일은 Hugging Face CDN에서 받음. |
| 키 노출 | 없음(키 자체가 없음). |
| 모바일 사파리 | WebGPU가 iOS 26/Safari 26부터 기본 활성 — [WebKit 블로그](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/). 그 이하 iOS는 불가. WebLLM FAQ 기준 모바일은 Grade C(VRAM 2GB 미만)로 Qwen2.5-1.5B(약 1.0~1.5GB 다운로드) 권장, OPFS에 캐시 — [WebLLM FAQ](https://webllm.io/docs/faq/). 1.5B급은 한국어 일정 질의응답 품질이 낮고, 12K 토큰 컨텍스트를 모바일에서 넣으면 메모리 압박으로 탭이 죽을 가능성이 큼. |
| 구현 난이도 | 라이브러리 로드 + 모델 다운로드 진행바 + 폴백 처리로 100줄 이상. 가장 번거로움. |
| 오프라인 | 가능(모델 캐시 후). 유일한 오프라인 방안. |
| 컨텍스트 주입 | 시스템 프롬프트로 넣되, 1.5B 모델은 20KB를 소화하기 어려워 날짜별로 잘라 넣는 RAG 흉내가 필요. |

### (C) Chrome 내장 Prompt API(Gemini Nano)

| 항목 | 내용 |
|---|---|
| 가용성 | Chrome 148+ 데스크톱(Windows/macOS 13+/Linux/Chromebook Plus)만. 문서 원문: "Chrome for Android, iOS, and ChromeOS on non-Chromebook Plus devices are not yet supported" — [Prompt API](https://developer.chrome.com/docs/ai/prompt-api), [Get started](https://developer.chrome.com/docs/ai/get-started). 하드웨어: 디스크 여유 22GB, VRAM 4GB 초과 또는 RAM 16GB+4코어. |
| 결론 | 여행 중 쓰는 아이폰 사파리에서는 **동작 자체가 안 됨**. 비용 0·오프라인 가능이지만 이 용도에는 탈락. 데스크톱 보너스 기능으로만 의미. |

### (D) SaaS 위젯(Chatbase / CustomGPT / Crisp)

| 서비스 | 2026 기준 | 데이터 주입 |
|---|---|---|
| Chatbase | 영구 무료 플랜 없음, 7일 체험. 최저 Hobby $40/월(700 크레딧) — [가격](https://www.chatbase.co/pricing) | 텍스트/파일/URL 업로드 |
| CustomGPT.ai | 무료 없음, 7일 체험. Standard $99/월 — [가격](https://customgpt.ai/pricing/) | 문서·사이트맵 업로드 |
| Crisp | Free $0이지만 AI 크레딧 0(AI 봇 불가). AI는 Mini $45/월부터 — [가격](https://crisp.chat/en/pricing/) | 지식베이스 |

5일 가족용에 월 40~99달러는 과하고, 위젯 스크립트가 외부 브랜딩을 붙이며, 흑백 미니멀 디자인 선호와도 맞지 않습니다. 탈락.

### (E) 사용자 키를 localStorage에 넣고 브라우저에서 Anthropic 직접 호출

| 항목 | 내용 |
|---|---|
| CORS 지원 | **지원됨.** 헤더 `anthropic-dangerous-direct-browser-access: true`를 붙이면 허용(TS SDK는 `dangerouslyAllowBrowser: true`). 단 ZDR·Compliance API 조직은 헤더가 있어도 401 `CORS requests are not allowed for this Organization` — [Authentication 문서](https://platform.claude.com/docs/en/manage-claude/authentication). |
| 월 비용 | 토큰비만(A와 동일, Haiku 기준 $1 미만). 서버 0. |
| 키 노출 | 키가 각 기기 localStorage에 평문 보관. 가족 2인에게 키를 카톡으로 전달해야 하고, 페이지가 비공개라도 URL을 아는 사람은 코드를 볼 수 있음(키 자체는 코드에 없으니 노출은 기기 한정). 완화책: Console에서 **만료 7일 키**로 발급(여행 끝나면 자동 소멸), 워크스페이스 분리 후 지출 한도 설정. |
| 모바일 사파리 | 동작. 다만 iOS 사파리는 7일 미사용 시 localStorage를 지울 수 있어(ITP) 키 재입력 UI가 필요. |
| 구현 난이도 | 가장 적음: 프론트 약 40줄, 서버 없음. 키 입력 필드 1개 추가. |
| 오프라인 | 불가. |
| 컨텍스트 주입 | 프론트에서 data.js 전역 변수를 그대로 `system`에 넣음. 캐시도 동일 적용 가능. |

## 추천: (A) Cloudflare Workers + Haiku 5.5

이유 세 가지. ① 비용은 (E)와 같은데 키가 기기에 돌아다니지 않고, 여행 후 회수 걱정이 없음. ② (B)·(C)는 아이폰에서 품질이 낮거나 아예 안 됨. ③ Origin 검사 + 레이트리밋 + 7일 만료 키를 조합하면 유출돼도 피해 상한이 몇 달러. (E)는 "오늘 밤 안에 서버 없이 끝내고 싶다"일 때의 차선입니다.

### 최소 구현 스케치

**Worker (`src/index.js`, 엔드포인트 1개 `POST /chat`)**

```js
import DATA from "./data.txt";   // data.js 내용을 텍스트로 번들 (wrangler rules: Text)

const ORIGIN = "https://fivetaku.github.io";
const cors = {
  "Access-Control-Allow-Origin": ORIGIN,
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    if (req.headers.get("Origin") !== ORIGIN) return new Response("forbidden", { status: 403 });

    const { success } = await env.LIMITER.limit({ key: "family" });   // 예: 60초 30회
    if (!success) return new Response("slow down", { status: 429, headers: cors });

    const { messages } = await req.json();            // [{role, content}] 최근 10턴만 받기
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",                                  // 새 요청 생성 (Origin 미전달)
      headers: {
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2026-10-21",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-5-5",
        max_tokens: 600,
        stream: true,
        system: [{
          type: "text",
          text: "너는 가족 여행 일정 도우미다. 아래 일정 데이터만 근거로 한국어로 짧게 답한다.\n\n" + DATA,
          cache_control: { type: "ephemeral" },
        }],
        messages: messages.slice(-10),
      }),
    });
    return new Response(upstream.body, {
      status: upstream.status,
      headers: { ...cors, "content-type": "text/event-stream" },
    });
  },
};
```

`wrangler.jsonc`에 `ratelimits: [{ name: "LIMITER", namespace_id: "1001", simple: { limit: 30, period: 60 } }]`, 키는 `wrangler secret put ANTHROPIC_API_KEY`(Console에서 만료 7일 또는 30일 키로 발급).

**프론트 (index.html 안 JS, 약 30줄)**

```js
const API = "https://trip-chat.<계정>.workers.dev/chat";
const history = [];

async function ask(text) {
  history.push({ role: "user", content: text });
  const res = await fetch(API, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ messages: history }),
  });
  if (!res.ok) { render("잠시 후 다시 시도"); return; }

  const reader = res.body.getReader(), dec = new TextDecoder();
  let answer = "";
  for (;;) {
    const { value, done } = await reader.read(); if (done) break;
    for (const line of dec.decode(value).split("\n")) {
      if (!line.startsWith("data:")) continue;
      const ev = JSON.parse(line.slice(5));
      if (ev.type === "content_block_delta" && ev.delta?.text) { answer += ev.delta.text; render(answer); }
    }
  }
  history.push({ role: "assistant", content: answer });
}
```

채팅 UI는 하단 고정 입력창 + 말풍선 목록만 두면 되고, `navigator.onLine`이 false면 입력창을 비활성화해 오프라인 상태를 표시합니다.

미확인 사항 하나: Rate Limiting 바인딩이 Workers Free 플랜에서 추가 비용 없이 쓰이는지는 문서에 요금 표기가 없어 현재 미검증입니다. 안 되면 KV 카운터(무료 플랜 하루 1,000 쓰기)로 대체 가능합니다.

다음 행동: 승인하시면 `(로컬 경로)` 레포에 `worker/` 폴더와 index.html 채팅 블록을 실제로 붙이고, 로컬 `wrangler dev`로 질문 5건을 돌려 토큰·비용 실측을 보고하겠습니다.

## EXPAND
- Worker가 data.js를 번들하지 않고 GitHub Pages에서 매번 fetch + `caches.default`로 1시간 캐시하는 변형(일정 수정 시 재배포 불필요)
- 프롬프트 캐시 실측: 12K 시스템 프롬프트에서 캐시 히트율과 실제 청구액 비교
- (E) 변형으로 "가족 공유 비밀번호 → Worker가 키를 대신 보관" 하이브리드(비밀번호 틀리면 403)
- 데스크톱 크롬에서만 (C) Prompt API를 감지해 오프라인 폴백으로 쓰는 점진적 향상 코드
- iOS 26 보급률 확인 후 (B) WebLLM Qwen2.5-1.5B를 "비행기 모드 전용" 보조 채널로 넣을 가치가 있는지 벤치
