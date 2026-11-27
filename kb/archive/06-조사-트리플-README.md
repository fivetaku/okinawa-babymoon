# 조사: 트리플 앱 기능 — README

> 출처: 리서치 2026-11-09 (일정 페이지 기능 보완용)
> 공개 보관용 사본. 예약번호·실명·연락처는 마스킹했다. 최종 일정의 정본은 kb/okinawa-itinerary.md 다.

# 트리플 기능 조사 · 채팅창 방안 (2026-11-09)

목적: 오키나와 태교여행 일정 페이지(fivetaku.github.io/okinawa-babymoon)에 빠진 기능을 트리플·경쟁 플래너 대비로 찾고, 일정 기반 AI 채팅창 구현 방안을 정한다.

- 01_triple_official.md — 트리플 공식 기능 (App Store/Play/보도자료). 핵심: 2026-11-03 서비스 종료, NOL 통합.
- 02_triple_users.md — 사용자 후기 기준 실제 사용 기능·불만·태교여행 사례.
- 03_planner_benchmark.md — Wanderlog·TripIt·Google Maps·Tripsy·Trip.com·Notion 14항목 매트릭스 + 정적 HTML 구현 가능/불가 분류.
- 04_chat_widget_options.md — 채팅창 5방안 비교. 추천 Cloudflare Workers 프록시(라우터 경유로 조정).

검증 메모: 트리플 종료는 App Store 설명문으로 직접 확인. Workers 무료 한도(10만/일, CPU 10ms)는 공식 Limits 페이지 확인. NOL 미제공 기능 목록은 출처 블로그 원문(pickycut) 대조.
