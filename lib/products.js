// Catalogue data for the KIGEN storefront.
// Names, weights and images are derived from the supplied packshot filenames.
// PRICES ARE PLACEHOLDERS — replace with the real price list before public use.

export const COMPANY = {
  name: "CÔNG TY TNHH KIGEN LIFE SCIENCES",
  address: "Số 52 Đường Phan Bội Châu, Phường Nha Trang, Tỉnh Khánh Hòa, Việt Nam",
  taxId: "4202060584",
  hotline: "0866228685",
  hotlineDisplay: "0866 228 685",
};

export const LINES = [
  { id: "all", label: "Tất cả 25 sản phẩm" },
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

export const PRODUCTS = [
  { sku: "HD01", name: "Củ nguyên hộp da", line: "cu", weight: "1 kg", age: 5, price: 9850000, unit: "hộp", img: "p01-HD01", note: "Hộp da, củ nguyên chọn tay." },
  { sku: "GB49", name: "Hộp quà củ đại 49", line: "cu", weight: "227 g", age: 5, price: 4250000, unit: "hộp", img: "p02-GB49", note: "Khoảng 14–16 củ mỗi hộp." },
  { sku: "GB59", name: "Hộp quà củ đại 59", line: "cu", weight: "227 g", age: 5, price: 4650000, unit: "hộp", img: "p03-GB59", note: "Khoảng 12–14 củ mỗi hộp." },
  { sku: "NGB65", name: "Củ đại rời 65", line: "cu", weight: "227 g", age: 5, price: 4380000, unit: "túi", img: "p04-NGB65", note: "Đóng túi, không hộp quà." },
  { sku: "GB79", name: "Hộp quà củ đại 79", line: "cu", weight: "227 g", age: 6, price: 5150000, unit: "hộp", img: "p05-GB79", note: "Khoảng 10–12 củ mỗi hộp." },
  { sku: "GB89", name: "Hộp quà củ đại 89", line: "cu", weight: "227 g", age: 6, price: 5680000, unit: "hộp", img: "p06-GB89", note: "Củ lớn, 8–10 củ mỗi hộp." },
  { sku: "NGB89", name: "Củ đại rời 89", line: "cu", weight: "227 g", age: 6, price: 5320000, unit: "túi", img: "p07-NGB89", note: "Đóng túi, không hộp quà." },
  { sku: "GB150-110", name: "Hộp quà củ đại 150g", line: "cu", weight: "150 g", age: 6, price: 4120000, unit: "hộp", img: "p08-GB150-110", note: "Cỡ 110 củ/pound." },
  { sku: "GB227-110", name: "Hộp quà củ đại 227g", line: "cu", weight: "227 g", age: 6, price: 6250000, unit: "hộp", img: "p09-GB227-110", note: "Cỡ 110 củ/pound. Khoảng 10–12 củ." },
  { sku: "KH", name: "Củ đại khô loại thường", line: "cu", weight: "500 g", age: 4, price: 3450000, unit: "túi", img: "p10-KH", note: "Sấy khô tự nhiên." },
  { sku: "KH39", name: "Củ đại khô 39", line: "cu", weight: "227 g", age: 4, price: 2980000, unit: "túi", img: "p11-KH39", inStock: false, note: "Sấy khô tự nhiên." },
  { sku: "LDB100", name: "Sâm lát hộp quà đặc biệt", line: "lat", weight: "100 g", age: 6, price: 3250000, unit: "hộp", img: "p12-LDB100", note: "Lát dày, hộp quà biếu." },
  { sku: "LL120", name: "Sâm lát loại lớn", line: "lat", weight: "120 g", age: 5, price: 2450000, unit: "lon", img: "p13-LL120", note: "Đóng lon thiếc." },
  { sku: "LB80", name: "Sâm lát bịch 80g", line: "lat", weight: "80 g", age: 5, price: 1580000, unit: "bịch", img: "p14-LB80", note: "Đóng bịch hút chân không." },
  { sku: "LH227", name: "Sâm lát hũ 227g", line: "lat", weight: "227 g", age: 5, price: 3980000, unit: "hũ", img: "p15-LH227", note: "Hũ thuỷ tinh, nắp kín." },
  { sku: "NSB75", name: "Bột sâm cao cấp gói 75g", line: "bot", weight: "75 g", price: 1450000, unit: "gói", img: "p16-NSB75", note: "Nghiền từ củ nguyên." },
  { sku: "NSB14", name: "Bột sâm gói 14g", line: "bot", weight: "14 g", price: 320000, unit: "gói", img: "p17-NSB14", note: "Gói dùng thử." },
  { sku: "NSB114", name: "Bột sâm cao cấp hộp 114g", line: "bot", weight: "114 g", price: 2180000, unit: "hộp", img: "p18-NSB114", note: "Hộp giấy, kèm thìa định lượng." },
  { sku: "NSB114-GOLD", name: "Bột sâm cao cấp Gold 114g", line: "bot", weight: "114 g", price: 2860000, unit: "hộp", img: "p19-NSB114-GOLD", note: "Chọn củ từ 6 năm tuổi." },
  { sku: "NSM350", name: "Mật ong nhân sâm 350g", line: "che", weight: "350 g", price: 890000, unit: "hũ", img: "p20-NSM350", note: "Mật ong nguyên chất, lát sâm ngâm." },
  { sku: "KC227", name: "Kẹo sâm cứng 227g", line: "che", weight: "227 g", price: 320000, unit: "túi", img: "p21-KC227", note: "Kẹo cứng, vị sâm nhẹ." },
  { sku: "KM227", name: "Kẹo sâm mềm 227g", line: "che", weight: "227 g", price: 350000, unit: "túi", img: "p22-KM227", note: "Kẹo mềm, vị sâm nhẹ." },
  { sku: "NS-CO-400", name: "Cà phê nhân sâm 400g", line: "che", weight: "400 g", price: 480000, unit: "hộp", img: "p23-NS-CO-400", note: "Hoà tan, 20 gói × 20 g." },
  { sku: "NS-TS-400", name: "Trà sữa nhân sâm 400g", line: "che", weight: "400 g", price: 480000, unit: "hộp", img: "p24-NS-TS-400", note: "Hoà tan, 20 gói × 20 g." },
  { sku: "NST60", name: "Trà nhân sâm 60 gói", line: "che", weight: "60 × 3 g", price: 520000, unit: "hộp", img: "p25-NST60", note: "Túi lọc, 60 gói." },
];

export function findProduct(sku) {
  return PRODUCTS.find((p) => p.sku.toLowerCase() === String(sku).toLowerCase());
}

export function productImage(img) {
  return `/images/products/${img}.png`;
}

export function formatVnd(value) {
  return new Intl.NumberFormat("vi-VN").format(value) + " ₫";
}
