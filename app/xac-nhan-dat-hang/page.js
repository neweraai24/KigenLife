"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ComplianceNotice from "@/components/ui/ComplianceNotice";
import GinsengRing from "@/components/ui/GinsengRing";
import { COMPANY, formatVnd } from "@/lib/products";

const TIMELINE = [
  { label: "Đã đặt", state: "done" },
  { label: "Đang xác nhận", state: "current" },
  { label: "Đang giao", state: "todo" },
  { label: "Đã nhận", state: "todo" },
];

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("kigen-last-order");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from sessionStorage, unavailable during SSR
      setOrder(raw ? JSON.parse(raw) : null);
    } catch {
      setOrder(null);
    }
  }, []);

  if (order === undefined) return null;

  if (!order) {
    return (
      <Container className="max-w-[640px] py-20 text-center">
        <h1 className="mb-4 text-[30px]">Không tìm thấy đơn hàng</h1>
        <p className="mb-6 text-[17px] text-kg-sage-500">
          Đơn hàng có thể đã được xác nhận trước đó, hoặc Quý khách chưa đặt hàng nào trong phiên này.
        </p>
        <Button href="/cua-hang" variant="primary">
          Xem sản phẩm
        </Button>
      </Container>
    );
  }

  const total = order.subtotal + order.shipping;

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

      <Container className="max-w-[720px] py-16 text-center">
        <div className="mb-7 flex justify-center">
          <span className="relative flex h-[120px] w-[120px] items-center justify-center rounded-full border-[1.5px] border-kg-brass-600 text-kg-confirm-600">
            <Check size={40} strokeWidth={2.4} />
          </span>
        </div>
        <h1 className="mb-3 text-[36px] md:text-[40px]">Đã nhận đơn hàng</h1>
        <p className="mb-6 text-[18px] text-kg-moss-900">KIGEN sẽ gọi xác nhận trong vòng 2 giờ làm việc.</p>
        <div className="inline-flex items-center gap-3 rounded border border-kg-brass-600 px-7 py-4">
          <span className="font-mono text-[22px] text-kg-moss-900">{order.code}</span>
          <button
            type="button"
            onClick={() => {
              if (navigator.clipboard) navigator.clipboard.writeText(order.code).catch(() => {});
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            }}
            className="text-[13px] font-medium text-kg-moss-700 underline"
          >
            {copied ? "Đã sao chép" : "Sao chép"}
          </button>
        </div>
      </Container>

      <Container className="max-w-[720px]">
        <div className="rounded border border-kg-sage-500/25 bg-kg-white p-6">
          <div className="flex flex-col gap-1">
            {order.lines.map((item) => (
              <div key={item.sku} className="flex items-center gap-4 py-2.5">
                <div className="relative h-14 w-14 shrink-0 border border-kg-sage-500/20 bg-kg-white">
                  {item.imageUrl && <Image src={item.imageUrl} alt="" fill sizes="56px" className="object-contain" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] leading-[1.35] text-kg-moss-900">{item.name}</div>
                  <div className="mt-0.5 font-mono text-[13px] text-kg-sage-500">Số lượng: {item.qty}</div>
                </div>
                <div className="whitespace-nowrap font-mono text-[15px] text-kg-moss-900">
                  {formatVnd(item.price * item.qty)}
                </div>
              </div>
            ))}
          </div>
          <div className="my-4 h-1.5" style={{ backgroundImage: "repeating-linear-gradient(90deg, #C2A552 0 2px, transparent 2px 12px)" }} />
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            <div>
              <div className="mb-1.5 font-mono text-[13px] uppercase tracking-[0.08em] text-kg-sage-500">Thanh toán</div>
              <div className="text-[15px] leading-[1.5] text-kg-moss-900">
                {order.payment === "bank" ? "Chuyển khoản ngân hàng" : "Khi nhận hàng"}
              </div>
            </div>
            <div>
              <div className="mb-1.5 font-mono text-[13px] uppercase tracking-[0.08em] text-kg-sage-500">Trạng thái</div>
              <div className="text-[15px] leading-[1.5] text-kg-moss-900">Chờ xác nhận</div>
            </div>
            <div>
              <div className="mb-1.5 font-mono text-[13px] uppercase tracking-[0.08em] text-kg-sage-500">Dự kiến giao</div>
              <div className="text-[15px] leading-[1.5] text-kg-moss-900">2–4 ngày làm việc</div>
            </div>
            <div>
              <div className="mb-1.5 font-mono text-[13px] uppercase tracking-[0.08em] text-kg-sage-500">Tổng cộng</div>
              <div className="font-display text-[26px] font-semibold text-kg-brass-600">{formatVnd(total)}</div>
            </div>
          </div>
        </div>
      </Container>

      <Container className="max-w-[720px] py-10">
        <div className="flex items-start">
          {TIMELINE.map((s, i) => (
            <div key={s.label} className="flex flex-1 items-start last:flex-none">
              <div className="flex flex-col items-center gap-2 text-center">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full font-mono text-[16px] ${
                    s.state === "done"
                      ? "bg-kg-moss-700 text-kg-ivory-50"
                      : s.state === "current"
                        ? "border-2 border-kg-gold-500 bg-kg-white text-kg-moss-900"
                        : "border border-kg-sage-500/40 text-kg-sage-500"
                  }`}
                >
                  {s.state === "done" ? "✓" : i + 1}
                </div>
                <span className="whitespace-nowrap text-[13px] text-kg-moss-900">{s.label}</span>
              </div>
              {i < TIMELINE.length - 1 && (
                <div
                  className="mx-2 mt-5 h-0.5 flex-1"
                  style={{ backgroundImage: "repeating-linear-gradient(90deg, #9B8B4F 0 6px, transparent 6px 14px)" }}
                />
              )}
            </div>
          ))}
        </div>
      </Container>

      <Container className="flex max-w-[720px] flex-wrap gap-4 pb-8">
        <Button href="/tai-khoan" variant="primary" size="lg" className="flex-1">
          Theo dõi đơn hàng
        </Button>
        <Button href="/cua-hang" variant="secondary" size="lg" className="flex-1">
          Tiếp tục mua sắm
        </Button>
      </Container>

      {order.payment === "bank" && (
        <Container className="max-w-[720px] pb-8">
          <div className="flex flex-col gap-3 border-l-[3px] border-kg-brass-600 bg-kg-moss-900/[0.04] p-6">
            <div className="text-[17px] font-semibold text-kg-moss-900">Hướng dẫn chuyển khoản</div>
            <div className="flex flex-wrap justify-between gap-3">
              <span className="text-[15px] text-kg-moss-900">Ngân hàng</span>
              <span className="text-right text-[15px] font-medium text-kg-moss-900">Vietcombank — Chi nhánh Khánh Hòa</span>
            </div>
            <div className="flex flex-wrap justify-between gap-3">
              <span className="text-[15px] text-kg-moss-900">Số tài khoản</span>
              <span className="font-mono text-[20px] text-kg-moss-900">0071000123456</span>
            </div>
            <div className="flex flex-wrap justify-between gap-3">
              <span className="text-[15px] text-kg-moss-900">Chủ tài khoản</span>
              <span className="text-right text-[15px] font-medium text-kg-moss-900">{COMPANY.name}</span>
            </div>
            <div className="flex flex-wrap justify-between gap-3">
              <span className="text-[15px] text-kg-moss-900">Nội dung chuyển khoản</span>
              <span className="font-mono text-[20px] text-kg-moss-900">{order.code}</span>
            </div>
            <div className="mt-1 text-[14px] text-kg-sage-500">
              Đơn hàng được xử lý sau khi KIGEN nhận được thanh toán.
            </div>
          </div>
        </Container>
      )}

      <p className="pb-8 text-center text-[15px] text-kg-moss-900">
        Cần hỗ trợ? Gọi {COMPANY.hotlineDisplay} hoặc nhắn Zalo.
      </p>

      <Container className="pb-16">
        <ComplianceNotice />
      </Container>
    </>
  );
}
