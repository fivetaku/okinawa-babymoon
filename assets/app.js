// 일정 데이터(window.TRIP)를 받아 지도·일정·숙소·식당을 그린다
(function () {
  const T = window.TRIP;
  const colors = ["--d1", "--d2", "--d3", "--d4", "--d5"].map(v =>
    getComputedStyle(document.documentElement).getPropertyValue(v).trim());
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const gmap = p => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.q || p.name)}`;
  const place = id => T.places[id];

  // 지도
  const map = L.map("map", { scrollWheelZoom: false });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18, attribution: "&copy; OpenStreetMap"
  }).addTo(map);
  const layers = T.days.map((d, i) => {
    const g = L.layerGroup();
    const pts = d.stops.map(s => s.p).filter(Boolean).map(place);
    pts.forEach((p, k) => {
      L.circleMarker([p.lat, p.lng], { radius: 8, color: "#fff", weight: 2, fillColor: colors[i], fillOpacity: 1 })
        .bindPopup(`<b>${esc(d.label)} · ${k + 1}</b><br>${esc(p.name)}<br><a target="_blank" href="${gmap(p)}">구글 지도에서 열기</a>`)
        .addTo(g);
    });
    if (pts.length > 1) L.polyline(pts.map(p => [p.lat, p.lng]), { color: colors[i], weight: 3, opacity: .7, dashArray: "6 6" }).addTo(g);
    return g;
  });
  const extra = L.layerGroup();
  [...(T.hotels || []), ...(T.food || [])].forEach(x => {
    if (!x.lat) return;
    const icon = L.divIcon({ className: "", html: `<div style="font-size:18px">${x.hotel ? "🏨" : "🍽️"}</div>`, iconSize: [20, 20] });
    L.marker([x.lat, x.lng], { icon }).bindPopup(`<b>${esc(x.name)}</b><br>${esc(x.menu || x.area || "")}<br><a target="_blank" href="${gmap(x)}">구글 지도에서 열기</a>`).addTo(extra);
  });
  function show(i) {
    layers.forEach(l => map.removeLayer(l)); map.removeLayer(extra);
    const on = i === -1 ? layers : [layers[i]];
    on.forEach(l => l.addTo(map));
    if (i === -1) extra.addTo(map);
    const b = L.featureGroup(on.flatMap(l => l.getLayers()).concat(i === -1 ? extra.getLayers() : []));
    if (b.getLayers().length) map.fitBounds(b.getBounds().pad(0.15));
    document.querySelectorAll(".tabs button").forEach((el, k) => {
      const active = k === i + 1;
      el.classList.toggle("on", active);
      el.style.background = active ? (i === -1 ? "#22303a" : colors[i]) : "";
    });
  }
  const tabs = document.getElementById("tabs");
  tabs.innerHTML = `<button>전체</button>` + T.days.map(d => `<button>${esc(d.label)}</button>`).join("");
  tabs.querySelectorAll("button").forEach((b, k) => b.onclick = () => show(k - 1));
  show(-1);

  // 일정
  document.getElementById("days").innerHTML = T.days.map((d, i) => `
    <div class="day">
      <div class="day-h"><span class="dot" style="background:${colors[i]}"></span>
        <h3>${esc(d.label)} · ${esc(d.title)}</h3><span class="badge">${esc(d.level)}</span></div>
      <p class="sum">${esc(d.summary)}</p>
      <ol class="tl">${d.stops.map(s => `
        <li><span class="t">${esc(s.t)}</span><div>
          <div class="what">${s.p ? `<a target="_blank" href="${gmap(place(s.p))}">${esc(s.what)}</a>` : esc(s.what)}</div>
          ${s.how ? `<div class="how">${esc(s.how)}</div>` : ""}</div></li>`).join("")}
      </ol></div>`).join("");

  const cards = (list, el) => document.getElementById(el).innerHTML = list.map(x => `
    <div class="card"><h4><a target="_blank" href="${gmap(x)}">${esc(x.name)}</a></h4>
      <div class="sub">${esc(x.sub || "")}</div>
      <p>${esc(x.desc || "")}</p>
      ${(x.tags || []).map(t => `<span class="tag${t.startsWith("!") ? " warn" : ""}">${esc(t.replace(/^!/, ""))}</span>`).join("")}
    </div>`).join("");
  cards(T.hotels || [], "hotels");
  cards(T.food || [], "food");
  document.getElementById("tips").innerHTML = T.tips.map(t => `<li>${esc(t)}</li>`).join("");
  document.getElementById("src").innerHTML = (T.sources || []).map(u => `<li><a target="_blank" href="${esc(u)}">${esc(u)}</a></li>`).join("");
})();
