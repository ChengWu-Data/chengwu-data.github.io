/*
 * H-1B filing lookup. Reads the per-employer summaries built by
 * data/build_lca.py from the Department of Labor's LCA disclosure data.
 * norm() and familyOf() must stay identical to the Python versions.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.LCA = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var SUFFIX = { INC: 1, INCORPORATED: 1, LLC: 1, LLP: 1, LP: 1, LTD: 1, LIMITED: 1, CORP: 1, CORPORATION: 1, CO: 1,
    COMPANY: 1, PLC: 1, NA: 1, PC: 1, PLLC: 1, USA: 1, US: 1, HOLDINGS: 1, HOLDING: 1, GROUP: 1, THE: 1 };

  function norm(name) {
    var s = String(name || "").toUpperCase().replace(/&/g, " AND ");
    s = s.replace(/\bL\s*L\s*C\b/g, "LLC").replace(/\bL\s*\.?\s*P\b\.?/g, "LP").replace(/\bN\s*\.?\s*A\b\.?/g, "NA");
    var t = s.replace(/[^A-Z0-9]+/g, " ").trim().split(" ").filter(Boolean);
    while (t.length && t[0] === "THE") t.shift();
    while (t.length > 1 && SUFFIX[t[t.length - 1]]) t.pop();
    if (t.length > 1 && t[t.length - 1] === "AND") t.pop();
    return t.join(" ");
  }

  var FAMILIES = [
    ["eng", /software|security analyst|systems analyst|it analyst|developer|programmer|architect|devops|engineer/i],
    ["gtm", /revenue operations|sales operations|go.to.market|\bgtm\b|revops|sales strategy|deal desk/i],
    ["risk", /risk|compliance|fraud|\baml\b|\bkyc\b|audit|regulatory/i],
    ["ds", /data scien|machine learning|statistician|quantitative|\bquant\b/i],
    ["strategy", /strateg|business operations|bizops|operations analyst|operations associate|operations manager|consultant|management analyst/i],
    ["analyst", /data analyst|business analyst|analytics|insight|business intelligence|\bbi\b|reporting analyst|research analyst|market research|product analyst|marketing analyst|pricing analyst|analyst/i],
    ["finance", /financ|fp&a|accountant|accounting|investment|treasury|valuation/i]
  ];
  var LABEL = { analyst: "data & business analyst", strategy: "strategy & operations", risk: "risk & compliance", gtm: "GTM & revenue ops",
    ds: "data science & quant", finance: "finance", eng: "engineering", other: "other" };

  function familyOf(title) {
    for (var i = 0; i < FAMILIES.length; i++) if (FAMILIES[i][1].test(title || "")) return FAMILIES[i][0];
    return "other";
  }

  var base = "data/lca/";
  var cache = {};
  function shard(key) {
    var id = key.slice(0, 2).replace(/ /g, "_").toLowerCase();
    if (!cache[id]) {
      cache[id] = fetch(base + id + ".json").then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; });
    }
    return cache[id];
  }

  // queries: brand name, or a list of legal-name queries. "=KEY" matches that normalized name only;
  // anything else also matches longer names that start with it ("Capital One" → "CAPITAL ONE SERVICES").
  function lookup(queries) {
    var qs = (Array.isArray(queries) ? queries : [queries]).filter(Boolean).map(function (q) {
      var exact = /^=/.test(q);
      return { exact: exact, key: exact ? q.slice(1).trim() : norm(q) };
    }).filter(function (q) { return q.key.length >= 2; });
    if (!qs.length) return Promise.resolve(null);
    return Promise.all(qs.map(function (q) { return shard(q.key); })).then(function (shards) {
      var agg = { n: 0, f: {}, lv: {}, t: {}, names: [], matched: [] }, seen = {};
      qs.forEach(function (q, i) {
        var d = shards[i];
        Object.keys(d).forEach(function (k) {
          if (seen[k]) return;
          if (!(k === q.key || (!q.exact && k.indexOf(q.key + " ") === 0))) return;
          seen[k] = 1;
          var e = d[k];
          agg.n += e.n;
          agg.matched.push({ key: k, n: e.n, names: e.names });
          Object.keys(e.f).forEach(function (f) { agg.f[f] = (agg.f[f] || 0) + e.f[f]; });
          Object.keys(e.lv || {}).forEach(function (f) { agg.lv[f] = (agg.lv[f] || 0) + e.lv[f]; });
          e.t.forEach(function (t) {
            var x = agg.t[t[0]] || (agg.t[t[0]] = { title: t[0], n: 0, wage: 0 });
            x.n += t[1]; if (t[2]) x.wage = Math.max(x.wage, t[2]);
          });
        });
      });
      agg.matched.sort(function (a, b) { return b.n - a.n; });
      agg.names = agg.matched.slice(0, 3).map(function (m) { return m.names[0]; });
      agg.titles = Object.keys(agg.t).map(function (k) { return agg.t[k]; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 5);
      delete agg.t;
      return agg;
    });
  }

  return { norm: norm, familyOf: familyOf, LABEL: LABEL, lookup: lookup, setBase: function (b) { base = b; } };
});
