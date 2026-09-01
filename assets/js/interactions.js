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
  // digs — a short dig-loop plays on the dog's own image, then a found
  // item (bone / gift / can) pops up in a small bubble above the dog,
  // holds a few seconds, then fades. Pure decoration on top of a page
  // that's already complete without JS or images.
  var CW_DIG_ITEMS = {
    en: {
      bone: {
        weight: 65,
        dogImg: 'dog-idle.png',
        entries: [
          '25% less review',
          '10K+ customers',
          '50K+ records +70%',
          'Attrition down 19%',
          '6 shipped projects',
          '1 very good dog'
        ]
      },
      gift: {
        weight: 25,
        dogImg: 'dog-idle.png',
        entries: [
          { text: 'FX', href: '/projects/#card-project_fx' },
          { text: 'RAG', href: '/projects/#card-project_multidoc' },
          { text: 'IRIS', href: '/projects/#card-project_iris' }
        ]
      },
      can: {
        weight: 10,
        dogImg: 'dog-sad.png',
        entries: ['meh', 'lol', 'oof', 'nah']
      }
    },
    zh: {
      bone: {
        weight: 65,
        dogImg: 'dog-idle.png',
        entries: [
          '7个系统审核量降约25%',
          '万+客户分群 转化提升',
          '5万+条对账 提速70%',
          'PSM/DiD 流失降约19%',
          '6个项目 10段经历',
          '2个学位 1只好狗'
        ]
      },
      gift: {
        weight: 25,
        dogImg: 'dog-idle.png',
        entries: [
          { text: '外汇', href: '/zh/projects/#card-project_fx' },
          { text: 'RAG', href: '/zh/projects/#card-project_multidoc' },
          { text: '虹膜', href: '/zh/projects/#card-project_iris' }
        ]
      },
      can: {
        weight: 10,
        dogImg: 'dog-sad.png',
        entries: ['呃', '唉', '嗯…', '拜托']
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
    var reveal = document.getElementById('cw-dig-reveal');
    var revealItem = document.getElementById('cw-dig-reveal-item');
    var revealImg = document.getElementById('cw-dig-reveal-img');
    var revealText = document.getElementById('cw-dig-reveal-text');
    if (!dogBtn || !dogImg || !reveal || !revealItem || !revealImg || !revealText) return;

    var lang = document.documentElement.lang === 'zh' ? 'zh' : 'en';
    var pools = CW_DIG_ITEMS[lang];
    var base = dogImg.getAttribute('src').replace(/dog-idle\.png$/, '');
    var busy = false;

    function showItem(kind) {
      var pool = pools[kind];
      var entry = pool.entries[Math.floor(Math.random() * pool.entries.length)];
      var text = typeof entry === 'string' ? entry : entry.text;
      var href = typeof entry === 'string' ? null : entry.href;

      revealItem.setAttribute('data-item', kind);
      revealImg.src = base + 'tag-' + kind + '.png';
      revealText.textContent = text;
      dogImg.src = base + pool.dogImg;

      if (href) {
        reveal.setAttribute('href', href);
        reveal.removeAttribute('tabindex');
      } else {
        reveal.setAttribute('href', '#');
        reveal.setAttribute('tabindex', '-1');
      }

      reveal.classList.add('is-visible');
    }

    function revert() {
      reveal.classList.remove('is-visible');
      dogImg.src = base + 'dog-idle.png';
    }

    dogBtn.addEventListener('click', function (e) {
      if (busy) return;
      busy = true;

      var kind = weightedPick(pools);

      if (reduceMotion) {
        showItem(kind);
        setTimeout(function () {
          revert();
          busy = false;
        }, 2600);
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

      setTimeout(function () {
        revert();
        busy = false;
      }, 3400);
    });

    // Clicking the reveal itself (gift outcomes) follows the link
    // normally; nothing extra to wire up here.
    reveal.addEventListener('click', function (e) {
      if (reveal.getAttribute('href') === '#') e.preventDefault();
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
