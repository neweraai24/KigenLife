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

## Hướng dẫn chi tiết dùng /studio hằng ngày

### Truy cập

Mở `https://kigen-life.vercel.app/studio` (hoặc domain thật của bạn + `/studio`). Lần đầu sẽ được yêu cầu đăng nhập — chọn đúng tài khoản Sanity đã dùng để tạo project.

### Giao diện tổng quan

Bên trái là danh sách các loại nội dung — hiện chỉ có **Sản phẩm**. Bấm vào đó để thấy danh sách toàn bộ sản phẩm đang có, mỗi dòng hiện ảnh nhỏ + tên + mã SKU.

### Sửa một sản phẩm có sẵn (đổi giá, đổi mô tả...)

1. Trong danh sách **Sản phẩm**, bấm vào tên sản phẩm cần sửa.
2. Một form hiện ra bên phải với các ô:
   - **Tên sản phẩm**
   - **Mã sản phẩm (SKU)** — thường không cần đổi, đây là mã dùng trong đường link sản phẩm
   - **Dòng sản phẩm** — chọn 1 trong 4: Củ nguyên / Sâm lát / Bột sâm / Chế biến
   - **Ảnh sản phẩm**
   - **Giá bán (₫)**
   - **Đơn vị tính** (hộp, túi, chai...)
   - **Khối lượng tịnh** (ví dụ "227 g")
   - **Tuổi sâm (năm)** — để trống nếu không áp dụng
   - **Mô tả ngắn**
   - **Còn hàng** (công tắc bật/tắt)
   - **Hiển thị ở Trang chủ** (công tắc — xem mục riêng bên dưới)
   - **Thứ tự hiển thị** — số nhỏ hơn hiện trước trong danh mục
3. Sửa ô cần đổi (ví dụ bôi đen **Giá bán**, gõ số mới).
4. Ở góc trên bên phải, bấm nút **Publish** (màu xanh/đen tuỳ giao diện). Nếu chưa Publish, thay đổi chỉ nằm ở bản nháp, **chưa hiện lên web thật**.

### Đổi ảnh sản phẩm

Trong ô **Ảnh sản phẩm**, bấm vào ảnh hiện tại → chọn **Replace** (hoặc kéo-thả ảnh mới trực tiếp vào ô) → chọn file ảnh từ máy bạn → **Publish**. Nên dùng ảnh vuông (1:1), nền sáng, sản phẩm chụp rõ để khớp với các ảnh khác trên web.

### Đánh dấu hết hàng / còn hàng

Mở sản phẩm → tắt công tắc **Còn hàng** → **Publish**. Sản phẩm sẽ tự hiện nhãn "Hết hàng" và nút "Thêm vào giỏ" đổi thành "Thông báo khi có hàng" trên web.

### Chọn sản phẩm nổi bật ở Trang chủ

Mục "Hộp quà biếu" ở Trang chủ lấy đúng những sản phẩm có công tắc **Hiển thị ở Trang chủ** đang bật. Nên bật cho **khoảng 4 sản phẩm** để bố cục đẹp — bật thêm/tắt bớt tuỳ ý, web tự cập nhật.

### Thêm sản phẩm mới hoàn toàn

1. Vào mục **Sản phẩm** → bấm nút **+** (thường ở góc trên bên phải danh sách, hoặc icon "Create new").
2. Điền đầy đủ các ô như mục "Sửa sản phẩm" ở trên. Các ô bắt buộc: Tên, Mã SKU, Dòng sản phẩm, Ảnh, Giá bán.
3. Với ô **Mã sản phẩm (SKU)**: bấm **Generate** để Sanity tự tạo từ tên, hoặc gõ tay mã riêng (viết liền, không dấu, ví dụ `LDB100`).
4. Bấm **Publish**.

### Xoá một sản phẩm

Mở sản phẩm cần xoá → bấm menu **⋮** (ba chấm, thường ở góc trên) → **Delete** → xác nhận. Thao tác này xoá vĩnh viễn, cân nhắc trước khi bấm.

### Publish nghĩa là gì?

Sanity lưu 2 trạng thái cho mỗi sản phẩm: **bản nháp** (draft, chỉ bạn thấy trong Studio) và **bản đã publish** (live, mọi người thấy trên web). Sửa xong mà **không** bấm Publish thì thay đổi chưa lên web thật — đây là điểm an toàn để bạn sửa thử trước khi công khai.

### Kiểm tra thay đổi đã lên web chưa

Sau khi Publish, mở lại trang web (ví dụ trang Cửa hàng) và tải lại (refresh) — nếu đã có webhook (xem mục 7 ở trên), thay đổi hiện gần như ngay lập tức; nếu chưa, có thể mất tới 60 giây.

Không cần biết code, không cần deploy lại — cứ sửa xong bấm **Publish** là web cập nhật.
