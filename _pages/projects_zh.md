---
layout: default
permalink: /zh/projects/
title: "研究项目"
excerpt: "我的研究与专业项目合集。"
author_profile: true
lang: "zh"
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

/* Ikebana gallery */
.photo-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.project-photo {
  width: 100%;
  border-radius: 6px;
  object-fit: cover;
}
</style>

<h1 style="display: flex; align-items: center; font-size: 2rem; color: #6d4195; margin-bottom: 1.5rem; text-align: left;">
  <i class="fa-solid fa-folder-open" style="margin-right: 10px;"></i> 我的研究项目
</h1>

<!-- Project 0: Exponential Smoothing FX Trend Strategy -->
<div class="project-card">
  <img src="{{ site.baseurl }}/images/project_fx.jpg" alt="FX Project Image" class="project-image">
  
  <div class="project-content">
    <div class="project-title">基于指数平滑的外汇趋势交易策略（USD/CAD）</div>
    <p class="project-description">
      一个<strong>完全可复现的量化研究项目</strong>，围绕 USD/CAD 汇率趋势持续性，构建基于双指数平滑（Dual ES）的完整预测与交易流水线：
      信号工程、α–β 参数调优、多空非对称性检验、缓冲区与减速退出实验、回测评估、夏普比率测算以及逐笔交易级准确率分析。
      <br><br>
      项目系统呈现了我在 <strong>量化分析、数据科学工作流设计、数学建模、统计推断与技术沟通</strong> 方面的能力。
    </p>

    <button class="details-btn" onclick="toggleDetails('project_fx')">查看详情</button>
  </div>
</div>

<!-- Hidden Details for FX Project -->
<div id="project_fx" class="project-details">

  <!-- 🎯 Problem Section -->
  <div class="project-problem">
    <strong>研究问题：</strong> 许多简单的外汇趋势跟随规则在“玩具级回测”中表现亮眼，但当我们改变参数、市场或退出规则时往往迅速失效。
    本项目希望设计一个 <em>参数化且稳健</em> 的双指数平滑系统，并弄清楚：在什么条件下，“双 ES 交叉”是真正有用的信号，而不是噪声。
  </div>
  
  <!-- 🔥 Summary Section -->
  <div class="project-summary" style="background:#faf7ff; padding:1.5rem; border-radius:8px; margin-bottom:1.5rem; border-left:4px solid #6d4195;">
    <h2 style="color:#6d4195;">📌 项目总结</h2>

    <p><strong>目标：</strong> 为 USD/CAD 构建一个基于双指数平滑（ESα, ESβ）的趋势跟随交易系统，并评估多空对称性、参数敏感性及退出逻辑。</p>

    <p><strong>方法与流水线：</strong></p>
    <ul>
      <li>基于 α &lt; β 的双 ES 交叉趋势信号</li>
      <li>对 α、β 进行网格搜索与稳健性分析</li>
      <li>分别评估多头 / 空头策略的最优参数与表现差异</li>
      <li>设计并测试“价格距离缓冲区”“动量减速退出”等退出机制</li>
      <li>以逐笔交易为单位汇总收益、胜率与回撤，而不仅是日度收益</li>
    </ul>

    <p><strong>关键结果：</strong></p>
    <ul>
      <li>最优参数：<code>α = 0.20</code>，<code>β = 0.60</code></li>
      <li>策略夏普比率从 <strong>0.26 提升至 0.45</strong></li>
      <li>逐笔交易胜率约 <strong>73%</strong></li>
      <li>引入距离缓冲与减速退出后，整体收益和风险调整表现 <strong>反而下降</strong></li>
    </ul>

    <p><strong>展现能力：</strong></p>
    <ul>
      <li>以研究思维搭建完整量化策略生命周期（信号 → 参数 → 回测 → 诊断）</li>
      <li>不只看“好看曲线”，而是关注稳健性、解释性和可推广性</li>
      <li>能将技术细节整理成面向 PM / 风控 / 同行研究者的清晰报告</li>
    </ul>

    <p style="font-style:italic; color:#444;">完整技术报告见下方嵌入文档。</p>
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
      <i class="fa-solid fa-file-pdf"></i> 查看报告
    </a>
  </div>

