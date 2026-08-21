/**
 * Clipzy Combos & Montage Presets
 * Pre-built multi-state animation sequences and smart combo choreography generator.
 */

import type { Block } from './cycles'
import type { StateId } from './states'

export interface ComboPreset {
  id: string
  name: string
  category: 'viral' | 'cyber' | 'hype' | 'chill' | 'fun'
  description: string
  icon: string
  gradient: string
  blocks: Block[]
}

export const SIGNATURE_COMBOS: ComboPreset[] = [
  {
    id: 'viral_hook',
    name: 'Viral Reel Hook',
    category: 'viral',
    description: 'Instant attention grabber designed for TikTok & Reels openings.',
    icon: '🔥',
    gradient: 'from-amber-500 to-rose-500',
    blocks: [
      { state: 'alert', duration: 0.8 },
      { state: 'exclaim', duration: 0.8 },
      { state: 'curious', duration: 1.2 },
      { state: 'power', duration: 2.0 },
      { state: 'excited', duration: 1.6 },
      { state: 'wink', duration: 1.0 }
    ]
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Overdrive',
    category: 'cyber',
    description: 'Futuristic glitch matrix with warp vortex and electric charging.',
    icon: '⚡',
    gradient: 'from-cyan-500 to-blue-600',
    blocks: [
      { state: 'glitch', duration: 1.4 },
      { state: 'vortex', duration: 1.8 },
      { state: 'orbit', duration: 2.0 },
      { state: 'comet', duration: 1.8 },
      { state: 'power', duration: 2.2 }
    ]
  },
  {
    id: 'kawaii_crush',
    name: 'Kawaii Love Pulse',
    category: 'fun',
    description: 'Adorable shy peek blooming into a heart-throb pulse.',
    icon: '💖',
    gradient: 'from-pink-500 to-rose-400',
    blocks: [
      { state: 'shy', duration: 1.2 },
      { state: 'peek', duration: 1.5 },
      { state: 'heart', duration: 2.2 },
      { state: 'nod', duration: 1.4 },
      { state: 'hello', duration: 1.6 }
    ]
  },
  {
    id: 'boss_flex',
    name: 'Boss Level Flex',
    category: 'hype',
    description: 'Royal crowning moment followed by pixel shades thug life lean.',
    icon: '👑',
    gradient: 'from-amber-400 to-yellow-600',
    blocks: [
      { state: 'hello', duration: 1.2 },
      { state: 'royal', duration: 2.0 },
      { state: 'thuglife', duration: 2.2 },
      { state: 'wink', duration: 1.2 },
      { state: 'idle', duration: 1.5 }
    ]
  },
  {
    id: 'midnight_party',
    name: 'Midnight Club Rave',
    category: 'hype',
    description: 'Heavy bass headbang transitioning into disco dance and blastoff.',
    icon: '🕺',
    gradient: 'from-purple-600 to-indigo-600',
    blocks: [
      { state: 'djbeat', duration: 2.4 },
      { state: 'disco', duration: 2.5 },
      { state: 'rocket', duration: 2.0 },
      { state: 'burst', duration: 1.5 }
    ]
  },
  {
    id: 'ninja_strike',
    name: 'Shadow Ninja Strike',
    category: 'viral',
    description: 'Stealth smoke puff, swift dimensional dash, and action finish.',
    icon: '🥷',
    gradient: 'from-slate-700 to-slate-950',
    blocks: [
      { state: 'ninja', duration: 1.8 },
      { state: 'vortex', duration: 1.6 },
      { state: 'glitch', duration: 1.2 },
      { state: 'action', duration: 1.8 },
      { state: 'wink', duration: 1.0 }
    ]
  },
  {
    id: 'morning_to_night',
    name: 'Monday Survival Story',
    category: 'fun',
    description: 'From sleepy slump to caffeine overdrive to cartoon dizzy slump.',
    icon: '☕',
    gradient: 'from-emerald-500 to-teal-700',
    blocks: [
      { state: 'sleepy', duration: 1.8 },
      { state: 'thinking', duration: 1.5 },
      { state: 'hyper', duration: 1.8 },
      { state: 'dizzy', duration: 1.6 },
      { state: 'sleep', duration: 2.0 }
    ]
  },
  {
    id: 'grand_illusion',
    name: 'Grand Magic Illusion',
    category: 'fun',
    description: 'Fairy magic sparkles, frosty crystal freeze, and radiant burst.',
    icon: '🪄',
    gradient: 'from-fuchsia-500 to-violet-600',
    blocks: [
      { state: 'magic', duration: 2.0 },
      { state: 'freeze', duration: 1.8 },
      { state: 'power', duration: 2.0 },
      { state: 'burst', duration: 1.5 },
      { state: 'hello', duration: 1.6 }
    ]
  },
  {
    id: 'hype_beast',
    name: 'Hype Beast Speedrun',
    category: 'hype',
    description: 'Pure adrenaline with instant alert, caffeine zoom, and rocket launch.',
    icon: '🚀',
    gradient: 'from-orange-500 to-red-600',
    blocks: [
      { state: 'alert', duration: 0.7 },
      { state: 'hyper', duration: 1.5 },
      { state: 'power', duration: 2.0 },
      { state: 'rocket', duration: 2.2 },
      { state: 'excited', duration: 1.8 }
    ]
  },
  {
    id: 'chill_vibes',
    name: 'Lo-Fi Chill Companion',
    category: 'chill',
    description: 'Calm breathing rhythm with gentle nodding, peeking, and winks.',
    icon: '🫧',
    gradient: 'from-sky-400 to-indigo-400',
    blocks: [
      { state: 'idle', duration: 2.0 },
      { state: 'nod', duration: 1.5 },
      { state: 'peek', duration: 1.6 },
      { state: 'wink', duration: 1.2 },
      { state: 'thinking', duration: 1.8 }
    ]
  }
]

export function generateSmartCombo(vibe: 'hype' | 'chill' | 'cyber' | 'cute' | 'dramatic', length = 5): Block[] {
  const poolByVibe: Record<'hype' | 'chill' | 'cyber' | 'cute' | 'dramatic', StateId[]> = {
    hype: ['alert', 'hyper', 'power', 'rocket', 'excited', 'djbeat', 'burst'],
    chill: ['idle', 'nod', 'peek', 'sleepy', 'wink', 'thinking'],
    cyber: ['glitch', 'vortex', 'orbit', 'comet', 'power', 'action'],
    cute: ['heart', 'shy', 'peek', 'hello', 'nod', 'wink', 'excited'],
    dramatic: ['alert', 'exclaim', 'freeze', 'dizzy', 'action', 'vortex', 'royal']
  }

  const selectedStates: StateId[] = poolByVibe[vibe] ?? poolByVibe.hype
  const result: Block[] = []

  for (let i = 0; i < length; i++) {
    const state = selectedStates[i % selectedStates.length] ?? 'idle'
    const duration = 1.2 + (i % 3) * 0.4
    result.push({ state, duration })
  }

  return result
}
