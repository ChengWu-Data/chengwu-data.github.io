<style>
/* General Styling */
.page-content {
  background: #f3e8fd;
  padding: 2rem;
}

/* Container for sections */
.section-container {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

/* Section headers */
.section-header {
  font-size: 1.5rem;
  font-weight: bold;
  color: #6d4195;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.section-header i {
  margin-right: 8px;
}

/* Spacing between entries */
.entry {
  margin-bottom: 1.5rem;
}

/* Job & Research Titles */
.entry-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
}

/* Institution & Date */
.entry-details {
  color: #666;
  font-style: italic;
  margin-bottom: 0.5rem;
}

/* Bullet Points */
.entry-content ul {
  padding-left: 1.2rem;
}

.entry-content li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

/* GPA Highlight */
.gpa-badge {
  background: #6d4195;
  color: white;
  padding: 3px 8px;
  font-size: 0.85rem;
  border-radius: 4px;
  margin-left: 8px;
  font-weight: bold;
}

/* Contact Section */
.contact-section {
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
  color: #6d4195;
}

/* Styling for About Me */
.about-text {
  color: #4b2a66; /* Purple highlight instead of bold */
  font-weight: 600;
}

/* ---- 新增：让经历之间和段落之间更宽松 ---- */
.entry {
  margin-bottom: 2.5rem; /* 增加间距 */
}

.entry-content p {
  margin-bottom: 1rem; /* 段落之间增加呼吸感 */
}
</style>


<div class="section-container">
  <h2 class="section-header">About Me</h2>
  <p>
    I’m <span class="about-text">Cheng Wu</span>, a <span class="about-text">data and business analyst</span> who cares about how analysis translates into real-world decisions. 
  </p> 
  <p>
    With a background in <span class="about-text">econometrics and quantitative economics</span> from the <span class="about-text">University of Illinois Urbana-Champaign</span> and current graduate studies in <span class="about-text">Data Science</span> at <span class="about-text">Columbia University</span>, I work at the intersection of quantitative rigor and practical outcomes.
  </p>
  <p>
    I’ve applied analytics across <span class="about-text">Markets, Finance, and Social Impact</span>. My work has helped managers improve pricing and demand planning, speed up financial reporting, and identify inequities in education systems. What motivates me most are questions without ready-made answers — problems where careful analysis can bring clarity and drive meaningful change.
  </p>
  <p>
    I focus on three things in my work: <span class="about-text">clarity in communication, rigor in method, and measurable impact in results.</span> 
  </p>
  <p>📍 <span class="about-text">Focus areas</span>: market analytics, financial analysis, process improvement, education equity</p>
  <p>📍 Tools: SQL, Python, BI dashboards (Power BI, Tableau, Plotly), Statistics / Econometrics</p>
</div>

<div class="section-container">
  <h2 class="section-header"><i class="fas fa-graduation-cap"></i> Education</h2>

  <div class="entry">
    <div class="entry-title">Columbia University</div>
    <div class="entry-details">M.S. in Data Science &nbsp;|&nbsp; In Progress</div>
  </div>

  <div class="entry">
    <div class="entry-title">University of Illinois at Urbana-Champaign</div>
    <div class="entry-details">Graduated: 2025</div>
    <ul>
      <li><strong>B.S. in Econometrics &amp; Quantitative Economics</strong></li>
      <li><em>Minor: Data Science and Statistics</em></li>
      <li>GPA: 3.85/4.00 <span class="gpa-badge">Dean's List</span></li>
    </ul>
  </div>
</div>

<div class="section-container">
  <h2 class="section-header"><i class="fas fa-briefcase"></i> Professional Experience</h2>

  <div class="entry">
  <div class="entry-title">Data Scientist Intern — Marketing Analytics</div>
  <div class="entry-details">Donglai Natural BioTech Co. Ltd. | June 2024 – September 2024 | Remote</div>
  <div class="entry-content">
    <p>
      At <span class="about-text">Donglai</span>, I joined the <span class="about-text">marketing strategies team</span> at a time when the company was struggling with <span class="about-text">forecasting demand</span> across dozens of product lines. My role started with <span class="about-text">customer segmentation</span>: I applied clustering models like <span class="about-text">K-Means</span> and <span class="about-text">DBSCAN</span> to uncover groups of buyers with distinct purchasing patterns. These clusters were directly connected to <span class="about-text">SQL-based ETL pipelines</span> for inventory planning, which meant my work could be tested quickly against real stock levels.
    </p>
    <p>
      🥂 One highlight of the summer was building <span class="about-text">demand forecasting</span> and <span class="about-text">price elasticity models</span> that managers used to run “what if” scenarios. For example, we simulated price adjustments on seasonal products, which translated into a measurable <span class="about-text">12% increase in order completion rates</span>. I also spent weeks refining workflows with <span class="about-text">Spark</span> and <span class="about-text">Dask</span> to handle millions of transaction records; shaving <span class="about-text">40% off reporting latency</span> meant the team could react faster to market shifts. To make all of this accessible, I built <span class="about-text">interactive dashboards</span> in <span class="about-text">Plotly</span>, <span class="about-text">Dash</span>, and <span class="about-text">Power BI</span>. Watching non-technical managers click through predictive insights and immediately adjust their plans was one of the most rewarding moments of my internship.
    </p>
  </div>
