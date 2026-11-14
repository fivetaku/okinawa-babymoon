// 일정 데이터(window.TRIP)를 받아 머리글·날짜 탭·타임라인·지도·식당·체크리스트를 그린다. 흑백, 이모지 없음.
(function () {
  const T = window.TRIP;
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const gmap = p => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.q || p.name)}`;
  const place = id => T.places[id];
  const info = id => (T.placeInfo || {})[id];
  const dirUrl = (a, b, mode) => `https://www.google.com/maps/dir/?api=1&origin=${a.lat},${a.lng}&destination=${b.lat},${b.lng}&travelmode=${mode}`;
  // origin 생략 = 구글맵이 현재 위치(GPS)를 출발지로 씀
  const hereUrl = (b, mode) => `https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}&travelmode=${mode}`;
  const routeUrl = pts => { const u = [...new Map(pts.map(p => [p.q || p.name, p])).values()];
    return `https://www.google.com/maps/dir/${u.map(p => encodeURIComponent(p.q || p.name)).join("/")}`; };
  const modeOf = how => /택시|taxi/i.test(how || "") ? "driving" : /도보|걸어서/.test(how || "") ? "walking" : "transit";
  const modeKo = { driving: "택시", walking: "도보", transit: "버스 · 전철" };
  const $ = id => document.getElementById(id);
  // 라벨 없는 회색 타일(Esri Light Gray Base, 키 불필요). 지명은 핀 팝업에서 한국어로만.
  const TILE = "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}";
  const TILE_OPT = { maxZoom: 16, attribution: "Tiles &copy; Esri" };
  // 엔화 금액 옆에 원화를 항상 같이 보여 준다. 환율은 하루 한 번 받아오고 실패하면 마지막 값(없으면 9.2)을 쓴다.
  const RK = "okinawa-fx"; let fx = (() => { try { return JSON.parse(localStorage.getItem(RK)) || {}; } catch { return {}; } })();
  let rate = fx.rate || 9.2;
  const krw = y => `${(Math.round(y * rate / 100) * 100).toLocaleString()}원`;
  const yen = s => esc(s).replace(/(\d[\d,]*)\s*엔/g, (m, n) => `<span class="yen" data-y="${n.replace(/,/g, "")}">${n}엔<small>${krw(+n.replace(/,/g, ""))}</small></span>`);
  const refreshKrw = () => document.querySelectorAll(".yen").forEach(el => el.querySelector("small").textContent = krw(+el.dataset.y));
  if (!fx.at || Date.now() - fx.at > 864e5) fetch("https://open.er-api.com/v6/latest/JPY").then(r => r.json()).then(j => {
    if (j && j.rates && j.rates.KRW) { rate = j.rates.KRW; localStorage.setItem(RK, JSON.stringify({ rate, at: Date.now() })); refreshKrw(); } }).catch(() => {});
  const DK = "okinawa-done"; const doneStops = new Set(JSON.parse(localStorage.getItem(DK) || "[]"));
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
      <div class="prog" id="prog${i}"><i></i></div>
      <ol class="tl">${d.stops.map((s, k) => {
        const [h, m] = (s.t || "0:0").split(":").map(Number); const hm = h * 60 + m;
        const next = d.stops[k + 1]; const nhm = next ? next.t.split(":").map(Number).reduce((a, b) => a * 60 + b) : 24 * 60;
        const now = isToday && nowHM >= hm && nowHM < nhm;
        const prev = d.stops.slice(0, k).reverse().find(x => x.p && x.p !== s.p);
        const pi = s.p && info(s.p); const mode = modeOf(s.how);
        const chips = [];
        if (s.p) chips.push(`<a class="chip primary" target="_blank" rel="noopener" href="${hereUrl(place(s.p), mode)}">현재 위치에서</a>`);
        if (s.p && prev) chips.push(`<a class="chip" target="_blank" rel="noopener" href="${dirUrl(place(prev.p), place(s.p), mode)}">${esc(place(prev.p).name.split(" (")[0])}에서</a>`);
        if (s.p) chips.push(`<a class="chip" target="_blank" rel="noopener" href="${gmap(place(s.p))}">지도</a>`);
        if (pi && pi.tel) chips.push(`<a class="chip" href="tel:${esc(pi.tel.replace(/-/g, ""))}">${esc(pi.tel)}</a>`);
        if (s.shop) chips.push(`<a class="chip" href="#shop-${esc(s.shop)}">쇼핑 목록</a>`);
        const leg = s.p && prev ? `<li class="leg">${modeKo[mode]}${s.leg ? " · " + esc(s.leg) : ""}</li>` : "";
        const key = `${i}-${k}`;
        return `${leg}<li class="stop${now ? " now" : ""}${doneStops.has(key) ? " done" : ""}" data-k="${k}" data-p="${s.p || ""}"><span class="t">${esc(s.t)}<small></small></span><div>
          <div class="wrow"><button class="tick" data-key="${key}" aria-label="완료"></button><div class="what">${yen(s.what)}</div></div>
          ${s.how ? `<div class="how">${yen(s.how)}</div>` : ""}
          ${pi ? `<div class="pinfo">${pi.hours ? `<span><b>Hours</b>${esc(pi.hours)}</span>` : ""}${pi.addr ? `<span><b>Addr</b>${esc(pi.addr)}</span>` : ""}${pi.note ? `<span><b>Note</b>${yen(pi.note)}</span>` : ""}</div>` : ""}
          ${chips.length ? `<div class="chips">${chips.join("")}</div>` : ""}</div></li>`; }).join("")}
      </ol></article>`;
  }).join("");

  // D: 끝낸 항목 체크 → 흐리게 + 날짜별 진행률
  const prog = i => { const n = T.days[i].stops.length; const c = T.days[i].stops.filter((_, k) => doneStops.has(`${i}-${k}`)).length;
    const el = $("prog" + i); if (el) el.firstElementChild.style.width = (c / n * 100) + "%"; };
  T.days.forEach((_, i) => prog(i));
  document.querySelectorAll(".tick").forEach(b => b.onclick = e => { e.stopPropagation(); const key = b.dataset.key;
    doneStops.has(key) ? doneStops.delete(key) : doneStops.add(key); localStorage.setItem(DK, JSON.stringify([...doneStops]));
    b.closest("li").classList.toggle("done", doneStops.has(key)); prog(+key.split("-")[0]); });

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
    if (scroll && i >= 0) $("day" + i).scrollIntoView({ block: "start", behavior: "instant" });
  }
  select(todayIdx >= 0 ? todayIdx : -1, false);

  // B: 여행 당일에만 상단에 "지금 · 다음" 바를 붙이고 현재 항목으로 이동한다
  if (todayIdx >= 0) {
    const bar = document.createElement("div"); bar.className = "nowbar"; bar.id = "nowbar"; $("tabsbar").appendChild(bar);
    const d = T.days[todayIdx]; const hm = t => t.split(":").map(Number).reduce((a, b) => a * 60 + b);
    const tick = () => { const n = new Date(); const v = n.getHours() * 60 + n.getMinutes(); let cur = -1;
      d.stops.forEach((s, k) => { if (hm(s.t) <= v) cur = k; }); const nx = d.stops[cur + 1];
      bar.innerHTML = `<div><b>${cur >= 0 ? esc(d.stops[cur].what) : "아직 시작 전"}</b><div class="nx">${nx ? `다음 ${esc(nx.t)} · ${esc(nx.what)}` : "오늘 일정 끝"}</div></div><span class="clock">${String(n.getHours()).padStart(2, "0")}:${String(n.getMinutes()).padStart(2, "0")}</span>`;
      $("day" + todayIdx).querySelectorAll("li.stop").forEach((l, k) => l.classList.toggle("now", k === cur)); return cur; };
    const cur = tick(); setInterval(tick, 60e3);
    document.documentElement.style.setProperty("--barh", $("tabsbar").offsetHeight + "px");
    bar.onclick = () => { const li = $("day" + todayIdx).querySelector("li.stop.now"); if (li) li.scrollIntoView({ block: "center", behavior: "instant" }); };
    if (cur >= 0) requestAnimationFrame(() => bar.onclick());
  }

  T.days.forEach((d, i) => {
    const el = $("dmap" + i); const pts = []; const seen = new Set();
    d.stops.forEach(s => { if (s.p && !seen.has(s.p)) { seen.add(s.p); pts.push(place(s.p)); } });
    if (!el || pts.length < 2) { if (el) el.remove(); return; }
    const m = L.map(el, { scrollWheelZoom: false, dragging: !L.Browser.mobile, zoomControl: false, attributionControl: false });
    L.tileLayer(TILE, TILE_OPT).addTo(m);
    // A: 핀을 누르면 그 항목이 강조되고, 항목을 누르면 핀이 커진다
    const ids = []; d.stops.forEach(s => { if (s.p && !ids.includes(s.p)) ids.push(s.p); });
    const art = $("day" + i);
    const hi = pid => { art.querySelectorAll("li.stop").forEach(l => l.classList.toggle("hl", !!pid && l.dataset.p === pid));
      el.querySelectorAll(".pin").forEach(e => e.classList.toggle("on", e.dataset.id === pid)); };
    pts.forEach((p, k) => { const mk = L.marker([p.lat, p.lng], { icon: L.divIcon({ className: "", iconSize: [22, 22], iconAnchor: [11, 11], html: `<div class="pin" data-id="${ids[k]}">${k + 1}</div>` }) }).addTo(m);
      mk.on("click", () => { hi(ids[k]); const li = art.querySelector(`li.stop[data-p="${ids[k]}"]`); if (li) li.scrollIntoView({ block: "center", behavior: "instant" }); }); });
    art.querySelectorAll("li.stop").forEach(l => l.addEventListener("click", e => { if (e.target.closest("a,button")) return;
      const pid = l.dataset.p; if (!pid) return; const on = l.classList.contains("hl"); hi(on ? null : pid); if (!on) m.panTo([place(pid).lat, place(pid).lng]); }));
    L.polyline(pts.map(p => [p.lat, p.lng]), { color: "#111", weight: 1.5, opacity: .8, dashArray: "4 5" }).addTo(m);
    m.fitBounds(L.latLngBounds(pts.map(p => [p.lat, p.lng])).pad(0.25));
    const io = new IntersectionObserver(e => { if (e[0].isIntersecting) { m.invalidateSize(); io.disconnect(); } }); io.observe(el);
  });

  const cards = (list, el) => $(el).innerHTML = list.map(x => `
    <div class="card"><h4><a target="_blank" rel="noopener" href="${gmap(x)}">${esc(x.name)}</a></h4>
      <div class="sub">${esc(x.sub || "")}</div><p>${yen(x.desc || "")}</p>
      ${(x.tags || []).map(t => `<span class="tag${t.startsWith("!") ? " warn" : ""}">${esc(t.replace(/^!/, ""))}</span>`).join("")}
    </div>`).join("");
  cards(T.hotels || [], "hotels"); cards(T.food || [], "food");

  const KEY = "okinawa-ck";
  const done = new Set(JSON.parse(localStorage.getItem(KEY) || "[]"));
  (T.checklist || []).forEach(c => { if (c.done) done.add(c.id); });
  $("ck").innerHTML = (T.checklist || []).map(c => `
    <li class="${done.has(c.id) ? "done" : ""}${c.done ? " fixed" : ""}"><input type="checkbox" id="ck-${c.id}" ${done.has(c.id) ? "checked" : ""}${c.done ? " disabled" : ""}>
      <label for="ck-${c.id}"><div class="when">${esc(c.when)}</div><div class="w">${esc(c.what)}</div><div class="h">${yen(c.how || "")}</div>${c.url ? `<a class="chip${c.url.startsWith("tel:") ? "" : " ext"}" target="${c.url.startsWith("tel:") ? "_self" : "_blank"}" rel="noopener" href="${esc(c.url)}">${esc(c.link || "링크")}</a>` : ""}</label></li>`).join("");
  $("ck").querySelectorAll("input").forEach(inp => inp.onchange = () => {
    const id = inp.id.slice(3); inp.checked ? done.add(id) : done.delete(id);
    localStorage.setItem(KEY, JSON.stringify([...done])); inp.closest("li").classList.toggle("done", inp.checked);
  });

  // 쇼핑: 장소별 묶음. 산 것은 체크해 이 기기에 저장, 안 살 것은 회색으로 남겨 현장에서 헷갈리지 않게 한다
  const SK = "okinawa-shop"; const bought = new Set(JSON.parse(localStorage.getItem(SK) || "[]"));
  const dayOf = g => T.days.findIndex(d => d.stops.some(s => s.shop === g.id));
  const sprog = g => { const items = g.items.filter(x => !x.skip); const c = items.filter(x => bought.has(`${g.id}-${x.id}`)).length;
    const el = $("sp-" + g.id); if (el) el.textContent = items.length ? `${c} / ${items.length}` : ""; };
  if ($("shop")) {
    $("shop").innerHTML = (T.shopping || []).map(g => { const di = dayOf(g); return `
    <div class="shop" id="shop-${esc(g.id)}">
      <div class="shop-h"><div class="when">${esc(g.when)}<span class="cnt" id="sp-${esc(g.id)}"></span></div><h3>${esc(g.where)}</h3>
        ${g.note ? `<p class="note">${yen(g.note)}</p>` : ""}
        <div class="chips">${di >= 0 ? `<button class="chip goday" data-d="${di}">일정으로</button>` : ""}${g.p && place(g.p) ? `<a class="chip" target="_blank" rel="noopener" href="${gmap(place(g.p))}">지도</a>` : ""}</div></div>
      <ul class="sl">${g.items.map(x => { const k = `${g.id}-${x.id}`; return `
        <li class="${x.skip ? "skip" : ""}${bought.has(k) ? " done" : ""}">${x.skip ? `<span class="no">안 삼</span>` : `<input type="checkbox" id="sh-${esc(k)}" data-k="${esc(k)}" ${bought.has(k) ? "checked" : ""}>`}
          <label for="sh-${esc(k)}"><div class="w">${x.star ? `<span class="star">${"★".repeat(x.star)}</span>` : ""}${x.at ? `<span class="at">${esc(x.at)}</span>` : ""}${esc(x.what)}</div>
          ${x.price ? `<div class="pr">${yen(x.price)}</div>` : ""}${x.memo ? `<div class="h">${yen(x.memo)}</div>` : ""}</label></li>`; }).join("")}
      </ul></div>`; }).join("") + ((T.gifts || []).length ? `
    <div class="shop" id="shop-gifts"><div class="shop-h"><div class="when">선물 정리</div><h3>누구에게 무엇을</h3></div>
      <div class="kv gifts">${T.gifts.map(r => `<div><b>${esc(r[0])}</b><span class="g1">${yen(r[1])}</span>${r[2] ? `<span class="g2">대안 · ${yen(r[2])}</span>` : ""}<span class="g3">${esc(r[3])}</span></div>`).join("")}</div></div>` : "");
    (T.shopping || []).forEach(sprog);
    $("shop").querySelectorAll("input").forEach(inp => inp.onchange = () => { const k = inp.dataset.k;
      inp.checked ? bought.add(k) : bought.delete(k); localStorage.setItem(SK, JSON.stringify([...bought]));
      inp.closest("li").classList.toggle("done", inp.checked); sprog(T.shopping.find(g => k.startsWith(g.id + "-"))); });
    $("shop").querySelectorAll(".goday").forEach(b => b.onclick = () => select(+b.dataset.d, true));
  }

  $("em").innerHTML = (T.emergency || []).map(([k, v]) => {
    const jp = /[぀-ヿ一-鿿]/.test(v) ? v.split(/\s*\(/)[0] : null;
    return `<div><b>${esc(k)}</b>${jp ? `<button class="copy" data-c="${esc(jp)}">복사</button><span class="jp">${esc(jp)}</span>${esc(v.slice(jp.length))}` : esc(v)}</div>`;
  }).join("");
  $("em").querySelectorAll(".copy").forEach(b => b.onclick = () => navigator.clipboard?.writeText(b.dataset.c).then(() => { b.textContent = "복사됨"; setTimeout(() => b.textContent = "복사", 1200); }));

  $("tips").innerHTML = T.tips.map(t => `<li>${yen(t)}</li>`).join("");
  $("src").innerHTML = (T.sources || []).map(u => `<li><a target="_blank" rel="noopener" href="${esc(u)}">${esc(u)}</a></li>`).join("");
})();
