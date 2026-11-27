# 조사: 트리플 앱 기능 — 03_planner_benchmark

> 출처: 리서치 2026-11-09 (일정 페이지 기능 보완용)
> 공개 보관용 사본. 예약번호·실명·연락처는 마스킹했다. 최종 일정의 정본은 kb/okinawa-itinerary.md 다.

결과부터: 6개 서비스 중 벤치마크 항목 14개를 가장 넓게 덮는 것은 Wanderlog와 Tripsy이고, "장소 영업시간 경고"를 공식적으로 내세우는 곳은 Trip.com Trip.Planner(생성 단계에서 영업시간 반영)뿐이며 Wanderlog는 사용자 보고로만 확인됐다. TripIt은 항공 운영(지연·Go Now)에 특화돼 있고, Google Maps 리스트와 Notion 템플릿은 "일정 플래너"라기보다 범용 도구라 절반 이상이 X다.

## 1. 서비스 × 기능 매트릭스 (2026-11-09 공식 페이지 기준)

표기: O = 공식 기능 / 부분 = 제한적·유료·간접 / X = 없음 또는 공식 언급 없음 / ? = 공식 미확인(사용자 보고만)

| 기능 | Wanderlog | TripIt | Google Maps 리스트 | Tripsy | Trip.com Trip.Planner | Notion 템플릿 |
|---|---|---|---|---|---|---|
| 일정 타임라인(일자별) | O | O (마스터 일정) | 부분 (리스트 순서 조정만) | O | O ("one smart timeline", 시간·일 단위) | O (DB 뷰로 직접 구성) |
| 지도 동선 | O (지도+경로 최적화, 최적화는 Pro) | 부분 (Navigator: 구간별 교통수단 → 외부 지도앱) | 부분 (저장 장소 표시, 경로는 길찾기 별도) | O (경로 표시 → 외부 내비) | O (in-platform map 경로 시각화) | 부분 (지도 임베드만) |
| 장소 영업시간 경고 | ? (영업시간 표시 O, "closed" 알림은 사용자 블로그 보고만) | X | 부분 (장소 페이지에 "Closed now" 표시, 일정 대비 경고 아님) | X | 부분 (생성 시 "verified opening hours"로 열린 곳만 추천, 사후 경고는 미확인) | X |
| 이동시간 자동 계산 | O | 부분 (Go Now는 공항행만, Pro) | O (길찾기 ETA, Depart at/Arrive by) | O ("estimated travel times and distances") | 부분 ("transport estimates" 생성 반영, 구간 표시 미확인) | X |
| 예약 메일 자동 수집 | O (메일 포워딩, Gmail 자동 스캔은 Pro) | O ((이메일 마스킹) 포워딩 + 받은편지함 연동, 무료) | X (Gemini 앱 경유는 별개) | O (포워딩, Pro) | 부분 (Trip.com 자체 예약만 자동, 외부 예약 수동) | X |
| 비행편 지연 알림 | 부분 (Pro) | O (Pro, 핵심 기능) | X | O (Pro) | O (flight changes·gate 알림) | X |
| 체크리스트 | O (packing/to-do) | X | X | X (문서·노트만) | X | O (체크박스 블록, 커뮤니티 템플릿에 패킹리스트) |
| 경비·정산 | O (예산+분할) | X | X | O (Pro, 동행 입력·CSV) | X | O ("Who Paid What?" 등 템플릿 DB) |
| 환율 | X (사용자 요청 단계) | X | X | O (다통화 + 날짜 기준 환산, Pro) | X | X (수식으로 직접) |
| 오프라인 | 부분 (Pro) | O (로그인 유지 시 정적 열람) | 부분 (운전 내비만, 도보·대중교통 X) | O | O ("Download your full itinerary for offline use") | 부분 (Notion 앱 오프라인 모드, 페이지 단위) |
| 공유·공동 편집 | O (실시간 동기화) | 부분 (공유·Inner Circle, 공동 편집 아님) | O (Invite collaborators, 편집 권한) | O (협업 + 보기 전용) | 부분 (Trip Moments 공유) | O (워크스페이스 공유) |
| 날씨 | X (FAQ에서 미통합 명시) | O (앱 전용, 10일 예보) | X | O (10일 예보, Pro) | 부분 (weather alerts 언급) | X |
| 당일 '지금 할 일' 뷰 | X (공식 언급 없음) | 부분 (Go Now·게이트·수하물 푸시, 공항 중심) | X | 부분 (위젯에 "next activities", 버전 노트) | 부분 (activity reminders 알림) | X |
| 여행 후 기록 | 부분 (가이드로 공개 공유) | O (Travel Stats, 무료) | X | O (Tripsy Book 통계·Recap) | X | 부분 (직접 작성) |

가격 요점: Wanderlog Pro $39.99/년, TripIt Pro $49/년, Tripsy Pro(가격은 페이지 미표기), Trip.Planner 무료(영어권 일부 지역), Google Maps·Notion 무료.

