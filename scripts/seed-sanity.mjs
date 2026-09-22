// One-time import of the starter catalogue into Sanity.
// Usage:  node scripts/seed-sanity.mjs
// Requires .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET
// and SANITY_API_TOKEN (an Editor-permission token from manage.sanity.io).
//
// Safe to re-run: products already present (matched by SKU) are skipped.

import { config as loadEnv } from "dotenv";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

loadEnv({ path: path.join(projectRoot, ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Thiếu NEXT_PUBLIC_SANITY_PROJECT_ID hoặc SANITY_API_TOKEN trong .env.local — xem HUONG-DAN-SANITY.md."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-01-01",
  token,
  useCdn: false,
});

// Seed dataset — matches BẢNG GIÁ NHÂN SÂM _Nov.2025.pdf (Renso Foods) where
// a confident match exists. `age` (tuổi sâm) is a separate storytelling
// attribute not sourced from that document — still a placeholder.
const SEED_PRODUCTS = [
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
];

async function seed() {
  console.log(`Đang nạp ${SEED_PRODUCTS.length} sản phẩm vào dataset "${dataset}"...\n`);
  let created = 0;
  let skipped = 0;

  for (const p of SEED_PRODUCTS) {
    const existing = await client.fetch(`*[_type == "product" && sku.current == $sku][0]._id`, { sku: p.sku });
    if (existing) {
      console.log(`- ${p.sku} đã tồn tại, bỏ qua.`);
      skipped++;
      continue;
    }

    const imagePath = path.join(projectRoot, "public", "images", "products", `${p.img}.png`);
    const imageBuffer = await readFile(imagePath);
    const asset = await client.assets.upload("image", imageBuffer, { filename: `${p.img}.png` });

    await client.create({
      _type: "product",
      name: p.name,
      sku: { _type: "slug", current: p.sku },
      line: p.line,
      price: p.price,
      unit: p.unit,
      weight: p.weight,
      age: p.age,
      note: p.note,
      inStock: p.inStock !== false,
      featured: Boolean(p.featured),
      image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    });

    console.log(`+ Đã tạo ${p.sku} — ${p.name}`);
    created++;
  }

  console.log(`\nHoàn tất: ${created} sản phẩm mới, ${skipped} đã có sẵn.`);
  console.log("Mở /studio trên website để xem và chỉnh sửa.");
}

seed().catch((err) => {
  console.error("Có lỗi khi nạp dữ liệu:", err.message);
  process.exit(1);
});
