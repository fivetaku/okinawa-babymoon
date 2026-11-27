# 조사: 뚜벅이 코스 사례 — design-refs

> 출처: 리서치 2026-11-07
> 공개 보관용 사본. 예약번호·실명·연락처는 마스킹했다. 최종 일정의 정본은 kb/okinawa-itinerary.md 다.

# 일정 페이지 디자인 레퍼런스 (2026-11-08, Aside 수집)

| # | 레퍼런스 | 가져온 요소 |
|---|---|---|
| 1 | https://dribbble.com/shots/26389288 (Imran Jakir, AI Travel Assistant) | Day 칩, 장소 카드, To-Do 체크리스트 |
| 2 | https://dribbble.com/shots/27510956 (Voyage) | 카드 안 예약 정보 표시 |
| 3 | https://dribbble.com/shots/27495904 (Wayfare, 10am Space) | 지도 / Day 탭 / 번호 타임라인 3단 뼈대 — 채택 |
| 4 | https://dribbble.com/shots/27580828 (SoftDoes) | 점선 세로 타임라인 — 채택 |
| 5 | https://dribbble.com/shots/27636854 (Nes-Lab) | 지도 위 Day 바텀시트 (미채택) |
| 6 | https://dribbble.com/shots/27709125 (Nixtio) | 날짜 칩 선택 상태 |

Inspo recommend: feature-stack, 크림 배경(mid paper band 71%), 그로테스크 산세리프, 따뜻한 액센트 — 기존 팔레트(#fbf7f1/#e07a5f/#1f7a8c) 유지.
Behance 후보(미열람): 258120723, 254466277, 253542249, 257983611, 195852697, 136336933.

## 2차: 실제 서비스 레퍼런스 (2026-11-08, Aside 수집)

| 서비스 | 확인 | 가져온 요소 |
|---|---|---|
| Wanderlog (파리 5일 공개 가이드, 390px 직접 봄) | 사진+어두운 오버레이+흰 제목, 알약 칩, 날짜별 색 핀(번호), 카드 사이 "도보 5분·450m", 검정 알약 주요 버튼·회색 보조 | 히어로 오버레이, 칩, 이동 구간 행, 버튼 위계 |
| Tripsy (Mobbin) | 커버 사진 위 "Starts in 14 days" 상태줄, 반투명 원형 버튼 3개(Activity/Flights/Lodgings), Get Directions는 앱 선택 | D-day 상태줄, 퀵버튼 4개 |
| TripIt (문서) | 예약번호·QR·PDF 첨부, 핀 누르면 하단 카드, See Transport Options | 길찾기 주요 버튼 |
| KAYAK Trips (Mobbin) | 리스트 위 떠 있는 검정 "Map view" | (미채택) |
| Airbnb Trips (문서) | 체크인 정보·현관 비밀번호를 타임라인에 | 장소 정보 블록 |

적용 결과: 커밋 3246106(지도 연동) · 다음 커밋(히어로·퀵버튼·이동 구간).
