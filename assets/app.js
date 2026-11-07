// 일정 데이터(window.TRIP)를 받아 머리글·날짜 탭·타임라인·지도·식당·체크리스트를 그린다. 흑백, 이모지 없음.
(function () {
  const T = window.TRIP;
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const gmap = p => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.q || p.name)}`;
  const place = id => T.places[id];
  const info = id => (T.placeInfo || {})[id];
  const dirUrl = (a, b, mode) => `https://www.google.com/maps/dir/?api=1&origin=${a.lat},${a.lng}&destination=${b.lat},${b.lng}&travelmode=${mode}`;
  const routeUrl = pts => { const u = [...new Map(pts.map(p => [p.q || p.name, p])).values()];
    return `https://www.google.com/maps/dir/${u.map(p => encodeURIComponent(p.q || p.name)).join("/")}`; };
  const modeOf = how => /택시|taxi/i.test(how || "") ? "driving" : /도보|걸어서/.test(how || "") ? "walking" : "transit";
  const modeKo = { driving: "택시", walking: "도보", transit: "버스 · 전철" };
  const $ = id => document.getElementById(id);
  // 라벨 없는 회색 타일(Esri Light Gray Base, 키 불필요). 지명은 핀 팝업에서 한국어로만.
  const TILE = "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}";
  const TILE_OPT = { maxZoom: 16, attribution: "Tiles &copy; Esri" };
  const pin = (n, cls) => L.divIcon({ className: "", iconSize: [22, 22], iconAnchor: [11, 11], html: `<div class="pin${cls ? " " + cls : ""}">${n}</div>` });

  $("lead").textContent = T.lead;
  (() => { const st = new Date(2026, 10, 28), en = new Date(2026, 11, 2), now = new Date(); now.setHours(0, 0, 0, 0);
    const dd = Math.round((st - now) / 864e5);
    $("status").innerHTML = dd > 0 ? `<b>D-${dd}</b> · 11/28(토) – 12/2(수) · 4박 5일`
      : now <= en ? `<b>Day ${Math.round((now - st) / 864e5) + 1}</b> · 11/28(토) – 12/2(수)` : `11/28(토) – 12/2(수) · 4박 5일`; })();
  $("facts").innerHTML = T.facts.map(f => `<li><b>${esc(f[0])}</b><span>${esc(f[1])}</span></li>`).join("");

  const todayIdx = (() => { const d = new Date(); const key = `${d.getMonth() + 1}/${d.getDate()}`;
    return T.days.findIndex(x => x.label.startsWith(key + " ")); })();
  const nowHM = (() => { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); })();

  const tabs = $("tabs");
  tabs.innerHTML = `<button data-i="-1">전체</button>` + T.days.map((d, i) => `<button data-i="${i}">${esc(d.label)}</button>`).join("");
  tabs.querySelectorAll("button").forEach(b => b.onclick = () => select(+b.dataset.i, true));

  $("days").innerHTML = T.days.map((d, i) => {
    const isToday = i === todayIdx;
    const pts = d.stops.map(s => s.p).filter(Boolean).map(place);
    return `
    <article class="day" id="day${i}">
      <div class="day-h">${d.icon ? `<img src="${esc(d.icon)}" alt="">` : "<div></div>"}<div>
        <div class="num">Day ${String(i + 1).padStart(2, "0")}${isToday ? " · Today" : ""}</div>
        <h3>${esc(d.title)}</h3>
        <div class="meta"><b>${esc(d.label)}</b> · ${esc(d.level)}</div>
      </div></div>
      <p class="sum">${esc(d.summary)}</p>
      <div class="daymap" id="dmap${i}"></div>
      <div class="actions">
        <a class="btn" target="_blank" rel="noopener" href="${routeUrl(pts)}">전체 경로 열기</a>
        ${d.booking ? `<a target="_blank" rel="noopener" href="${esc(d.booking.url)}">${esc(d.booking.label)}</a>` : ""}
      </div>
      <ol class="tl">${d.stops.map((s, k) => {
        const [h, m] = (s.t || "0:0").split(":").map(Number); const hm = h * 60 + m;
        const next = d.stops[k + 1]; const nhm = next ? next.t.split(":").map(Number).reduce((a, b) => a * 60 + b) : 24 * 60;
        const now = isToday && nowHM >= hm && nowHM < nhm;
        const prev = d.stops.slice(0, k).reverse().find(x => x.p && x.p !== s.p);
        const pi = s.p && info(s.p); const mode = modeOf(s.how);
        const chips = [];
        if (s.p && prev) chips.push(`<a class="chip primary" target="_blank" rel="noopener" href="${dirUrl(place(prev.p), place(s.p), mode)}">길찾기</a>`);
        if (s.p) chips.push(`<a class="chip" target="_blank" rel="noopener" href="${gmap(place(s.p))}">지도</a>`);
        if (pi && pi.tel) chips.push(`<a class="chip" href="tel:${esc(pi.tel.replace(/-/g, ""))}">${esc(pi.tel)}</a>`);
        const leg = s.p && prev ? `<li class="leg">${modeKo[mode]}${s.leg ? " · " + esc(s.leg) : ""}</li>` : "";
        return `${leg}<li class="stop${now ? " now" : ""}"><span class="t">${esc(s.t)}<small></small></span><div>
          <div class="what">${esc(s.what)}</div>
          ${s.how ? `<div class="how">${esc(s.how)}</div>` : ""}
          ${pi ? `<div class="pinfo">${pi.hours ? `<span><b>Hours</b>${esc(pi.hours)}</span>` : ""}${pi.addr ? `<span><b>Addr</b>${esc(pi.addr)}</span>` : ""}${pi.note ? `<span><b>Note</b>${esc(pi.note)}</span>` : ""}</div>` : ""}
          ${chips.length ? `<div class="chips">${chips.join("")}</div>` : ""}</div></li>`; }).join("")}
      </ol></article>`;
  }).join("");

  const map = L.map("map", { scrollWheelZoom: false, tap: true });
  L.tileLayer(TILE, TILE_OPT).addTo(map);
  const layers = T.days.map((d, i) => {
    const g = L.layerGroup(); const pts = []; const seen = new Set();
    d.stops.forEach(s => { if (s.p && !seen.has(s.p)) { seen.add(s.p); pts.push(place(s.p)); } });
    pts.forEach((p, k) => L.marker([p.lat, p.lng], { icon: pin(k + 1) })
      .bindPopup(`<b>${esc(d.label)} · ${k + 1}</b><br>${esc(p.name)}<br><a target="_blank" href="${gmap(p)}">구글 지도</a>`).addTo(g));
    if (pts.length > 1) L.polyline(pts.map(p => [p.lat, p.lng]), { color: "#111", weight: 1.5, opacity: .8, dashArray: "4 5" }).addTo(g);
    return g;
  });
  const extra = L.layerGroup();
  [...(T.hotels || []), ...(T.food || [])].forEach(x => {
    if (!x.lat) return;
    L.marker([x.lat, x.lng], { icon: pin(x.hotel ? "H" : "R", "food") })
      .bindPopup(`<b>${esc(x.name)}</b><br>${esc(x.sub || "")}<br><a target="_blank" href="${gmap(x)}">구글 지도</a>`).addTo(extra);
  });

  function select(i, scroll) {
    layers.forEach(l => map.removeLayer(l)); map.removeLayer(extra);
    const on = i === -1 ? layers : [layers[i]];
    on.forEach(l => l.addTo(map)); if (i === -1) extra.addTo(map);
    const b = L.featureGroup(on.flatMap(l => l.getLayers()).concat(i === -1 ? extra.getLayers() : []));
    if (b.getLayers().length) map.fitBounds(b.getBounds().pad(0.15));
    tabs.querySelectorAll("button").forEach(el => el.classList.toggle("on", +el.dataset.i === i));
    document.querySelectorAll(".day").forEach((el, k) => el.style.display = (i === -1 || k === i) ? "" : "none");
    if (scroll && i >= 0) $("day" + i).scrollIntoView({ block: "start", behavior: "smooth" });
  }
  select(todayIdx >= 0 ? todayIdx : -1, false);

  T.days.forEach((d, i) => {
    const el = $("dmap" + i); const pts = []; const seen = new Set();
    d.stops.forEach(s => { if (s.p && !seen.has(s.p)) { seen.add(s.p); pts.push(place(s.p)); } });
    if (!el || pts.length < 2) { if (el) el.remove(); return; }
    const m = L.map(el, { scrollWheelZoom: false, dragging: !L.Browser.mobile, zoomControl: false, attributionControl: false });
    L.tileLayer(TILE, TILE_OPT).addTo(m);
    pts.forEach((p, k) => L.marker([p.lat, p.lng], { icon: pin(k + 1) })
      .bindPopup(`<b>${k + 1}. ${esc(p.name)}</b><br><a target="_blank" href="${gmap(p)}">구글 지도</a>`).addTo(m));
    L.polyline(pts.map(p => [p.lat, p.lng]), { color: "#111", weight: 1.5, opacity: .8, dashArray: "4 5" }).addTo(m);
    m.fitBounds(L.latLngBounds(pts.map(p => [p.lat, p.lng])).pad(0.25));
    const io = new IntersectionObserver(e => { if (e[0].isIntersecting) { m.invalidateSize(); io.disconnect(); } }); io.observe(el);
  });

  const cards = (list, el) => $(el).innerHTML = list.map(x => `
    <div class="card"><h4><a target="_blank" rel="noopener" href="${gmap(x)}">${esc(x.name)}</a></h4>
      <div class="sub">${esc(x.sub || "")}</div><p>${esc(x.desc || "")}</p>
      ${(x.tags || []).map(t => `<span class="tag${t.startsWith("!") ? " warn" : ""}">${esc(t.replace(/^!/, ""))}</span>`).join("")}
    </div>`).join("");
  cards(T.hotels || [], "hotels"); cards(T.food || [], "food");

  const KEY = "okinawa-ck";
  const done = new Set(JSON.parse(localStorage.getItem(KEY) || "[]"));
  $("ck").innerHTML = (T.checklist || []).map(c => `
    <li class="${done.has(c.id) ? "done" : ""}"><input type="checkbox" id="ck-${c.id}" ${done.has(c.id) ? "checked" : ""}>
      <label for="ck-${c.id}"><div class="when">${esc(c.when)}</div><div class="w">${esc(c.what)}</div><div class="h">${esc(c.how || "")}</div></label></li>`).join("");
  $("ck").querySelectorAll("input").forEach(inp => inp.onchange = () => {
    const id = inp.id.slice(3); inp.checked ? done.add(id) : done.delete(id);
    localStorage.setItem(KEY, JSON.stringify([...done])); inp.closest("li").classList.toggle("done", inp.checked);
  });

  $("em").innerHTML = (T.emergency || []).map(([k, v]) => {
    const jp = /[぀-ヿ一-鿿]/.test(v) ? v.split(/\s*\(/)[0] : null;
    return `<div><b>${esc(k)}</b>${jp ? `<button class="copy" data-c="${esc(jp)}">복사</button><span class="jp">${esc(jp)}</span>${esc(v.slice(jp.length))}` : esc(v)}</div>`;
  }).join("");
  $("em").querySelectorAll(".copy").forEach(b => b.onclick = () => navigator.clipboard?.writeText(b.dataset.c).then(() => { b.textContent = "복사됨"; setTimeout(() => b.textContent = "복사", 1200); }));

  $("tips").innerHTML = T.tips.map(t => `<li>${esc(t)}</li>`).join("");
  $("src").innerHTML = (T.sources || []).map(u => `<li><a target="_blank" rel="noopener" href="${esc(u)}">${esc(u)}</a></li>`).join("");
})();
