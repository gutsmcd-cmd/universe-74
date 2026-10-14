const T = {
  en: {
    kicker: 'Apps · alternate timeline',
    title: 'The app house, Universe 74',
    lede: 'Same family of truly free apps, one timeline over. Everything is the same, just slightly different. In Universe 74, apps are allowed online.',
    roomword: 'Room', drawnote: 'Drawn from memory by a visitor from Universe 0',
    portalH: 'Portal to Universe 0',
    portalP: 'Homesick? The original house is one step away. Over there, everything works offline.',
    toU0: 'Back to Universe 0 →', toFam: 'The app collection (U0) →',
    foot: 'Still free. Still no ads. Still no logins. The internet is merely allowed here.',
    open: 'Open', online: 'May use the internet', soon: 'Nothing has moved in yet. The timeline is still loading.',
  },
  ja: {
    kicker: 'アプリ・もうひとつの世界線',
    title: 'アプリの家 ユニバース74',
    lede: 'おなじみの完全無料アプリ集の、ひとつ隣の世界線です。何もかも同じで、ほんの少しだけ違います。ユニバース74では、アプリがネットにつながってもいいことになっています。',
    roomword: '部屋', drawnote: 'ユニバース0から来た人が記憶を頼りに描いた見取り図',
    portalH: 'ユニバース0へのポータル',
    portalP: '元の世界が恋しくなったら、本家の家はすぐそこです。あちらでは何でもオフラインで動きます。',
    toU0: 'ユニバース0に戻る →', toFam: 'アプリ集（U0）へ →',
    foot: '無料、広告なし、ログイン不要なのは同じです。こちらではネットが「使ってもいい」だけ。',
    open: '開く', online: 'ネットを使うことがあります', soon: 'まだ誰も引っ越してきていません。世界線を読み込み中です。',
  },
}
const ROOMS = [
  { id: 'foyer', x: 150, y: 224, en: ['Foyer', 'The door again. It hums slightly. Everything here is free and needs no account, and in this timeline apps may go online when it helps. Pick a room.'],
    ja: ['玄関', 'またドアです。少しだけブーンと鳴っています。ここにあるものはすべて無料、アカウント不要。この世界線では、役に立つときはアプリがネットを使うこともあります。部屋を選んでください。'] },
  { id: 'study', x: 60, y: 146, en: ['Study', 'Books read themselves a little faster here. Reading, summaries and learning.'],
    ja: ['書斎', 'ここでは本が少しだけ速く読めます。読む・まとめる・学ぶためのアプリ。'] },
  { id: 'workshop', x: 60, y: 224, en: ['Workshop', 'Same workbench, extra lasers. Tools for making things.'],
    ja: ['作業場', '作業台は同じ、レーザーが少し多めです。ものづくりの道具。'] },
  { id: 'kitchen', x: 150, y: 146, en: ['Kitchen', 'The fridge sends you postcards. Everyday household helpers.'],
    ja: ['台所', '冷蔵庫から絵はがきが届きます。毎日の暮らしの助っ人。'] },
  { id: 'lounge', x: 240, y: 146, en: ['Lounge', 'The sofa floats about two centimeters. Music, calm and fun with words.'],
    ja: ['居間', 'ソファが2センチほど浮いています。音楽、くつろぎ、ことば遊び。'] },
  { id: 'game', x: 240, y: 224, en: ['Game room', 'The dice always land on 74. Games and play.'],
    ja: ['遊び部屋', 'サイコロはいつも74が出ます。ゲームと遊び。'] },
]
const APPS = [
  { room: 'study', url: 'https://gutsmcd-cmd.github.io/u74-summarize/', icon: 'https://gutsmcd-cmd.github.io/u74-summarize/icons/icon-192.png', emoji: '📚',
    en: ['Summarizer', 'Open a PDF, EPUB or text file, or paste text, and get a summary: short, detailed, chapter by chapter, or for kids. In English or Japanese. The AI runs in your browser; no key needed.'],
    ja: ['まとめ屋', 'PDF・EPUB・テキストを開くか、文章を貼りつけるだけで要約します。ひとことで・くわしく・章ごと・子ども向けから選べて、日本語でも英語でも。AIはブラウザの中で動くので、キーは不要です。'] },
  { room: 'study', url: 'https://gutsmcd-cmd.github.io/u74-songs/', icon: 'https://gutsmcd-cmd.github.io/u74-songs/icons/icon-192.png', emoji: '🎵',
    en: ['Study Songs', 'Turn a topic or your notes into catchy memory lyrics (rap, pop, nursery or chant), then play them over a simple beat with karaoke-style lyrics.'],
    ja: ['歌で覚える', 'テーマやノートを、覚えやすい歌詞（ラップ・ポップ・童謡・掛け声）に変身。シンプルなビートに合わせて、カラオケ風に歌詞を表示します。'] },
  { room: 'lounge', url: 'https://gutsmcd-cmd.github.io/u74-garden/', icon: 'https://gutsmcd-cmd.github.io/u74-garden/icons/icon-192.png', emoji: '🌸',
    en: ['Sakura Matcha Garden', 'Add tiny daily habits and to-dos. Each one you finish grows a sakura, bamboo, moss or tea bush in a pink-and-green garden that follows the seasons and the time of day. Streaks and a gentle daily summary; data stays on your device.'],
    ja: ['さくら抹茶の庭', '毎日の小さな習慣やToDoを追加。ひとつできるたびに、桜・竹・苔・茶の木が育ちます。庭は季節や時間帯で移り変わり、連続記録とやさしい一日のまとめつき。データは端末の中だけ。'] },
]
let lang = localStorage.getItem('u74-lang') || (navigator.language.startsWith('ja') ? 'ja' : 'en')
let room = location.hash.slice(1) || 'foyer'
const NS = 'http://www.w3.org/2000/svg'

