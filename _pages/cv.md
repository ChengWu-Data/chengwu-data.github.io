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
  flex-wrap: nowrap;
  gap: 12px;
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
  white-space: nowrap;
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
  padding: 6px 12px;
  font-size: 0.9rem;
  border-radius: 6px;
  text-decoration: none;
  border: none;
  transition: background 0.3s, transform 0.2s;
  white-space: nowrap;
}

.cv-download-btn i {
  font-size: 1.2rem;
  color: white !important;
}

.cv-download-btn:hover {
  background: #4b2a66;
  transform: scale(1.05);
}

/* PDF Preview container */
.iframe-wrapper {
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  text-align: center;
}

/* PDF Canvas */
#pdf-viewer {
  width: 100%;
  max-width: 800px;
  display: block;
  margin: auto;
  border-radius: 8px;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .cv-header {
    flex-wrap: nowrap;
    gap: 10px;
  }

  .cv-header h1 {
    font-size: 1.4rem;
  }

  .cv-download-btn {
    font-size: 0.8rem;
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
    <a href="{{ site.baseurl }}/assets/resumes v_final.pdf" class="cv-download-btn" download="Cheng Wu's CV.pdf">
      <i class="fa-solid fa-download"></i> Download CV (PDF)
    </a>
  </div>

  <!-- PDF Preview -->
  <div class="iframe-wrapper">
    <canvas id="pdf-viewer"></canvas>
  </div>
</div>

<!-- 引入 PDF.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.min.js"></script>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    var url = "{{ site.baseurl }}/assets/resumes v_final.pdf"; // PDF 文件路径

    var loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function(pdf) {
      pdf.getPage(1).then(function(page) {
        var scale = 1.5; // 调整缩放比例
        var viewport = page.getViewport({ scale: scale });

        var canvas = document.getElementById('pdf-viewer');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext);
      });
    });
  });
</script>
