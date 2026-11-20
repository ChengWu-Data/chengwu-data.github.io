---
layout: default
permalink: /projects/sponsorscope/
title: "SponsorScope case study"
excerpt: "A product case study: how I found, framed, prioritized and shipped a free daily job feed that rules out the roles that can't hire international students, with the evidence behind every call."
author_profile: true
---

<style>
.ssc { --ink: #2b2233; --body: #4a4553; --muted: #6e6779; --rule: rgba(109,65,149,.14); --purple: #6d4195; --soft: #f7f2fc;
  --skip: #b42318; --skip-bg: #fde3e1; --ask: #9a5506; --ask-bg: #fdefc8; --good: #0f7b4f; --good-bg: #d9f5e6; color: var(--body); }
  .ssc h1, .ssc h2 { border: 0; }
.ssc h1 { font-size: clamp(2rem, 4.4vw, 2.8rem); font-weight: 800; letter-spacing: -.02em; line-height: 1.08; color: var(--ink); margin: 0 0 1rem; max-width: 18ch; }
.ssc h2 { font-size: 1.55rem; font-weight: 800; letter-spacing: -.01em; color: var(--ink); margin: 3rem 0 .9rem; padding: 0; border: 0; }
.ssc h3 { font-size: 1.08rem; font-weight: 700; color: var(--ink); margin: 0 0 .35rem; }
.ssc p, .ssc li { max-width: 68ch; line-height: 1.7; }
.ssc .lede { font-size: 1.12rem; }
.ssc-actions { display: flex; flex-wrap: wrap; gap: .75rem; margin: 1.5rem 0 2rem; }
.ssc-btn { display: inline-block; padding: .7rem 1.1rem; border-radius: 8px; font-weight: 600; text-decoration: none !important; border: 1px solid var(--purple); color: var(--purple) !important; }
.ssc-btn.is-primary { background: var(--purple); color: #fff !important; }
.ssc-facts { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem 2rem; margin: 0 0 1rem; padding: 1.25rem 0; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
.ssc-facts div { min-width: 0; }
.ssc-facts b { display: block; font-size: 1.9rem; font-weight: 800; color: var(--ink); letter-spacing: -.02em; line-height: 1.1; font-variant-numeric: tabular-nums; }
.ssc-facts span { font-size: .92rem; color: var(--muted); line-height: 1.45; display: block; margin-top: .3rem; }
.ssc figure { margin: 1.5rem 0; }
.ssc figure img { width: 100%; height: auto; border: 1px solid var(--rule); border-radius: 10px; display: block; }
.ssc figcaption { font-family: inherit; font-size: .9rem; color: var(--muted); margin-top: .5rem; max-width: 68ch; }
.ssc-journey { list-style: none; counter-reset: step; padding: 0; margin: 1.25rem 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: .6rem; }
.ssc-journey li { counter-increment: step; padding: .8rem .9rem; border-radius: 8px; background: #fff; border: 1px solid var(--rule); font-size: .95rem; line-height: 1.45; max-width: none; }
.ssc-journey li::before { content: counter(step); display: block; font-weight: 800; color: var(--muted); font-size: .85rem; margin-bottom: .2rem; }
.ssc-journey .pain { background: var(--skip-bg); border-color: transparent; color: var(--ink); }
.ssc-journey .pain::before { color: var(--skip); }
.ssc-journey small { display: block; color: var(--skip); font-weight: 600; margin-top: .3rem; }
.ssc-insights { display: grid; gap: 1.25rem; margin: 1rem 0; }
.ssc-insights > div { padding-left: 1rem; border-left: 3px solid var(--purple); }
.ssc-insights p { margin: .2rem 0; }
.ssc-insights .changed { font-size: .95rem; color: var(--purple); font-weight: 600; }
.ssc-decision { margin: 1.25rem 0; }
.ssc-decision p { margin: .25rem 0; }
.ssc table { border-collapse: collapse; width: 100%; font-size: .95rem; margin: 1rem 0; font-variant-numeric: tabular-nums; }
.ssc th, .ssc td { text-align: left; padding: .55rem .7rem; border-bottom: 1px solid var(--rule); vertical-align: top; }
.ssc th { color: var(--muted); font-weight: 600; }
.ssc .table-scroll { overflow-x: auto; }
.ssc mark { padding: 0 .2em; border-radius: 3px; color: var(--ink); }
.ssc .m-skip { background: var(--skip-bg); } .ssc .m-ask { background: var(--ask-bg); } .ssc .m-good { background: var(--good-bg); }
.ssc .note { font-size: .95rem; color: var(--muted); }

.ssc .kicker { font-size: .85rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--purple); margin: 0 0 .6rem; }
.ssc-glance { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: .9rem 1.6rem; margin: 0 0 1.25rem; padding: 1.1rem 1.25rem; background: var(--soft); border-radius: 12px; }
.ssc-glance dt { font-size: .78rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--purple); margin: 0 0 .2rem; }
.ssc-glance dd { margin: 0; font-size: .95rem; line-height: 1.5; color: var(--ink); }
.ssc-tldr { margin: 0 0 1.5rem; padding: 0; list-style: none; display: grid; gap: .6rem; }
.ssc-tldr li { max-width: none; padding-left: 1rem; border-left: 3px solid var(--purple); line-height: 1.55; }
.ssc-tldr b { color: var(--ink); }
.ssc-flow { list-style: none; counter-reset: flow; display: grid; grid-template-columns: repeat(5, 1fr); gap: .5rem; padding: 0; margin: 1.25rem 0; }
.ssc-flow li { counter-increment: flow; padding: .8rem .9rem; border-radius: 8px; background: #fff; border: 1px solid var(--rule); font-size: .92rem; line-height: 1.45; max-width: none; }
.ssc-flow li::before { content: counter(flow); display: block; font-weight: 800; color: var(--purple); font-size: .85rem; margin-bottom: .15rem; }
.ssc-flow b { color: var(--ink); display: block; }
.ssc-decision { padding: 1rem 0 1.1rem; border-bottom: 1px solid var(--rule); margin: 0; }
.ssc-decision:last-of-type { border-bottom: 0; }
.ssc-decision dl { margin: .5rem 0 0; display: grid; grid-template-columns: 6.2rem minmax(0, 1fr); gap: .3rem .8rem; font-size: .95rem; line-height: 1.55; }
.ssc-decision dt { font-weight: 700; color: var(--muted); }
.ssc-decision dd { margin: 0; max-width: 62ch; }
@media (max-width: 760px) { .ssc-flow { grid-template-columns: repeat(2, 1fr); } .ssc-journey { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 420px) { .ssc-flow, .ssc-journey { grid-template-columns: 1fr; } }
@media (max-width: 560px) { .ssc-decision dl { grid-template-columns: 1fr; gap: 0; } .ssc-decision dt { margin-top: .5rem; } }
.ssc-pair { margin: 1.25rem 0; display: grid; grid-template-columns: 1.2fr 1fr; gap: 1rem; align-items: start; }
.ssc-pair img { width: 100%; height: auto; }
@media (max-width: 640px) { .ssc-pair { grid-template-columns: 1fr; } }
.ssc-jtbd { margin: 1rem 0 1.5rem; padding: 1.25rem 1.4rem; background: var(--soft); border-radius: 12px; border-left: 4px solid var(--purple); }
.ssc-jtbd p { margin: 0; font-size: 1.15rem; line-height: 1.55; color: var(--ink); max-width: none; }
.ssc-jtbd .ssc-jtbd-k { font-size: .78rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--purple); margin-bottom: .4rem; }
.ssc-two { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.ssc-two ul { padding-left: 1.1rem; margin: .4rem 0 0; }
@media (max-width: 640px) { .ssc-two { grid-template-columns: 1fr; } }
</style>

<div class="ssc" markdown="0">

<p class="kicker">Product case study · 0 to 1 · November 2026</p>
<h1>SponsorScope: a daily job feed that rules out the roles that can't hire international students</h1>
<p class="lede">International students lose weeks to interviews for jobs they could never be offered. The deciding fact is usually one sentence near the bottom of a posting, and no job board lets you filter on it. I found the problem in my own search, validated it with research, and shipped a free product that reads about 40,000 open roles three times a day, rules out the ones that can't hire you, and shows the evidence behind every call.</p>

<div class="ssc-actions">
  <a class="ssc-btn is-primary" href="{{ site.baseurl }}/sponsorscope/">Try it live</a>
  <a class="ssc-btn" href="https://github.com/ChengWu-Data/chengwu-data.github.io/tree/main/sponsorscope">Code, rules and test sets</a>
</div>

<dl class="ssc-glance">
  <div><dt>My role</dt><dd>Sole product owner: discovery, problem framing, spec, prioritization, evaluation design, launch. I built it with Claude Code as my engineering partner.</dd></div>
  <div><dt>Users</dt><dd>International students on F-1 OPT who will need H-1B sponsorship. I am user zero and use it every day.</dd></div>
  <div><dt>Timeline</dt><dd>November 2026, six releases in under two weeks</dd></div>
  <div><dt>Cost to run</dt><dd>$0. A static site plus scheduled GitHub Actions; no server, no accounts.</dd></div>
</dl>

<ul class="ssc-tldr">
  <li><b>Problem.</b> Most postings never say whether they sponsor visas, so students find out in the final round or after an offer.</li>
  <li><b>Insight.</b> The people who got offers applied to 400 to 965 roles. The job isn't to apply less; it's to make ruling roles out cheap, early and trustworthy.</li>
  <li><b>Bet.</b> Read every posting for the sentence that rules you out, and when the posting is silent, answer with the company's own filing record for that kind of role.</li>
  <li><b>Shipped.</b> A daily feed from 228 company job boards, a one-click check for any posting (including on LinkedIn), a market view of 1.6 million H-1B filings, and repost detection.</li>
  <li><b>Evidence.</b> Two blind tests on companies the rules had never seen (84% and 89% accuracy), each turned into a fix; an independent re-count of the filing data; every verdict cites its source sentence.</li>
</ul>

<div class="ssc-facts">
  <div><b>228</b><span>company job boards read three times a day, 74 of them Workday sites</span></div>
  <div><b>~40,000</b><span>open roles read per scan, narrowed to about 4,300 in 19 business directions</span></div>
  <div><b>1.6M</b><span>certified H-1B filings from 110,060 employers behind the sponsorship history</span></div>
  <div><b>68%</b><span>of a week's new roles said nothing about sponsorship, which is why the posting alone is never enough</span></div>
</div>

<figure>
  <img src="{{ site.baseurl }}/images/sponsorscope/today.jpg" alt="SponsorScope Today page: a headline reading 42,850 open roles, 73 worth applying to today, and a funnel from open roles read, to roles in the business directions, to roles first seen this week, to roles that clear your limits, to new roles in the last 24 hours." loading="lazy">
  <figcaption>The first screen. Every number is computed from that day's scan; this one is from November 19, 2026.</figcaption>
</figure>

<h2>1. The problem</h2>
<p>I am an international student on the path from OPT to H-1B, and so is a large share of my class. For every role, the routine is the same: read the whole posting for visa language, then look up the company's filings by hand. The sentence that matters is often one line of legal text at the bottom, or it isn't there at all.</p>
<ol class="ssc-journey">
  <li>Find a role on a job board</li>
  <li>Read the full posting for visa language</li>
  <li class="pain">Look up the company's H-1B history by hand<small>Repeated for every posting</small></li>
  <li>Apply and fill in the form</li>
  <li class="pain">Interview for weeks<small>Sponsorship often comes up only here</small></li>
  <li class="pain">Offer, or an offer withdrawn over sponsorship</li>
</ol>
<p>The two possible mistakes have very different costs. Applying to a role that turns out to be closed to you costs a week of interviews and a lot of hope. Skipping a role that was open to you costs a real offer. A good product has to treat those errors differently, and has to say when it doesn't know.</p>

<h2>2. Discovery</h2>
<h3>Round one: what job seekers say</h3>
<p>I had no time for interviews in the middle of my own search, so I read 36 public posts by international job seekers on Xiaohongshu (RedNote), including comment threads, tagged each by pain point, and counted. Twelve came from people still searching, nine from people who had landed offers, and eight were lead-generation posts trading "sponsor lists" for followers.</p>
<div class="ssc-insights">
  <div><h3>The worst cost comes late</h3><p>10 of 36 posts described reaching the final round, or signing an offer, before sponsorship ended it.</p><p class="changed">Decision: the verdict answers "is this worth a week of interviews?", and an unclear posting gets "Ask first" with a question ready to send to the recruiter.</p></div>
  <div><h3>Company-level data isn't enough</h3><p>Every how-to post taught the same manual routine and warned that one company can sponsor one team and refuse another.</p><p class="changed">Decision: show filings for the posting's own kind of role, not just the company total.</p></div>
  <div><h3>People who landed offers applied more, not less</h3><p>They reported 400 to 965 applications; one got a single interview from about 800. My first idea, a tool that helps people apply to fewer roles, was wrong.</p><p class="changed">Decision: make high volume cheap. A daily feed across many boards replaced "apply less".</p></div>
  <div><h3>The information is being sold</h3><p>8 of 36 posts offered a sponsor list in exchange for a comment or a follow, each with dozens of replies asking for it.</p><p class="changed">Decision: free, no sign-up, and every verdict shows its source.</p></div>
</div>
<h3>Round two: what's broken in the tools people already use</h3>
<p>After launch I read forum threads on Reddit, Blind and Hacker News, and app reviews, about LinkedIn and Indeed job search. Three complaints came up again and again, and each one became work:</p>
<table>
  <thead><tr><th>What people complained about</th><th>What I did</th></tr></thead>
  <tbody>
    <tr><td>"Last 24 hours" is mostly old roles posted again, and there is no way to hide them</td><td>Repost detection: a new posting whose title the same board listed in the last 60 days is labeled, and can be hidden</td></tr>
    <tr><td>No way to filter by visa sponsorship, even with a paid plan</td><td>The core verdict, plus the company's filing record for that kind of role</td></tr>
    <tr><td>Results that ignore the person's situation, including roles their visa status rules out</td><td>Every role judged against the viewer's own limits: sponsorship, years asked, pay floor</td></tr>
  </tbody>
</table>
<p>The research also told me what not to build. The most-requested LinkedIn fix, a reliable applicant count, needs data that company job boards don't publish, so it stayed off the list.</p>

<h2>3. Framing</h2>
<div class="ssc-jtbd">
  <p class="ssc-jtbd-k">Job to be done</p>
  <p>When a new role appears, help me decide in seconds whether it is worth applying to, so I never lose a final round to a sentence I could have read on day one.</p>
</div>
<div class="ssc-two">
  <div>
    <h3>Goals</h3>
    <ul>
      <li>Rule roles out early, with the evidence on screen.</li>
      <li>Make high volume cheap: every day's new roles, already judged.</li>
      <li>Never wrongly tell someone to skip a role that was open to them.</li>
      <li>Fill the gap when a posting is silent, with real filing data.</li>
    </ul>
  </div>
  <div>
    <h3>Non-goals</h3>
    <ul>
      <li>Auto-applying. The tool supports judgment; it doesn't replace it.</li>
      <li>Scraping LinkedIn or any site's terms-protected pages.</li>
      <li>Legal or immigration advice.</li>
      <li>Accounts, or collecting anything about the people who use it.</li>
    </ul>
  </div>
</div>

<h2>4. How I defined success</h2>
<p>The product has no accounts and no analytics, by design, so I chose metrics I could measure honestly from the system itself, and I say plainly which one I can't measure yet.</p>
<div class="table-scroll">
<table>
  <thead><tr><th>Type</th><th>Metric</th><th>Target</th><th>Where it stands</th></tr></thead>
  <tbody>
    <tr><td>North star</td><td>Roles worth applying to, surfaced within 24 hours of first appearing</td><td>Every scan</td><td>73 on November 19; 283 in that week</td></tr>
    <tr><td>Guardrail</td><td>Precision of "Skip" on blind test sets (a wrong Skip costs a real opportunity)</td><td>95% or more</td><td>83.1% and 100% on first blind scores; 99% and 100% after the fixes each test exposed</td></tr>
    <tr><td>Quality</td><td>Sentence-level accuracy on companies the rules had never seen</td><td>Rises with each test</td><td>84.3%, then 89.1%</td></tr>
    <tr><td>Coverage</td><td>Job boards read successfully per scan</td><td>All of them</td><td>228 of 228</td></tr>
    <tr><td>Trust</td><td>Verdicts that cite the sentence or filing record behind them</td><td>100%</td><td>100%, by construction</td></tr>
    <tr><td>Adoption</td><td>Weekly users, and roles marked Applied</td><td>To set after launch</td><td>Not measured yet. Next step: an opt-in way to share outcomes</td></tr>
  </tbody>
</table>
</div>

<h2>5. What I built, in what order, and why</h2>
<p>Each release answered the biggest remaining pain with the least new machinery. I wrote down what I deferred and why, so "no" was a decision rather than a gap.</p>
<div class="table-scroll">
<table>
  <thead><tr><th>Release</th><th>What shipped</th><th>Why then</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>Check one posting: verdict, highlighted evidence, pay and years against your limits</td><td>Proves the core judgment works before scaling it</td></tr>
    <tr><td>2</td><td>Sponsorship history from Department of Labor filings, by role type</td><td>Most postings are silent, so the posting alone can't answer the question</td></tr>
    <tr><td>3</td><td>Daily scan of 228 boards, including Workday, published three times a day</td><td>Research said volume wins; checking one posting at a time doesn't scale</td></tr>
    <tr><td>4</td><td>An inbox: filters, Applied and Not interested marks, interview prep links, read any link</td><td>Daily use showed the bottleneck had moved from judging roles to working through them</td></tr>
    <tr><td>5</td><td>Today overview, market data on all filings, judging with the viewer's own limits, a bookmarklet for any job page</td><td>Make it useful to people who aren't me, and make the value obvious in five seconds</td></tr>
    <tr><td>6</td><td>Repost detection</td><td>The most common complaint about LinkedIn and Indeed in round-two research</td></tr>
  </tbody>
</table>
</div>
<p><b>Deliberately not built:</b> an LLM verdict for every posting (cost, a server, and answers without evidence), auto-apply (removes the judgment the tool exists to support), LinkedIn scraping (against its terms; the bookmarklet reads only the page a person already has open), applicant counts (no source data), and resume matching (valuable, but after the core verdict was proven).</p>

<h2>6. The product</h2>
<figure>
  <img src="{{ site.baseurl }}/images/sponsorscope/workspace.jpg" alt="New roles page: filters on the left, a list of roles with Apply, Ask first and Skip verdicts in the middle, and the selected role on the right with its verdict, pay, years asked, role direction and the company's H-1B record." loading="lazy">
  <figcaption>The daily inbox. Each role carries its verdict, pay, years asked and the company's filings for that kind of role. Keyboard shortcuts, marks and a copy-to-spreadsheet button support working through dozens of roles a day.</figcaption>
</figure>
<figure style="max-width:560px">
  <img src="{{ site.baseurl }}/images/sponsorscope/verdict-skip.png" alt="A Skip verdict for an example posting, with the sentence that says the company will not sponsor visas highlighted in red." loading="lazy">
  <figcaption>Check any posting: paste a link or the text, or send it from LinkedIn with the bookmarklet. Red marks the sentence that rules you out.</figcaption>
</figure>
<figure>
  <img src="{{ site.baseurl }}/images/sponsorscope/data-lookup.jpg" alt="Company lookup for Capital One Services: 1,124 H-1B filings in the last 12 months, the share that brought in new hires, New York area worksites, green-card cases, and a table of filings by kind of role." loading="lazy">
  <figcaption>Any employer's record, by kind of role, matched to its legal name: Instacart files as Maplebear, Carta as eShares.</figcaption>
</figure>
<figure>
  <img src="{{ site.baseurl }}/images/sponsorscope/today-charts.jpg" alt="Charts: new roles per day by verdict, the reasons roles were ruled out, the companies with the most roles worth applying to this week, and three summary numbers." loading="lazy">
  <figcaption>What the week looked like: new roles per day, why roles were ruled out, and where the roles worth applying to were.</figcaption>
</figure>

<h2>7. Key product decisions</h2>
<div class="ssc-decision">
  <h3>Rules I can explain, not a model call per posting</h3>
  <dl><dt>Chose</dt><dd>Readable rules that point to the exact sentence, running free in the browser.</dd>
  <dt>Rejected</dt><dd>An LLM verdict per posting: more phrasings covered, but it needs a server and an API key, costs money per check, and can state a verdict without a reason.</dd>
  <dt>Cost</dt><dd>Coverage. I measured it with blind tests instead of assuming it.</dd></dl>
</div>
<div class="ssc-decision">
  <h3>A wrong Skip costs more than a wrong Apply</h3>
  <dl><dt>Chose</dt><dd>Three verdicts, Apply, Ask first and Skip, with Skip's precision tracked as its own guardrail.</dd>
  <dt>Why</dt><dd>Forcing yes or no on unclear text would hide uncertainty. It's the same trade-off I worked on at Tarte, where I tuned a compliance alert threshold to cut alert volume by about 25% while keeping every material exception in the top-priority tier.</dd></dl>
</div>
<div class="ssc-decision">
  <h3>Sponsorship history at the level of the role</h3>
  <dl><dt>Chose</dt><dd>Three years of filings per employer, split by kind of role: how many, how many were new hires rather than extensions, how many at entry wage levels, how many in the New York area.</dd>
  <dt>Problem</dt><dd>Companies file under legal names. I normalize names, keep a short alias list, and always show "Filed as" so the match can be checked.</dd></dl>
</div>
<div class="ssc-decision">
  <h3>"New" means new to the board, and reposts are named</h3>
  <dl><dt>Chose</dt><dd>Record when the scan first sees each posting, and remember each board's titles for 60 days so a role posted again under a new ID is labeled as a repost.</dd>
  <dt>Why</dt><dd>Workday dates are day-precision and boards repost constantly; a "last 24 hours" list full of old roles defeats the point.</dd></dl>
</div>
<div class="ssc-decision">
  <h3>Your limits, judged in your browser</h3>
  <dl><dt>Chose</dt><dd>The scan judges with default limits; when a visitor's limits differ, every role is judged again in their browser from the posting text.</dd>
  <dt>Trade-off</dt><dd>Privacy and zero cost over analytics: nothing about a visitor leaves the page, so I can't see how people use it. I checked the re-judging against the scan: with the default limits it reproduces all 796 verdicts of a week exactly.</dd></dl>
</div>
<div class="ssc-decision">
  <h3>Meet people where they already search</h3>
  <dl><dt>Chose</dt><dd>A bookmarklet: on a LinkedIn or company job page, one click sends that posting to SponsorScope.</dd>
  <dt>Rejected</dt><dd>Scraping LinkedIn. The bookmarklet reads only the page the person already has open, in their own browser.</dd></dl>
</div>

<h2>8. Where it fits</h2>
<p>Based on public product pages and forum reports, as of November 2026.</p>
<div class="table-scroll">
<table>
  <thead><tr><th>The job seeker needs</th><th>LinkedIn, Indeed</th><th>H-1B lookup sites</th><th>Paid sponsor lists</th><th>SponsorScope</th></tr></thead>
  <tbody>
    <tr><td>The posting's own sponsorship sentence, found for you</td><td>No sponsorship filter</td><td>Not read from the posting</td><td>No</td><td>Yes, highlighted</td></tr>
    <tr><td>The company's filings for this kind of role, next to the posting</td><td>No</td><td>By employer and title, on a separate site</td><td>Company names only</td><td>Yes, on the posting</td></tr>
    <tr><td>Reposts told apart from new roles</td><td>Users report reposts shown as new</td><td>Not applicable</td><td>Not applicable</td><td>Yes</td></tr>
    <tr><td>Judged against your own limits</td><td>Partly (pay, location)</td><td>No</td><td>No</td><td>Sponsorship, years, pay floor</td></tr>
    <tr><td>Price</td><td>Free, or a paid plan</td><td>Free</td><td>Paid, or a follow</td><td>Free, no sign-up</td></tr>
  </tbody>
</table>
</div>

<h2>9. How it works</h2>
<ol class="ssc-flow">
  <li><b>Job boards</b>Scheduled GitHub Actions read 228 boards three times a day</li>
  <li><b>Rule engine</b>The same code as the page: verdict, pay, years, skills, evidence</li>
  <li><b>Feed</b>Static files on a branch; reposts and history kept for 60 to 120 days</li>
  <li><b>Filing data</b>1.6M filings in 1,066 small files; one lookup is usually under 100 KB</li>
  <li><b>Refresh</b>A quarterly rebuild that refuses to publish data that shrank or broke</li>
</ol>
<p><b>How I worked.</b> I owned the spec, the rules, the test sets and the decision to ship; Claude Code wrote much of the code at my direction. I treated its output the way I would treat a new analyst's: nothing counted until it passed a blind test, matched an independent re-count, or held up on a real posting I read myself.</p>

<h2>10. Quality</h2>
<p>I labeled real posting sentences by hand (566 in all, from 140 job boards) as blocking, needing a check, or irrelevant, wrote the rules against one set, and tested twice on companies the rules had never seen, labeling each set before running the tool on it.</p>
<div class="table-scroll">
<table>
  <thead><tr><th>Run</th><th>Sentences</th><th>Accuracy</th><th>Skip precision</th><th>Skip recall</th></tr></thead>
  <tbody>
    <tr><td>Development set, 63 boards</td><td>242</td><td>99.6%</td><td>100%</td><td>99.1%</td></tr>
    <tr><td>Blind test 1, 42 new boards</td><td>223</td><td>84.3%</td><td>83.1%</td><td>94.2%</td></tr>
    <tr><td>Blind test 2, 35 new boards</td><td>101</td><td>89.1%</td><td>100%</td><td>79.6%</td></tr>
  </tbody>
</table>
</div>
<ul>
  <li><b>Each blind test changed the product.</b> Test 1 showed any mention of ITAR being read as a citizenship rule, so compliance roles that only work with export controls were wrongly skipped. Test 2 showed short lines such as "US Citizen or Green Card Holder" being missed. Both fixes are locked in with regression tests; I report the first blind scores because they are the honest ones.</li>
  <li><b>Reading real output.</b> Reading Skip evidence on live Workday postings found five more misreads, such as "executive sponsor" read as a visa rule. Each fix has a regression test.</li>
  <li><b>Checking the data.</b> I re-counted filings for Stripe, Ramp and Capital One straight from the Department of Labor's spreadsheets, without the tool's code; all three matched. The quarterly refresh refuses any rebuild where employers or filings move outside 0.7 to 1.4 times the old values.</li>
</ul>

<h2>11. What the data showed</h2>
<p>Running the product produced findings that changed how I search, and that a team building for this audience would want to know. From the week ending November 19, 2026, and the filings from October 2023 to September 2026:</p>
<div class="ssc-facts">
  <div><b>42%</b><span>of ruled-out roles failed on years of experience, nearly as many as on sponsorship (46%). Seniority filtering matters as much as visa filtering.</span></div>
  <div><b>80%</b><span>of the week's roles were at companies that filed H-1Bs for that kind of role last year, so silence in a posting is usually not a no.</span></div>
  <div><b>49%</b><span>of last year's H-1B filings came from the top 1% of employers (583 companies).</span></div>
  <div><b>52%</b><span>of business-role filings were for someone new to the company, the share that matters to a new graduate.</span></div>
</div>
<figure>
  <img src="{{ site.baseurl }}/images/sponsorscope/data-board.jpg" alt="Top sponsors table for business roles: employer, filings in the last 12 months, the year before with change, share new to the company, share at entry level, and New York area filings." loading="lazy">
  <figcaption>The Sponsor data page ranks employers by filings for analyst, strategy, product, GTM and other business roles, with the New York area and fastest-growing views one click away.</figcaption>
</figure>

<h2>12. What it can't do yet</h2>
<ul>
  <li><b>Titles first.</b> The feed keeps roles by title, so some turn out off-target once the description is read.</li>
  <li><b>Partial coverage.</b> 74 Workday sites are connected; many large employers aren't yet.</li>
  <li><b>A filing is a request, not an approval.</b> Company history is evidence about the past, so "Apply" means nothing rules you out, and the tool still says to ask the recruiter early.</li>
  <li><b>No adoption data.</b> Without analytics, I know it works for me and is accurate on test sets, not yet how many people rely on it.</li>
</ul>

<h2>13. What I'd do next</h2>
<div class="table-scroll">
<table>
  <thead><tr><th>Next</th><th>Hypothesis</th><th>How I'd know</th></tr></thead>
  <tbody>
    <tr><td>Close the loop on outcomes</td><td>Roles marked Apply turn into interviews more often than Ask first</td><td>Interview rate by verdict, from roles marked Applied</td></tr>
    <tr><td>Pay estimate from filings</td><td>When a posting lists no pay, the company's filed wages for that kind of role help people decide</td><td>Share of no-pay roles that get an estimate; whether people still open them</td></tr>
    <tr><td>Track whether a role is still open</td><td>Knowing a posting came down saves follow-ups on dead roles</td><td>Applied roles later taken down, and when</td></tr>
    <tr><td>Opt-in sharing and distribution</td><td>Career centers and student communities are the fastest way to reach this audience</td><td>Weekly users and returning users, with consent</td></tr>
  </tbody>
</table>
</div>

<h2>14. What I learned</h2>
<ul>
  <li><b>The research changed the product more than any feature did.</b> I started out building "apply less" and shipped "make volume cheap", because nine people who had landed offers told me what actually worked.</li>
  <li><b>Most of the hard problems were in the data, not the model.</b> Legal names, day-precision dates and reposts took more care than the classifier, and they decide whether people trust it.</li>
  <li><b>I'd measure earlier.</b> Privacy by default was right for this audience, but I would design an opt-in outcome signal from release one, so adoption isn't the one metric I can't report.</li>
</ul>

<p class="note">SponsorScope reads what a posting says. It is not legal or immigration advice. The rules, data build and evaluation scripts are in the <a href="https://github.com/ChengWu-Data/chengwu-data.github.io/tree/main/sponsorscope">repository</a>.</p>
</div>
