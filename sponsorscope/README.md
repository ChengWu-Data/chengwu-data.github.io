# SponsorScope

Checks a job posting for anything that rules out candidates who need visa
sponsorship, then compares experience and pay against your own limits.
Every verdict highlights the sentence it came from.

- Live: https://chengwu-data.github.io/sponsorscope/
- Case study: https://chengwu-data.github.io/projects/sponsorscope/

## Files

| File | What it does |
| --- | --- |
| `engine.js` | The rules. Works in the browser and in Node (`require("./engine.js")`). |
| `app.js`, `app.css`, `index.html` | The page: check one posting, or scan company job boards. |
| `boards.js` | Preset company job boards (Greenhouse, Lever, Ashby public feeds). |
| `eval/` | Hand-labeled sentences, blind test sets and the scoring script. |

No server, no API key, no build step. Job-board feeds are read directly
from the browser; your limits and the list of roles you have already seen
stay in your own browser storage.

## Test

```bash
node eval/unit_tests.js
node eval/run_eval.js test_round2.json --misses
```

Not legal or immigration advice.
