# DIMS Intern Handbook — Authoring Guide (internal)

This file defines the EXACT house style for every chapter page. Follow it precisely so all
pages look identical. The canonical example is `pages/01-what-is-dims.html` — open it and copy
its structure. **Do not invent new CSS classes or restructure the shell.**

---

## 1. Page skeleton (copy verbatim; change only the 3 marked spots)

```html
<!DOCTYPE html>
<html lang="en" data-loc="page">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NN · PAGE TITLE — DIMS Intern Handbook</title>            <!-- (1) -->
  <link rel="stylesheet" href="../assets/css/handbook.css">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%232dd4bf'/><text x='50' y='72' font-size='62' text-anchor='middle' fill='%23042' font-family='sans-serif' font-weight='bold'>D</text></svg>">
  <script src="../assets/js/manifest.js"></script>
  <script src="../assets/js/handbook.js" defer></script>
</head>
<body>
  <div class="scrim"></div>
  <div class="layout">
    <aside class="sidebar" id="sidebar"></aside>
    <div class="content">
      <header class="topbar" id="topbar"></header>
      <main class="article" data-page-id="NN-file-stem">                <!-- (2) MUST equal the filename without .html -->

        <div class="page-head">
          <div class="kicker">GROUP · NN</div>
          <h1>PAGE TITLE</h1>
          <p class="lead">One or two sentence hook that frames the chapter for a beginner.</p>
        </div>

        <!-- ... chapter body ... -->

        <div id="pager"></div>                                          <!-- (3) keep this; JS fills prev/next -->
      </main>
    </div>
  </div>
</body>
</html>
```

The sidebar, top breadcrumb, read-time pill, PDF button and prev/next pager are all injected by
`handbook.js` from the manifest — you only write what goes between `.page-head` and `#pager`.

`data-page-id` **must** match the filename stem exactly (e.g. file `07-dock-3.html` → `data-page-id="07-dock-3"`)
or the active nav link and pager break.

---

## 2. Component snippets (use these; nothing else)

**Headings:** `<h2>` for major sections, `<h3>` (renders teal) for sub-sections, `<h4>` for minor.

**Callouts** (5 flavors): `tip` (teal), `note` (blue), `warn` (amber), `danger` (red), `key` (violet, for the one big idea):
```html
<div class="callout tip"><div class="ct">💡 Title</div><p>…</p></div>
```

**Analogy box** (use liberally — interns love these):
```html
<div class="analogy"><div class="ct">🧩 Analogy</div><p>Plain-language comparison…</p></div>
```