</div>

<!-- Project 5: MultiDocRAG -->
<div class="project-card">
  <img src="{{ site.baseurl }}/images/MultiDocRAG_cover.jpg" alt="MultiDocRAG Cover Image" class="project-image">
  
  <div class="project-content">
    <div class="project-title">MultiDocRAG：多文档检索增强推理系统</div>
    <p class="project-description">
      一个面向<strong>多文档场景</strong>的全栈检索增强生成（RAG）系统，可对多份上传 PDF 进行跨文档推理。
      系统支持可扩展的文档摄入、语义分块、向量检索、透明的证据展示以及自动化评估框架。
      本项目体现了我在 <strong>LLM 工程、应用机器学习、数据管道设计、评估方法论以及端到端产品原型设计</strong> 方面的能力。
    </p>

    <button class="details-btn" onclick="toggleDetails('project_multidoc')">查看详情</button>
  </div>
</div>


<!-- Hidden Details for MultiDocRAG Project -->
<div id="project_multidoc" class="project-details">

  <!-- 🎯 Problem Section -->
  <div class="project-problem">
    <strong>研究问题：</strong> 传统 RAG 流水线更适合<strong>单文档检索</strong>，而现实任务往往要求在
    <strong>多份报告 / 文献 / 政策文件之间综合证据</strong>。MultiDocRAG 旨在构建一个能够进行跨文档对比、
    证据融合与可解释推理的检索与生成系统。
  </div>


  <!-- 🔥 Summary Section -->
  <div class="project-summary" style="background:#faf7ff; padding:1.5rem; border-radius:8px; margin-bottom:1.5rem; border-left:4px solid #6d4195;">
    <h2 style="color:#6d4195;">📌 项目总结</h2>

    <p><strong>目标：</strong> 构建一个可以进行<strong>跨文档综合</strong>的 AI 助手，以多份 PDF 为知识源，给出有证据支撑且可追溯的回答。</p>

    <p><strong>系统设计：</strong></p>
    <ul>
      <li>多 PDF 文档上传、清洗与规范化处理</li>
      <li>滑窗式语义分块 + 重叠区设计，避免上下文割裂</li>
      <li>基于 Sentence-Transformers 的向量嵌入，使用 FAISS 进行高效检索</li>
      <li>检索结果带相似度得分与原文片段，支持用户检查证据</li>
      <li>LLM 推理层采用“有证据生成 + 安全拒答”策略，避免胡编乱造</li>
      <li>自动评估框架，从正确性、证据支撑和拒答安全性三个维度打分</li>
      <li>基于 Streamlit 的 Demo 页面，支持上传文件、查看检索结果及完整提示词</li>
    </ul>

    <p><strong>应用场景：</strong></p>
    <ul>
      <li>科研与政策报告的跨文档信息整合与对比</li>
      <li>商业 / 行业情报分析（多国法规、多家机构报告并行）</li>
      <li>大型技术文档与 API 文档的问答系统</li>
      <li>自动化文献综述与综述草稿生成</li>
    </ul>

    <p><strong>我在项目中的能力体现：</strong></p>
    <ul>
      <li>从零设计并落地完整 ML / LLM 系统，而不仅是单一模型</li>
      <li>对数据工程链路（清洗 → 分块 → 嵌入 → 检索）的细节有实战经验</li>
      <li>能主动设计评估方法而不是只凭“感觉好用”</li>
      <li>具备将技术系统包装成对用户友好的工具 / 产品原型的能力</li>
    </ul>

    <p><strong>当前进展：</strong></p>
    <ul>
      <li>文档摄入、语义分块与向量检索模块已稳定运行</li>
      <li>LLM 推理模块已接入记忆与拒答逻辑</li>
      <li>基于 27 个问题的自动评测数据集已完成并跑通</li>
      <li>Demo 已部署在 HuggingFace Spaces，完整报告可下载</li>
    </ul>

    <p style="font-style:italic; color:#444;">项目仍在持续迭代中，包括 rerank 策略、模型替换与失败案例系统分析等。</p>
  </div>

  <!-- 🔗 Buttons -->
  <div class="button-row">
    <a href="https://github.com/ChengWu-Data/MultiDocRAG" 
       class="github-btn" target="_blank">
      <i class="fa-brands fa-github"></i> GitHub
    </a>

    <a href="https://chengwu1210-multidocrag.hf.space/" 
       class="html-btn" target="_blank">
      <i class="fa-solid fa-globe"></i> 网站展示
    </a>

    <a href="https://drive.google.com/file/d/1cJG3CEvquydOJhJv0aWaZ4-eonIwfNJi/view?usp=sharing" 
       class="html-btn" target="_blank">
      <i class="fa-solid fa-file-code"></i> 查看报告
    </a>
  </div>

