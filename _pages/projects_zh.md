---
layout: default
permalink: /zh/projects/
title: "研究项目"
excerpt: "我的研究与专业项目合集。"
author_profile: true
lang: "zh"

---

<style>
/* 页面整体样式 */
.page-content {
  background: #f3e8fd;
  padding: 2rem;
}

/* 项目卡片样式 */
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

/* 移动端适配 */
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

/* 项目图片 */
.project-image {
  width: 200px;
  height: 150px;
  border-radius: 6px;
  object-fit: cover;
  margin-right: 1.5rem;
}

/* 项目内容 */
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

/* 详情按钮 */
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

/* 隐藏详情 */
.project-details {
  display: none;
  background: #fff;
  padding: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  border-radius: 6px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
}

/* 预览框 */
.preview-frame {
  width: 100%;
  height: 450px;
  border: none;
  margin-bottom: 1rem;
  border-radius: 6px;
}

/* 按钮行 */
.button-row {
  display: flex;
  gap: 0.8rem;
}

/* GitHub 按钮 */
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

/* 页面查看按钮 */
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
  <i class="fa-solid fa-folder-open" style="margin-right: 10px;"></i> 我的研究项目
</h1>

<p style="font-size: 0.8rem; color: #777; text-align: center; margin-top: 1rem;">
  ⚠️ 由于研究数据来源和学术需求，研究报告使用英文撰写。
</p>


<!-- 项目 1 -->
<div class="project-card">
  <img src="{{ site.baseurl }}/images/project1.jpg" alt="Project Image" class="project-image">
  <div class="project-content">
    <div class="project-title">房价预测：数据探索与建模分析</div>
    <p class="project-description">
      本研究通过数据挖掘、统计建模和机器学习方法，分析房产属性对房价的影响。主要技术包括数据预处理（Pandas、NumPy）、可视化分析（Matplotlib、Seaborn）、特征工程，以及使用回归模型（线性回归、XGBoost、随机森林）进行价格预测和误差评估。
    </p>
    <button class="details-btn" onclick="toggleDetails('project1')">查看详情</button>
  </div>
</div>

<!-- 详情 -->
<div id="project1" class="project-details">
  <iframe class="preview-frame" src="https://htmlpreview.github.io/?https://github.com/ChengWu-Data/Housing-Price-Prediction-An-Exploratory-Analysis/blob/8a49d8ae0d2514d014c7d304ea081a2002fbd0f4/Housing_Price_Prediction-AnExploratoryAnalysis.html"></iframe>

  <div class="button-row">
    <a href="https://github.com/ChengWu-Data/Housing-Price-Prediction-An-Exploratory-Analysis.git" class="github-btn">
      <i class="fa-brands fa-github"></i> GitHub
    </a>
    <a href="{{ site.baseurl }}/assets/Housing_Price_Prediction-AnExploratoryAnalysis.html" class="html-btn">
      <i class="fa-solid fa-file"></i> 查看页面
    </a>
  </div>
</div>

<!-- 项目 2 -->
<div class="project-card">
  <img src="{{ site.baseurl }}/images/project2.jpg" alt="Project Image" class="project-image">
  <div class="project-content">
    <div class="project-title">社会经济因素与犯罪率分析</div>
    <p class="project-description">
      该研究探讨社会经济变量（如收入水平、失业率、教育程度）如何影响犯罪趋势，采用回归分析、地理信息系统（GIS）、时间序列建模（ARIMA）、随机森林等方法，结合数据可视化技术（Plotly、Tableau）揭示犯罪率的经济影响因素。
    </p>
    <button class="details-btn" onclick="toggleDetails('project2')">查看详情</button>
  </div>
</div>

<!-- 详情 -->
<!-- 详情 -->
<div id="project2" class="project-details">
  <!-- PDF 本地预览 -->
  <div class="iframe-wrapper">
    <canvas id="pdf-viewer-project2" class="pdf-canvas"></canvas>
  </div>

  <!-- 按钮 -->
  <div class="button-row">
    <a href="{{ site.baseurl }}/assets/480.pdf" class="html-btn" download="项目2_研究报告.pdf">
      <i class="fa-solid fa-download"></i> 下载 PDF
    </a>
    <a href="{{ site.baseurl }}/assets/480.pdf" class="html-btn" target="_blank">
      <i class="fa-solid fa-file-pdf"></i> 在线查看
    </a>
  </div>
</div>

<!-- 调整 PDF.js 预览尺寸 -->
<style>
  .iframe-wrapper {
    width: 100%;
    max-width: 700px; /* 限制最大宽度，防止超出 */
    margin: 0 auto;
    text-align: center;
  }

  .pdf-canvas {
    width: 100% !important;  /* 让 PDF 适应容器宽度 */
    max-width: 600px; /* 限制最大宽度 */
    height: auto; /* 保持比例 */
    display: block;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .iframe-wrapper {
      max-width: 100%; /* 让移动端适应屏幕 */
    }
    .pdf-canvas {
      max-width: 100%; /* 确保 PDF 不会超出 */
    }
  }
</style>

<!-- 引入 PDF.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.min.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    var url = "{{ site.baseurl }}/assets/480.pdf"; // 本地 PDF 地址

    var loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function(pdf) {
      pdf.getPage(1).then(function(page) {
        var scale = 1.2; // 缩小比例，防止过大
        var viewport = page.getViewport({ scale: scale });

        var canvas = document.getElementById('pdf-viewer-project2');
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


<!-- Project 3: FollowerJP Final Project for Japanese Ikebana Course -->
<div class="project-card">
  <img src="{{ site.baseurl }}/images/project3.jpg" alt="Project Image" class="project-image">
  <div class="project-content">
    <div class="project-title">我的日式插花课程作品网站</div>
    <p class="project-description">
      该网站是我为插花课程的期末项目开发的。它展示了多种先进的前端技术，包括复杂的 CSS 动画、交互式 JavaScript 效果、HTML5 背景音乐集成，以及自动适应暗/亮模式的响应式设计。该项目充分利用了 CSS3 转场效果、媒体查询、JavaScript 的动态 UI 增强以及 HTML5 音频 API，让读者能与我一同踏上插花之旅！<a href="https://github.com/ChengWu-Data/followerJP" target="_blank" style="color:#6d4195;">Github</a>.
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
      <i class="fa-solid fa-globe"></i> 访问我的网站
    </a>
  </div>
</div>



<script>
function toggleDetails(id) {
  var details = document.getElementById(id);

  if (details.style.display === "none" || details.style.display === "") {
    details.style.display = "block";
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
