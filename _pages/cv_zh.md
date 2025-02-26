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
  flex-wrap: nowrap;  /* 保持内容在一行 */
  gap: 12px; /* 适当调整间距 */
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
  white-space: nowrap; /* 防止文本换行 */
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
  color: white !important; /* 确保下载图标为白色 */
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

.cv-preview {
  width: 100%;
  height: 600px;
  border: none;
  border-radius: 8px;
}

/* 移动端适配 */
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
  <!-- 头部 -->
  <div class="cv-header">
    <h1>
      <i class="fa-solid fa-file-lines"></i> 个人简历
    </h1>
    <a href="{{ site.baseurl }}/assets/resumes zh.pdf" class="cv-download-btn">
      <i class="fa-solid fa-download"></i> 下载简历（PDF）
    </a>
  </div>

  <!-- PDF 预览 -->
  <div class="iframe-wrapper">
    <iframe class="cv-preview" src=""></iframe>
  </div>
</div>
