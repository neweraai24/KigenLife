// Static site config that rarely changes — company info and product-line
// labels. Actual product data (name, price, stock, images) is managed in
// Sanity Studio at /studio — see lib/sanity/queries.js.

export const COMPANY = {
  name: "CÔNG TY TNHH KIGEN LIFE SCIENCES",
  address: "Số 52 Đường Phan Bội Châu, Phường Nha Trang, Tỉnh Khánh Hòa, Việt Nam",
  taxId: "4202060584",
  hotline: "0866228685",
  hotlineDisplay: "0866 228 685",
};

export const LINES = [
  { id: "all", label: "Tất cả sản phẩm" },
  { id: "cu", label: "Củ nguyên" },
  { id: "lat", label: "Sâm lát" },
  { id: "bot", label: "Bột sâm" },
  { id: "che", label: "Chế biến" },
];

export const LINE_LABELS = {
  cu: "Củ nguyên",
  lat: "Sâm lát",
  bot: "Bột sâm",
  che: "Chế biến",
};

// Seed dataset for scripts/seed-sanity.js — the one-time import into Sanity.
// Prices/weights below match BẢNG GIÁ NHÂN SÂM _Nov.2025.pdf (Renso Foods)
// where a confident match exists; `age` (tuổi sâm / root age) is NOT from
// that document — it's a separate storytelling attribute, still a
// placeholder pending the real grading sheet.
// `img` points at the packshot in public/images/products/ that the seed
// script uploads as each product's Sanity image asset.
export const SEED_PRODUCTS = [
  { sku: "HD01", name: "Củ nguyên hộp da", line: "cu", weight: "150 g", age: 5, price: 4800000, unit: "hộp", img: "p01-HD01", note: "Hộp da, củ nguyên chọn tay." },
  { sku: "GB49", name: "Hộp quà củ đại 49", line: "cu", weight: "227 g", age: 5, price: 1980000, unit: "hộp", img: "p02-GB49", note: "Khoảng 14–16 củ mỗi hộp." },
  { sku: "NGB65", name: "Hộp quà củ đại 65", line: "cu", weight: "227 g", age: 5, price: 2180000, unit: "hộp", img: "p04-NGB65", note: "Khoảng 13–15 củ mỗi hộp." },
  { sku: "GB89", name: "Hộp quà củ đại 89", line: "cu", weight: "227 g", age: 6, price: 3280000, unit: "hộp", img: "p06-GB89", note: "Củ lớn, 8–10 củ mỗi hộp." },
  { sku: "GB227-110", name: "Hộp quà củ đại 227g", line: "cu", weight: "227 g", age: 6, price: 3480000, unit: "hộp", img: "p09-GB227-110", note: "Cỡ 110 củ/pound. Khoảng 10–12 củ.", featured: true },
  { sku: "KH", name: "Củ đại khô loại thường", line: "cu", weight: "227 g", age: 4, price: 1580000, unit: "túi", img: "p10-KH", note: "Sấy khô tự nhiên." },
  { sku: "LDB100", name: "Sâm lát hộp quà đặc biệt", line: "lat", weight: "100 g", age: 6, price: 2080000, unit: "hộp", img: "p12-LDB100", note: "Lát dày, hộp quà biếu.", featured: true },
  { sku: "LL120", name: "Sâm lát loại lớn", line: "lat", weight: "120 g", age: 5, price: 1880000, unit: "lon", img: "p13-LL120", note: "Đóng lon thiếc." },
  { sku: "LB80", name: "Sâm lát bịch 80g", line: "lat", weight: "80 g", age: 5, price: 588000, unit: "bịch", img: "p14-LB80", note: "Đóng bịch hút chân không." },
  { sku: "LH227", name: "Sâm lát hũ 227g", line: "lat", weight: "227 g", age: 5, price: 1480000, unit: "hũ", img: "p15-LH227", note: "Hũ thuỷ tinh, nắp kín." },
  { sku: "NSB14", name: "Bột sâm gói 14g", line: "bot", weight: "14 g", price: 398000, unit: "gói", img: "p17-NSB14", note: "Gói dùng thử." },
  { sku: "NSB114", name: "Bột sâm cao cấp hộp 114g", line: "bot", weight: "114 g", price: 1880000, unit: "hộp", img: "p18-NSB114", note: "Hộp giấy, kèm thìa định lượng.", featured: true },
  { sku: "NSM350", name: "Mật ong nhân sâm 350g", line: "che", weight: "350 g", price: 618000, unit: "hũ", img: "p20-NSM350", note: "Mật ong nguyên chất, lát sâm ngâm.", featured: true },
  { sku: "KC227", name: "Kẹo sâm cứng 227g", line: "che", weight: "227 g", price: 358000, unit: "túi", img: "p21-KC227", note: "Kẹo cứng, vị sâm nhẹ." },
  { sku: "KM227", name: "Kẹo sâm mềm 150g", line: "che", weight: "150 g", price: 358000, unit: "túi", img: "p22-KM227", note: "Kẹo mềm, vị sâm nhẹ." },
  { sku: "NS-CO-400", name: "Cà phê nhân sâm 400g", line: "che", weight: "400 g", price: 328000, unit: "hộp", img: "p23-NS-CO-400", note: "Hoà tan, 20 gói × 20 g." },
  { sku: "NS-TS-400", name: "Trà sữa nhân sâm 400g", line: "che", weight: "400 g", price: 328000, unit: "hộp", img: "p24-NS-TS-400", note: "Hoà tan, 20 gói × 20 g." },
  { sku: "NST60", name: "Trà nhân sâm 60 gói", line: "che", weight: "30 × 2 g", price: 678000, unit: "hộp", img: "p25-NST60", note: "Túi lọc, 30 gói." },
  // Added from the Nov.2025 price list but no packshot supplied yet — uses
  // placeholder-coming-soon.png (see scripts/add-missing-products.mjs).
  { sku: "LH120", name: "Sâm lát hũ 120g", line: "lat", weight: "120 g", price: 1080000, unit: "hũ", img: "placeholder-coming-soon", note: "Hũ nhỏ, tiện mang theo." },
  { sku: "NSCO30", name: "Cà phê nhân sâm không đường 30g", line: "che", weight: "3 g × 10 gói", price: 258000, unit: "hộp", img: "placeholder-coming-soon", note: "Không đường, 10 gói × 3 g." },
  { sku: "SLP50", name: "Siro cây lá phong 50ml", line: "che", weight: "50 ml", price: 228000, unit: "chai", img: "placeholder-coming-soon", note: "Siro nguyên chất từ cây lá phong Canada." },
  { sku: "SLP100", name: "Siro cây lá phong 100ml", line: "che", weight: "100 ml", price: 368000, unit: "chai", img: "placeholder-coming-soon", note: "Siro nguyên chất từ cây lá phong Canada." },
  { sku: "SLP250-AMBER", name: "Siro cây lá phong Amber 250ml", line: "che", weight: "250 ml", price: 518000, unit: "chai", img: "placeholder-coming-soon", note: "Cấp độ Amber, vị đậm hơn." },
  { sku: "SLP1000-AMBER", name: "Siro cây lá phong Amber 1L", line: "che", weight: "1000 ml", price: 1280000, unit: "chai", img: "placeholder-coming-soon", note: "Cấp độ Amber, dùng lâu dài cho gia đình." },
  { sku: "SL1KG", name: "Sâm lát túi 1kg", line: "lat", weight: "1000 g", price: 2728000, unit: "túi", img: "placeholder-coming-soon", note: "Đóng túi số lượng lớn, phù hợp cửa hàng/pha chế." },
  { sku: "RS1KG", name: "Rễ sâm túi 1kg", line: "cu", weight: "1000 g", price: 2448000, unit: "túi", img: "placeholder-coming-soon", note: "Rễ phụ, dùng hãm trà hoặc nấu súp." },
];

export function productImage(img) {
  return `/images/products/${img}.png`;
}

export function formatVnd(value) {
  return new Intl.NumberFormat("vi-VN").format(value) + " ₫";
}
