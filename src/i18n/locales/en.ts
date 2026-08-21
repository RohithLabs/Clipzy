import type fr from './fr'

/**
 * Le type `typeof fr` est le verrou : une cle oubliee ou mal orthographiee est
 * une erreur de compilation nommee, pas une chaine manquante decouverte a
 * l'ecran.
 */
const en: typeof fr = {
  app: {
    name: 'clipzy',
    title: 'clipzy — animated vector avatar & clip video studio',
    botAria: 'Animated clipzy avatar'
  },

  gallery: {
    back: 'Back to the player'
  },

  rail: {
    nav: 'Sections',
    customize: 'Customise',
    animations: 'Animations',
    combos: 'Combos & Story',
    reel: 'Reel Studio',
    lab3d: '3D Lab',
    settings: 'Settings'
  },

  panel: {
    animations: 'Animation',
    shape: 'Shape',
    expression: 'Expression',
    featureSize: 'Feature size',
    faceElements: 'Face elements',
    eyebrows: 'Eyebrows',
    nose: 'Nose',
    cheeks: 'Cheeks',
    mouth: 'Mouth',
    hats: 'Hats & Headwear',
    glasses: 'Glasses & Shades',
    props: 'Props & Items',
    auras: 'Aura & Energy FX',
    color: 'Colour'
  },

  export: {
    action: 'Export as PNG',
    more: 'Other formats',
    png: 'Download PNG',
    svg: 'Download SVG',
    anime: 'Download animated SVG',
    gif: 'Download animated GIF',
    cycleDetail: 'The video is lighter and smoother; the GIF plays anywhere.',
    cycleFormat: 'Format',
    cycle_mp4: 'MP4 video',
    cycle_mp4_aide: 'Light and smooth, needs a background',
    cycle_gif: 'Animated GIF',
    cycle_gif_aide: 'Plays anywhere, heavier',
    cycleProgress: 'Exporting…',
    cycleReessayer: 'Try again',
    gifTitle: 'Download animated GIF',
    gifDetail:
      'GIF transparency is all-or-nothing: with no background, the ball\u2019s edge comes out a little hard.',
    gifBackground: 'Background',
    fond_blanc: 'White background',
    fond_blanc_aide: 'Smooth edge, for light surfaces',
    fond_transparent: 'Transparent background',
    fond_transparent_aide: 'Fits any background, edge a little hard',
    gifConfirm: 'Download',
    copie: 'Copy image',
    copieSvg: 'Copy SVG',
    done: 'Exported',
    copied: 'Copied',
    failed: 'Export failed'
  },

  preview: {
    exit: 'Exit preview',
    key: 'Esc'
  },

  timeline: {
    play: 'Start playback',
    pause: 'Stop playback',
    addAnimation: 'Add an animation',
    preview: 'Preview',
    export: 'Export the montage',
    zoom: 'Track zoom',
    blockAria: '{state}, {duration}',
    blockDurationAria: 'Duration of {state}, {duration}',
    blockRemoveAria: 'Remove {state}'
  },

  dialog: {
    cancel: 'Cancel',
    nameCreateTitle: 'New cycle',
    nameRenameTitle: 'Rename cycle',
    nameField: 'Cycle name',
    nameCreate: 'Create',
    nameRename: 'Rename',
    removeTitle: 'Delete "{name}"?',
    removeDetail:
      'This sequence will be lost, along with its animation. | This sequence will be lost, along with its {n} animations.',
    removeConfirm: 'Delete'
  },

  cycles: {
    defaultName: 'Default cycle',
    newName: 'My cycle',
    menuNew: 'New cycle',
    menuRenameAria: 'Rename {name}',
    menuRemoveAria: 'Delete {name}'
  },

  units: {
    seconds: '{n} s',
    secondsShort: '{n}s'
  },

  settings: {
    title: 'Settings',
    language: 'Language',
    about: 'About',
    credits: 'Crafted with ❤️ by {name}',
    creditsAria: 'Jérémy on X, opens in a new tab',
    github: 'View project on GitHub',
    githubAria: 'The project repository on GitHub, opens in a new tab'
  },

  states: {
    idle: 'Idle',
    thinking: 'Thinking',
    wink: 'Wink',
    wide: 'Wide Eyes',
    alert: 'Alert',
    notify: 'Notification',
    exclaim: 'Exclamation',
    sleep: 'Sleep',
    egg: 'Egg',
    hexagon: 'Hexagon',
    play: 'Play',
    orbit: 'Orbit',
    burst: 'Burst',
    comet: 'Comet',
    peek: 'Peek',
    curious: 'Curious',
    shy: 'Shy',
    excited: 'Excited',
    nod: 'Nod',
    nope: 'Nope',
    hello: 'Hello',
    sleepy: 'Sleepy',
    power: 'Power Surge',
    thuglife: 'Thug Life',
    heart: 'Love Strike',
    disco: 'Disco Dance',
    glitch: 'Cyber Glitch',
    vortex: 'Vortex Warp',
    ninja: 'Ninja Stealth',
    retro: '8-Bit Retro',
    rocket: 'Rocket Blastoff',
    freeze: 'Ice Freeze',
    dizzy: 'Dizzy Stars',
    royal: 'Royal Crown',
    djbeat: 'DJ Bass Drop',
    magic: 'Magic Sparkles',
    action: 'Action Cut',
    hyper: 'Hyper Caffeine',
    swirl: 'Swirl'
  },

  shapes: {
    cercle: 'Sphere',
    blob: 'Blob',
    bean: 'Bean',
    jelly: 'Jelly',
    galet: 'Pebble',
    bubble: 'Bubble',
    nuage: 'Cloud',
    goutte: 'Droplet',
    squircle: 'Squircle',
    rounded_cube: 'Rounded Cube',
    capsule: 'Capsule',
    triangle: 'Triangle Blob',
    hexagone: 'Hexagon',
    diamond: 'Diamond',
    star_blob: 'Star Blob',
    cylinder: 'Cylinder',
    mochi: 'Mochi',
    gummy: 'Gummy',
    puffy: 'Puffy',
    wobble: 'Wobble',
    planet: 'Planet',
    egg: 'Egg',
    orbital: 'Orbital',
    spiky_blob: 'Spiky Blob',
    crystal: 'Crystal',
    donut: 'Donut'
  },

  colors: {
    encre: 'Ink',
    creme: 'Cream',
    brun: 'Brown',
    rouge: 'Red',
    orange: 'Orange',
    ambre: 'Amber',
    vert: 'Green',
    turquoise: 'Turquoise',
    bleu: 'Blue',
    violet: 'Purple',
    rose: 'Pink',
    gris: 'Grey'
  },

  colorChooser: {
    savedColors: 'Saved colors:',
    add: 'Add',
    custom: 'Custom',
    hex: 'Hex',
    rgb: 'RGB',
    hsl: 'HSL',
    opacity: 'Opacity'
  },

  featureSize: {
    small: 'Small',
    medium: 'Medium',
    large: 'Large'
  },

  eyebrows: {
    none: 'None',
    arched: 'Arched',
    straight: 'Straight',
    dots: 'Dots'
  },

  nose: {
    none: 'None',
    dot: 'Dot',
    pill: 'Pill',
    snout: 'Snout'
  },

  cheeks: {
    none: 'None',
    blush: 'Blush',
    dots: 'Dots',
    lines: 'Stripes'
  },

  mouth: {
    none: 'None',
    smile: 'Smile',
    grin: 'Grin',
    frown: 'Frown',
    open: 'Open',
    cat: 'Cat',
    straight: 'Straight'
  },

  expressions: {
    neutre: 'Neutral',
    attentif: 'Attentive',
    surpris: 'Surprised',
    excite: 'Excited',
    heureux: 'Happy',
    hilare: 'Laughing',
    colere: 'Angry',
    triste: 'Sad',
    effraye: 'Scared',
    mefiant: 'Suspicious',
    confus: 'Confused',
    curieux: 'Curious',
    fier: 'Proud',
    timide: 'Shy',
    blase: 'Unimpressed',
    somnolent: 'Sleepy'
  }
}

export default en
