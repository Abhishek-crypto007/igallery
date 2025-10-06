# Ex.08 Design of Interactive Image Gallery
## Date:06.10.2025

## AIM:
To design a web application for an inteactive image gallery with minimum five images.

## DESIGN STEPS:

### Step 1:
Clone the github repository and create Django admin interface.

### Step 2:
Change settings.py file to allow request from all hosts.

### Step 3:
Use CSS for positioning and styling.

### Step 4:
Write JavaScript program for implementing interactivity.

### Step 5:
Validate the HTML and CSS code.

### Step 6:
Publish the website in the given URL.

## PROGRAM :
```
index.html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Interactive Image Gallery</title>
<link rel="stylesheet" href="css/styles.css">
<script src="js/script.js"></script>



</head>
<body>
  <header class="site-header">
    <h1>✨Interactive Image Gallery ✨</h1>
    <p class="subtitle">Click a thumbnail to admire — double-click any large image to open the lightbox. 💖</p>
  </header>

  <main class="gallery-page">
    <!-- Main viewer -->
    <section class="viewer" aria-live="polite">
      <div class="viewer-image-wrap">
        <img id="mainImage" src="images/img1.jpg" alt="Image 1" />
        <button id="favBtn" class="fav-btn" aria-pressed="false" title="Favorite">♡</button>
      </div>
      <figcaption id="caption">Image 1 — Sweet sunset</figcaption>
      <div class="controls">
        <button id="prevBtn" class="ctrl">◀ Prev</button>
        <button id="playBtn" class="ctrl">▶ Play</button>
        <button id="nextBtn" class="ctrl">Next ▶</button>
      </div>
    </section>

    <!-- Thumbnail strip -->
    <aside class="thumbs" aria-label="Gallery thumbnails">
      <div class="thumb-grid">
        <button class="thumb" data-src="images/img1.jpg" data-caption="Image 1 — Sweet sunset">
          <img src="images/img1.jpg" alt="Thumb 1" />
        </button>
        <button class="thumb" data-src="images/img2.jpg" data-caption="Image 2 — Ocean breeze">
          <img src="images/img2.jpg" alt="Thumb 2" />
        </button>
        <button class="thumb" data-src="images/img3.jpg" data-caption="Image 3 — City lights">
          <img src="images/img3.jpg" alt="Thumb 3" />
        </button>
        <button class="thumb" data-src="images/img4.jpg" data-caption="Image 4 — Quiet forest">
          <img src="images/img4.jpg" alt="Thumb 4" />
        </button>
        <button class="thumb" data-src="images/img5.jpg" data-caption="Image 5 — Mountain calm">
          <img src="images/img5.jpg" alt="Thumb 5" />
        </button>
        <!-- add more thumbs if you like -->
      </div>
    </aside>
  </main>

  <!-- Modal / Lightbox -->
  <div id="lightbox" class="lightbox" role="dialog" aria-hidden="true">
    <button class="lb-close" id="lbClose" title="Close">✕</button>
    <button class="lb-prev" id="lbPrev" title="Previous">◀</button>
    <div class="lb-content">
      <img id="lbImage" src="" alt="Expanded view" />
      <div id="lbCaption" class="lb-caption"></div>
    </div>
    <button class="lb-next" id="lbNext" title="Next">▶</button>
  </div>

</body>
</html>

styles.css

/* Basic page layout */
:root{
  --bg: #0f1724;
  --card: #111827;
  --accent: #ff6b81;
  --muted: #93a3b8;
  --glass: rgba(255,255,255,0.04);
}

* { box-sizing: border-box; }
html,body { height:100%; margin:0; font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; background: linear-gradient(180deg,#071121 0%, #0f1724 100%); color:#e6eef6; }

.site-header {
  text-align:center; padding:28px 16px 6px;
}
.site-header h1 { margin:0; font-size:2rem; letter-spacing:0.5px; }
.site-header .subtitle { margin:6px 0 0; color:var(--muted); }

/* Main gallery layout */
.gallery-page {
  display:grid;
  grid-template-columns: 1fr 320px;
  gap:20px;
  max-width:1100px;
  margin:28px auto;
  padding:0 16px 80px;
}

/* Viewer area */
.viewer {
  background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent);
  border-radius:12px; padding:18px; position:relative; display:flex; flex-direction:column; align-items:center; justify-content:center;
  min-height:480px;
  box-shadow: 0 10px 30px rgba(2,6,23,0.6);
}

.viewer-image-wrap{ position:relative; width:100%; max-width:760px; display:flex; align-items:center; justify-content:center; }
.viewer img { width:100%; height:auto; border-radius:10px; max-height:520px; object-fit:cover; user-select:none; cursor:zoom-in; transition:transform .25s ease; }
.viewer img:active { transform:scale(0.995); }

.fav-btn{
  position:absolute; right:12px; top:12px; background:transparent; border:2px solid rgba(255,255,255,0.06);
  color:#fff; font-size:20px; padding:6px 10px; border-radius:999px; cursor:pointer;
  backdrop-filter: blur(4px);
}
.fav-btn[aria-pressed="true"] { color:var(--accent); transform:scale(1.08); border-color: rgba(255,107,129,0.2); }

/* caption and controls */
figcaption { margin-top:12px; color:var(--muted); font-size:0.95rem; }
.controls { margin-top:14px; display:flex; gap:12px; }
.ctrl {
  background:var(--glass); border:1px solid rgba(255,255,255,0.04); color:#eaf4ff; padding:8px 12px; border-radius:8px;
  cursor:pointer; font-weight:600;
}
.ctrl:active { transform:translateY(1px); }

/* Thumbnails column */
.thumbs { position:sticky; top:20px; height:fit-content; padding:18px; background:rgba(255,255,255,0.02); border-radius:12px; align-self:start; }
.thumb-grid { display:grid; grid-template-columns:1fr; gap:10px; width:260px; }
.thumb { padding:0; border:0; background:transparent; cursor:pointer; border-radius:8px; overflow:hidden; }
.thumb img { width:100%; height:140px; object-fit:cover; display:block; transition:transform .18s ease; }
.thumb:hover img { transform:scale(1.04); }

/* Lightbox modal */
.lightbox{
  position:fixed; inset:0; display:none; align-items:center; justify-content:center; z-index:9999;
  background:linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.85));
}
.lightbox[aria-hidden="false"] { display:flex; }
.lb-content { max-width:90vw; max-height:86vh; display:flex; flex-direction:column; align-items:center; gap:8px; }
.lb-content img { max-width:calc(90vw - 160px); max-height:80vh; border-radius:8px; object-fit:contain; }
.lb-caption { color: #cfe6ff; font-size:0.96rem; text-align:center; max-width:80vw; }

.lb-close, .lb-prev, .lb-next {
  position:absolute; background:transparent; border:0; color:#fff; font-size:20px; padding:12px; cursor:pointer;
}
.lb-close { top:18px; right:20px; }
.lb-prev { left:18px; top:50%; transform:translateY(-50%); font-size:22px; }
.lb-next { right:18px; top:50%; transform:translateY(-50%); font-size:22px; }

/* small screens */
@media (max-width:900px){
  .gallery-page { grid-template-columns: 1fr; padding-bottom:140px; }
  .thumbs { position:relative; margin-top:18px; width:100%; }
  .thumb-grid { grid-template-columns: repeat(5, 1fr); gap:8px; width:100%; }
  .thumb img { height:80px; }
}

script.js

console.log("✨ Gallery script loaded successfully!");

// Interactive Image Gallery Script
document.addEventListener("DOMContentLoaded", () => {
  // Grab main elements
  const mainImage = document.getElementById("mainImage");
  const caption = document.getElementById("caption");
  const thumbs = Array.from(document.querySelectorAll(".thumb"));
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const playBtn = document.getElementById("playBtn");
  const favBtn = document.getElementById("favBtn");

  // Lightbox elements
  const lightbox = document.getElementById("lightbox");
  const lbImage = document.getElementById("lbImage");
  const lbCaption = document.getElementById("lbCaption");
  const lbClose = document.getElementById("lbClose");
  const lbPrev = document.getElementById("lbPrev");
  const lbNext = document.getElementById("lbNext");

  // Build image data from thumbnails
  const images = thumbs.map(t => ({
    src: t.dataset.src,
    caption: t.dataset.caption
  }));

  let currentIndex = 0;
  let playing = false;
  let timer = null;
  const intervalMs = 3000;

  // Update main viewer
  function showImage(index, openLightbox = false) {
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    currentIndex = index;

    const { src, caption: text } = images[currentIndex];
    mainImage.src = src;
    caption.textContent = text;

    thumbs.forEach((t, i) => {
      t.classList.toggle("active", i === currentIndex);
    });

    if (openLightbox) openLB();
  }

  // Thumbnails click
  thumbs.forEach((thumb, i) => {
    thumb.addEventListener("click", () => {
      showImage(i);
      stopSlideshow();
    });
  });

  // Navigation buttons
  prevBtn.addEventListener("click", () => {
      stopSlideshow();
    showImage(currentIndex - 1);
  });
  nextBtn.addEventListener("click", () => {
      stopSlideshow();
    showImage(currentIndex + 1);
  });

  // Slideshow controls
  function startSlideshow() {
  if (playing) return;
  playing = true;
  playBtn.textContent = "⏸ Pause";
  console.log("▶ Slideshow started!");

  // Stop any previous timer just in case
  clearInterval(timer);

  timer = setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    console.log("Next image:", currentIndex);
    showImage(currentIndex);
  }, intervalMs);
}

function stopSlideshow() {
  if (!playing) return;
  playing = false;
  playBtn.textContent = "▶ Play";
  clearInterval(timer);
  console.log("⏸ Slideshow stopped");
}

  playBtn.addEventListener("click", () => {
    playing ? stopSlideshow() : startSlideshow();
  });

  // Favorite (heart) button
  favBtn.addEventListener("click", () => {
    const isFav = favBtn.getAttribute("aria-pressed") === "true";
    favBtn.setAttribute("aria-pressed", String(!isFav));
    favBtn.textContent = isFav ? "♡" : "♥";
  });

  // Lightbox open/close
  function openLB() {
    const { src, caption: text } = images[currentIndex];
    lbImage.src = src;
    lbCaption.textContent = text;
    lightbox.setAttribute("aria-hidden", "false");
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function closeLB() {
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.style.display = "none";
    document.body.style.overflow = "";
  }

  lbClose.addEventListener("click", closeLB);
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLB(); // click outside closes
  });

  lbPrev.addEventListener("click", () => showImage(currentIndex - 1, true));
  lbNext.addEventListener("click", () => showImage(currentIndex + 1, true));

  // Double-click main image to open lightbox
  mainImage.addEventListener("dblclick", openLB);

  // Keyboard controls
  document.addEventListener("keydown", e => {
    if (lightbox.getAttribute("aria-hidden") === "false") {
      if (e.key === "ArrowLeft") showImage(currentIndex - 1, true);
      if (e.key === "ArrowRight") showImage(currentIndex + 1, true);
      if (e.key === "Escape") closeLB();
      return;
    }

    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === " ") {
      e.preventDefault();
      playing ? stopSlideshow() : startSlideshow();
    }
  });

  // Initialize
  showImage(0);
});

```

## OUTPUT:
![alt text](image.png)
![alt text](<Screenshot (26).png>)
## RESULT:
The program for designing an interactive image gallery using HTML, CSS and JavaScript is executed successfully.