</div>


 <div class="entry">
  <div class="entry-title">Data Analyst — Institutional Finance</div>
  <div class="entry-details">ZheShang Securities Co. Ltd. | May 2023 – September 2023 | Hangzhou, China</div>
  <div class="entry-content">
    <p>
      At <span class="about-text">ZheShang Securities</span>, I rotated into the <span class="about-text">institutional finance department</span>, where private equity and M&A deals were evaluated at a rapid pace. I was tasked with supporting the screening of <span class="about-text">over 20 transactions</span>, which meant diving into financial statements, market data, and regulatory filings. Using <span class="about-text">multi-factor regression</span> and <span class="about-text">scenario analysis</span>, I helped improve the accuracy of our investment evaluations by about <span class="about-text">25%</span> — a difference that directly influenced whether deals moved forward.
    </p>
    <p>
      💡 A big challenge was <span class="about-text">data fragmentation</span>: portfolio data lived in one system, accounting in another, and managers often spent hours reconciling them. I worked on integrating these into a <span class="about-text">unified SQL/VBA pipeline</span>, which cut reconciliation time by nearly a third and made reporting more reliable. Beyond the technical work, I designed <span class="about-text">scalable portfolio analytics frameworks</span> that benchmarked performance against market indices, which gave our risk team a more consistent way to track exposure. The <span class="about-text">BI dashboards</span> I built for real-time portfolio and risk metrics became a talking point in weekly meetings, giving senior managers timely visibility to adjust allocation strategies and communicate with stakeholders.
    </p>
  </div>
</div>

<div class="entry">
  <div class="entry-title">Data Analyst & Lead Coordinator — Inclusive Growth</div>
  <div class="entry-details">Innovative Bloom Foundation | May 2019 – June 2024 | Shanghai, China</div>
  <div class="entry-content">
    <p>
      My work with the <span class="about-text">Innovative Bloom Foundation</span> spanned five years, starting when I was still in high school. I first joined as a volunteer <span class="about-text">math teacher</span> for left-behind children in rural communities, but as I observed the deeper structural challenges these families faced, I began to take on broader responsibilities. Over time, I grew from front-line teaching to <span class="about-text">coordinating programs</span> and ultimately leading <span class="about-text">data initiatives</span> that shaped how the foundation measured and scaled its work.
    </p>
    <p>
      My contribution became twofold: <span class="about-text">data analysis</span> and <span class="about-text">program coordination</span>. I started by structuring survey data — often messy, handwritten responses — into <span class="about-text">SQL datasets</span> that could be analyzed systematically. This opened the door to building <span class="about-text">dashboards</span> that tracked education access, food security, and health indicators across different villages.
    </p>
    <p>
      One initiative I’m proud of was helping launch an <span class="about-text">e-commerce platform</span> for local artisans. I set up real-time monitoring to track sales and logistics, and within a year the platform was supporting <span class="about-text">15 families</span> and increasing artisan household income by about <span class="about-text">30%</span>. These numbers weren’t abstract; they meant that families could afford school fees or healthcare they previously struggled with.
    </p>
    <p>
      I also applied <span class="about-text">regression analysis</span> to benchmark program outcomes, which guided funding decisions for future projects. Over time, I learned how to <span class="about-text">translate complex outcomes into metrics</span> that stakeholders could act on, ensuring that data wasn’t just collected, but used to design better interventions.
    </p>
  </div>
</div>

</div>



<div class="section-container">
  <h2 class="section-header"><i class="fas fa-microscope"></i> Research Experience</h2>

  <div class="entry">
    <div class="entry-title">Research Assistant — Economic Policy & Public Health</div>
    <div class="entry-details">University of Illinois | January 2024 – July 2024 | Champaign, IL</div>
    <div class="entry-content">
      <p>
        Analyzed how public-health policies relate to mobility outcomes using national datasets; prepared clean analysis tables and visuals
        and applied interpretable ML where useful.
      </p>
    </div>
  </div>

  <div class="entry">
    <div class="entry-title">Researcher — Educational Inequality & Economic Mobility</div>
    <div class="entry-details">University of Illinois | January 2023 – Present</div>
    <div class="entry-content">
      <p>
        Studied links between school resources and mobility using regression and PSM with socio-economic controls; produced concise write-ups for stakeholders.
      </p>
    </div>
  </div>

  <div class="entry">
    <div class="entry-title">Researcher — Public Health Policy & Critical Medicines Access</div>
    <div class="entry-details">University of Illinois | April 2023 – December 2023</div>
    <div class="entry-content">
      <p>
        Assessed preventive-care policy impacts and modeled risks of critical-medicine shortages; summarized results for planning and resource allocation.
      </p>
    </div>
  </div>
</div>

<!-- Contact Section -->
<div class="section-container contact-section">
  <h2>📩 Get in Touch</h2>
  <p>If you have any questions, feel free to reach out:</p>
  <a href="mailto:datajourney.chengw@gmail.com" class="email-btn">Email Me</a>
</div>

<style>
/* Styling for Email Button */
.email-btn {
  display: inline-block;
  padding: 12px 20px;
  background: #6d4195; /* Purple background */
  color: white; /* White text */
  text-decoration: none;
  font-weight: bold;
  border-radius: 6px; /* Rounded corners */
  transition: background 0.2s, transform 0.2s;
}

/* Hover effect */
.email-btn:hover {
  background: #572e7a; /* Darker purple */
  transform: scale(1.05);
}
</style>
