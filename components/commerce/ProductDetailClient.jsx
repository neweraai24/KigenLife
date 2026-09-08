"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import GinsengRing from "@/components/ui/GinsengRing";
import Price from "@/components/ui/Price";
import TickDivider from "@/components/ui/TickDivider";
import SectionHead from "@/components/ui/SectionHead";
import ComplianceNotice from "@/components/ui/ComplianceNotice";
import Alert from "@/components/ui/Alert";
import Checkbox from "@/components/forms/Checkbox";
import QuantityStepper from "@/components/forms/QuantityStepper";
import SpecTable from "@/components/commerce/SpecTable";
import OriginTimeline from "@/components/commerce/OriginTimeline";
import ProductCard from "@/components/commerce/ProductCard";
import { useCart } from "@/lib/cart-context";
import { COMPANY, productImage } from "@/lib/products";

const TABS = [
  { value: "info", label: "Thông số" },
  { value: "use", label: "Cách dùng" },
  { value: "origin", label: "Nguồn gốc" },
  { value: "ship", label: "Vận chuyển" },
];

export default function ProductDetailClient({ product, related, thumbSkus }) {
  const { add } = useCart();
  const [tab, setTab] = useState("info");
  const [qty, setQty] = useState(1);
  const [certOpen, setCertOpen] = useState(false);
  const [activeThumb, setActiveThumb] = useState(product.img);
  const [added, setAdded] = useState(false);

  const inStock = product.inStock !== false;

  const infoRows = [
    { label: "Tên khoa học", value: "Panax quinquefolius" },
    { label: "Xuất xứ", value: "Ontario, Canada" },
    { label: "Trang trại", value: "Great Mountain Ginseng (từ 1976)" },
    { label: "Năm thu hoạch", value: product.age ? `Năm thứ ${product.age}` : "Nguyên liệu từ củ 5 năm" },
    { label: "Khối lượng tịnh", value: product.weight, mono: true },
    { label: "Mã sản phẩm", value: product.sku, mono: true },
    { label: "Số công bố", value: "4202060584", mono: true },
    { label: "Số lô", value: "LOT-ON-2025-11", mono: true },
    { label: "Bảo quản", value: "Nơi khô ráo, dưới 25 °C, tránh ánh nắng trực tiếp" },
  ];

  const shipRows = [
    { label: "Nội tỉnh Khánh Hòa", value: "1 ngày làm việc" },
    { label: "Toàn quốc", value: "2–4 ngày làm việc" },
    { label: "Phí vận chuyển", value: "Miễn phí với đơn từ 2.000.000 ₫" },
    { label: "Thanh toán", value: "Chuyển khoản hoặc thanh toán khi nhận hàng" },
  ];

  const originItems = [
    { year: "1976", title: "Trang trại thành lập", body: "Great Mountain Ginseng bắt đầu canh tác tại Ontario, Canada.", tick: 0 },
    {
      year: `Năm thứ ${product.age || 5}`,
      title: "Thu hoạch",
      body: `Củ đạt ${(product.age || 5) - 1} vết sẹo thân, được rửa và phân loại theo số củ/pound.`,
      tick: (product.age || 5) - 2,
    },
    { year: "2025", title: "Nhập khẩu chính ngạch", body: "Lô LOT-ON-2025-11 thông quan, kèm chứng nhận xuất xứ và kết quả kiểm nghiệm.", tick: 5 },
  ];

  return (
    <>
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="relative aspect-square w-full border border-kg-sage-500/25 bg-kg-moss-900/[0.04]">
            <Image src={productImage(activeThumb)} alt={product.name} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-contain" />
            {product.age != null && (
              <span className="absolute right-4 top-4 rounded-full bg-kg-white">
                <GinsengRing age={product.age} size={56} />
              </span>
            )}
          </div>
          <div className="mt-3 flex gap-3">
            {[product.img, ...thumbSkus].map((t, i) => (
              <button
                key={t + i}
                type="button"
                onClick={() => setActiveThumb(t)}
                className={`relative h-[92px] w-[92px] border bg-kg-moss-900/[0.04] ${
                  activeThumb === t ? "border-kg-brass-600" : "border-kg-sage-500/25"
                }`}
              >
                <Image src={productImage(t)} alt="" fill sizes="92px" className="object-contain" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 flex gap-3">
            <Badge variant="cert">PRODUCT OF CANADA</Badge>
            <Badge variant={inStock ? "success" : "error"}>{inStock ? "Còn hàng" : "Hết hàng"}</Badge>
          </div>
          <h1 className="m-0 text-[32px] md:text-[40px]">{product.name}</h1>
          <div className="mt-3 flex flex-wrap gap-4 font-mono text-[15px] text-kg-sage-500">
            <span>{product.sku}</span>
            <span>·</span>
            <span>{product.weight}</span>
            {product.age && (
              <>
                <span>·</span>
                <span>năm thứ {product.age}</span>
              </>
            )}
          </div>
          <p className="mt-5 text-[17px] leading-[1.65]">
            {product.note} Hàng nhập khẩu chính ngạch, có chứng nhận xuất xứ theo lô. Sản phẩm hỗ trợ bồi bổ cơ thể, dùng cho người trưởng thành.
          </p>

          <div className="mt-7 border-t border-kg-brass-600 pt-6">
            <Price value={product.price} unit={product.unit} size="lg" />
            <div className="mt-6 flex items-center gap-5">
              <QuantityStepper value={qty} onChange={setQty} max={10} />
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                disabled={!inStock}
                onClick={() => {
                  add(product.sku, qty);
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1600);
                }}
              >
                {added ? "Đã thêm vào giỏ" : "Thêm vào giỏ"}
              </Button>
            </div>
            <div className="mt-4 flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setCertOpen(true)}>
                Xem chứng nhận
              </Button>
              <Button variant="secondary" as="a" href={`tel:${COMPANY.hotline}`} className="flex-1">
                <Phone size={18} /> Gọi {COMPANY.hotlineDisplay}
              </Button>
            </div>
            <Checkbox id="giftwrap" label="Gói hộp quà biếu (miễn phí)" className="mt-5" />
          </div>
          <ComplianceNotice className="mt-6" />
        </div>
      </div>

      <section className="mt-18">
        <div className="flex gap-8 overflow-x-auto border-b border-kg-sage-500/25">
          {TABS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTab(t.value)}
              className={`whitespace-nowrap border-b-2 py-3 text-[16px] ${
                tab === t.value
                  ? "border-kg-moss-700 font-semibold text-kg-moss-900"
                  : "border-transparent text-kg-sage-500"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-14 pt-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            {tab === "info" && <SpecTable rows={infoRows} />}
            {tab === "use" && (
              <div className="flex flex-col gap-5">
                <p className="text-[17px] leading-[1.65]">
                  Người trưởng thành dùng 2–4 g mỗi ngày. Hãm với nước ấm dưới 70 °C trong 10 phút, dùng cả nước và lát sâm. Không dùng cho người dưới 18 tuổi, phụ nữ có thai, người đang dùng thuốc chống đông máu.
                </p>
                <Alert variant="info" title="Sản phẩm hỗ trợ, không phải thuốc">
                  KIGEN không tư vấn liều điều trị. Quý khách có bệnh lý nền nên hỏi ý kiến chuyên môn trước khi dùng.
                </Alert>
              </div>
            )}
            {tab === "origin" && <OriginTimeline items={originItems} />}
            {tab === "ship" && <SpecTable rows={shipRows} />}
          </div>
          <Card tone="inset" accentTop>
            <div className="kg-eyebrow">KIỂM TRA TRƯỚC KHI ĐẶT</div>
            <p className="my-3 text-[17px] leading-[1.65]">
              KIGEN gửi bản chụp chứng nhận xuất xứ và phiếu kiểm nghiệm của lô hàng trước khi Quý khách chuyển tiền.
            </p>
            <Button variant="secondary" fullWidth onClick={() => setCertOpen(true)}>
              Xem chứng nhận lô LOT-ON-2025-11
            </Button>
          </Card>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-18">
          <TickDivider withRule className="mb-8" />
          <SectionHead eyebrow="CÙNG DÒNG" title="Sản phẩm liên quan" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((r) => (
              <ProductCard key={r.sku} product={r} />
            ))}
          </div>
        </section>
      )}

      {certOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-kg-moss-900/42 p-5"
          onClick={() => setCertOpen(false)}
        >
          <div
            className="w-full max-w-[560px] rounded bg-kg-white p-6 shadow-[0_2px_12px_rgba(39,53,31,0.08)]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-[24px]">Chứng nhận lô LOT-ON-2025-11</h3>
            <SpecTable
              rows={[
                { label: "Giấy chứng nhận xuất xứ", value: "CO/CA/2025/11-0842", mono: true },
                { label: "Phiếu kiểm nghiệm", value: "QT-2025-11-0117", mono: true },
                { label: "Số công bố sản phẩm", value: "4202060584", mono: true },
                { label: "Ngày thông quan", value: "18/11/2025" },
              ]}
            />
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setCertOpen(false)}>
                Đóng
              </Button>
              <Button variant="primary" onClick={() => setCertOpen(false)}>
                Yêu cầu bản chụp
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
