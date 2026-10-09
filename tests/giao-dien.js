const {JSDOM}=require('jsdom'); const fs=require('fs');
const dom=new JSDOM(fs.readFileSync(require('path').join(__dirname,'../index.html'),'utf8'),{runScripts:'dangerously',url:'https://x.test/#ham'});
const w=dom.window,d=w.document; const errs=[]; w.addEventListener('error',e=>errs.push(e.message));
setTimeout(()=>{
 const $=s=>d.querySelector(s);
 console.log('tab hàm hiện:',!$('#p-ham').hidden,'| mã:',$('#htcMaHien').textContent,'| số bài:',d.querySelectorAll('#htcBai .card').length,'| số dạng chọn:',$('#htcLoai').options.length);
 console.log('bài 1:',d.querySelector('#htcBai .card .src').textContent);
 const hidden0=d.querySelector('#htcBai .dapan').hidden; d.querySelector('[data-hs="0"]').click();
 console.log('xem đáp án bài 1: trước ẩn',hidden0,'→ sau ẩn',d.querySelector('#htcBai .dapan').hidden);
 $('#htcTatCa').click(); console.log('hiện tất cả: số đáp án đang ẩn =',[...d.querySelectorAll('#htcBai .dapan')].filter(x=>x.hidden).length);
 $('#htcLoai').value='VDBN'; $('#htcLoai').dispatchEvent(new w.Event('change'));
 console.log('luyện VDBN: mã',$('#htcMaHien').textContent,'| số bài',d.querySelectorAll('#htcBai .card').length,'|',d.querySelector('#htcBai .card .src').textContent);
 const ma=$('#htcMaHien').textContent; const de1=d.querySelector('#htcBai .card p').textContent;
 $('#htcMoi').click(); $('#htcOMa').value=ma; $('#htcForm').dispatchEvent(new w.Event('submit',{cancelable:true}));
 console.log('mở lại mã',ma,'ra cùng đề:',d.querySelector('#htcBai .card p').textContent===de1);
 $('#htcOMa').value='H123'; $('#htcForm').dispatchEvent(new w.Event('submit',{cancelable:true})); console.log('mã H123 → số bài',d.querySelectorAll('#htcBai .card').length);
 // thẻ ghi nhớ
 d.querySelector('[data-tab="the"]').click();
 console.log('\nthẻ: tab hiện',!$('#p-the').hidden,'| chủ đề',d.querySelectorAll('[data-chu]').length,'|',$('#fcViTri').textContent,'|',$('#fcThuocSo').textContent);
 const q1=$('#fcThe .fc-q').textContent; $('#fcThe').click(); console.log('lật: có đáp án',!!$('#fcThe .fc-a'),'|',q1);
 $('#fcDaThuoc').click(); console.log('đánh dấu đã thuộc →',$('#fcThuocSo').textContent,'| vị trí',$('#fcViTri').textContent);
 d.querySelector('[data-chu="Hàm tài chính"]').click(); console.log('lọc Hàm tài chính:',$('#fcViTri').textContent);
 $('#fcChua').checked=true; $('#fcChua').dispatchEvent(new w.Event('change')); d.querySelector('[data-chu="Tất cả"]').click(); console.log('chỉ chưa thuộc (Tất cả):',$('#fcViTri').textContent);
 d.dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowRight'})); console.log('phím →:',$('#fcViTri').textContent);
 $('#fcTron').click(); console.log('trộn:',$('#fcViTri').textContent);
 console.log('lỗi JS:',errs.length?errs:'không có');
},500);
