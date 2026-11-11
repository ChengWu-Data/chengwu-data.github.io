(function () {
  "use strict";
  var SS = window.SponsorScope;
  var $ = function (id) { return document.getElementById(id); };

  // ---------- storage (best effort: private windows can refuse it) ----------
  function load(key, fallback) {
    try { var v = localStorage.getItem("ss:" + key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function save(key, value) { try { localStorage.setItem("ss:" + key, JSON.stringify(value)); } catch (e) { /* ignore */ } }

  var DEFAULT_KW = "Data Analyst, Business Analyst, Strategy Analyst, Risk Analyst, Compliance Analyst, Research Analyst, Operations Analyst, Business Operations, Strategy & Operations, Analytics, GTM Engineer, Go-to-Market, Revenue Operations, Sales Operations, GTM Operations";
  var DEFAULT_NOT = "Software Engineer, Data Engineer, Machine Learning Engineer, Director, Head of, Principal, Staff, Intern";
  var profile = Object.assign({}, SS.DEFAULT_PROFILE, load("profile", {}));

  // ---------- small helpers ----------
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function k(v) { return SS.fmtMoney(v); }
  function payText(p) { return p ? k(p.lo) + (p.hi !== p.lo ? "–" + k(p.hi) : "") : "Not listed"; }
  function yearsText(y) { return y ? y.min + (y.max ? "–" + y.max : "+") + " yrs" : "Not listed"; }
  var WORD = { apply: "Apply", ask: "Ask first", skip: "Skip" };
  var LEVEL_CLASS = { skip: "skip", ask: "ask", good: "good", info: "info" };
  var EXPLAIN = {
    no_sponsorship: "The posting says it will not sponsor a work visa. If you will need H-1B later, this role is closed to you even while you are on OPT.",
    authorized_no_sponsor: "They want people who can work without sponsorship now and later. OPT alone does not meet that.",
    citizens_only: "Only U.S. citizens or green-card holders can be hired here, usually because of export-control or government contract rules.",
    clearance: "A U.S. security clearance requires citizenship, so this role is closed to visa holders.",
    authorization_unclear: "OPT counts as authorized today, but the posting does not say whether they will file H-1B later. Companies often decide this on the application form or in the final round.",
    perm_posting: "Phrases like “experience in the job offered” and “foreign equivalent” are typical of green-card labor-certification ads, which are usually written for someone already in the job. Apply only if it is a strong fit, and do not count on it.",
    sponsorship_offered: "The posting says sponsorship is possible. Confirm it covers this level and location before you commit time.",
    everify: "The employer uses E-Verify, which every STEM OPT employer must.",
    no_h1b: "The Department of Labor shows no certified H-1B filings under this company name in the last 12 months. If it files under a different legal name, enter that name below.",
    h1b_not_role: "The company does sponsor, but last year none of its filings were for this kind of role. Worth asking the recruiter directly.",
    h1b_ok: "Counts come from certified H-1B labor condition applications filed with the Department of Labor.",
    years_over: "The posting's stated minimum is above your limit.",
    years_ok: "Within your experience limit.",
    pay_below: "Even the top of the stated range is under your pay floor.",
    pay_ok: "At or above your pay floor."
  };
  var SPONSOR_FACT = {
    denied: "Says no sponsorship", restricted: "Citizens or clearance only", offered: "Says sponsorship is possible",
    unclear: "Asks for work authorization, silent on sponsorship", silent: "Not mentioned"
  };

  function h1bLinks(company, title) {
    var c = encodeURIComponent(company || "");
    var t = encodeURIComponent((title || "").replace(/\(.*?\)|,.*$/g, "").trim());
    return '<a href="https://www.myvisajobs.com/Search_Visa_Sponsor.aspx?N=' + c + '" target="_blank" rel="noopener">MyVisaJobs</a>' +
           '<a href="https://h1bdata.info/index.php?em=' + c + '&job=' + t + '&city=&year=all+years" target="_blank" rel="noopener">H1BData for this title</a>';
  }


  // ---------- H-1B filings (Department of Labor LCA data) ----------
  var H1B_PERIOD = "Jul 2025 to Jun 2026";
  var LEVEL_ORDER = { skip: 0, ask: 1, good: 2, info: 3 };
  function roleCount(rec, title) { return rec ? (rec.f[LCA.familyOf(title)] || 0) : 0; }
  function withH1b(r, rec, title) {
    if (!rec) return r;
    var fam = LCA.familyOf(title || ""), fc = rec.f[fam] || 0, lab = LCA.LABEL[fam], f;
    if (rec.n === 0) f = { code: "no_h1b", level: profile.requireH1b && profile.needsSponsorship ? "skip" : "ask", title: "No H-1B filings in the last 12 months", evidence: [] };
    else if (fam !== "other" && fc === 0) f = { code: "h1b_not_role", level: "info", title: "Files H-1Bs, but none for " + lab + " roles last year", evidence: [] };
    else f = { code: "h1b_ok", level: "good", title: rec.n + " H-1B filings last year" + (fam !== "other" ? ", " + fc + " for " + lab + " roles" : ""), evidence: [] };
    var findings = r.findings.filter(function (x) { return !/^(no_h1b|h1b_)/.test(x.code); }).concat([f]);
    findings.sort(function (a, b) { return LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]; });
    var lv = findings.map(function (x) { return x.level; });
    var verdict = lv.indexOf("skip") >= 0 ? "skip" : lv.indexOf("ask") >= 0 ? "ask" : "apply";
    var headline = SS.headline(verdict, findings, r.sponsorship);
    if (verdict === "apply" && r.sponsorship === "silent" && rec.n > 0) headline = "Nothing in this posting rules you out, and the company filed " + rec.n + " H-1Bs last year" + (fam !== "other" ? " (" + fc + " for " + lab + " roles)" : "") + ".";
    return Object.assign({}, r, { findings: findings, verdict: verdict, headline: headline });
  }
  function h1bFact(rec, state, title, company) {
    var links = h1bLinks(company, title);
    var input = '<label class="h1b-other">Files under another legal name? <input type="text" class="h1b-co" placeholder="e.g. Maplebear for Instacart" aria-label="Legal company name for H-1B lookup"></label>';
    if (state === "loading") return '<p class="h1b-sum muted">Checking Department of Labor filings…</p>';
    if (state === "none") return '<p class="h1b-sum muted">Add the company name to see its H-1B filings.</p><label class="h1b-other">Company <input type="text" class="h1b-co" placeholder="Company name" aria-label="Company name for H-1B lookup"></label>';
    if (!rec) return '<p class="h1b-sum muted">Couldn\u2019t load the filing data. Check it here instead:</p><p class="h1b-links">' + links + "</p>";
    if (rec.n === 0) return '<p class="h1b-sum"><b>No certified H-1B filings</b> under this name, ' + H1B_PERIOD + ".</p>" + input + '<p class="h1b-links">' + links + "</p>";
    var fam = LCA.familyOf(title || ""), fc = rec.f[fam] || 0, ent = rec.lv[fam] || 0;
    var html = '<p class="h1b-sum"><b>' + rec.n.toLocaleString("en-US") + "</b> certified H-1B filings, " + H1B_PERIOD + ".";
    if (fam !== "other") html += " <b>" + fc + "</b> for " + LCA.LABEL[fam] + " roles" + (fc ? ", " + ent + " at entry wage levels (I\u2013II)" : "") + ".";
    html += "</p>";
    if (rec.titles.length) html += '<ul class="h1b-titles">' + rec.titles.slice(0, 3).map(function (t) {
      return "<li>" + esc(t.title) + ' <span class="muted">' + t.n + " filing" + (t.n > 1 ? "s" : "") + (t.wage ? ", " + k(t.wage) : "") + "</span></li>";
    }).join("") + "</ul>";
    html += '<p class="h1b-names muted">Filed as ' + rec.names.map(esc).join("; ") + "</p>" + input + '<p class="h1b-links">' + links + "</p>";
    return html;
  }

  // ---------- limits ----------
  function renderLimits() {
    $("lim-sponsor").textContent = profile.needsSponsorship ? "Needs sponsorship" : "No sponsorship needed";
    $("lim-years").textContent = "Up to " + profile.maxYears + " years asked";
    $("lim-pay").textContent = profile.salaryFloor > 0 ? "Base pay from " + k(profile.salaryFloor) : "Any pay";
    $("lim-h1b").textContent = profile.requireH1b ? "Company files H-1Bs" : "Any company";
    $("f-h1b").checked = !!profile.requireH1b;
    $("f-sponsor").checked = !!profile.needsSponsorship;
    $("f-years").value = profile.maxYears;
    $("f-years-hard").value = profile.yearsHard ? "1" : "0";
    $("f-pay").value = profile.salaryFloor;
    $("f-pay-hard").value = profile.salaryHard ? "1" : "0";
  }
  $("edit-limits").addEventListener("click", function () {
    var f = $("limits-form"), open = f.hidden;
    f.hidden = !open; this.setAttribute("aria-expanded", String(open));
    if (open) $("f-years").focus();
  });
  $("limits-form").addEventListener("submit", function (e) {
    e.preventDefault();
    profile = {
      needsSponsorship: $("f-sponsor").checked,
      maxYears: Math.max(0, parseInt($("f-years").value || "0", 10)),
      yearsHard: $("f-years-hard").value === "1",
      salaryFloor: Math.max(0, parseInt($("f-pay").value || "0", 10)),
      salaryHard: $("f-pay-hard").value === "1",
      requireH1b: $("f-h1b").checked
    };
    save("profile", profile); renderLimits();
    $("limits-form").hidden = true; $("edit-limits").setAttribute("aria-expanded", "false");
    if (lastCheck) runCheck(lastCheck.text, lastCheck.meta);
    if (scanJobs.length) { scanJobs.forEach(function (j) { j.r = withH1b(SS.analyze(j.text, profile), j.h1b, j.title); }); renderScan(); }
  });
  $("reset-limits").addEventListener("click", function () {
    profile = Object.assign({}, SS.DEFAULT_PROFILE); save("profile", profile); renderLimits();
  });

  // ---------- tabs ----------
  var tabs = [$("tab-check"), $("tab-scan")];
  function selectTab(t) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute("aria-selected", String(on)); x.tabIndex = on ? 0 : -1;
      $(x.getAttribute("aria-controls")).hidden = !on;
    });
    save("tab", t.id);
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { selectTab(t); });
    t.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") { var n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length]; selectTab(n); n.focus(); }
    });
  });

  // ---------- job-board fetching ----------
  function getJSON(url) {
    return fetch(url).then(function (r) { if (!r.ok) throw new Error(r.status === 404 ? "not found" : "HTTP " + r.status); return r.json(); });
  }
  function leverText(x) {
    return [x.descriptionPlain || "", (x.lists || []).map(function (l) { return l.text + "\n" + SS.htmlToText(l.content); }).join("\n"),
            x.additionalPlain || "", x.salaryDescriptionPlain || "",
            x.salaryRange ? "Base salary range: $" + x.salaryRange.min + " - $" + x.salaryRange.max + " per year" : ""].join("\n");
  }
  function ashbyText(x) {
    var comp = x.compensation && (x.compensation.scrapeableCompensationSalarySummary || x.compensation.compensationTierSummary);
    return (x.descriptionPlain || SS.htmlToText(x.descriptionHtml || "")) + (comp ? "\nCompensation: " + comp : "");
  }
  function normalize(ats, slug, name, x) {
    if (ats === "greenhouse") return { id: "gh:" + x.id, title: x.title, company: x.company_name || name, location: (x.location && x.location.name) || "",
      url: x.absolute_url, posted: Date.parse(x.first_published || x.updated_at) || 0, text: SS.htmlToText(x.content || "") };
    if (ats === "lever") return { id: "lv:" + x.id, title: x.text, company: name, location: (x.categories && x.categories.location) || "",
      url: x.hostedUrl, posted: x.createdAt || 0, text: leverText(x), country: x.country };
    return { id: "ab:" + x.id, title: x.title, company: name, location: x.location || "", url: x.jobUrl,
      posted: Date.parse(x.publishedAt) || 0, text: ashbyText(x), remote: x.isRemote,
      country: x.address && x.address.postalAddress && x.address.postalAddress.addressCountry };
  }
  function fetchBoard(ats, slug, name) {
    if (ats === "greenhouse") return getJSON("https://boards-api.greenhouse.io/v1/boards/" + slug + "/jobs?content=true").then(function (j) { return j.jobs.map(function (x) { return normalize(ats, slug, name, x); }); });
    if (ats === "lever") return getJSON("https://api.lever.co/v0/postings/" + slug + "?mode=json").then(function (j) { return j.map(function (x) { return normalize(ats, slug, name, x); }); });
    return getJSON("https://api.ashbyhq.com/posting-api/job-board/" + encodeURIComponent(slug) + "?includeCompensation=true").then(function (j) { return (j.jobs || []).map(function (x) { return normalize(ats, slug, name, x); }); });
  }
  function prettySlug(s) { return String(s || "").replace(/usa$/i, "").replace(/[-_]/g, " ").replace(/\b\w/g, function (c) { return c.toUpperCase(); }); }
  function fetchOne(p) {
    var name = prettySlug(p.slug);
    if (p.ats === "greenhouse") {
      if (!p.slug) return Promise.reject(new Error("This link only has a job number. Open the posting, copy its text, and paste that instead."));
      return getJSON("https://boards-api.greenhouse.io/v1/boards/" + p.slug + "/jobs/" + p.id).then(function (x) { return normalize("greenhouse", p.slug, name, x); });
    }
    if (p.ats === "lever") return getJSON("https://api.lever.co/v0/postings/" + p.slug + "/" + p.id).then(function (x) { return normalize("lever", p.slug, name, x); });
    return fetchBoard("ashby", p.slug, name).then(function (jobs) {
      var j = jobs.filter(function (x) { return x.id === "ab:" + p.id; })[0];
      if (!j) throw new Error("That job is no longer on the board.");
      return j;
    });
  }

  // ---------- rendering a verdict ----------
  function renderPosting(r) {
    var marks = [];
    r.findings.forEach(function (f) {
      if (f.level === "info" && f.code !== "everify") return;
      var lv = f.level === "info" ? "good" : f.level;
      f.evidence.forEach(function (e) { marks.push({ s: e.start, e: e.end, lv: lv, code: f.code }); });
    });
    marks.sort(function (a, b) { return a.s - b.s || (a.lv === "skip" ? -1 : 1); });
    var out = "", pos = 0;
    marks.forEach(function (m) {
      if (m.s < pos) return;
      out += esc(r.text.slice(pos, m.s)) + '<mark class="m-' + m.lv + '" data-code="' + m.code + '">' + esc(r.text.slice(m.s, m.e)) + "</mark>";
      pos = m.e;
    });
    return out + esc(r.text.slice(pos));
  }

  function renderVerdict(r, meta, target, rec, state, onCompany) {
    var company = (meta && meta.company) || "";
    var title = (meta && meta.title) || "";
    var html = '<div class="verdict v-' + r.verdict + '"><div class="verdict-word">' + WORD[r.verdict] + "</div>" +
      '<p class="verdict-line">' + esc(r.headline) + "</p>" +
      (title ? '<p class="verdict-role">' + esc(title) + (company ? " at " + esc(company) : "") + (meta.url ? ' <a href="' + esc(meta.url) + '" target="_blank" rel="noopener">Open posting</a>' : "") + "</p>" : "") +
      "</div>";
    html += '<dl class="facts">' +
      "<div><dt>Sponsorship</dt><dd>" + SPONSOR_FACT[r.sponsorship] + "</dd></div>" +
      "<div><dt>Experience asked</dt><dd>" + yearsText(r.years) + "</dd></div>" +
      "<div><dt>Base pay</dt><dd>" + payText(r.pay) + "</dd></div>" +
      '<div class="fact-h1b"><dt>H-1B filings' + (company ? " for " + esc(company) : "") + '</dt><dd>' + h1bFact(rec, state, title, company) + "</dd></div></dl>";
    var shown = r.findings.filter(function (f) { return f.code !== "years_ok" && f.code !== "pay_ok" && f.code !== "h1b_ok"; });
    if (shown.length) {
      html += '<ul class="finding-list">' + shown.map(function (f) {
        var ev = f.evidence.slice(0, 2).map(function (e) { return "<q>" + esc(e.text.length > 240 ? e.text.slice(0, 237) + "…" : e.text) + "</q>"; }).join("");
        return '<li class="f-' + LEVEL_CLASS[f.level] + '"><strong>' + esc(f.title) + "</strong><p>" + (EXPLAIN[f.code] || "") + "</p>" + ev + "</li>";
      }).join("") + "</ul>";
    }
    if (r.verdict !== "skip" && profile.needsSponsorship && (r.sponsorship === "unclear" || r.sponsorship === "silent")) {
      html += '<div class="ask-box"><strong>Ask before the first interview.</strong> The posting does not settle sponsorship, so it is worth one message to the recruiter:' +
        '<blockquote id="ask-text">Hi, I’m very interested in the ' + esc(title || "role") + '. I’m on F-1 OPT now and would need H-1B sponsorship later. Is this position open to candidates who will need sponsorship?</blockquote>' +
        '<button type="button" class="btn copy-ask">Copy message</button></div>';
    }
    target.innerHTML = html;
    var co = target.querySelector(".h1b-co");
    if (co && onCompany) co.addEventListener("change", function () { if (co.value.trim()) onCompany(co.value.trim()); });
    var cp = target.querySelector(".copy-ask");
    if (cp) cp.addEventListener("click", function () { copy(target.querySelector("blockquote").textContent, cp, "Copied"); });
  }

  // ---------- check one posting ----------
  var lastCheck = null;
  function runCheck(text, meta) {
    lastCheck = { text: text, meta: meta || {} };
    var r = SS.analyze(text, profile);
    var res = $("result");
    res.hidden = false;
    meta = Object.assign({}, meta || {});
    if (!meta.title) {
      var first = (r.text.split("\n").filter(function (l) { return l.trim(); })[0] || "").trim();
      if (first && first.length <= 90 && !/[.!?]$/.test(first)) meta.title = first;
    }
    var zone = $("verdict-zone");
    var show = function (company, query) {
      var m = Object.assign({}, meta, { company: company });
      if (!company) { renderVerdict(r, m, zone, null, "none", show); return; }
      renderVerdict(r, m, zone, null, "loading", show);
      var token = (lastCheck.token = {});
      LCA.lookup(query || company).then(function (rec) {
        if (lastCheck.token !== token) return;
        renderVerdict(withH1b(r, rec, m.title), m, zone, rec, "done", show);
      });
    };
    show(meta.company, meta.h1bQuery);
    $("posting-text").innerHTML = renderPosting(r);
    $("check-msg").textContent = "";
    $("verdict-zone").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }
  $("check-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var raw = $("jd").value.trim();
    if (!raw) { $("check-msg").textContent = "Paste a posting or a job link first."; $("jd").focus(); return; }
    var link = /^https?:\/\/\S+$/.test(raw) ? SS.parseBoardUrl(raw) : null;
    if (/^https?:\/\/\S+$/.test(raw) && !(link && link.id)) {
      $("check-msg").textContent = "That link isn’t a Greenhouse, Lever or Ashby job page. Open the posting, copy its text, and paste it here.";
      return;
    }
    if (link) {
      $("check-msg").textContent = "Fetching the posting…"; $("check-btn").disabled = true;
      fetchOne(link).then(function (j) { j.h1bQuery = aliasFor(link.slug) || j.company; runCheck(j.text, j); })
        .catch(function (err) { $("check-msg").textContent = "Couldn’t load that posting (" + err.message + "). Copy its text and paste it instead."; })
        .then(function () { $("check-btn").disabled = false; });
      return;
    }
    runCheck(raw, {});
  });

  var EXAMPLES = {
    deny: "Business Analyst, Payments\nNew York, NY\n\nWhat you'll do\n• Build dashboards that track authorization rates and chargebacks across card networks.\n• Partner with Risk and Product on pricing experiments.\n\nWhat we're looking for\n• 1-3 years of experience in analytics, consulting, or finance.\n• Strong SQL and one of Python or R.\n\nThe base salary range for this role is $95,000 - $125,000.\n\nPlease note that for this position, we are not able to consider candidates who currently or in the future will require visa sponsorship.",
    unclear: "Strategy & Operations Associate\nSan Francisco, CA (Hybrid)\n\nYou will own weekly business reviews and help leadership decide where to invest.\n\nAbout you\n• 2+ years in consulting, banking, or a strategy role.\n• Comfortable building models in Excel and SQL.\n\nOur expected base pay range for this position is $110,000 - $140,000.\n\nApplicants must be currently authorized to work in the United States on a full-time basis.",
    silent: "Data Analyst, Growth\nRemote (US)\n\nYou will design A/B tests, size opportunities, and turn messy event data into decisions.\n\nRequirements\n• 2-4 years of experience in product or marketing analytics.\n• Experience with experimentation and causal inference.\n\nCompensation: $100K - $130K. We participate in E-Verify."
  };
  Array.prototype.forEach.call(document.querySelectorAll("[data-example]"), function (b) {
    b.addEventListener("click", function () { $("jd").value = EXAMPLES[b.dataset.example]; runCheck($("jd").value, {}); });
  });

  function aliasFor(slug) {
    var hit = null;
    window.SS_BOARDS.forEach(function (g) { g.items.forEach(function (b) { if (b[1] === slug) hit = b[4] || b[2]; }); });
    return hit;
  }

  // ---------- scan job boards ----------
  var custom = load("customBoards", []);
  var selected = load("boardsOn", null);
  function allBoards() {
    var groups = window.SS_BOARDS.slice();
    if (custom.length) groups = groups.concat([{ group: "Added by you", items: custom }]);
    return groups;
  }
  function key(b) { return b[0] + ":" + b[1]; }
  function renderBoards() {
    if (!selected) { selected = {}; allBoards().forEach(function (g) { g.items.forEach(function (b) { if (b[3]) selected[key(b)] = true; }); }); }
    $("board-list").innerHTML = allBoards().map(function (g) {
      return '<div class="board-group"><p class="board-group-name">' + esc(g.group) + "</p>" + g.items.map(function (b) {
        return '<label class="board"><input type="checkbox" value="' + key(b) + '"' + (selected[key(b)] ? " checked" : "") + "> " + esc(b[2]) + "</label>";
      }).join("") + "</div>";
    }).join("");
  }
  $("board-list").addEventListener("change", function (e) {
    if (e.target.type === "checkbox") { if (e.target.checked) selected[e.target.value] = true; else delete selected[e.target.value]; save("boardsOn", selected); }
  });
  $("boards-all").addEventListener("click", function () { allBoards().forEach(function (g) { g.items.forEach(function (b) { selected[key(b)] = true; }); }); save("boardsOn", selected); renderBoards(); });
  $("boards-none").addEventListener("click", function () { selected = {}; save("boardsOn", selected); renderBoards(); });
  $("board-add").addEventListener("click", function () {
    var p = SS.parseBoardUrl($("board-url").value);
    if (!p || !p.slug) { $("board-msg").textContent = "Paste a careers link from job-boards.greenhouse.io, jobs.lever.co or jobs.ashbyhq.com."; return; }
    $("board-msg").textContent = "Checking that board…";
    fetchBoard(p.ats, p.slug, prettySlug(p.slug)).then(function (jobs) {
      var b = [p.ats, p.slug, prettySlug(p.slug), true];
      if (!custom.some(function (c) { return key(c) === key(b); })) custom.push(b);
      selected[key(b)] = true; save("customBoards", custom); save("boardsOn", selected); renderBoards();
      $("board-url").value = ""; $("board-msg").textContent = "Added " + b[2] + " (" + jobs.length + " open roles).";
    }).catch(function () { $("board-msg").textContent = "No public job board answered at that link."; });
  });

  $("kw").value = load("kw", DEFAULT_KW);
  $("kw-not").value = load("kwNot", DEFAULT_NOT);
  $("days").value = String(load("days", 3));

  var NON_US = /\b(canada|toronto|vancouver|montreal|ontario|united kingdom|\buk\b|london|ireland|dublin|germany|berlin|munich|france|paris|spain|madrid|barcelona|netherlands|amsterdam|poland|warsaw|india|bangalore|bengaluru|hyderabad|singapore|japan|tokyo|australia|sydney|melbourne|brazil|s[aã]o paulo|mexico|colombia|chile|argentina|israel|tel aviv|emea|apac|latam|korea|seoul|hong kong|taiwan|china|philippines|portugal|lisbon|sweden|stockholm|switzerland|zurich|italy|denmark|norway|finland|belgium|austria|czech|romania|uae|dubai|south africa|nigeria|kenya|new zealand)\b/i;
  function isUS(j) {
    if (j.country) return /^(us|usa|united states)/i.test(j.country);
    var loc = j.location || "";
    if (!loc) return true;
    if (/united states|\busa?\b|remote.{0,6}(us|u\.s|united states|north america)/i.test(loc)) return true;
    return !NON_US.test(loc);
  }
  function terms(s) { return s.split(",").map(function (x) { return x.trim().toLowerCase(); }).filter(Boolean); }

  var scanJobs = [];
  var showing = { apply: true, ask: true, skip: false };
  var seen = load("seen", {});

  $("scan-form").addEventListener("submit", function (e) {
    e.preventDefault();
    save("kw", $("kw").value); save("kwNot", $("kw-not").value); save("days", parseInt($("days").value, 10));
    var boards = [];
    allBoards().forEach(function (g) { g.items.forEach(function (b) { if (selected[key(b)]) boards.push(b); }); });
    if (!boards.length) { $("progress").hidden = false; $("progress-text").textContent = "Select at least one company."; return; }
    var want = terms($("kw").value), not = terms($("kw-not").value);
    var days = parseInt($("days").value, 10), since = days ? Date.now() - days * 864e5 : 0, usOnly = $("us-only").checked;
    scanJobs = []; var done = 0, failed = [];
    $("scan-btn").disabled = true; $("progress").hidden = false; $("scan-empty").hidden = true;
    var tick = function () {
      $("progress-bar").style.width = Math.round(done / boards.length * 100) + "%";
      $("progress-text").textContent = done < boards.length ? "Read " + done + " of " + boards.length + " job boards…"
        : "Read " + boards.length + " job boards" + (failed.length ? " (" + failed.join(", ") + " did not answer)" : "") + ".";
    };
    tick();
    var queue = boards.slice();
    function worker() {
      var b = queue.shift(); if (!b) return Promise.resolve();
      var mine = [];
      return fetchBoard(b[0], b[1], b[2]).then(function (jobs) {
        jobs.forEach(function (j) {
          var t = j.title.toLowerCase();
          if (want.length && !want.some(function (w) { return t.indexOf(w) >= 0; })) return;
          if (not.some(function (w) { return t.indexOf(w) >= 0; })) return;
          if (since && j.posted && j.posted < since) return;
          if (usOnly && !isUS(j)) return;
          // One row per role: the same title posted in several cities is merged.
          var dup = mine.filter(function (x) { return x.company === j.company && x.title === j.title; })[0];
          if (dup) { if (j.location && dup.locs.indexOf(j.location) < 0) dup.locs.push(j.location); return; }
          j.locs = j.location ? [j.location] : [];
          j.isNew = !seen[j.id];
          mine.push(j);
        });
        return mine.length ? LCA.lookup(b[4] || b[2]) : null;
      }).then(function (rec) {
        mine.forEach(function (j) { j.h1b = rec; j.r = withH1b(SS.analyze(j.text, profile), rec, j.title); scanJobs.push(j); });
      }).catch(function () { failed.push(b[2]); }).then(function () { done++; tick(); renderScan(); return worker(); });
    }
    Promise.all([worker(), worker(), worker(), worker(), worker(), worker()]).then(function () {
      $("scan-btn").disabled = false;
      scanJobs.forEach(function (j) { seen[j.id] = Date.now(); });
      var cutoff = Date.now() - 90 * 864e5; Object.keys(seen).forEach(function (id) { if (seen[id] < cutoff) delete seen[id]; });
      save("seen", seen);
      if (!scanJobs.length) { $("scan-empty").hidden = false; $("scan-empty").innerHTML = "<p>No roles matched. Try a longer time window, more companies, or broader title words.</p>"; $("scan-results").hidden = true; }
    });
  });

  var ORDER = { apply: 0, ask: 1, skip: 2 };
  function renderScan() {
    var counts = { apply: 0, ask: 0, skip: 0 };
    scanJobs.forEach(function (j) { counts[j.r.verdict]++; });
    Object.keys(counts).forEach(function (v) { $("n-" + v).textContent = counts[v]; });
    $("scan-results").hidden = !scanJobs.length;
    var rows = scanJobs.filter(function (j) { return showing[j.r.verdict]; })
      .sort(function (a, b) {
        return ORDER[a.r.verdict] - ORDER[b.r.verdict] || roleCount(b.h1b, b.title) - roleCount(a.h1b, a.title) ||
          ((b.h1b && b.h1b.n) || 0) - ((a.h1b && a.h1b.n) || 0) || (b.isNew - a.isNew) || (b.posted - a.posted);
      });
    $("jobs").querySelector("tbody").innerHTML = rows.map(function (j) {
      var why = j.r.findings.filter(function (f) { return f.level === j.r.verdict || (j.r.verdict === "apply" && f.level === "good" && /sponsor/.test(f.code)); })[0];
      var reason = why ? why.title : (j.r.sponsorship === "silent" ? "Silent on sponsorship" : "");
      var d = j.posted ? new Date(j.posted).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "";
      return '<tr class="row-' + j.r.verdict + '"><td><span class="tag t-' + j.r.verdict + '">' + WORD[j.r.verdict] + "</span></td>" +
        '<td class="role"><a href="' + esc(j.url) + '" target="_blank" rel="noopener">' + esc(j.title) + "</a>" + (j.isNew ? ' <span class="new">new</span>' : "") +
        '<span class="sub">' + esc(j.company) + (j.locs && j.locs.length ? ", " + esc(j.locs[0]) + (j.locs.length > 1 ? " +" + (j.locs.length - 1) + " more" : "") : "") + (d ? ". Posted " + d : "") + "</span></td>" +
        "<td>" + (j.r.pay ? payText(j.r.pay) : '<span class="muted">—</span>') + "</td>" +
        "<td>" + (j.r.years ? j.r.years.min + "+" : '<span class="muted">—</span>') + "</td>" +
        "<td>" + (j.h1b ? "<b>" + j.h1b.n.toLocaleString("en-US") + '</b><span class="sub">' + (LCA.familyOf(j.title) === "other" ? "total" : roleCount(j.h1b, j.title) + " in role type") + "</span>" : '<span class="muted">—</span>') + "</td>" +
        '<td class="why">' + esc(reason) + ' <button type="button" class="link-btn details" data-id="' + esc(j.id) + '">Details</button></td></tr>';
    }).join("") || '<tr><td colspan="6" class="muted">Nothing in the selected groups. Turn on another filter above.</td></tr>';
  }
  Array.prototype.forEach.call(document.querySelectorAll(".filter"), function (b) {
    b.setAttribute("aria-pressed", String(b.classList.contains("is-on")));
    b.addEventListener("click", function () {
      showing[b.dataset.f] = !showing[b.dataset.f];
      b.classList.toggle("is-on", showing[b.dataset.f]); b.setAttribute("aria-pressed", String(showing[b.dataset.f]));
      renderScan();
    });
  });
  $("jobs").addEventListener("click", function (e) {
    var btn = e.target.closest(".details"); if (!btn) return;
    var j = scanJobs.filter(function (x) { return x.id === btn.dataset.id; })[0]; if (!j) return;
    $("dlg-title").textContent = j.title;
    var body = $("dlg-body"); body.innerHTML = '<div class="dlg-verdict"></div><h3>The posting, marked up</h3><div class="posting-text"></div>';
    renderVerdict(j.r, j, body.querySelector(".dlg-verdict"), j.h1b, j.h1b === undefined ? "none" : "done");
    body.querySelector(".posting-text").innerHTML = renderPosting(j.r);
    $("job-dialog").showModal();
  });
  $("dlg-close").addEventListener("click", function () { $("job-dialog").close(); });
  $("job-dialog").addEventListener("click", function (e) { if (e.target === this) this.close(); });

  // ---------- export ----------
  function visibleRows() {
    return scanJobs.filter(function (j) { return showing[j.r.verdict]; }).sort(function (a, b) { return ORDER[a.r.verdict] - ORDER[b.r.verdict]; });
  }
  function note(j) {
    var top = j.r.findings.filter(function (f) { return f.level === j.r.verdict; })[0];
    return "SponsorScope: " + WORD[j.r.verdict] + (top ? " (" + top.title + ")" : j.r.sponsorship === "silent" ? " (silent on sponsorship)" : "") +
      (j.h1b ? ". H-1B filings last 12 mo: " + j.h1b.n + ", " + roleCount(j.h1b, j.title) + " this role type" : "");
  }
  var today = function () { var d = new Date(); return (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear(); };
  function copy(text, btn, done) {
    var ok = function () { var o = btn.textContent; btn.textContent = done; setTimeout(function () { btn.textContent = o; }, 1600); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, fallback); else fallback();
    function fallback() { var t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); ok(); } catch (e) { /* ignore */ } t.remove(); }
  }
  $("copy-sheet").addEventListener("click", function () {
    var rows = visibleRows();
    if (!rows.length) { $("export-msg").textContent = "Nothing to copy with the current filters."; return; }
    // Same columns as the tracker: Company, Title, Location, Link, Status, Date, Interview Stage, Interviewer, Notes, Week, Salary
    var tsv = rows.map(function (j) {
      return [j.company, j.title, (j.locs || [j.location]).join("; "), '=HYPERLINK("' + j.url.replace(/"/g, "") + '","link")', "", today(), "", "", note(j), "", j.r.pay ? payText(j.r.pay) : ""]
        .map(function (c) { return String(c).replace(/[\t\n]/g, " "); }).join("\t");
    }).join("\n");
    copy(tsv, $("copy-sheet"), "Copied " + rows.length + " rows");
    $("export-msg").textContent = "Click the first empty Company cell in your sheet and paste. Links show as “link”.";
  });
  $("dl-csv").addEventListener("click", function () {
    var rows = visibleRows();
    var q = function (c) { c = String(c == null ? "" : c); return /[",\n]/.test(c) ? '"' + c.replace(/"/g, '""') + '"' : c; };
    var csv = ["Verdict,Company,Title,Location,Link,Base pay,Min years,Sponsorship,H-1B filings (12 mo),H-1B filings for this role type,Note,Posted"].concat(rows.map(function (j) {
      return [WORD[j.r.verdict], j.company, j.title, (j.locs || [j.location]).join("; "), j.url, j.r.pay ? payText(j.r.pay) : "", j.r.years ? j.r.years.min : "",
        SPONSOR_FACT[j.r.sponsorship], j.h1b ? j.h1b.n : "", j.h1b ? roleCount(j.h1b, j.title) : "", note(j), j.posted ? new Date(j.posted).toISOString().slice(0, 10) : ""].map(q).join(",");
    })).join("\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "sponsorscope-" + new Date().toISOString().slice(0, 10) + ".csv";
    document.body.appendChild(a); a.click(); a.remove();
  });

  // ---------- start ----------
  renderLimits();
  renderBoards();
  var startTab = load("tab", "tab-check");
  if (/[?&]mode=scan/.test(location.search) || startTab === "tab-scan") selectTab($("tab-scan"));
})();
