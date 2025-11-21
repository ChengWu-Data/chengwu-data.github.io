---
layout: default
permalink: /projects/
title: "Projects"
excerpt: "A collection of my research and professional projects."
author_profile: true
---

<style>
/* General Page Styling */
.page-content {
  background: #f3e8fd;
  padding: 2rem;
}

/* Project Card Styling */
.project-card {
  display: flex;
  align-items: center;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

/* Responsive for Mobile */
@media (max-width: 768px) {
  .project-card {
    flex-direction: column;
    text-align: center;
  }
  .project-image {
    margin-right: 0;
    margin-bottom: 1rem;
  }
  .button-row {
    justify-content: center;
  }
}

/* Project Image */
.project-image {
  width: 200px;
  height: 150px;
  border-radius: 6px;
  object-fit: cover;
  margin-right: 1.5rem;
}

/* Project Content */
.project-content {
  flex: 1;
}

.project-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #6d4195;
  margin-bottom: 0.5rem;
}

.project-description {
  color: #444;
  line-height: 1.5;
  margin-bottom: 1rem;
}

/* Details Button */
.details-btn {
  background: transparent;
  color: #6d4195;
  border: 2px solid #6d4195;
  padding: 8px 12px;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.details-btn:hover {
  background: #6d4195;
  color: white;
}

/* Hidden Details - Ensure Spacing */
.project-details {
  display: none;
  background: #fff;
  padding: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  border-radius: 6px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
}

/* Preview Frame */
.preview-frame {
  width: 100%;
  height: 450px;
  border: none;
  margin-bottom: 1rem;
  border-radius: 6px;
}

/* Button Row */
.button-row {
  display: flex;
  gap: 0.8rem;
}

/* GitHub Button - Outline Style */
.github-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 10px;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 6px;
  text-decoration: none;
  border: 2px solid #6d4195;
  color: #6d4195;
}

.github-btn:hover {
  background: #6d4195;
  color: white;
}

/* View Page Button - Solid Purple */
.html-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 10px;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 6px;
  text-decoration: none;
  background: #6d4195;
  color: white;
  border: 2px solid #6d4195;
}

.html-btn:hover {
  background: #4a256d;
  border-color: #4a256d;
}
</style>

<h1 style="display: flex; align-items: center; font-size: 2rem; color: #6d4195; margin-bottom: 1.5rem; text-align: left;">
  <i class="fa-solid fa-folder-open" style="margin-right: 10px;"></i> My Projects
</h1>


<!-- Project 0: Exponential Smoothing FX Trend Strategy -->
<div class="project-card">
  <img src="{{ site.baseurl }}/images/project_fx.jpg" alt="FX Project Image" class="project-image">
  
  <div class="project-content">
    <div class="project-title">FX Trend Strategy using Exponential Smoothing</div>
    <p class="project-description">
      A fully reproducible quantitative research project analyzing USD/CAD trend persistence using dual exponential smoothing filters. 
      I built a complete forecasting and trading pipeline: signal engineering, α–β parameter tuning, long/short asymmetry testing, 
      buffer and deceleration exit experiments, backtesting, Sharpe evaluation, and trade-level accuracy modeling.  
      This project demonstrates my capabilities in <strong>quantitative analysis, data science workflow design, 
      mathematical modeling, statistical reasoning, and technical communication</strong>.
    </p>

    <button class="details-btn" onclick="toggleDetails('project_fx')">View Details</button>
  </div>
</div>

