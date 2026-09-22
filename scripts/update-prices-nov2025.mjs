// One-time price/weight correction against the official Renso Foods price
// list (BẢNG GIÁ NHÂN SÂM _Nov.2025.pdf). Only patches fields that have a
// confident 1:1 match in that document — never touches `age` (tuổi sâm),
// since "Hạn sử dụng" in the PDF is shelf life, not root age.
//
// Usage: node scripts/update-prices-nov2025.mjs

import { config as loadEnv } from "dotenv";
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

// sku -> fields to patch. Source: BẢNG GIÁ NHÂN SÂM _Nov.2025.pdf (Renso Foods).
const UPDATES = {
  HD01: { price: 4800000, weight: "150 g" },
  GB49: { price: 1980000 },
  GB89: { price: 3280000 },
  "GB227-110": { price: 3480000 },
  NGB65: { price: 2180000, unit: "hộp", name: "Hộp quà củ đại 65" },
  KH: { price: 1580000, weight: "227 g" },
  LDB100: { price: 2080000 },
  LL120: { price: 1880000 },
  LH227: { price: 1480000 },
  LB80: { price: 588000 },
  NSB114: { price: 1880000 },
  NSB14: { price: 398000 },
  KC227: { price: 358000 },
  KM227: { price: 358000, weight: "150 g", name: "Kẹo sâm mềm 150g" },
  "NS-TS-400": { price: 328000 },
  "NS-CO-400": { price: 328000 },
  NSM350: { price: 618000 },
  NST60: { price: 678000, weight: "30 × 2 g" },
};

async function run() {
  let updated = 0;
  let missing = [];

  for (const [sku, fields] of Object.entries(UPDATES)) {
    const doc = await client.fetch(`*[_type == "product" && sku.current == $sku][0]{_id, name}`, { sku });
    if (!doc) {
      missing.push(sku);
      continue;
    }
    await client.patch(doc._id).set(fields).commit();
    console.log(`+ ${sku} (${doc.name}) -> ${JSON.stringify(fields)}`);
    updated++;
  }

  console.log(`\nHoàn tất: ${updated} sản phẩm đã cập nhật giá.`);
  if (missing.length) console.log(`Không tìm thấy trong Sanity: ${missing.join(", ")}`);
}

run().catch((err) => {
  console.error("Lỗi:", err.message);
  process.exit(1);
});
