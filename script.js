const audio = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");
let playing = false;

// AUTOPLAY SETELAH INTERAKSI PERTAMA
function enableAutoPlay() {
  if (!playing) {
    audio.volume = 0.8;
    audio.play()
      .then(() => {
        playing = true;
        if (btn) btn.textContent = "Jeda musik";
      })
      .catch(() => {
        // kalau gagal, biarkan tombol manual
      });
  }

  // hapus listener supaya tidak dipanggil berkali-kali
  document.removeEventListener("click", enableAutoPlay);
  document.removeEventListener("touchstart", enableAutoPlay);
}

// trigger dari interaksi pertama user
document.addEventListener("click", enableAutoPlay);
document.addEventListener("touchstart", enableAutoPlay);

// TOMBOL MANUAL (opsional)
if (btn) {
  btn.addEventListener("click", () => {
    if (!playing) {
      audio.play();
      playing = true;
      btn.textContent = "Jeda musik";
    } else {
      audio.pause();
      playing = false;
      btn.textContent = "Putar musik";
    }
  });
}
