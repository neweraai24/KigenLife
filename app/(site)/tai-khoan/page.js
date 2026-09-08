"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ComplianceNotice from "@/components/ui/ComplianceNotice";
import { productImage } from "@/lib/products";

const MENU = [
  { key: "overview", label: "Tổng quan" },
  { key: "orders", label: "Đơn hàng của tôi" },
  { key: "addresses", label: "Sổ địa chỉ" },
  { key: "saved", label: "Sản phẩm đã lưu" },
  { key: "account", label: "Thông tin tài khoản" },
];

const STATS = [
  { label: "Đơn đang giao", value: "1" },
  { label: "Đơn đã hoàn tất", value: "7" },
  { label: "Tổng chi tiêu", value: "48.320.000 ₫" },
];

const TABS = [
  { key: "all", label: "Tất cả (8)" },
  { key: "pending", label: "Chờ xác nhận (0)" },
  { key: "shipping", label: "Đang giao (1)" },
  { key: "delivered", label: "Đã nhận (7)" },
  { key: "cancelled", label: "Đã hủy (0)" },
];

const ORDERS = [
  { code: "KG-2026-004182", date: "08/09/2026", status: "shipping", total: "9.860.000 ₫", thumbs: ["p01-HD01", "p12-LDB100", "p25-NST60"] },
  { code: "KG-2026-003950", date: "02/09/2026", status: "delivered", total: "5.040.000 ₫", thumbs: ["p18-NSB114", "p20-NSM350"], extra: 2 },
  { code: "KG-2026-003820", date: "20/08/2026", status: "delivered", total: "4.250.000 ₫", thumbs: ["p02-GB49"] },
];

const STATUS_LOOK = {
  shipping: { label: "Đang giao", classes: "bg-kg-gold-500/20 border-kg-gold-500 text-kg-brass-600" },
  delivered: { label: "Đã nhận", classes: "bg-kg-confirm-600/15 border-kg-confirm-600/50 text-kg-confirm-600" },
  cancelled: { label: "Đã hủy", classes: "bg-kg-alert-600/12 border-kg-alert-600/50 text-kg-alert-600" },
};

export default function AccountPage() {
  const [menu, setMenu] = useState("orders");
  const [tab, setTab] = useState("all");

  const filtered = ORDERS.filter((o) => tab === "all" || o.status === tab);
  const showEmpty = tab === "pending";

  return (
    <>
    <Container className="flex flex-col gap-6 py-6 pb-12 md:flex-row md:items-start md:gap-10">
      <div className="flex gap-2 overflow-x-auto rounded border border-kg-sage-500/25 p-2 md:hidden">
        {MENU.map((m) => (
          <button
            key={m.key}
            onClick={() => setMenu(m.key)}
            className={`h-10 shrink-0 whitespace-nowrap rounded px-4 text-[15px] ${
              menu === m.key ? "bg-[#F2F5EE] font-semibold text-kg-moss-900" : "text-kg-sage-500"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <aside className="sticky top-30 hidden w-[220px] shrink-0 flex-col gap-1 md:flex">
        {MENU.map((m) => (
          <button
            key={m.key}
            onClick={() => setMenu(m.key)}
            className={`flex h-12 items-center border-l-[3px] px-4 text-left text-[16px] ${
              menu === m.key
                ? "border-kg-moss-700 bg-[#F2F5EE] font-semibold text-kg-moss-900"
                : "border-transparent text-kg-moss-900"
            }`}
          >
            {m.label}
          </button>
        ))}
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mb-7">
          <h1 className="m-0 text-[28px]">Chào chị Mai</h1>
          <div className="mt-1 text-[15px] text-kg-sage-500">Thành viên từ 03/2026</div>
        </div>

        {menu !== "orders" ? (
          <div className="rounded border border-kg-sage-500/25 bg-kg-white p-10 text-[16px] text-kg-sage-500">
            Nội dung mục &ldquo;{MENU.find((m) => m.key === menu)?.label}&rdquo; đang được cập nhật.
          </div>
        ) : (
          <>
            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3">
              {STATS.map((s) => (
                <div key={s.label} className="border border-kg-sage-500/25 bg-kg-white p-6">
                  <div className="mb-2 text-[14px] text-kg-sage-500">{s.label}</div>
                  <div className="font-display text-[34px] font-semibold text-kg-brass-600">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="mb-6 flex gap-6 overflow-x-auto border-b border-kg-sage-500/25">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`whitespace-nowrap border-b-2 py-2.5 text-[15px] ${
                    tab === t.key ? "border-kg-moss-700 font-semibold text-kg-moss-900" : "border-transparent text-kg-sage-500"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {showEmpty ? (
              <div className="flex flex-col items-center py-18 text-center">
                <div className="mb-5 h-24 w-24 rounded-full border border-kg-brass-600" />
                <div className="mb-5 text-[18px] text-kg-moss-900">Không có đơn nào đang chờ xác nhận</div>
                <Button href="/cua-hang" variant="secondary">
                  Xem sản phẩm
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filtered.map((o) => {
                  const look = STATUS_LOOK[o.status];
                  return (
                    <div key={o.code} className="border border-kg-sage-500/25 bg-kg-white p-5">
                      <div className="mb-4 flex flex-wrap items-center gap-4">
                        <span className="font-mono text-[16px] font-medium text-kg-moss-700">{o.code}</span>
                        <span className="text-[14px] text-kg-sage-500">{o.date}</span>
                        <span className={`ml-auto inline-flex items-center gap-1.5 rounded border px-2.5 py-1 text-[13px] font-medium ${look.classes}`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {look.label}
                        </span>
                      </div>
                      <div className="mb-4 flex items-center gap-2">
                        {o.thumbs.map((t) => (
                          <div key={t} className="relative h-14 w-14 border border-kg-sage-500/20 bg-kg-white">
                            <Image src={productImage(t)} alt="" fill sizes="56px" className="object-contain" />
                          </div>
                        ))}
                        {o.extra ? <span className="ml-1 text-[14px] text-kg-sage-500">và {o.extra} sản phẩm khác</span> : null}
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="font-display text-[22px] font-semibold text-kg-brass-600">{o.total}</span>
                        <div className="flex gap-4">
                          <button className="text-[15px] font-medium text-kg-moss-700 underline">Xem chi tiết</button>
                          <button className="text-[15px] font-medium text-kg-moss-700 underline">Mua lại</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </Container>
    <Container className="pb-18">
      <ComplianceNotice />
    </Container>
    </>
  );
}
