# 🎭 Tipsy — Animated SVG & 3D Avatar Studio

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D.svg?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**An interactive procedural SVG and 3D vector avatar studio.**  
Featuring **22 organic vector animation states**, **26 morphing body shapes**, real-time **3D physics & cursor gaze tracking**, a **multi-track timeline montage editor**, and universal exports to **SVG, PNG, GIF, and MP4**.

[Live Repository](https://github.com/Saravanaofficialpmv/Tipsy-Animated-avatar) • [Report Issue](https://github.com/Saravanaofficialpmv/Tipsy-Animated-avatar/issues)

</div>

---

## ✨ Features

### 🎭 22 Vector Animation States
Pure mathematical SVG vector morphing with sub-pixel interpolation — no heavy external animation runtimes:
- **14 Measured Classic Animations**: *Idle, Thinking, Wink, Wide Eyes, Alert, Notification, Exclamation, Sleep, Egg, Hexagon, Play, Orbit, Burst, Comet*
- **8 Expressive Personality States**:
  - 👀 **Peek**: Peeks forward, scans surroundings with gaze targeting, returns smoothly.
  - 🤨 **Curious**: Inquisitive head tilt left → questioning pause → tilt right → center.
  - 🫣 **Shy**: Ducks downward & backward with squinted eyes, timid pause, peeks forward.
  - 🤩 **Excited**: Double hop bounce with dynamic squash & stretch + dilated eyes.
  - 😊 **Nod**: Affirmative double nod bob with smooth 3D pitch.
  - 😑 **Nope**: Skeptical head shake left → right → left → center with narrowed eye slits.
  - 👋 **Hello**: Energetic forward pop with friendly waving head roll.
  - 😴 **Sleepy**: Drowsy downward drooping and nod pause $\rightarrow$ startled wake-up snap!

---

### 🔷 26 Procedural Morphing Shapes
Every shape dynamically morphs its vector hull while maintaining perfect face alignment and eye boundaries:
- **🫧 Organic & Soft**: *Sphere, Blob, Bean, Jelly, Pebble, Bubble, Cloud, Droplet, Squircle, Mochi, Gummy, Puffy*
- **🔷 Geometric & Sharp**: *Rounded Cube, Capsule, Triangle Blob, Hexagon, Diamond, Cylinder, Crystal*
- **🪐 Playful & Complex**: *Star Blob, Planet, Egg, Orbital, Spiky Blob, Donut, Wobble*

---

### 👓 Facial Traits & Customization
- **Eye & Feature Sizing**: Small, Medium, Large
- **Eyebrows**: None, Arched, Straight, Dots
- **Nose Styles**: None, Dot, Pill, Snout
- **Cheeks**: None, Blush, Dots, Stripes
- **Mouth Styles**: None, Smile, Grin, Frown, Open, Cat, Straight
- **Color Palette**: 12 curated palettes + custom HEX / RGB / HSL color picker

---

### ✨ 3D Motion & Interactive Gaze System
- **Cursor Tracking**: Natural gaze following and head parallax.
- **3D Physics Overlay**: 3D floating levitation, spring dynamics, and perspective depth.
- **Auto Mood**: Autonomous mood transitions triggered by cursor speed and proximity.

---

### 🎬 Timeline Montage Editor
- **Non-destructive sequencing**: Arrange clips on a multi-block timeline track.
- **Drag & drop reordering**: Live card displacement with smooth transitions.
- **Duration stretching**: Drag edge handles to dynamically customize each state duration.
- **Scrubbing & loop playback**: Real-time playhead scrubber with sub-second precision.

---

### 💾 Universal Multi-Format Exporter
- **PNG**: Crisp transparent raster export with customizable resolution.
- **SVG**: Pure vector standalone code or static SVG file.
- **Animated SVG**: Self-contained SVG with embedded CSS keyframe animation.
- **Animated GIF**: Universal looping GIF (supports transparent or solid backgrounds).
- **MP4 Video**: High-definition video render with hardware-accelerated encoding.

---

### 🌍 Multi-Language Support (9 Languages)
Fully localized across all interfaces, animation states, shapes, and facial features:
- 🇬🇧 **English** (`en`)
- 🇫🇷 **Français** (`fr`)
- 🇪🇸 **Español** (`es`)
- 🇩🇪 **Deutsch** (`de`)
- 🇯🇵 **日本語** (`ja`)
- 🇨🇳 **简体中文** (`zh`)
- 🇧🇷 **Português** (`pt`)
- 🇮🇹 **Italiano** (`it`)
- 🇮🇳 **தமிழ்** (`ta`)

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/Saravanaofficialpmv/Tipsy-Animated-avatar.git
cd Tipsy-Animated-avatar
```

### 2. Install dependencies
```bash
npm install
# or
pnpm install
```

### 3. Start development server
```bash
npm run dev
# or
pnpm dev
```
Open [http://localhost:5190](http://localhost:5190) in your browser.

### 4. Run automated test suite
```bash
npm test
# or
pnpm test
```

### 5. Build for production
```bash
npm run build
# or
pnpm build
```

---

## 🧩 Using the Component in Vue 3

### Interactive 3D Bot
```vue
<script setup lang="ts">
import TibsyInteractiveBot from '@/components/TibsyInteractiveBot.vue'
</script>

<template>
  <TibsyInteractiveBot
    :size="320"
    color="#a855f7"
    shape="blob"
    state="excited"
    feature-size="medium"
    eyebrows="arched"
    nose="dot"
    cheeks="blush"
    mouth="smile"
    :follow="true"
    :auto-mood="true"
    idle-animation="float"
  />
</template>
```

### Standalone Animated Vector Bot
```vue
<script setup lang="ts">
import BloubBot from '@/components/BloubBot.vue'
</script>

<template>
  <!-- Plays the 'orbit' animation -->
  <BloubBot state="orbit" :size="200" color="#3b82f6" shape="nuage" />

  <!-- Frozen thumbnail at exact second 1.2 -->
  <BloubBot state="curious" :size="120" :frozen-at="1.2" />
</template>
```

---

## 👥 Authors & Credits

Crafted with ❤️ by:

- **Saroo** — [saroo.online](https://saroo.online)
- **Tharani** — [tharaniresume.vercel.app](https://tharaniresume.vercel.app)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
