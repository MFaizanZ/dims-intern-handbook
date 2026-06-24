/* ============================================================
   DIMS Intern Handbook — runtime engine
   Builds the sidebar, topbar, prev/next pager, glossary tooltips,
   tabs, copy buttons, search, and the mobile menu — from manifest.js.
   No build step, no dependencies. Just open the HTML in a browser.
   ============================================================ */
(function () {
  var HB = window.HANDBOOK || { pages: [], glossary: {} };
  var html = document.documentElement;
  var loc = html.getAttribute('data-loc') || 'page';   // 'home' | 'page'
  var isHome = loc === 'home';
  var main = document.querySelector('main.article');
  var currentId = main ? main.getAttribute('data-page-id') : null;

  // ---- path helpers (home is at root, pages live in /pages) ----
  function pageHref(file) { return isHome ? ('pages/' + file) : file; }
  function homeHref()     { return isHome ? 'index.html' : '../index.html'; }
  function asset(p)       { return (isHome ? '' : '../') + 'assets/' + p; }

  // ---- build sidebar ----
  function buildSidebar() {
    var el = document.getElementById('sidebar');
    if (!el) return;
    var groups = [];
    var seen = {};
    HB.pages.forEach(function (p) {
      if (!seen[p.group]) { seen[p.group] = []; groups.push(p.group); }
      seen[p.group].push(p);
    });

    var h = '';
    h += '<a class="brand" href="' + homeHref() + '">' +
           '<span class="logo">D</span>' +
           '<span><span class="t1">' + HB.brandTitle + '</span><br><span class="t2">' + HB.brandSub + '</span></span>' +
         '</a>';
    h += '<input class="nav-search" id="navSearch" placeholder="Filter pages…" autocomplete="off">';
    h += '<nav class="nav" id="navList">';
    groups.forEach(function (g) {
      h += '<div class="nav-group-title">' + g + '</div>';
      seen[g].forEach(function (p) {
        var stem = p.file.replace('.html', '');
        var active = (stem === currentId) ? ' active' : '';
        h += '<a class="nav-link' + active + '" data-title="' + p.title.toLowerCase() + '" href="' + pageHref(p.file) + '">' +
               '<span class="num">' + p.num + '</span><span class="lbl">' + p.title + '</span></a>';
      });
    });
    h += '</nav>';
    el.innerHTML = h;

    var s = document.getElementById('navSearch');
    if (s) s.addEventListener('input', function () {
      var q = this.value.toLowerCase().trim();
      document.querySelectorAll('#navList .nav-link').forEach(function (a) {
        a.style.display = (!q || a.getAttribute('data-title').indexOf(q) > -1) ? '' : 'none';
      });
      document.querySelectorAll('.nav-group-title').forEach(function (t) {
        // hide a group title if all its links are hidden
        var n = t.nextElementSibling, anyVisible = false;
        while (n && n.classList && n.classList.contains('nav-link')) {
          if (n.style.display !== 'none') anyVisible = true;
          n = n.nextElementSibling;
        }
        t.style.display = anyVisible ? '' : 'none';
      });
    });
  }

  // ---- build topbar ----
  function buildTopbar() {
    var el = document.getElementById('topbar');
    if (!el) return;
    var cur = HB.pages.filter(function (p) { return p.file.replace('.html','') === currentId; })[0];
    var crumb = isHome ? '<b>Home</b>' :
      '<a href="' + homeHref() + '">Home</a> &nbsp;›&nbsp; <b>' + (cur ? cur.num + ' · ' + cur.title : '') + '</b>';
    el.innerHTML =
      '<button class="menu-btn" id="menuBtn" aria-label="Menu">☰</button>' +
      '<div class="crumbs">' + crumb + '</div>' +
      '<div class="spacer"></div>' +
      (cur ? '<span class="pill">⏱ ' + cur.est + ' read</span>' : '') +
      '<span class="pill" onclick="window.print()" style="cursor:pointer">⎙ PDF</span>';
    var mb = document.getElementById('menuBtn');
    if (mb) mb.addEventListener('click', function () { document.body.classList.toggle('nav-open'); });
  }

  // ---- build prev/next pager ----
  function buildPager() {
    var el = document.getElementById('pager');
    if (!el || isHome) return;
    var idx = -1;
    HB.pages.forEach(function (p, i) { if (p.file.replace('.html','') === currentId) idx = i; });
    if (idx < 0) return;
    var prev = HB.pages[idx - 1], next = HB.pages[idx + 1];
    var h = '<div class="pager">';
    h += prev
      ? '<a href="' + pageHref(prev.file) + '"><div class="dir">‹ Previous</div><div class="ttl">' + prev.num + ' · ' + prev.title + '</div></a>'
      : '<a href="' + homeHref() + '"><div class="dir">‹ Back</div><div class="ttl">Home</div></a>';
    h += next
      ? '<a class="next" href="' + pageHref(next.file) + '"><div class="dir">Next ›</div><div class="ttl">' + next.num + ' · ' + next.title + '</div></a>'
      : '<a class="next" href="' + pageHref('18-glossary.html') + '"><div class="dir">Next ›</div><div class="ttl">Glossary</div></a>';
    h += '</div>';
    el.innerHTML = h;
  }

  // ---- glossary tooltips on <span class="term" data-term="slug"> ----
  var tipEl;
  function ensureTip() {
    if (!tipEl) { tipEl = document.createElement('div'); tipEl.className = 'tooltip'; document.body.appendChild(tipEl); }
    return tipEl;
  }
  function wireTooltips() {
    document.querySelectorAll('.term[data-term]').forEach(function (sp) {
      var g = HB.glossary[sp.getAttribute('data-term')];
      if (!g) return;
      sp.addEventListener('mouseenter', function (e) {
        var t = ensureTip();
        t.innerHTML = '<b>' + g.t + '</b>' + g.d;
        t.classList.add('show');
        position(e);
      });
      sp.addEventListener('mousemove', position);
      sp.addEventListener('mouseleave', function () { if (tipEl) tipEl.classList.remove('show'); });
      // also make it a link to the glossary entry on click
      sp.style.cursor = 'help';
    });
    function position(e) {
      if (!tipEl) return;
      var pad = 14, w = tipEl.offsetWidth, h = tipEl.offsetHeight;
      var x = e.clientX + pad, y = e.clientY + pad;
      if (x + w > window.innerWidth - 8)  x = e.clientX - w - pad;
      if (y + h > window.innerHeight - 8) y = e.clientY - h - pad;
      tipEl.style.left = Math.max(8, x) + 'px';
      tipEl.style.top  = Math.max(8, y) + 'px';
    }
  }

  // ---- tabs ----
  function wireTabs() {
    document.querySelectorAll('.tabs').forEach(function (tabs) {
      var btns = tabs.querySelectorAll('.tab-btn');
      var panels = tabs.querySelectorAll('.tab-panel');
      btns.forEach(function (b, i) {
        b.addEventListener('click', function () {
          btns.forEach(function (x) { x.classList.remove('active'); });
          panels.forEach(function (x) { x.classList.remove('active'); });
          b.classList.add('active');
          if (panels[i]) panels[i].classList.add('active');
        });
      });
      if (btns[0]) btns[0].classList.add('active');
      if (panels[0]) panels[0].classList.add('active');
    });
  }

  // ---- copy buttons on <pre> ----
  function wireCopy() {
    document.querySelectorAll('pre').forEach(function (pre) {
      var b = document.createElement('button');
      b.className = 'copy-btn'; b.textContent = 'Copy';
      b.addEventListener('click', function () {
        var code = pre.querySelector('code');
        navigator.clipboard.writeText(code ? code.innerText : pre.innerText).then(function () {
          b.textContent = 'Copied!'; setTimeout(function () { b.textContent = 'Copy'; }, 1400);
        });
      });
      pre.appendChild(b);
    });
  }

  // ---- youtube embeds → reliable thumbnail "facade" ----
  // Inline iframes fail over file:// (YouTube error 153). We replace each embed
  // with a real thumbnail + play button that opens the video on YouTube. Works everywhere.
  function enhanceVideos() {
    document.querySelectorAll('.video').forEach(function (box) {
      var iframe = box.querySelector('iframe');
      var src = iframe ? (iframe.getAttribute('src') || '') : (box.getAttribute('data-yt') ? 'embed/' + box.getAttribute('data-yt') : '');
      var m = src.match(/embed\/([A-Za-z0-9_-]{6,})/) || src.match(/[?&]v=([A-Za-z0-9_-]{6,})/);
      if (!m) return;
      var id = m[1];
      var title = (iframe && iframe.getAttribute('title')) || box.getAttribute('data-title') || 'Watch on YouTube';
      box.innerHTML =
        '<a class="yt-facade" href="https://www.youtube.com/watch?v=' + id + '" target="_blank" rel="noopener" aria-label="' + title + ' — opens on YouTube">' +
          '<img loading="lazy" src="https://img.youtube.com/vi/' + id + '/hqdefault.jpg" alt="' + title + '">' +
          '<span class="yt-play"></span>' +
          '<span class="yt-cap">▶ ' + title + ' · opens on YouTube</span>' +
        '</a>';
    });
  }

  // ---- scrim closes mobile nav ----
  function wireScrim() {
    var s = document.querySelector('.scrim');
    if (s) s.addEventListener('click', function () { document.body.classList.remove('nav-open'); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    buildSidebar();
    buildTopbar();
    buildPager();
    wireTooltips();
    wireTabs();
    wireCopy();
    wireScrim();
    enhanceVideos();
  });
})();
