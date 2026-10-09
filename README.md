# Sổ ôn Tin học kế toán

Web luyện đề môn Tin học ứng dụng trong kế toán: https://thuyphungleadby.github.io/on-thi-tin-ke-toan/

- `index.html` – toàn bộ trang (giao diện, bộ tính đề, bộ chấm, đề hàm tài chính tự động, thẻ ghi nhớ). Sửa trực tiếp file này.
- `de-mau.xlsx` – khuôn đề ôn tập (Quốc An) dùng để sinh đề ngẫu nhiên.
- `de-nhat-linh.xlsx` – file đề trống bài Nhất Linh.

## Kiểm tra sau khi sửa

```
cd tests
npm i jsdom@24 exceljs@4.4.0
node chay-tat-ca.js
```

`cham-bai.js` dùng các bài giải mẫu trong `D:\Tin ứng dụng` (chỉ có trên máy của Thủy). Kết quả đúng: Huệ 63/63, Ánh Tuyết 53/54, không có lỗi JS.
