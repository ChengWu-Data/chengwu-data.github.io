"""Builds the H-1B lookup files the tool reads.

Source: U.S. Department of Labor, OFLC LCA disclosure data
  - LCA_Disclosure_Data_FY2025_Q4.xlsx  (decisions Jul-Sep 2025)
  - LCA_Disclosure_Data_FY2026_Q3.xlsx  (decisions Oct 2025-Jun 2026)
Together: every LCA decided Jul 1 2025 - Jun 30 2026 (12 months).

Kept: H-1B filings whose status is Certified or Certified - Withdrawn.
Output: lca/<shard>.json, one shard per first character of the normalized
employer name, so the page only downloads the slice it needs.

Usage: python3 build_lca.py FY2025_Q4.xlsx FY2026_Q3.xlsx
"""
import json, os, re, sys, statistics
from collections import defaultdict, Counter
from python_calamine import CalamineWorkbook

SUFFIX = {"INC", "INCORPORATED", "LLC", "LLP", "LP", "LTD", "LIMITED", "CORP", "CORPORATION", "CO",
          "COMPANY", "PLC", "NA", "PC", "PLLC", "USA", "US", "HOLDINGS", "HOLDING", "GROUP", "THE"}

def norm(name):
    s = (name or "").upper().replace("&", " AND ")
    s = re.sub(r"\bL\s*L\s*C\b", "LLC", s)
    s = re.sub(r"\bL\s*\.?\s*P\b\.?", "LP", s)
    s = re.sub(r"\bN\s*\.?\s*A\b\.?", "NA", s)
    s = re.sub(r"[^A-Z0-9]+", " ", s).split()
    while s and s[0] == "THE": s = s[1:]
    while len(s) > 1 and s[-1] in SUFFIX: s = s[:-1]
    if len(s) > 1 and s[-1] == "AND": s = s[:-1]
    return " ".join(s)

# Role families, checked in order. Mirrors familyOf() in lca.js.
FAMILIES = [
    ("eng", r"software|security analyst|systems analyst|it analyst|developer|programmer|architect|devops|engineer"),
    ("gtm", r"revenue operations|sales operations|go.to.market|\bgtm\b|revops|sales strategy|deal desk"),
    ("risk", r"risk|compliance|fraud|\baml\b|\bkyc\b|audit|regulatory"),
    ("ds", r"data scien|machine learning|statistician|quantitative|\bquant\b"),
    ("strategy", r"strateg|business operations|bizops|operations analyst|operations associate|operations manager|consultant|management analyst"),
    ("analyst", r"data analyst|business analyst|analytics|insight|business intelligence|\bbi\b|reporting analyst|research analyst|market research|product analyst|marketing analyst|pricing analyst|analyst"),
    ("finance", r"financ|fp&a|accountant|accounting|investment|treasury|valuation"),
]
FRX = [(k, re.compile(p, re.I)) for k, p in FAMILIES]
def family(title):
    for k, rx in FRX:
        if rx.search(title or ""): return k
    return "other"

def shard_of(key):
    return key[:2].replace(" ", "_").lower()


UNIT = {"Year": 1, "Hour": 2080, "Week": 52, "Bi-Weekly": 26, "Month": 12}

def main(paths):
    emp = defaultdict(lambda: {"n": 0, "f": Counter(), "lv": Counter(), "names": Counter(), "titles": defaultdict(list)})
    for path in paths:
        it = CalamineWorkbook.from_path(path).get_sheet_by_index(0).iter_rows()
        h = next(it); ix = {c: i for i, c in enumerate(h)}
        for r in it:
            if r[ix["VISA_CLASS"]] != "H-1B" or not str(r[ix["CASE_STATUS"]]).startswith("Certified"): continue
            name = r[ix["EMPLOYER_NAME"]]; key = norm(name)
            if not key: continue
            title = str(r[ix["JOB_TITLE"]]).strip()
            fam = family(title)
            e = emp[key]; e["n"] += 1; e["f"][fam] += 1; e["names"][name.strip()] += 1
            lvl = str(r[ix["PW_WAGE_LEVEL"]]).strip()
            if lvl in ("I", "II"): e["lv"][fam] += 1
            try:
                w = float(r[ix["WAGE_RATE_OF_PAY_FROM"]]) * UNIT.get(r[ix["WAGE_UNIT_OF_PAY"]], 0)
            except (TypeError, ValueError):
                w = 0
            e["titles"][(fam, title.title() if title.isupper() else title)].append(w if 15000 < w < 2_000_000 else None)

    TARGET = {"analyst", "strategy", "risk", "gtm", "ds", "finance"}
    shards = defaultdict(dict)
    for key, e in emp.items():
        tops = sorted(e["titles"].items(), key=lambda kv: -len(kv[1]))
        pick = [kv for kv in tops if kv[0][0] in TARGET][:6] or tops[:3]
        titles = []
        for (fam, t), ws in pick:
            ws = [w for w in ws if w]
            titles.append([t, len(e["titles"][(fam, t)]), int(statistics.median(ws)) if ws else 0])
        rec = {"n": e["n"], "f": dict(e["f"]), "t": titles,
               "names": [nm for nm, _ in e["names"].most_common(3)]}
        if e["lv"]: rec["lv"] = dict(e["lv"])
        shards[shard_of(key)][key] = rec

    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "lca")
    os.makedirs(out, exist_ok=True)
    total = 0
    for s, d in shards.items():
        with open(os.path.join(out, s + ".json"), "w") as fh:
            json.dump(d, fh, separators=(",", ":"))
        total += len(d)
    with open(os.path.join(out, "meta.json"), "w") as fh:
        json.dump({"period": "Jul 1, 2025 – Jun 30, 2026", "source": "U.S. Department of Labor, OFLC LCA disclosure data (FY2025 Q4, FY2026 Q3)",
                   "employers": total, "filings": sum(e["n"] for e in emp.values())}, fh)
    print("employers", total, "filings", sum(e["n"] for e in emp.values()))


if __name__ == "__main__":
    main(sys.argv[1:])
