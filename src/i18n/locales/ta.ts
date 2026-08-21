import type fr from './fr'

const ta: typeof fr = {
  app: {
    name: 'clipzy',
    title: 'clipzy — அனிமேஷன் அவதார் & ரீல்ஸ் ஸ்டுடியோ',
    botAria: 'அனிமேஷன் செய்யப்பட்ட clipzy அவதார்'
  },

  gallery: {
    back: 'வீடியோ பிளேயருக்கு திரும்பு'
  },

  rail: {
    nav: 'பிரிவுகள்',
    customize: 'தனிப்பயனாக்கு',
    animations: 'அனிமேஷன்கள்',
    combos: 'காம்போஸ் & கதை',
    reel: 'ரீல் ஸ்டுடியோ',
    lab3d: '3D லேப்',
    settings: 'அமைப்புகள்'
  },

  panel: {
    animations: 'அனிமேஷன்',
    shape: 'வடிவம்',
    expression: 'உணர்வு',
    featureSize: 'அளவு',
    faceElements: 'முக அமைப்புகள்',
    eyebrows: 'புருவங்கள்',
    nose: 'மூக்கு',
    cheeks: 'கன்னங்கள்',
    mouth: 'வாய்',
    hats: 'தொப்பிகள் & கிரீடம்',
    glasses: 'கண்ணாடிகள் & ஷேட்ஸ்',
    props: 'பொருட்கள் & பாகங்கள்',
    auras: 'ஒளிரும் ஒளிவட்டம் FX',
    color: 'நிறம்'
  },

  export: {
    action: 'PNG ஆக ஏற்றுமதி செய்',
    more: 'பிற வடிவங்கள்',
    png: 'PNG பதிவிறக்கு',
    svg: 'SVG பதிவிறக்கு',
    anime: 'அனிமேஷன் SVG பதிவிறக்கு',
    gif: 'GIF பதிவிறக்கு',
    cycleDetail: 'வீடியோ மென்மையானது; GIF எங்கும் இயங்கும்.',
    cycleFormat: 'வடிவம்',
    cycle_mp4: 'MP4 வீடியோ',
    cycle_mp4_aide: 'மென்மையானது, பின்னணி தேவை',
    cycle_gif: 'அனிமேஷன் GIF',
    cycle_gif_aide: 'எங்கும் இயங்கும்',
    cycleProgress: 'ஏற்றுமதி செய்கிறது…',
    cycleReessayer: 'மீண்டும் முயற்சி செய்',
    gifTitle: 'GIF பதிவிறக்கு',
    gifDetail: 'GIF ஒளிபுகு தன்மை விளிம்புகளை கடினமாக்கலாம்.',
    gifBackground: 'பின்னணி',
    fond_blanc: 'வெள்ளை பின்னணி',
    fond_blanc_aide: 'மென்மையான விளிம்புகள்',
    fond_transparent: 'வெளிப்படையான பின்னணி',
    fond_transparent_aide: 'எல்லா பின்னணிக்கும் பொருந்தும்',
    gifConfirm: 'பதிவிறக்கு',
    copie: 'படத்தை நகலெடு',
    copieSvg: 'SVG நகலெடு',
    done: 'ஏற்றுமதி முடிந்தது',
    copied: 'நகலெடுக்கப்பட்டது',
    failed: 'ஏற்றுமதி தோல்வியடைந்தது'
  },

  preview: {
    exit: 'முன்னோட்டத்திலிருந்து வெளியேறு',
    key: 'Esc'
  },

  timeline: {
    play: 'இயக்கு',
    pause: 'நிறுத்து',
    addAnimation: 'அனிமேஷன் சேர்',
    preview: 'முன்னோட்டம்',
    export: 'ஏற்றுமதி செய்',
    zoom: 'ஜூம்',
    blockAria: '{state}, {duration}',
    blockDurationAria: '{state} நேரம், {duration}',
    blockRemoveAria: '{state} நீக்கு'
  },

  dialog: {
    cancel: 'ரத்து செய்',
    nameCreateTitle: 'புதிய அனிமேஷன் வரிசை',
    nameRenameTitle: 'பெயர் மாற்று',
    nameField: 'பெயர்',
    nameCreate: 'உருவாக்கு',
    nameRename: 'மாற்று',
    removeTitle: '"{name}" நீக்கவா?',
    removeDetail: 'இந்த அனிமேஷன் மற்றும் அதன் {n} பாகங்கள் நீக்கப்படும்.',
    removeConfirm: 'நீக்கு'
  },

  cycles: {
    defaultName: 'இயல்புநிலை சுழற்சி',
    newName: 'எனது சுழற்சி',
    menuNew: 'புதிய சுழற்சி',
    menuRenameAria: '{name} பெயர் மாற்று',
    menuRemoveAria: '{name} நீக்கு'
  },

  units: {
    seconds: '{n} வி',
    secondsShort: '{n}வி'
  },

  settings: {
    title: 'அமைப்புகள்',
    language: 'மொழி',
    about: 'விவரம்',
    credits: '❤️ உடன் உருவாக்கியவர்கள் {name}',
    creditsAria: 'திட்ட உருவாக்குநர்கள்',
    github: 'GitHub இல் காண்க',
    githubAria: 'GitHub களஞ்சியம்'
  },

  states: {
    idle: 'இயல்புநிலை',
    thinking: 'யோசிப்பது',
    wink: 'கண்சிமிட்டல்',
    wide: 'விரிந்த கண்கள்',
    alert: 'எச்சரிக்கை',
    notify: 'அறிவிப்பு',
    exclaim: 'ஆச்சரியம்',
    sleep: 'தூக்கம்',
    egg: 'முட்டை',
    hexagon: 'அறுகோணம்',
    play: 'விளையாடு',
    orbit: 'சுற்றுப்பாதை',
    burst: 'வெடிப்பு',
    comet: 'வால்மீன்',
    peek: 'எட்டிப்பார்',
    curious: 'ஆர்வமுடன்',
    shy: 'வெட்கம்',
    excited: 'உற்சாகம்',
    nod: 'தலையசைத்தல்',
    nope: 'மறுப்பு',
    hello: 'வணக்கம்',
    sleepy: 'தூக்கக் கலக்கம்',
    power: 'மின்னல் சக்தி',
    thuglife: 'தக் லைஃப்',
    heart: 'காதல் துடிப்பு',
    disco: 'டிஸ்கோ நடனம்',
    glitch: 'சைபர் கிளிட்ச்',
    vortex: 'விண்வெளி சுழல்',
    ninja: 'நிஞ்சா மாயம்',
    retro: '8-பிட் ரெட்ரோ',
    rocket: 'ராக்கெட் பாய்ச்சல்',
    freeze: 'பனி உறைவு',
    dizzy: 'தலைச்சுற்றல் நட்சத்திரம்',
    royal: 'ராஜ கிரீடம்',
    djbeat: 'டிஜே பீட்',
    magic: 'மந்திர பிரகாசம்',
    action: 'சினிமா ஆக்ஷன்',
    hyper: 'அதிவேக சுறுசுறுப்பு',
    swirl: 'சுழல்'
  },

  shapes: {
    cercle: 'கோளம்',
    blob: 'ப்ளாப்',
    bean: 'பீன்',
    jelly: 'ஜெல்லி',
    galet: 'கூழாங்கல்',
    bubble: 'குமிழி',
    nuage: 'மேகம்',
    goutte: 'துளி',
    squircle: 'ஸ்குவிற்கிள்',
    rounded_cube: 'வட்ட வடிவ கனசதுரம்',
    capsule: 'கேப்சூல்',
    triangle: 'முக்கோண ப்ளாப்',
    hexagone: 'அறுகோணம்',
    diamond: 'வைரம்',
    star_blob: 'நட்சத்திர ப்ளாப்',
    cylinder: 'உருளை',
    mochi: 'மோச்சி',
    gummy: 'கம்மி',
    puffy: 'பஃபி',
    wobble: 'தள்ளாட்டம்',
    planet: 'கிரகம்',
    egg: 'முட்டை',
    orbital: 'ஆர்பிட்டல்',
    spiky_blob: 'முள் ப்ளாப்',
    crystal: 'படிகம்',
    donut: 'டோனட்'
  },

  colors: {
    encre: 'மை',
    creme: 'கிரீம்',
    brun: 'பழுப்பு',
    rouge: 'சிவப்பு',
    orange: 'ஆரஞ்சு',
    ambre: 'மஞ்சள் பழுப்பு',
    vert: 'பச்சை',
    turquoise: 'டர்க்காய்ஸ்',
    bleu: 'நீலம்',
    violet: 'ஊதா',
    rose: 'இளஞ்சிவப்பு',
    gris: 'சாம்பல்'
  },

  colorChooser: {
    savedColors: 'சேமிக்கப்பட்ட நிறங்கள்:',
    add: 'சேர்',
    custom: 'தனிப்பயன்',
    hex: 'Hex',
    rgb: 'RGB',
    hsl: 'HSL',
    opacity: 'ஒளிபுகாமை'
  },

  featureSize: {
    small: 'சிறிய',
    medium: 'நடுத்தர',
    large: 'பெரிய'
  },

  eyebrows: {
    none: 'இல்லை',
    arched: 'வளைந்த',
    straight: 'நேரான',
    dots: 'புள்ளிகள்'
  },

  nose: {
    none: 'இல்லை',
    dot: 'புள்ளி',
    pill: 'மாத்திரை',
    snout: 'முகவாய்'
  },

  cheeks: {
    none: 'இல்லை',
    blush: 'சிவப்பு',
    dots: 'புள்ளிகள்',
    lines: 'கோடுகள்'
  },

  mouth: {
    none: 'இல்லை',
    smile: 'புன்னகை',
    grin: 'பல் சிரிப்பு',
    frown: 'வருத்தம்',
    open: 'திறந்த',
    cat: 'பூனை வாய்',
    straight: 'நேர்கோடு'
  },

  expressions: {
    neutre: 'இயல்பு',
    attentif: 'கவனம்',
    surpris: 'ஆச்சரியம்',
    excite: 'உற்சாகம்',
    heureux: 'மகிழ்ச்சி',
    hilare: 'சிரிப்பு',
    colere: 'கோபம்',
    triste: 'வருத்தம்',
    effraye: 'பயம்',
    mefiant: 'சந்தேகம்',
    confus: 'குழப்பம்',
    curieux: 'ஆர்வம்',
    fier: 'பெருமை',
    timide: 'வெட்கம்',
    blase: 'அலட்சியம்',
    somnolent: 'தூக்கம்'
  }
}

export default ta
