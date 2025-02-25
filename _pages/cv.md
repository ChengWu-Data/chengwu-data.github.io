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
  flex-wrap: nowrap;  /* 让内容保持在一行 */
  gap: 12px; /* 适当调整间距 */
  margin-bottom: 1rem;
}

/* Header title */
.cv-header h1 {
  font-size: 1.6rem;
  font-weight: bold;
  color: #6d4195;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  white-space: nowrap; /* 防止文本换行 */
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
  padding: 6px 12px;  /* 调整 padding 让按钮更紧凑 */
  font-size: 0.9rem;  /* 适配小屏幕，避免过大换行 */
  border-radius: 6px;
  text-decoration: none;
  border: none;
  transition: background 0.3s, transform 0.2s;
  white-space: nowrap;  /* 确保按钮文字不换行 */
}

.cv-download-btn i {
  font-size: 1.2rem;
  color: white !important; /* 确保下载图标是白色 */
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
    flex-wrap: nowrap; /* 手机端也保持一行 */
    gap: 10px;  /* 适当减少间距，防止换行 */
  }

  .cv-header h1 {
    font-size: 1.4rem; /* 手机端稍微减小标题字体 */
  }

  .cv-download-btn {
    font-size: 0.8rem; /* 让按钮更紧凑 */
    padding: 5px 10px;
  }
}
</style>

<div class="cv-container">
  <!-- Header -->
  <div class="cv-header">
    <h1>
      <i class="fa-solid fa-file-lines"></i> Curriculum Vitae
    </h1>
    <a href="{{ site.baseurl }}/assets/resumes_v_final.pdf" class="cv-download-btn">
      <i class="fa-solid fa-download"></i> Download CV (PDF)
    </a>
  </div>

  <!-- PDF Preview -->
  <div class="iframe-wrapper">
    <iframe class="cv-preview" src="https://drive.google.com/file/d/1h2T5wiRbZVjhjnDVjj_3m5KJigL6psA2/preview"></iframe>
  </div>
</div>