function render() {
  document.documentElement.lang = lang
  const t = T[lang]
  document.querySelectorAll('[data-i]').forEach(el => { el.textContent = t[el.dataset.i] })
  document.title = t.title
  document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)))
  const tabs = document.getElementById('tabs'); tabs.innerHTML = ''
  const g = document.getElementById('rooms'); g.innerHTML = ''
  for (const r of ROOMS) {
    const b = document.createElement('button')
    b.textContent = r[lang][0]; b.setAttribute('aria-current', String(r.id === room))
    b.onclick = () => go(r.id); tabs.append(b)
    const a = document.createElementNS(NS, 'g')
    a.setAttribute('class', 'room' + (r.id === room ? ' on' : '')); a.setAttribute('tabindex', '0'); a.setAttribute('role', 'button')
    a.setAttribute('aria-label', r[lang][0])
    const rect = document.createElementNS(NS, 'rect')
    Object.entries({ x: r.x + 14, y: r.y, width: 82, height: 66, rx: 8 }).forEach(([k, v]) => rect.setAttribute(k, v))
    const tx = document.createElementNS(NS, 'text'); tx.setAttribute('x', r.x + 55); tx.setAttribute('y', r.y + 38); tx.textContent = r[lang][0]
    a.append(rect, tx); a.onclick = () => go(r.id); a.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(r.id) } }
    g.append(a)
  }
  const R = ROOMS.find(r => r.id === room) || ROOMS[0]
  document.getElementById('roomName').textContent = R[lang][0]
  document.getElementById('roomBlurb').textContent = R[lang][1]
  const box = document.getElementById('apps'); box.innerHTML = ''
  const list = APPS.filter(a => a.room === R.id)
  if (R.id === 'foyer') return
  if (!list.length) { box.innerHTML = `<p class="empty">${t.soon}</p>`; return }
  for (const a of list) {
    const c = document.createElement('a'); c.className = 'card'; c.href = a.url
    c.innerHTML = `<img alt="" src="${a.icon}"><div><h3></h3><p></p><span class="tag">${t.online}</span></div>`
    c.querySelector('img').onerror = e => { e.target.replaceWith(Object.assign(document.createElement('span'), { textContent: a.emoji, style: 'font-size:40px;width:52px;text-align:center' })) }
    c.querySelector('h3').textContent = a[lang][0]; c.querySelector('p').textContent = a[lang][1]
    box.append(c)
  }
}
function go(id) { room = id; history.replaceState(null, '', '#' + id); render() }
document.querySelectorAll('.lang button').forEach(b => b.onclick = () => { lang = b.dataset.lang; localStorage.setItem('u74-lang', lang); render() })
render()
