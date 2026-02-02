// =====================
// CONFIG (EDIT DI SINI)
// =====================
const CONFIG = {
  name: "Nama Dia",
  subtitle: "Aku bersyukur kamu ada. Semoga tahun ini kamu makin bahagia, sehat, dan dikelilingi hal baik.",
  // Ulang tahun (hari & bulan). Script akan otomatis pilih "ulang tahun berikutnya"
  birthdayDay: 17,
  birthdayMonth: 8, // 1=Jan, 2=Feb, ... 12=Des
  secretMessage:
    "Kamu itu spesial. Terima kasih sudah jadi orang yang menginspirasi. Semoga semua impianmu pelan-pelan jadi nyata ✨",
  surpriseMessage:
    "Hari ini milikmu! Semoga langkahmu makin ringan, hatimu makin tenang, dan senyummu makin sering muncul 😄",
  // Galeri: bisa URL (https://...) atau file lokal di assets/
  photos: [
    "assets/foto1.jpg",
    "assets/foto2.jpg",
    "assets/foto3.jpg",
    "assets/foto4.jpg",
    "assets/foto5.jpg",
    "assets/foto6.jpg",
  ],
  // Musik: file mp3 lokal (disarankan) atau URL mp3
  musicSrc: "assets/song.mp3",
};

// =====================
// SETUP TEXT
// =====================
const $ = (id) => document.getElementById(id);

$("personName").textContent = CONFIG.name;
$("subtitleText").textContent = CONFIG.subtitle;
$("secretText").textContent = CONFIG.secretMessage;
$("surpriseText").textContent = CONFIG.surpriseMessage;

// =====================
// GALLERY
// =====================
const galleryEl = $("gallery");
const lightbox = $("lightbox");
const lightboxImg = $("lightboxImg");

function buildGallery() {
  galleryEl.innerHTML = "";
  CONFIG.photos.forEach((src, idx) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Foto ${idx + 1}`;
    img.loading = "lazy";
    img.addEventListener("click", () => openLightbox(src, img.alt));
    galleryEl.appendChild(img);
  });
}

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

$("closeLightbox").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (!lightbox.hidden && e.key === "Escape") closeLightbox();
});

buildGallery();

// =====================
// MUSIC
// =====================
const audio = $("bgMusic");
audio.volume = 0.75;
audio.querySelector("source").src = CONFIG.musicSrc;
audio.load();

let isPlaying = false;
$("playBtn").addEventListener("click", async () => {
  try {
    if (!isPlaying) {
      await audio.play();
      isPlaying = true;
      $("playBtn").textContent = "⏸️ Pause Musik";
    } else {
      audio.pause();
      isPlaying = false;
      $("playBtn").textContent = "▶️ Putar Musik";
    }
  } catch (err) {
    alert("Browser memblokir autoplay. Coba klik tombol musik sekali lagi ya 🙂");
  }
});

// =====================
// SECRET MESSAGE
// =====================
$("revealBtn").addEventListener("click", () => {
  $("secretBox").hidden = false;
  $("revealBtn").disabled = true;
  $("revealBtn").textContent = "Terbuka ✅";
});

// =====================
// COUNTDOWN
// =====================
function getNextBirthdayDate(day, month) {
  // month: 1-12
  const now = new Date();
  const year = now.getFullYear();
  const targetThisYear = new Date(year, month - 1, day, 0, 0, 0);

  // Jika sudah lewat hari ini, ambil tahun depan
  if (targetThisYear.getTime() <= now.getTime()) {
    return new Date(year + 1, month - 1, day, 0, 0, 0);
  }
  return targetThisYear;
}

let targetDate = getNextBirthdayDate(CONFIG.birthdayDay, CONFIG.birthdayMonth);

function pad2(n) { return String(n).padStart(2, "0"); }

function tick() {
  const now = new Date();
  let diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    // tepat ulang tahun
    $("dd").textContent = "00";
    $("hh").textContent = "00";
    $("mm").textContent = "00";
    $("ss").textContent = "00";
    $("targetHint").textContent = "Hari ini ulang tahunnya! 🎉🎂";
    burstConfetti(140);
    return;
  }

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / (3600 * 24));
  const hours = Math.floor((sec % (3600 * 24)) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;

  $("dd").textContent = pad2(days);
  $("hh").textContent = pad2(hours);
  $("mm").textContent = pad2(mins);
  $("ss").textContent = pad2(secs);

  const options = { year: "numeric", month: "long", day: "numeric" };
  $("targetHint").textContent = `Menuju: ${targetDate.toLocaleDateString("id-ID", options)} (00:00)`;
}

tick();
setInterval(tick, 1000);



// Simple confetti (tanpa library)
const canvas = $("confettiCanvas");
const ctx = canvas.getContext("2d");
let W, H;
function resize() {
  W = canvas.width = window.innerWidth * devicePixelRatio;
  H = canvas.height = window.innerHeight * devicePixelRatio;
}
window.addEventListener("resize", resize);
resize();

let pieces = [];
function rand(min, max) { return Math.random() * (max - min) + min; }

function burstConfetti(count = 120) {
  for (let i = 0; i < count; i++) {
    pieces.push({
      x: rand(0, W),
      y: rand(-H * 0.2, 0),
      vx: rand(-1.5, 1.5) * devicePixelRatio,
      vy: rand(2.2, 5.5) * devicePixelRatio,
      size: rand(6, 14) * devicePixelRatio,
      rot: rand(0, Math.PI * 2),
      vr: rand(-0.12, 0.12),
      // warna random (tanpa palette fixed)
      color: `hsl(${Math.floor(rand(0, 360))} 90% 65%)`,
      life: rand(80, 160),
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, W, H);

  pieces = pieces.filter(p => p.life > 0);
  for (const p of pieces) {
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.vy += 0.03 * devicePixelRatio; // gravity
    p.life -= 1;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
    ctx.restore();
  }

  requestAnimationFrame(animate);
}
animate();
