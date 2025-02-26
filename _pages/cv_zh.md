---
layout: default
permalink: /zh/cv/
title: ""
excerpt: "我的学术和职业经历。"
author_profile: true
lang: "zh"
---

<style>
/* 主容器 */
.cv-container {
  max-width: 900px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

/* 头部部分 */
.cv-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  gap: 12px;
  margin-bottom: 1rem;
}

/* 标题样式 */
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

/* 文档图标 */
.cv-header i {
  font-size: 1.5rem;
  color: #6d4195;
}

/* 下载按钮 */
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

/* PDF 预览容器 */
.iframe-wrapper {
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

/* PDF 渲染 Canvas */
#pdf-viewer {
  width: 100%;
  max-width: 100%;
  border-radius: 8px;
}

/* 移动端适配 */
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
  <!-- 头部 -->
  <div class="cv-header">
    <h1>
      <i class="fa-solid fa-file-lines"></i> 个人简历
    </h1>
    <a href="{{ site.baseurl }}/assets/resumes zh.pdf" class="cv-download-btn" download="吴骋的简历.pdf">
      <i class="fa-solid fa-download"></i> 下载简历（PDF）
    </a>
  </div>

  <!-- PDF 预览 -->
  <div class="iframe-wrapper">
    <canvas id="pdf-viewer"></canvas>
  </div>
</div>

<!-- 引入 PDF.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.min.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    var url = "{{ site.baseurl }}/assets/resumes zh.pdf"; // 本地 PDF 地址

    var loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function(pdf) {
      pdf.getPage(1).then(function(page) {
        var scale = 1.5;
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
