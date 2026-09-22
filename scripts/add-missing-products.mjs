// Adds the 8 SKUs from BẢNG GIÁ NHÂN SÂM _Nov.2025.pdf that had no product
// on the site yet. Uses a shared on-brand "ảnh đang cập nhật" placeholder
// (public/images/products/placeholder-coming-soon.png) until real packshots
// are supplied — swap the image per product any time in /studio.
//
// Usage: node scripts/add-missing-products.mjs

import { config as loadEnv } from "dotenv";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
loadEnv({ path: path.join(projectRoot, ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const NEW_PRODUCTS = [
  { sku: "LH120", name: "Sâm lát hũ 120g", line: "lat", weight: "120 g", price: 1080000, unit: "hũ", note: "Hũ nhỏ, tiện mang theo." },
  { sku: "NSCO30", name: "Cà phê nhân sâm không đường 30g", line: "che", weight: "3 g × 10 gói", price: 258000, unit: "hộp", note: "Không đường, 10 gói × 3 g." },
  { sku: "SLP50", name: "Siro cây lá phong 50ml", line: "che", weight: "50 ml", price: 228000, unit: "chai", note: "Siro nguyên chất từ cây lá phong Canada." },
  { sku: "SLP100", name: "Siro cây lá phong 100ml", line: "che", weight: "100 ml", price: 368000, unit: "chai", note: "Siro nguyên chất từ cây lá phong Canada." },
  { sku: "SLP250-AMBER", name: "Siro cây lá phong Amber 250ml", line: "che", weight: "250 ml", price: 518000, unit: "chai", note: "Cấp độ Amber, vị đậm hơn." },
  { sku: "SLP1000-AMBER", name: "Siro cây lá phong Amber 1L", line: "che", weight: "1000 ml", price: 1280000, unit: "chai", note: "Cấp độ Amber, dùng lâu dài cho gia đình." },
  { sku: "SL1KG", name: "Sâm lát túi 1kg", line: "lat", weight: "1000 g", price: 2728000, unit: "túi", note: "Đóng túi số lượng lớn, phù hợp cửa hàng/pha chế." },
  { sku: "RS1KG", name: "Rễ sâm túi 1kg", line: "cu", weight: "1000 g", price: 2448000, unit: "túi", note: "Rễ phụ, dùng hãm trà hoặc nấu súp." },
];

async function run() {
  const buf = await readFile(path.join(projectRoot, "public/images/products/placeholder-coming-soon.png"));
  const asset = await client.assets.upload("image", buf, { filename: "placeholder-coming-soon.png" });
  console.log("Đã tải ảnh tạm lên Sanity.\n");

  for (const p of NEW_PRODUCTS) {
    const existing = await client.fetch(`*[_type == "product" && sku.current == $sku][0]._id`, { sku: p.sku });
    if (existing) {
      console.log(`- ${p.sku} đã tồn tại, bỏ qua.`);
      continue;
    }
    await client.create({
      _type: "product",
      name: p.name,
      sku: { _type: "slug", current: p.sku },
      line: p.line,
      price: p.price,
      unit: p.unit,
      weight: p.weight,
      note: p.note,
      inStock: true,
      featured: false,
      image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    });
    console.log(`+ Đã tạo ${p.sku} — ${p.name}`);
  }

  console.log("\nHoàn tất. Vào /studio để thay ảnh thật khi có.");
}

run().catch((err) => {
  console.error("Lỗi:", err.message);
  process.exit(1);
});
