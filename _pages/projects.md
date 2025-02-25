---
layout: default
permalink: /projects/
title: "Projects"
excerpt: "A collection of my research and professional projects."
author_profile: false

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

.project-card:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
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
  background: none;
  color: #6d4195;
  border: 2px solid #6d4195;
  padding: 8px 12px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.details-btn:hover {
  background: #6d4195;
  color: white;
}

/* Hidden Details */
.project-details {
  display: none;
  background: #fff;
  padding: 1.2rem;
  margin-top: 1rem;
  border-radius: 6px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
}

/* GitHub & HTML Buttons */
.button-row {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

.github-btn, .html-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-weight: bold;
  border-radius: 6px;
  text-decoration: none;
}

.github-btn {
  background: black;
  color: white;
}

.github-btn:hover {
  background: #333;
}

.html-btn {
  background: #6d4195;
  color: white;
}

.html-btn:hover {
  background: #572e7a;
}

</style>

<h1 style="text-align: center; color: #6d4195;">📂 My Projects</h1>

<!-- Project 1 -->
<div class="project-card">
  <img src="{{ site.baseurl }}/images/project1.jpg" alt="Project Image" class="project-image">
  <div class="project-content">
    <div class="project-title">Housing Price Prediction: An Exploratory Analysis</div>
    <p class="project-description">Exploring the relationship between housing attributes and sale prices through extensive exploratory data analysis, visualization, and predictive modeling.</p>
    <button class="details-btn" onclick="toggleDetails('project1')">View Details</button>    
    <!-- Hidden Details -->
    <!-- Hidden Details -->
    <div id="project1" class="project-details">
      <p><strong>📅 Project Duration:</strong> January 2025 – Present</p>
      <p><strong>📝 Description:</strong> Identifies key factors affecting house prices using statistical analysis and machine learning.</p>
      <p><strong>🛠 Technology Stack:</strong></p>
      <ul>
        <li>Python (Pandas, NumPy, Scikit-learn), SQL, Jupyter Notebook</li>
        <li>Visualization: Plotly, Seaborn, Matplotlib, Tableau</li>
        <li>Predictive Modeling: Statsmodels, Regression Analysis</li>
        <li>Web Reports: R Markdown-generated HTML</li>
      </ul>
      <p><strong>🔑 Key Contributions:</strong></p>
      <ul>
        <li>Feature selection for key variables affecting house prices.</li>
        <li>Interactive visualizations for geographic price distribution.</li>
        <li>Data preprocessing and transformation for better modeling.</li>
        <li>Exploratory model framework for price prediction.</li>
      </ul>
        <!-- Hidden Details -->
    <!-- Hidden Details -->
      <!-- Buttons -->
      <div class="button-row">
        <a href="https://github.com/ChengWu-Data/Housing-Price-Prediction-An-Exploratory-Analysis.git" class="github-btn">
          <i class="fa-brands fa-github"></i> GitHub Repository
        </a>
        <a href="https://chengwu-data.github.io/Housing_Price_Prediction-AnExploratoryAnalysis.html" class="html-btn">
          <i class="fa-solid fa-file"></i> View HTML Report
        </a>
      </div>
    </div>
  </div>
</div>

<script>
function toggleDetails(id) {
  var details = document.getElementById(id);
  if (details.style.display === "none" || details.style.display === "") {
    details.style.display = "block";
  } else {
    details.style.display = "none";
  }
}
</script>
