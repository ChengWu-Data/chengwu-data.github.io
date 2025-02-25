---
layout: default
permalink: /cv/
title: ""
excerpt: "My academic and professional experience."
author_profile: true
---

<style>
/* Main container */
.cv-container {
  max-width: 900px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

/* Header section */
.cv-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
}

/* Header title */
.cv-header h1 {
  font-size: 1.7rem;
  font-weight: bold;
  color: #6d4195;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}

/* Document Icon */
.cv-header i {
  font-size: 1.5rem;
  color: #6d4195;
}

/* Download button */
.cv-download-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #6d4195;
  color: white;
  font-weight: bold;
  padding: 8px 14px;
  font-size: 0.95rem;
  border-radius: 6px;
  text-decoration: none;
  border: none;
  transition: background 0.3s, transform 0.2s;
}

.cv-download-btn i {
  font-size: 1.2rem;
}

.cv-download-btn:hover {
  background: #4b2a66;
  transform: scale(1.05);
}

/* PDF iframe */
.iframe-wrapper {
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

.cv-preview {
  width: 100%;
  height: 600px;
  border: none;
  border-radius: 8px;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .cv-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .cv-download-btn {
    margin-top: 0.8rem;
    font-size: 0.9rem;
    padding: 7px 12px;
  }

  .cv-header h1 {
    font-size: 1.5rem;
  }
}
</style>

<div class="cv-container">
  <!-- Header -->
  <div class="cv-header">
    <h1>
      <i class="fa-solid fa-file-lines cv-icon"></i> Curriculum Vitae
    </h1>
    <a href="{{ site.baseurl }}/assets/resumes_v_final.pdf" class="cv-download-btn">
      <i class="fa-solid fa-download"></i> Download CV (PDF)
    </a>
  </div>
  
  <style>
/* 让 CV 标题的 Icon 颜色变成白色 */
    .cv-header h1 .cv-icon {
      color: white;
    }
  </style>


  <!-- PDF Preview -->
  <div class="iframe-wrapper">
    <iframe class="cv-preview" src="https://drive.google.com/file/d/1h2T5wiRbZVjhjnDVjj_3m5KJigL6psA2/preview"></iframe>
  </div>
</div>
