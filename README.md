# KIGEN Life Sciences — Website

Website thương mại điện tử cho KIGEN Life Sciences — tổng đại lý nhân sâm Canada (*Panax quinquefolius*) của Great Mountain Ginseng, Ontario, Canada (từ năm 1976), nhập khẩu chính ngạch về Việt Nam.

Xây dựng lại từ bản thiết kế (Claude Design handoff) thành ứng dụng **Next.js (App Router) + React + Tailwind CSS** — không dùng HTML tĩnh.

## Công nghệ

- [Next.js 16](https://nextjs.org/) (App Router, React Server Components, Turbopack)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (cấu hình theme qua `app/globals.css`)
- [lucide-react](https://lucide.dev/) cho icon
- Giỏ hàng lưu trong `localStorage` qua React Context (`lib/cart-context.js`)
- [Sanity](https://sanity.io) — CMS quản lý sản phẩm/giá, Studio nhúng tại `/studio` (xem [HUONG-DAN-SANITY.md](HUONG-DAN-SANITY.md))

## Cấu trúc thư mục

```
app/
  layout.js                 # Root layout: font, CartProvider
  globals.css                # Design tokens (màu, font, spacing) cho Tailwind v4
  (site)/                    # Nhóm route dùng chung Header + Footer
    page.js                  # Trang chủ
    cua-hang/                # Danh mục sản phẩm (lọc theo dòng, sắp xếp)
    san-pham/[sku]/          # Chi tiết sản phẩm
    nguon-goc/                # Nguồn gốc — dòng thời gian, hồ sơ lô hàng
    ve-kigen/                 # Về KIGEN — câu chuyện, giá trị, timeline
    cam-nang/                 # Cẩm nang (blog) — danh sách + chi tiết bài viết
    gio-hang/                 # Giỏ hàng
    tai-khoan/                # Tài khoản khách hàng — đơn hàng
    lien-he/                  # Liên hệ — form, FAQ
  thanh-toan/                # Thanh toán (header tối giản, không nav)
  xac-nhan-dat-hang/          # Xác nhận đặt hàng
components/
  ui/                         # Button, Card, Badge, Price, GinsengRing, TickDivider...
  forms/                      # Field, Input, Select, QuantityStepper...
  commerce/                   # ProductCard, SpecTable, OriginTimeline, CatalogClient...
  layout/                     # Header, Footer
lib/
  products.js                 # Company info, dòng sản phẩm, SEED_PRODUCTS (dữ liệu mẫu)
  articles.js                  # Nội dung Cẩm nang
  cart-context.js               # React Context cho giỏ hàng (lấy giá/tên từ /api/products)
  sanity/                        # client, queries (GROQ), image url builder
sanity/schemaTypes/              # Schema "product" cho Sanity Studio
sanity.config.js                 # Cấu hình Sanity Studio
app/studio/[[...tool]]/           # Studio nhúng vào website tại /studio
app/api/products/                 # API nội bộ — cart đọc giá/tên sản phẩm hiện tại
app/api/revalidate/                # Webhook Sanity — cập nhật tức thời khi Publish
scripts/seed-sanity.mjs            # Nạp 25 sản phẩm mẫu vào Sanity (npm run seed)
public/images/                 # Logo, ảnh lifestyle, ảnh sản phẩm mẫu (dùng khi seed)
```

## Bắt đầu

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build production
npm start       # chạy bản build
npm run lint    # kiểm tra ESLint
```

## Quản lý sản phẩm/giá không cần code

Xem hướng dẫn đầy đủ ở [HUONG-DAN-SANITY.md](HUONG-DAN-SANITY.md): tạo project Sanity miễn phí, điền `.env.local`, chạy `npm run seed` để nạp 25 sản phẩm mẫu, sau đó vào `/studio` để tự thêm/sửa/xoá sản phẩm và đổi giá. Chưa cấu hình Sanity thì các trang vẫn chạy bình thường, chỉ hiển thị "0 sản phẩm" cho tới khi kết nối xong.

## Ghi chú

- **Giá, mã lô, số chứng nhận trong `lib/products.js` (SEED_PRODUCTS) là dữ liệu giữ chỗ** — cần thay bằng bảng giá và chứng từ thật trước khi vận hành thực tế.
- Thiếu 1/26 SKU packshot theo bản thiết kế gốc (25 ảnh sản phẩm được cung cấp).
- Câu bắt buộc theo quy định *"Thực phẩm này không phải là thuốc..."* hiển thị qua component `ComplianceNotice` trên mọi trang sản phẩm/danh mục.
- Thanh toán trong dự án là mô phỏng phía client (chưa tích hợp cổng thanh toán/CRM thật).