</div>



<!-- Project 1: Housing Price Prediction -->
<div class="project-card">
  <img src="{{ site.baseurl }}/images/project1.jpg" alt="Housing Project Image" class="project-image">
  
  <div class="project-content">
    <div class="project-title">房价预测：探索性分析与可解释建模</div>
    <p class="project-description">
      基于 Ames 房价数据构建完整预测流水线：从探索性数据分析、特征工程，到岭回归、LASSO、随机森林、Group LASSO 等多种模型。
      在获得较强预测精度的同时，更关注于回答一个现实问题：<strong>到底是什么在驱动房价？</strong><br><br>
      项目强调模型的可解释性与面向非技术决策者的沟通，将高维数据转化为开发商、购房者、银行等可以直接使用的决策信息。
    </p>

    <button class="details-btn" onclick="toggleDetails('project1')">查看详情</button>
  </div>
</div>

<!-- Hidden Details for Project 1 -->
<div id="project1" class="project-details">

  <!-- 🎯 Problem Section -->
  <div class="project-problem">
    <strong>研究问题：</strong> 许多房价模型只追求评分与榜单，但很少真正回答“价值从何而来”这一现实问题。
    对于买家、开发商或银行而言，比起一个黑箱预测，更需要的是对<strong>面积、质量、小区与时间效应等变量的可解释分解</strong>。
  </div>

  <!-- 🔥 Summary Section -->
  <div class="project-summary" style="background:#faf7ff; padding:1.5rem; border-radius:8px; margin-bottom:1.5rem; border-left:4px solid #6d4195;">
    <h2 style="color:#6d4195;">📌 项目总结</h2>

    <p><strong>目标：</strong> 不仅仅是训练一个“准确”的房价模型，而是构建一个可解释的房产分析流水线，清晰识别驱动价值的经济因素。</p>

    <p><strong>方法：</strong> 以 80+ 变量的 Ames 数据为起点，主要步骤包括：</p>
    <ul>
      <li>区分 <strong>数值型 / 分类型</strong> 自变量，并对 <code>OverallQual</code>、<code>MoSold</code> 等变量进行有序重编码</li>
      <li>通过 <strong>相关性 + 效应量（η²）</strong> 评估变量重要性</li>
      <li>利用 <strong>调整后 GVIF</strong> 控制多重共线性</li>
      <li>构建岭回归、LASSO、随机森林与 Group LASSO 等模型进行对比</li>
      <li>制作热力图、社区地图、STL 趋势分解等可视化用于结果解释</li>
    </ul>

    <p><strong>关键发现：</strong></p>
    <ul>
      <li><strong>面积与建造质量是核心价值驱动因素</strong>（如 <code>GrLivArea</code>、<code>TotalBsmtSF</code>、<code>OverallQual</code>）</li>
      <li>在控制房屋属性后，<strong>社区 / 邻里效应仍然显著存在</strong></li>
      <li>车库配置、外立面材质等形成第二梯队但仍重要的增值因素</li>
      <li>时间结构与宏观事件高度相关，例如次贷危机与税收激励时期的价格波动</li>
    </ul>

    <p><strong>能力体现：</strong></p>
    <ul>
      <li>能够将原始市政/交易数据清理并转化为<strong>可用于决策的分析结果</strong></li>
      <li>贯通 <strong>EDA → 特征工程 → 建模 → 可视化解释 → 业务沟通</strong> 的完整链路</li>
      <li>方法论可平移至定价、风险建模与其他应用型分析场景</li>
    </ul>

    <p style="font-style:italic; color:#444;">完整交互式分析见下方 HTML 报告。</p>
  </div>

  <!-- 🔽 Embedded HTML Preview -->
  <iframe class="preview-frame" src="https://htmlpreview.github.io/?https://github.com/ChengWu-Data/Housing-Price-Prediction-An-Exploratory-Analysis/blob/8a49d8ae0d2514d014c7d304ea081a2002fbd0f4/Housing_Price_Prediction-AnExploratoryAnalysis.html"></iframe>

  <!-- 🔗 Buttons -->
  <div class="button-row">
    <a href="https://github.com/ChengWu-Data/Housing-Price-Prediction-An-Exploratory-Analysis.git" class="github-btn" target="_blank">
      <i class="fa-brands fa-github"></i> GitHub
    </a>
    <a href="{{ site.baseurl }}/assets/Housing_Price_Prediction-AnExploratoryAnalysis.html" class="html-btn" target="_blank">
      <i class="fa-solid fa-file"></i> 查看页面
    </a>
  </div>

