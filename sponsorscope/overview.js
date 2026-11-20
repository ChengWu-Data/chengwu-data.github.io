/*
 * The "Today" tab: what the latest daily scan found, as a funnel, a per-day trend,
 * the reasons roles get ruled out and where the roles worth applying to are.
 * Everything here is computed from the scan's published files (latest.json and
 * history.json) and from the verdicts app.js holds, so it follows your limits.
 */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var App = window.SSApp, DAY = 864e5;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function n(v) { return Number(v || 0).toLocaleString("en-US"); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function pct(a, b) { return b ? Math.round(a / b * 100) + "%" : "–"; }
  function ago(ms) {
    var h = (Date.now() - ms) / 36e5;
    if (h < 1) return "under an hour ago";
    if (h < 36) return Math.round(h) + (Math.round(h) === 1 ? " hour ago" : " hours ago");
    return Math.round(h / 24) + " days ago";
  }
  function nyDay(ms) { return new Date(ms).toLocaleDateString("en-CA", { timeZone: "America/New_York" }); }

  // Numbers count up once when they first appear.
  function countUp(el, to) {
    if (reduce || !to) { el.textContent = n(to); return; }
    var t0 = performance.now(), dur = 900;
    (function step(t) {
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = n(Math.round(to * e));
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  // ---------- buttons that switch tabs ----------
  Array.prototype.forEach.call(document.querySelectorAll("[data-go]"), function (b) {
    b.addEventListener("click", function (e) { e.preventDefault(); App.selectTab(b.dataset.go); });
  });

  // ---------- the bookmarklet ----------
  // Runs on the job page the person is looking at, in their own browser. It takes the posting text
  // (LinkedIn's description box, the page's JobPosting data, the selected text, or the main content)
  // and opens SponsorScope with it in the address fragment, which is never sent to any server.
  function bookmarklet() {
    var d = document, q = function (s) { var e = d.querySelector(s); return e ? (e.innerText || e.textContent || "").trim() : ""; };
    var ld = null;
    Array.prototype.forEach.call(d.querySelectorAll('script[type="application/ld+json"]'), function (s) {
      try { [].concat(JSON.parse(s.textContent)).forEach(function (j) { [].concat(j["@graph"] || j).forEach(function (x) { if (x && x["@type"] === "JobPosting") ld = x; }); }); } catch (e) { /* not JSON */ }
    });
    var ldText = ld && ld.description ? new DOMParser().parseFromString(String(ld.description).replace(/<\/(p|li|h\d|div)>|<br\s*\/?>/gi, "\n$&"), "text/html").body.textContent : "";
    var sel = String(window.getSelection ? window.getSelection() : "").trim();
    var title = q(".job-details-jobs-unified-top-card__job-title, .jobs-unified-top-card__job-title, .top-card-layout__title") || (ld && ld.title) || q("h1") || d.title;
    var org = ld && ld.hiringOrganization ? (ld.hiringOrganization.name || "") : "";
    var company = q(".job-details-jobs-unified-top-card__company-name, .jobs-unified-top-card__company-name, .topcard__org-name-link") || org;
    var text = sel.length > 200 ? sel : q("#job-details, .jobs-description__content, .jobs-description-content__text, .description__text") || ldText || q("main") || q("article") || d.body.innerText;
    var data = { u: location.href, t: title, c: company, x: String(text).slice(0, 30000) };
    window.open("https://chengwu-data.github.io/sponsorscope/#check=" + encodeURIComponent(JSON.stringify(data)), "_blank");
  }
  var bm = $("bm-link");
  if (bm) {
    bm.setAttribute("href", "javascript:" + encodeURIComponent("(" + bookmarklet.toString() + ")();void 0"));
    bm.addEventListener("click", function (e) { e.preventDefault(); bm.classList.add("bm-hint"); bm.textContent = "Drag me to the bookmarks bar"; setTimeout(function () { bm.classList.remove("bm-hint"); bm.textContent = "SponsorScope it"; }, 2200); });
  }

  // ---------- reasons a role is ruled out ----------
  var REASON = [
    ["sponsor", "Says it won’t sponsor a visa", /^(no_sponsorship|authorized_no_sponsor)$/],
    ["citizen", "U.S. citizens or green-card holders only", /^citizens_only$/],
    ["clearance", "Needs a security clearance", /^clearance$/],
    ["years", "Asks for more years than your cap", /^years_over$/],
    ["pay", "Whole pay range under your floor", /^pay_below$/],
    ["h1b", "Company filed no H-1Bs in three years", /^no_h1b$/]
  ];
  // Older scan files carry only the one-line reason, so the reason is read from that.
  var REASON_TEXT = [["sponsor", /sponsor/i], ["citizen", /citizen|green.card|permanent resident/i], ["clearance", /clearance/i], ["years", /years/i], ["pay", /pay|salary/i], ["h1b", /h-1b/i]];
  function reasonOf(j) {
    var cs = j.codes, i, k;
    if (cs && cs.length) for (i = 0; i < cs.length; i++) for (k = 0; k < REASON.length; k++) if (REASON[k][2].test(cs[i])) return REASON[k][0];
    for (k = 0; k < REASON_TEXT.length; k++) if (REASON_TEXT[k][1].test(j.why || "")) return REASON_TEXT[k][0];
    return "other";
  }

  // ---------- render ----------
  var history = null, historyP = null, lastFeed = null;
  function loadHistory() {
    historyP = historyP || fetch(App.feedBase + "history.json", { cache: "no-cache" }).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
    return historyP;
  }
  function tally(list) {
    var c = { all: list.length, apply: 0, ask: 0, skip: 0 };
    list.forEach(function (j) { c[j.verdict]++; });
    return c;
  }
  function limitsLine(p, mine) {
    var bits = [p.needsSponsorship ? "needs visa sponsorship" : "doesn’t need sponsorship",
      p.salaryFloor > 0 ? "wants a base of $" + Math.round(p.salaryFloor / 1000) + "k or more" : "takes any pay",
      "applies to roles asking for up to " + p.maxYears + " years"];
    return mine
      ? "Judged with your limits: someone who " + bits.join(", ") + '. <button type="button" class="link-btn" id="ov-edit">Change</button>'
      : "Judged for someone who " + bits.join(", ") + ', the limits of the person who built it. <button type="button" class="link-btn" id="ov-edit">Use your own limits</button>';
  }

  function renderHero(feed, rejudging) {
    var now = Date.now(), jobs = feed.jobs, day = tally(jobs.filter(function (j) { return now - j.when <= DAY; })), week = tally(jobs);
    var b = feed.boards || {};
    $("ov-live").classList.toggle("is-old", now - feed.now > 26 * 36e5);
    $("ov-live-text").innerHTML = "Live · scanned " + ago(feed.now) + '<span class="live-more"> · ' + n(b.total - (b.failed || []).length) + " company job boards</span>";
    var worth = day.apply ? day.apply : week.apply, when = day.apply ? "today" : "this week";
    $("ov-h").innerHTML = '<span class="num" data-n="' + (b.rows || 0) + '">0</span> open roles. <span class="ov-accent"><span class="num" data-n="' + worth + '">0</span> worth applying to ' + when + ".</span>";
    Array.prototype.forEach.call($("ov-h").querySelectorAll(".num"), function (el) { countUp(el, Number(el.dataset.n)); });
    var mine = !App.isDefault();
    $("ov-limits").innerHTML = (rejudging ? '<span class="spin" aria-hidden="true"></span>Judging every role again with your limits… ' : "") + limitsLine(App.profile(), mine);
    $("ov-edit").addEventListener("click", App.openLimits);

    var stages = [
      { v: b.rows, k: "open roles read today", d: "on " + n(b.total) + " company job boards: Greenhouse, Lever, Ashby, SmartRecruiters and Workday" },
      b.fit ? { v: b.fit, k: "in the 19 business directions, in the U.S.", d: "titles like analyst, strategy, GTM, product ops and solutions; engineering and senior titles left out" } : null,
      { v: week.all, k: "first seen in the last 7 days", d: "new to the board, not just reposted" },
      { v: week.apply, k: "clear your limits this week", d: week.ask ? "and " + n(week.ask) + " more to ask the recruiter about first" : "" },
      { v: day.apply, k: "new in the last 24 hours", d: "worth applying to today", hot: true, of: "of this week’s" }
    ].filter(Boolean);
    $("funnel").innerHTML = stages.map(function (s, i) {
      var prev = i ? stages[i - 1].v : 0, share = prev ? Math.max(0.5, Math.round(s.v / prev * 1000) / 10) : 100;
      return '<li class="fn' + (s.hot ? " fn-hot" : "") + '"><div class="fn-top"><b class="num" data-n="' + (s.v || 0) + '">0</b><span class="fn-k">' + esc(s.k) + "</span></div>" +
        (i ? '<div class="fn-bar" role="img" aria-label="' + share + '% of the step above"><i style="--w:' + Math.min(100, share) + '%"></i></div><span class="fn-share">' + (share < 1 ? "under 1" : share) + "% " + (s.of || "of the step above") + "</span>" : "") +
        (s.d ? '<span class="fn-d">' + esc(s.d) + "</span>" : "") + "</li>";
    }).join("");
    Array.prototype.forEach.call($("funnel").querySelectorAll(".num"), function (el) { countUp(el, Number(el.dataset.n)); });
    requestAnimationFrame(function () { $("funnel").classList.add("is-in"); });
  }

  function renderWhy(feed) {
    var skips = feed.jobs.filter(function (j) { return j.verdict === "skip"; }), counts = {};
    skips.forEach(function (j) { var r = reasonOf(j); counts[r] = (counts[r] || 0) + 1; });
    var rows = REASON.map(function (r) { return { k: r[0], label: r[1], v: counts[r[0]] || 0 }; }).filter(function (r) { return r.v; });
    if (counts.other) rows.push({ k: "other", label: "Other", v: counts.other });
    rows.sort(function (a, b) { return b.v - a.v; });
    var max = rows.length ? rows[0].v : 1;
    $("why-bars").innerHTML = rows.length ? rows.map(function (r) {
      return '<li title="' + n(r.v) + " of " + n(skips.length) + ' Skip verdicts"><span class="hb-l">' + esc(r.label) + '</span><span class="hb-track"><i style="--w:' + (r.v / max * 100) + '%"></i></span><span class="hb-v">' + n(r.v) + ' <small>' + pct(r.v, skips.length) + "</small></span></li>";
    }).join("") : '<li class="muted">No roles were ruled out this week.</li>';
  }

  function renderWhere(feed) {
    var by = {};
    feed.jobs.forEach(function (j) {
      if (j.verdict !== "apply") return;
      var c = by[j.company] || (by[j.company] = { name: j.company, n: 0, h: j.h1b, titles: [] });
      c.n++; c.titles.push(j);
    });
    // The two titles shown are the ones closest to the first-look directions.
    var tier = function (j) { var d = window.Roles && window.Roles.byId[j.dir]; return d ? d.tier : 3; };
    Object.keys(by).forEach(function (k) { by[k].titles = by[k].titles.sort(function (a, b) { return tier(a) - tier(b); }).slice(0, 2).map(function (j) { return j.title; }); });
    var list = Object.keys(by).map(function (k) { return by[k]; }).sort(function (a, b) { return b.n - a.n || a.name.localeCompare(b.name); }).slice(0, 8);
    var max = list.length ? list[0].n : 1;
    $("where-list").innerHTML = list.length ? list.map(function (c) {
      return '<li><button type="button" class="rank-row" data-co="' + esc(c.name) + '"><span class="rank-name">' + esc(c.name) +
        '<small>' + esc(c.titles.join(" · ")) + "</small></span>" +
        '<span class="rank-bar"><i style="--w:' + (c.n / max * 100) + '%"></i></span><b>' + c.n + "</b></button></li>";
    }).join("") : '<li class="muted">No roles clear your limits this week yet.</li>';
    Array.prototype.forEach.call($("where-list").querySelectorAll(".rank-row"), function (b) {
      b.addEventListener("click", function () { App.showRoles(b.dataset.co, 168); });
    });
  }

  function renderStats(feed) {
    var jobs = feed.jobs, all = jobs.length;
    var silent = jobs.filter(function (j) { return j.sponsorship === "silent" || j.sponsorship === "unclear"; }).length;
    var filers = jobs.filter(function (j) { return j.h1b && j.h1b.role > 0; }).length;
    var tops = jobs.filter(function (j) { return j.verdict === "apply" && j.pay && j.pay[1]; }).map(function (j) { return j.pay[1]; }).sort(function (a, b) { return a - b; });
    $("st-silent").textContent = pct(silent, all);
    $("st-filers").textContent = pct(filers, all);
    $("st-pay").textContent = tops.length ? "$" + Math.round(tops[Math.floor(tops.length / 2)] / 1000) + "k" : "–";
  }

  // ---------- new roles per day (stacked bars) ----------
  var SERIES = [["apply", "Apply"], ["ask", "Ask first"], ["skip", "Skip"]];
  function trendDays(feed) {
    var days = {}, today = nyDay(Date.now());
    if (history && history.days) Object.keys(history.days).forEach(function (d) { days[d] = Object.assign({}, history.days[d]); });
    // The days the feed still covers are counted from it, so they follow your limits. The oldest one is only
    // partly inside a 7-day feed, so it is left to the history file.
    var fresh = {};
    feed.jobs.forEach(function (j) {
      var d = nyDay(j.when), c = fresh[d] || (fresh[d] = { all: 0, apply: 0, ask: 0, skip: 0 });
      c.all++; c[j.verdict]++;
    });
    var cut = nyDay(Date.now() - 6 * DAY);
    Object.keys(fresh).forEach(function (d) { if (d >= cut) days[d] = Object.assign(days[d] || {}, fresh[d]); });
    var keys = Object.keys(days).filter(function (d) { return d <= today && (d >= cut || days[d].all); }).sort().slice(-30);
    return keys.map(function (d) { return Object.assign({ day: d, today: d === today }, days[d]); });
  }
  function fmtDay(d, long) {
    var p = d.split("-"), dt = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2], 12));
    return dt.toLocaleDateString("en-US", long ? { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" } : { month: "short", day: "numeric", timeZone: "UTC" });
  }
  function renderTrend(feed) {
    var box = $("trend-chart"), rows = trendDays(feed);
    if (!rows.length) { box.innerHTML = '<p class="muted">No data yet.</p>'; return; }
    var W = Math.max(280, box.clientWidth || 600), H = 220, padL = 34, padB = 26, padT = 10, gap = 2;
    var max = Math.max.apply(null, rows.map(function (r) { return r.all || 0; }).concat([1]));
    var step = Math.pow(10, Math.floor(Math.log10(max))), nice = Math.ceil(max / step) * step;
    if (nice / step <= 2) step = step / 2;
    var y = function (v) { return padT + (H - padT - padB) * (1 - v / nice); };
    var bw = (W - padL) / rows.length, barW = Math.min(36, bw * 0.62);
    var svg = '<svg viewBox="0 0 ' + W + " " + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="New roles per day by verdict">';
    for (var g = 0; g <= nice; g += step) {
      svg += '<line class="grid" x1="' + padL + '" x2="' + W + '" y1="' + y(g) + '" y2="' + y(g) + '"/><text class="axis" x="' + (padL - 8) + '" y="' + (y(g) + 4) + '" text-anchor="end">' + n(g) + "</text>";
    }
    var every = Math.ceil(rows.length / Math.max(1, Math.floor(W / 70)));
    rows.forEach(function (r, i) {
      var x = padL + i * bw + (bw - barW) / 2, base = H - padB, segs = [];
      SERIES.forEach(function (s) { if (r[s[0]]) segs.push([s[0], r[s[0]]]); });
      segs.forEach(function (sg, si) {
        var h = (H - padT - padB) * sg[1] / nice, top = base - h, last = si === segs.length - 1;
        var hh = Math.max(0, h - (last ? 0 : gap));
        svg += last ? '<path class="seg seg-' + sg[0] + '" d="M' + x + "," + base + "V" + (top + Math.min(4, hh)) + "q0,-4 4,-4H" + (x + barW - 4) + "q4,0 4,4V" + base + 'Z"/>'
          : '<rect class="seg seg-' + sg[0] + '" x="' + x + '" y="' + (base - hh) + '" width="' + barW + '" height="' + hh + '"/>';
        base = top;
      });
      if (i % every === 0 || i === rows.length - 1) svg += '<text class="axis" x="' + (x + barW / 2) + '" y="' + (H - 8) + '" text-anchor="middle">' + (r.today ? "Today" : fmtDay(r.day)) + "</text>";
      svg += '<rect class="hit" data-i="' + i + '" x="' + (padL + i * bw) + '" y="' + padT + '" width="' + bw + '" height="' + (H - padT - padB) + '"/>';
    });
    svg += "</svg>";
    // A table with the same numbers, for screen readers.
    svg += '<table class="sr-only"><caption>New roles per day</caption><tr><th>Day</th><th>Apply</th><th>Ask first</th><th>Skip</th></tr>' +
      rows.map(function (r) { return "<tr><td>" + fmtDay(r.day, true) + "</td><td>" + (r.apply || 0) + "</td><td>" + (r.ask || 0) + "</td><td>" + (r.skip || 0) + "</td></tr>"; }).join("") + "</table>";
    box.innerHTML = svg;
    var tip = $("trend-tip");
    box.querySelector("svg").addEventListener("mousemove", function (e) {
      var hit = e.target.closest(".hit"); if (!hit) { tip.hidden = true; return; }
      var r = rows[+hit.dataset.i];
      Array.prototype.forEach.call(box.querySelectorAll(".hit"), function (h) { h.classList.toggle("on", h === hit); });
      tip.innerHTML = "<b>" + (r.today ? "Today so far" : fmtDay(r.day, true)) + "</b>" + SERIES.map(function (s) {
        return '<span><i class="sw sw-' + s[0] + '"></i>' + s[1] + "<em>" + n(r[s[0]] || 0) + "</em></span>";
      }).join("") + '<span class="tip-total">New roles<em>' + n(r.all || 0) + "</em></span>";
      var rect = box.getBoundingClientRect(), hr = hit.getBoundingClientRect();
      tip.hidden = false;
      var left = hr.left - rect.left + hr.width / 2 - tip.offsetWidth / 2;
      tip.style.left = Math.max(0, Math.min(rect.width - tip.offsetWidth, left)) + "px";
    });
    box.querySelector("svg").addEventListener("mouseleave", function () { tip.hidden = true; Array.prototype.forEach.call(box.querySelectorAll(".hit.on"), function (h) { h.classList.remove("on"); }); });
    var older = rows.length && rows[0].day < nyDay(Date.now() - 6 * DAY);
    $("trend-sub").textContent = "Roles in the 19 directions, by the day the scan first saw them" + (older && !App.isDefault() ? ". Days older than a week keep the scan’s default verdicts." : "");
  }

  function render(detail) {
    var feed = detail.feed;
    if (!feed) {
      $("ov-live").classList.add("is-old");
      $("ov-live-text").textContent = "The daily scan has not published results yet";
      $("funnel").innerHTML = '<li class="muted">Results appear here after the first scan. Meanwhile you can check any posting.</li>';
      return;
    }
    lastFeed = detail;
    renderHero(feed, detail.rejudging);
    if (detail.rejudging) return;
    renderWhy(feed); renderWhere(feed); renderStats(feed);
    loadHistory().then(function (h) { history = h; renderTrend(feed); });
  }
  document.addEventListener("ss:feed", function (e) { render(e.detail); });
  var t = null;
  window.addEventListener("resize", function () {
    clearTimeout(t); t = setTimeout(function () { if (lastFeed && lastFeed.feed && !$("panel-overview").hidden) renderTrend(lastFeed.feed); }, 150);
  });
  document.addEventListener("ss:tab", function (e) { if (e.detail === "tab-overview" && lastFeed && lastFeed.feed) renderTrend(lastFeed.feed); });
})();
