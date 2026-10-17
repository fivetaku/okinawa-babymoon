window.TRIP = {
  lead: "아메리칸빌리지 안 레쿠 차탄에 4박. 렌터카 없이 택시·버스·투어로 다닌다. 북부는 아메리칸빌리지에서 출발하는 한국어 버스투어 하루, 나하는 택시로 하루. 하루 큰 일정은 하나, 오후엔 쉬는 시간.",
  facts: [
    ["항공", "11/28(토) 15:50 나하 도착 · 12/2(수) 12:40 나하 출발"],
    ["숙소", "레쿠 오키나와 차탄 스파&리조트 · 스탠다드 트윈 · 조식 2인"],
    ["이동", "택시 · 노선버스 · 공항 리무진 · 북부 버스투어 1일"],
    ["가장 긴 날", "11/30(월) 북부 버스투어 (아메리칸빌리지 09:30 출발)"]
  ],
  places: {
    oka:   { name: "나하공항", q: "Naha Airport", lat: 26.1967, lng: 127.6490 },
    hotel: { name: "레쿠 오키나와 차탄 스파&리조트", q: "Lequ Okinawa Chatan Spa & Resort", lat: 26.3176, lng: 127.7551 },
    av: { name: "아메리칸빌리지", q: "American Village Chatan", lat: 26.3166, lng: 127.7573 },
    tic: { name: "차탄 관광안내소 (투어 집결)", q: "Chatan Tourist Information Center", lat: 26.3159, lng: 127.7577 },
    kijimuna: { name: "타코라이스 키지무나 (데포아일랜드)", q: "Kijimuna Depot Island Chatan", lat: 26.3161, lng: 127.7548 },
    s88: { name: "스테이크하우스88 차탄점", q: "Steak House 88 Chatan", lat: 26.3167, lng: 127.7549 },
    sunset: { name: "선셋비치", q: "Sunset Beach Chatan", lat: 26.3132, lng: 127.7551 },
    rycom: { name: "이온몰 라이카무", q: "AEON Mall Okinawa Rycom", lat: 26.3142, lng: 127.7959 },
    gordies: { name: "고디스 (햄버거)", q: "Gordie's Chatan", lat: 26.3340, lng: 127.7475 },
    manzamo: { name: "만좌모", q: "Cape Manzamo", lat: 26.5050, lng: 127.8503 },
    churaumi: { name: "츄라우미 수족관", q: "Okinawa Churaumi Aquarium", lat: 26.6944, lng: 127.8780 },
    kouri: { name: "코우리섬", q: "Kouri Island", lat: 26.7043, lng: 128.0181 },
    shuri: { name: "슈리성", q: "Shuri Castle", lat: 26.2170, lng: 127.7194 },
    jacks: { name: "잭스 스테이크하우스", q: "Jack's Steak House Naha", lat: 26.2129, lng: 127.6725 },
    kokusai: { name: "국제거리", q: "Kokusai Dori Naha", lat: 26.2158, lng: 127.6859 }
  },
  days: [
    { label: "11/28 토", title: "도착하고 숙소로", level: "가벼움",
      summary: "15:50 도착이라 공항 리무진은 이미 끊겼다(공항 출발 막차 14:10). 택시로 바로 숙소.",
      stops: [
        { t: "15:50", what: "나하공항 도착", p: "oka", how: "도착로비 포타마(포크타마고 오니기리)에서 간식 가능" },
        { t: "16:30", what: "택시로 레쿠 차탄 체크인", p: "hotel", how: "약 40분, 약 5,600엔. 버스면 공항 ⑤번 TK05 북곡직행셔틀 17:15(1,000엔, 2025년 시간표 기준) 또는 120번 약 65분" },
        { t: "18:30", what: "아메리칸빌리지 석양 산책", p: "av", how: "호텔에서 걸어서 바로" },
        { t: "19:00", what: "저녁: 스테이크하우스88 차탄점 또는 타코라이스 키지무나", p: "s88", how: "둘 다 데포아일랜드 근처, 연중무휴" }
      ] },
    { label: "11/29 일", title: "호텔 휴식 + 쇼핑몰", level: "가벼움",
      summary: "오전은 호텔에서 쉬고, 오후에 가까운 대형 쇼핑몰만.",
      stops: [
        { t: "09:00", what: "호텔 조식 → 루프톱 온수풀·온천 짧게", p: "hotel", how: "온수풀 8:00~18:00, 투숙객도 유료(성인 2,000엔). 온천은 짧게, 사우나는 피하기" },
        { t: "13:00", what: "이온몰 라이카무 쇼핑·점심", p: "rycom", how: "택시 약 15분. 2층 스테이크하우스88 Jr. 등" },
        { t: "16:30", what: "호텔 휴식", p: "hotel" },
        { t: "17:30", what: "선셋비치 일몰", p: "sunset", how: "걸어서" },
        { t: "18:30", what: "저녁: 아메리칸빌리지", p: "kijimuna" }
      ] },
    { label: "11/30 월", title: "북부 버스투어 (수족관·코우리섬)", level: "가장 긴 날",
      summary: "숙소 앞 아메리칸빌리지에서 출발하는 한국어 투어. 사람 적은 월요일에 배치.",
      stops: [
        { t: "09:30", what: "차탄 관광안내소 집결 → 한국어 버스투어", p: "tic", how: "지노투어 북부 종일코스 기준, 츄라우미 입장권 포함, 하차지 아메리칸빌리지 선택 가능. 예약 전 휴게소 정차 확인" },
        { t: "10:30", what: "만좌모", p: "manzamo" },
        { t: "12:30", what: "츄라우미 수족관 (점심 포함 자유시간)", p: "churaumi", how: "8:30~18:30" },
        { t: "15:30", what: "코우리섬", p: "kouri", how: "코우리 쉬림프 갈릭 새우(익힌 음식)" },
        { t: "18:30", what: "아메리칸빌리지 하차 → 호텔 근처 가벼운 저녁", p: "hotel" }
      ] },
    { label: "12/1 화", title: "나하 하루 (슈리성·국제거리)", level: "보통",
      summary: "택시로 나하에 가서 오전 슈리성, 점심·쇼핑은 국제거리. 저녁 전에 돌아온다.",
      stops: [
        { t: "09:30", what: "택시로 슈리성 (2026년 11월 정전 복원 공개)", p: "shuri", how: "약 40분. 공개 직후라 붐빌 수 있음, 오르막 천천히" },
        { t: "12:00", what: "점심: 잭스 스테이크하우스", p: "jacks", how: "현금만, 수요일 휴무라 화요일 OK" },
        { t: "13:30", what: "국제거리 쇼핑, 블루씰", p: "kokusai" },
        { t: "16:00", what: "택시로 호텔 (약 40분, 약 3,000~3,500엔)", p: "hotel", how: "버스면 20·28·29번 '쿠와에' 하차(약 700엔)" },
        { t: "18:30", what: "저녁: 고디스 햄버거 또는 아메리칸빌리지", p: "gordies", how: "고디스는 택시 5분" }
      ] },
    { label: "12/2 수", title: "귀국", level: "이동만",
      summary: "호텔 앞에서 공항 리무진 한 번이면 끝.",
      stops: [
        { t: "08:44", what: "호텔 앞 공항 리무진버스 (1,000엔)", p: "hotel", how: "2026.4.1 시간표 기준 10:22 공항 도착. 놓치면 택시 약 40분" },
        { t: "10:22", what: "나하공항 (12:40 출발)", p: "oka", how: "국내선 1층 공항식당 오키나와 소바" }
      ] }
  ],
  hotels: [
    { hotel: true, name: "레쿠 오키나와 차탄 스파&리조트", q: "Lequ Okinawa Chatan Spa & Resort", lat: 26.3176, lng: 127.7551,
      sub: "데포아일랜드 안 · 아메리칸빌리지 걸어서 바로", desc: "스탠다드 트윈 25㎡, 조식 2인, 11/24까지 무료 취소. 8층 천연온천 대욕장, 루프톱 온수풀(유료). 귀국일 리무진이 호텔 앞에 선다. 도로 소음 후기가 있어 고층·조용한 방 요청을 넣었다.",
      tags: ["확정", "온천", "온수풀 유료"] }
  ],
  food: [
    { name: "스테이크하우스88 차탄점", q: "Steak House 88 Chatan", lat: 26.3167, lng: 127.7549, sub: "차탄 · 스테이크", desc: "10:00~23:00. 웰던으로 주문.", tags: ["연중무휴", "걸어서"] },
    { name: "타코라이스 키지무나 데포아일랜드점", q: "Taco rice cafe Kijimuna Depot Island", lat: 26.3161, lng: 127.7548, sub: "차탄 · 타코라이스", desc: "달걀 얹은 오무타코. 11:00~22:00.", tags: ["연중무휴", "걸어서"] },
    { name: "고디스", q: "Gordie's Chatan", lat: 26.3340, lng: 127.7475, sub: "스나베 · 햄버거", desc: "11~20시.", tags: ["!부정기 휴무", "택시 5분"] },
    { name: "이온몰 라이카무", q: "AEON Mall Okinawa Rycom", lat: 26.3142, lng: 127.7959, sub: "기타나카구스쿠 · 쇼핑몰", desc: "푸드코트·2층 스테이크하우스88 Jr.(수프·밥 리필).", tags: ["쇼핑"] },
    { name: "코우리 쉬림프", q: "Kouri Shrimp", lat: 26.6969, lng: 128.0197, sub: "코우리섬 · 갈릭 새우", desc: "투어 자유시간에. 익힌 음식.", tags: ["!비정기 휴무"] },
    { name: "잭스 스테이크하우스", q: "Jack's Steak House Naha", lat: 26.2129, lng: 127.6725, sub: "나하 · 스테이크", desc: "1953년부터 이어진 노포.", tags: ["현금만", "!수요일 휴무"] },
    { name: "블루씰 국제거리점", q: "Blue Seal Kokusai Dori", lat: 26.2174, lng: 127.6911, sub: "국제거리 · 아이스크림", desc: "10:00~22:30.", tags: ["간식"] },
    { name: "공항식당", q: "Kuko Shokudo Naha Airport", lat: 26.1967, lng: 127.6490, sub: "나하공항 국내선 1층", desc: "오키나와 소바·타코라이스.", tags: ["귀국일"] }
  ],
  tips: [
    "도착일(15:50)엔 공항 리무진이 없다. 택시가 가장 편하다(약 40분, 약 5,600엔). MK택시 정액 7,650엔은 사전 예약제.",
    "북부 투어는 아메리칸빌리지 09:30 출발 상품(지노투어·NOL 등)으로 예약. 수족관 입장권 포함 여부, 휴게소 정차 확인.",
    "레쿠 루프톱 온수풀은 11~2월 온수 운영, 투숙객도 유료(성인 2,000엔). 온천은 짧게, 사우나는 피하기.",
    "날생선(포케·해물덮밥·초밥)은 피하고 익힌 음식 위주로 골랐다.",
    "슈리성 정전은 2026-11-23 공개 직후라 붐빌 수 있다. 입장권·예약 방식은 출발 전 확인.",
    "11월 말 오키나와는 낮 20도 안팎. 얇은 겉옷 챙기기.",
    "여행자보험 임신 보장, 출발 전 담당의 확인."
  ],
  sources: [
    "https://www.vessel-hotel.jp/lequ/okinawa/access/",
    "https://www.vessel-hotel.jp/lequ/okinawa/facility/",
    "https://okinawabus.com/wp/wp-content/uploads/2026/02/13949546e5c5889fe334734074d8cb53.pdf",
    "https://www.tokyobus.jp/okinawa/news/news-710/",
    "https://www.naha-airport.co.jp/common/uploads/1769acb03b213cc543f7fad4e141366d-1.pdf",
    "https://www.okitour.co.jp/kr/products/north_bus_tour_guide",
    "https://www.okinawa-americanvillage.com/access/",
    "https://shurijocastle.okinawa/",
    "https://www.oki-churaumi.jp/guide/hour/",
    "https://steak.co.jp/pages/shisetu",
    "https://www.omutaco.com/shop/"
  ]
};
