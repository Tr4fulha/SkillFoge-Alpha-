
class AudioEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  private getCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.ctx;
  }

  setMuted(val: boolean) {
    this.muted = val;
  }

  private createOscillator(freq: number, type: OscillatorType, duration: number, volume: number = 0.1) {
    if (this.muted) return;
    const ctx = this.getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  }

  playTap() {
    this.createOscillator(800, 'sine', 0.1, 0.1);
  }

  playTab() {
    this.createOscillator(400, 'triangle', 0.15, 0.05);
  }

  playSuccess() {
    const ctx = this.getCtx();
    const freqs = [440, 554.37, 659.25, 880];
    freqs.forEach((f, i) => {
      setTimeout(() => {
        this.createOscillator(f, 'sine', 0.3, 0.08);
      }, i * 100);
    });
  }

  playUnlock() {
    this.createOscillator(200, 'sine', 0.1, 0.1);
    setTimeout(() => this.createOscillator(600, 'sine', 0.2, 0.1), 100);
  }

  playError() {
    this.createOscillator(150, 'square', 0.1, 0.05);
    setTimeout(() => this.createOscillator(100, 'square', 0.2, 0.05), 120);
  }

  playFlip() {
    this.createOscillator(300, 'sine', 0.05, 0.05);
    setTimeout(() => this.createOscillator(450, 'sine', 0.05, 0.05), 50);
  }
}

export const audio = new AudioEngine();