<!-- Hidden Details for FX Project -->
<div id="project_fx" class="project-details">

  <!-- 🔥 Summary Section -->
  <div class="project-summary" style="background:#faf7ff; padding:1.5rem; border-radius:8px; margin-bottom:1.5rem; border-left:4px solid #6d4195;">
    <h2 style="color:#6d4195;">📌 Project Summary</h2>

    <p><strong>Objective:</strong> Build a trend-following FX trading system for USD/CAD using dual exponential smoothing filters (ESα, ESβ) and evaluate long/short symmetry, parameter sensitivity, and exit logic.</p>

    <p><strong>Methodology:</strong> Designed full pipeline including parameter grid search, regime-specific performance evaluation, trade-level accuracy analysis, and experiments on buffer thresholds and deceleration-based exits.</p>

    <ul>
      <li>Dual ES crossover signals with α < β</li>
      <li>Trade-level performance aggregation (not just daily returns)</li>
      <li>Long-only vs short-only optimization</li>
      <li>Buffer & deceleration exit experiments</li>
    </ul>

    <p><strong>Key Results:</strong></p>
    <ul>
      <li>Optimal parameters: <code>α = 0.20</code>, <code>β = 0.60</code></li>
      <li>Sharpe ratio improves <strong>0.26 → 0.45</strong></li>
      <li>Trade-level accuracy ≈ <strong>73%</strong></li>
      <li>Distance buffer & deceleration exit <strong>reduce performance</strong></li>
    </ul>

    <p style="font-style:italic; color:#444;">See full technical report below.</p>
  </div>

  <!-- 🔽 PDF Preview -->
  <iframe class="preview-frame" src="https://drive.google.com/file/d/1waRGZB_vFinXPfDzRqbshjq4p5y41fQI/preview"></iframe>

  <!-- 🔗 Buttons -->
  <div class="button-row">
    <a href="https://github.com/ChengWu-Data/Exponential-Smoothing-Trend-Strategy-with-Parameter-Tuning-Exit-Rules" 
       class="github-btn" target="_blank">
      <i class="fa-brands fa-github"></i> GitHub
    </a>
    <a href="https://drive.google.com/file/d/1waRGZB_vFinXPfDzRqbshjq4p5y41fQI/view?usp=sharing" 
       class="html-btn" target="_blank">
      <i class="fa-solid fa-file-pdf"></i> View Report
    </a>
  </div>

</div>




<!-- Project 1: Housing Price Prediction -->
<div class="project-card">
  <img src="{{ site.baseurl }}/images/project1.jpg" alt="Housing Project Image" class="project-image">
  
  <div class="project-content">
    <div class="project-title">Housing Price Prediction: An Exploratory Analysis</div>
    <p class="project-description">
      Built a housing price prediction pipeline using exploratory data analysis, feature engineering, and regression/ML models including Ridge, LASSO, Random Forest, and Group LASSO. 
      The models achieved strong predictive accuracy while consistently identifying space, quality, and utility as the key drivers of value. 
      Beyond forecasting, the project emphasized interpretability and stakeholder communication — turning high-dimensional data into actionable insights for decisions.
    </p>

    <button class="details-btn" onclick="toggleDetails('project1')">View Details</button>
  </div>
</div>

<!-- Hidden Details for Project 1 -->
<div id="project1" class="project-details">

  <!-- 🔥 Summary Section -->
  <div class="project-summary" style="background:#faf7ff; padding:1.5rem; border-radius:8px; margin-bottom:1.5rem; border-left:4px solid #6d4195;">
    <h2 style="color:#6d4195;">📌 Project Summary</h2>

    <p><strong>Objective:</strong> Build an interpretable housing analytics pipeline that identifies economic drivers of value — not just produce a black-box prediction model.</p>

    <p><strong>Methodology:</strong> Starting from the full Ames dataset (80+ variables), we:</p>
    <ul>
      <li>Separated <strong>numeric vs categorical</strong> features & re-classified ordinal variables (<code>OverallQual</code>, <code>MoSold</code>)</li>
      <li>Used <strong>correlation + effect size (η²)</strong> to evaluate predictor strength</li>
      <li>Applied <strong>adjusted GVIF</strong> to control multicollinearity</li>
      <li>Built <strong>interactive visualizations</strong>: heatmaps, neighborhood maps, STL trend decomposition</li>
    </ul>

    <p><strong>Key Insights:</strong></p>
    <ul>
      <li><strong>Space & construction quality are the dominant drivers</strong> (<code>GrLivArea</code>, <code>TotalBsmtSF</code>, <code>OverallQual</code>)</li>
      <li><strong>Neighborhood effects persist even after controlling for features</strong></li>
      <li><strong>Garage & exterior finishing add second-tier but significant value</strong></li>
      <li><strong>Time-series structure aligns with macro events</strong> (e.g., subprime crisis, tax credits)</li>
    </ul>

    <p><strong>What this demonstrates:</strong></p>
    <ul>
      <li>Ability to turn raw municipal data into <strong>decision-oriented insights</strong></li>
      <li>Bridging <strong>EDA → feature engineering → modeling → communication</strong></li>
      <li>Transferable to pricing, risk modeling, and applied analytics pipelines</li>
    </ul>

    <p style="font-style:italic; color:#444;">Full interactive analysis available below.</p>
  </div>

  <!-- 🔽 Embedded HTML Preview -->
  <iframe class="preview-frame" src="https://htmlpreview.github.io/?https://github.com/ChengWu-Data/Housing-Price-Prediction-An-Exploratory-Analysis/blob/8a49d8ae0d2514d014c7d304ea081a2002fbd0f4/Housing_Price_Prediction-AnExploratoryAnalysis.html"></iframe>

  <!-- 🔗 Buttons -->
  <div class="button-row">
    <a href="https://github.com/ChengWu-Data/Housing-Price-Prediction-An-Exploratory-Analysis.git" class="github-btn" target="_blank">
      <i class="fa-brands fa-github"></i> GitHub
    </a>
    <a href="{{ site.baseurl }}/assets/Housing_Price_Prediction-AnExploratoryAnalysis.html" class="html-btn" target="_blank">
      <i class="fa-solid fa-file"></i> View Page
    </a>
  </div>

