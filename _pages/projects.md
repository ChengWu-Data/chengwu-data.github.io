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


.project-problem {
  background: #f7ecff;
  border-left: 4px solid #6d4195;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  color: #333;
  font-size: 0.95rem;
}
.project-problem strong {
  color: #6d4195;
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

  <!-- 🎯 Problem Section -->
  <div class="project-problem">
    <strong>Problem:</strong> Most simple FX trend-following rules look good in toy backtests but fall apart once you
    change parameters, markets, or exit rules. I wanted to design a <em>robust, parameterized</em> exponential smoothing
    system and understand exactly when a “dual-ES crossover” strategy actually adds value versus noise.
  </div>
  
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



<!-- Project 5: MultiDocRAG (Developing) -->
<div class="project-card">
  <img src="{{ site.baseurl }}/images/MultiDocRAG_cover.jpg" alt="MultiDocRAG Cover Image" class="project-image">
  
  <div class="project-content">
    <div class="project-title">MultiDocRAG (Developing)</div>
    <p class="project-description">
      A retrieval-augmented multi-document reasoning system that ingests multiple PDFs, retrieves evidence with vector search, 
      and generates synthesized, citation-grounded answers. This is a full-stack applied ML project where I am building 
      an end-to-end pipeline involving document ingestion, chunking strategies, embedding search, multi-document LLM reasoning, 
      evaluation framework design, and a demo interface.  
      This project demonstrates my capabilities in <strong>LLM engineering, applied machine learning, full data pipeline design, 
      evaluation methodology, and technical communication</strong>.
    </p>

    <button class="details-btn" onclick="toggleDetails('project_multidoc')">View Details</button>
  </div>
</div>

<!-- Hidden Details for MultiDocRAG Project -->
<div id="project_multidoc" class="project-details">

  <!-- 🎯 Problem Section -->
  <div class="project-problem">
    <strong>Problem:</strong> Most RAG systems work well for <em>single-document retrieval</em> but fail when answers require
    contrasting evidence or synthesizing information across multiple sources. This project explores how to design a retrieval,
    ranking, and reasoning pipeline that can accurately answer questions spanning multiple PDFs.
  </div>


  <!-- 🔥 Summary Section -->
  <div class="project-summary" style="background:#faf7ff; padding:1.5rem; border-radius:8px; margin-bottom:1.5rem; border-left:4px solid #6d4195;">
    <h2 style="color:#6d4195;">📌 Project Summary</h2>

    <p><strong>Objective:</strong> Build an AI assistant capable of performing <strong>cross-document reasoning</strong> across multiple PDFs using Retrieval-Augmented Generation (RAG) and optional conversational memory.</p>

    <p><strong>Methodology:</strong> Designed a modular system including multi-PDF ingestion, hierarchical chunking, embedding generation, vector-based retrieval, and an LLM reasoning layer capable of comparing, contrasting, and synthesizing content from multiple documents.</p>

    <ul>
      <li>Semantic chunking with hierarchical fallback</li>
      <li>Vector search with top-k reranking</li>
      <li>Cross-document answer synthesis with citations</li>
      <li>Optional memory module for multi-turn reasoning</li>
      <li>Evaluation framework comparing baseline LLM vs RAG vs RAG+memory</li>
    </ul>

    <p><strong>Use Cases:</strong></p>
    <ul>
      <li>Summarizing common findings across multiple reports</li>
      <li>Comparing methodologies between research papers</li>
      <li>Extracting evidence-backed insights for business or policy analysis</li>
      <li>Automated literature review and document synthesis</li>
    </ul>

    <p><strong>Current Progress:</strong></p>
    <ul>
      <li>Document ingestion + chunking pipeline complete</li>
      <li>Embedding search + retrieval module integrated</li>
      <li>Baseline vs RAG evaluation being designed</li>
      <li>Reasoning module + demo UI under active development</li>
    </ul>

    <p style="font-style:italic; color:#444;">This is an ongoing project — codebase updates weekly.</p>
  </div>

  <!-- 🔗 Buttons -->
  <div class="button-row">
    <a href="https://github.com/ChengWu-Data/MultiDocRAG" 
       class="github-btn" target="_blank">
      <i class="fa-brands fa-github"></i> GitHub
    </a>
    <a href="#" class="html-btn" style="opacity:0.4; pointer-events:none;">
      <i class="fa-solid fa-file-code"></i> Report (Coming Soon)
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

  <!-- 🎯 Problem Section -->
  <div class="project-problem">
    <strong>Problem:</strong> House price models often chase leaderboard metrics but fail to answer a practical question:
    <em>what exactly is driving value?</em> For a buyer, developer, or bank, we need an interpretable decomposition of
    space, quality, and neighborhood effects rather than a pure black-box forecast.
  </div>

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
    <div class="project-title">Socioeconomic Drivers of Crime in San Francisco</div>
    <p class="project-description">
      Built a large-scale spatial econometrics pipeline linking 900k+ SF police incident records with ACS socioeconomic panel data. 
      Applied fixed-effects logistic models, Poisson/NegBin count models, and time-series forecasting to quantify how inequality, unemployment, and mobility patterns shape crime trends. 
      The project demonstrates skills in <strong>causal inference, longitudinal modeling, data integration, and policy analytics</strong>—transferable to business forecasting & systems design.
    </p>
    <button class="details-btn" onclick="toggleDetails('project2')">View Details</button>
  </div>
</div>


<!-- Hidden Details for Project 2 -->
<div id="project2" class="project-details">

  <!-- 🎯 Problem Section -->
  <div class="project-problem">
    <strong>Problem:</strong> City agencies and planners see crime as an “economic problem”, but it’s unclear whether
    inequality, unemployment, or mobility actually explain crime patterns once we control for where people live and move.
    This project builds a tract–year panel to test whether the data supports that narrative.
  </div>

  <!-- （可选）一张展示问题的图，比如时间趋势 -->
  <!--
  <img src="{{ site.baseurl }}/images/fig_time_trend.png" 
       alt="Crime time trend" 
       style="width:100%; border-radius:6px; margin-bottom:1rem;">
  -->



  <!-- 🔥 Summary Section -->
  
<div class="project-summary" style="background:#faf7ff; padding:1.5rem; border-radius:8px; margin-bottom:1.5rem; border-left:4px solid #6d4195;">
    <h2 style="color:#6d4195;">📌 Project Summary</h2>


    <p><strong>Objective:</strong> Quantify whether crime patterns are driven by economic factors such as inequality, unemployment, transit patterns, and demographic changes.</p>

    <p><strong>Pipeline:</strong> Merged 913,732 incident-level crime records with census-tract ACS data (2017–2022) using spatial joins and longitudinal panel construction.</p>

    <ul>
      <li>Panel structure: <strong>tract × year</strong></li>
      <li>Models: Fixed-effects logistic (individual), Poisson/Negative Binomial (aggregate)</li>
      <li>Time-series forecasting using ARIMAX/SARIMAX</li>
      <li>Feature engineering for economic deltas + mobility metrics</li>
    </ul>

    <p><strong>Key Findings:</strong></p>

    <ul>
      <li>Higher transit usage (public transit, cycling) → <strong>consistent increases in crime rates</strong> across categories</li>
      <li>Income inequality + unemployment <strong>negatively associated with crime at tract level</strong> (counter-intuitive, suggests urban confounds)</li>
      <li>Bachelor’s degree rate <strong>reduces violent/public order crime but increases property crime</strong></li>
      <li>COVID years: fewer public order crimes, more property crimes</li>
    </ul>

    <p><strong>Methodological Insights (Transferable):</strong></p>
    <ul>
      <li>Importance of panel vs individual-level inference: aggregate models outperform individual classifiers</li>
      <li>Negative Binomial superior under over-dispersion → similar logic applies to ops forecasting</li>
      <li>Mobility + density better predictors than pure economic indicators</li>
    </ul>

    <p style="font-style:italic; color:#444;">Full methodology and regression tables available in report below.</p>
  </div>

  <!-- 🔽 PDF PREVIEW -->
  <iframe class="preview-frame" src="https://drive.google.com/file/d/1VjV4sNFC9NrD7N8A9QoP_Ss2yWV_5WkI/preview"></iframe>

  <!-- 🔗 BUTTONS -->
  <div class="button-row">
    <a href="https://github.com/ChengWu-Data/sf-crime-socioeconomic-analysis" 
       class="github-btn" target="_blank">
      <i class="fa-brands fa-github"></i> GitHub
    </a>
    <a href="https://drive.google.com/file/d/1VjV4sNFC9NrD7N8A9QoP_Ss2yWV_5WkI/view?usp=sharing" 
       class="html-btn" target="_blank">
      <i class="fa-solid fa-file-pdf"></i> View Report
    </a>
  </div>

</div>



<!-- Project 3: Ikebana Portfolio Site -->
<div class="project-card">
  <img src="{{ site.baseurl }}/images/project3.jpg" alt="Ikebana Site Image" class="project-image">
  <div class="project-content">
    <div class="project-title">Ikebana Portfolio — Immersive Front-End Microsite</div>
    <p class="project-description">
      A handcrafted, single-page microsite that turns my Ikebana course portfolio into an immersive digital experience. 
      Built from scratch (no frameworks) with responsive layout, CSS animations, JavaScript-driven interactions, and background audio integration, 
      this project reflects my attention to detail in <strong>UX, visual hierarchy, and front-end systems thinking</strong> rather than just static pages.
    </p>
    <button class="details-btn" onclick="toggleDetails('project3')">View Details</button>
  </div>
</div>

<!-- Hidden Details for Project 3 -->
<div id="project3" class="project-details">

  <!-- 🎯 Problem Section -->
  <div class="project-problem">
    <strong>Problem:</strong> Most “portfolio sites” for creative work are either static grids of images or generic templates.
    I wanted to see if I could turn an Ikebana course portfolio into a small, product-like web experience with deliberate
    motion, sound, and layout — without relying on heavy frameworks.
  </div>

  <!-- 🔥 Summary Section -->
  <div class="project-summary" style="background:#faf7ff; padding:1.5rem; border-radius:8px; margin-bottom:1.5rem; border-left:4px solid #6d4195;">
    <h2 style="color:#6d4195;">📌 Project Summary</h2>

    <p><strong>Objective:</strong> Design and implement a small, self-contained web experience that presents Ikebana work 
    in a way that feels more like a product than a static gallery — with smooth transitions, responsive layout, and ambient audio.</p>

    <p><strong>What I built:</strong></p>
    <ul>
      <li>A fully responsive single-page site that adapts to different screen sizes and dark/light environments</li>
      <li>Custom <strong>CSS animation system</strong> (entrance transitions, hover states, text reveals) without external libraries</li>
      <li>JavaScript controllers for <strong>navigation, scroll-based effects, and HTML5 audio playback</strong></li>
      <li>A layout that balances photography, text, and whitespace so the site reads like a curated story rather than a code demo</li>
    </ul>

    <p><strong>Why it matters for my broader work:</strong></p>
    <ul>
      <li>Shows I can go from <strong>concept → UX structure → visual design → implementation</strong> on my own</li>
      <li>Reinforces skills that are directly reusable for <strong>analytics dashboards, internal tools, and stakeholder-facing UIs</strong></li>
      <li>Demonstrates that I care about the last mile of data/insights — <strong>how people actually experience what we build</strong></li>
    </ul>

    <p style="font-style:italic; color:#444;">Below are selected screenshots from the live site.</p>
  </div>

  <!-- 📸 Photo Gallery -->
  <div class="photo-gallery">
    <img src="{{ site.baseurl }}/images/followerJP_1.jpg" alt="FollowerJP Screenshot 1" class="project-photo">
    <img src="{{ site.baseurl }}/images/followerJP_2.jpg" alt="FollowerJP Screenshot 2" class="project-photo">
    <img src="{{ site.baseurl }}/images/followerJP_3.jpg" alt="FollowerJP Screenshot 3" class="project-photo">
    <img src="{{ site.baseurl }}/images/followerJP_4.jpg" alt="FollowerJP Screenshot 4" class="project-photo">
  </div>

  <!-- 🔗 Button Row -->
  <div class="button-row">
    <a href="https://chengwu-data.github.io/followerJP/" class="html-btn" target="_blank">
      <i class="fa-solid fa-globe"></i> Visit Website
    </a>
    <a href="https://github.com/ChengWu-Data/followerJP" class="github-btn" target="_blank">
      <i class="fa-brands fa-github"></i> GitHub
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
