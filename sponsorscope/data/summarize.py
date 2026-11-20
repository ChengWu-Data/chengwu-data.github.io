"""Builds lca/summary.json, the market-wide view on the Sponsor data page, from
the per-employer shards that build_lca.py writes.

It reads every shard once and keeps only totals and short leaderboards, so the
page can show the whole picture with one small download. build_lca.py runs it at
the end of every rebuild; it can also be run on its own:

Usage: python3 summarize.py [path to the lca folder]
"""
import json, os, re, sys

# Role families shown on the page (the business ones), in display order. Engineering and
# "other" still count in the totals.
BUSINESS = ["analyst", "strategy", "product", "gtm", "solutions", "risk", "marketing", "finance", "ds"]
ALL = BUSINESS + ["eng", "other"]
F_N, F_NEW, F_XFER, F_ENTRY, F_METRO, F_WAGE, F_PREV, F_PREV2 = range(8)


FIX = [(r"\bLlc\b", "LLC"), (r"\bLlp\b", "LLP"), (r"\bLp\b", "LP"), (r"\bN\.A\.?", "N.A."), (r"\bUsa\b", "USA"),
       (r"\bUs\b", "US"), (r"\bIi\b", "II"), (r"'S\b", "'s"), (r"\bAnd\b", "and"), (r"\bOf\b", "of")]


def pretty(name):
    """Company names in the filings are often all capitals; show them in title case."""
    if not name.isupper():
        return name
    s = name.title()
    for pat, rep in FIX:
        s = re.sub(pat, rep, s)
    return s


def main(folder):
    with open(os.path.join(folder, "meta.json")) as fh:
        meta = json.load(fh)
    emp = {}
    for f in sorted(os.listdir(folder)):
        if not f.endswith(".json") or f in ("meta.json", "summary.json"):
            continue
        with open(os.path.join(folder, f)) as fh:
            emp.update(json.load(fh))

    fam = {k: [0] * 8 for k in ALL}
    wage_sum = {k: 0 for k in ALL}
    wage_n = {k: 0 for k in ALL}
    rows = []
    for key, e in emp.items():
        y = e["y"]
        biz = [0, 0, 0, 0, 0, 0]            # last 12 mo, prior, before, new hires + transfers, entry, NYC metro
        for k, v in e["f"].items():
            k = k if k in fam else "other"
            for i in range(8):
                if i != F_WAGE:
                    fam[k][i] += v[i]
            if v[F_WAGE] and v[F_N]:
                wage_sum[k] += v[F_WAGE] * v[F_N]; wage_n[k] += v[F_N]
            if k in BUSINESS:
                biz[0] += v[F_N]; biz[1] += v[F_PREV]; biz[2] += v[F_PREV2]
                biz[3] += v[F_NEW] + v[F_XFER]; biz[4] += v[F_ENTRY]; biz[5] += v[F_METRO]
        rows.append((key, e, biz))
    for k in ALL:
        fam[k][F_WAGE] = round(wage_sum[k] / wage_n[k]) if wage_n[k] else 0

    def emp_row(key, e, n, prev, prev2, fresh, entry, metro, wage=0):
        return {"key": key, "name": pretty(e["names"][0]) if e["names"] else key,
                "n": n, "prev": prev, "prev2": prev2, "new": fresh, "entry": entry, "metro": metro, "wage": wage}

    latest = sorted(rows, key=lambda r: -r[1]["y"][2])
    total_latest = sum(r[1]["y"][2] for r in rows)
    filers = [r for r in latest if r[1]["y"][2] > 0]
    top1 = filers[: max(1, len(filers) // 100)]

    by_fam = {}
    for k in BUSINESS:
        best = sorted((r for r in rows if r[1]["f"].get(k, [0])[F_N] > 0), key=lambda r: -r[1]["f"][k][F_N])[:20]
        by_fam[k] = [emp_row(key, e, v[F_N], v[F_PREV], v[F_PREV2], v[F_NEW] + v[F_XFER], v[F_ENTRY], v[F_METRO], v[F_WAGE])
                     for key, e, _ in best for v in [e["f"][k]]]
    biz_top = sorted((r for r in rows if r[2][0] > 0), key=lambda r: -r[2][0])
    nyc_top = sorted((r for r in rows if r[2][5] > 0), key=lambda r: -r[2][5])
    rising = sorted((r for r in rows if r[2][0] >= 20 and r[2][1] >= 5), key=lambda r: -(r[2][0] - r[2][1]))

    summary = {
        "built": meta.get("built"), "periods": meta["periods"], "period": meta["period"],
        "filings": meta["filings"], "perm": meta.get("perm"),
        "employers": sum(1 for r in rows if sum(r[1]["y"])),
        "employersLatest": len(filers),
        "metro": sum(r[1]["m"] for r in rows),
        "kinds": [sum(r[1]["k"][i] for r in rows) for i in range(3)],      # new hires, moved in, extensions
        "single": sum(1 for r in filers if r[1]["y"][2] == 1),
        "top1pct": {"employers": len(top1), "share": round(sum(r[1]["y"][2] for r in top1) / total_latest, 4) if total_latest else 0},
        "families": {k: dict(zip(["n", "new", "xfer", "entry", "metro", "wage", "prev", "prev2"], fam[k])) for k in ALL},
        "top": [emp_row(key, e, e["y"][2], e["y"][1], e["y"][0], e["k"][0] + e["k"][1], 0, e["m"]) for key, e, _ in latest[:25]],
        "business": {
            "top": [emp_row(key, e, b[0], b[1], b[2], b[3], b[4], b[5]) for key, e, b in biz_top[:25]],
            "nyc": [emp_row(key, e, b[0], b[1], b[2], b[3], b[4], b[5]) for key, e, b in nyc_top[:25]],
            "rising": [emp_row(key, e, b[0], b[1], b[2], b[3], b[4], b[5]) for key, e, b in rising[:15]],
            "employers": len(biz_top),
        },
        "byFamily": by_fam,
    }
    out = os.path.join(folder, "summary.json")
    with open(out, "w") as fh:
        json.dump(summary, fh, separators=(",", ":"))
    print("summary.json: %d employers, %d KB" % (summary["employers"], os.path.getsize(out) // 1024))


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), "lca"))
