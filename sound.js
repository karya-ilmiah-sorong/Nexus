class SoundManager {
    constructor() {
        this.audioContext = null;
        this.soundGain = null;
        this.isPlaying = false;
        this.init();
    }

    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.soundGain = this.audioContext.createGain();
            this.soundGain.connect(this.audioContext.destination);
        } catch (e) {
            console.warn("Web Audio API not supported");
        }
    }

    playLoginSound() {
        if (!this.audioContext) return;

        const osc = this.audioContext.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, this.audioContext.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, this.audioContext.currentTime + 0.3); // E5
        
        const gainNode = this.audioContext.createGain();
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        
        osc.connect(gainNode);
        gainNode.connect(this.soundGain);
        
        osc.start();
        osc.stop(this.audioContext.currentTime + 0.5);
    }

    stopAllSounds() {
        if (this.audioContext) {
            this.soundGain.gain.setValueAtTime(this.soundGain.gain.value, this.audioContext.currentTime);
            this.soundGain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
            setTimeout(() => {
                if (this.audioContext.state !== 'closed') {
                    this.audioContext.close();
                }
            }, 100);
        }
    }
}

// Singleton instance
const soundManager = new SoundManager();

// Event saat meninggalkan halaman
window.addEventListener('beforeunload', () => {
    soundManager.stopAllSounds();
});

// Event saat visibilitas berubah (tab tidak aktif)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        soundManager.stopAllSounds();
    }
});