import type fr from './fr'

const it: typeof fr = {
  app: {
    name: 'clipzy',
    title: 'clipzy — avatar vettoriale e studio video animato',
    botAria: 'Avatar animato clipzy'
  },

  gallery: {
    back: 'Torna al player'
  },

  rail: {
    nav: 'Sezioni',
    customize: 'Personalizza',
    animations: 'Animazioni',
    combos: 'Combo & Storia',
    reel: 'Studio Reel',
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
    hats: 'Cappelli e Copricapi',
    glasses: 'Occhiali e Visiere',
    props: 'Accessori e Oggetti',
    auras: 'Aura ed Effetti FX',
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
    nameField: 'Nome del ciclo',
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
    creditsAria: 'Jérémy su X, apre in una nuova scheda',
    github: 'Vedi il progetto su GitHub',
    githubAria: 'Repository del progetto su GitHub, apre in una nuova scheda'
  },

  states: {
    idle: 'Riposo',
    thinking: 'Pensieroso',
    wink: 'Occhiolino',
    wide: 'Occhi spalancati',
    alert: 'Allerta',
    notify: 'Notifica',
    exclaim: 'Esclamazione',
    sleep: 'Dormiente',
    egg: 'Uovo',
    hexagon: 'Esagono',
    play: 'Riproduci',
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
    power: 'Super Potenza',
    thuglife: 'Thug Life',
    heart: 'Battito Cuore',
    disco: 'Danza Disco',
    glitch: 'Glitch Cyber',
    vortex: 'Vortice Spaziale',
    ninja: 'Ninja Furtivo',
    retro: 'Retrò 8-Bit',
    rocket: 'Decollo Razzo',
    freeze: 'Gelo Glaciale',
    dizzy: 'Stelle e Vertigini',
    royal: 'Corona Reale',
    djbeat: 'Ritmo DJ',
    magic: 'Magia e Faville',
    action: 'Scena d’Azione',
    hyper: 'Iper Caffeina',
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
