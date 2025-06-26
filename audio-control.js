// Inisialisasi audio
const backgroundAudio = new Audio('1.m4a');
backgroundAudio.loop = true;

// Simpan status audio di sessionStorage
let isAudioPlaying = sessionStorage.getItem('audioPlaying') === 'true';

// Fungsi untuk memulai/menghentikan audio
function toggleAudio(play) {
    if (play) {
        backgroundAudio.play().catch(e => console.log('Autoplay prevented:', e));
        sessionStorage.setItem('audioPlaying', 'true');
    } else {
        backgroundAudio.pause();
        sessionStorage.setItem('audioPlaying', 'false');
    }
}

// Saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    if (isAudioPlaying) {
        toggleAudio(true);
    }
    
    // Tangkap event sebelum unload (saat keluar/tutup tab)
    window.addEventListener('beforeunload', function() {
        toggleAudio(false);
    });
});

// Fungsi untuk halaman login (pemutaran pertama)
function startBackgroundMusic() {
    toggleAudio(true);
    sessionStorage.setItem('audioInitialized', 'true');
}

// Ekspor fungsi untuk digunakan di file lain
window.audioControl = {
    toggleAudio,
    startBackgroundMusic
};
