class AudioPlayer {
    constructor() {
        this.audio = new Audio('1.mp3');
        this.audio.loop = true;
        this.audio.volume = 0.5;
        this.isPlaying = false;

        // Event untuk handle tab/window close
        window.addEventListener('beforeunload', () => {
            this.stop();
        });

        // Cek session untuk lanjutkan pemutaran
        if (sessionStorage.getItem('audioPlaying') === 'true') {
            this.play();
        }
    }

    play() {
        if (!this.isPlaying) {
            this.audio.play()
                .then(() => {
                    this.isPlaying = true;
                    sessionStorage.setItem('audioPlaying', 'true');
                })
                .catch(error => {
                    console.log('Autoplay prevented:', error);
                    // Fallback untuk mobile devices
                    document.addEventListener('click', this.playOnInteraction.bind(this), { once: true });
                });
        }
    }

    playOnInteraction() {
        this.audio.play()
            .then(() => {
                this.isPlaying = true;
                sessionStorage.setItem('audioPlaying', 'true');
            });
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
        sessionStorage.removeItem('audioPlaying');
    }
}

// Inisialisasi player
const backgroundMusic = new AudioPlayer();

// Otomatis play saat login
if (window.location.pathname.includes('menu.html') || 
    window.location.pathname === '/') {
    document.addEventListener('DOMContentLoaded', () => {
        if (sessionStorage.getItem('isAuthenticated') === 'true') {
            backgroundMusic.play();
        }
    });
}
