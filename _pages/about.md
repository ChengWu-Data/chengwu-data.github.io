---
layout: default
permalink: /about/
author_profile: true
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<style>
/* About Page Styling */
.about-container {
  max-width: 900px;
  margin: 3rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.about-container h2 {
  color: #4b2a66;
  margin-bottom: 1.2rem;
}

.about-container p {
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* Button styling */
.outline-btn {
  display: inline-block;
  padding: 10px 20px;
  border: 2px solid #4b2a66;
  color: #4b2a66;
  border-radius: 30px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
}

.outline-btn:hover {
  background: #4b2a66;
  color: white;
}
</style>

<div class="about-container">
  <h1>About Me</h1>

  <p>
    I’m **Cheng Wu**, a senior at the **University of Illinois at Urbana-Champaign**, majoring in **Econometrics & Quantitative Economics** with a minor in **Data Science and Statistics**. My work focuses on **data-driven policy research**, **public health analytics**, and **machine learning applications** for social impact.  
  </p>

  <p>
    I specialize in working with **large datasets, predictive modeling, and visualization tools** to extract meaningful insights that drive real-world decisions. With experience spanning **public policy, health informatics, and economic analysis**, I aim to bridge the gap between **data science and policymaking** to create impactful solutions.
  </p>

  <p>📍 **Currently based in Champaign, IL, USA.**</p>

  <hr>

  <h2>🎓 Education</h2>

  <p><strong>University of Illinois at Urbana-Champaign</strong></p>
  <p><strong>📅 Expected Graduation:</strong> 2025</p>
  <p><strong>📚 B.S. in Econometrics & Quantitative Economics</strong></p>
  <p><strong>📊 GPA:</strong> 3.85/4.00</p>
  <p><strong>📌 Minor:</strong> Data Science and Statistics</p>

  <h3>📖 Relevant Coursework</h3>
  <ul>
    <li><strong>Health & Public Policy:</strong> Introduction to Epidemiology, Health Equity in the U.S., Contemporary Health, Health Care Systems</li>
    <li><strong>Data Science & Quantitative Methods:</strong> Statistics and Probability, Data Science Discovery, Big Data Analytics, Data Science Exploration, Linear Algebra</li>
    <li><strong>Economics & Policy Analysis:</strong> Economic Growth, Law and Economics, Economics of Poverty Alleviation, Economics of Innovation and Technology</li>
  </ul>

  <hr>

  <h2>🔬 Research Interests</h2>
  <ul>
    <li><strong>Public Health Informatics:</strong> Using data science to improve healthcare access and policy decisions.</li>
    <li><strong>Economic Policy & Data Analytics:</strong> Applying quantitative methods to assess the impact of economic reforms.</li>
    <li><strong>Machine Learning for Social Impact:</strong> Leveraging AI-driven models to optimize policy implementation.</li>
  </ul>

  <hr>

  <h2>💼 Internships & Research Experience</h2>

  <h3>🔹 Data Scientist Intern - Marketing Strategies</h3>
  <p><strong>📍 Donglai Natural BioTech Co. Ltd.</strong> | June 2024 - September 2024 | Remote</p>
  <ul>
    <li>Boosted efficiency by 10%, streamlining inventory with parallel processing, customer profiling with K-Means, DBSCAN.</li>
    <li>Raised 12% order completion with price optimization, trend analysis via regression, forecasting, price elasticity modeling.</li>
  </ul>

  <h3>🔹 Data Scientist Intern - Institutional Finance</h3>
  <p><strong>📍 ZheShang Securities Co. Ltd.</strong> | May 2023 - September 2023 | Hangzhou, China</p>
  <ul>
    <li>Predicted 25% better investments for 20+ private equity deals with Random Forest, Regression, Multivariate statistics.</li>
    <li>Increased 15% cross-departmental data consistency, decision-making via auto-reporting, visuals with Excel, VBA, ETL.</li>
  </ul>

  <h3>🔹 Research Assistant - Economic Policy & Public Health</h3>
  <p><strong>📍 University of Illinois</strong> | January 2024 - July 2024 | Champaign, IL</p>
  <ul>
    <li>Investigated the effects of public health policies on economic mobility using large-scale national datasets.</li>
  </ul>

  <h3>🔹 Researcher - Educational Inequality & Economic Mobility</h3>
  <p><strong>📍 University of Illinois</strong> | January 2023 - Present</p>
  <ul>
    <li>Analyzed educational inequality – economic mobility impact with regression, PSM, with socio-economic controls.</li>
  </ul>

  <h3>🔹 Researcher - Public Health Policy & Critical Medicines Access</h3>
  <p><strong>📍 University of Illinois</strong> | April 2023 - December 2023</p>
  <ul>
    <li>Evaluated preventive health policies’ impact on disease rates, mortality, healthcare costs.</li>
  </ul>

  <hr>

  <p>If you have any questions, feel free to contact me at  
  📧 <a href="mailto:datajourney.chengw@gmail.com" class="outline-btn">Email Me</a></p>

</div>
