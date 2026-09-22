# Hướng dẫn nối website với Sanity CMS

Sau khi làm xong các bước dưới đây, bạn có thể vào `/studio` trên website để **tự thêm/sửa/xoá sản phẩm, đổi giá, tải ảnh** — không cần đụng vào code, và website tự cập nhật trong vòng vài chục giây.

## 1. Tạo tài khoản + project Sanity (miễn phí)

1. Vào **https://www.sanity.io/get-started** → đăng ký bằng email hoặc Google (miễn phí, không cần thẻ tín dụng).
2. Sau khi đăng nhập, vào **https://www.sanity.io/manage** → bấm **Create project**.
3. Đặt tên project (ví dụ "KIGEN Life Sciences"), dataset để mặc định là `production`.
4. Vào project vừa tạo → mục **Project ID** ở trang tổng quan → copy mã này (dạng chữ+số, ví dụ `ab12cd34`).

## 2. Tạo API token (để nạp dữ liệu ban đầu)

1. Trong project trên manage.sanity.io → tab **API** → **Tokens** → **Add API token**.
2. Đặt tên (ví dụ "seed-script"), quyền chọn **Editor**.
3. Copy token hiện ra (chỉ hiện **một lần**, đóng lại là mất, phải tạo token mới nếu quên lưu).

## 3. Điền vào file `.env.local`

Trong thư mục dự án, sao chép file `.env.example` thành `.env.local`:

```bash
cp .env.example .env.local
```

Mở `.env.local` và điền:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=ab12cd34        # Project ID ở bước 1
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk...                          # Token ở bước 2
SANITY_REVALIDATE_SECRET=bat-ky-chuoi-nao-ban-tu-dat
```

**Lưu ý:** file `.env.local` không bị đưa lên GitHub (đã có trong `.gitignore`) — token của bạn luôn ở lại máy bạn, an toàn.

## 4. Cho phép domain của Studio (CORS)

1. Trên manage.sanity.io → project → **API** → **CORS origins** → **Add CORS origin**.
2. Thêm `http://localhost:3000` (bỏ tick "credentials"... thật ra tick "Allow credentials" cũng được, không sao) để chạy thử ở máy.
3. Sau khi deploy web thật (ví dụ lên Vercel), quay lại thêm domain thật, ví dụ `https://kigenlife.vn`.

## 5. Chạy thử

```bash
npm run dev
```

Mở `http://localhost:3000/studio` — nếu thấy giao diện quản trị Sanity (không còn báo lỗi "Configuration must contain projectId") là đã kết nối thành công. Đăng nhập Studio bằng chính tài khoản Sanity bạn vừa tạo.

## 6. Nạp 25 sản phẩm mẫu có sẵn (tuỳ chọn)

Nếu muốn có sẵn dữ liệu (giá tạm, ảnh 25 sản phẩm) để chỉnh sửa thay vì gõ lại từ đầu:

```bash
npm run seed
```

Script sẽ tự tải 25 ảnh sản phẩm trong `public/images/products/` lên Sanity và tạo sản phẩm tương ứng. Chạy lại nhiều lần không sao — sản phẩm đã có (trùng SKU) sẽ được bỏ qua, không tạo trùng.

## 7. (Tuỳ chọn) Bật cập nhật tức thời khi Publish

Mặc định trang web tự làm mới dữ liệu mỗi 60 giây. Muốn thay đổi hiện ngay lập tức sau khi bấm **Publish** trong Studio:

1. Deploy web lên một domain thật trước (ví dụ Vercel).
2. manage.sanity.io → project → **API** → **Webhooks** → **Create webhook**.
3. URL: `https://<domain-that-thuc-cua-ban>/api/revalidate`
4. Dataset: `production`, Trigger on: **Create, Update, Delete**.
5. Secret: dán đúng giá trị `SANITY_REVALIDATE_SECRET` đã đặt ở bước 3 (và nhớ thêm biến này vào cấu hình môi trường trên Vercel).

## Từ nay quản lý sản phẩm ở đâu?

Vào `/studio` (ví dụ `https://kigenlife.vn/studio`), đăng nhập bằng tài khoản Sanity → mục **Sản phẩm**:

- **Thêm sản phẩm mới**: bấm "+" → điền tên, mã SKU, dòng sản phẩm, giá, ảnh...
- **Đổi giá**: mở sản phẩm → sửa ô "Giá bán" → **Publish**.
- **Hết hàng**: tắt công tắc "Còn hàng" → **Publish**.
- **Đưa lên Trang chủ**: bật "Hiển thị ở Trang chủ" cho tối đa các sản phẩm bạn muốn nổi bật.

Không cần biết code, không cần deploy lại — cứ sửa xong bấm **Publish** là web cập nhật.
