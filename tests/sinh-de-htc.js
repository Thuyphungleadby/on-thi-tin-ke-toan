// Sinh hàng nghìn đề hàm tài chính, báo lỗi nếu có đáp án không hợp lệ
const fs = require('fs'), path = require('path');
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const grab = (a, b) => { const i = html.indexOf(a); return html.slice(i, html.indexOf(b, i)); };
const src = grab('function rng(seed)', 'function taoDe(') + grab('const F = {', 'if (typeof module') + grab('/* ===== Đề hàm tài chính tự động', 'let HTC = {');
const { sinhBai, sinhDeHTC, HTC_DANG } = new Function(src + ';return {sinhBai,sinhDeHTC,HTC_DANG};')();
let bad = 0, n = 0;
for (const k of Object.keys(HTC_DANG)) for (let s = 1; s <= 150; s++) {
  const b = sinhBai(k, s * 7 + 3); n++;
  if (!b.de || !b.qs.length) { bad++; console.log('THIẾU', k, s); }
  for (const q of b.qs) if (!isFinite(q.v)) { bad++; console.log('LỖI', k, s, q.l, q.f); }
}
for (let s = 1; s <= 300; s++) if (sinhDeHTC(s).length !== 5) { bad++; console.log('ĐỀ KHÔNG ĐỦ 5 BÀI', s); }
console.log(`Sinh ${n} bài, ${Object.keys(HTC_DANG).length} dạng: ${bad ? bad + ' lỗi' : 'không lỗi'}`);
process.exitCode = bad ? 1 : 0;
