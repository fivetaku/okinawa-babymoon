window.TRIP = {
  lead: "모노레일 역과 붙은 나하 호텔 한 곳에 4박. 북부는 한국어 버스투어 하루, 나머지는 모노레일·버스·택시로 다닌다. 하루 큰 일정은 하나, 오후엔 쉬는 시간.",
  facts: [
    ["항공", "11/28(토) 15:50 나하 도착 · 12/2(수) 12:40 나하 출발"],
    ["숙소", "나하 시내 1곳 4박 (아사히바시·마키시역)"],
    ["이동", "유이레일 · 버스 · 택시 · 북부 버스투어 1일"],
    ["가장 긴 날", "11/30(월) 북부 버스투어 약 10시간"]
  ],
  places: {
    oka:   { name: "나하공항", q: "Naha Airport", lat: 26.1967, lng: 127.6490 },
    hotel: { name: "숙소 (리가로열그랑 · 아사히바시역)", q: "Rihga Royal Gran Okinawa", lat: 26.2114, lng: 127.6770 },
    kokusai: { name: "국제거리", q: "Kokusai Dori Naha", lat: 26.2158, lng: 127.6859 },
    jacks: { name: "잭스 스테이크하우스", q: "Jack's Steak House Naha", lat: 26.2129, lng: 127.6725 },
    porktama: { name: "포크타마고 오니기리 본점", q: "Pork Tamago Onigiri Honten Naha", lat: 26.2152, lng: 127.6880 },
    ashibinaa: { name: "아시비나 아울렛", q: "Okinawa Outlet Mall Ashibinaa", lat: 26.1586, lng: 127.6574 },
    umikaji: { name: "세나가지마 우미카지테라스", q: "Umikaji Terrace Senagajima", lat: 26.1764, lng: 127.6404 },
    manzamo: { name: "만좌모", q: "Cape Manzamo", lat: 26.5050, lng: 127.8503 },
    churaumi: { name: "츄라우미 수족관", q: "Okinawa Churaumi Aquarium", lat: 26.6944, lng: 127.8780 },
    kouri: { name: "코우리섬", q: "Kouri Island", lat: 26.7043, lng: 128.0181 },
    yunangi: { name: "유난기", q: "Yunangi Naha", lat: 26.2145, lng: 127.6819 },
    shuri: { name: "슈리성", q: "Shuri Castle", lat: 26.2170, lng: 127.7194 },
    av: { name: "아메리칸빌리지", q: "American Village Chatan", lat: 26.3166, lng: 127.7573 },
    kijimuna: { name: "타코라이스 키지무나 (데포아일랜드)", q: "Kijimuna Depot Island Chatan", lat: 26.3161, lng: 127.7548 }
  },
  days: [
    { label: "11/28 토", title: "도착하고 국제거리 산책", level: "가벼움",
      summary: "도착일은 숙소에 짐 풀고 걸어서 저녁만.",
      stops: [
        { t: "15:50", what: "나하공항 도착", p: "oka", how: "도착로비 포타마(포크타마고 오니기리)에서 간식 가능" },
        { t: "17:00", what: "유이레일로 아사히바시역 → 체크인", p: "hotel", how: "공항역에서 약 12분, 호텔이 역·버스터미널과 연결" },
        { t: "18:30", what: "저녁: 잭스 스테이크하우스", p: "jacks", how: "호텔에서 걸어서 가까움. 현금만, 웨이팅 잦음. 수요일 휴무" },
        { t: "20:00", what: "국제거리 천천히 산책, 블루씰 아이스크림", p: "kokusai", how: "피곤하면 바로 숙소로" }
      ] },
    { label: "11/29 일", title: "아울렛 쇼핑 + 바다 석양", level: "가벼움",
      summary: "공항 근처 남쪽에서 쇼핑하고 해 질 무렵 섬 테라스에서 저녁.",
      stops: [
        { t: "09:00", what: "아침: 포크타마고 오니기리 본점", p: "porktama", how: "아침 줄이 짧은 편. 7:00 오픈" },
        { t: "11:00", what: "아시비나 아울렛 쇼핑", p: "ashibinaa", how: "유이레일로 공항 → 4번 승차장 95번 버스 약 18분(350엔), 또는 택시" },
        { t: "14:30", what: "숙소 돌아와 휴식", p: "hotel" },
        { t: "16:30", what: "세나가지마 우미카지테라스 석양 + 저녁", p: "umikaji", how: "공항 6번 승차장 TK04 버스(토·일·공휴일 운행, 250엔) 또는 택시. 행복의 팬케이크·카레빵" },
        { t: "20:00", what: "택시로 숙소", p: "hotel" }
      ] },
    { label: "11/30 월", title: "북부 버스투어 (수족관·코우리섬)", level: "가장 긴 날",
      summary: "운전 없이 북부를 하루에. 사람 적은 월요일에 배치. 차 안에서 자주 쉬기.",
      stops: [
        { t: "09:00", what: "나하 출발 한국어 버스투어", p: "hotel", how: "클룩 지노투어 기준 09:00~19:00, 수족관 입장권 포함. 예약 전 휴게소·화장실 정차 확인" },
        { t: "10:30", what: "만좌모", p: "manzamo" },
        { t: "12:30", what: "츄라우미 수족관 (점심 포함 자유시간)", p: "churaumi", how: "수족관 8:30~18:30" },
        { t: "15:30", what: "코우리섬", p: "kouri", how: "코우리 쉬림프 갈릭 새우(익힌 음식)" },
        { t: "19:00", what: "나하 도착 → 저녁: 유난기 (오키나와 가정식)", p: "yunangi", how: "저녁 17:00~21:30만, 일요일 휴무라 월요일에 배치. 지치면 호텔 근처로" }
      ] },
    { label: "12/1 화", title: "슈리성 + 차탄 석양", level: "보통",
      summary: "오전엔 새로 공개된 슈리성 정전, 오후엔 쉬었다가 아메리칸빌리지.",
      stops: [
        { t: "09:30", what: "슈리성 (2026년 11월 정전 복원 공개)", p: "shuri", how: "유이레일 슈리역에서 걸어서. 공개 직후라 붐빌 수 있음, 오르막 천천히" },
        { t: "12:30", what: "숙소 돌아와 점심·휴식", p: "hotel" },
        { t: "16:00", what: "택시로 아메리칸빌리지", p: "av", how: "약 40분, 약 3,000~3,500엔. 버스 20·28·29번도 가능(약 700엔)" },
        { t: "17:30", what: "석양 + 저녁: 타코라이스 키지무나", p: "kijimuna", how: "오무타코. 스테이크하우스88 차탄점도 근처" },
        { t: "20:00", what: "택시로 숙소", p: "hotel" }
      ] },
    { label: "12/2 수", title: "귀국", level: "이동만",
      summary: "아침 먹고 여유 있게 공항으로.",
      stops: [
        { t: "09:30", what: "체크아웃 → 유이레일 공항역", p: "hotel" },
        { t: "10:30", what: "나하공항 (출발 2시간 전)", p: "oka", how: "국내선 1층 공항식당 오키나와 소바로 마지막 끼니. 12:40 출발" }
      ] }
  ],
  hotels: [
    { hotel: true, name: "리가로열그랑 오키나와", q: "Rihga Royal Gran Okinawa", lat: 26.2114, lng: 127.6770,
      sub: "아사히바시역 · 버스터미널과 지붕 통로로 연결", desc: "최상층 조식 뷔페. 쟈란 객실 평점 4.9. 공항·북부투어 출발 모두 편하다. 대욕장 없음.",
      tags: ["추천 1순위", "역 직결", "가격 미확인"] },
    { hotel: true, name: "다이와로이넷 나하 국제거리", q: "Daiwa Roynet Hotel Naha Kokusai-dori", lat: 26.2168, lng: 127.6918,
      sub: "마키시역과 데크 연결, 약 1분", desc: "국제거리 바로 앞, 2025년 2월 리뉴얼. 밤 산책·쇼핑이 가장 쉽다.",
      tags: ["역 직결", "국제거리", "가격 미확인"] },
    { hotel: true, name: "다이와로이넷 나하 오모로마치 PREMIER", q: "Daiwa Roynet Hotel Naha Omoromachi PREMIER", lat: 26.2243, lng: 127.6954,
      sub: "오모로마치역 약 6분", desc: "욕실·화장실 분리. 신도심이라 조용한 편. 대욕장 없음.",
      tags: ["조용함", "가격 미확인"] },
    { hotel: true, name: "로와지르 호텔 나하 (대욕장 원할 때)", q: "Loisir Hotel Naha", lat: 26.2165, lng: 127.6680,
      sub: "아사히바시역 걸어서 약 15분 · 택시 2분", desc: "천연온천 대욕장. 임신 중엔 온천 장시간·고온 입욕은 피하고 짧게.",
      tags: ["대욕장", "!역에서 멂"] }
  ],
  food: [
    { name: "잭스 스테이크하우스", q: "Jack's Steak House Naha", lat: 26.2129, lng: 127.6725, sub: "나하 니시 · 스테이크", desc: "1953년부터 이어진 노포. 익힘 정도 지정 가능.", tags: ["현금만", "!수요일 휴무", "웨이팅"] },
    { name: "포크타마고 오니기리 본점", q: "Pork Tamago Onigiri Honten", lat: 26.2152, lng: 127.6880, sub: "국제거리 · 아침", desc: "스팸·계란 오니기리, 약 400~800엔. 7:00~17:00.", tags: ["아침", "웨이팅"] },
    { name: "스테이크하우스88 국제거리점", q: "Steak House 88 Kokusai Dori", lat: 26.2163, lng: 127.6885, sub: "국제거리 · 스테이크", desc: "아구 돼지 스테이크도 있다. 약 2,500~5,000엔.", tags: ["연중무휴", "11:00~23:00"] },
    { name: "유난기", q: "Yunangi Naha", lat: 26.2145, lng: 127.6819, sub: "구모지 · 오키나와 가정식", desc: "라후테·찬푸루. 저녁 17:00~21:30만 영업.", tags: ["!일요일 휴무", "저녁만"] },
    { name: "블루씰 국제거리점", q: "Blue Seal Kokusai Dori", lat: 26.2174, lng: 127.6911, sub: "국제거리 · 아이스크림", desc: "자색고구마·시콰사 맛. 10:00~22:30.", tags: ["간식"] },
    { name: "행복의 팬케이크 (우미카지테라스)", q: "Shiawase no Pancake Umikaji Terrace", lat: 26.1764, lng: 127.6404, sub: "세나가지마 · 팬케이크", desc: "주문 마감 19:40, 조리 약 20분.", tags: ["석양"] },
    { name: "타코라이스 키지무나 데포아일랜드점", q: "Taco rice cafe Kijimuna Depot Island", lat: 26.3161, lng: 127.7548, sub: "차탄 · 타코라이스", desc: "달걀 얹은 오무타코. 약 1,000~1,500엔.", tags: ["연중무휴"] },
    { name: "코우리 쉬림프", q: "Kouri Shrimp", lat: 26.6969, lng: 128.0197, sub: "코우리섬 · 갈릭 새우", desc: "투어 자유시간에. 익힌 음식.", tags: ["!비정기 휴무"] },
    { name: "공항식당", q: "Kuko Shokudo Naha Airport", lat: 26.1967, lng: 127.6490, sub: "나하공항 국내선 1층", desc: "오키나와 소바·타코라이스. 영업시간 출처마다 다름.", tags: ["귀국일"] }
  ],
  tips: [
    "날생선(포케·해물덮밥·초밥)은 피하고 익힌 음식 위주로 골랐다. 고기는 웰던으로 주문.",
    "북부 버스투어는 10시간짜리다. 예약 전에 휴게소 정차 횟수를 확인하고, 힘들면 117번 고속버스(공항→수족관 약 2시간)로 수족관만 다녀오는 것도 방법.",
    "슈리성 정전은 2026-11-23 공개 직후라 붐빌 수 있다. 입장권·예약 방식은 출발 전 확인.",
    "유이레일 1일권 1,000엔(24시간), 2일권 1,800엔(48시간). 11/28 저녁에 2일권을 사면 11/30 오후까지 쓸 수 있다.",
    "11월 말 오키나와는 낮 20도 안팎. 얇은 겉옷 챙기기.",
    "여행자보험에 임신 관련 보장이 있는지, 출발 전 담당의에게 여행 괜찮은지 확인.",
    "잭스(수요일)·유난기(일요일) 휴무를 피해서 배치했다. 출발 전 구글 지도로 영업 여부 다시 확인."
  ],
  sources: [
    "https://www.klook.com/ko/activity/82595-okinawa-tour-with-aquarium-ticket/",
    "https://oki-park.jp/kaiyohaku/acc/",
    "https://shurijocastle.okinawa/",
    "https://www.oki-churaumi.jp/guide/hour/",
    "https://www.rihgaroyalgran-okinawa.co.jp/",
    "https://www.daiwaroynet.jp/naha-kokusaidori/",
    "https://www.umikajiterrace.com/accessguide/",
    "https://www.naha-airport.co.jp/access/bus/",
    "https://www.okinawa-americanvillage.com/access/",
    "https://www.yui-rail.co.jp/ticketinfo-ticket/ticketinfo/1day-pass/",
    "https://steak.co.jp/pages/shisetu",
    "https://tabelog.com/okinawa/A4701/A470101/47000017/",
    "https://www.omutaco.com/shop/"
  ]
};