</div>

<!-- Project 2 -->
<div class="project-card">
  <img src="{{ site.baseurl }}/images/project2.jpg" alt="Project Image" class="project-image">
  <div class="project-content">
    <div class="project-title">旧金山犯罪率的社会经济驱动因素分析</div>
    <p class="project-description">
      构建覆盖 90 万+ 警情记录与 ACS 社会经济数据的大规模空间计量经济学分析流水线，将 SF 警方案件数据与普查局分区面板数据进行整合。
      通过固定效应逻辑回归、Poisson / 负二项计数模型以及时间序列预测，定量刻画收入不平等、失业率与流动性模式如何影响犯罪趋势。
      <br><br>
      项目展示了我在 <strong>因果推断、纵向面板建模、数据整合与政策分析</strong> 方面的能力，这些方法亦可迁移至商业预测与复杂系统建模。
    </p>
    <button class="details-btn" onclick="toggleDetails('project2')">查看详情</button>
  </div>
</div>


<!-- Hidden Details for Project 2 -->
<div id="project2" class="project-details">

  <!-- 🎯 Problem Section -->
  <div class="project-problem">
    <strong>研究问题：</strong> 城市治理与规划部门常将犯罪视为“经济问题”，但在控制居住地点与流动模式之后，
    收入不平等、失业等指标是否仍然具有解释力，其实并不清晰。本项目通过构建<strong>社区 × 年度</strong>的面板数据，
    从数据层面检验这一叙事是否成立。
  </div>

  <!-- 🔥 Summary Section -->
  <div class="project-summary" style="background:#faf7ff; padding:1.5rem; border-radius:8px; margin-bottom:1.5rem; border-left:4px solid #6d4195;">
    <h2 style="color:#6d4195;">📌 项目总结</h2>

    <p><strong>目标：</strong> 定量评估犯罪模式是否由经济因素驱动，例如收入不平等、失业率、通勤方式与人口结构变化等。</p>

    <p><strong>数据与流水线：</strong></p>
    <ul>
      <li>将 913,732 条案件级犯罪记录与 2017–2022 年 ACS 社区级社会经济数据进行空间匹配与面板构建</li>
      <li>面板结构：<strong>census tract × 年度</strong></li>
      <li>模型：固定效应逻辑回归（个体级）、Poisson / 负二项（区级计数）</li>
      <li>时间序列预测：ARIMAX / SARIMAX，捕捉经济与季节性因素</li>
      <li>构造经济指标增量与流动性特征（公共交通使用率、通勤方式等）</li>
    </ul>

    <p><strong>主要结论：</strong></p>
    <ul>
      <li>公共交通与骑行比例越高的区域，多个犯罪类别的发生率<strong>持续上升</strong></li>
      <li>在控制空间与人口密度后，收入不平等与失业率对犯罪的影响呈现<strong>反直觉的负相关</strong>，提示存在较强城市结构混淆</li>
      <li>本科及以上教育占比提升会<strong>降低暴力与治安类犯罪</strong>，但与财产犯罪存在正向关联</li>
      <li>疫情期间：公共秩序类犯罪下降，财产类犯罪上升，反映线下活动与居家模式的改变</li>
    </ul>

    <p><strong>方法论启示（可迁移性）：</strong></p>
    <ul>
      <li>面板模型相对个体模型在结构解释上更稳健，这一点对商业与运营场景同样重要</li>
      <li>在存在过度离散时，负二项模型显著优于 Poisson，这一逻辑可直接用于运营指标与需求预测</li>
      <li>流动性与密度往往比单纯的收入/失业等经济指标更具预测力</li>
    </ul>

    <p style="font-style:italic; color:#444;">完整模型设定与回归表见下方报告。</p>
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
      <i class="fa-solid fa-file-pdf"></i> 查看报告
    </a>
  </div>

