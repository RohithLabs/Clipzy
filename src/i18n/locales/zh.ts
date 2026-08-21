import type fr from './fr'

/**
 * Chinois simplifie. Trois differences typographiques portees par la traduction
 * et pas par le code :
 *
 * - ponctuation pleine largeur (， 。 ？ “ ”), y compris dans les gabarits ;
 * - pas de pluriel : `removeDetail` n'a qu'une forme, et le classificateur `个`
 *   est obligatoire devant le nom compte ;
 * - une espace fine separe les chiffres latins des caracteres chinois, sauf
 *   dans la graduation de la regle ou la place manque.
 */
const zh: typeof fr = {
  app: {
    name: 'clipzy',
    title: 'clipzy — 矢量动画头像与视频工坊',
    botAria: 'clipzy 动画头像'
  },

  gallery: {
    back: '返回播放器'
  },

  rail: {
    nav: '版块',
    customize: '定制',
    animations: '动画',
    combos: '连招 & 故事',
    reel: 'Reel 短视频工坊',
    lab3d: '3D 工坊',
    settings: '设置'
  },

  panel: {
    animations: '动画',
    shape: '形状',
    expression: '表情',
    featureSize: '五官大小',
    faceElements: '面部特征',
    eyebrows: '眉毛',
    nose: '鼻子',
    cheeks: '腮红',
    mouth: '嘴巴',
    hats: '帽子 & 头饰',
    glasses: '眼镜 & 护目镜',
    props: '道具 & 随身物品',
    auras: '光环 & 特效 FX',
    color: '颜色'
  },

  export: {
    action: '导出 PNG',
    more: '其他格式',
    png: '下载 PNG',
    svg: '下载 SVG',
    anime: '下载 SVG 动图',
    gif: '下载 GIF 动图',
    cycleDetail: '视频更轻更流畅；GIF 到处都能播放。',
    cycleFormat: '格式',
    cycle_mp4: 'MP4 视频',
    cycle_mp4_aide: '轻巧流畅，必须有背景',
    cycle_gif: 'GIF 动图',
    cycle_gif_aide: '到处可播，体积更大',
    cycleProgress: '正在导出…',
    cycleReessayer: '重试',
    gifTitle: '下载 GIF 动图',
    gifDetail: 'GIF 透明度非黑即白：没有背景时，边缘会稍硬。',
    gifBackground: '背景',
    fond_blanc: '白底',
    fond_blanc_aide: '平滑边缘，适合浅色界面',
    fond_transparent: '透明背景',
    fond_transparent_aide: '适应任何背景，边缘略硬',
    gifConfirm: '下载',
    copie: '复制图片',
    copieSvg: '复制 SVG',
    done: '已导出',
    copied: '已复制',
    failed: '导出失败'
  },

  preview: {
    exit: '退出预览',
    key: 'Esc'
  },

  timeline: {
    play: '开始播放',
    pause: '暂停播放',
    addAnimation: '添加动画',
    preview: '预览',
    export: '导出剪辑',
    zoom: '轨道缩放',
    blockAria: '{state}，{duration}',
    blockDurationAria: '{state}时长，{duration}',
    blockRemoveAria: '移除{state}'
  },

  dialog: {
    cancel: '取消',
    nameCreateTitle: '新建循环',
    nameRenameTitle: '重命名循环',
    nameField: '循环名称',
    nameCreate: '创建',
    nameRename: '重命名',
    removeTitle: '删除“{name}”？',
    removeDetail: '将丢失此剪辑及其 {n} 个动画。',
    removeConfirm: '删除'
  },

  cycles: {
    defaultName: '默认循环',
    newName: '我的循环',
    menuNew: '新建循环',
    menuRenameAria: '重命名{name}',
    menuRemoveAria: '删除{name}'
  },

  units: {
    seconds: '{n} 秒',
    secondsShort: '{n}s'
  },

  settings: {
    title: '设置',
    language: '语言',
    about: '关于',
    credits: '由 {name} 倾心打造 ❤️',
    creditsAria: '在 X 关注 Jérémy，新标签页打开',
    github: '在 GitHub 查看项目',
    githubAria: '项目 GitHub 仓库，新标签页打开'
  },

  states: {
    idle: '静止',
    thinking: '思考',
    wink: '眨眼',
    wide: '睁大眼睛',
    alert: '警示',
    notify: '通知',
    exclaim: '感叹号',
    sleep: '休眠',
    egg: '蛋形',
    hexagon: '六边形',
    play: '播放',
    orbit: '轨道',
    burst: '爆散',
    comet: '彗星',
    peek: '偷看',
    curious: '好奇',
    shy: '害羞',
    excited: '兴奋',
    nod: '点头',
    nope: '摇头',
    hello: '打招呼',
    sleepy: '困倦',
    power: '能量爆发',
    thuglife: '墨镜大佬',
    heart: '爱心光波',
    disco: '迪斯科热舞',
    glitch: '赛博故障',
    vortex: '星际涡流',
    ninja: '影之忍者',
    retro: '8位像素',
    rocket: '火箭升空',
    freeze: '冰冻结晶',
    dizzy: '眼冒金星',
    royal: '皇家皇冠',
    djbeat: 'DJ 重低音',
    magic: '魔法仙尘',
    action: '电影分镜',
    hyper: '咖啡因狂飙',
    swirl: '漩涡'
  },

  shapes: {
    cercle: '球体',
    blob: '软泥团',
    bean: '小豆豆',
    jelly: '果冻',
    galet: '鹅卵石',
    bubble: '气泡',
    nuage: '云朵',
    goutte: '水滴',
    squircle: '超椭圆',
    rounded_cube: '圆角方块',
    capsule: '胶囊',
    triangle: '三角水滴',
    hexagone: '六边形',
    diamond: '菱形',
    star_blob: '星星软糖',
    cylinder: '圆柱',
    mochi: '麻薯',
    gummy: '软糖小熊',
    puffy: '蓬蓬泡泡',
    wobble: '晃晃水波',
    planet: '行星',
    egg: '蛋形',
    orbital: '星轨',
    spiky_blob: '海胆软泥',
    crystal: '水晶宝石',
    donut: '甜甜圈'
  },

  colors: {
    encre: '墨黑',
    creme: '奶油白',
    brun: '棕色',
    rouge: '红色',
    orange: '橙色',
    ambre: '琥珀色',
    vert: '绿色',
    turquoise: '青绿色',
    bleu: '蓝色',
    violet: '紫色',
    rose: '粉色',
    gris: '灰色'
  },

  colorChooser: {
    savedColors: '已保存颜色：',
    add: '添加',
    custom: '自定义',
    hex: 'Hex',
    rgb: 'RGB',
    hsl: 'HSL',
    opacity: '不透明度'
  },

  featureSize: {
    small: '小',
    medium: '中',
    large: '大'
  },

  eyebrows: {
    none: '无',
    arched: '弯眉',
    straight: '平眉',
    dots: '圆点'
  },

  nose: {
    none: '无',
    dot: '圆点',
    pill: '短杠',
    snout: '小鼻'
  },

  cheeks: {
    none: '无',
    blush: '腮红',
    dots: '点状',
    lines: '斜线'
  },

  mouth: {
    none: '无',
    smile: '微笑',
    grin: '大笑',
    frown: '撇嘴',
    open: '张嘴',
    cat: '猫咪嘴',
    straight: '平嘴'
  },

  expressions: {
    neutre: '平静',
    attentif: '专注',
    surpris: '惊讶',
    excite: '兴奋',
    heureux: '开心',
    hilare: '大笑',
    colere: '生气',
    triste: '难过',
    effraye: '害怕',
    mefiant: '怀疑',
    confus: '困惑',
    curieux: '好奇',
    fier: '得意',
    timide: '羞怯',
    blase: '无趣',
    somnolent: '困倦'
  }
}

export default zh
