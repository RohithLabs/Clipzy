import type fr from './fr'

const pt: typeof fr = {
  app: {
    name: 'tibsy',
    title: 'tibsy — avatar SVG animado',
    botAria: 'Avatar tibsy animado'
  },

  gallery: {
    back: 'Voltar ao reprodutor'
  },

  rail: {
    nav: 'Seções',
    customize: 'Personalizar',
    animations: 'Animações',
    lab3d: 'Laboratório 3D',
    settings: 'Configurações'
  },

  panel: {
    animations: 'Animação',
    shape: 'Forma',
    expression: 'Expressão',
    featureSize: 'Tamanho dos traços',
    faceElements: 'Elementos do rosto',
    eyebrows: 'Sobrancelhas',
    nose: 'Nariz',
    cheeks: 'Bochechas',
    mouth: 'Boca',
    color: 'Cor'
  },

  export: {
    action: 'Exportar em PNG',
    more: 'Outros formatos',
    png: 'Baixar PNG',
    svg: 'Baixar SVG',
    anime: 'Baixar SVG animado',
    gif: 'Baixar GIF animado',
    cycleDetail: 'O vídeo é mais leve e fluido; o GIF funciona em qualquer lugar.',
    cycleFormat: 'Formato',
    cycle_mp4: 'Vídeo MP4',
    cycle_mp4_aide: 'Leve e fluido, precisa de fundo',
    cycle_gif: 'GIF animado',
    cycle_gif_aide: 'Funciona em qualquer lugar, mais pesado',
    cycleProgress: 'Exportando…',
    cycleReessayer: 'Tentar novamente',
    gifTitle: 'Baixar GIF animado',
    gifDetail: 'A transparência do GIF é binária: sem fundo, a borda pode ficar um pouco dura.',
    gifBackground: 'Fundo',
    fond_blanc: 'Fundo branco',
    fond_blanc_aide: 'Borda suave, para superfícies claras',
    fond_transparent: 'Fundo transparente',
    fond_transparent_aide: 'Adapta-se a qualquer fundo',
    gifConfirm: 'Baixar',
    copie: 'Copiar imagem',
    copieSvg: 'Copiar SVG',
    done: 'Exportado',
    copied: 'Copiado',
    failed: 'Falha na exportação'
  },

  preview: {
    exit: 'Sair da pré-visualização',
    key: 'Esc'
  },

  timeline: {
    play: 'Iniciar reprodução',
    pause: 'Parar reprodução',
    addAnimation: 'Adicionar animação',
    preview: 'Pré-visualização',
    export: 'Exportar montagem',
    zoom: 'Zoom da trilha',
    blockAria: '{state}, {duration}',
    blockDurationAria: 'Duração de {state}, {duration}',
    blockRemoveAria: 'Remover {state}'
  },

  dialog: {
    cancel: 'Cancelar',
    nameCreateTitle: 'Novo ciclo',
    nameRenameTitle: 'Renomear ciclo',
    nameField: 'Nome do ciclo',
    nameCreate: 'Criar',
    nameRename: 'Renomear',
    removeTitle: 'Excluir "{name}"?',
    removeDetail:
      'Esta sequência será perdida com sua animação. | Esta sequência será perdida com suas {n} animações.',
    removeConfirm: 'Excluir'
  },

  cycles: {
    defaultName: 'Ciclo padrão',
    newName: 'Meu ciclo',
    menuNew: 'Novo ciclo',
    menuRenameAria: 'Renomear {name}',
    menuRemoveAria: 'Excluir {name}'
  },

  units: {
    seconds: '{n} s',
    secondsShort: '{n}s'
  },

  settings: {
    title: 'Configurações',
    language: 'Idioma',
    about: 'Sobre',
    credits: 'Feito com ❤️ por {name}',
    creditsAria: 'Criadores do projeto',
    github: 'Ver projeto no GitHub',
    githubAria: 'Repositório do projeto no GitHub'
  },

  states: {
    idle: 'Repouso',
    thinking: 'Pensando',
    wink: 'Piscadela',
    wide: 'Olhos arregalados',
    alert: 'Alerta',
    notify: 'Notificação',
    exclaim: 'Exclamação',
    sleep: 'Dormir',
    egg: 'Ovo',
    hexagon: 'Hexágono',
    play: 'Brincar',
    orbit: 'Órbita',
    burst: 'Explosão',
    comet: 'Cometa',
    peek: 'Espiadinha',
    curious: 'Curioso',
    shy: 'Tímido',
    excited: 'Empolgado',
    nod: 'Assentir',
    nope: 'Negar',
    hello: 'Olá',
    sleepy: 'Sonolento',
    swirl: 'Giro'
  },

  shapes: {
    cercle: 'Esfera',
    blob: 'Blob',
    bean: 'Feijão',
    jelly: 'Gelatina',
    galet: 'Seixo',
    bubble: 'Bolha',
    nuage: 'Nuvem',
    goutte: 'Gota',
    squircle: 'Squircle',
    rounded_cube: 'Cubo arredondado',
    capsule: 'Cápsula',
    triangle: 'Triângulo Blob',
    hexagone: 'Hexágono',
    diamond: 'Diamante',
    star_blob: 'Estrela Blob',
    cylinder: 'Cilindro',
    mochi: 'Mochi',
    gummy: 'Goma',
    puffy: 'Puffy',
    wobble: 'Oscilação',
    planet: 'Planeta',
    egg: 'Ovo',
    orbital: 'Orbital',
    spiky_blob: 'Blob espinhoso',
    crystal: 'Cristal',
    donut: 'Rosquinha'
  },

  colors: {
    encre: 'Tinta',
    creme: 'Creme',
    brun: 'Marrom',
    rouge: 'Vermelho',
    orange: 'Laranja',
    ambre: 'Âmbar',
    vert: 'Verde',
    turquoise: 'Turquesa',
    bleu: 'Azul',
    violet: 'Roxo',
    rose: 'Rosa',
    gris: 'Cinza'
  },

  colorChooser: {
    savedColors: 'Cores salvas:',
    add: 'Adicionar',
    custom: 'Personalizada',
    hex: 'Hex',
    rgb: 'RGB',
    hsl: 'HSL',
    opacity: 'Opacidade'
  },

  featureSize: {
    small: 'Pequeno',
    medium: 'Médio',
    large: 'Grande'
  },

  eyebrows: {
    none: 'Nenhuma',
    arched: 'Arqueadas',
    straight: 'Retas',
    dots: 'Pontos'
  },

  nose: {
    none: 'Nenhum',
    dot: 'Ponto',
    pill: 'Pílula',
    snout: 'Focinho'
  },

  cheeks: {
    none: 'Nenhuma',
    blush: 'Rubor',
    dots: 'Pontos',
    lines: 'Listras'
  },

  mouth: {
    none: 'Nenhuma',
    smile: 'Sorriso',
    grin: 'Sorrisão',
    frown: 'Franzido',
    open: 'Aberta',
    cat: 'Gatinho',
    straight: 'Reta'
  },

  expressions: {
    neutre: 'Neutro',
    attentif: 'Atento',
    surpris: 'Surpreso',
    excite: 'Empolgado',
    heureux: 'Feliz',
    hilare: 'Risonho',
    colere: 'Zangado',
    triste: 'Triste',
    effraye: 'Assustado',
    mefiant: 'Desconfiado',
    confus: 'Confuso',
    curieux: 'Curioso',
    fier: 'Orgulhoso',
    timide: 'Tímido',
    blase: 'Indiferente',
    somnolent: 'Sonolento'
  }
}

export default pt
