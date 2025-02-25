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

/* Hidden Details */
.project-details {
  display: none;
  background: #fff;
  padding: 1.2rem;
  margin-top: 1rem;
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

<h1 style="text-align: center; color: #6d4195;">
  &#128193; My Projects
</h1>

<!-- Project 1 -->
<div class="project-card">
  <img src="{{ site.baseurl }}/images/project1.jpg" alt="Project Image" class="project-image">
  <div class="project-content">
    <div class="project-title">Housing Price Prediction: An Exploratory Analysis</div>
    <p class="project-description">Exploring the relationship between housing attributes and sale prices through extensive exploratory data analysis, visualization, and predictive modeling.</p>
    <button class="details-btn" onclick="toggleDetails('project1')">View Details</button>
  </div>
</div>

<!-- Hidden Details -->
<div id="project1" class="project-details">
  <!-- Embedded HTML Preview -->
  <iframe class="preview-frame" src="https://htmlpreview.github.io/?https://github.com/ChengWu-Data/Housing-Price-Prediction-An-Exploratory-Analysis/blob/8a49d8ae0d2514d014c7d304ea081a2002fbd0f4/Housing_Price_Prediction-AnExploratoryAnalysis.html"></iframe>

  <!-- Small Buttons -->
  <div class="button-row">
    <a href="https://github.com/ChengWu-Data/Housing-Price-Prediction-An-Exploratory-Analysis.git" class="github-btn">
      <i class="fa-brands fa-github"></i> GitHub
    </a>
    <a href="https://chengwu-data.github.io/Housing_Price_Prediction-AnExploratoryAnalysis.html" class="html-btn">
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
      Exploring the link between socioeconomic attributes and crime rates, this study uses data-driven analysis 
      to investigate how economic conditions influence crime trends.
    </p>
    <button class="details-btn" onclick="toggleDetails('project2')">View Details</button>
  </div>
</div>

<!-- Hidden Details -->
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


