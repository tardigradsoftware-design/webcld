// scripts/render-ui.mjs
// 43 hizmetin her biri için gerçekçi, Türkçe ürün ekranı görüntüsü üretir.
// SVG -> PNG (resvg, gerçek Inter fontu) -> JPG (sharp). AI sanatı estetiği yok:
// düz, crisp, gerçek SaaS arayüzü görünümü.
import fs from 'node:fs'
import { decompress } from 'wawoff2'
import { Resvg } from '@resvg/resvg-js'
import sharp from 'sharp'

const W = 1600
const H = 1000
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const FC = { 400: 0.55, 500: 0.56, 600: 0.58, 700: 0.6, 800: 0.62 }
const tw = (s, size, w = 500) => String(s).length * size * (FC[w] ?? 0.56)
const txt = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}" font-family="Inter" font-size="${o.s ?? 13}" font-weight="${o.w ?? 500}" fill="${o.c ?? '#0f172a'}"${o.a ? ` text-anchor="${o.a}"` : ''}${o.ls ? ` letter-spacing="${o.ls}"` : ''}>${esc(s)}</text>`
const rw = (x, y, w, h, o = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 0}" fill="${o.f ?? 'none'}"${o.st ? ` stroke="${o.st}" stroke-width="${o.sw ?? 1}"` : ''}${o.op != null ? ` opacity="${o.op}"` : ''}/>`
const ln = (x1, y1, x2, y2, c, wdt = 1, dash) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${wdt}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
const circ = (x, y, r, f, o = {}) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${o.st ? ` stroke="${o.st}" stroke-width="${o.sw ?? 1}"` : ''}${o.op != null ? ` opacity="${o.op}"` : ''}/>`
const chip = (x, y, label, { bg, fg, s = 10.8, w = 700, pad = 9, h = 21 } = {}) => {
  const cw = tw(label, s, w) + pad * 2
  return { svg: rw(x, y, cw, h, { rx: 99, f: bg }) + txt(x + cw / 2, y + h - 6.5, label, { s, w, c: fg, a: 'middle' }), w: cw }
}
const ST = {
  g: ['#10b981', '#059669'], b: ['#2563eb', '#2563eb'], c: ['#06b6d4', '#0891b2'],
  a: ['#f59e0b', '#b45309'], r: ['#ef4444', '#dc2626'], n: ['#94a3b8', '#475569'],
}
const stChip = (x, y, label, tone) => {
  const [base, fg] = ST[tone]
  const cw = tw(label, 10.8, 700) + 18
  return { svg: rw(x, y, cw, 21, { rx: 99, f: base, op: 0.14 }) + txt(x + 9, y + 14.5, label, { s: 10.8, w: 700, c: fg }), w: cw }
}
const card = (x, y, w, h) => rw(x, y, w, h, { rx: 12, f: '#ffffff', st: '#e6ebf2' })
const kpi = (x, y, w, lb, vl, dl, dlC, small) =>
  card(x, y, w, 92) + txt(x + 15, y + 25, lb, { s: 10.8, w: 600, c: '#64748b', ls: '0.06em' }) +
  txt(x + 15, y + 54, vl, { s: 20, w: 800 }) + txt(x + 15, y + 76, dl, { s: 11, w: 650, c: dlC }) +
  txt(x + 15 + tw(dl, 11, 650) + 7, y + 76, small, { s: 11, w: 500, c: '#64748b' })
const table = (x, y, cols, rows, rowH = 40) => {
  let svg = ''
  let cx = x
  cols.forEach((c) => { svg += txt(cx, y + 13, c.label, { s: 10.4, w: 700, c: '#64748b', ls: '0.06em' }); cx += c.w })
  svg += ln(x, y + 22, x + cols.reduce((a, c) => a + c.w, 0), y + 22, '#eef2f7')
  rows.forEach((r, ri) => {
    const ry = y + 22 + ri * rowH
    let rx = x
    r.forEach((cell, ci) => {
      if (cell && cell.st) svg += stChip(rx, ry + 9, cell.st, cell.tone).svg
      else if (cell && cell.d) svg += txt(rx, ry + 23, cell.d, { s: 12, w: 650, c: cell.c ?? '#059669' })
      else svg += txt(rx, ry + 23, cell, { s: 12.3, w: ci === 0 ? 600 : 500, c: ci === 0 ? '#1e293b' : '#475569' })
      rx += cols[ci].w
    })
    if (ri < rows.length - 1) svg += ln(x, ry + rowH, x + cols.reduce((a, c) => a + c.w, 0), ry + rowH, '#f1f5f9')
  })
  return svg
}
const area = (x, y, w, h, pts, stroke, gid, labels) => {
  const max = Math.max(...pts), min = Math.min(...pts)
  const px = (i) => x + (i / (pts.length - 1)) * w
  const py = (v) => y + h - ((v - min) / (max - min)) * (h - 16) - 8
  const d = pts.map((v, i) => `${i ? 'L' : 'M'}${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join(' ')
  return [0.25, 0.5, 0.75].map((t) => ln(x, y + h * t, x + w, y + h * t, '#eef2f7')).join('') +
    `<path d="${d} L${x + w} ${y + h} L${x} ${y + h} Z" fill="url(#${gid})"/>` +
    `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>` +
    circ(px(pts.length - 1), py(pts[pts.length - 1]), 4, stroke) +
    labels.map((t, i) => txt(x + (i / (labels.length - 1)) * w, y + h + 18, t, { s: 10.2, w: 500, c: '#94a3b8', a: i === 0 ? 'start' : i === labels.length - 1 ? 'end' : 'middle' })).join('')
}
const grad = (id, c) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".18"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient>`
const inp = (x, y, w, h, ph) => rw(x, y, w, h, { rx: 8, f: '#ffffff', st: '#e2e8f0' }) + (ph ? txt(x + 11, y + h / 2 + 4, ph, { s: 12, w: 450, c: '#94a3b8' }) : '')
const lbl = (x, y, t) => txt(x, y, t, { s: 11.5, w: 600, c: '#334155' })
const btn = (x, y, w, t, f = '#2563eb') => rw(x, y, w, 34, { rx: 8, f }) + txt(x + w / 2, y + 21.5, t, { s: 12.3, w: 650, c: '#ffffff', a: 'middle' })
const ghost = (x, y, w, t) => rw(x, y, w, 34, { rx: 8, f: '#ffffff', st: '#cbd5e1' }) + txt(x + w / 2, y + 21.5, t, { s: 12.3, w: 650, c: '#334155', a: 'middle' })
const check = (x, y, c = '#10b981') => circ(x, y, 7, c, { op: 0.15 }) + `<path d="M${x - 3} ${y} l2.2 2.4 4-4.4" fill="none" stroke="${c}" stroke-width="1.7" stroke-linecap="round"/>`

function appChrome(title) {
  let s = rw(0, 0, W, H, { f: '#f1f5f9' }) + rw(0, 0, W, 56, { f: '#ffffff' }) + ln(0, 56, W, 56, '#e2e8f0')
  s += rw(22, 14, 28, 28, { rx: 8, f: '#0b1f4b' }) + `<path d="M29 30 L34 24 L38 28 L43 21" stroke="#ffffff" stroke-width="2.2" fill="none" stroke-linecap="round"/>`
  s += txt(60, 34, 'Tardigrad Panel', { s: 13.5, w: 750 })
  s += txt(182, 34, '/', { s: 13, w: 500, c: '#cbd5e1' }) + txt(196, 34, title, { s: 13, w: 600, c: '#475569' })
  s += inp(W - 470, 11, 300, 34, 'Modülde ara…')
  s += rw(W - 154, 11, 34, 34, { rx: 8, f: '#f8fafc', st: '#e2e8f0' }) + circ(W - 137, 26, 6, 'none', { st: '#475569', sw: 1.7 }) + ln(W - 137, 33, W - 137, 36, '#475569', 1.7)
  s += circ(W - 100, 28, 15, '#6366f1') + txt(W - 100, 32.5, 'TS', { s: 10.5, w: 700, c: '#fff', a: 'middle' })
  s += txt(W - 76, 33, 'TR', { s: 11.5, w: 650, c: '#475569' })
  return s
}
function head(x, y, title, sub, btnLabel) {
  let s = txt(x, y + 18, title, { s: 20, w: 800, ls: '-0.01em' }) + txt(x, y + 40, sub, { s: 12.3, w: 500, c: '#64748b' })
  if (btnLabel) s += btn(W - 42 - tw(btnLabel, 12.5, 650) - 28, y + 2, tw(btnLabel, 12.5, 650) + 28, btnLabel)
  return s
}
function browser(url) {
  let s = rw(0, 0, W, H, { f: '#e8edf4' }) + rw(0, 0, W, 46, { f: '#dde5ee' })
  ;[22, 40, 58].forEach((cx, i) => (s += circ(cx, 23, 5.5, ['#f87171', '#fbbf24', '#34d399'][i])))
  s += rw(90, 9, 620, 28, { rx: 99, f: '#ffffff' }) + circ(108, 23, 5, 'none', { st: '#94a3b8', sw: 1.6 }) + txt(124, 27.5, url, { s: 11.8, w: 500, c: '#475569' })
  return s
}

/* ---------- şablonlar ---------- */
const TPL = {
  web: (T) => {
    let s = browser('https://tardigradsoftware.com')
    s += rw(0, 46, W, H - 46, { f: '#ffffff' })
    s += rw(60, 66, 26, 26, { rx: 7, f: '#0b1f4b' }) + txt(96, 85, 'TARDİGRAD', { s: 13.5, w: 800, ls: '0.06em' })
    let nx = 700
    ;['Ana Sayfa', 'Hizmetler', 'Referanslar', 'Blog', 'İletişim'].forEach((t, i) => { s += txt(nx, 85, t, { s: 12.6, w: i === 1 ? 700 : 550, c: i === 1 ? '#0b1f4b' : '#475569' }); nx += tw(t, 12.6, 600) + 34 })
    s += btn(W - 190, 62, 130, 'Teklif Alın', '#0b1f4b')
    s += ln(60, 106, W - 60, 106, '#eef2f7')
    s += txt(60, 210, T.title, { s: 40, w: 800, ls: '-0.02em' })
    s += txt(60, 252, T.sub, { s: 15, w: 500, c: '#475569' })
    s += txt(60, 278, 'Türkiye genelinde 81 ile uzaktan hizmet · İstanbul Maltepe merkez', { s: 13, w: 500, c: '#64748b' })
    s += btn(60, 312, 190, 'Projenizi Konuşalım') + ghost(262, 312, 170, 'Hizmetleri İnceleyin')
    s += rw(900, 150, 640, 330, { rx: 16, f: '#0b1f4b' })
    s += rw(930, 180, 380, 26, { rx: 6, f: '#ffffff', op: 0.16 }) + rw(930, 220, 300, 12, { rx: 6, f: '#22d3ee', op: 0.7 })
    s += rw(930, 250, 580, 110, { rx: 10, f: '#ffffff', op: 0.08 }) + rw(930, 376, 280, 74, { rx: 10, f: '#2563eb', op: 0.55 }) + rw(1226, 376, 284, 74, { rx: 10, f: '#06b6d4', op: 0.4 })
    ;[0, 1, 2].forEach((i) => {
      const cx = 60 + i * 500
      s += card(cx, 520, 468, 150) + circ(cx + 34, 556, 16, ['#2563eb', '#06b6d4', '#10b981'][i], { op: 0.14 }) + circ(cx + 34, 556, 6, ['#2563eb', '#06b6d4', '#10b981'][i])
      s += txt(cx + 62, 552, ['Kurumsal Tasarım', 'Hızlı ve Güvenli', 'SEO Uyumlu'][i], { s: 14, w: 700 })
      s += txt(cx + 62, 574, ['Markanıza özel arayüz ve içerik mimarisi', 'Core Web Vitals dostu teknik kurulum', 'Arama motorlarına hazır schema altyapısı'][i], { s: 12, w: 500, c: '#64748b' })
      s += rw(cx + 24, 606, 420, 40, { rx: 8, f: '#f8fafc' })
    })
    s += rw(0, 706, W, 60, { f: '#0b1f4b' }) + txt(60, 742, '© 2026 Tardigrad Software · İstanbul', { s: 11.5, w: 500, c: '#93a6c8' })
    s += rw(0, 766, W, H - 766, { f: '#f8fafc' })
    ;[['207', 'Sayfa'], ['43', 'Hizmet'], ['81', 'İl'], ['%98', 'Memnuniyet']].forEach((k, i) => {
      s += txt(60 + i * 380, 850, k[0], { s: 30, w: 800, c: '#0b1f4b' }) + txt(60 + i * 380, 876, k[1], { s: 12, w: 600, c: '#64748b' })
    })
    return s
  },
  eticaret: (T) => {
    let s = browser('https://magaza-ornegi.com')
    s += rw(0, 46, W, 34, { f: '#0b1f4b' }) + txt(W / 2, 68, '750 ₺ üzeri siparişlerde kargo bedava · Aynı gün kargo', { s: 11.8, w: 600, c: '#cfe0ff', a: 'middle' })
    s += rw(0, 80, W, H - 80, { f: '#ffffff' })
    s += txt(60, 122, 'KONSEPT', { s: 17, w: 800, ls: '0.08em' })
    let nx = 260
    ;['Yeni Gelenler', 'Kadın', 'Erkek', 'Ev & Yaşam', 'Aksesuar', 'Outlet'].forEach((t, i) => { s += txt(nx, 121, t, { s: 12.6, w: i === 0 ? 700 : 550, c: i === 0 ? '#0b1f4b' : '#475569' }); nx += tw(t, 12.6, 600) + 30 })
    s += inp(W - 380, 98, 240, 32, 'Ürün ara…') + circ(W - 116, 114, 8, 'none', { st: '#334155', sw: 1.7 }) + circ(W - 70, 114, 8, 'none', { st: '#334155', sw: 1.7 }) + circ(W - 66, 108, 7, '#2563eb') + txt(W - 66, 111.5, '3', { s: 9, w: 700, c: '#fff', a: 'middle' })
    s += rw(60, 150, 1480, 190, { rx: 14, f: '#0e2a63' })
    s += txt(100, 232, 'Yeni Sezon Koleksiyonu', { s: 30, w: 800, c: '#ffffff' }) + txt(100, 262, 'Sonbahar parçalarında %20’ye varan indirim', { s: 13.5, w: 500, c: '#bcd0f7' })
    s += btn(100, 284, 150, 'Alışverişe Başla', '#22d3ee')
    s += rw(1150, 170, 360, 150, { rx: 10, f: '#ffffff', op: 0.1 })
    const products = [['Seramik Kupa', '₺249'], ['Yün Kaşkol', '₺549'], ['Keten Gömlek', '₺1.290'], ['Deri Cüzdan', '₺890'], ['Cam Vazo', '₺420'], ['Ahşap Mumluk', '₺310'], ['Pamuklu Tişört', '₺640'], ['Bakır Cezve', '₺780']]
    products.forEach((p, i) => {
      const cx = 60 + (i % 4) * 372
      const cy = 372 + Math.floor(i / 4) * 300
      s += card(cx, cy, 348, 276)
      s += rw(cx + 1, cy + 1, 346, 168, { rx: 11, f: ['#eef4fb', '#f3f1ec', '#eefaf6', '#fbf3ee'][i % 4] })
      s += circ(cx + 174, cy + 84, 44, ['#bfd6f2', '#e4d9c6', '#bfe8dc', '#f2d3bd'][i % 4]) + rw(cx + 150, cy + 108, 48, 34, { rx: 6, f: '#ffffff', op: 0.65 })
      s += txt(cx + 18, cy + 196, p[0], { s: 13.5, w: 650 }) + txt(cx + 18, cy + 218, p[1], { s: 14, w: 800, c: '#0b1f4b' })
      s += rw(cx + 18, cy + 232, 312, 30, { rx: 7, f: '#0b1f4b' }) + txt(cx + 174, cy + 251.5, 'Sepete Ekle', { s: 11.8, w: 650, c: '#fff', a: 'middle' })
    })
    return s
  },
  crm: (T) => {
    let s = appChrome(T.title) + head(42, 84, T.title, T.sub, '+ Yeni Fırsat')
    const cols = [['Yeni Lead', 6, '#94a3b8'], ['Görüşme', 4, '#2563eb'], ['Teklif', 3, '#f59e0b'], ['Kazanıldı', 2, '#10b981']]
    const deals = [
      ['Demirtaş Lojistik', '₺184.000', 'MA'], ['Kuzey Gıda', '₺49.000', 'EK'], ['Vera Tekstil', '₺28.500', 'MA'],
      ['Arda Yapı', '₺96.000', 'TS'], ['Lida Kozmetik', '₺18.200', 'EK'], ['Nortel Medya', '₺64.400', 'TS'],
      ['Ege Seramik', '₺142.000', 'MA'], ['Mira Enerji', '₺76.300', 'EK'], ['Baltacı Turizm', '₺38.900', 'TS'],
      ['Soylu Mobilya', '₺58.000', 'MA'], ['Pera Ajans', '₺22.400', 'EK'], ['Anka Savunma', '₺210.000', 'TS'],
      ['Vadi Yazılım', '₺44.700', 'MA'], ['Lodos Gıda', '₺31.200', 'EK'], ['Mercan Tekstil', '₺27.800', 'TS'],
    ]
    let di = 0
    cols.forEach((c, ci) => {
      const cx = 42 + ci * 382
      s += txt(cx, 168, c[0], { s: 12.5, w: 700 }) + circ(cx + tw(c[0], 12.5, 700) + 26, 163, 11, c[2], { op: 0.15 }) + txt(cx + tw(c[0], 12.5, 700) + 26, 167, String(c[1]), { s: 10.5, w: 700, c: c[2], a: 'middle' })
      const n = ci === 0 ? 4 : ci === 3 ? 3 : 4
      for (let k = 0; k < n; k++) {
        const d = deals[di++]
        const cy = 184 + k * 158
        s += card(cx, cy, 362, 142)
        s += txt(cx + 16, cy + 28, d[0], { s: 13.5, w: 700 }) + txt(cx + 16, cy + 52, d[1], { s: 15, w: 800, c: '#0b1f4b' })
        s += circ(cx + 26, cy + 112, 12, ['#6366f1', '#0ea5e9', '#10b981'][di % 3]) + txt(cx + 26, cy + 116, d[2], { s: 9, w: 700, c: '#fff', a: 'middle' })
        s += txt(cx + 46, cy + 116, ['Satış · M. Aksoy', 'Satış · E. Kaya', 'Satış · T. Sarp'][di % 3], { s: 11, w: 500, c: '#64748b' })
        const tg = chip(cx + 250, cy + 100, ['Sıcak', 'Orta', 'Yeni'][di % 3], { bg: ['#10b981', '#f59e0b', '#2563eb'][di % 3], fg: '#fff', s: 10, pad: 8, h: 19 })
        s += tg.svg
      }
    })
    return s
  },
  panel: (T) => {
    let s = appChrome(T.title) + head(42, 84, T.title, T.sub, '+ Kullanıcı Davet Et')
    ;[['TOPLAM KULLANICI', '148', '▲ 6', '#059669', 'bu ay'], ['AKTİF ROL', '12', '—', '#64748b', 'tanımlı'], ['SON 24 SA', '96 giriş', '▲ %4', '#059669', 'normal']].forEach((k, i) => (s += kpi(42 + i * 300, 148, 288, k[0], k[1], k[2], k[3], k[4])))
    s += card(960, 148, 598, 92) + txt(976, 176, 'Roller', { s: 12, w: 700 })
    ;[['Yönetici', 8], ['Editör', 26], ['Destek', 41], ['İzleyici', 73]].forEach((r, i) => {
      const c = chip(976 + i * 145, 192, `${r[0]} · ${r[1]}`, { bg: '#f1f5f9', fg: '#475569' })
      s += c.svg
    })
    s += card(42, 264, 1516, 560)
    s += txt(58, 296, 'Kullanıcılar ve yetkiler', { s: 13.5, w: 700 }) + txt(58, 316, 'Rol değişiklikleri anlık olarak denetim loguna işlenir', { s: 11.5, w: 500, c: '#64748b' })
    s += table(58, 336, [
      { label: 'KULLANICI', w: 300 }, { label: 'E-POSTA', w: 330 }, { label: 'ROL', w: 200 }, { label: 'SON GİRİŞ', w: 240 }, { label: 'DURUM', w: 180 },
    ], [
      ['Meriç Aksoy', 'meric@tardigradsoftware.com', 'Yönetici', 'Bugün 09:14', { st: 'Aktif', tone: 'g' }],
      ['Elif Kaya', 'elif@tardigradsoftware.com', 'Editör', 'Bugün 08:47', { st: 'Aktif', tone: 'g' }],
      ['Tolga Sarp', 'tolga@tardigradsoftware.com', 'Destek', 'Dün 18:22', { st: 'Aktif', tone: 'g' }],
      ['Zeynep Aral', 'zeynep@musteri-firma.com', 'İzleyici', '12 Eyl 14:03', { st: 'Pasif', tone: 'n' }],
      ['Barış Ünal', 'baris@musteri-firma.com', 'Editör', '11 Eyl 10:41', { st: 'Aktif', tone: 'g' }],
      ['Sena Duru', 'sena@tardigradsoftware.com', 'Destek', '10 Eyl 16:15', { st: 'Kilitli', tone: 'r' }],
      ['Kerem Balta', 'kerem@is-ortagi.com', 'Yönetici', '09 Eyl 11:02', { st: 'Aktif', tone: 'g' }],
      ['Derya Tuncel', 'derya@musteri-firma.com', 'İzleyici', '08 Eyl 15:36', { st: 'Pasif', tone: 'n' }],
      ['Onur Ercan', 'onur@tardigradsoftware.com', 'Editör', '08 Eyl 09:58', { st: 'Aktif', tone: 'g' }],
      ['Melis Acar', 'melis@musteri-firma.com', 'Destek', '07 Eyl 13:20', { st: 'Aktif', tone: 'g' }],
    ], 46)
    return s
  },
  dashboard: (T) => {
    let s = appChrome(T.title) + head(42, 84, T.title, T.sub, 'Rapor İndir')
    ;[['GÜNLÜK CİRO', '₺96.480', '▲ %11,0', '#059669', 'düne göre'], ['SİPARİŞ', '42', '▲ %8,2', '#059669', 'bugün'], ['DÖNÜŞÜM', '%3,4', '▲ 0,3 p', '#059669', '30 gün'], ['DESTEK TALEBİ', '17', '▼ 4', '#059669', 'açık']].forEach((k, i) => (s += kpi(42 + i * 382, 148, 370, k[0], k[1], k[2], k[3], k[4])))
    s += card(42, 264, 980, 330)
    s += txt(58, 294, 'Gelir ve oturum eğilimi', { s: 13, w: 700 }) + txt(58, 312, 'Son 12 hafta · haftalık toplam', { s: 11, w: 500, c: '#64748b' })
    s += area(58, 336, 930, 210, [210, 232, 226, 258, 252, 288, 280, 316, 310, 344, 362, 386], '#2563eb', 'g1', ['H1', 'H3', 'H5', 'H7', 'H9', 'H12'])
    s += card(1040, 264, 518, 330)
    s += txt(1056, 294, 'Kanal dağılımı', { s: 13, w: 700 })
    ;[['Web', 56, '#2563eb'], ['Mobil', 29, '#06b6d4'], ['Pazaryeri', 15, '#94a3b8']].forEach((r, i) => {
      const ry = 330 + i * 62
      s += txt(1056, ry + 12, r[0], { s: 12, w: 600 }) + txt(1542, ry + 12, `%${r[1]}`, { s: 12, w: 700, a: 'end' })
      s += rw(1056, ry + 22, 486, 10, { rx: 5, f: '#eef2f7' }) + rw(1056, ry + 22, 486 * r[1] / 56, 10, { rx: 5, f: r[2] })
    })
    s += card(42, 612, 1516, 340)
    s += txt(58, 644, 'Son hareketler', { s: 13.5, w: 700 })
    s += table(58, 664, [
      { label: 'KAYIT', w: 200 }, { label: 'İŞLEM', w: 480 }, { label: 'KANAL', w: 200 }, { label: 'TUTAR', w: 200 }, { label: 'DURUM', w: 200 },
    ], [
      ['#AB-10421', 'Demirtaş Lojistik · kurumsal plan yenileme', 'Web', '₺18.400', { st: 'Ödendi', tone: 'g' }],
      ['#AB-10420', 'Kuzey Gıda · plan yükseltme (Pro)', 'Mobil', '₺4.900', { st: 'Ödendi', tone: 'g' }],
      ['#AB-10419', 'Vera Tekstil · yeni abonelik', 'Web', '₺1.450', { st: 'Beklemede', tone: 'a' }],
      ['#AB-10418', 'Arda Yapı · ek lisans (5 kullanıcı)', 'Web', '₺4.900', { st: 'Ödendi', tone: 'g' }],
      ['#AB-10417', 'Lida Kozmetik · ödeme denemesi', 'Mobil', '₺1.450', { st: 'Başarısız', tone: 'r' }],
      ['#AB-10416', 'Nortel Medya · yeni abonelik', 'Pazaryeri', '₺4.900', { st: 'Ödendi', tone: 'g' }],
    ], 42)
    return s
  },
  stok: (T) => {
    let s = appChrome(T.title) + head(42, 84, T.title, T.sub, 'Sayım Başlat')
    s += inp(42, 150, 320, 34, 'Ürün veya SKU ara…')
    ;[['Depo: Merkez', 380], ['Kategori: Tümü', 520], ['Durum: Eşik altı', 660]].forEach(([t, x]) => {
      s += rw(x, 150, 128, 34, { rx: 8, f: '#ffffff', st: '#e2e8f0' }) + txt(x + 12, 171, t, { s: 12, w: 550, c: '#334155' }) + `<path d="M${x + 108} 165 l5 5 5-5" fill="none" stroke="#94a3b8" stroke-width="1.6" stroke-linecap="round"/>`
    })
    s += card(42, 204, 1120, 620)
    s += table(58, 224, [
      { label: 'ÜRÜN', w: 320 }, { label: 'DEPO', w: 160 }, { label: 'MİKTAR', w: 130 }, { label: 'EŞİK', w: 110 }, { label: 'KARŞILAMA', w: 180 }, { label: 'DURUM', w: 180 },
    ], [
      ['Seramik Kupa (mat)', 'Merkez', '0', '20', '0 gün', { st: 'Tükendi', tone: 'r' }],
      ['Yün Kaşkol — antrasit', 'Merkez', '4', '20', '6 gün', { st: 'Kritik', tone: 'r' }],
      ['Keten Gömlek — M', 'Merkez', '7', '15', '9 gün', { st: 'Eşik altı', tone: 'a' }],
      ['Deri Cüzdan — taba', 'Merkez', '86', '30', '22 gün', { st: 'Sağlıklı', tone: 'g' }],
      ['Cam Vazo — küçük', 'Depo 2', '54', '25', '31 gün', { st: 'Sağlıklı', tone: 'g' }],
      ['Ahşap Mumluk — orta', 'Depo 2', '12', '18', '7 gün', { st: 'Eşik altı', tone: 'a' }],
      ['Pamuklu Tişört — L', 'Merkez', '140', '40', '48 gün', { st: 'Sağlıklı', tone: 'g' }],
      ['Bakır Cezve — 2 kişilik', 'Depo 2', '33', '15', '26 gün', { st: 'Sağlıklı', tone: 'g' }],
      ['Keten Pantolon — 42', 'Merkez', '9', '12', '8 gün', { st: 'Eşik altı', tone: 'a' }],
      ['Seramik Tabak Seti', 'Depo 2', '61', '24', '35 gün', { st: 'Sağlıklı', tone: 'g' }],
      ['Yün Bere — bordo', 'Merkez', '18', '16', '12 gün', { st: 'Sağlıklı', tone: 'g' }],
      ['Cam Sürahi — büyük', 'Depo 2', '3', '10', '4 gün', { st: 'Kritik', tone: 'r' }],
    ], 46)
    s += card(1180, 204, 378, 620)
    s += txt(1196, 236, 'Depo doluluk oranı', { s: 13, w: 700 })
    ;[['Merkez', 78, '#2563eb'], ['Depo 2', 54, '#06b6d4'], ['Sevkiyat alanı', 32, '#10b981']].forEach((r, i) => {
      const ry = 268 + i * 74
      s += txt(1196, ry + 12, r[0], { s: 12.3, w: 600 }) + txt(1542, ry + 12, `%${r[1]}`, { s: 12.3, w: 700, a: 'end' })
      s += rw(1196, ry + 22, 346, 12, { rx: 6, f: '#eef2f7' }) + rw(1196, ry + 22, 346 * r[1] / 100, 12, { rx: 6, f: r[2] })
    })
    s += ln(1196, 508, 1542, 508, '#eef2f7')
    s += txt(1196, 538, 'Otomatik sipariş önerileri', { s: 12.5, w: 700 })
    ;['Seramik Kupa · 240 adet', 'Yün Kaşkol · 120 adet', 'Cam Sürahi · 60 adet'].forEach((t, i) => {
      s += circ(1202, 570 + i * 34, 4, '#f59e0b') + txt(1216, 574 + i * 34, t, { s: 12, w: 550, c: '#334155' })
    })
    s += btn(1196, 690, 346, 'Tedarikçiye Taslak Gönder', '#0b1f4b')
    return s
  },
  form: (T) => {
    let s = appChrome(T.title) + head(42, 84, T.title, T.sub, '+ Yeni Alan')
    s += card(42, 148, 640, 700)
    s += txt(58, 180, 'Form önizleme', { s: 13.5, w: 700 }) + txt(58, 200, 'Yayın adresi: /form · reCAPTCHA v3 + honeypot aktif', { s: 11.3, w: 500, c: '#64748b' })
    const fields = [['Ad Soyad *', 240], ['E-posta *', 240], ['Telefon', 280], ['Talep Türü *', 280]]
    s += lbl(58, 240, 'Ad Soyad *') + inp(58, 250, 292, 36, 'Adınız ve soyadınız')
    s += lbl(372, 240, 'E-posta *') + inp(372, 250, 292, 36, 'ornek@firma.com')
    s += lbl(58, 310, 'Telefon') + inp(58, 320, 292, 36, '05xx xxx xx xx')
    s += lbl(372, 310, 'Talep Türü *') + rw(372, 320, 292, 36, { rx: 8, f: '#ffffff', st: '#e2e8f0' }) + txt(383, 342, 'Web sitesi / E-ticaret / Özel yazılım', { s: 11.6, w: 500, c: '#334155' }) + `<path d="M644 335 l5 5 5-5" fill="none" stroke="#94a3b8" stroke-width="1.6" stroke-linecap="round"/>`
    s += lbl(58, 380, 'Mesajınız') + rw(58, 390, 606, 110, { rx: 8, f: '#ffffff', st: '#e2e8f0' }) + txt(69, 412, 'Projenizi kısaca anlatın…', { s: 12, w: 450, c: '#94a3b8' })
    s += rw(58, 520, 16, 16, { rx: 4, f: '#2563eb' }) + `<path d="M62 528 l3 3 5-6" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round"/>` + txt(84, 533, 'KVKK aydınlatma metnini okudum, onaylıyorum *', { s: 11.8, w: 550, c: '#334155' })
    s += btn(58, 556, 180, 'Formu Gönder')
    s += ln(58, 620, 666, 620, '#eef2f7')
    s += txt(58, 650, 'Alan performansı', { s: 12.5, w: 700 })
    ;[['Ad Soyad', 98], ['E-posta', 96], ['Talep Türü', 87], ['Mesaj', 64]].forEach((r, i) => {
      const ry = 672 + i * 40
      s += txt(58, ry + 12, r[0], { s: 12, w: 550 }) + rw(220, ry + 4, 380, 9, { rx: 4, f: '#eef2f7' }) + rw(220, ry + 4, 380 * r[1] / 100, 9, { rx: 4, f: r[1] > 90 ? '#10b981' : '#f59e0b' }) + txt(640, ry + 13, `%${r[1]}`, { s: 11.5, w: 650, c: '#475569' })
    })
    s += card(706, 148, 852, 700)
    s += txt(722, 180, 'Son gönderimler', { s: 13.5, w: 700 }) + txt(722, 200, 'Ortalama yanıt süresi: 42 dk', { s: 11.3, w: 500, c: '#64748b' })
    s += table(722, 220, [
      { label: 'GÖNDEREN', w: 220 }, { label: 'KONU', w: 300 }, { label: 'TARİH', w: 150 }, { label: 'DURUM', w: 160 },
    ], [
      ['Zeynep Koral', 'E-ticaret sitesi teklifi', 'Bugün 11:24', { st: 'Yanıtlandı', tone: 'g' }],
      ['Mert Elgin', 'Kurumsal site yenileme', 'Bugün 09:58', { st: 'Yeni', tone: 'b' }],
      ['Aslı Dereci', 'SEO ön analizi', 'Dün 17:41', { st: 'Yanıtlandı', tone: 'g' }],
      ['Barış Uncu', 'CRM entegrasyonu', 'Dün 14:12', { st: 'İşlemde', tone: 'a' }],
      ['İpek Sancer', 'Özel yazılım danışmanlığı', '12 Eyl 16:20', { st: 'Yanıtlandı', tone: 'g' }],
      ['Selin Aksoy', 'Yönetim paneli demosu', '12 Eyl 10:05', { st: 'Yanıtlandı', tone: 'g' }],
      ['Kerem Balta', 'Abonelik sistemi', '11 Eyl 15:44', { st: 'Kapandı', tone: 'n' }],
      ['Derya Tuncel', 'Landing page tasarımı', '11 Eyl 09:31', { st: 'Yanıtlandı', tone: 'g' }],
      ['Onur Ercan', 'API entegrasyonu', '10 Eyl 13:47', { st: 'Kapandı', tone: 'n' }],
      ['Melis Acar', 'AI sohbet botu', '10 Eyl 08:52', { st: 'Yanıtlandı', tone: 'g' }],
    ], 46)
    return s
  },
  rezervasyon: (T) => {
    let s = appChrome(T.title) + head(42, 84, T.title, T.sub, '+ Randevu Slotu')
    const days = ['Pzt 14', 'Sal 15', 'Çar 16', 'Per 17', 'Cum 18', 'Cmt 19']
    const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
    const gx = 150, gy = 170, cw = 195, chh = 78
    s += card(42, 148, 1240, 700)
    days.forEach((d, i) => (s += txt(gx + i * cw + cw / 2, 186, d, { s: 12, w: 700, a: 'middle', c: i === 0 ? '#2563eb' : '#334155' })))
    hours.forEach((h, ri) => {
      s += txt(120, gy + ri * chh + 34, h, { s: 11, w: 550, c: '#94a3b8', a: 'end' })
      s += ln(gx, gy + ri * chh, gx + 6 * cw, gy + ri * chh, '#f1f5f9')
    })
    days.forEach((d, ci) => (s += ln(gx + ci * cw, gy, gx + ci * cw, gy + 8 * chh, '#f1f5f9')))
    const slots = [[0, 1, 'Z. Koral', '#2563eb'], [0, 4, 'M. Elgin', '#06b6d4'], [1, 2, 'A. Dereci', '#10b981'], [2, 0, 'B. Uncu', '#2563eb'], [2, 5, 'İ. Sancer', '#f59e0b'], [3, 3, 'S. Aksoy', '#06b6d4'], [4, 1, 'K. Balta', '#10b981'], [4, 6, 'D. Tuncel', '#2563eb'], [5, 2, 'O. Ercan', '#6366f1']]
    slots.forEach(([ci, ri, name, c]) => {
      s += rw(gx + ci * cw + 6, gy + ri * chh + 6, cw - 12, chh - 12, { rx: 8, f: c, op: 0.12 }) + rw(gx + ci * cw + 6, gy + ri * chh + 6, 3, chh - 12, { f: c })
      s += txt(gx + ci * cw + 16, gy + ri * chh + 30, name, { s: 11.8, w: 650, c: '#1e293b' }) + txt(gx + ci * cw + 16, gy + ri * chh + 48, `${hours[ri]} – ${hours[ri + 1] ?? '17:00'}`, { s: 10.5, w: 500, c: '#64748b' })
    })
    s += card(1300, 148, 258, 700)
    s += txt(1316, 180, 'Bugün', { s: 13, w: 700 }) + txt(1316, 200, '4 randevu · 1 bekleyen', { s: 11, w: 500, c: '#64748b' })
    ;[['09:00', 'Z. Koral', 'Ön analiz', 'g'], ['11:00', 'M. Elgin', 'Demo', 'b'], ['14:00', 'A. Dereci', 'Sprint görüşmesi', 'c'], ['16:00', 'B. Uncu', 'Teslim toplantısı', 'a']].forEach((r, i) => {
      const ry = 230 + i * 86
      s += rw(1316, ry, 226, 72, { rx: 10, f: '#f8fafc', st: '#eef2f7' })
      s += txt(1330, ry + 24, r[0], { s: 13, w: 800 }) + txt(1330, ry + 44, r[1], { s: 12, w: 600, c: '#334155' }) + txt(1330, ry + 61, r[2], { s: 10.6, w: 500, c: '#64748b' })
      s += stChip(1462, ry + 12, ['Onay', 'Demo', 'Görüşme', 'Beklemede'][i], r[3]).svg
    })
    s += ln(1316, 590, 1542, 590, '#eef2f7')
    s += txt(1316, 618, 'Doluluk', { s: 12, w: 700 }) + txt(1316, 646, '%72', { s: 24, w: 800 }) + txt(1316, 668, 'haftalık slot doluluğu', { s: 10.8, w: 500, c: '#64748b' })
    return s
  },
  teklif: (T) => {
    let s = rw(0, 0, W, H, { f: '#e8edf4' })
    s += rw(240, 40, 1120, 920, { rx: 4, f: '#ffffff' })
    s += rw(240, 40, 1120, 6, { f: '#0b1f4b' })
    s += rw(280, 86, 34, 34, { rx: 8, f: '#0b1f4b' }) + txt(326, 110, 'TARDİGRAD SOFTWARE', { s: 14, w: 800, ls: '0.06em' })
    s += txt(326, 128, 'İstanbul / Maltepe · info@tardigradsoftware.com', { s: 10.8, w: 500, c: '#64748b' })
    s += txt(1320, 100, 'TEKLİF', { s: 26, w: 800, c: '#0b1f4b', a: 'end' }) + txt(1320, 122, '#2026-0148 · Geçerlilik: 15 gün', { s: 11, w: 500, c: '#64748b', a: 'end' })
    s += ln(280, 152, 1320, 152, '#e6ebf2')
    s += txt(280, 184, 'MÜŞTERİ', { s: 10.4, w: 700, c: '#64748b', ls: '0.06em' })
    s += txt(280, 206, 'Demirtaş Lojistik A.Ş.', { s: 14, w: 700 }) + txt(280, 226, 'Satın Alma Müdürlüğü · teklif@demirtaslojistik.com', { s: 11.5, w: 500, c: '#64748b' })
    s += txt(900, 184, 'KONU', { s: 10.4, w: 700, c: '#64748b', ls: '0.06em' })
    s += txt(900, 206, T.title, { s: 14, w: 700 }) + txt(900, 226, T.sub, { s: 11.5, w: 500, c: '#64748b' })
    s += table(280, 258, [
      { label: 'HİZMET KALEMİ', w: 560 }, { label: 'MİKTAR', w: 140 }, { label: 'BİRİM', w: 140 }, { label: 'TUTAR', w: 200 },
    ], [
      ['Kurulum ve proje yönetimi', '1', 'paket', '₺48.000'],
      ['Arayüz geliştirme ve entegrasyon', '3', 'sprint', '₺96.000'],
      ['Test, yayın ve eğitim', '1', 'paket', '₺22.000'],
      ['Bakım ve destek (12 ay)', '12', 'ay', '₺54.000'],
    ], 44)
    s += rw(940, 470, 380, 130, { rx: 10, f: '#f8fafc', st: '#eef2f7' })
    s += txt(960, 500, 'Ara toplam', { s: 12, w: 550, c: '#475569' }) + txt(1300, 500, '₺220.000', { s: 12.5, w: 650, a: 'end' })
    s += txt(960, 528, 'KDV (%20)', { s: 12, w: 550, c: '#475569' }) + txt(1300, 528, '₺44.000', { s: 12.5, w: 650, a: 'end' })
    s += ln(960, 544, 1300, 544, '#e6ebf2')
    s += txt(960, 576, 'TOPLAM', { s: 13, w: 800 }) + txt(1300, 576, '₺264.000', { s: 16, w: 800, c: '#0b1f4b', a: 'end' })
    s += txt(280, 500, 'KAPSAM NOTLARI', { s: 10.4, w: 700, c: '#64748b', ls: '0.06em' })
    ;['Teslim: 3 sprint (6 hafta) · haftalık demo ve rapor', 'Yayın sonrası 30 gün garanti ve hata düzeltme', 'Ödeme: %40 başlangıç, %40 teslim, %20 yayın'].forEach((t, i) => {
      s += check(286, 522 + i * 24) + txt(302, 526 + i * 24, t, { s: 11.8, w: 500, c: '#334155' })
    })
    s += ln(280, 640, 1320, 640, '#e6ebf2')
    s += txt(280, 672, 'ONAY', { s: 10.4, w: 700, c: '#64748b', ls: '0.06em' })
    s += ln(280, 740, 560, 740, '#94a3b8') + txt(280, 760, 'Müşteri yetkilisi · ad soyad, kaşe', { s: 10.6, w: 500, c: '#94a3b8' })
    s += ln(760, 740, 1040, 740, '#94a3b8') + txt(760, 760, 'Tardigrad Software · M. Aksoy', { s: 10.6, w: 500, c: '#94a3b8' })
    const st = stChip(1120, 700, 'Onaylandı · 12 Eyl 2026', 'g')
    s += st.svg
    s += rw(280, 800, 1040, 120, { rx: 10, f: '#f1f5f9' })
    s += txt(300, 830, 'Sistem üzerinden oluşturuldu', { s: 11.5, w: 700, c: '#334155' })
    s += txt(300, 852, 'Bu teklif Tardigrad teklif modülüyle üretilmiş olup e-posta ile PDF olarak iletilmiştir.', { s: 11, w: 500, c: '#64748b' })
    s += txt(300, 872, 'Belge No: TKF-2026-0148 · Oluşturan: M. Aksoy · Sürüm 2', { s: 10.6, w: 500, c: '#94a3b8' })
    return s
  },
  istakip: (T) => {
    let s = appChrome(T.title) + head(42, 84, T.title, T.sub, '+ Görev')
    s += rw(42, 148, 250, 34, { rx: 8, f: '#ffffff', st: '#e2e8f0' }) + txt(54, 169, 'Sprint 14 · 6 gün kaldı', { s: 12.3, w: 600, c: '#334155' }) + `<path d="M272 163 l5 5 5-5" fill="none" stroke="#94a3b8" stroke-width="1.6" stroke-linecap="round"/>`
    s += txt(310, 169, 'Kapsam: 42 puan · Tamamlanan: 26 puan (%62)', { s: 12, w: 550, c: '#64748b' })
    const cols = [['Backlog', '#94a3b8'], ['Bu Sprint', '#2563eb'], ['Testte', '#f59e0b'], ['Tamamlandı', '#10b981']]
    const tasks = [
      ['Ödeme sağlayıcı webhook yeniden deneme kuyruğu', 'API', 5],
      ['Yönetim paneli rol matrisi ekranı', 'UI', 3],
      ['Stok eşik bildirimleri (e-posta + SMS)', 'Backend', 8],
      ['Teklif PDF şablonu v2', 'UI', 3],
      ['Arama: bulanık eşleşme iyileştirmesi', 'Backend', 5],
      ['Rezervasyon takvimi çakışma kuralı', 'Backend', 3],
      ['Blog liste sayfası sayfalama', 'UI', 2],
      ['CRM fırsat kaybı nedeni alanı', 'API', 2],
      ['Panel: dışa aktarma (CSV)', 'Backend', 3],
      ['Görsel optimizasyon boru hattı', 'Altyapı', 5],
      ['Chatbot niyet modeli eğitimi', 'AI', 8],
      ['Sipariş durumu zaman çizelgesi', 'UI', 3],
      ['KVKK saklama politikası cron işi', 'Backend', 2],
      ['Canlıya alma kontrol listesi', 'Altyapı', 1],
      ['E-posta şablonları (6 adet)', 'UI', 3],
      ['API hız limiti (Upstash) ayarı', 'Altyapı', 2],
    ]
    let ti = 0
    cols.forEach((c, ci) => {
      const cx = 42 + ci * 382
      s += circ(cx + 6, 210, 5, c[1]) + txt(cx + 18, 214, c[0], { s: 12.5, w: 700 })
      for (let k = 0; k < 4; k++) {
        const t = tasks[ti++]
        const cy = 230 + k * 152
        s += card(cx, cy, 362, 136)
        s += txt(cx + 16, cy + 30, t[0].slice(0, 44), { s: 12.6, w: 650 })
        if (t[0].length > 44) s += txt(cx + 16, cy + 48, t[0].slice(44), { s: 12.6, w: 650 })
        const tg = chip(cx + 16, cy + 66, t[1], { bg: '#f1f5f9', fg: '#475569', s: 10, pad: 8, h: 19 })
        s += tg.svg
        s += txt(cx + 16 + tg.w + 10, cy + 80, `${t[2]} puan`, { s: 10.6, w: 550, c: '#64748b' })
        s += circ(cx + 330, cy + 104, 12, ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b'][ti % 4]) + txt(cx + 330, cy + 108, ['MA', 'EK', 'TS', 'SD'][ti % 4], { s: 9, w: 700, c: '#fff', a: 'middle' })
        if (ci === 3) s += check(cx + 300, cy + 30)
      }
    })
    return s
  },
  abonelik: (T) => {
    let s = appChrome(T.title) + head(42, 84, T.title, T.sub, '+ Plan Oluştur')
    const plans = [['Başlangıç', '₺1.450', ['5 kullanıcı', '10 GB depolama', 'E-posta desteği', 'Temel raporlar'], 0], ['Pro', '₺4.900', ['25 kullanıcı', '100 GB depolama', 'Öncelikli destek', 'Gelişmiş raporlar', 'API erişimi'], 1], ['Kurumsal', '₺18.400', ['Sınırsız kullanıcı', '1 TB depolama', '7/24 destek', 'Özel entegrasyonlar', 'SLA %99,9'], 0]]
    plans.forEach((p, i) => {
      const cx = 42 + i * 512
      s += card(cx, 150, 492, 380)
      if (p[3]) s += rw(cx, 150, 492, 4, { rx: 2, f: '#2563eb' })
      s += txt(cx + 24, 190, p[0], { s: 15, w: 750 }) + txt(cx + 24, 232, p[1], { s: 28, w: 800, c: '#0b1f4b' }) + txt(cx + 24 + tw(p[1], 28, 800) + 8, 232, '/ ay', { s: 12, w: 500, c: '#64748b' })
      if (p[3]) { const c = chip(cx + 330, 172, 'En çok tercih edilen', { bg: '#2563eb', fg: '#fff', s: 10.2 }); s += c.svg }
      p[2].forEach((f, fi) => { s += check(cx + 30, 272 + fi * 34) + txt(cx + 46, 276 + fi * 34, f, { s: 12.3, w: 550, c: '#334155' }) })
      s += (i === 1 ? btn(cx + 24, 470, 444, 'Planı Seç') : ghost(cx + 24, 470, 444, 'Planı Seç'))
    })
    s += card(42, 552, 1516, 400)
    s += txt(58, 584, 'Fatura geçmişi', { s: 13.5, w: 700 }) + txt(58, 604, 'Otomatik tahsilat · başarı oranı %99,2', { s: 11.3, w: 500, c: '#64748b' })
    s += table(58, 624, [
      { label: 'FATURA', w: 200 }, { label: 'MÜŞTERİ', w: 360 }, { label: 'PLAN', w: 200 }, { label: 'DÖNEM', w: 220 }, { label: 'TUTAR', w: 180 }, { label: 'DURUM', w: 180 },
    ], [
      ['#F-2026-0912', 'Demirtaş Lojistik A.Ş.', 'Kurumsal', 'Eylül 2026', '₺18.400', { st: 'Ödendi', tone: 'g' }],
      ['#F-2026-0911', 'Kuzey Gıda San.', 'Pro', 'Eylül 2026', '₺4.900', { st: 'Ödendi', tone: 'g' }],
      ['#F-2026-0910', 'Vera Tekstil', 'Başlangıç', 'Eylül 2026', '₺1.450', { st: 'Beklemede', tone: 'a' }],
      ['#F-2026-0909', 'Arda Yapı İnşaat', 'Pro', 'Eylül 2026', '₺4.900', { st: 'Ödendi', tone: 'g' }],
      ['#F-2026-0908', 'Lida Kozmetik', 'Başlangıç', 'Ağustos 2026', '₺1.450', { st: 'Başarısız', tone: 'r' }],
      ['#F-2026-0907', 'Nortel Medya', 'Pro', 'Ağustos 2026', '₺4.900', { st: 'Ödendi', tone: 'g' }],
      ['#F-2026-0906', 'Ege Seramik', 'Kurumsal', 'Ağustos 2026', '₺18.400', { st: 'Ödendi', tone: 'g' }],
    ], 42)
    return s
  },
  seo: (T) => {
    let s = appChrome(T.title) + head(42, 84, T.title, T.sub, 'Denetim Başlat')
    s += card(42, 148, 460, 240)
    s += `<circle cx="150" cy="268" r="62" fill="none" stroke="#e6ebf2" stroke-width="12"/><circle cx="150" cy="268" r="62" fill="none" stroke="#10b981" stroke-width="12" stroke-linecap="round" stroke-dasharray="334 389" transform="rotate(-90 150 268)"/>` + txt(150, 280, '86', { s: 30, w: 800, a: 'middle' })
    s += txt(250, 210, 'Sağlık puanı: İyi', { s: 15, w: 750 }) + txt(250, 232, '207 sayfa tarandı · 3 uyarı', { s: 11.8, w: 500, c: '#64748b' })
    ;[['LCP', '1,8 sn'], ['CLS', '0,02'], ['INP', '140 ms']].forEach((v, i) => {
      const vx = 250 + i * 84
      s += rw(vx, 254, 76, 46, { rx: 8, f: '#f8fafc', st: '#eef2f7' }) + txt(vx + 8, 272, v[0], { s: 9.6, w: 700, c: '#64748b' }) + txt(vx + 8, 290, v[1], { s: 12.5, w: 750 })
    })
    s += txt(250, 340, 'Son denetim: 28 Ağu 2026 04:12', { s: 10.8, w: 500, c: '#94a3b8' })
    ;[['TIKLAMA (90G)', '12,4B', '▲ %18,6'], ['GÖSTERİM', '486B', '▲ %9,3'], ['ORT. KONUM', '4,2', '▲ 1,1']].forEach((k, i) => (s += kpi(520 + i * 350, 148, 338, k[0], k[1], k[2], '#059669', 'önceki döneme göre')))
    s += card(42, 408, 940, 540)
    s += txt(58, 440, 'Tıklama eğilimi — 90 gün', { s: 13, w: 700 }) + txt(58, 458, 'Organik arama · Search Console', { s: 11, w: 500, c: '#64748b' })
    s += area(58, 486, 890, 380, [120, 126, 134, 128, 146, 140, 158, 152, 170, 166, 186, 182, 200, 208, 222], '#2563eb', 'g2', ['01 Haz', '30 Haz', '29 Tem', '27 Ağu'])
    s += card(1000, 408, 558, 540)
    s += txt(1016, 440, 'Anahtar kelimeler', { s: 13, w: 700 }) + txt(1016, 458, 'Hacim · konum · değişim', { s: 11, w: 500, c: '#64748b' })
    s += table(1016, 478, [
      { label: 'KELİME', w: 280 }, { label: 'HACİM', w: 90 }, { label: 'KONUM', w: 80 }, { label: 'Δ', w: 60 },
    ], [
      ['web yazılım firması istanbul', '1.900', '2', { d: '▲3' }],
      ['e-ticaret sitesi kurma', '2.400', '4', { d: '▲1' }],
      ['kurumsal web tasarımı', '1.300', '3', { d: '▼1', c: '#dc2626' }],
      ['özel yazılım geliştirme', '880', '5', { d: '▲2' }],
      ['seo danışmanlığı fiyat', '720', '7', { d: '▲4' }],
      ['saas ürün geliştirme', '590', '6', { d: '▲2' }],
      ['mobil uygulama ajansı', '480', '8', { d: '▲1' }],
      ['crm yazılımı önerisi', '390', '9', { d: '▲2' }],
      ['bulut yedekleme çözümü', '320', '6', { d: '▲3' }],
    ], 44)
    return s
  },
  entegrasyon: (T) => {
    let s = appChrome(T.title) + head(42, 84, T.title, T.sub, '+ Entegrasyon')
    const rows = [
      ['Ödeme Sağlayıcı', 'iyzico · 3D Secure', 'Bağlı', 'g', 'son senkron 14:02'],
      ['Kargo & Takip', 'Yurtiçi Kargo API', 'Bağlı', 'g', 'son senkron 13:58'],
      ['WhatsApp Business', 'Cloud API · v18', 'Bağlı', 'g', 'son senkron 14:00'],
      ['E-Fatura', 'GİB bağlantısı', 'Bağlı', 'g', 'son senkron 12:40'],
      ['SMS Gateway', 'Netgsm', 'Beklemede', 'a', 'yeniden deneme 14:15'],
      ['E-posta / SMTP', 'Resend · 2 alan adı', 'Bağlı', 'g', 'son senkron 14:01'],
      ['Muhasebe', 'Logo aktarımı', 'Bağlı', 'g', 'son senkron 09:30'],
    ]
    rows.forEach((r, i) => {
      const ry = 152 + i * 74
      s += card(42, ry, 1000, 64)
      s += rw(58, ry + 14, 36, 36, { rx: 9, f: '#eef4ff' }) + circ(76, ry + 32, 7, '#2563eb', { op: 0.5 })
      s += txt(108, ry + 30, r[0], { s: 13, w: 700 }) + txt(108, ry + 48, r[1], { s: 11, w: 500, c: '#64748b' })
      s += stChip(700, ry + 22, r[2], r[3]).svg
      s += txt(1026, ry + 40, r[4], { s: 11, w: 500, c: '#94a3b8', a: 'end' })
    })
    s += card(1062, 152, 496, 592)
    s += txt(1078, 184, 'Senkron logları', { s: 13, w: 700 }) + txt(1078, 204, 'Canlı akış · son 1 saat', { s: 11, w: 500, c: '#64748b' })
    ;[
      ['14:02:11', 'Ödeme yakalandı · #KP-88216', 'g'],
      ['14:01:47', 'Kargo etiketi oluşturuldu', 'g'],
      ['14:00:03', 'WhatsApp oturumu yenilendi', 'g'],
      ['13:58:29', 'Stok senkronu · 214 SKU', 'g'],
      ['13:47:55', 'SMS sağlayıcı: zaman aşımı', 'a'],
      ['13:44:12', 'E-fatura zarfı kabul edildi', 'g'],
      ['13:39:40', 'Webhook yeniden deneme OK', 'g'],
      ['13:31:08', 'SMTP kota: %42 kullanımda', 'c'],
      ['13:22:51', 'Muhasebe fiş aktarımı · 18', 'g'],
      ['13:15:26', 'Ödeme iadesi işlendi', 'b'],
    ].forEach((l, i) => {
      const ly = 232 + i * 48
      s += circ(1084, ly, 4, ST[l[2]][1]) + txt(1100, ly + 4, l[0], { s: 11, w: 600, c: '#94a3b8' }) + txt(1170, ly + 4, l[1], { s: 11.8, w: 550, c: '#334155' })
      if (i < 9) s += ln(1078, ly + 24, 1542, ly + 24, '#f1f5f9')
    })
    s += card(42, 690, 1000, 258)
    s += txt(58, 722, 'Webhook teslimatları — 24 saat', { s: 13, w: 700 })
    s += area(58, 748, 940, 160, [40, 42, 41, 45, 44, 48, 47, 52, 50, 55, 54, 58], '#10b981', 'g3', ['00:00', '06:00', '12:00', '18:00'])
    return s
  },
  chatbot: (T) => {
    let s = appChrome(T.title) + head(42, 84, T.title, T.sub, 'Eğitim Verisi Ekle')
    s += rw(0, 0, 0, 0, {})
    s += card(300, 150, 1000, 760)
    s += rw(300, 150, 1000, 64, { rx: 12, f: '#0b1f4b' }) + rw(300, 198, 1000, 16, { f: '#0b1f4b' })
    s += circ(336, 182, 16, '#22d3ee') + circ(331, 178, 2.4, '#0b1f4b') + circ(341, 178, 2.4, '#0b1f4b') + `<path d="M330 186 q6 5 12 0" stroke="#0b1f4b" stroke-width="1.8" fill="none" stroke-linecap="round"/>`
    s += txt(364, 178, 'Satış Asistanı', { s: 14, w: 700, c: '#ffffff' }) + txt(364, 196, 'Ortalama yanıt: 1,2 sn · çevrimiçi', { s: 10.8, w: 500, c: '#9fb3d9' })
    const c1 = chip(1150, 170, '7/24 aktif', { bg: '#10b981', fg: '#fff', s: 10.2 }); s += c1.svg
    const bubbles = [
      ['b', 'Merhaba! Ben Tardigrad satış asistanıyım. Size nasıl yardımcı olabilirim?'],
      ['u', 'E-ticaret sitesi için teklif almak istiyorum.'],
      ['b', 'Elbette. Yaklaşık ürün sayınız ve hedef yayın tarihiniz nedir? Size en uygun paketi hemen çıkarayım.'],
      ['u', '250 ürünümüz var, ekim sonu yayında olmasını istiyoruz.'],
      ['b', 'Harika. 250 ürün ve ekim takvimi için Pro paketini öneriyorum: kurulum 2 sprint, ödeme ve kargo entegrasyonları dahil. Ön çalışmayı e-postanıza göndermemi ister misiniz?'],
      ['u', 'Evet, lütfen gönderin.'],
      ['b', 'Gönderildi. Dilerseniz sizi 20 dakikalık ücretsiz ön analiz görüşmesine de planlayabilirim.'],
    ]
    let by = 240
    bubbles.forEach(([who, t]) => {
      const maxw = 620
      const words = t.split(' ')
      const linesArr = []
      let cur = ''
      for (const wd of words) {
        if (cur && tw(cur + ' ' + wd, 12.6, 500) > maxw) { linesArr.push(cur); cur = wd } else cur = cur ? cur + ' ' + wd : wd
      }
      if (cur) linesArr.push(cur)
      const bw = Math.min(maxw, Math.max(...linesArr.map((l) => tw(l, 12.6, 500)))) + 28
      const bh = linesArr.length * 19 + 20
      const bx = who === 'b' ? 336 : 1264 - bw
      s += rw(bx, by, bw, bh, { rx: 12, f: who === 'b' ? '#f1f5f9' : '#2563eb' })
      linesArr.forEach((l, i) => {
        s += txt(bx + 14, by + 24 + i * 19, l, { s: 12.6, w: 500, c: who === 'b' ? '#1e293b' : '#ffffff' })
      })
      by += bh + 14
    })
    ;['Teklif isteyin', 'Demo planlayın', 'Fiyatlandırma'].forEach((t, i) => {
      const c = chip(336 + i * 150, by + 4, t, { bg: '#eef4ff', fg: '#2563eb', s: 11 }); s += c.svg
    })
    s += rw(336, 830, 928, 48, { rx: 99, f: '#f8fafc', st: '#e2e8f0' }) + txt(360, 859, 'Mesajınızı yazın…', { s: 12.3, w: 450, c: '#94a3b8' })
    s += circ(1232, 854, 18, '#2563eb') + `<path d="M1226 854 l12 -5 -4 5 4 5 z" fill="#fff"/>`
    s += card(42, 150, 236, 760)
    s += txt(58, 184, 'Asistan metrikleri', { s: 12.5, w: 700 })
    ;[['Günlük konuşma', '214'], ['Çözüm oranı', '%86'], ['Ort. yanıt', '1,2 sn'], ['İnsana aktarım', '14']].forEach((r, i) => {
      const ry = 210 + i * 74
      s += txt(58, ry + 14, r[0], { s: 11, w: 600, c: '#64748b' }) + txt(58, ry + 42, r[1], { s: 19, w: 800 })
    })
    s += ln(58, 524, 262, 524, '#eef2f7')
    s += txt(58, 620, 'En sorulan konular', { s: 12, w: 700 })
    ;[['Fiyat', 82], ['Kurulum süresi', 64], ['Entegrasyon', 51], ['Destek', 38]].forEach((r, i) => {
      const ry = 640 + i * 46
      s += txt(58, ry + 12, r[0], { s: 11.6, w: 550 }) + rw(150, ry + 4, 112, 9, { rx: 4, f: '#eef2f7' }) + rw(150, ry + 4, 112 * r[1] / 100, 9, { rx: 4, f: '#06b6d4' })
    })
    return s
  },
  durum: (T) => {
    let s = appChrome(T.title) + head(42, 84, T.title, T.sub, 'Bakım Planla')
    s += rw(42, 148, 1516, 64, { rx: 12, f: '#ecfdf5', st: '#a7f3d0' })
    s += check(74, 180) + txt(94, 186, 'Tüm sistemler çalışıyor · son 90 gün kesinti: 12 dk', { s: 13.5, w: 700, c: '#065f46' })
    const c = chip(1380, 166, 'Canlı izleme', { bg: '#10b981', fg: '#fff', s: 10.5 }); s += c.svg
    const services = [
      ['API Uygulaması', 'api.tardigradsoftware.com', 99.99, 'g'],
      ['Web Siteleri (Vercel)', '38 üretim dağıtımı', 99.98, 'g'],
      ['CDN & WAF (Cloudflare)', 'edge önbellek isabeti %94', 100, 'g'],
      ['Veritabanı (Supabase)', 'birincil + okuma replikası', 99.97, 'g'],
      ['E-posta (Resend)', 'teslim oranı %99,4', 99.9, 'g'],
      ['Yedekleme', 'günlük şifreli_snapshot', 100, 'g'],
      ['Kuyruk & Cron (Upstash)', 'gecikme 84 ms', 99.6, 'a'],
    ]
    services.forEach((r, i) => {
      const ry = 232 + i * 88
      s += card(42, ry, 1516, 78)
      s += txt(62, ry + 32, r[0], { s: 13.5, w: 700 }) + txt(62, ry + 52, r[1], { s: 11, w: 500, c: '#64748b' })
      for (let b = 0; b < 45; b++) {
        const bad = r[3] === 'a' && (b === 31 || b === 32)
        s += rw(560 + b * 17, ry + 26, 12, 26, { rx: 2, f: bad ? '#f59e0b' : '#10b981', op: bad ? 0.9 : 0.75 })
      }
      s += txt(1360, ry + 44, `%${r[2].toLocaleString('tr-TR')}`, { s: 13, w: 700, c: '#334155', a: 'end' })
      s += stChip(1392, ry + 28, r[3] === 'g' ? 'Çalışıyor' : 'İzlemede', r[3]).svg
    })
    s += card(42, 856, 1516, 100)
    s += txt(62, 890, 'Planlı bakım', { s: 12.5, w: 700 }) + txt(62, 914, '21 Eyl 2026 03:00–04:00 · veritabanı sürüm yükseltmesi (kesintisiz, replika üzerinden)', { s: 11.8, w: 500, c: '#64748b' })
    const cc = chip(1392, 880, 'Bildirim gönderildi', { bg: '#f1f5f9', fg: '#475569', s: 10.5 }); s += cc.svg
    return s
  },
  otomasyon: (T) => {
    let s = appChrome(T.title) + head(42, 84, T.title, T.sub, '+ Akış Oluştur')
    s += rw(42, 148, 1080, 800, { rx: 12, f: '#fbfdff', st: '#e6ebf2' })
    for (let gx = 62; gx < 1110; gx += 26) for (let gy = 168; gy < 940; gy += 26) s += circ(gx, gy, 1, '#dbe4ee')
    const node = (x, y, w, title, sub, color) =>
      rw(x, y, w, 74, { rx: 10, f: '#ffffff', st: color, sw: 1.6 }) + rw(x, y, 5, 74, { rx: 2.5, f: color }) +
      txt(x + 18, y + 30, title, { s: 12.8, w: 700 }) + txt(x + 18, y + 50, sub, { s: 10.8, w: 500, c: '#64748b' })
    const arrow = (x1, y1, x2, y2) => {
      const mx = (x1 + x2) / 2
      return `<path d="M${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}" fill="none" stroke="#94a3b8" stroke-width="1.8"/>` + `<path d="M${x2 - 7} ${y2 - 4} l7 4 -7 4" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-linecap="round"/>`
    }
    s += node(90, 210, 300, 'Tetikleyici: Yeni Sipariş', 'webhook · siparis.olusturuldu', '#2563eb')
    s += node(90, 380, 300, 'Tetikleyici: Form Gönderimi', 'form.teklif · v3 şema', '#2563eb')
    s += node(470, 295, 300, 'Koşul: Tutar > ₺5.000', 'evet / hayır dallanması', '#f59e0b')
    s += node(850, 190, 240, 'Eylem: E-posta Gönder', 'Resend şablonu: VIP', '#10b981')
    s += node(850, 330, 240, 'Eylem: WhatsApp Bildirimi', 'Cloud API · satış grubu', '#10b981')
    s += node(850, 470, 240, 'Eylem: Stok Düş', 'depo.servisi · atomik', '#06b6d4')
    s += node(470, 560, 300, 'Eylem: Görev Oluştur', 'is-takip · öncelik: yüksek', '#6366f1')
    s += node(850, 640, 240, 'Eylem: Raporla', 'pano.metrik · günlük', '#64748b')
    s += arrow(390, 247, 470, 320) + arrow(390, 417, 470, 345) + arrow(770, 315, 850, 227) + arrow(770, 332, 850, 367) + arrow(770, 349, 850, 507)
    s += arrow(620, 634, 620, 560 + 74) + arrow(770, 597, 850, 677)
    s += txt(430, 280, 'evet', { s: 10.5, w: 650, c: '#059669' }) + txt(430, 392, 'hayır', { s: 10.5, w: 650, c: '#b45309' })
    s += card(1140, 148, 418, 800)
    s += txt(1156, 180, 'Çalıştırma geçmişi', { s: 13, w: 700 }) + txt(1156, 200, 'Son 24 saat · 1.284 çalıştırma', { s: 11, w: 500, c: '#64748b' })
    ;[
      ['14:02', 'Sipariş #KP-88216 · 4 düğüm', 'Başarılı', 'g'],
      ['13:58', 'Form #F-2211 · 3 düğüm', 'Başarılı', 'g'],
      ['13:47', 'Sipariş #KP-88215 · koşul hayır', 'Başarılı', 'g'],
      ['13:31', 'Stok senkronu · yeniden deneme', 'İzlemede', 'a'],
      ['13:12', 'Sipariş #KP-88214 · 5 düğüm', 'Başarılı', 'g'],
      ['12:58', 'Form #F-2210 · 3 düğüm', 'Başarılı', 'g'],
      ['12:40', 'Sipariş #KP-88213 · 4 düğüm', 'Başarılı', 'g'],
      ['12:22', 'Günlük rapor · 1 düğüm', 'Başarılı', 'g'],
      ['11:57', 'Sipariş #KP-88212 · hata: API 429', 'Hata', 'r'],
      ['11:41', 'Otomatik yeniden deneme OK', 'Başarılı', 'g'],
    ].forEach((l, i) => {
      const ly = 228 + i * 62
      s += txt(1156, ly + 12, l[0], { s: 11.5, w: 650, c: '#94a3b8' }) + txt(1210, ly + 12, l[1], { s: 11.8, w: 550, c: '#334155' })
      s += stChip(1210, ly + 22, l[2], l[3]).svg
      if (i < 9) s += ln(1156, ly + 52, 1542, ly + 52, '#f1f5f9')
    })
    s += ln(1156, 866, 1542, 866, '#eef2f7')
    s += txt(1156, 894, 'Başarı oranı', { s: 11.5, w: 600, c: '#64748b' }) + txt(1156, 922, '%99,4', { s: 22, w: 800 }) + txt(1250, 922, '· ort. süre 340 ms', { s: 11.5, w: 500, c: '#64748b' })
    return s
  },
}

