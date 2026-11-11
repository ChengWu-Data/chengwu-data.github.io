// Company job boards that answered the public API on 2026-11-10.
// [ats, board slug, display name, selected by default, H-1B employer names when they differ from the brand]
// Inclusion says nothing about sponsorship; every result shows the company's H-1B filings.
window.SS_BOARDS = [
  { group: "Fintech & payments", items: [
    ["greenhouse", "affirm", "Affirm", true], ["greenhouse", "brex", "Brex", true], ["greenhouse", "chime", "Chime", true],
    ["greenhouse", "coinbase", "Coinbase", true], ["greenhouse", "robinhood", "Robinhood", true], ["greenhouse", "sofi", "SoFi", true, ["Social Finance", "SoFi Bank"]],
    ["greenhouse", "stripe", "Stripe", true], ["greenhouse", "mercury", "Mercury", true, ["Mercury Technologies"]], ["greenhouse", "carta", "Carta", true, ["eShares"]],
    ["greenhouse", "betterment", "Betterment", true], ["greenhouse", "upstart", "Upstart", true], ["greenhouse", "oportun", "Oportun", false],
    ["ashby", "ramp", "Ramp", true], ["ashby", "plaid", "Plaid", true], ["ashby", "socure", "Socure", true],
    ["ashby", "sardine", "Sardine", false, ["SardineAI"]], ["ashby", "middesk", "Middesk", false], ["greenhouse", "alloy", "Alloy", false, ["Alloy Labs"]],
    ["greenhouse", "point72", "Point72", true], ["greenhouse", "gusto", "Gusto", true], ["greenhouse", "toast", "Toast", true]
  ]},
  { group: "Data, AI & software", items: [
    ["greenhouse", "datadog", "Datadog", true], ["greenhouse", "mongodb", "MongoDB", true], ["greenhouse", "elastic", "Elastic", false, ["Elasticsearch"]],
    ["greenhouse", "cloudflare", "Cloudflare", false], ["greenhouse", "gitlab", "GitLab", false], ["greenhouse", "okta", "Okta", false],
    ["greenhouse", "twilio", "Twilio", false], ["greenhouse", "asana", "Asana", true], ["greenhouse", "figma", "Figma", true],
    ["greenhouse", "dataiku", "Dataiku", true], ["greenhouse", "anaplan", "Anaplan", false], ["greenhouse", "mixpanel", "Mixpanel", true],
    ["greenhouse", "samsara", "Samsara", false], ["greenhouse", "databricks", "Databricks", false], ["greenhouse", "anthropic", "Anthropic", false],
    ["ashby", "openai", "OpenAI", false], ["ashby", "notion", "Notion", true], ["ashby", "perplexity", "Perplexity", false],
    ["ashby", "harvey", "Harvey", true, ["Harvey AI", "Counsel AI"]], ["ashby", "vanta", "Vanta", false], ["ashby", "hightouch", "Hightouch", true, ["Carry Technologies"]],
    ["greenhouse", "checkr", "Checkr", false], ["greenhouse", "lattice", "Lattice", false, ["=DEGREE"]]
  ]},
  { group: "Consumer, marketplaces & ads", items: [
    ["greenhouse", "doordashusa", "DoorDash", true], ["greenhouse", "instacart", "Instacart", true, ["Maplebear"]], ["greenhouse", "lyft", "Lyft", true],
    ["greenhouse", "airbnb", "Airbnb", true], ["greenhouse", "pinterest", "Pinterest", true], ["greenhouse", "reddit", "Reddit", true],
    ["greenhouse", "duolingo", "Duolingo", true], ["greenhouse", "dropbox", "Dropbox", false], ["greenhouse", "klaviyo", "Klaviyo", true],
    ["greenhouse", "thetradedesk", "The Trade Desk", true], ["greenhouse", "pubmatic", "PubMatic", true], ["greenhouse", "braze", "Braze", false],
    ["greenhouse", "attentive", "Attentive", false], ["greenhouse", "ziprecruiter", "ZipRecruiter", false], ["greenhouse", "tripadvisor", "Tripadvisor", true],
    ["greenhouse", "seatgeek", "SeatGeek", true], ["greenhouse", "nextdoor", "Nextdoor", false], ["greenhouse", "roblox", "Roblox", false],
    ["greenhouse", "coursera", "Coursera", false], ["greenhouse", "udemy", "Udemy", false], ["greenhouse", "peloton", "Peloton", false],
    ["greenhouse", "faire", "Faire", false], ["greenhouse", "hellofresh", "HelloFresh", false, ["Grocery Delivery E-Services"]], ["greenhouse", "flexport", "Flexport", false],
    ["lever", "spotify", "Spotify", true], ["lever", "matchgroup", "Match Group", false, ["=MATCH GROUP AMERICAS", "=MATCH"]]
  ]},
  { group: "Health & research", items: [
    ["greenhouse", "oscar", "Oscar Health", true, ["Oscar Management", "Oscar Health"]], ["greenhouse", "zocdoc", "Zocdoc", true], ["greenhouse", "yipitdata", "YipitData", false, ["Yipit"]],
    ["lever", "veeva", "Veeva", false], ["lever", "palantir", "Palantir", false], ["lever", "outreach", "Outreach", false, ["=OUTREACH"]]
  ]}
];
