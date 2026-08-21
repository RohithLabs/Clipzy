import type fr from './fr'

const de: typeof fr = {
  app: {
    name: 'clipzy',
    title: 'clipzy — animierter Vektor-Avatar & Clip-Videostudio',
    botAria: 'Animierter clipzy Avatar'
  },

  gallery: {
    back: 'Zurück zum Player'
  },

  rail: {
    nav: 'Bereiche',
    customize: 'Anpassen',
    animations: 'Animationen',
    combos: 'Combos & Story',
    reel: 'Reel Studio',
    lab3d: '3D-Labor',
    settings: 'Einstellungen'
  },

  panel: {
    animations: 'Animation',
    shape: 'Form',
    expression: 'Ausdruck',
    featureSize: 'Merkmalsgröße',
    faceElements: 'Gesichtselemente',
    eyebrows: 'Augenbrauen',
    nose: 'Nase',
    cheeks: 'Wangen',
    mouth: 'Mund',
    hats: 'Hüte & Kopfschmuck',
    glasses: 'Brillen & Visiere',
    props: 'Requisiten & Objekte',
    auras: 'Aura & Energie-FX',
    color: 'Farbe'
  },

  export: {
    action: 'Als PNG exportieren',
    more: 'Weitere Formate',
    png: 'PNG herunterladen',
    svg: 'SVG herunterladen',
    anime: 'Animiertes SVG herunterladen',
    gif: 'Animiertes GIF herunterladen',
    cycleDetail: 'Das Video ist flüssiger; das GIF läuft überall.',
    cycleFormat: 'Format',
    cycle_mp4: 'MP4-Video',
    cycle_mp4_aide: 'Leicht und flüssig, benötigt Hintergrund',
    cycle_gif: 'Animiertes GIF',
    cycle_gif_aide: 'Läuft überall, etwas schwerer',
    cycleProgress: 'Exportiert…',
    cycleReessayer: 'Erneut versuchen',
    gifTitle: 'Animiertes GIF herunterladen',
    gifDetail: 'GIF-Transparenz ist binär: ohne Hintergrund sind Ränder leicht hart.',
    gifBackground: 'Hintergrund',
    fond_blanc: 'Weißer Hintergrund',
    fond_blanc_aide: 'Weiche Ränder für helle Flächen',
    fond_transparent: 'Transparenter Hintergrund',
    fond_transparent_aide: 'Passt zu jedem Hintergrund',
    gifConfirm: 'Herunterladen',
    copie: 'Bild kopieren',
    copieSvg: 'SVG kopieren',
    done: 'Exportiert',
    copied: 'Kopiert',
    failed: 'Export fehlgeschlagen'
  },

  preview: {
    exit: 'Vorschau beenden',
    key: 'Esc'
  },

  timeline: {
    play: 'Wiedergabe starten',
    pause: 'Wiedergabe anhalten',
    addAnimation: 'Animation hinzufügen',
    preview: 'Vorschau',
    export: 'Montage exportieren',
    zoom: 'Spurenzoom',
    blockAria: '{state}, {duration}',
    blockDurationAria: 'Dauer von {state}, {duration}',
    blockRemoveAria: '{state} entfernen'
  },

  dialog: {
    cancel: 'Abbrechen',
    nameCreateTitle: 'Neuer Zyklus',
    nameRenameTitle: 'Zyklus umbenennen',
    nameField: 'Name des Zyklus',
    nameCreate: 'Erstellen',
    nameRename: 'Umbenennen',
    removeTitle: '„{name}“ löschen?',
    removeDetail:
      'Diese Sequenz geht zusammen mit ihrer Animation verloren. | Diese Sequenz geht zusammen mit ihren {n} Animationen verloren.',
    removeConfirm: 'Löschen'
  },

  cycles: {
    defaultName: 'Standardzyklus',
    newName: 'Mein Zyklus',
    menuNew: 'Neuer Zyklus',
    menuRenameAria: '{name} umbenennen',
    menuRemoveAria: '{name} löschen'
  },

  units: {
    seconds: '{n} s',
    secondsShort: '{n}s'
  },

  settings: {
    title: 'Einstellungen',
    language: 'Sprache',
    about: 'Über',
    credits: 'Mit ❤️ erstellt von {name}',
    creditsAria: 'Jérémy auf X, öffnet in neuem Tab',
    github: 'Projekt auf GitHub ansehen',
    githubAria: 'Das Projekt-Repository auf GitHub, öffnet in neuem Tab'
  },

  states: {
    idle: 'Ruhe',
    thinking: 'Nachdenken',
    wink: 'Zwinkern',
    wide: 'Große Augen',
    alert: 'Alarm',
    notify: 'Benachrichtigung',
    exclaim: 'Ausruf',
    sleep: 'Schlaf',
    egg: 'Ei',
    hexagon: 'Sechseck',
    play: 'Spielen',
    orbit: 'Orbit',
    burst: 'Ausbruch',
    comet: 'Komet',
    peek: 'Gucken',
    curious: 'Neugierig',
    shy: 'Schüchtern',
    excited: 'Aufgeregt',
    nod: 'Nicken',
    nope: 'Kopfschütteln',
    hello: 'Hallo',
    sleepy: 'Schläfrig',
    power: 'Power-Schub',
    thuglife: 'Thug Life',
    heart: 'Herzschlag',
    disco: 'Disco-Tanz',
    glitch: 'Cyber-Glitch',
    vortex: 'Raum-Vortex',
    ninja: 'Ninja-Schatten',
    retro: '8-Bit Retro',
    rocket: 'Raketenstart',
    freeze: 'Eis-Frost',
    dizzy: 'Schwindel-Sterne',
    royal: 'Königskrone',
    djbeat: 'DJ-Bassdrop',
    magic: 'Zauberfunken',
    action: 'Film-Action',
    hyper: 'Koffein-Rausch',
    swirl: 'Wirbel'
  },

  shapes: {
    cercle: 'Kugel',
    blob: 'Blob',
    bean: 'Bohne',
    jelly: 'Gelee',
    galet: 'Kiesel',
    bubble: 'Blase',
    nuage: 'Wolke',
    goutte: 'Tropfen',
    squircle: 'Squircle',
    rounded_cube: 'Abgerundeter Würfel',
    capsule: 'Kapsel',
    triangle: 'Dreieck Blob',
    hexagone: 'Sechseck',
    diamond: 'Diamant',
    star_blob: 'Stern-Blob',
    cylinder: 'Zylinder',
    mochi: 'Mochi',
    gummy: 'Gummi',
    puffy: 'Puffy',
    wobble: 'Wackeln',
    planet: 'Planet',
    egg: 'Ei',
    orbital: 'Orbital',
    spiky_blob: 'Stachel-Blob',
    crystal: 'Kristall',
    donut: 'Donut'
  },

  colors: {
    encre: 'Tinte',
    creme: 'Creme',
    brun: 'Braun',
    rouge: 'Rot',
    orange: 'Orange',
    ambre: 'Bernstein',
    vert: 'Grün',
    turquoise: 'Türkis',
    bleu: 'Blau',
    violet: 'Lila',
    rose: 'Rosa',
    gris: 'Grau'
  },

  colorChooser: {
    savedColors: 'Gespeicherte Farben:',
    add: 'Hinzufügen',
    custom: 'Benutzerdefiniert',
    hex: 'Hex',
    rgb: 'RGB',
    hsl: 'HSL',
    opacity: 'Deckkraft'
  },

  featureSize: {
    small: 'Klein',
    medium: 'Mittel',
    large: 'Groß'
  },

  eyebrows: {
    none: 'Keine',
    arched: 'Geschwungen',
    straight: 'Gerade',
    dots: 'Punkte'
  },

  nose: {
    none: 'Keine',
    dot: 'Punkt',
    pill: 'Pille',
    snout: 'Schnauze'
  },

  cheeks: {
    none: 'Keine',
    blush: 'Erröten',
    dots: 'Punkte',
    lines: 'Streifen'
  },

  mouth: {
    none: 'Keiner',
    smile: 'Lächeln',
    grin: 'Grinsen',
    frown: 'Stirnrunzeln',
    open: 'Offen',
    cat: 'Katze',
    straight: 'Gerade'
  },

  expressions: {
    neutre: 'Neutral',
    attentif: 'Aufmerksam',
    surpris: 'Überrascht',
    excite: 'Begeistert',
    heureux: 'Glücklich',
    hilare: 'Lachend',
    colere: 'Wütend',
    triste: 'Traurig',
    effraye: 'Erschrocken',
    mefiant: 'Misstrauisch',
    confus: 'Verwirrt',
    curieux: 'Neugierig',
    fier: 'Stolz',
    timide: 'Schüchtern',
    blase: 'Gleichgültig',
    somnolent: 'Schläfrig'
  }
}

export default de
