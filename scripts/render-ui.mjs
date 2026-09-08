// scripts/render-ui.mjs
// Türkçe proje arayüzlerinin (proje resimleri) vektörel üretimini gerçek Inter
// fontuyla rasterleştirir: SVG -> PNG (resvg) -> JPG (sharp).
import fs from 'node:fs'
import { decompress } from 'wawoff2'
import { Resvg } from '@resvg/resvg-js'
import sharp from 'sharp'

const W = 1600
const H = 1000
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const FC = { 400: 0.55, 500: 0.56, 600: 0.58, 700: 0.6, 800: 0.62 }
const tw = (s, size, w = 500) => String(s).length * size * (FC[w] ?? 0.56)

function txt(x, y, s, o = {}) {
  return `<text x="${x}" y="${y}" font-family="Inter" font-size="${o.s ?? 13}" font-weight="${o.w ?? 500}" fill="${o.c ?? '#0f172a'}"${o.a ? ` text-anchor="${o.a}"` : ''}${o.ls ? ` letter-spacing="${o.ls}"` : ''}${o.op != null ? ` opacity="${o.op}"` : ''}>${esc(s)}</text>`
}
function rw(x, y, w, h, o = {}) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 0}" fill="${o.f ?? 'none'}"${o.st ? ` stroke="${o.st}" stroke-width="${o.sw ?? 1}"` : ''}${o.op != null ? ` opacity="${o.op}"` : ''}/>`
}
function ln(x1, y1, x2, y2, c, wdt = 1, dash) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${wdt}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
}
function chip(x, y, label, { bg, fg, s = 10.8, w = 700, pad = 9 } = {}) {
  const cw = tw(label, s, w) + pad * 2
  return { svg: rw(x, y, cw, 20, { rx: 99, f: bg }) + txt(x + cw / 2, y + 14, label, { s, w, c: fg, a: 'middle' }), w: cw }
}
function stChip(x, y, label, tone, dark) {
  const map = {
    g: ['#10b981', dark ? '#34d399' : '#059669'],
    b: ['#2563eb', dark ? '#60a5fa' : '#2563eb'],
    c: ['#06b6d4', dark ? '#22d3ee' : '#0891b2'],
    a: ['#f59e0b', dark ? '#fbbf24' : '#b45309'],
    r: ['#ef4444', dark ? '#f87171' : '#dc2626'],
  }
  const [base, fg] = map[tone]
  const cw = tw(label, 10.8, 700) + 18
  return { svg: rw(x, y, cw, 21, { rx: 99, f: base, op: 0.14 }) + txt(x + 9, y + 14.5, label, { s: 10.8, w: 700, c: fg }), w: cw }
}
function card(x, y, w, h, dark) {
  return rw(x, y, w, h, { rx: 12, f: dark ? '#0c1730' : '#ffffff', st: dark ? '#16213c' : '#e6ebf2' })
}
function kpi(x, y, w, lb, vl, dl, dlC, small, dark) {
  return (
    card(x, y, w, 96, dark) +
    txt(x + 15, y + 26, lb, { s: 11, w: 600, c: dark ? '#7c8db0' : '#64748b', ls: '0.06em' }) +
    txt(x + 15, y + 56, vl, { s: 21, w: 800, c: dark ? '#e2e8f0' : '#0f172a' }) +
    txt(x + 15, y + 78, dl, { s: 11, w: 650, c: dlC }) +
    txt(x + 15 + tw(dl, 11, 650) + 7, y + 78, small, { s: 11, w: 500, c: '#64748b' })
  )
}
function areaChart(x, y, w, h, pts, { stroke, gid, dark, labels }) {
  const max = Math.max(...pts)
  const min = Math.min(...pts)
  const px = (i) => x + (i / (pts.length - 1)) * w
  const py = (v) => y + h - ((v - min) / (max - min)) * (h - 14) - 7
  let d = pts.map((v, i) => `${i ? 'L' : 'M'}${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join(' ')
  const grid = [0.2, 0.45, 0.7, 0.95].map((t) => ln(x, y + h * t, x + w, y + h * t, dark ? '#16213c' : '#eef2f7')).join('')
  const fill = `<path d="${d} L${x + w} ${y + h} L${x} ${y + h} Z" fill="url(#${gid})"/>`
  const line = `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="2.4" stroke-linecap="round"/>`
  const dot = `<circle cx="${px(pts.length - 1)}" cy="${py(pts[pts.length - 1])}" r="4.5" fill="${stroke}"/><circle cx="${px(pts.length - 1)}" cy="${py(pts[pts.length - 1])}" r="9" fill="${stroke}" opacity=".22"/>`
  const lb = labels.map((t, i) => txt(x + (i / (labels.length - 1)) * w, y + h + 20, t, { s: 10.5, w: 500, c: dark ? '#5b6c8f' : '#94a3b8', a: i === 0 ? 'start' : i === labels.length - 1 ? 'end' : 'middle' })).join('')
  return grid + fill + line + dot + lb
}
function table(x, y, cols, rows, { dark, rowH = 38 } = {}) {
  let svg = ''
  let cx = x
  cols.forEach((c) => {
    svg += txt(cx, y + 14, c.label, { s: 10.6, w: 700, c: '#64748b', ls: '0.06em' })
    cx += c.w
  })
  svg += ln(x, y + 24, x + cols.reduce((a, c) => a + c.w, 0), y + 24, dark ? '#16213c' : '#eef2f7')
  rows.forEach((r, ri) => {
    const ry = y + 24 + ri * rowH
    let rx = x
    r.forEach((cell, ci) => {
      if (cell && cell.st) {
        const s = stChip(rx, ry + 8, cell.st, cell.tone, dark)
        svg += s.svg
      } else if (cell && cell.up != null) {
        svg += txt(rx, ry + 24, cell.up, { s: 12, w: 650, c: cell.c ?? '#059669' })
      } else {
        svg += txt(rx, ry + 24, cell, { s: 12.4, w: ci === 0 ? 550 : 520, c: ci === 0 ? '#64748b' : dark ? '#cbd5e1' : '#1e293b' })
      }
      rx += cols[ci].w
    })
    if (ri < rows.length - 1) svg += ln(x, ry + rowH, x + cols.reduce((a, c) => a + c.w, 0), ry + rowH, dark ? '#101c36' : '#f1f5f9')
  })
  return svg
}
const grad = (id, c) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".30"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient>`
const logoMark = (x, y, bg, fg) => rw(x, y, 26, 26, { rx: 7, f: bg }) + `<path d="M${x + 6} ${y + 17} L${x + 11} ${y + 11} L${x + 15} ${y + 15} L${x + 20} ${y + 8}" stroke="${fg}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`

/* ================= 1) BulutPanel — SaaS yönetim paneli (koyu) ================= */
function panelSVG() {
  const D = true
  let s = rw(0, 0, W, H, { f: '#060d1f' })
  s += rw(0, 0, 232, H, { f: '#0a1226' }) + ln(232, 0, 232, H, '#16213c')
  s += logoMark(18, 16, '#2563eb', '#ffffff') + txt(53, 34, 'BulutPanel', { s: 14.5, w: 800, c: '#e2e8f0' })
  const menu = ['Genel Bakış', 'Abonelikler', 'Müşteriler', 'Faturalar', 'Raporlar', 'Entegrasyonlar', 'Ayarlar']
  menu.forEach((m, i) => {
    const y = 78 + i * 34
    if (i === 0) s += rw(10, y - 16, 212, 30, { rx: 8, f: '#12203e' }) + rw(10, y - 16, 2.5, 30, { f: '#06b6d4' })
    s += `<circle cx="26" cy="${y - 1}" r="3" fill="${i === 0 ? '#22d3ee' : '#3d4f75'}"/>` + txt(40, y + 3, m, { s: 12.8, w: i === 0 ? 650 : 550, c: i === 0 ? '#e2e8f0' : '#8ba0c4' })
  })
  s += rw(12, H - 66, 208, 50, { rx: 10, f: '#12203e' }) + `<circle cx="37" cy="${H - 41}" r="15" fill="#0ea5e9"/>` + txt(37, H - 37, 'MA', { s: 11, w: 700, c: '#fff', a: 'middle' })
  s += txt(60, H - 45, 'Meriç Aksoy', { s: 12, w: 650, c: '#e2e8f0' }) + txt(60, H - 30, 'Yönetici · meric@bulutpanel.app', { s: 10.2, w: 500, c: '#64748b' })
  // topbar
  s += rw(232, 0, W - 232, 58, { f: '#0a1226' }) + ln(232, 58, W, 58, '#16213c')
  s += txt(254, 35, 'Genel Bakış', { s: 17, w: 750, c: '#e2e8f0' })
  s += rw(W - 660, 12, 380, 34, { rx: 9, f: '#12203e', st: '#1c2b4d' }) + txt(W - 640, 33, 'Abonelik, fatura veya müşteri ara…', { s: 12.3, w: 500, c: '#64748b' })
  s += rw(W - 262, 12, 34, 34, { rx: 9, f: '#12203e', st: '#1c2b4d' }) + `<circle cx="${W - 245}" cy="27" r="6" fill="none" stroke="#94a3b8" stroke-width="1.8"/><path d="M${W - 245} 20 v-3 M${W - 245} 34 v1" stroke="#94a3b8" stroke-width="1.8" stroke-linecap="round"/>`
  s += rw(W - 216, 12, 162, 34, { rx: 9, f: '#2563eb' }) + txt(W - 135, 33, '+ Yeni Abonelik', { s: 12.5, w: 650, c: '#fff', a: 'middle' })
  // kpis
  const kw = (W - 232 - 44 - 36) / 4
  ;[
    ['AYLIK GELİR', '₺486.200', '▲ %12,4', '#34d399', 'geçen aya göre'],
    ['AKTİF ABONELİK', '1.284', '▲ %3,1', '#34d399', 'son 30 gün'],
    ['AYLIK CHURN', '%2,0', '▼ 0,4 p', '#34d399', 'iyileşme'],
    ['ORT. OTURUM', '14dk 32sn', '—', '#7c8db0', 'değişim yok'],
  ].forEach((k, i) => (s += kpi(254 + i * (kw + 12), 82, kw, k[0], k[1], k[2], k[3], k[4], D)))
  // chart row
  s += card(254, 194, 860, 300, D)
  s += txt(270, 222, 'Gelir — son 12 ay', { s: 12.8, w: 700, c: '#e2e8f0' }) + txt(270, 240, 'Tahsilat + tekrarlayan abonelik geliri', { s: 11, w: 500, c: '#7c8db0' })
  let cx = 952
  ;['12A', '6A', '30G'].forEach((c, i) => { const ch = chip(cx, 210, c, i === 0 ? { bg: '#2563eb', fg: '#fff' } : { bg: '#12203e', fg: '#9fb3d9' }); s += ch.svg; cx += ch.w + 6 })
  s += areaChart(270, 268, 800, 180, [210, 232, 226, 258, 252, 288, 280, 316, 310, 344, 362, 386, 402], { stroke: '#22d3ee', gid: 'g1', dark: D, labels: ['Ekm', 'Şub', 'Nis', 'Haz', 'Ağu', 'Eyl'] })
  s += card(1126, 194, 452, 300, D)
  s += txt(1142, 222, 'Plan dağılımı', { s: 12.8, w: 700, c: '#e2e8f0' }) + txt(1142, 240, 'Aktif aboneliklerin plana göre paylaşımı', { s: 11, w: 500, c: '#7c8db0' })
  ;[['Başlangıç', 486, 104, '#1d4ed8'], ['Pro', 612, 164, '#2563eb'], ['Kurumsal', 186, 78, '#06b6d4']].forEach((b, i) => {
    const bx = 1166 + i * 130
    s += rw(bx, 448 - b[2], 52, b[2], { rx: 7, f: b[3] }) + txt(bx + 26, 438 - b[2], String(b[1]), { s: 11, w: 650, c: '#9fb3d9', a: 'middle' }) + txt(bx + 26, 470, b[0], { s: 10.5, w: 500, c: '#5b6c8f', a: 'middle' })
  })
  // table + feed
  s += card(254, 510, 860, 468, D)
  s += txt(270, 538, 'Son işlemler', { s: 12.8, w: 700, c: '#e2e8f0' }) + txt(270, 556, 'Bugün 118 işlem · 2 bekleyen · 1 başarısız', { s: 11, w: 500, c: '#7c8db0' })
  const tc = chip(940, 524, 'Tümünü gör', { bg: '#12203e', fg: '#9fb3d9' }); s += tc.svg
  s += table(270, 572, [
    { label: 'ABONELİK', w: 118 }, { label: 'MÜŞTERİ', w: 250 }, { label: 'PLAN', w: 118 }, { label: 'TUTAR', w: 116 }, { label: 'DURUM', w: 150 },
  ], [
    ['#AB-10421', 'Demirtaş Lojistik A.Ş.', 'Kurumsal', '₺18.400', { st: 'Ödendi', tone: 'g' }],
    ['#AB-10420', 'Kuzey Gıda San.', 'Pro', '₺4.900', { st: 'Ödendi', tone: 'g' }],
    ['#AB-10419', 'Vera Tekstil', 'Başlangıç', '₺1.450', { st: 'Beklemede', tone: 'a' }],
    ['#AB-10418', 'Arda Yapı İnşaat', 'Pro', '₺4.900', { st: 'Ödendi', tone: 'g' }],
    ['#AB-10417', 'Lida Kozmetik', 'Başlangıç', '₺1.450', { st: 'Başarısız', tone: 'r' }],
    ['#AB-10416', 'Nortel Medya', 'Pro', '₺4.900', { st: 'Ödendi', tone: 'g' }],
    ['#AB-10415', 'Ege Seramik', 'Kurumsal', '₺18.400', { st: 'Ödendi', tone: 'g' }],
    ['#AB-10414', 'Mira Enerji', 'Başlangıç', '₺1.450', { st: 'Beklemede', tone: 'a' }],
  ], { dark: D, rowH: 44 })
  s += card(1126, 510, 452, 468, D)
  s += txt(1142, 538, 'Canlı aktivite', { s: 12.8, w: 700, c: '#e2e8f0' }) + txt(1142, 556, 'Son 24 saat · otomatik akış', { s: 11, w: 500, c: '#7c8db0' })
  ;[
    ['#34d399', 'Yeni kayıt: Nortel Medya', 'Başlangıç plan · 14:02'],
    ['#60a5fa', 'Plan yükseltme: Kuzey Gıda → Pro', '13:47 · fark ₺3.450'],
    ['#34d399', 'Fatura ödendi: ₺18.400', 'Demirtaş Lojistik · 12:30'],
    ['#22d3ee', 'API anahtarı oluşturuldu', 'Mira Enerji · prod ortamı'],
    ['#fbbf24', 'Ödeme denemesi başarısız', 'Lida Kozmetik · kart reddi'],
  ].forEach((f, i) => {
    const fy = 586 + i * 52
    s += `<circle cx="1148" cy="${fy}" r="4" fill="${f[0]}"/>` + txt(1162, fy + 4, f[1], { s: 12.2, w: 600, c: '#cbd5e1' }) + txt(1162, fy + 21, f[2], { s: 10.6, w: 500, c: '#64748b' })
  })
  s += ln(1142, 856, 1562, 856, '#16213c')
  s += txt(1142, 882, 'Sistem durumu', { s: 11.5, w: 700, c: '#9fb3d9', ls: '0.05em' })
  ;[['API gecikmesi', '84 ms'], ['Hata oranı', '%0,02'], ['Kuyruk', '3 iş']].forEach((r, i) => {
    const ry = 902 + i * 24
    s += `<circle cx="1148" cy="${ry - 4}" r="3.5" fill="#34d399"/>` + txt(1162, ry, r[0], { s: 11.6, w: 500, c: '#8ba0c4' }) + txt(1562, ry, r[1], { s: 11.6, w: 650, c: '#cbd5e1', a: 'end' })
  })
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>${grad('g1', '#06b6d4')}</defs>${s}</svg>`
}

/* ================= 2) Kapra — e-ticaret sipariş yönetimi (açık) ================= */
function magazaSVG() {
  let s = rw(0, 0, W, H, { f: '#f1f5f9' })
  s += rw(0, 0, W, 58, { f: '#ffffff' }) + ln(0, 58, W, 58, '#e2e8f0')
  s += rw(22, 16, 26, 26, { rx: 7, f: '#0b1f4b' }) + `<path d="M29 25 h12 l-1.4 12 a2 2 0 0 1-2 1.8 h-7.2 a2 2 0 0 1-2-1.8 Z" fill="none" stroke="#fff" stroke-width="1.9"/><path d="M32 25 a3 3 0 0 1 6 0" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round"/>`
  s += txt(57, 34, 'KAPRA', { s: 14.5, w: 800, c: '#0f172a', ls: '0.04em' })
  let tx = 150
  ;[['Ürünler', 0], ['Siparişler', 1], ['Müşteriler', 0], ['Kampanyalar', 0], ['Raporlar', 0]].forEach(([t, on]) => {
    const wdt = tw(t, 12.6, 600) + 24
    if (on) s += rw(tx, 14, wdt, 30, { rx: 8, f: '#eef2ff' })
    s += txt(tx + wdt / 2, 33, t, { s: 12.6, w: 600, c: on ? '#3730a3' : '#475569', a: 'middle' })
    tx += wdt + 6
  })
  s += rw(W - 96, 12, 34, 34, { rx: 9, f: '#f8fafc', st: '#e2e8f0' }) + `<circle cx="${W - 79}" cy="27" r="6" fill="none" stroke="#475569" stroke-width="1.8"/>`
  s += `<circle cx="${W - 46}" cy="29}" r="15" fill="#6366f1"/>`.replace('}', '') + txt(W - 46, 33, 'KD', { s: 11, w: 700, c: '#fff', a: 'middle' })
  // başlık + filtreler
  s += txt(22, 100, 'Siparişler', { s: 17, w: 750 }) + txt(22, 119, '01 Eyl – 30 Eyl 2026 · 1.284 sipariş · 38 iade', { s: 12, w: 500, c: '#64748b' })
  s += rw(W - 700, 78, 300, 34, { rx: 9, f: '#ffffff', st: '#e2e8f0' }) + txt(W - 680, 99, 'Sipariş no veya müşteri ara…', { s: 12.3, w: 500, c: '#94a3b8' })
  ;[['Durum: Tümü', W - 384], ['Kanal: Tümü', W - 262]].forEach(([t, x]) => {
    s += rw(x, 78, 112, 34, { rx: 9, f: '#ffffff', st: '#e2e8f0' }) + txt(x + 12, 99, t, { s: 12.3, w: 550, c: '#334155' }) + `<path d="M${x + 92} 93 l5 5 5-5" fill="none" stroke="#94a3b8" stroke-width="1.6" stroke-linecap="round"/>`
  })
  s += rw(W - 138, 78, 116, 34, { rx: 9, f: '#0b1f4b' }) + txt(W - 80, 99, 'Dışa Aktar', { s: 12.5, w: 650, c: '#fff', a: 'middle' })
  // kpis
  const kw = (W - 44 - 36) / 4
  ;[
    ['BUGÜNKÜ SİPARİŞ', '42', '▲ %8,2', '#059669', 'düne göre'],
    ['GÜNLÜK CİRO', '₺96.480', '▲ %11,0', '#059669', 'KDV hariç'],
    ['ORTALAMA SEPET', '₺2.297', '▲ %2,6', '#059669', '3 ürün/sepet'],
    ['İADE ORANI', '%1,8', '▼ 0,3 p', '#059669', 'hedef < %2'],
  ].forEach((k, i) => (s += kpi(22 + i * (kw + 12), 136, kw, k[0], k[1], k[2], k[3], k[4], false)))
  // tablo + stok
  s += card(22, 252, 1120, 452, false)
  s += txt(38, 280, 'Aktif sipariş kuyruğu', { s: 12.8, w: 700 }) + txt(38, 298, 'Depo ve kargo entegrasyonu canlı · ort. hazırlama 4,2 sa', { s: 11, w: 500, c: '#64748b' })
  const lv = chip(1030, 266, 'Canlı', { bg: '#2563eb', fg: '#fff' }); s += lv.svg
  s += table(38, 314, [
    { label: 'SİPARİŞ', w: 118 }, { label: 'MÜŞTERİ', w: 190 }, { label: 'KANAL', w: 110 }, { label: 'ÜRÜN', w: 96 }, { label: 'TUTAR', w: 110 }, { label: 'DURUM', w: 150 },
  ], [
    ['#KP-88217', 'İpek Sancer', 'Web', '1 ürün', '₺749', { st: 'İade talebi', tone: 'r' }],
    ['#KP-88216', 'Aslı Dereci', 'Web', '5 ürün', '₺6.120', { st: 'Teslim edildi', tone: 'g' }],
    ['#KP-88215', 'Barış Uncu', 'Pazaryeri', '2 ürün', '₺1.598', { st: 'Ödeme bekliyor', tone: 'a' }],
    ['#KP-88214', 'Zeynep Koral', 'Web', '3 ürün', '₺2.847', { st: 'Hazırlanıyor', tone: 'b' }],
    ['#KP-88213', 'Mert Elgin', 'Mobil', '1 ürün', '₺749', { st: 'Kargoda', tone: 'c' }],
    ['#KP-88212', 'Selin Aksoy', 'Web', '4 ürün', '₺4.310', { st: 'Teslim edildi', tone: 'g' }],
    ['#KP-88211', 'Kerem Balta', 'Pazaryeri', '2 ürün', '₺1.940', { st: 'Hazırlanıyor', tone: 'b' }],
    ['#KP-88210', 'Derya Tuncel', 'Mobil', '6 ürün', '₺7.260', { st: 'Teslim edildi', tone: 'g' }],
  ], { dark: false, rowH: 44 })
  s += card(1154, 252, 424, 452, false)
  s += txt(1170, 280, 'Stok uyarıları', { s: 12.8, w: 700 }) + txt(1170, 298, 'Eşik altı ürünler · otomatik sipariş önerisi', { s: 11, w: 500, c: '#64748b' })
  ;[
    ['#ef4444', 'Seramik Kupa (mat) — 0 adet', 'Tedarikçi siparişi önerildi · 240 adet'],
    ['#f59e0b', 'Yün Kaşkol — antrasit · 4 adet', 'Eşik: 20 adet · teslim 6 gün'],
    ['#f59e0b', 'Keten Gömlek — M · 7 adet', 'Eşik: 15 adet · transfer bekliyor'],
    ['#10b981', 'Deri Cüzdan — taba · 86 adet', 'Stok sağlıklı · 22 günlük karşılama'],
    ['#10b981', 'Cam Vazo — küçük · 54 adet', 'Stok sağlıklı · 31 günlük karşılama'],
  ].forEach((f, i) => {
    const fy = 330 + i * 58
    s += `<circle cx="1176" cy="${fy}" r="4" fill="${f[0]}"/>` + txt(1190, fy + 4, f[1], { s: 12.2, w: 650, c: '#1e293b' }) + txt(1190, fy + 21, f[2], { s: 10.6, w: 500, c: '#64748b' })
  })
  const c1 = chip(1170, 640, 'Depo: Merkez', { bg: '#2563eb', fg: '#fff' }); s += c1.svg
  const c2 = chip(1170 + c1.w + 8, 640, 'Eşikleri düzenle', { bg: '#f1f5f9', fg: '#475569' }); s += c2.svg
  // kanal kırılımı
  s += card(22, 720, 1556, 258, false)
  s += txt(38, 748, 'Kanal kırılımı — Eylül', { s: 12.8, w: 700 }) + txt(38, 766, 'Web, mobil ve pazaryeri ciro paylaşımı', { s: 11, w: 500, c: '#64748b' })
  s += rw(38, 800, 840, 30, { rx: 7, f: '#2563eb' }) + rw(884, 800, 434, 30, { rx: 7, f: '#06b6d4' }) + rw(1324, 800, 240, 30, { rx: 7, f: '#94a3b8' })
  s += txt(38, 790, 'Web · ₺54,2B (%56)', { s: 11.5, w: 650, c: '#334155' }) + txt(884, 790, 'Mobil · ₺27,9B (%29)', { s: 11.5, w: 650, c: '#334155' }) + txt(1324, 790, 'Pazaryeri · ₺14,4B (%15)', { s: 11.5, w: 650, c: '#334155' })
  ;[['Dönüşüm', '%3,4', '%4,1', '%2,2'], ['Ort. sepet', '₺2.140', '₺2.610', '₺1.880'], ['Kargo süresi', '1,8 gün', '1,6 gün', '2,4 gün']].forEach((r, i) => {
    const ry = 866 + i * 30
    s += txt(38, ry, r[0], { s: 11.6, w: 600, c: '#64748b' })
    s += txt(300, ry, r[1], { s: 12, w: 650, c: '#1e293b' }) + txt(884, ry, r[2], { s: 12, w: 650, c: '#1e293b' }) + txt(1324, ry, r[3], { s: 12, w: 650, c: '#1e293b' })
  })
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${s}</svg>`
}

/* ================= 3) RankRadar — teknik SEO raporu (açık) ================= */
function raporSVG() {
  let s = rw(0, 0, W, H, { f: '#f1f5f9' })
  s += rw(0, 0, W, 58, { f: '#ffffff' }) + ln(0, 58, W, 58, '#e2e8f0')
  s += rw(22, 16, 26, 26, { rx: 7, f: '#0b1f4b' }) + `<circle cx="35" cy="28" r="6" fill="none" stroke="#fff" stroke-width="2"/><path d="M39.5 32.5 L43 36" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`
  s += txt(57, 34, 'RankRadar', { s: 14.5, w: 800, c: '#0f172a' })
  let tx = 168
  ;[['Genel Bakış', 1], ['Anahtar Kelimeler', 0], ['Teknik Denetim', 0], ['Backlink', 0], ['Rakipler', 0]].forEach(([t, on]) => {
    const wdt = tw(t, 12.6, 600) + 24
    if (on) s += rw(tx, 14, wdt, 30, { rx: 8, f: '#eef2ff' })
    s += txt(tx + wdt / 2, 33, t, { s: 12.6, w: 600, c: on ? '#3730a3' : '#475569', a: 'middle' })
    tx += wdt + 6
  })
  ;[['Proje: tardigradsoftware.com', W - 560, 232], ['Ağustos 2026', W - 316, 128]].forEach(([t, x, wdt]) => {
    s += rw(x, 12, wdt, 34, { rx: 9, f: '#f8fafc', st: '#e2e8f0' }) + txt(x + 12, 33, t, { s: 12.3, w: 550, c: '#334155' }) + `<path d="M${x + wdt - 20} 27 l5 5 5-5" fill="none" stroke="#94a3b8" stroke-width="1.6" stroke-linecap="round"/>`
  })
  s += rw(W - 176, 12, 154, 34, { rx: 9, f: '#0b1f4b' }) + txt(W - 99, 33, 'Rapor İndir', { s: 12.5, w: 650, c: '#fff', a: 'middle' })
  // başlık kartı
  s += card(22, 82, 1556, 196, false)
  s += `<circle cx="122" cy="180" r="46" fill="none" stroke="#e6ebf2" stroke-width="10"/><circle cx="122" cy="180" r="46" fill="none" stroke="#10b981" stroke-width="10" stroke-linecap="round" stroke-dasharray="248 289" transform="rotate(-90 122 180)"/>` + txt(122, 190, '86', { s: 26, w: 800, c: '#0f172a', a: 'middle' })
  s += txt(196, 128, 'Teknik SEO sağlık puanı: İyi', { s: 15.5, w: 750 }) + txt(196, 148, 'Son denetim: 28 Ağu 2026 04:12 · 207 sayfa tarandı · 3 uyarı', { s: 11.5, w: 500, c: '#64748b' })
  ;[['LCP', '1,8 sn'], ['CLS', '0,02'], ['INP', '140 ms']].forEach((v, i) => {
    const vx = 196 + i * 150
    s += rw(vx, 168, 138, 58, { rx: 10, f: '#f8fafc', st: '#eef2f7' }) + txt(vx + 12, 188, v[0], { s: 10.5, w: 700, c: '#64748b', ls: '0.05em' }) + txt(vx + 12, 210, v[1], { s: 15, w: 750 }) + `<circle cx="${vx + 116}" cy="204" r="8" fill="#10b981" opacity=".15"/><path d="M${vx + 112.5} 204 l2.6 2.6 4.6-5" fill="none" stroke="#059669" stroke-width="1.8" stroke-linecap="round"/>`
  })
  const kw = 254
  ;[
    ['TIKLAMA (90G)', '12,4B', '▲ %18,6'], ['GÖSTERİM (90G)', '486B', '▲ %9,3'], ['ORT. KONUM', '4,2', '▲ 1,1 sıra'], ['DİZİNE EKLENEN', '204/207', '3 incelemede'],
  ].forEach((k, i) => {
    const x = 1046 + (i % 2) * (kw + 12)
    const y = 98 + Math.floor(i / 2) * 92
    s += card(x, y, kw, 82, false) + txt(x + 14, y + 24, k[0], { s: 10.6, w: 600, c: '#64748b', ls: '0.06em' }) + txt(x + 14, y + 50, k[1], { s: 19, w: 800 }) + txt(x + 14 + tw(k[1], 19, 800) + 10, y + 50, k[2], { s: 11, w: 650, c: i === 3 ? '#64748b' : '#059669' })
  })
  // trend + kelimeler
  s += card(22, 294, 1040, 420, false)
  s += txt(38, 322, 'Tıklama eğilimi — 90 gün', { s: 12.8, w: 700 }) + txt(38, 340, 'Organik arama · Search Console verisi', { s: 11, w: 500, c: '#64748b' })
  let chx = 830
  ;['90G', '28G', '7G'].forEach((c, i) => { const ch = chip(chx, 308, c, i === 0 ? { bg: '#2563eb', fg: '#fff' } : { bg: '#f1f5f9', fg: '#475569' }); s += ch.svg; chx += ch.w + 6 })
  s += areaChart(38, 366, 1000, 268, [120, 126, 134, 128, 146, 140, 158, 152, 170, 166, 186, 182, 200, 208, 222], { stroke: '#2563eb', gid: 'g2', dark: false, labels: ['01 Haz', '30 Haz', '29 Tem', '27 Ağu'] })
  s += `<path d="M38 610 L240 604 440 596 640 588 840 578 1038 570" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="4 4"/>`
  s += rw(880, 330, 9, 9, { rx: 2, f: '#2563eb' }) + txt(894, 339, '2026', { s: 10.5, w: 600, c: '#475569' }) + rw(940, 330, 9, 9, { rx: 2, f: '#94a3b8' }) + txt(954, 339, '2025', { s: 10.5, w: 600, c: '#475569' })
  s += card(1074, 294, 504, 420, false)
  s += txt(1090, 322, 'Öne çıkan anahtar kelimeler', { s: 12.8, w: 700 }) + txt(1090, 340, 'Hacim · konum · 30 günlük değişim', { s: 11, w: 500, c: '#64748b' })
  s += table(1090, 356, [
    { label: 'ANAHTAR KELİME', w: 268 }, { label: 'HACİM', w: 80 }, { label: 'KONUM', w: 76 }, { label: 'Δ', w: 56 },
  ], [
    ['web yazılım firması istanbul', '1.900', '2', { up: '▲3' }],
    ['e-ticaret sitesi kurma', '2.400', '4', { up: '▲1' }],
    ['kurumsal web tasarımı', '1.300', '3', { up: '▼1', c: '#dc2626' }],
    ['özel yazılım geliştirme', '880', '5', { up: '▲2' }],
    ['seo danışmanlığı fiyat', '720', '7', { up: '▲4' }],
    ['saas ürün geliştirme', '590', '6', { up: '▲2' }],
    ['mobil uygulama ajansı', '480', '8', { up: '▲1' }],
  ], { dark: false, rowH: 44 })
  // alt bant
  s += card(22, 730, 1556, 248, false)
  s += txt(38, 758, 'Dizin durumu', { s: 12.8, w: 700 }) + txt(38, 776, '207 URL · sitemap ile birebir uyumlu', { s: 11, w: 500, c: '#64748b' })
  s += rw(38, 800, 430, 26, { rx: 6, f: '#10b981' }) + rw(474, 800, 60, 26, { rx: 6, f: '#f59e0b' }) + rw(540, 800, 20, 26, { rx: 6, f: '#e2e8f0' })
  ;[['Dizinde · 204', 38, '#10b981'], ['İncelemede · 3', 474, '#f59e0b'], ['Hariç · 0', 620, '#94a3b8']].forEach(([t, x, c]) => {
    s += `<circle cx="${x + 5}" cy="852" r="4" fill="${c}"/>` + txt(x + 16, 856, t, { s: 11.5, w: 600, c: '#475569' })
  })
  s += ln(800, 744, 800, 962, '#eef2f7')
  s += txt(838, 758, 'Önerilen aksiyonlar', { s: 12.8, w: 700 }) + txt(838, 776, 'Öncelik sırasına göre · tahmini etki', { s: 11, w: 500, c: '#64748b' })
  ;[
    ['#f59e0b', '3 URL incelemeye gönderildi', 'Dizin · yüksek etki · 2 gün'],
    ['#f59e0b', '12 ürün görselinde alt metni eksik', 'Erişilebilirlik + görsel SEO · orta'],
    ['#2563eb', 'Blog iç linkleme: 8 yazıya çapa önerisi', 'İç SEO · orta etki · 1 hafta'],
  ].forEach((f, i) => {
    const fy = 806 + i * 52
    s += `<circle cx="844" cy="${fy}" r="4" fill="${f[0]}"/>` + txt(858, fy + 4, f[1], { s: 12.2, w: 650, c: '#1e293b' }) + txt(858, fy + 21, f[2], { s: 10.6, w: 500, c: '#64748b' })
  })
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>${grad('g2', '#2563eb')}</defs>${s}</svg>`
}

/* ================= render ================= */
const fontFiles = []
for (const w of [400, 500, 600, 700, 800]) {
  const src = `node_modules/@fontsource/inter/files/inter-latin-${w}-normal.woff2`
  const ttf = await decompress(fs.readFileSync(src))
  const out = `/tmp/inter-${w}.ttf`
  fs.writeFileSync(out, Buffer.from(ttf))
  fontFiles.push(out)
}
const jobs = [
  [panelSVG(), 'public/images/photos/saas-pano.jpg'],
  [magazaSVG(), 'public/images/photos/eticaret-ui.jpg'],
  [raporSVG(), 'public/images/photos/seo-analiz.jpg'],
]
for (const [svg, out] of jobs) {
  const r = new Resvg(svg, {
    font: { fontFiles, loadSystemFonts: false, defaultFamily: 'Inter' },
    fitTo: { mode: 'width', value: W },
  })
  const png = r.render().asPng()
  await sharp(Buffer.from(png)).jpeg({ quality: 88, mozjpeg: true }).toFile(out)
  console.log('render', out)
}
