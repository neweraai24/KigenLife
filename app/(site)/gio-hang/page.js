"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Price from "@/components/ui/Price";
import ComplianceNotice from "@/components/ui/ComplianceNotice";
import QuantityStepper from "@/components/forms/QuantityStepper";
import { useCart } from "@/lib/cart-context";
import { formatVnd, productImage } from "@/lib/products";

export default function CartPage() {
  const { lines, subtotal, setQty, remove, loaded } = useCart();
  const shipping = subtotal >= 2000000 || subtotal === 0 ? 0 : 45000;

  return (
    <Container className="pt-6 pb-18">
      <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Giỏ hàng" }]} className="mb-5" />
      <h1 className="mb-10 text-[34px] md:text-[40px]">Giỏ hàng</h1>

      {!loaded ? null : lines.length === 0 ? (
        <Card tone="inset" className="p-10">
          <p className="mb-5 text-[17px]">Giỏ hàng chưa có sản phẩm nào.</p>
          <Button href="/cua-hang" variant="primary">
            Xem 25 sản phẩm
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="border-b border-kg-brass-600">
                  {["Sản phẩm", "Số lượng", "Thành tiền", ""].map((h, i) => (
                    <th
                      key={h + i}
                      className={`pb-3 font-mono text-[13px] font-normal uppercase tracking-[0.14em] text-kg-brass-600 ${
                        i === 0 ? "text-left" : "text-right"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lines.map((item) => (
                  <tr key={item.sku} className="border-b border-kg-sage-500/25">
                    <td className="py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative h-[88px] w-[88px] shrink-0 border border-kg-sage-500/25 bg-kg-moss-900/[0.04]">
                          <Image src={productImage(item.img)} alt="" fill sizes="88px" className="object-contain" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="font-display text-[24px] font-semibold leading-[1.15] text-kg-moss-900">
                            {item.name}
                          </span>
                          <span className="font-mono text-[15px] text-kg-sage-500">
                            {item.sku} · {item.weight}
                          </span>
                          <Price value={item.price} unit={item.unit} size="sm" />
                        </div>
                      </div>
                    </td>
                    <td className="py-5 text-right">
                      <div className="flex justify-end">
                        <QuantityStepper value={item.qty} onChange={(n) => setQty(item.sku, n)} max={10} />
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-5 text-right font-mono text-[17px] text-kg-moss-900">
                      {formatVnd(item.price * item.qty)}
                    </td>
                    <td className="py-5 text-right">
                      <button
                        type="button"
                        aria-label={`Xoá ${item.name}`}
                        onClick={() => remove(item.sku)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded text-kg-moss-900 hover:bg-kg-moss-900/[0.04]"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Card accentTop className="lg:sticky lg:top-30">
            <div className="kg-eyebrow">TẠM TÍNH</div>
            <div className="my-4 flex flex-col gap-3 text-[17px]">
              <div className="flex justify-between gap-4">
                <span className="text-[15px] text-kg-sage-500">Tiền hàng</span>
                <span className="whitespace-nowrap font-mono">{formatVnd(subtotal)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[15px] text-kg-sage-500">Vận chuyển</span>
                <span className="whitespace-nowrap font-mono">{shipping === 0 ? "Miễn phí" : formatVnd(shipping)}</span>
              </div>
              <div className="flex justify-between gap-4 border-t border-kg-brass-600 pt-3">
                <span>Tổng</span>
                <Price value={subtotal + shipping} />
              </div>
            </div>
            <Button href="/thanh-toan" variant="primary" fullWidth size="lg" className="mt-2">
              Tiến hành thanh toán
            </Button>
            <p className="mt-4 text-[15px] leading-[1.5] text-kg-sage-500">
              Miễn phí vận chuyển cho đơn từ 2.000.000 ₫. Thanh toán khi nhận hàng hoặc chuyển khoản trước.
            </p>
          </Card>
        </div>
      )}

      <ComplianceNotice className="mt-12" />
    </Container>
  );
}
