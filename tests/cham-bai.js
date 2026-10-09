const {JSDOM}=require('jsdom'); const fs=require('fs');
const W=require('path').join(__dirname,'..')+'/';
const dom=new JSDOM(fs.readFileSync(W+'index.html','utf8'),{runScripts:'dangerously',url:'https://x.test/'});
const w=dom.window,d=w.document; const errs=[]; w.addEventListener('error',e=>errs.push(e.message));
w.ExcelJS=require('exceljs'); w.URL.createObjectURL=()=>'blob:x'; w.URL.revokeObjectURL=()=>{};
w.fetch=async p=>{const b=fs.readFileSync(W+p); return {ok:true,status:200,arrayBuffer:async()=>b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength)}};
const nop=async(p,n)=>{const b=Buffer.isBuffer(p)?p:fs.readFileSync(p); await w.eval('chamBai')({name:n,arrayBuffer:async()=>b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength)}); const kq=d.querySelector('#ketQua'); return (kq.querySelector('.diemto')?.textContent.replace(/\s+/g,' ')||kq.textContent.slice(0,120))+' | '+d.querySelector('#dangChon').textContent;};
setTimeout(async()=>{
 const T=[['D:/Tin ứng dụng/Huệ/Quàng Kim Huệ 30.12.xlsx','Huệ'],['D:/Tin ứng dụng/new/thuythuy.xlsx','thuythuy'],['D:/Tin ứng dụng/Thuy/MAU BANG TIN UD--.xlsx','Thủy'],['D:/Tin ứng dụng/DE ON TAP TIN UDKT_Trần Thị Ánh Tuyết_06.06 (1).xlsx','Tuyết'],['D:/Tin ứng dụng/Thuy/DE ON TAP TIN UDKT.xlsx','đề QA trống'],['D:/Tin ứng dụng/Thuy/DE SO 1.xlsx','đề HA trống']];
 for(const [p,n] of T) console.log(n.padEnd(12), await nop(p,n+'.xlsx'));
 // tải đề ngẫu nhiên rồi nộp lại
 for (const ma of ['4321','777','NL']) {
  d.querySelector('#oMa').value=ma; d.querySelector('#formMa').dispatchEvent(new w.Event('submit',{cancelable:true}));
  let buf; w.eval('taiXuong=function(b){window.__buf=b}'); 
  await d.querySelector('#taiDe').onclick(); buf=w.__buf;
  console.log('tải đề',ma.padEnd(5), buf? Math.round(buf.byteLength/1024)+'KB':'KHÔNG CÓ FILE', '| nộp lại:', buf? await nop(Buffer.from(buf),'de'+ma+'.xlsx'):'');
 }
 // hàm tài chính: số bài và thử chấm 1 bài
 console.log('bài hàm TC:',d.querySelectorAll('#finCards .card').length,'| đáp án Nhất Linh:',d.querySelectorAll('#nlBody .card').length,'thẻ');
 // gõ tay đề QA
 d.querySelector('#oMa').value='QA'; d.querySelector('#formMa').dispatchEvent(new w.Event('submit',{cancelable:true}));
 const i=d.querySelector('#i-tM'); i.value='216.214,6'; i.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter'}));
 console.log('gõ tay tổng quỹ lương QA:',d.querySelector('#q-tM').dataset.st);
 console.log('lỗi JS:',errs.length?errs:'không có');
},500);
