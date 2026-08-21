/**
 * Clipzy Audio Synthesizer (Zero-dependency Web Audio API)
 * Generates rich, punchy procedural sound effects for avatar animations,
 * interactive clicks, squishes, combos, and video creations.
 */

class SoundEngine {
  private ctx: AudioContext | null = null
  private _muted = false
  private _volume = 0.6

  get muted() {
    return this._muted
  }
  set muted(val: boolean) {
    this._muted = val
  }

  get volume() {
    return this._volume
  }
  set volume(val: number) {
    this._volume = Math.max(0, Math.min(1, val))
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
    return this.ctx
  }

  playPop(freq = 420) {
    if (this._muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq * 1.5, now)
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + 0.08)

    gain.gain.setValueAtTime(this._volume * 0.7, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.08)
  }

  playSquish() {
    if (this._muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(240, now)
    osc.frequency.linearRampToValueAtTime(140, now + 0.05)
    osc.frequency.linearRampToValueAtTime(320, now + 0.12)

    gain.gain.setValueAtTime(this._volume * 0.5, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.14)
  }

  playLaser() {
    if (this._muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(950, now)
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.16)

    gain.gain.setValueAtTime(this._volume * 0.4, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.16)
  }

  playPowerCharge() {
    if (this._muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(120, now)
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.4)

    gain.gain.setValueAtTime(0.01, now)
    gain.gain.linearRampToValueAtTime(this._volume * 0.6, now + 0.3)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.45)
  }

  playChime() {
    if (this._muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const now = ctx.currentTime
    const freqs = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6

    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(f, now + i * 0.05)

      gain.gain.setValueAtTime(0, now)
      gain.gain.setValueAtTime(this._volume * 0.35, now + i * 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.35)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now + i * 0.05)
      osc.stop(now + i * 0.05 + 0.35)
    })
  }

  playGlitch() {
    if (this._muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const now = ctx.currentTime
    const bufferSize = Math.floor(ctx.sampleRate * 0.12)
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(1400, now)
    filter.Q.setValueAtTime(8, now)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(this._volume * 0.5, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    noise.start(now)
  }

  playBeatDrop() {
    if (this._muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(180, now)
    osc.frequency.exponentialRampToValueAtTime(42, now + 0.25)

    gain.gain.setValueAtTime(this._volume * 0.9, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.3)
  }

  playWhoosh() {
    if (this._muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(260, now)
    osc.frequency.exponentialRampToValueAtTime(620, now + 0.1)
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.22)

    gain.gain.setValueAtTime(0.01, now)
    gain.gain.linearRampToValueAtTime(this._volume * 0.4, now + 0.1)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.22)
  }

  playStateSound(state: string) {
    switch (state) {
      case 'power':
      case 'burst':
        this.playPowerCharge()
        break
      case 'laser':
      case 'action':
      case 'alert':
      case 'exclaim':
        this.playLaser()
        break
      case 'heart':
      case 'wink':
      case 'excited':
      case 'royal':
      case 'magic':
        this.playChime()
        break
      case 'glitch':
      case 'retro':
        this.playGlitch()
        break
      case 'djbeat':
      case 'disco':
      case 'rocket':
        this.playBeatDrop()
        break
      case 'vortex':
      case 'orbit':
      case 'comet':
      case 'peek':
      case 'ninja':
        this.playWhoosh()
        break
      case 'thuglife':
      case 'curious':
      case 'nod':
      case 'nope':
      case 'freeze':
      case 'dizzy':
      case 'hyper':
        this.playSquish()
        break
      default:
        this.playPop()
        break
    }
  }
}

export const sfx = new SoundEngine()
