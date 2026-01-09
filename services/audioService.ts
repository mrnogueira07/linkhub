/**
 * A simple audio service using Web Audio API to avoid external dependencies for SFX.
 * Handles synthesized beeps and managing an HTML5 Audio element for ambient music.
 */
class AudioService {
  private audioContext: AudioContext | null = null;
  private ambientTrack: HTMLAudioElement | null = null;
  private isMuted: boolean = true;

  constructor() {
    // Initialize lazily on user interaction due to browser policies
  }

  private initContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ambientTrack) {
      if (muted) {
        this.ambientTrack.pause();
      } else {
        this.ambientTrack.play().catch(e => console.error("Audio play failed:", e));
      }
    }
  }

  public playHoverSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioContext) return;

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.audioContext.currentTime + 0.1);

    gain.gain.setValueAtTime(0.05, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.start();
    osc.stop(this.audioContext.currentTime + 0.1);
  }

  public playClickSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioContext) return;

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.15);

    gain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.start();
    osc.stop(this.audioContext.currentTime + 0.15);
  }

  public initAmbientMusic(url: string) {
    if (this.ambientTrack) return;
    
    this.ambientTrack = new Audio(url);
    this.ambientTrack.loop = true;
    this.ambientTrack.volume = 0.3;
    
    // Attempt to play if not muted (browsers might block this until interaction)
    if (!this.isMuted) {
      this.ambientTrack.play().catch(() => {
        // If auto-play blocked, we wait for user interaction to unmute
        this.isMuted = true;
      });
    }
  }
}

export const audioService = new AudioService();