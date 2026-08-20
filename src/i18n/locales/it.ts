import type fr from './fr'

const it: typeof fr = {
  app: {
    name: 'tibsy',
    title: 'tibsy — avatar SVG animato',
    botAria: 'Avatar animato tibsy'
  },

  gallery: {
    back: 'Torna al player'
  },

  rail: {
    nav: 'Sezioni',
    customize: 'Personalizza',
    animations: 'Animazioni',
    lab3d: 'Laboratorio 3D',
    settings: 'Impostazioni'
  },

  panel: {
    animations: 'Animazione',
    shape: 'Forma',
    expression: 'Espressione',
    featureSize: 'Dimensione tratti',
    faceElements: 'Elementi del viso',
    eyebrows: 'Sopracciglia',
    nose: 'Naso',
    cheeks: 'Guance',
    mouth: 'Bocca',
    color: 'Colore'
  },

  export: {
    action: 'Esporta in PNG',
    more: 'Altri formati',
    png: 'Scarica PNG',
    svg: 'Scarica SVG',
    anime: 'Scarica SVG animato',
    gif: 'Scarica GIF animata',
    cycleDetail: 'Il video è più leggero e fluido; la GIF funziona ovunque.',
    cycleFormat: 'Formato',
    cycle_mp4: 'Video MP4',
    cycle_mp4_aide: 'Leggero e fluido, richiede uno sfondo',
    cycle_gif: 'GIF animata',
    cycle_gif_aide: 'Funziona ovunque, più pesante',
    cycleProgress: 'Esportazione…',
    cycleReessayer: 'Riprova',
    gifTitle: 'Scarica GIF animata',
    gifDetail: 'La trasparenza GIF è netta: senza sfondo, il bordo può apparire duro.',
    gifBackground: 'Sfondo',
    fond_blanc: 'Sfondo bianco',
    fond_blanc_aide: 'Bordo morbido, per superfici chiare',
    fond_transparent: 'Sfondo trasparente',
    fond_transparent_aide: 'Si adatta a qualsiasi sfondo',
    gifConfirm: 'Scarica',
    copie: 'Copia immagine',
    copieSvg: 'Copia SVG',
    done: 'Esportato',
    copied: 'Copiato',
    failed: 'Esportazione non riuscita'
  },

  preview: {
    exit: 'Esci dall’anteprima',
    key: 'Esc'
  },

  timeline: {
    play: 'Avvia riproduzione',
    pause: 'Ferma riproduzione',
    addAnimation: 'Aggiungi animazione',
    preview: 'Anteprima',
    export: 'Esporta montaggio',
    zoom: 'Zoom traccia',
    blockAria: '{state}, {duration}',
    blockDurationAria: 'Durata di {state}, {duration}',
    blockRemoveAria: 'Rimuovi {state}'
  },

  dialog: {
    cancel: 'Annulla',
    nameCreateTitle: 'Nuovo ciclo',
    nameRenameTitle: 'Rinomina ciclo',
    nameField: 'Nome ciclo',
    nameCreate: 'Crea',
    nameRename: 'Rinomina',
    removeTitle: 'Eliminare "{name}"?',
    removeDetail:
      'Questa sequenza andrà persa con la sua animazione. | Questa sequenza andrà persa con le sue {n} animazioni.',
    removeConfirm: 'Elimina'
  },

  cycles: {
    defaultName: 'Ciclo predefinito',
    newName: 'Il mio ciclo',
    menuNew: 'Nuovo ciclo',
    menuRenameAria: 'Rinomina {name}',
    menuRemoveAria: 'Elimina {name}'
  },

  units: {
    seconds: '{n} s',
    secondsShort: '{n}s'
  },

  settings: {
    title: 'Impostazioni',
    language: 'Lingua',
    about: 'Informazioni',
    credits: 'Creato con ❤️ da {name}',
    creditsAria: 'Creatori del progetto',
    github: 'Vedi il progetto su GitHub',
    githubAria: 'Repository del progetto su GitHub'
  },

  states: {
    idle: 'Riposo',
    thinking: 'Pensieroso',
    wink: 'Occhiolino',
    wide: 'Occhi sgranati',
    alert: 'Allerta',
    notify: 'Notifica',
    exclaim: 'Esclamazione',
    sleep: 'Dormire',
    egg: 'Uovo',
    hexagon: 'Esagono',
    play: 'Giocare',
    orbit: 'Orbita',
    burst: 'Scoppio',
    comet: 'Cometa',
    peek: 'Sbirciata',
    curious: 'Curioso',
    shy: 'Timido',
    excited: 'Entusiasta',
    nod: 'Annuire',
    nope: 'Negare',
    hello: 'Ciao',
    sleepy: 'Assonnato',
    swirl: 'Vortice'
  },

  shapes: {
    cercle: 'Sfera',
    blob: 'Blob',
    bean: 'Fagiolo',
    jelly: 'Gelatina',
    galet: 'Ciottolo',
    bubble: 'Bolla',
    nuage: 'Nuvola',
    goutte: 'Goccia',
    squircle: 'Squircle',
    rounded_cube: 'Cubo arrotondato',
    capsule: 'Capsula',
    triangle: 'Triangolo Blob',
    hexagone: 'Esagono',
    diamond: 'Diamante',
    star_blob: 'Stella Blob',
    cylinder: 'Cilindro',
    mochi: 'Mochi',
    gummy: 'Gommosa',
    puffy: 'Puffy',
    wobble: 'Oscillazione',
    planet: 'Pianeta',
    egg: 'Uovo',
    orbital: 'Orbitale',
    spiky_blob: 'Blob spinoso',
    crystal: 'Cristallo',
    donut: 'Ciambella'
  },

  colors: {
    encre: 'Inchiostro',
    creme: 'Crema',
    brun: 'Marrone',
    rouge: 'Rosso',
    orange: 'Arancione',
    ambre: 'Ambra',
    vert: 'Verde',
    turquoise: 'Turchese',
    bleu: 'Blu',
    violet: 'Viola',
    rose: 'Rosa',
    gris: 'Grigio'
  },

  colorChooser: {
    savedColors: 'Colori salvati:',
    add: 'Aggiungi',
    custom: 'Personalizzato',
    hex: 'Hex',
    rgb: 'RGB',
    hsl: 'HSL',
    opacity: 'Opacità'
  },

  featureSize: {
    small: 'Piccolo',
    medium: 'Medio',
    large: 'Grande'
  },

  eyebrows: {
    none: 'Nessuno',
    arched: 'Arcuate',
    straight: 'Dritte',
    dots: 'Punti'
  },

  nose: {
    none: 'Nessuno',
    dot: 'Punto',
    pill: 'Pillola',
    snout: 'Muso'
  },

  cheeks: {
    none: 'Nessuno',
    blush: 'Rossore',
    dots: 'Punti',
    lines: 'Strisce'
  },

  mouth: {
    none: 'Nessuno',
    smile: 'Sorriso',
    grin: 'Sorrisone',
    frown: 'Broncio',
    open: 'Aperta',
    cat: 'Gattino',
    straight: 'Dritta'
  },

  expressions: {
    neutre: 'Neutro',
    attentif: 'Attento',
    surpris: 'Sorpreso',
    excite: 'Eccitato',
    heureux: 'Felice',
    hilare: 'Divertito',
    colere: 'Arrabbiato',
    triste: 'Triste',
    effraye: 'Spaventato',
    mefiant: 'Diffidente',
    confus: 'Confuso',
    curieux: 'Curioso',
    fier: 'Orgoglioso',
    timide: 'Timido',
    blase: 'Indifferente',
    somnolent: 'Assonnato'
  }
}

export default it
