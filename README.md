# 20.10 — Gửi những người phụ nữ của gia đình

Món quà số nhỏ cho Bà nội Lành, Bà ngoại Hường, Thu Hà và Diệu Linh.
React + Vite, không backend, mở tốt trên điện thoại (Messenger/Zalo).

## Chạy

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # xuất ra dist/
```

## Link riêng cho từng người

Mỗi người chỉ thấy món quà của mình. Trang gốc `/` không liệt kê ai.

| Người nhận | Link |
|---|---|
| Bà nội Lành | `/bfz9p5` |
| Bà ngoại Hường | `/rcv7ya` |
| Vợ Thu Hà | `/jyjmhr` |
| Em vợ Diệu Linh | `/zw5hmf` |

Muốn đổi mã thì sửa `code` trong `src/data/family.ts`.
Khi deploy, host phải trả `index.html` cho mọi đường dẫn. Đã kèm sẵn `public/_redirects` (Netlify) và `vercel.json` (Vercel).
GitHub Pages không hỗ trợ việc này, nên dùng Netlify hoặc Vercel.

## Sửa nội dung — chỉ một file

`src/data/family.ts`: tên, vai, câu ngắn, màu nhấn, caption ảnh, lời thư, chữ ký,
lời chúc khi hái hoa, hộp ký ức. Không cần đụng vào component.

## Thay ảnh

Chép ảnh thật **đè lên file cùng tên** trong `public/images/`
(ví dụ `photo-vo-2.jpg`). Muốn thêm/bớt ảnh thì sửa danh sách `memories` trong `family.ts`.
Nên dùng JPG, cạnh dài ~1200px, để tải nhanh trên 4G.

`python3 scripts/make-placeholders.py` sinh lại placeholder cho đường dẫn mới; nó không ghi đè ảnh đã có.

## Nhạc nền

Đặt file vào `public/music/music.mp3`. Nhạc không tự phát; người xem bấm ♫ để bật.
Chưa có file thì website vẫn chạy bình thường.

## Deploy + preview đẹp trên Zalo/Facebook

1. Kéo thả thư mục `dist/` lên Netlify Drop, hoặc chạy `npx vercel`.
2. Mở `index.html`, thay **`https://YOUR-DOMAIN`** (2 chỗ `og:url`, `og:image`) bằng domain thật, rồi build lại.
   Zalo/Facebook chỉ đọc ảnh preview qua URL tuyệt đối.
3. Ảnh preview là `public/og-image.jpg` (1200×630), thay được tùy ý.

Ghi chú: tiến trình (đã mở mấy món quà) được lưu trong trình duyệt của người xem.
Muốn xem lại từ đầu thì mở bằng tab ẩn danh.
# 20-10
