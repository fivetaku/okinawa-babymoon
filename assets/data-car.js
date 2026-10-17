window.TRIP = {
  lead: "렌터카를 빌려 레쿠 차탄에 4박. 아메리칸빌리지와 바다가 걸어서 닿고, 북부는 직접 운전해 하루. 국제운전면허증이 꼭 있어야 한다.",
  facts: [
    ["항공", "11/28(토) 15:50 나하 도착 · 12/2(수) 12:40 나하 출발"],
    ["숙소", "레쿠 오키나와 차탄 (공항에서 차로 35~45분)"],
    ["이동", "렌터카 4일 (OTS·타임즈 등 한국어 지원)"],
    ["가장 긴 날", "11/30(월) 북부 드라이브, 편도 약 1시간 반"]
  ],
  places: {
    oka:   { name: "나하공항", q: "Naha Airport", lat: 26.1967, lng: 127.6490 },
    hotel: { name: "레쿠 오키나와 차탄 스파&리조트", q: "Lequ Okinawa Chatan Spa & Resort", lat: 26.3176, lng: 127.7551 },
    av: { name: "아메리칸빌리지", q: "American Village Chatan", lat: 26.3166, lng: 127.7573 },
    s88: { name: "스테이크하우스88 차탄점", q: "Steak House 88 Chatan", lat: 26.3167, lng: 127.7549 },
    rycom: { name: "이온몰 라이카무", q: "AEON Mall Okinawa Rycom", lat: 26.3142, lng: 127.7959 },
    gordies: { name: "고디스 (햄버거)", q: "Gordie's Chatan", lat: 26.3340, lng: 127.7475 },
    kyoda: { name: "미치노에키 교다 (휴게소)", q: "Michi no Eki Kyoda", lat: 26.5521, lng: 127.9695 },
    churaumi: { name: "츄라우미 수족관", q: "Okinawa Churaumi Aquarium", lat: 26.6944, lng: 127.8780 },
    bise: { name: "비세 후쿠기 가로수길", q: "Bise Fukugi Tree Road", lat: 26.7028, lng: 127.8806 },
    kishimoto: { name: "기시모토 식당", q: "Kishimoto Shokudo Motobu", lat: 26.6603, lng: 127.8959 },
    kouri: { name: "코우리 대교 · 코우리 쉬림프", q: "Kouri Shrimp", lat: 26.6969, lng: 128.0197 },
    manzamo: { name: "만좌모", q: "Cape Manzamo", lat: 26.5050, lng: 127.8503 },
    ashibinaa: { name: "아시비나 아울렛", q: "Okinawa Outlet Mall Ashibinaa", lat: 26.1586, lng: 127.6574 },
    umikaji: { name: "세나가지마 우미카지테라스", q: "Umikaji Terrace Senagajima", lat: 26.1764, lng: 127.6404 },
    sunset: { name: "선셋비치", q: "Sunset Beach Chatan", lat: 26.3132, lng: 127.7551 }
  },
  days: [
    { label: "11/28 토", title: "렌터카 받고 차탄으로", level: "가벼움",
      summary: "공항에서 셔틀로 영업소 → 차를 받아 차탄까지 약 40분. 저녁은 걸어서.",
      stops: [
        { t: "15:50", what: "나하공항 도착 → 렌터카 셔틀", p: "oka", how: "OTS는 국내선 1층 10-A 승강장 무료 셔틀(08:30~18:30), 타임즈·토요타는 11번대 승강장. 면허증 원본 + 국제운전면허증 + 여권" },
        { t: "17:30", what: "차탄 호텔 체크인", p: "hotel", how: "토요일 저녁 58번 국도가 막히면 60분 이상 걸릴 수 있음" },
        { t: "18:30", what: "아메리칸빌리지 산책 + 저녁", p: "av", how: "호텔에서 걸어서" },
        { t: "19:00", what: "스테이크하우스88 차탄점", p: "s88", how: "연중무휴. 또는 타코라이스 키지무나(데포아일랜드)" }
      ] },
    { label: "11/29 일", title: "쇼핑몰 + 동네 휴식", level: "가벼움",
      summary: "가까운 대형 쇼핑몰만 다녀오고 오후엔 호텔·바닷가에서 쉰다.",
      stops: [
        { t: "10:30", what: "이온몰 라이카무 쇼핑·점심", p: "rycom", how: "차로 약 15분. 2층 스테이크하우스88 Jr. 등" },
        { t: "14:30", what: "호텔 휴식", p: "hotel" },
        { t: "17:00", what: "선셋비치 산책 (일몰 무렵)", p: "sunset", how: "호텔 바로 앞" },
        { t: "18:30", what: "저녁: 고디스 햄버거", p: "gordies", how: "차로 5분. 11~20시, 부정기 휴무" }
      ] },
    { label: "11/30 월", title: "북부 드라이브 (수족관·코우리섬)", level: "가장 긴 날",
      summary: "일요일을 피해 월요일에. 1시간마다 쉬어 가고, 피곤하면 코우리섬은 빼도 된다.",
      stops: [
        { t: "09:00", what: "차탄 출발 (오키나와 자동차도 → 교다 IC)", p: "hotel", how: "통행료 ETC 약 830엔. ETC 카드 없으면 '一般' 차로" },
        { t: "10:00", what: "미치노에키 교다에서 휴식", p: "kyoda", how: "화장실·간식. 8:30~19:00" },
        { t: "11:00", what: "츄라우미 수족관", p: "churaumi", how: "8:30~18:30, 입장 17:30까지" },
        { t: "13:00", what: "점심: 기시모토 식당 (오키나와 소바)", p: "kishimoto", how: "11~17시, 재료 소진 시 마감, 수요일 휴무" },
        { t: "14:00", what: "비세 후쿠기 가로수길 짧게", p: "bise", how: "수족관에서 차로 3~6분, 평지 산책" },
        { t: "15:00", what: "코우리 대교 드라이브 + 코우리 쉬림프", p: "kouri", how: "다리를 건너는 것만으로 충분. 11~16시" },
        { t: "17:00", what: "만좌모 (돌아오는 길, 일몰 무렵)", p: "manzamo", how: "입장 100엔, 주차 무료" },
        { t: "18:30", what: "차탄 도착, 호텔 근처 가벼운 저녁", p: "hotel" }
      ] },
    { label: "12/1 화", title: "아울렛 + 바다 테라스", level: "보통",
      summary: "남쪽 쇼핑과 섬 테라스를 묶고, 오후엔 일찍 돌아와 쉰다.",
      stops: [
        { t: "10:00", what: "아시비나 아울렛 쇼핑", p: "ashibinaa", how: "차로 약 38분(고속도로 약 420엔)" },
        { t: "13:00", what: "우미카지테라스 점심·팬케이크", p: "umikaji", how: "아울렛에서 차로 가까움. 행복의 팬케이크(조리 약 20분)" },
        { t: "15:00", what: "호텔로 돌아와 휴식", p: "hotel" },
        { t: "18:00", what: "아메리칸빌리지 마지막 저녁", p: "av", how: "걸어서" }
      ] },
    { label: "12/2 수", title: "반납하고 귀국", level: "이동만",
      summary: "영업소에 출발 2시간 이상 전 도착. 주유 후 반납.",
      stops: [
        { t: "09:15", what: "체크아웃, 차탄 출발", p: "hotel", how: "출근 시간대라 여유 있게" },
        { t: "10:15", what: "주유 → 렌터카 반납 → 셔틀로 공항", p: "oka", how: "영업소에서 공항까지 셔틀 약 5~15분" },
        { t: "10:40", what: "나하공항 (12:40 출발)", p: "oka", how: "국내선 1층 공항식당 오키나와 소바" }
      ] }
  ],
  hotels: [
    { hotel: true, name: "레쿠 오키나와 차탄 스파&리조트", q: "Lequ Okinawa Chatan Spa & Resort", lat: 26.3176, lng: 127.7551,
      sub: "데포아일랜드 안 · 아메리칸빌리지 걸어서 바로", desc: "스탠다드 트윈 25㎡, 조식 2인, 11/24까지 무료 취소. 천연온천 대욕장, 루프톱 온수풀(유료). 주차 요금은 예약 전 확인.",
      tags: ["확정", "온천"] }
  ],
  food: [
    { name: "스테이크하우스88 차탄점", q: "Steak House 88 Chatan", lat: 26.3167, lng: 127.7549, sub: "차탄 · 스테이크", desc: "10:00~23:00. 웰던으로 주문.", tags: ["연중무휴"] },
    { name: "타코라이스 키지무나 데포아일랜드점", q: "Taco rice cafe Kijimuna Depot Island", lat: 26.3161, lng: 127.7548, sub: "차탄 · 타코라이스", desc: "오무타코. 11:00~22:00.", tags: ["연중무휴"] },
    { name: "고디스", q: "Gordie's Chatan", lat: 26.3340, lng: 127.7475, sub: "스나베 · 햄버거", desc: "11~20시.", tags: ["!부정기 휴무"] },
    { name: "미하마 식당", q: "美浜食堂 北谷", sub: "차탄 · 소바·정식", desc: "타베로그 3.46. 10:30~15시.", tags: ["!수요일 휴무", "점심만"] },
    { name: "기시모토 식당", q: "Kishimoto Shokudo Motobu", lat: 26.6603, lng: 127.8959, sub: "모토부 · 오키나와 소바", desc: "100년 넘은 소바집. 11~17시, 재료 소진 시 마감.", tags: ["!수요일 휴무", "북부 점심"] },
    { name: "코우리 쉬림프", q: "Kouri Shrimp", lat: 26.6969, lng: 128.0197, sub: "코우리섬 · 갈릭 새우", desc: "익힌 음식. 11~16시.", tags: ["북부"] },
    { name: "미치노에키 교다", q: "Michi no Eki Kyoda", lat: 26.5521, lng: 127.9695, sub: "나고 · 휴게소", desc: "초코모치·모즈쿠 튀김. 8:30~19시.", tags: ["연중무휴", "휴식"] },
    { name: "이온몰 라이카무", q: "AEON Mall Okinawa Rycom", lat: 26.3142, lng: 127.7959, sub: "기타나카구스쿠 · 쇼핑몰", desc: "푸드코트·2층 스테이크하우스88 Jr.(수프·밥 리필).", tags: ["쇼핑"] }
  ],
  tips: [
    "국제운전면허증(제네바 협약, 유효기간 1년)이 없으면 운전할 수 없다. 한국 면허증 원본·여권도 함께. 출국 전 발급 필수.",
    "임신부도 일본에서는 안전벨트 착용이 원칙이다. 허리벨트는 배 아래 골반에, 어깨벨트는 가슴 사이로.",
    "보험은 면책(CDW)에 NOC 면책까지 드는 걸 권장. NOC는 사고 시 약 2만~5만 엔 이상 청구될 수 있다.",
    "좌측통행, 고속도로 80km/h. ETC 카드가 없으면 '一般' 차로로. OTS는 정액 ETC 카드가 있다.",
    "북부 가는 날은 1시간마다 쉬기. 일요일은 수족관 길이 최대 2시간까지 막힐 수 있어 월요일로 잡았다.",
    "반납일은 출발 2~2.5시간 전에 영업소 도착. 12:40편이면 차탄에서 9시 15분 출발.",
    "날생선(해물덮밥·포케)은 피하고 익힌 음식 위주로 골랐다.",
    "여행자보험 임신 보장, 출발 전 담당의 확인."
  ],
  sources: [
    "https://www.npa.go.jp/policies/application/license_renewal/have_DL_issed_another_country.html/pdf/pdf/QA.html",
    "https://www.otsinternational.jp/otsrentacar/okinawa/pickup/naha-airport-domestic/",
    "https://www.timescar-rental.com/ko/okinawa",
    "https://www.npa.go.jp/bureau/traffic/anzen/seatbelt.html",
    "https://www.okinawa-rentacar.co.jp/en/pages/insurance",
    "https://doubletree-chatan.hiltonjapan.co.jp/news/detail/6345",
    "https://www.vessel-hotel.jp/campana/okinawa/access/",
    "https://www.rome2rio.com/s/Chatan/Okinawa-Churaumi-Aquarium",
    "https://www.oki-churaumi.jp/guide/hour/",
    "https://tabelog.com/okinawa/A4702/A470202/47000068/",
    "https://www.yanbaru-b.co.jp/facility.php",
    "https://www.manzamo.jp/",
    "https://store.nipponrentacar.co.jp/b/nrs/info/020660/"
  ]
};
