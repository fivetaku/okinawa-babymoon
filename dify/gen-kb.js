// assets/data.js(window.TRIP)로 챗봇 지식 문서 kb/okinawa-itinerary.md를 만든다. 실행: node dify/gen-kb.js (레포 루트에서)
const fs=require("fs"); const w={}; new Function("window",fs.readFileSync("assets/data.js","utf8"))(w); const T=w.TRIP; const P=T.places,I=T.placeInfo||{};
const dayDates=["11월 28일 토요일 (Day 1, 도착일)","11월 29일 일요일 (Day 2)","11월 30일 월요일 (Day 3)","12월 1일 화요일 (Day 4)","12월 2일 수요일 (Day 5, 귀국일)"];
let md=`# 오키나와 태교여행 일정 (최종, 2026-11-28~12-02)\n\n${T.lead}\n\n## 기본 정보\n`+T.facts.map(f=>`- ${f[0]}: ${f[1]}`).join("\n")+"\n";
T.days.forEach((d,i)=>{const tag=dayDates[i]; md+=`\n## ${tag} 일정: ${d.title}\n\n날짜: ${tag}. 강도: ${d.level}.\n${d.summary}\n`; if(d.booking) md+=`예약: ${d.booking.label} ${d.booking.url}\n`;
 d.stops.forEach(s=>{const p=s.p&&P[s.p]; md+=`\n### ${tag} ${s.t} — ${s.what}\n`; if(p) md+=`장소: ${p.name}.\n`; if(s.how) md+=`${s.how}\n`;});});
md+="\n## 장소 정보\n"; for(const [k,v] of Object.entries(I)){const p=P[k]; md+=`\n### ${p?p.name:k}\n`; if(v.addr) md+=`주소: ${v.addr}\n`; if(v.tel) md+=`전화: ${v.tel}\n`; if(v.hours) md+=`시간: ${v.hours}\n`; if(v.note) md+=`메모: ${v.note}\n`;}
md+="\n## 숙소\n"; T.hotels.forEach(h=>md+=`\n### ${h.name}\n${h.sub}\n${h.desc}\n`);
md+="\n## 식당 목록\n"; T.food.forEach(f=>md+=`\n### ${f.name}\n${f.sub}\n${f.desc}\n태그: ${(f.tags||[]).map(t=>t.replace(/^!/,"")).join(", ")}\n`);
md+="\n## 쇼핑 리스트 (장소·날짜별)\n"; (T.shopping||[]).forEach(g=>{md+=`\n### 쇼핑: ${g.where} (${g.when})\n`; if(g.note) md+=`${g.note}\n`; g.items.forEach(x=>md+=`- ${x.skip?"[안 삼] ":""}${x.star?"★".repeat(x.star)+" ":""}${x.at?x.at+" · ":""}${x.what}${x.price?" — "+x.price:""}${x.memo?" ("+x.memo+")":""}\n`);});
md+="\n## 선물 정리\n"; (T.gifts||[]).forEach(r=>md+=`- ${r[0]}: ${r[1]}${r[2]?" / 대안: "+r[2]:""}${r[3]?" / 어디서: "+r[3]:""}\n`);
md+="\n## 출발 전·여행 중 체크리스트\n"; T.checklist.forEach(c=>md+=`- [${c.done?"완료":c.when}] ${c.what}${c.how?" — "+c.how:""}${c.url?" ("+c.url+")":""}\n`);
md+="\n## 긴급 연락처와 식당에 보여줄 일본어 문구\n"; T.emergency.forEach(e=>md+=`- ${e[0]}: ${e[1]}\n`);
md+="\n## 참고 사항 (교통·면세·임산부 주의)\n"; T.tips.forEach(t=>md+=`- ${t}\n`);
fs.writeFileSync("kb/okinawa-itinerary.md",md); console.log("chars",md.length,"sections",(md.match(/^### /gm)||[]).length);
