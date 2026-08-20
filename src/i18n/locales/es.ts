import type fr from './fr'

const es: typeof fr = {
  app: {
    name: 'tibsy',
    title: 'tibsy — avatar SVG animado',
    botAria: 'Avatar animado tibsy'
  },

  gallery: {
    back: 'Volver al reproductor'
  },

  rail: {
    nav: 'Secciones',
    customize: 'Personalizar',
    animations: 'Animaciones',
    lab3d: 'Laboratorio 3D',
    settings: 'Ajustes'
  },

  panel: {
    animations: 'Animación',
    shape: 'Forma',
    expression: 'Expresión',
    featureSize: 'Tamaño de rasgos',
    faceElements: 'Elementos faciales',
    eyebrows: 'Cejas',
    nose: 'Nariz',
    cheeks: 'Mejillas',
    mouth: 'Boca',
    color: 'Color'
  },

  export: {
    action: 'Exportar en PNG',
    more: 'Otros formatos',
    png: 'Descargar PNG',
    svg: 'Descargar SVG',
    anime: 'Descargar SVG animado',
    gif: 'Descargar GIF animado',
    cycleDetail: 'El video es más ligero y fluido; el GIF funciona en todas partes.',
    cycleFormat: 'Formato',
    cycle_mp4: 'Video MP4',
    cycle_mp4_aide: 'Ligero y fluido, requiere fondo',
    cycle_gif: 'GIF animado',
    cycle_gif_aide: 'Funciona en todas partes, más pesado',
    cycleProgress: 'Exportando…',
    cycleReessayer: 'Reintentar',
    gifTitle: 'Descargar GIF animado',
    gifDetail:
      'La transparencia GIF es binaria: sin fondo, el contorno puede verse algo duro.',
    gifBackground: 'Fondo',
    fond_blanc: 'Fondo blanco',
    fond_blanc_aide: 'Borde suave, para superficies claras',
    fond_transparent: 'Fondo transparente',
    fond_transparent_aide: 'Se adapta a cualquier fondo',
    gifConfirm: 'Descargar',
    copie: 'Copiar imagen',
    copieSvg: 'Copiar SVG',
    done: 'Exportado',
    copied: 'Copiado',
    failed: 'Error de exportación'
  },

  preview: {
    exit: 'Salir de la vista previa',
    key: 'Esc'
  },

  timeline: {
    play: 'Reproducir',
    pause: 'Pausar',
    addAnimation: 'Añadir animación',
    preview: 'Vista previa',
    export: 'Exportar montaje',
    zoom: 'Zoom de pista',
    blockAria: '{state}, {duration}',
    blockDurationAria: 'Duración de {state}, {duration}',
    blockRemoveAria: 'Eliminar {state}'
  },

  dialog: {
    cancel: 'Cancelar',
    nameCreateTitle: 'Nuevo ciclo',
    nameRenameTitle: 'Renombrar ciclo',
    nameField: 'Nombre del ciclo',
    nameCreate: 'Crear',
    nameRename: 'Renombrar',
    removeTitle: '¿Eliminar "{name}"?',
    removeDetail:
      'Esta secuencia se perderá junto con su animación. | Esta secuencia se perderá junto con sus {n} animaciones.',
    removeConfirm: 'Eliminar'
  },

  cycles: {
    defaultName: 'Ciclo predeterminado',
    newName: 'Mi ciclo',
    menuNew: 'Nuevo ciclo',
    menuRenameAria: 'Renombrar {name}',
    menuRemoveAria: 'Eliminar {name}'
  },

  units: {
    seconds: '{n} s',
    secondsShort: '{n}s'
  },

  settings: {
    title: 'Ajustes',
    language: 'Idioma',
    about: 'Acerca de',
    credits: 'Hecho con ❤️ por {name}',
    creditsAria: 'Creadores del proyecto',
    github: 'Ver proyecto en GitHub',
    githubAria: 'Repositorio del proyecto en GitHub'
  },

  states: {
    idle: 'Reposo',
    thinking: 'Pensando',
    wink: 'Guiño',
    wide: 'Ojos abiertos',
    alert: 'Alerta',
    notify: 'Notificación',
    exclaim: 'Exclamación',
    sleep: 'Dormir',
    egg: 'Huevo',
    hexagon: 'Hexágono',
    play: 'Jugar',
    orbit: 'Órbita',
    burst: 'Explosión',
    comet: 'Cometa',
    peek: 'Miradita',
    curious: 'Curioso',
    shy: 'Tímido',
    excited: 'Emocionado',
    nod: 'Asentir',
    nope: 'Negación',
    hello: 'Hola',
    sleepy: 'Somnoliento',
    swirl: 'Giro'
  },

  shapes: {
    cercle: 'Esfera',
    blob: 'Gota blob',
    bean: 'Frijol',
    jelly: 'Gelatina',
    galet: 'Guijarro',
    bubble: 'Burbuja',
    nuage: 'Nube',
    goutte: 'Gota',
    squircle: 'Squircle',
    rounded_cube: 'Cubo redondeado',
    capsule: 'Cápsula',
    triangle: 'Triángulo Blob',
    hexagone: 'Hexágono',
    diamond: 'Diamante',
    star_blob: 'Estrella Blob',
    cylinder: 'Cilindro',
    mochi: 'Mochi',
    gummy: 'Gomita',
    puffy: 'Puffy',
    wobble: 'Bamboleo',
    planet: 'Planeta',
    egg: 'Huevo',
    orbital: 'Orbital',
    spiky_blob: 'Blob espinoso',
    crystal: 'Cristal',
    donut: 'Dona'
  },

  colors: {
    encre: 'Tinta',
    creme: 'Crema',
    brun: 'Marrón',
    rouge: 'Rojo',
    orange: 'Naranja',
    ambre: 'Ámbar',
    vert: 'Verde',
    turquoise: 'Turquesa',
    bleu: 'Azul',
    violet: 'Púrpura',
    rose: 'Rosa',
    gris: 'Gris'
  },

  colorChooser: {
    savedColors: 'Colores guardados:',
    add: 'Añadir',
    custom: 'Personalizado',
    hex: 'Hex',
    rgb: 'RGB',
    hsl: 'HSL',
    opacity: 'Opacidad'
  },

  featureSize: {
    small: 'Pequeño',
    medium: 'Mediano',
    large: 'Grande'
  },

  eyebrows: {
    none: 'Ninguno',
    arched: 'Arqueadas',
    straight: 'Rectas',
    dots: 'Puntos'
  },

  nose: {
    none: 'Ninguno',
    dot: 'Punto',
    pill: 'Píldora',
    snout: 'Hocico'
  },

  cheeks: {
    none: 'Ninguno',
    blush: 'Sonrojo',
    dots: 'Puntos',
    lines: 'Rayas'
  },

  mouth: {
    none: 'Ninguno',
    smile: 'Sonrisa',
    grin: 'Sonrisa amplia',
    frown: 'Ceño fruncido',
    open: 'Abierta',
    cat: 'Gatito',
    straight: 'Recta'
  },

  expressions: {
    neutre: 'Neutral',
    attentif: 'Atento',
    surpris: 'Sorprendido',
    excite: 'Emocionado',
    heureux: 'Feliz',
    hilare: 'Divertido',
    colere: 'Enojado',
    triste: 'Triste',
    effraye: 'Asustado',
    mefiant: 'Desconfiado',
    confus: 'Confuso',
    curieux: 'Curioso',
    fier: 'Orgulloso',
    timide: 'Tímido',
    blase: 'Indiferente',
    somnolent: 'Somnoliento'
  }
}

export default es