</div>



<!-- Project 2 -->
<div class="project-card">
  <img src="{{ site.baseurl }}/images/project2.jpg" alt="Project Image" class="project-image">
  <div class="project-content">
    <div class="project-title">Socioeconomic Attributes and Crime: Analyzing Economic Factors in Crime Trends</div>
    <p class="project-description">
      Explored socioeconomic predictors of crime in San Francisco by combining large-scale crime data (913k+ records) with census tract indicators. Used fixed-effects regression, count models, and time-series forecasting to identify drivers of crime trends, with education and mobility emerging as strong factors. Beyond policy relevance, the project sharpened my ability to handle complex datasets, longitudinal analysis, and predictive modeling—transferable skills for business and financial analytics.
    </p>
    <button class="details-btn" onclick="toggleDetails('project2')">View Details</button>
  </div>
</div>

<!-- Hidden Details for Project 2 -->
<div id="project2" class="project-details">
  <!-- Embedded PDF Preview -->
  <iframe class="preview-frame" src="https://drive.google.com/file/d/1VjV4sNFC9NrD7N8A9QoP_Ss2yWV_5WkI/preview"></iframe>
  <!-- View Online Button -->
  <div class="button-row">
    <a href="https://drive.google.com/file/d/1VjV4sNFC9NrD7N8A9QoP_Ss2yWV_5WkI/view?usp=sharing" class="html-btn">
      <i class="fa-solid fa-file-pdf"></i> View Online
    </a>
  </div>
</div>

<!-- Project 3: My Ikebana Portfolio Site -->
<div class="project-card">
  <img src="{{ site.baseurl }}/images/project3.jpg" alt="Project Image" class="project-image">
  <div class="project-content">
    <div class="project-title">My Ikebana Portfolio Site</div>
    <p class="project-description">
      This website was developed as the final project for my Ikebana course. It showcases a wide range of advanced front-end techniques including complex CSS animations, interactive JavaScript effects, HTML5 background music integration, and a responsive design that automatically adapts to dark/light modes across different devices. The project leverages CSS3 transitions, media queries, dynamic UI enhancements with JavaScript, and the HTML5 audio API to allow readers to join me on my flower arranging journey!  <a href="https://github.com/ChengWu-Data/followerJP" target="_blank" style="color:#6d4195;">To GitHub</a>.
    </p>
    <button class="details-btn" onclick="toggleDetails('project3')">View Details</button>
  </div>
</div>

<!-- Hidden Details for Project 3 -->
<div id="project3" class="project-details">
  <!-- Photo Gallery: 5 Photos -->
  <div class="photo-gallery">
    <img src="{{ site.baseurl }}/images/followerJP_1.jpg" alt="FollowerJP Screenshot 1" class="project-photo">
    <img src="{{ site.baseurl }}/images/followerJP_2.jpg" alt="FollowerJP Screenshot 2" class="project-photo">
    <img src="{{ site.baseurl }}/images/followerJP_3.jpg" alt="FollowerJP Screenshot 3" class="project-photo">
    <img src="{{ site.baseurl }}/images/followerJP_4.jpg" alt="FollowerJP Screenshot 4" class="project-photo">
    
  </div>
  <!-- Button Row -->
  <div class="button-row">
    <a href="https://chengwu-data.github.io/followerJP/" class="html-btn">
      <i class="fa-solid fa-globe"></i> Visit Website
    </a>
  </div>
</div>

<script>
function toggleDetails(id) {
  var details = document.getElementById(id);
  if (details.style.display === "none" || details.style.display === "") {
    details.style.display = "block";
    // Add a transition effect for the expanded section
    details.style.opacity = 0;
    setTimeout(() => {
      details.style.opacity = 1;
      details.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  } else {
    details.style.opacity = 0;
    setTimeout(() => {
      details.style.display = "none";
    }, 200);
  }
}
</script>
