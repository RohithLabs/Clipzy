import type fr from './fr'

const de: typeof fr = {
  app: {
    name: 'tibsy',
    title: 'tibsy — animierter SVG-Avatar',
    botAria: 'Animierter tibsy Avatar'
  },

  gallery: {
    back: 'Zurück zum Player'
  },

  rail: {
    nav: 'Bereiche',
    customize: 'Anpassen',
    animations: 'Animationen',
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
    pause: 'Wiedergabe stoppen',
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
    nameField: 'Zyklusname',
    nameCreate: 'Erstellen',
    nameRename: 'Umbenennen',
    removeTitle: '"{name}" löschen?',
    removeDetail:
      'Diese Sequenz geht mitsamt ihrer Animation verloren. | Diese Sequenz geht mitsamt ihrer {n} Animationen verloren.',
    removeConfirm: 'Löschen'
  },

  cycles: {
    defaultName: 'Standard-Zyklus',
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
    creditsAria: 'Projektentwickler',
    github: 'Projekt auf GitHub ansehen',
    githubAria: 'Projekt-Repository auf GitHub'
  },

  states: {
    idle: 'Ruhezustand',
    thinking: 'Nachdenklich',
    wink: 'Zwinkern',
    wide: 'Große Augen',
    alert: 'Aufmerksam',
    notify: 'Benachrichtigung',
    exclaim: 'Ausruf',
    sleep: 'Schlafen',
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
