---
layout: default
permalink: /cv/
title: ""
excerpt: "My academic and professional experience."
author_profile: true
---

<style>
/* Main container for CV section */
.cv-container {
  max-width: 900px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

/* Header section: aligns title & button */
.cv-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

/* Header title */
.cv-header h1 {
  font-size: 1.8rem;
  color: #6d4195;
  margin: 0;
}

/* Download button styling */
.cv-download-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #6d4195; /* Purple background */
  color: white;
  font-weight: bold;
  padding: 10px 16px;
  font-size: 1rem;
  border-radius: 8px;
  text-decoration: none;
  border: none;
  transition: background 0.3s, transform 0.2s;
}

.cv-download-btn i {
  font-size: 1.2rem;
}

.cv-download-btn:hover {
  background: #4b2a66; /* Slightly darker purple */
  transform: scale(1.05);
}

/* PDF iframe container */
.iframe-wrapper {
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

/* PDF preview */
.cv-preview {
  width: 100%;
  height: 600px;
  border: none;
  border-radius: 8px;
}
</style>

<div class="cv-container">
  <!-- Header with Title & Download Button -->
  <div class="cv-header">
    <h1>📄 Curriculum Vitae </h1>
    <a href="{{ site.baseurl }}/assets/resumes_v_final.pdf" class="cv-download-btn">
      <i class="fa-solid fa-download"></i> Download CV (PDF)
    </a>
  </div>

  <!-- PDF Preview -->
  <div class="iframe-wrapper">
    <iframe class="cv-preview" src="https://drive.google.com/file/d/1h2T5wiRbZVjhjnDVjj_3m5KJigL6psA2/preview"></iframe>
  </div>
</div>
