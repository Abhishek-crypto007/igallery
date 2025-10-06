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
