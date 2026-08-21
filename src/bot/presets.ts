/**
 * Clipzy Character Presets & JSON Cloud Storage
 */

import type { HatId, GlassesId, PropId, AuraId } from './accessories'
import type { FeatureSize, EyebrowsStyle, NoseStyle, CheeksStyle, MouthStyle } from './face'
import type { ShapeId } from './skins'

export interface CharacterPreset {
  id: string
  name: string
  tagline: string
  color: string
  shape: ShapeId
  expression: string
  hat: HatId
  glasses: GlassesId
  prop: PropId
  aura: AuraId
  featureSize?: FeatureSize
  eyebrows?: EyebrowsStyle
  nose?: NoseStyle
  cheeks?: CheeksStyle
  mouth?: MouthStyle
}

export const COMMUNITY_PRESETS: CharacterPreset[] = [
  {
    id: 'cyber_ninja',
    name: 'Cyber Ninja',
    tagline: 'Silent shadow warrior with neon katana',
    color: '#10b981',
    shape: 'triangle',
    expression: 'attentif',
    hat: 'catears',
    glasses: 'cyber',
    prop: 'lightsaber',
    aura: 'matrix'
  },
  {
    id: 'neon_dj',
    name: 'Neon Beat DJ',
    tagline: 'Dropping basslines across the metaverse',
    color: '#06b6d4',
    shape: 'rounded_cube',
    expression: 'heureux',
    hat: 'beanie',
    glasses: 'thug',
    prop: 'mic',
    aura: 'neon'
  },
  {
    id: 'golden_royal',
    name: 'Golden Sovereign',
    tagline: 'Pure 24K royalty with starry vision',
    color: '#f59e0b',
    shape: 'cercle',
    expression: 'fier',
    hat: 'crown',
    glasses: 'star',
    prop: 'wand',
    aura: 'sparks'
  },
  {
    id: 'kawaii_mochi',
    name: 'Kawaii Mochi',
    tagline: 'Super cute anime sweetheart',
    color: '#f43f5e',
    shape: 'jelly',
    expression: 'heureux',
    hat: 'catears',
    glasses: 'round',
    prop: 'coffee',
    aura: 'fire'
  },
  {
    id: 'coffee_addict',
    name: 'Monday Caffeine',
    tagline: 'Powered by 4 shots of espresso',
    color: '#d97706',
    shape: 'bean',
    expression: 'surpris',
    hat: 'beanie',
    glasses: 'round',
    prop: 'coffee',
    aura: 'speed'
  },
  {
    id: 'space_explorer',
    name: 'Cosmic Voyager',
    tagline: 'Navigating deep space galaxy rings',
    color: '#6366f1',
    shape: 'capsule',
    expression: 'curieux',
    hat: 'vr',
    glasses: 'cyber',
    prop: 'gamepad',
    aura: 'neon'
  },
  {
    id: 'retro_gamer',
    name: '8-Bit Arcade Master',
    tagline: 'Speedrunning classic arcade levels',
    color: '#a855f7',
    shape: 'squircle',
    expression: 'hilare',
    hat: 'tophat',
    glasses: 'star',
    prop: 'gamepad',
    aura: 'sparks'
  },
  {
    id: 'party_beast',
    name: 'Party Beast',
    tagline: 'Celebration confetti overload',
    color: '#ec4899',
    shape: 'blob',
    expression: 'hilare',
    hat: 'party',
    glasses: 'star',
    prop: 'sparkler',
    aura: 'fire'
  },
  {
    id: 'chill_companion',
    name: 'Lo-Fi Chill Buddy',
    tagline: 'Relaxed vibes for study sessions',
    color: '#14b8a6',
    shape: 'galet',
    expression: 'neutre',
    hat: 'beanie',
    glasses: 'monocle',
    prop: 'coffee',
    aura: 'speed'
  },
  {
    id: 'ice_wizard',
    name: 'Frost Archmage',
    tagline: 'Casting blizzard spells of pure ice',
    color: '#38bdf8',
    shape: 'diamond',
    expression: 'attentif',
    hat: 'halo',
    glasses: 'round',
    prop: 'wand',
    aura: 'neon'
  },
  {
    id: 'glitch_monster',
    name: 'Cyberpunk Daemon',
    tagline: 'Corrupted byte matrix demon',
    color: '#84cc16',
    shape: 'hexagone',
    expression: 'confus',
    hat: 'devil',
    glasses: 'cyber',
    prop: 'lightsaber',
    aura: 'matrix'
  },
  {
    id: 'fire_champion',
    name: 'Flame Gladiator',
    tagline: 'Blazing battle warrior of fire',
    color: '#ef4444',
    shape: 'star_blob',
    expression: 'fier',
    hat: 'crown',
    glasses: 'thug',
    prop: 'sparkler',
    aura: 'fire'
  }
]

export function exportPresetJSON(preset: CharacterPreset): void {
  const data = JSON.stringify(preset, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${preset.name.toLowerCase().replace(/\s+/g, '-')}.clipzy`
  a.click()
  URL.revokeObjectURL(url)
}

export function parsePresetJSON(json: string): CharacterPreset | null {
  try {
    const obj = JSON.parse(json)
    if (obj.name && obj.color && obj.shape) {
      return obj as CharacterPreset
    }
    return null
  } catch {
    return null
  }
}
