// Website Ucapan Ulang Tahun
// Untuk: DINDA ALYSSA LUSIDA PUTRI
// Lahir: 20 Februari 2005

const BIRTH = { day: 20, month: 2, year: 2005 };
const $ = (id) => document.getElementById(id);

function currentAge() {
  const now = new Date();
  let age = now.getFullYear() - BIRTH.year;
  const bThisYear = new Date(now.getFullYear(), BIRTH.month - 1, BIRTH.day, 0, 0, 0);
  if (now.getTime() < bThisYear.getTime()) age -= 1;
  return age;
}

// Tampilkan umur
const ageEl = $("ageNow");
if (ageEl) ageEl.textContent = `${currentAge()} tahun`;

// ========== MUSIC ==========
const audio = $("bgMusic");
const btn = $("musicBtn");
let playing = false;

if (audio && btn) {
  audio.volume = 0.8;

  btn.addEventListener("click", async () => {
    try {
      if (!playing) {
        await audio.play();
        playing = true;
        btn.textContent = "⏸️ Pause Musik";
      } else {
        audio.pause();
        playing = false;
        btn.textContent = "▶️ Putar Musik";
      }
    } catch (e) {
      alert("Musik belum bisa diputar. Pastikan file ada di assets/song.mp3 lalu coba lagi ya.");
    }
  });
}

// ========== CONFETTI (ringan, tanpa popup) ==========
const confBtn = $("confettiBtn");
if (confBtn) {
  confBtn.addEventListener("click", () => {
    const count = 22;
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      s.textContent = Math.random() > 0.5 ? "✨" : "🎉";
      s.style.position = "fixed";
      s.style.left = Math.floor(Math.random() * 100) + "vw";
      s.style.top = "-10px";
      s.style.fontSize = (18 + Math.random() * 18) + "px";
      s.style.zIndex = "9999";
      s.style.pointerEvents = "none";
      s.style.transition = "transform 1.2s linear, opacity 1.2s linear";
      document.body.appendChild(s);

      const drop = (window.innerHeight + 120) + Math.random() * 80;
      const drift = (Math.random() * 160 - 80);

      requestAnimationFrame(() => {
        s.style.transform = `translate(${drift}px, ${drop}px) rotate(${Math.random() * 360}deg)`;
        s.style.opacity = "0";
      });

      setTimeout(() => s.remove(), 1400);
    }
  });
}