**Glossary term** (dotted underline + hover tooltip). ONLY use a slug from the list in §4:
```html
<span class="term" data-term="rtk">RTK</span>
```
Use it on the FIRST occurrence of a jargon term in the page. If a term you need is not in §4,
just write it in plain text (don't invent a slug).

**Figure** (image + caption). Cite the source in a `.src` span when it's external:
```html
<figure>
  <img src="../assets/img/screenshots/FILE" alt="describe">
  <figcaption>Caption. <span class="src">Source: …</span></figcaption>
</figure>
```
Two side-by-side images: wrap two `<figure>` (or `<img>`) in `<div class="img-2"> … </div>`.

**Spec cards** (great for hardware numbers):
```html
<div class="specs">
  <div class="spec"><div class="k">Flight time</div><div class="v">49<span class="u">min</span></div><div class="u">standard props</div></div>
  …
</div>
```

**Table:**
```html
<div class="table-wrap"><table>
  <thead><tr><th>A</th><th>B</th></tr></thead>
  <tbody><tr><td>…</td><td>…</td></tr></tbody>
</table></div>
```

**Tabs** (comparisons — e.g. Dock 2 vs 3). First btn/panel auto-activates:
```html
<div class="tabs">
  <div class="tab-btns"><button class="tab-btn">Label A</button><button class="tab-btn">Label B</button></div>
  <div class="tab-panel"><p>…A…</p></div>
  <div class="tab-panel"><p>…B…</p></div>
</div>
```

**Collapsible deep-dive** (hide advanced detail so beginners aren't overwhelmed):
```html
<details class="deep"><summary>Want the deep version? …</summary>
  <div class="deep-body"><p>…</p></div>
</details>
```

**Video embed** (use a confirmed YouTube ID, `-nocookie` domain):
```html
<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/VIDEOID" title="…" allowfullscreen loading="lazy"></iframe></div>
```

**Watch-card** (a link to a video instead of an embed):
```html
<a class="watch-card" href="https://youtu.be/ID" target="_blank" rel="noopener">
  <span class="play">▶</span><span><span class="wt">Title</span><br><span class="wm">why watch · length</span></span>
</a>
```

**Chips:** `<div class="chips"><span class="chip teal">key</span><span class="chip">plain</span></div>`

**Code:** inline `<code>…</code>`; block `<pre><code>…</code></pre>` (a Copy button is auto-added).

**Closing pattern:** end most chapters with a `callout tip` titled "✅ What you should now be able to say"
giving the intern a one-paragraph summary they could say out loud.

---

## 3. Available images (reference by these exact paths from inside /pages)

**DJI official product photos** (`../assets/img/dji/`) — cite "Source: DJI" in figcaption:
- `dock3-product.png` — Dock 3, closed (clean render)
- `dock3-open-drone.png` — Dock 3 open with the drone hovering above (best hero)
- `matrice4-product.png` — Matrice 4 series aircraft, top view
- `matrice350-product.png` — Matrice 350 RTK aircraft

**Custom diagrams** (`../assets/img/diagrams/`):
- `dims-architecture.svg` — end-to-end field→cloud→browser
- `raycast-pipeline.svg` — detect → raycast → coordinatized alert

**Real DIMS console screenshots** (`../assets/img/screenshots/`):
- `2026-06-19-demo-01-console.jpeg` — full console, demo mode
- `2026-06-23-dock-live-console.png` — console with REAL dock live
- `2026-06-23-finetuned-detection.png` — AI fire/smoke detection boxes
- `2026-06-22-hybrid-fire-fpv.png` — drone FPV on a fire + alert
- `2026-06-22-raycast-footprint.png` — raycast footprint quad on terrain
- `2026-06-22-pom-incident.png` — incident / alert panel
- `2026-06-22-fpv-acquire-slew.png` — gimbal auto-aim acquiring target
- `2026-06-23-backend-switcher.png` — demo/real backend switcher
- `2026-06-23-scheduler-arm.png` — scheduler "armed" master gate
- `2026-06-24-dock-telem-after-details.png`, `2026-06-24-dock-telem-before.png`, `2026-06-19-tabs-02-dock-telem.jpeg` — dock telemetry panels
- `b2-01-2dmap-profile-console.jpeg` — 2D map + ground-elevation profile strip
- `b2-02-flight-takeoff-overlay.jpeg` — takeoff overlay
- `b2-03-rth-return.jpeg` — return-to-home
- `b3-01-satellite-recentered.jpeg` — satellite basemap
- `b3-07-popout-alltabs-modes.jpeg` — all editor tabs/modes
- `editor-02-manual.jpeg`, `editor-03-orbit.jpeg`, `editor-04-lawnmower.jpeg` — mission editor modes
- `editor-realdsm-northridge.jpeg` — editor on real DSM terrain
- `d3-01-route-tab.jpeg`, `d3-03-estimate-tab.jpeg`, `d3-05-safety-tab.jpeg`, `d3-08-safety-verdict.jpeg` — planner tabs
- `d9-02-dispatch-detection.jpeg` — auto-dispatch on detection
- `drc-console.png`, `drc-panel.png` — DRC teleoperation
- `diag-01-2d.jpeg`, `diag-03-chase.jpeg` — camera view modes
- `f6-02-flights-list.jpeg`, `f6-03-replay-start.jpeg` — flight records / replay

Pick images that genuinely match the text. Don't reuse the same shot many times.

---

## 4. Valid glossary slugs for `data-term` (USE ONLY THESE)

dims, cns, dji, uav, dock, dock3, m4td, m300, rtk, gnss, gimbal, payload, bvlos, osd, telemetry,
mqtt, cloudapi, flighthub, pilot, terra, wayline, kmz, livestream, rtsp, mediamtx, webrtc, drc,
fpv, pfd, hud, rth, geofence, agl, sitl, yolo, onnx, tensorrt, inference, training, dataset, f1,
bbox, segmentation, gpu, cuda, neuralnet, cv, api, rest, sse, frontend, backend, fastapi, nextjs,
react, postgres, cesium, twin, dsm, pointcloud, photogrammetry, orthomosaic, raycast, wgs84,
thermal, swir, lwir, multispectral, lidar, zenmuse, swarm, tls, ntp

---

## 5. Tone & content rules

- **Audience:** smart interns with NO drone/AI background. Explain every acronym the first time.
- **Teach, don't list.** Lead with the "why", use analogies, then detail. Friendly but precise.
- **Length:** ~900–1500 words per chapter (matches the read-time in the manifest).
- **Accuracy:** for DJI hardware specs, use the figures researched from DJI's official site
  (provided in the brief). Don't invent numbers. For DIMS internals, only state what the brief says.
- **Cross-link** to other chapters with relative links, e.g. `<a href="15-ai-in-dims.html">chapter 15</a>`.
- **Videos:** include at least one relevant video (embed or watch-card) where natural.

## 6. PRIVACY — strict (never include)

No budgets, funding amounts, salaries, equity/stock, valuations, financials, contract values,
or personal contact details — anywhere, in any chapter. Describe projects by WHAT they build,
never by money. If a source has such numbers, omit them silently.
