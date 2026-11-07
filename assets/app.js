// 일정 데이터(window.TRIP)를 받아 히어로·날짜 탭·타임라인·지도·식당·체크리스트를 그린다
(function () {
  const T = window.TRIP;
  const colors = ["--d1", "--d2", "--d3", "--d4", "--d5"].map(v =>
    getComputedStyle(document.documentElement).getPropertyValue(v).trim());
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const gmap = p => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.q || p.name)}`;
  const place = id => T.places[id];
  const $ = id => document.getElementById(id);

  // 머리글
  $("lead").textContent = T.lead;
  $("facts").innerHTML = T.facts.map(f => `<div class="fact"><b>${esc(f[0])}</b>${esc(f[1])}</div>`).join("");

  // 오늘 날짜 → 해당 일차 (여행 기간 밖이면 -1)
  const todayIdx = (() => {
    const d = new Date(); const key = `${d.getMonth() + 1}/${d.getDate()}`;
    return T.days.findIndex(x => x.label.startsWith(key + " "));
  })();
  const nowHM = (() => { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); })();

  // 날짜 탭 (sticky)
  const tabs = $("tabs");
  tabs.innerHTML = `<button data-i="-1">전체</button>` + T.days.map((d, i) => `<button data-i="${i}">${esc(d.label)}</button>`).join("");
  tabs.querySelectorAll("button").forEach(b => b.onclick = () => select(+b.dataset.i, true));

  // 일정 카드
  $("days").innerHTML = T.days.map((d, i) => {
    const icon = d.icon ? `<img src="${esc(d.icon)}" alt="">` : `<div class="ico">${esc(d.emoji || "•")}</div>`;
    const isToday = i === todayIdx;
    return `
    <div class="day" id="day${i}">
      <div class="day-h">${icon}<div>
        <h3>${esc(d.label)} · ${esc(d.title)}</h3>
        <div class="meta"><span class="badge lv" style="background:${colors[i]}">${esc(d.level)}</span>${isToday ? `<span class="badge">오늘</span>` : ""}</div>
      </div></div>
      <p class="sum">${esc(d.summary)}</p>
      <ol class="tl">${d.stops.map((s, k) => {
        const [h, m] = (s.t || "0:0").split(":").map(Number); const hm = h * 60 + m;
        const next = d.stops[k + 1]; const nhm = next ? next.t.split(":").map(Number).reduce((a, b) => a * 60 + b) : 24 * 60;
        const now = isToday && nowHM >= hm && nowHM < nhm;
        return `<li${now ? ' class="now"' : ""}><span class="t">${esc(s.t)}</span><div>
          <div class="what">${s.p ? `<a target="_blank" rel="noopener" href="${gmap(place(s.p))}">${esc(s.what)}</a>` : esc(s.what)}</div>
          ${s.how ? `<div class="how">${esc(s.how)}</div>` : ""}</div></li>`; }).join("")}
      </ol></div>`;
  }).join("");

  // 지도
  const map = L.map("map", { scrollWheelZoom: false, tap: true });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "&copy; OpenStreetMap" }).addTo(map);
  const layers = T.days.map((d, i) => {
    const g = L.layerGroup();
    const pts = d.stops.map(s => s.p).filter(Boolean).map(place);
    pts.forEach((p, k) => L.circleMarker([p.lat, p.lng], { radius: 8, color: "#fff", weight: 2, fillColor: colors[i], fillOpacity: 1 })
      .bindPopup(`<b>${esc(d.label)} · ${k + 1}</b><br>${esc(p.name)}<br><a target="_blank" href="${gmap(p)}">구글 지도에서 열기</a>`).addTo(g));
    if (pts.length > 1) L.polyline(pts.map(p => [p.lat, p.lng]), { color: colors[i], weight: 3, opacity: .7, dashArray: "6 6" }).addTo(g);
    return g;
  });
  const extra = L.layerGroup();
  [...(T.hotels || []), ...(T.food || [])].forEach(x => {
    if (!x.lat) return;
    const icon = L.divIcon({ className: "", html: `<div style="font-size:18px">${x.hotel ? "🏨" : "🍽️"}</div>`, iconSize: [20, 20] });
    L.marker([x.lat, x.lng], { icon }).bindPopup(`<b>${esc(x.name)}</b><br>${esc(x.sub || "")}<br><a target="_blank" href="${gmap(x)}">구글 지도에서 열기</a>`).addTo(extra);
  });

  function select(i, scroll) {
    layers.forEach(l => map.removeLayer(l)); map.removeLayer(extra);
    const on = i === -1 ? layers : [layers[i]];
    on.forEach(l => l.addTo(map)); if (i === -1) extra.addTo(map);
    const b = L.featureGroup(on.flatMap(l => l.getLayers()).concat(i === -1 ? extra.getLayers() : []));
    if (b.getLayers().length) map.fitBounds(b.getBounds().pad(0.15));
    tabs.querySelectorAll("button").forEach(el => {
      const k = +el.dataset.i, active = k === i;
      el.classList.toggle("on", active);
      el.style.background = active ? (i === -1 ? "#22303a" : colors[i]) : "";
    });
    document.querySelectorAll(".day").forEach((el, k) => el.style.display = (i === -1 || k === i) ? "" : "none");
    if (scroll && i >= 0) $("day" + i).scrollIntoView({ block: "start", behavior: "smooth" });
  }
  select(todayIdx >= 0 ? todayIdx : -1, false);

  // 식당·숙소 카드
  const cards = (list, el) => $(el).innerHTML = list.map(x => `
    <div class="card"><h4><a target="_blank" rel="noopener" href="${gmap(x)}">${esc(x.name)} ↗</a></h4>
      <div class="sub">${esc(x.sub || "")}</div><p>${esc(x.desc || "")}</p>
      ${(x.tags || []).map(t => `<span class="tag${t.startsWith("!") ? " warn" : ""}">${esc(t.replace(/^!/, ""))}</span>`).join("")}
    </div>`).join("");
  cards(T.hotels || [], "hotels"); cards(T.food || [], "food");

  // 체크리스트 (localStorage 저장)
  const KEY = "okinawa-ck";
  const done = new Set(JSON.parse(localStorage.getItem(KEY) || "[]"));
  $("ck").innerHTML = (T.checklist || []).map(c => `
    <li class="${done.has(c.id) ? "done" : ""}"><input type="checkbox" id="ck-${c.id}" ${done.has(c.id) ? "checked" : ""}>
      <label for="ck-${c.id}"><div class="when">${esc(c.when)}</div><div class="w">${esc(c.what)}</div><div class="h">${esc(c.how || "")}</div></label></li>`).join("");
  $("ck").querySelectorAll("input").forEach(inp => inp.onchange = () => {
    const id = inp.id.slice(3); inp.checked ? done.add(id) : done.delete(id);
    localStorage.setItem(KEY, JSON.stringify([...done])); inp.closest("li").classList.toggle("done", inp.checked);
  });

  // 긴급·문구 (복사 버튼)
  $("em").innerHTML = (T.emergency || []).map(([k, v], i) => {
    const jp = /[぀-ヿ一-鿿]/.test(v) ? v.split(/\s*\(/)[0] : null;
    return `<div><b>${esc(k)}</b>${jp ? `<button class="copy" data-c="${esc(jp)}">복사</button><span class="jp">${esc(jp)}</span>${esc(v.slice(jp.length))}` : esc(v)}</div>`;
  }).join("");
  $("em").querySelectorAll(".copy").forEach(b => b.onclick = () => navigator.clipboard?.writeText(b.dataset.c).then(() => { b.textContent = "복사됨"; setTimeout(() => b.textContent = "복사", 1200); }));

  $("tips").innerHTML = T.tips.map(t => `<li>${esc(t)}</li>`).join("");
  $("src").innerHTML = (T.sources || []).map(u => `<li><a target="_blank" rel="noopener" href="${esc(u)}">${esc(u)}</a></li>`).join("");
})();