</div>



<!-- Project 3: Ikebana Portfolio Site -->
<div class="project-card">
  <img src="{{ site.baseurl }}/images/project3.jpg" alt="Ikebana Site Image" class="project-image">
  <div class="project-content">
    <div class="project-title">Ikebana Portfolio — 沉浸式前端作品集微站</div>
    <p class="project-description">
      一个完全手写的单页微型网站，将日式插花课程作品集转化为一个沉浸式数字体验。
      整站不依赖框架，从布局、动画到交互与背景音乐均由我独立设计与实现。
      <br><br>
      项目展示了我在 <strong>前端工程、交互设计、信息层级与体验「最后一公里」</strong> 等方面的关注，而不仅是静态页面堆叠。
    </p>
    <button class="details-btn" onclick="toggleDetails('project3')">查看详情</button>
  </div>
</div>

<!-- Hidden Details for Project 3 -->
<div id="project3" class="project-details">

  <!-- 🎯 Problem Section -->
  <div class="project-problem">
    <strong>思考起点：</strong> 大部分创作类作品集要么是模板堆图，要么是常规网格。
    我希望尝试把一次 Ikebana 课程作业，做成一个<strong>更接近完整产品体验</strong>的小型网站：
    有节奏、有动效、有声音，而不是简单“上传几张照片”。
  </div>

  <!-- 🔥 Summary Section -->
  <div class="project-summary" style="background:#faf7ff; padding:1.5rem; border-radius:8px; margin-bottom:1.5rem; border-left:4px solid #6d4195;">
    <h2 style="color:#6d4195;">📌 项目总结</h2>

    <p><strong>目标：</strong> 设计并实现一个小而完整的 Web 体验，用流畅的过渡、响应式布局与环境音效，让插花作品像一个“被精心陈列的产品”，而非普通代码作业。</p>

    <p><strong>实现内容：</strong></p>
    <ul>
      <li>从零搭建的响应式单页网站，适配多终端与深浅色环境</li>
      <li>完全基于 CSS 的动画系统（进入动效、悬停反馈、文本渐显），不依赖外部动画库</li>
      <li>JavaScript 控制导航、滚动效果与 HTML5 音频播放，实现视听联动</li>
      <li>布局上平衡摄影、文字与留白，使整体更像策展叙事而非单纯技术展示</li>
    </ul>

    <p><strong>与我其他工作的关联：</strong></p>
    <ul>
      <li>证明我可以从 <strong>概念 → 体验结构 → 视觉 → 代码实现</strong> 全流程独立推进</li>
      <li>很多设计思路可直接复用到<strong>分析看板、内部工具、业务可视化界面</strong>上</li>
      <li>体现我对“数据/模型如何被人真正感知和使用”的重视，而不是停在模型本身</li>
    </ul>

    <p style="font-style:italic; color:#444;">下方为网站部分截图，实际体验可访问 Demo 链接。</p>
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
      <i class="fa-solid fa-globe"></i> 访问网站
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

