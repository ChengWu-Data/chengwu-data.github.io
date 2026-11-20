/*
 * The "Sponsor data" tab: the Department of Labor filings market-wide (data/lca/summary.json,
 * built by data/summarize.py) and a lookup for any employer (the per-employer shards lca.js reads).
 */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var App = window.SSApp, LCA = window.LCA;
  var BASE = "data/lca/";
  function n(v) { return Number(v || 0).toLocaleString("en-US"); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function pct(a, b, digits) { return b ? (a / b * 100).toFixed(digits || 0) + "%" : "–"; }
  function money(v) { return v ? "$" + Math.round(v / 1000) + "k" : "–"; }
  function change(now, before) {
    if (!before) return '<span class="chg">new</span>';
    var c = Math.round((now - before) / before * 100);
    return '<span class="chg ' + (c > 0 ? "up" : c < 0 ? "down" : "") + '">' + (c > 0 ? "▲ " + c : c < 0 ? "▼ " + (-c) : "0") + "%</span>";
  }
  // Names on the filings are often in capitals.
  var FIX = [[/\bLlc\b/g, "LLC"], [/\bLlp\b/g, "LLP"], [/\bLp\b/g, "LP"], [/\bN\.a\.?/g, "N.A."], [/\bUsa\b/g, "USA"], [/\bUs\b/g, "US"], [/'S\b/g, "'s"]];
  function pretty(s) {
    s = String(s || "");
    if (s !== s.toUpperCase()) return s;
    s = s.toLowerCase().replace(/\b[a-z]/g, function (c) { return c.toUpperCase(); });
    FIX.forEach(function (f) { s = s.replace(f[0], f[1]); });
    return s;
  }

  var FAMS = ["analyst", "strategy", "product", "gtm", "solutions", "risk", "marketing", "finance", "ds"];
  function famLabel(f) { var l = LCA.LABEL[f] || f; return l.charAt(0).toUpperCase() + l.slice(1); }

  var sum = null, loading = null, lb = { fam: "all", view: "top" };
  function load() {
    loading = loading || fetch(BASE + "summary.json").then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
    return loading;
  }

  // ---------- headline numbers ----------
  function renderHead() {
    var f = sum.filings, total = f[0] + f[1] + f[2];
    $("dv-h").textContent = "Who sponsors, and for which roles";
    $("dv-lede").textContent = n(total) + " certified H-1B filings from " + n(sum.employers) + " employers, " + sum.periods[0].split(" – ")[0] + " to " + sum.period.split(" – ")[1] +
      ", plus the green-card (PERM) cases, rebuilt from the Department of Labor’s quarterly disclosure files.";
    var kpi = function (big, label, sub) { return '<div class="kpi"><b>' + big + "</b><span>" + label + "</span>" + (sub ? "<small>" + sub + "</small>" : "") + "</div>"; };
    $("dv-kpis").innerHTML =
      kpi(n(f[2]), "H-1B filings, last 12 months", change(f[2], f[1]) + " on the year before") +
      kpi(n(sum.employersLatest), "employers filed at least one", n(sum.single) + " of them filed exactly one") +
      kpi(pct(sum.top1pct.share, 1), "of filings came from the top 1% of employers", n(sum.top1pct.employers) + " companies") +
      kpi(n(sum.perm[2]), "green-card cases certified", change(sum.perm[2], sum.perm[1]) + " on the year before");
  }

  function renderFamilies() {
    var fam = sum.families, rows = FAMS.map(function (k) { return { k: k, v: fam[k] }; }).sort(function (a, b) { return b.v.n - a.v.n; });
    var max = rows[0].v.n, all = sum.filings[2];
    $("fam-bars").innerHTML = rows.map(function (r) {
      return '<li class="hb-li"><button type="button" class="hb-row" data-fam="' + r.k + '" title="Show the top sponsors for ' + esc(famLabel(r.k)) + ' roles"><span class="hb-l">' + esc(famLabel(r.k)) +
        '</span><span class="hb-track"><i style="--w:' + (r.v.n / max * 100) + '%"></i></span><span class="hb-v">' + n(r.v.n) + " " + change(r.v.n, r.v.prev) + "</span></button></li>";
    }).join("");
    $("fam-note").textContent = "For scale: engineering titles had " + n(fam.eng.n) + " filings (" + pct(fam.eng.n, all) + " of all), and titles outside these groups " + n(fam.other.n) + ". Role types come from the job title on each filing.";
    Array.prototype.forEach.call($("fam-bars").querySelectorAll(".hb-row"), function (b) {
      b.addEventListener("click", function () { lb.fam = b.dataset.fam; lb.view = "top"; renderBoard(); $("lb-h").scrollIntoView({ behavior: "smooth", block: "start" }); });
    });
  }

  function renderFacts() {
    var fam = sum.families, biz = { n: 0, new: 0, xfer: 0, entry: 0, metro: 0 };
    FAMS.forEach(function (k) { ["n", "new", "xfer", "entry", "metro"].forEach(function (x) { biz[x] += fam[k][x]; }); });
    var k = sum.kinds, kAll = k[0] + k[1] + k[2];
    var facts = [
      [pct(k[0] + k[1], kAll), "of all filings last year brought someone new into the company (" + n(k[0]) + " new hires, " + n(k[1]) + " moving from another employer). The rest were extensions and amendments for people already there."],
      [pct(biz.new + biz.xfer, biz.n), "of business-role filings were for someone new to the company, the share that matters when you are the new hire."],
      [pct(biz.entry, biz.n), "of business-role filings were at entry wage levels (I or II), the levels a new graduate is usually filed at."],
      [pct(sum.metro, sum.filings[2]), "of last year’s filings were for worksites in the New York City area: " + n(sum.metro) + " in all."],
      [money(fam.analyst.wage) + " · " + money(fam.product.wage), "typical base pay on data and business analyst filings, and on product filings (the average of each employer’s median)."]
    ];
    $("dv-facts").innerHTML = facts.map(function (f) { return "<li><b>" + f[0] + "</b><span>" + esc(f[1]) + "</span></li>"; }).join("");
  }

  // ---------- leaderboard ----------
  var VIEWS = [["top", "Most filings"], ["nyc", "New York area"], ["rising", "Growing fastest"]];
  function renderBoard() {
    var isAll = lb.fam === "all";
    $("lb-fams").innerHTML = [["all", "All business roles"]].concat(FAMS.map(function (f) { return [f, famLabel(f)]; })).map(function (c) {
      return '<button type="button" class="chip' + (lb.fam === c[0] ? " is-on" : "") + '" data-f="' + c[0] + '" aria-pressed="' + (lb.fam === c[0]) + '">' + esc(c[1]) + "</button>";
    }).join("");
    $("lb-view").innerHTML = isAll ? VIEWS.map(function (v) {
      return '<button type="button" class="tog' + (lb.view === v[0] ? " is-on" : "") + '" data-v="' + v[0] + '" aria-pressed="' + (lb.view === v[0]) + '">' + v[1] + "</button>";
    }).join("") : "";
    $("lb-view").hidden = !isAll;
    var rows = isAll ? sum.business[lb.view] : sum.byFamily[lb.fam];
    var metric = isAll && lb.view === "nyc" ? "metro" : "n";
    var max = Math.max.apply(null, rows.map(function (r) { return r[metric]; }).concat([1]));
    $("lb-sub").textContent = isAll
      ? (lb.view === "nyc" ? "Business-role filings at New York City area worksites, last 12 months"
        : lb.view === "rising" ? "Largest rise in business-role filings on the year before (at least 20 last year)"
        : "Filings for analyst, strategy, product, GTM, solutions, risk, marketing, finance and data science roles, last 12 months")
      : famLabel(lb.fam) + " filings, last 12 months";
    var head = "<thead><tr><th scope=\"col\" class=\"lb-rank\">#</th><th scope=\"col\">Employer (legal name)</th><th scope=\"col\" class=\"lb-num\">" + (metric === "metro" ? "NYC area" : "Filings") +
      '</th><th scope="col" class="lb-num">Year before</th><th scope="col" class="lb-num">New to company</th><th scope="col" class="lb-num">Entry level</th>' +
      (metric === "metro" ? '<th scope="col" class="lb-num">All business</th>' : '<th scope="col" class="lb-num">NYC area</th>') + (isAll ? "" : '<th scope="col" class="lb-num">Typical base</th>') + "</tr></thead>";
    $("lb-table").innerHTML = head + "<tbody>" + rows.map(function (r, i) {
      var v = r[metric];
      return '<tr data-key="' + esc(r.key) + '" tabindex="0"><td class="lb-rank">' + (i + 1) + '</td><td class="lb-name">' + esc(r.name) + "</td>" +
        '<td class="lb-num lb-bar"><span class="lb-track"><i style="--w:' + (v / max * 100) + '%"></i></span><b>' + n(v) + "</b></td>" +
        '<td class="lb-num">' + n(r.prev) + " " + change(r.n, r.prev) + "</td>" +
        '<td class="lb-num">' + pct(r.new, r.n) + '</td><td class="lb-num">' + pct(r.entry, r.n) + "</td>" +
        '<td class="lb-num">' + n(metric === "metro" ? r.n : r.metro) + "</td>" + (isAll ? "" : '<td class="lb-num">' + money(r.wage) + "</td>") + "</tr>";
    }).join("") + "</tbody>";
    Array.prototype.forEach.call($("lb-fams").querySelectorAll(".chip"), function (b) { b.addEventListener("click", function () { lb.fam = b.dataset.f; renderBoard(); }); });
    Array.prototype.forEach.call($("lb-view").querySelectorAll(".tog"), function (b) { b.addEventListener("click", function () { lb.view = b.dataset.v; renderBoard(); }); });
  }
  $("lb-table").addEventListener("click", function (e) { var tr = e.target.closest("tr[data-key]"); if (tr) pick(tr.dataset.key, tr.querySelector(".lb-name").textContent); });
  $("lb-table").addEventListener("keydown", function (e) { var tr = e.target.closest("tr[data-key]"); if (tr && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); pick(tr.dataset.key, tr.querySelector(".lb-name").textContent); } });

  // ---------- company lookup ----------
  var shards = {};
  function shard(key) {
    var id = key.slice(0, 2).replace(/ /g, "_").toLowerCase();
    shards[id] = shards[id] || fetch(BASE + id + ".json").then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; });
    return shards[id];
  }
  var lk = { items: [], active: -1, token: 0 };
  function suggest() {
    var q = $("lk-q").value, key = LCA.norm(q), token = ++lk.token;
    if (key.length < 2) { closeList(); return; }
    shard(key).then(function (d) {
      if (token !== lk.token) return;
      lk.items = Object.keys(d).filter(function (k) { return k === key || k.indexOf(key) === 0; }).map(function (k) {
        var e = d[k]; return { key: k, name: pretty(e.names[0] || k), n: e.y[2], all: e.y[0] + e.y[1] + e.y[2] };
      }).sort(function (a, b) { return b.all - a.all; }).slice(0, 8);
      lk.active = lk.items.length ? 0 : -1;
      drawList();
    });
  }
  function drawList() {
    var ul = $("lk-list");
    if (!lk.items.length) { ul.innerHTML = '<li class="lk-none">No employer under that name. Try the legal name, or fewer words.</li>'; ul.hidden = false; $("lk-q").setAttribute("aria-expanded", "true"); return; }
    ul.innerHTML = lk.items.map(function (it, i) {
      return '<li role="option" id="lk-o' + i + '" data-i="' + i + '" aria-selected="' + (i === lk.active) + '"><span>' + esc(it.name) + '</span><small>' + n(it.n) + " last year · " + n(it.all) + " in 3 years</small></li>";
    }).join("");
    ul.hidden = false; $("lk-q").setAttribute("aria-expanded", "true");
    $("lk-q").setAttribute("aria-activedescendant", lk.active >= 0 ? "lk-o" + lk.active : "");
  }
  function closeList() { $("lk-list").hidden = true; $("lk-q").setAttribute("aria-expanded", "false"); }
  var tmr = null;
  $("lk-q").addEventListener("input", function () { clearTimeout(tmr); tmr = setTimeout(suggest, 120); });
  $("lk-q").addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") { if (!lk.items.length) return; e.preventDefault(); lk.active = (lk.active + (e.key === "ArrowDown" ? 1 : lk.items.length - 1)) % lk.items.length; drawList(); }
    else if (e.key === "Enter") { e.preventDefault(); var it = lk.items[lk.active]; if (it) pick(it.key, it.name); }
    else if (e.key === "Escape") closeList();
  });
  $("lk-list").addEventListener("mousedown", function (e) { var li = e.target.closest("[data-i]"); if (li) { e.preventDefault(); var it = lk.items[+li.dataset.i]; pick(it.key, it.name); } });
  $("lk-q").addEventListener("blur", function () { setTimeout(closeList, 120); });

  function pick(key, name) {
    closeList(); $("lk-q").value = name;
    $("lk-out").innerHTML = '<p class="muted">Loading ' + esc(name) + "…</p>";
    $("lk-h").scrollIntoView({ behavior: "smooth", block: "start" });
    LCA.lookup("=" + key).then(function (rec) { $("lk-out").innerHTML = card(rec, name); });
  }
  function card(rec, name) {
    if (!rec) return '<p class="muted">Couldn’t load that employer.</p>';
    var y = rec.y, newIn = rec.k[0] + rec.k[1];
    var tile = function (big, k, d) { return '<div class="sp-tile"><b>' + big + '</b><span class="sp-k">' + k + "</span>" + (d ? '<span class="sp-d">' + d + "</span>" : "") + "</div>"; };
    var html = '<div class="co-head"><h4>' + esc(name) + '</h4><p class="muted">Filed as ' + rec.names.map(function (s) { return esc(pretty(s)); }).join("; ").replace(/\.+$/, "") + "</p></div>";
    html += '<div class="sp-tiles">' +
      tile(n(rec.n), "H-1B filings, last 12 months", change(rec.n, y[1]) + " on the year before (" + n(y[1]) + ")") +
      tile(rec.n ? pct(newIn, rec.n) : "–", "brought someone new in", n(rec.k[0]) + " new hires, " + n(rec.k[1]) + " moved from another employer") +
      tile(n(rec.m), "at New York City area worksites", rec.n ? pct(rec.m, rec.n) + " of its filings" : "") +
      tile(n(rec.pm[2]), "green-card cases certified", n(rec.pm[1]) + " the year before") + "</div>";
    // Business roles first, by filings; engineering and other titles last, for scale.
    var biz = function (f) { return FAMS.indexOf(f) >= 0 ? 0 : 1; };
    var fams = Object.keys(rec.f).filter(function (f) { var v = rec.f[f]; return v[0] + v[6] + v[7] > 0; }).sort(function (a, b) { return biz(a) - biz(b) || rec.f[b][0] - rec.f[a][0]; });
    if (fams.length) html += '<div class="table-wrap"><table class="lb co-table"><thead><tr><th scope="col">Kind of role</th><th scope="col" class="lb-num">Last 12 mo</th><th scope="col" class="lb-num">Year before</th><th scope="col" class="lb-num">2 years ago</th><th scope="col" class="lb-num">New to company</th><th scope="col" class="lb-num">Entry level</th><th scope="col" class="lb-num">NYC area</th><th scope="col" class="lb-num">Typical base</th></tr></thead><tbody>' +
      fams.map(function (f) {
        var v = rec.f[f];
        return "<tr" + (FAMS.indexOf(f) >= 0 ? ' class="is-biz"' : "") + "><th scope=\"row\">" + esc(famLabel(f)) + '</th><td class="lb-num"><b>' + n(v[0]) + '</b></td><td class="lb-num">' + n(v[6]) + '</td><td class="lb-num">' + n(v[7]) +
          '</td><td class="lb-num">' + n(v[1] + v[2]) + '</td><td class="lb-num">' + n(v[3]) + '</td><td class="lb-num">' + n(v[4]) + '</td><td class="lb-num">' + money(v[5]) + "</td></tr>";
      }).join("") + "</tbody></table></div>";
    var titles = (rec.titles || []).slice(0, 8);
    if (titles.length) html += '<p class="sp-h">Titles it filed for most</p><ul class="co-titles">' + titles.map(function (t) {
      return "<li>" + esc(t.title) + ' <span class="muted">' + n(t.n) + (t.n === 1 ? " filing" : " filings") + (t.wage ? ", " + money(t.wage) + " median base" : "") + "</span></li>";
    }).join("") + "</ul>";
    var c = encodeURIComponent(rec.names[0] || name);
    html += '<p class="h1b-links"><a href="https://www.e-verify.gov/e-verify-employer-search" target="_blank" rel="noopener">E-Verify employer search</a>' +
      '<a href="https://www.myvisajobs.com/Search_Visa_Sponsor.aspx?N=' + c + '" target="_blank" rel="noopener">MyVisaJobs</a>' +
      '<a href="https://h1bdata.info/index.php?em=' + c + '&job=&city=&year=all+years" target="_blank" rel="noopener">H1BData</a></p>' +
      '<p class="muted small">A filing is a request to employ one person, not an approved visa. The STEM OPT extension also needs an E-Verify employer; check the official list above.</p>';
    return html;
  }

  // ---------- start when the tab is first opened ----------
  var started = false;
  function start() {
    if (started) return; started = true;
    load().then(function (s) {
      sum = s; renderHead(); renderFamilies(); renderFacts(); renderBoard();
      $("dv-foot").textContent = "Source: U.S. Department of Labor, Office of Foreign Labor Certification disclosure data, rebuilt " + (s.built || "") +
        ". Each filing is counted once, in the 12-month period of its decision date. Role types are read from the job title on the filing. “Typical base” is the average of employers’ median offered wage.";
    }).catch(function () { started = false; $("dv-lede").textContent = "Couldn’t load the filing summary. Reload the page to try again."; });
  }
  document.addEventListener("ss:tab", function (e) { if (e.detail === "tab-data") start(); });
  if (!$("panel-data").hidden) start();
})();
