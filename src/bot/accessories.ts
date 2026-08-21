/**
 * Clipzy Accessories & Props System
 * Vector hats, glasses, hand items, and aura effects that align with avatar 3D gaze
 */

export type HatId = 'none' | 'crown' | 'party' | 'tophat' | 'catears' | 'halo' | 'devil' | 'beanie' | 'vr'
export type GlassesId = 'none' | 'thug' | 'cyber' | 'round' | 'star' | 'monocle'
export type PropId = 'none' | 'mic' | 'gamepad' | 'coffee' | 'wand' | 'lightsaber' | 'sparkler'
export type AuraId = 'none' | 'neon' | 'fire' | 'matrix' | 'sparks' | 'speed'

export interface AccessoryItem<T extends string = string> {
  id: T
  label: string
  icon: string
}

export const HATS: AccessoryItem<HatId>[] = [
  { id: 'none', label: 'None', icon: '🚫' },
  { id: 'crown', label: 'Royal Crown', icon: '👑' },
  { id: 'party', label: 'Party Cone', icon: '🎉' },
  { id: 'tophat', label: 'Magician Hat', icon: '🎩' },
  { id: 'catears', label: 'Cat Ears', icon: '🐱' },
  { id: 'halo', label: 'Angel Halo', icon: '😇' },
  { id: 'devil', label: 'Devil Horns', icon: '😈' },
  { id: 'beanie', label: 'Winter Beanie', icon: '🧢' },
  { id: 'vr', label: 'VR Headset', icon: '🥽' }
]

export const GLASSES: AccessoryItem<GlassesId>[] = [
  { id: 'none', label: 'None', icon: '🚫' },
  { id: 'thug', label: 'Pixel Thug', icon: '🕶️' },
  { id: 'cyber', label: 'Cyber Visor', icon: '🥽' },
  { id: 'round', label: 'Cute Round', icon: '👓' },
  { id: 'star', label: 'Star Shades', icon: '⭐' },
  { id: 'monocle', label: 'Fancy Monocle', icon: '🧐' }
]

export const PROPS: AccessoryItem<PropId>[] = [
  { id: 'none', label: 'None', icon: '🚫' },
  { id: 'mic', label: 'Vocal Mic', icon: '🎤' },
  { id: 'gamepad', label: 'Gaming Controller', icon: '🎮' },
  { id: 'coffee', label: 'Coffee Cup', icon: '☕' },
  { id: 'wand', label: 'Magic Wand', icon: '🪄' },
  { id: 'lightsaber', label: 'Laser Saber', icon: '⚔️' },
  { id: 'sparkler', label: 'Sparkler', icon: '✨' }
]

export const AURAS: AccessoryItem<AuraId>[] = [
  { id: 'none', label: 'None', icon: '🚫' },
  { id: 'neon', label: 'Neon Cyber Glow', icon: '💠' },
  { id: 'fire', label: 'Flame Aura', icon: '🔥' },
  { id: 'matrix', label: 'Matrix Grid', icon: '⚡' },
  { id: 'sparks', label: 'Cosmic Sparks', icon: '✨' },
  { id: 'speed', label: 'Manga Speedlines', icon: '💨' }
]

export interface AccessoryConfig {
  hat: HatId
  glasses: GlassesId
  prop: PropId
  aura: AuraId
}

export const DEFAULT_ACCESSORIES: AccessoryConfig = {
  hat: 'none',
  glasses: 'none',
  prop: 'none',
  aura: 'none'
}
