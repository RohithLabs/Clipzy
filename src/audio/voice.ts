/**
 * Clipzy Voice & Audio Reactive Lip-Sync Engine
 * Real-time microphone audio frequency analysis and Web Speech API
 * text-to-speech avatar mouth animation.
 */

import type { MouthStyle } from '@/bot/face'

export class VoiceLipSyncEngine {
  private audioCtx: AudioContext | null = null
  private analyser: AnalyserNode | null = null
  private micStream: MediaStream | null = null
  private isListening = false
  private animFrameId = 0
  private dataArray: Uint8Array<ArrayBuffer> | null = null

  private onMouthChangeCallback: ((mouth: MouthStyle, volume: number) => void) | null = null

  public setMouthCallback(cb: (mouth: MouthStyle, volume: number) => void): void {
    this.onMouthChangeCallback = cb
  }

  public async startMicrophone(): Promise<boolean> {
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        this.audioCtx = new AudioContextClass()
      }

      if (this.audioCtx.state === 'suspended') {
        await this.audioCtx.resume()
      }

      this.micStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const source = this.audioCtx.createMediaStreamSource(this.micStream)

      this.analyser = this.audioCtx.createAnalyser()
      this.analyser.fftSize = 256
      this.analyser.smoothingTimeConstant = 0.6
      source.connect(this.analyser)

      this.dataArray = new Uint8Array(new ArrayBuffer(this.analyser.frequencyBinCount))
      this.isListening = true
      this.loop()
      return true
    } catch (err) {
      console.warn('Microphone access denied or unavailable:', err)
      return false
    }
  }

  public stopMicrophone(): void {
    this.isListening = false
    cancelAnimationFrame(this.animFrameId)

    if (this.micStream) {
      this.micStream.getTracks().forEach((t) => t.stop())
      this.micStream = null
    }

    if (this.onMouthChangeCallback) {
      this.onMouthChangeCallback('smile', 0)
    }
  }

  public getIsListening(): boolean {
    return this.isListening
  }

  private loop = (): void => {
    if (!this.isListening || !this.analyser || !this.dataArray) return
    this.animFrameId = requestAnimationFrame(this.loop)

    this.analyser.getByteFrequencyData(this.dataArray)

    let sum = 0
    for (let i = 0; i < this.dataArray.length; i++) {
      sum += this.dataArray[i]!
    }

    const avg = sum / this.dataArray.length
    const volume = Math.min(1, avg / 80)

    let mouth: MouthStyle = 'smile'
    if (volume < 0.08) {
      mouth = 'smile'
    } else if (volume < 0.28) {
      mouth = 'grin'
    } else if (volume < 0.6) {
      mouth = 'open'
    } else {
      mouth = 'open'
    }

    if (this.onMouthChangeCallback) {
      this.onMouthChangeCallback(mouth, volume)
    }
  }

  /**
   * Speaks user text with text-to-speech and animates mouth frames
   */
  public speakText(text: string, onEnd?: () => void): void {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported.')
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.05
    utterance.pitch = 1.2

    let speechTimer: ReturnType<typeof setInterval>

    utterance.onstart = () => {
      let toggle = false
      speechTimer = setInterval(() => {
        toggle = !toggle
        if (this.onMouthChangeCallback) {
          const mouth: MouthStyle = toggle ? 'open' : 'grin'
          this.onMouthChangeCallback(mouth, toggle ? 0.7 : 0.3)
        }
      }, 120)
    }

    const finish = () => {
      clearInterval(speechTimer)
      if (this.onMouthChangeCallback) {
        this.onMouthChangeCallback('smile', 0)
      }
      if (onEnd) onEnd()
    }

    utterance.onend = finish
    utterance.onerror = finish

    window.speechSynthesis.speak(utterance)
  }
}

export const voiceEngine = new VoiceLipSyncEngine()
