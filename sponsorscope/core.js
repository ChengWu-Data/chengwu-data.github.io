/*
 * The parts shared by the page (app.js) and the daily scan (scan/daily.js):
 * reading a posting from each job board's format, deciding whether a job is
 * in the U.S., folding the company's filing history into the verdict, and
 * pulling a short summary (skills, work mode, degree) out of the text.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory(require("./engine.js"), require("./lca.js"));
  else root.Core = factory(root.SponsorScope, root.LCA);
})(typeof self !== "undefined" ? self : this, function (SS, LCA) {
  "use strict";

  // The page's starting standards, and the ones the daily scan judges with.
  var DEFAULTS = Object.assign({}, SS.DEFAULT_PROFILE, { salaryFloor: 105000, maxYears: 3, yearsGrace: 1, v: 2 });

  function num(n) { return Number(n || 0).toLocaleString("en-US"); }

  // ---------- one posting, whatever the board ----------
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
      url: x.hostedUrl, posted: x.createdAt || 0, text: leverText(x), country: x.country,
      remote: /remote/i.test(x.workplaceType || "") };
    if (ats === "smartrecruiters") {
      var L = x.location || {}, sec = (x.jobAd && x.jobAd.sections) || {};
      return { id: "sr:" + x.id, title: x.name, company: name, location: L.fullLocation || [L.city, L.region].filter(Boolean).join(", "),
        url: x.postingUrl || ("https://jobs.smartrecruiters.com/" + slug + "/" + x.id), posted: Date.parse(x.releasedDate) || 0,
        country: L.country, remote: !!L.remote,
        text: ["jobDescription", "qualifications", "additionalInformation"].map(function (k) { return sec[k] ? SS.htmlToText(sec[k].text || "") : ""; }).join("\n") };
    }
    if (ats === "workday") {      // x = { list: the search-result row, info: jobPostingInfo from the detail call, base, key }
      var i = x.info || {}, row = x.list || {};
      return { id: "wd:" + x.key + ":" + (i.jobReqId || (row.bulletFields || [])[0] || row.externalPath), title: i.title || row.title, company: name,
        location: i.location || row.locationsText || "", more: (i.additionalLocations || []),
        url: i.externalUrl || (x.base + row.externalPath), posted: Date.parse(i.startDate) || 0,
        country: i.country && i.country.descriptor, remote: /remote/i.test(i.remoteType || ""),
        text: SS.htmlToText(i.jobDescription || "") };
    }
    return { id: "ab:" + x.id, title: x.title, company: name, location: x.location || "", url: x.jobUrl,
      posted: Date.parse(x.publishedAt) || 0, text: ashbyText(x), remote: x.isRemote,
      country: x.address && x.address.postalAddress && x.address.postalAddress.addressCountry };
  }

  // ---------- is the job in the United States? ----------
  var NON_US = /\b(canada|toronto|vancouver|montreal|ontario|united kingdom|\buk\b|london|ireland|dublin|germany|berlin|munich|frankfurt|france|paris|spain|madrid|barcelona|netherlands|amsterdam|poland|warsaw|krakow|india|bangalore|bengaluru|hyderabad|pune|chennai|mumbai|gurgaon|gurugram|noida|delhi|singapore|japan|tokyo|australia|sydney|melbourne|brazil|s[aã]o paulo|mexico|guadalajara|colombia|bogot[aá]|chile|argentina|buenos aires|israel|tel aviv|emea|apac|latam|korea|seoul|hong kong|taiwan|china|shanghai|beijing|shenzhen|philippines|manila|malaysia|kuala lumpur|portugal|lisbon|sweden|stockholm|switzerland|zurich|geneva|italy|milan|denmark|copenhagen|norway|finland|belgium|brussels|austria|vienna|czech|prague|hungary|budapest|romania|bucharest|lithuania|vilnius|luxembourg|uae|dubai|saudi|riyadh|egypt|cairo|south africa|nigeria|kenya|new zealand|costa rica|puerto rico|scotland|edinburgh|glasgow|belfast|manchester)\b/i;
  function isUS(j) {
    if (j.country) return /^(us|usa|united states)/i.test(j.country);
    var loc = j.location || "";
    if (!loc) return true;
    if (/united states|\busa?\b|remote.{0,6}(us|u\.s|united states|north america)/i.test(loc)) return true;
    return !NON_US.test(loc);
  }

  // Titles the daily scan never keeps, whatever the direction: pure engineering, very senior, not a full-time hire,
  // or a different profession (quota sales, trading, legal, clinical) that happens to share a keyword.
  var NEVER = /software engineer|data engineer|machine learning engineer|\bml engineer|\bdirector\b|\bhead of\b|\bprincipal\b|vice president|\bs?vp\b|\bavp\b|\bintern(ship)?\b|\bco-?op\b|\bapprentice|^staff\b|\b(senior|sr\.?) staff\b|\bstaff (engineer|scientist|analyst|product|data|software|accountant)|\bexecutive assistant|\bpartner,|managing director|\bchief (?!of staff)|\btrader\b|account executive|sales (development )?representative|\b[sb]dr\b|\baccountant\b|\battorney\b|\bcounsel\b|\bparalegal\b|\brecruiter\b|administrative assistant|\bnurse\b|\bpharmacist\b|\bphysician\b/i;
  function excluded(title) { return NEVER.test(title || ""); }

  // ---------- the company's filing history, folded into the verdict ----------
  var LEVEL_ORDER = { skip: 0, ask: 1, good: 2, info: 3 };
  // The few numbers the verdict needs from a company's record, for one job title. The daily scan
  // stores these with each role, so the page can judge a role again with other limits without
  // downloading the company's filing data.
  function h1bFacts(rec, title) {
    if (!rec) return null;
    var ro = LCA.role(rec, title);
    return { n: rec.n, prev: rec.y[1], prev2: rec.y[0], fam: ro.fam === "other" ? "" : ro.label,
      role: ro.n, rolePrior: ro.prev + ro.prev2, roleNew: ro.fresh + ro.transfer };
  }
  function foldH1b(r, h, profile) {
    if (!h) return r;
    var lab = h.fam, named = !!h.fam, f, extra = [];
    var before = (h.prev || 0) + (h.prev2 || 0);
    if (h.n === 0 && !before) f = { code: "no_h1b", level: profile.requireH1b && profile.needsSponsorship ? "skip" : "ask", title: "No H-1B filings in the last three years", evidence: [] };
    else if (h.n === 0) f = { code: "h1b_stopped", level: profile.needsSponsorship ? "ask" : "info", title: "No H-1B filings in the last 12 months (" + num(h.prev) + " the year before)", evidence: [] };
    else if (named && h.role === 0) f = { code: "h1b_not_role", level: "info", title: "Files H-1Bs, but none for " + lab + " roles last year" + (h.rolePrior ? " (" + h.rolePrior + " in the two years before)" : ""), evidence: [] };
    else f = { code: "h1b_ok", level: "good", title: num(h.n) + " H-1B filings last year" + (named ? ", " + h.role + " for " + lab + " roles" : ""), evidence: [] };
    if (named && h.role > 0 && h.roleNew === 0) extra.push({ code: "h1b_renewals", level: "info", title: "All " + h.role + " " + lab + " filings last year were extensions, not new hires", evidence: [] });
    if (h.n > 0 && h.prev >= 10 && h.n <= h.prev / 2) extra.push({ code: "h1b_falling", level: "info", title: "H-1B filings fell from " + num(h.prev) + " to " + num(h.n) + " in a year", evidence: [] });
    var findings = r.findings.filter(function (x) { return !/^(no_h1b|h1b_)/.test(x.code); }).concat([f], extra);
    findings.sort(function (a, b) { return LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]; });
    var lv = findings.map(function (x) { return x.level; });
    var verdict = lv.indexOf("skip") >= 0 ? "skip" : lv.indexOf("ask") >= 0 ? "ask" : "apply";
    var headline = SS.headline(verdict, findings, r.sponsorship);
    if (verdict === "apply" && r.sponsorship === "silent" && h.n > 0) headline = "Nothing in this posting rules you out, and the company filed " + num(h.n) + " H-1Bs last year" + (named ? " (" + h.role + " for " + lab + " roles, " + h.roleNew + " of them new hires)" : "") + ".";
    return Object.assign({}, r, { findings: findings, verdict: verdict, headline: headline });
  }
  function withH1b(r, rec, title, profile) { return rec ? foldH1b(r, h1bFacts(rec, title), profile) : r; }
  // The codes behind a verdict: what ruled the role out, or what needs a check.
  function codes(r) {
    return r.findings.filter(function (f) { return f.level === "skip" || f.level === "ask"; }).map(function (f) { return f.code; });
  }
  // The one line a results row shows as its reason.
  function reason(r) {
    var why = r.findings.filter(function (f) { return f.level === r.verdict || (r.verdict === "apply" && f.level === "good" && /sponsor/.test(f.code)); })[0];
    return why ? why.title : (r.sponsorship === "silent" ? "Silent on sponsorship" : "");
  }

  // ---------- a short summary of what the posting asks for ----------
  // [label, pattern]. Tools and methods a posting names, in the order they are worth showing.
  var SKILLS = [
    ["SQL", /\bsql\b/i], ["Python", /\bpython\b/i], ["R", /\bR\b(?=\s*(,|\/|or\b|and\b|\)|programming|studio))|\bR\/|\/R\b/], ["Excel", /\bexcel\b|spreadsheet model/i],
    ["Tableau", /\btableau\b/i], ["Looker", /\blooker\b/i], ["Power BI", /power ?bi\b/i], ["dbt", /\bdbt\b/], ["Snowflake", /\bsnowflake\b/i],
    ["BigQuery", /\bbigquery\b/i], ["Databricks", /\bdatabricks\b/i], ["Salesforce", /\bsalesforce\b|\bsfdc\b/i], ["HubSpot", /\bhubspot\b/i],
    ["Clay", /\bClay\b(?!ton)/], ["Zapier / n8n", /\bzapier\b|\bn8n\b|\bmake\.com\b/i], ["Gong / Outreach", /\bgong\b|\boutreach\.io\b|\bsalesloft\b/i],
    ["Amplitude / Mixpanel", /\bamplitude\b|\bmixpanel\b/i], ["A/B testing", /a\/b test|experimentation|experiment design|causal inference/i],
    ["Forecasting", /\bforecast/i], ["Financial modeling", /financial model|three.statement|\bdcf\b/i], ["Pricing", /\bpricing\b|monetization/i],
    ["LLMs / AI tools", /\bllms?\b|generative ai|\bgenai\b|prompt engineering|\bai agents?\b|\bclaude\b|\bchatgpt\b|\bopenai\b/i],
    ["APIs", /\bapis?\b/], ["JavaScript", /\bjavascript\b|\btypescript\b/i], ["Machine learning", /machine learning|\bml models?\b/i],
    ["Statistics", /\bstatistic|regression\b/i], ["Dashboards", /dashboard/i], ["PowerPoint", /powerpoint|google slides|\bdecks?\b/i],
    ["Case interview", /case (study|interview)/i], ["Stakeholder management", /stakeholder/i], ["Project management", /project manage|program manage/i]
  ];
  function summarize(text) {
    text = String(text || "");
    var skills = [];
    SKILLS.forEach(function (s) { if (s[1].test(text)) skills.push(s[0]); });
    var mode = /\bhybrid\b|days? (a|per) week in (the |our )?office|in.office \d|\d days? in.office/i.test(text) ? "Hybrid"
      : /\b(fully|100%) remote\b|remote.first|\bremote\b[^.]{0,40}\b(united states|u\.s\.|us)\b|work from anywhere/i.test(text) ? "Remote"
      : /\bon.?site\b|in.person|in the office (five|5) days/i.test(text) ? "On-site" : "";
    var degree = /\b(ph\.?d|doctorate)\b[^.]{0,40}\b(required|must)/i.test(text) ? "PhD asked"
      : /\b(mba|master'?s|ms\b|m\.s\.|graduate degree|advanced degree)\b[^.]{0,60}\b(required|must have)\b/i.test(text) ? "Master’s asked"
      : /\b(mba|master'?s|graduate degree|advanced degree)\b[^.]{0,60}\b(preferred|a plus|plus|nice to have|or equivalent)/i.test(text) ? "Master’s a plus"
      : /\bbachelor|\bb\.?[as]\.?\b(?= (degree|in)\b)|undergraduate degree|\bba\/bs\b|\bbs\/ba\b/i.test(text) ? "Bachelor’s" : "";
    return { skills: skills.slice(0, 8), mode: mode, degree: degree };
  }

  return { DEFAULTS: DEFAULTS, normalize: normalize, isUS: isUS, excluded: excluded, withH1b: withH1b, h1bFacts: h1bFacts, foldH1b: foldH1b, codes: codes, reason: reason,
    summarize: summarize, num: num };
});