## 2. 출처 URL

- Wanderlog: https://wanderlog.com/ · https://wanderlog.com/pro · https://wanderlog.com/blog/faq/ (날씨 미통합) · 영업시간 경고 사용자 보고 https://www.directiveadventure.com/blog/apps-that-make-trip-planning-successful (help.wanderlog.com 은 Cloudflare 차단으로 미열람)
- TripIt: https://www.tripit.com/web/pro/pricing · https://www.tripit.com/web/pro · https://help.tripit.com/en/support/solutions/articles/103000063428-weather-display · Go Now https://help.tripit.com/en/support/solutions/articles/103000063349-go-now · 오프라인 https://help.tripit.com/en/support/solutions/articles/103000063436-using-mobile-apps-without-connectivity · Navigator https://help.tripit.com/en/support/solutions/articles/103000063354-navigator · Travel Stats https://help.tripit.com/en/support/solutions/articles/103000063417/
- Google Maps: 리스트 https://support.google.com/maps/answer/7280933 · 오프라인 https://support.google.com/maps/answer/6291838 · 영업시간 https://support.google.com/maps/answer/10552932 · 길찾기 https://support.google.com/maps/answer/144339 · Gemini 여행 계획(2026-08-06) https://blog.google/products-and-platforms/products/gemini/how-gemini-plans-trips/
- Tripsy: https://tripsy.app/ · https://apps.apple.com/us/app/tripsy-travel-planner/id1429967544 · Pro 범위 https://tripsy.help/article/19-whats-included-with-pro
- Trip.com: 출시 보도(2025-08-26) https://www.trip.com/newsroom/trip-com-launches-trip-planner-smart-itineraries-tailored-to-your-travel-style-with-real-time-recommendations/ · 도움말 https://sg.trip.com/ask/questions/trip.com-itinerary-planner.html · 2026-04 업그레이드 보도 https://www.guandian.hk/article/20260414/554924.html
- Notion: 공식 템플릿 https://www.notion.com/templates/notions-trip-planner · 카테고리 https://www.notion.com/templates/category/travel (템플릿 본문은 JS 렌더링이라 설명문 미열람, 구성은 검색 요약 기준)

## 3. 정적 단일 HTML(서버 없음, localStorage만)로 구현 가능 / 불가능

브라우저 안에서 사용자 입력만으로 끝나는 기능은 모두 가능하다. 일정 타임라인, 체크리스트, 경비·정산(분할 계산 포함), 공유는 URL 해시나 JSON 파일 내보내기 형태의 단방향 공유, 오프라인(정적 파일 자체가 오프라인이며 데이터는 localStorage), 여행 후 기록(메모·사진 Data URL·방문 통계), 당일 '지금 할 일' 뷰(기기 시각과 일정 시각 비교로 현재·다음 항목 강조), 그리고 영업시간 경고도 사용자가 영업시간을 직접 입력하면 방문 시각과 비교해 경고를 띄울 수 있다. 반면 외부 데이터에 의존하는 기능은 불가능하거나 반쪽이다. 지도 동선과 이동시간 자동 계산은 타일·경로 API가 필요해 서버 없이는 외부 서비스(OSM 타일, OSRM 공개 서버 등)에 CORS 호출하는 수밖에 없어 "공개 API 의존 부분 가능"이고, 영업시간 자동 조회·예약 메일 자동 수집·비행편 지연 알림(백그라운드 푸시)·실시간 공동 편집·환율 자동 갱신·날씨 예보는 메일 접근·푸시 서버·동기화 백엔드·유료 API 키가 필요해 순수 정적 페이지로는 불가능하다. 환율·날씨는 사용자가 값을 직접 입력하거나 무키 공개 API(예: Open-Meteo)를 클라이언트에서 호출하면 부분 대체는 된다.

미확인 항목 2개: Wanderlog의 "closed" 경고는 공식 페이지에서 확인하지 못했고(help center 차단), Notion 공식 템플릿의 세부 구성은 렌더링 문제로 검색 요약에 의존했다.

## EXPAND

- Wanderlog help center(Cloudflare 차단)를 aside-browser로 열어 "Optimize route"·"Add time to a place" 문서에서 영업시간 경고 유무를 공식 확인
- Tripsy Pro 가격과 무료 범위(tripsy.help 요금 카테고리) 확인
- Trip.com Trip.Planner 한국어 사이트 제공 여부와 2026-04 업그레이드 내용(guandian.hk 원문) 확인
- Notion 공식 "trip planner 2026" 템플릿을 실제로 복제해 DB 구성(Schedule/Bookings/Who Paid What/Packing) 실측
- Google Maps 2026년 Gemini 연동으로 리스트→일정 변환이 Maps 앱 안에서 가능한지(블로그는 Docs·메일 내보내기만 언급) 확인
- 정적 HTML 구현 시 후보 무키 API(Open-Meteo 날씨, OSRM 경로, exchangerate.host 대체) CORS·무료 한도 실측
