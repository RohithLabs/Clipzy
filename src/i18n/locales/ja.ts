import type fr from './fr'

const ja: typeof fr = {
  app: {
    name: 'clipzy',
    title: 'clipzy — ベクターアニメアバター＆動画スタジオ',
    botAria: 'アニメーション化されたclipzyアバター'
  },

  gallery: {
    back: 'プレーヤーに戻る'
  },

  rail: {
    nav: 'セクション',
    customize: 'カスタマイズ',
    animations: 'アニメーション',
    combos: 'コンボ＆ストーリー',
    reel: 'リールスタジオ',
    lab3d: '3Dラボ',
    settings: '設定'
  },

  panel: {
    animations: 'アニメーション',
    shape: '形状',
    expression: '表情',
    featureSize: 'パーツサイズ',
    faceElements: '顔パーツ',
    eyebrows: '眉毛',
    nose: '鼻',
    cheeks: 'ほっぺ',
    mouth: '口',
    hats: '帽子＆ヘッドウェア',
    glasses: 'メガネ＆サングラス',
    props: '持ち物＆アイテム',
    auras: 'オーラ＆エフェクトFX',
    color: 'カラー'
  },

  export: {
    action: 'PNGとして書き出し',
    more: 'その他の形式',
    png: 'PNGをダウンロード',
    svg: 'SVGをダウンロード',
    anime: 'アニメーションSVGをダウンロード',
    gif: 'GIFアニメをダウンロード',
    cycleDetail: '動画は軽量で滑らか、GIFはどこでも再生可能です。',
    cycleFormat: 'フォーマット',
    cycle_mp4: 'MP4動画',
    cycle_mp4_aide: '軽量で滑らか、背景が必要',
    cycle_gif: 'GIFアニメ',
    cycle_gif_aide: 'どこでも再生可能、やや重い',
    cycleProgress: '書き出し中…',
    cycleReessayer: '再試行',
    gifTitle: 'GIFアニメをダウンロード',
    gifDetail: 'GIFの透過は二値化されるため、輪郭が少し硬くなる場合があります。',
    gifBackground: '背景',
    fond_blanc: '白背景',
    fond_blanc_aide: '明るい背景用、輪郭滑らか',
    fond_transparent: '透過背景',
    fond_transparent_aide: '任意の背景に適合',
    gifConfirm: 'ダウンロード',
    copie: '画像をコピー',
    copieSvg: 'SVGをコピー',
    done: '書き出し完了',
    copied: 'コピー完了',
    failed: '書き出し失敗'
  },

  preview: {
    exit: 'プレビュー終了',
    key: 'Esc'
  },

  timeline: {
    play: '再生開始',
    pause: '再生停止',
    addAnimation: 'アニメーション追加',
    preview: 'プレビュー',
    export: 'モンタージュ書き出し',
    zoom: 'トラックズーム',
    blockAria: '{state}、{duration}',
    blockDurationAria: '{state}の長さ、{duration}',
    blockRemoveAria: '{state}を削除'
  },

  dialog: {
    cancel: 'キャンセル',
    nameCreateTitle: '新規サイクル',
    nameRenameTitle: 'サイクル名を変更',
    nameField: 'サイクル名',
    nameCreate: '作成',
    nameRename: '変更',
    removeTitle: '「{name}」を削除しますか？',
    removeDetail:
      'このシーケンスはアニメーションと共に失われます。 | このシーケンスは {n} 個のアニメーションと共に失われます。',
    removeConfirm: '削除'
  },

  cycles: {
    defaultName: 'デフォルトサイクル',
    newName: 'マイサイクル',
    menuNew: '新規サイクル',
    menuRenameAria: '{name}の名前を変更',
    menuRemoveAria: '{name}を削除'
  },

  units: {
    seconds: '{n} 秒',
    secondsShort: '{n}s'
  },

  settings: {
    title: '設定',
    language: '言語',
    about: '概要',
    credits: '{name} が ❤️ を込めて制作',
    creditsAria: 'プロジェクト制作者',
    github: 'GitHubでプロジェクトを見る',
    githubAria: 'GitHubプロジェクトリポジトリ'
  },

  states: {
    idle: '待機',
    thinking: '思考中',
    wink: 'ウィンク',
    wide: '見開く',
    alert: '警戒',
    notify: '通知',
    exclaim: '感嘆',
    sleep: '睡眠',
    egg: 'タマゴ',
    hexagon: '六角形',
    play: 'プレイ',
    orbit: '周回',
    burst: 'バースト',
    comet: '彗星',
    peek: 'チラ見',
    curious: '興味津々',
    shy: '内気',
    excited: 'ワクワク',
    nod: 'うなずく',
    nope: '首を振る',
    hello: 'こんにちは',
    sleepy: '眠い',
    power: 'パワーサージ',
    thuglife: 'サグライフ',
    heart: 'ハートラブ',
    disco: 'ディスコダンス',
    glitch: 'サイバーグリッチ',
    vortex: 'ワームホール',
    ninja: '影の忍者',
    retro: '8ビットレトロ',
    rocket: 'ロケット発射',
    freeze: 'フリーズ氷結',
    dizzy: 'めまい星',
    royal: 'ロイヤルクラウン',
    djbeat: 'DJベースドロップ',
    magic: '魔法キラキラ',
    action: 'シネマアクション',
    hyper: 'ハイパーカフェイン',
    swirl: 'スワール'
  },

  shapes: {
    cercle: 'スフィア',
    blob: 'ブロブ',
    bean: 'ビーン',
    jelly: 'ゼリー',
    galet: '小石',
    bubble: 'バブル',
    nuage: 'クラウド',
    goutte: 'ドロップ',
    squircle: 'スクワークル',
    rounded_cube: '角丸キューブ',
    capsule: 'カプセル',
    triangle: '三角ブロブ',
    hexagone: 'ヘキサゴン',
    diamond: 'ダイヤ',
    star_blob: 'スターブロブ',
    cylinder: 'シリンダー',
    mochi: 'モチ',
    gummy: 'グミ',
    puffy: 'パフィー',
    wobble: 'ウォブル',
    planet: 'プラネット',
    egg: 'エッグ',
    orbital: 'オービタル',
    spiky_blob: 'スパイキーブロブ',
    crystal: 'クリスタル',
    donut: 'ドーナツ'
  },

  colors: {
    encre: 'インク',
    creme: 'クリーム',
    brun: 'ブラウン',
    rouge: 'レッド',
    orange: 'オレンジ',
    ambre: 'アンバー',
    vert: 'グリーン',
    turquoise: 'ターコイズ',
    bleu: 'ブルー',
    violet: 'パープル',
    rose: 'ピンク',
    gris: 'グレー'
  },

  colorChooser: {
    savedColors: '保存されたカラー:',
    add: '追加',
    custom: 'カスタム',
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
    none: 'なし',
    arched: 'アーチ',
    straight: 'ストレート',
    dots: 'ドット'
  },

  nose: {
    none: 'なし',
    dot: 'ドット',
    pill: 'ピル',
    snout: 'マズル'
  },

  cheeks: {
    none: 'なし',
    blush: 'チーク',
    dots: 'ドット',
    lines: 'ストライプ'
  },

  mouth: {
    none: 'なし',
    smile: 'スマイル',
    grin: 'ニッコリ',
    frown: 'への字',
    open: '開き口',
    cat: '猫口',
    straight: '一直線'
  },

  expressions: {
    neutre: 'ニュートラル',
    attentif: '注目',
    surpris: 'びっくり',
    excite: '興奮',
    heureux: '幸せ',
    hilare: '大笑い',
    colere: '怒り',
    triste: '悲しい',
    effraye: '恐怖',
    mefiant: '警戒',
    confus: '混乱',
    curieux: '好奇心',
    fier: '誇らしげ',
    timide: '照れ',
    blase: '退屈',
    somnolent: 'ウトウト'
  }
}

export default ja
