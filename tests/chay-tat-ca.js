// Chạy: cd tests && npm i jsdom@24 exceljs@4.4.0 && node chay-tat-ca.js
const { execFileSync } = require('child_process');
for (const f of ['sinh-de-htc.js', 'cham-bai.js', 'giao-dien.js']) {
  console.log('\n=== ' + f);
  try { console.log(execFileSync(process.execPath, [f], { cwd: __dirname, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })); }
  catch (e) { console.log(e.stdout || ''); console.log('THẤT BẠI: ' + f); process.exitCode = 1; }
}
