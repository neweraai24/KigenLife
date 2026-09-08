"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Price from "@/components/ui/Price";
import TickDivider from "@/components/ui/TickDivider";
import Field from "@/components/forms/Field";
import Input from "@/components/forms/Input";
import Textarea from "@/components/forms/Textarea";
import Radio from "@/components/forms/Radio";
import Checkbox from "@/components/forms/Checkbox";
import { useCart } from "@/lib/cart-context";
import { COMPANY, formatVnd, productImage } from "@/lib/products";

const STEPS = ["Giỏ hàng", "Thanh toán", "Xác nhận"];

export default function CheckoutPage() {
  const { lines, subtotal, clear, loaded } = useCart();
  const router = useRouter();
  const [payment, setPayment] = useState("cod");
  const shipping = subtotal >= 2000000 || subtotal === 0 ? 0 : 45000;

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderCode = "KG-" + new Date().getFullYear() + "-" + String(Math.floor(Math.random() * 900000) + 100000);
    try {
      window.sessionStorage.setItem(
        "kigen-last-order",
        JSON.stringify({ code: orderCode, lines, subtotal, shipping, payment })
      );
    } catch {
      // ignore
    }
    clear();
    router.push("/xac-nhan-dat-hang");
  };

  if (loaded && lines.length === 0) {
    return (
      <Container className="max-w-[720px] py-16 text-center">
        <h1 className="mb-4 text-[30px]">Giỏ hàng đang trống</h1>
        <p className="mb-6 text-[17px] text-kg-sage-500">Thêm sản phẩm vào giỏ trước khi thanh toán.</p>
        <Button href="/cua-hang" variant="primary">
          Xem sản phẩm
        </Button>
      </Container>
    );
  }

  return (
    <>
      <header className="flex h-18 items-center justify-between border-b border-kg-sage-500/25 px-5 lg:px-10" style={{ height: 72 }}>
        <div className="hidden w-[220px] lg:block" />
        <Link href="/" className="mx-auto lg:mx-0">
          <Image src="/images/logo-full-transparent.png" alt="KIGEN Life Sciences" height={40} width={160} className="h-10 w-auto" style={{ width: "auto" }} />
        </Link>
        <div className="hidden w-[220px] shrink-0 text-right text-[14px] text-kg-sage-500 lg:block">
          Cần hỗ trợ? {COMPANY.hotlineDisplay}
        </div>
      </header>

      <div className="mx-auto flex max-w-[560px] items-center justify-center gap-3 py-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            {i > 0 && <div className="h-px w-10 bg-kg-brass-600/40" />}
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full font-mono text-[15px] ${
                  i <= 1 ? "bg-kg-moss-700 text-kg-ivory-50" : "border border-kg-sage-500/40 text-kg-sage-500"
                }`}
              >
                {i < 1 ? "✓" : i + 1}
              </div>
              <span className={`text-[13px] ${i === 1 ? "font-semibold text-kg-moss-900" : "text-kg-sage-500"}`}>{s}</span>
            </div>
          </div>
        ))}
      </div>

      <Container className="pb-18">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-14 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="flex flex-col gap-8">
            <div>
              <div className="mb-4 text-[15px] font-semibold text-kg-moss-900">Thông tin người nhận</div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field label="Họ và tên" htmlFor="f-name" required>
                  <Input id="f-name" placeholder="Nguyễn Văn A" required />
                </Field>
                <Field label="Số điện thoại" htmlFor="f-phone" required>
                  <Input id="f-phone" inputMode="tel" placeholder="09xxxxxxxx" required />
                </Field>
                <Field label="Email (không bắt buộc)" htmlFor="f-email" className="md:col-span-2">
                  <Input id="f-email" type="email" placeholder="ban@vidu.com" />
                </Field>
              </div>
            </div>

            <TickDivider spacing={12} />

            <div>
              <div className="mb-4 text-[15px] font-semibold text-kg-moss-900">Địa chỉ giao hàng</div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field label="Tỉnh/Thành phố" htmlFor="f-province" required>
                  <Input id="f-province" placeholder="Khánh Hòa" required />
                </Field>
                <Field label="Phường/Xã" htmlFor="f-ward" required>
                  <Input id="f-ward" placeholder="Nha Trang" required />
                </Field>
                <Field label="Địa chỉ chi tiết" htmlFor="f-address" className="md:col-span-2" required>
                  <Input id="f-address" placeholder="Số nhà, tên đường, khu vực" required />
                </Field>
                <Field label="Ghi chú cho người giao" htmlFor="f-note" className="md:col-span-2">
                  <Textarea id="f-note" rows={3} placeholder="Ví dụ: giao trước 17h, gọi trước khi đến." />
                </Field>
              </div>
            </div>

            <TickDivider spacing={12} />

            <div>
              <div className="mb-4 text-[15px] font-semibold text-kg-moss-900">Phương thức thanh toán</div>
              <div className="flex flex-col gap-3">
                <Radio
                  id="pay-cod"
                  name="pay"
                  label="Thanh toán khi nhận hàng"
                  description="Áp dụng toàn quốc."
                  checked={payment === "cod"}
                  onChange={() => setPayment("cod")}
                />
                <Radio
                  id="pay-bank"
                  name="pay"
                  label="Chuyển khoản trước"
                  description="KIGEN gửi chứng nhận lô hàng trước khi Quý khách chuyển tiền."
                  checked={payment === "bank"}
                  onChange={() => setPayment("bank")}
                />
              </div>
            </div>
          </div>

          <Card accentTop className="h-fit lg:sticky lg:top-30">
            <div className="kg-eyebrow">ĐƠN HÀNG</div>
            <div className="my-4 flex flex-col gap-3">
              {lines.map((item) => (
                <div key={item.sku} className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 border border-kg-sage-500/25 bg-kg-moss-900/[0.04]">
                    <Image src={productImage(item.img)} alt="" fill sizes="48px" className="object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] text-kg-moss-900">{item.name}</div>
                    <div className="font-mono text-[12px] text-kg-sage-500">SL: {item.qty}</div>
                  </div>
                  <div className="whitespace-nowrap font-mono text-[14px] text-kg-moss-900">
                    {formatVnd(item.price * item.qty)}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 border-t border-kg-sage-500/25 pt-4 text-[17px]">
              <div className="flex justify-between gap-4">
                <span className="text-[15px] text-kg-sage-500">Tiền hàng</span>
                <span className="font-mono">{formatVnd(subtotal)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[15px] text-kg-sage-500">Vận chuyển</span>
                <span className="font-mono">{shipping === 0 ? "Miễn phí" : formatVnd(shipping)}</span>
              </div>
              <div className="flex justify-between gap-4 border-t border-kg-brass-600 pt-3">
                <span>Tổng</span>
                <Price value={subtotal + shipping} />
              </div>
            </div>
            <Checkbox id="c-gift" label="Gói hộp quà biếu (miễn phí)" className="mt-4" />
            <Button type="submit" variant="primary" fullWidth size="lg" className="mt-6">
              Đặt hàng
            </Button>
            <p className="mt-4 text-[14px] leading-[1.5] text-kg-sage-500">
              Nhân viên KIGEN gọi lại xác nhận trong giờ hành chính. Chưa trừ tiền ở bước này.
            </p>
          </Card>
        </form>
      </Container>
    </>
  );
}