/* ---------- hizmet listesi ---------- */
const src = fs.readFileSync('src/lib/services.ts', 'utf8')
const titles = {}
for (const m of src.matchAll(/slug:\s*'([^']+)'[\s\S]{0,400}?title:\s*'([^']+)'/g)) titles[m[1]] = m[2]
const MAP = {
  web: ['kurumsal-web-sitesi', 'firma-web-sitesi', 'landing-page', 'portfoy-sitesi', 'web-sitesi-yenileme'],
  eticaret: ['e-ticaret-sitesi', 'urun-tanitim-sitesi'],
  crm: ['crm', 'musteri-yonetim-sistemi'],
  panel: ['yonetim-paneli', 'musteri-paneli', 'personel-kullanici-yonetimi', 'multi-tenant-uygulama'],
  dashboard: ['dashboard-sistemi', 'raporlama-sistemi'],
  stok: ['stok-yonetimi', 'urun-tedarikci-yonetimi'],
  form: ['form-basvuru-sistemi'],
  rezervasyon: ['rezervasyon-basvuru-sistemi'],
  teklif: ['teklif-hazirlama-sistemi', 'proforma-siparis-yonetimi'],
  istakip: ['is-takip-sistemi', 'mvp-startup-urunu'],
  abonelik: ['abonelik-tabanli-yazilim', 'saas-platformu'],
  seo: ['teknik-seo', 'lokal-seo', 'seo-uyumlu-sayfa-mimarisi', 'schema-org-structured-data', 'google-search-console-kurulumu', 'seo-danismanligi'],
  entegrasyon: ['api-entegrasyonu', 'odeme-whatsapp-crm-entegrasyonu', 'kurumsal-email'],
  chatbot: ['ai-chatbot', 'ai-icerik-araclar'],
  durum: ['domain-dns-yonetimi', 'hosting-yedekleme', 'cloudflare-cdn', 'vercel-deployment', 'supabase-postgresql'],
  otomasyon: ['dijital-otomasyon', 'dijital-donusum'],
}
const SUB = {
  web: 'Yayındaki örnek proje arayüzü · üretim ekranı',
  eticaret: 'Mağaza ön yüzü · canlı katalog görünümü',
  crm: 'Satış hunisi ve fırsat yönetimi ekranı',
  panel: 'Kullanıcı, rol ve yetki yönetimi ekranı',
  dashboard: 'Yönetim özeti ve raporlama ekranı',
  stok: 'Depo, stok ve tedarik takip ekranı',
  form: 'Form kurucu ve gönderim yönetimi ekranı',
  rezervasyon: 'Randevu takvimi ve slot yönetimi ekranı',
  teklif: 'Teklif belgesi üretim ekranı',
  istakip: 'Sprint ve görev takip panosu',
  abonelik: 'Plan, abonelik ve fatura yönetimi ekranı',
  seo: 'SEO denetim ve raporlama ekranı',
  entegrasyon: 'Entegrasyon ve senkronizasyon yönetim ekranı',
  chatbot: 'AI asistan konuşma ve eğitim ekranı',
  durum: 'Altyapı durum ve izleme ekranı',
  otomasyon: 'İş akışı otomasyon tasarım ekranı',
}
fs.mkdirSync('public/images/screens', { recursive: true })
const fontFiles = []
for (const w of [400, 500, 600, 700, 800]) {
  const out = `/tmp/inter-${w}.ttf`
  if (!fs.existsSync(out)) fs.writeFileSync(out, Buffer.from(await decompress(fs.readFileSync(`node_modules/@fontsource/inter/files/inter-latin-${w}-normal.woff2`))))
  fontFiles.push(out)
}
let count = 0
for (const [t, slugs] of Object.entries(MAP)) {
  for (const slug of slugs) {
    const title = titles[slug] ?? slug
    const body = TPL[t]({ title, sub: SUB[t] })
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>${grad('g1', '#2563eb')}${grad('g2', '#2563eb')}${grad('g3', '#10b981')}</defs>${body}</svg>`
    const png = new Resvg(svg, { font: { fontFiles, loadSystemFonts: false, defaultFamily: 'Inter' }, fitTo: { mode: 'width', value: W } }).render().asPng()
    await sharp(Buffer.from(png)).jpeg({ quality: 86, mozjpeg: true }).toFile(`public/images/screens/${slug}.jpg`)
    count++
  }
}
console.log('render edilen hizmet ekranı:', count)
