/*
 * Small, purposeful motion — not decoration for its own sake:
 *  - hero stat numbers count up once, when they scroll into view
 *  - the before/after bars in each metric-chart grow to their real value
 *  - cards fade in as you scroll to them
 * Everything here is progressive enhancement: if JS fails, every number,
 * bar and card is already showing its correct final state in the HTML.
 * Respects prefers-reduced-motion.
 *
 * Safety net: a fast scroll jump (anchor link, Page Down, etc.) can carry
 * an element straight past the viewport without ever registering as
 * "intersecting", which would otherwise leave it stuck at opacity:0 or
 * width:0 forever. A short fallback timer force-resolves anything the
 * observer hasn't caught yet, so nothing can end up permanently hidden.
 */
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function countUp(el) {
    if (el.dataset.cwDone) return;
    el.dataset.cwDone = '1';
    var raw = el.textContent.trim();
    var match = raw.match(/^([\d.]+)(.*)$/);
    if (!match) return;
    var target = parseFloat(match[1]);
    var suffix = match[2] || '';
    var decimals = (match[1].split('.')[1] || '').length;
    var duration = 900;
    var start = null;

    function frame(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var value = target * easeOutExpo(progress);
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = target.toFixed(decimals) + suffix;
      }
    }
    requestAnimationFrame(frame);
  }

  function growBar(el) {
    if (el.dataset.cwDone) return;
    el.dataset.cwDone = '1';
    var target = el.style.width;
    if (!target) return;
    el.style.width = '0%';
    // force reflow so the transition actually runs from 0
    void el.offsetWidth;
    requestAnimationFrame(function () {
      el.style.width = target;
    });
  }

  function reveal(el) {
    if (el.dataset.cwDone) return;
    el.dataset.cwDone = '1';
    el.classList.add('is-visible');
  }

  function resolveTarget(el) {
    if (el.classList.contains('cw-stats')) {
      el.querySelectorAll('.cw-stat b').forEach(countUp);
    } else if (el.classList.contains('metric-chart')) {
      el.querySelectorAll('.metric-chart-bar').forEach(growBar);
    } else {
      reveal(el);
    }
  }

  // Home page mascot: the dog sits fixed in the bottom-right corner and
  // runs in once (pure CSS) shortly after load. Click/tap it and it
  // digs — a short dig-loop plays on the dog's own image, then it
  // spits the found item out of its mouth onto the ground, where it
  // lands with a bounce and carries a short label on its own blank
  // plaque. Tap the landed item to zoom in on the full text (and, for
  // project finds, a real link) in a clearly readable card. Pure
  // decoration on top of a page that's already complete without JS or
  // images. Each entry has a short label (what fits on the tiny
  // plaque) and a full line (shown once zoomed in).
  var CW_DIG_ITEMS = {
    en: {
      bone: {
        weight: 55,
        dogImg: 'dog-idle.png',
        icon: 'tag-bone.png',
        entries: [
          { short: '25% less review', full: 'Cut review workload ~25% across 7 systems.' },
          { short: '10K+ customers', full: 'Segmented 10K+ customers for a real conversion lift.' },
          { short: 'Attrition -19%', full: 'Models that helped cut attrition by ~19%.' },
          { short: 'Columbia · quant', full: 'Columbia data science, ex-quant research.' },
          { short: "It's Cheng's dog", full: "I'm Cheng's dog — she built this whole site herself." },
          { short: '2 deg · 6 shipped', full: '2 degrees, 6 shipped projects.' }
        ]
      },
      gift: {
        weight: 30,
        dogImg: 'dog-idle.png',
        icon: 'tag-gift.png',
        entries: [
          { short: 'FX', lead: 'Built an FX trend strategy.', linkText: 'Take a look →', href: '/projects/#card-project_fx' },
          { short: 'RAG', lead: 'Curious about MultiDocRAG?', linkText: 'Check it out →', href: '/projects/#card-project_multidoc' },
          { short: 'IRIS', lead: 'Built an iris recognition system.', linkText: 'See how →', href: '/projects/#card-project_iris' }
        ]
      },
      can: {
        weight: 15,
        dogImg: 'dog-sad.png',
        icon: 'tag-can.png',
        entries: [
          { short: 'meh', full: 'I dug up... nothing. Sorry about that.' },
          { short: 'dirt', full: 'Just dirt. Worth a shot though.' },
          { short: 'oops', full: 'Okay, that one’s on me.' },
          { short: 'nope', full: 'Nope. Try again later?' }
        ]
      }
    },
    zh: {
      bone: {
        weight: 55,
        dogImg: 'dog-idle.png',
        icon: 'tag-bone.png',
        entries: [
          { short: '审核-25%', full: '帮 7 个系统把审核量降了约 25%。' },
          { short: '万级分群', full: '为 1 万+ 客户做分群，带来了实打实的转化提升。' },
          { short: '流失降19%', full: '用模型把流失率降了约 19%。' },
          { short: '哥大', full: '哥伦比亚大学数据科学，做过量化研究。' },
          { short: '这是吴骋的狗', full: '我是吴骋的狗，这个网站是她自己搭的。' },
          { short: '2学位 6项目', full: '2 个学位，6 个上线项目。' }
        ]
      },
      gift: {
        weight: 30,
        dogImg: 'dog-idle.png',
        icon: 'tag-gift.png',
        entries: [
          { short: 'FX', lead: '做过一个外汇趋势交易策略。', linkText: '看看 →', href: '/zh/projects/#card-project_fx' },
          { short: 'RAG', lead: '对 MultiDocRAG 感兴趣？', linkText: '了解一下 →', href: '/zh/projects/#card-project_multidoc' },
          { short: 'IRIS', lead: '做过一个虹膜识别系统。', linkText: '看看怎么做的 →', href: '/zh/projects/#card-project_iris' }
        ]
      },
      can: {
        weight: 15,
        dogImg: 'dog-sad.png',
        icon: 'tag-can.png',
        entries: [
          { short: '呃', full: '挖到的是……什么都没有，不好意思。' },
          { short: '土', full: '只有土，不过值得一试。' },
          { short: '错', full: '这个我认。' },
          { short: '空', full: '没挖到，要不再试一次？' }
        ]
      }
    }
  };

  function weightedPick(pools) {
    var keys = Object.keys(pools);
    var total = keys.reduce(function (sum, k) { return sum + pools[k].weight; }, 0);
    var r = Math.random() * total;
    for (var i = 0; i < keys.length; i++) {
      r -= pools[keys[i]].weight;
      if (r <= 0) return keys[i];
    }
    return keys[keys.length - 1];
  }

  function setupDogDig() {
    var dogBtn = document.getElementById('cw-dog-dig');
    var dogImg = document.getElementById('cw-dog-dig-img');
    var hint = document.getElementById('cw-dig-hint');
    var item = document.getElementById('cw-dig-item');
    var itemImg = document.getElementById('cw-dig-item-img');
    var zoom = document.getElementById('cw-dig-zoom');
    var zoomBackdrop = document.getElementById('cw-dig-zoom-backdrop');
    var zoomItemWrap = document.getElementById('cw-dig-zoom-item-wrap');
    var zoomImg = document.getElementById('cw-dig-zoom-img');
    var zoomItemText = document.getElementById('cw-dig-zoom-item-text');
    var zoomText = document.getElementById('cw-dig-zoom-text');
    if (!dogBtn || !dogImg || !hint || !item || !itemImg || !zoom || !zoomBackdrop || !zoomItemWrap || !zoomImg || !zoomItemText || !zoomText) return;

    var lang = document.documentElement.lang === 'zh' ? 'zh' : 'en';
    var pools = CW_DIG_ITEMS[lang];
    var base = dogImg.getAttribute('src').replace(/dog-idle\.png$/, '');
    var busy = false;
    var currentKind = null;
    var currentEntry = null;
    var currentIcon = null;
    var revertTimer = null;

    // While the zoom card is open, the landed item's auto-revert is
    // paused (so it can't disappear out from under someone reading);
    // closing the zoom gives it one short grace window instead.
    function scheduleRevert(delay) {
      if (revertTimer) clearTimeout(revertTimer);
      revertTimer = setTimeout(function () {
        revertTimer = null;
        revert();
        busy = false;
      }, delay);
    }

    function openZoom() {
      if (!currentEntry) return;
      hint.classList.remove('is-visible');
      zoomItemWrap.setAttribute('data-item', currentKind);
      zoomImg.src = currentIcon;
      zoomItemText.textContent = currentEntry.short;
      zoomText.textContent = '';
      if (currentEntry.href) {
        zoomText.appendChild(document.createTextNode(currentEntry.lead + ' '));
        var link = document.createElement('a');
        link.href = currentEntry.href;
        link.textContent = currentEntry.linkText;
        zoomText.appendChild(link);
      } else {
        zoomText.textContent = currentEntry.full;
      }
      zoom.classList.add('is-open');
      if (revertTimer) {
        clearTimeout(revertTimer);
        revertTimer = null;
      }
    }

    function closeZoom() {
      var wasOpen = zoom.classList.contains('is-open');
      zoom.classList.remove('is-open');
      if (wasOpen && busy && !revertTimer) {
        scheduleRevert(1200);
      }
    }

    item.addEventListener('click', openZoom);
    zoomBackdrop.addEventListener('click', closeZoom);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeZoom();
    });

    function showItem(kind) {
      var pool = pools[kind];
      var entry = pool.entries[Math.floor(Math.random() * pool.entries.length)];
      currentKind = kind;
      currentEntry = entry;
      currentIcon = base + pool.icon;

      item.setAttribute('data-item', kind);
      itemImg.src = currentIcon;
      dogImg.src = base + pool.dogImg;

      item.classList.remove('is-visible');
      hint.classList.remove('is-visible');
      void item.offsetWidth; // restart the land animation even on repeat clicks
      item.classList.add('is-visible');
      hint.classList.add('is-visible');
    }

    function revert() {
      item.classList.remove('is-visible');
      hint.classList.remove('is-visible');
      closeZoom();
      dogImg.src = base + 'dog-idle.png';
    }

    dogBtn.addEventListener('click', function () {
      if (busy) return;
      busy = true;

      var kind = weightedPick(pools);

      if (reduceMotion) {
        showItem(kind);
        scheduleRevert(4200);
        return;
      }

      var frames = ['dog-dig-1.png', 'dog-dig-2.png', 'dog-dig-3.png', 'dog-dig-1.png', 'dog-dig-2.png'];
      var i = 0;
      var digTimer = setInterval(function () {
        dogImg.src = base + frames[i % frames.length];
        dogImg.classList.toggle('is-bump');
        i++;
      }, 120);

      setTimeout(function () {
        clearInterval(digTimer);
        dogImg.classList.remove('is-bump');
        showItem(kind);
      }, 620);

      scheduleRevert(5000);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupDogDig();

    var targets = [];

    document.querySelectorAll('.cw-stats').forEach(function (el) { targets.push(el); });
    document.querySelectorAll('.metric-chart').forEach(function (el) { targets.push(el); });
    document.querySelectorAll('.project-card, .section-container, .cv-container').forEach(function (el) {
      el.classList.add('cw-reveal');
      targets.push(el);
    });

    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      targets.forEach(resolveTarget);
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        resolveTarget(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

    targets.forEach(function (el) { observer.observe(el); });

    // Safety net: whatever the observer hasn't caught within 1.8s
    // (fast scroll jumps, anchor links, etc.) gets resolved immediately.
    setTimeout(function () {
      targets.forEach(function (el) {
        if (!el.dataset.cwDone) {
          resolveTarget(el);
          observer.unobserve(el);
        }
      });
    }, 1800);
  });
})();
