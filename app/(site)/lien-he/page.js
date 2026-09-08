"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import TickDivider from "@/components/ui/TickDivider";
import ComplianceNotice from "@/components/ui/ComplianceNotice";
import Alert from "@/components/ui/Alert";
import Field from "@/components/forms/Field";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Textarea from "@/components/forms/Textarea";
import { COMPANY } from "@/lib/products";

const OPEN_HOURS = [
  { day: "Thứ Hai – Thứ Sáu", time: "8h00 – 20h00" },
  { day: "Thứ Bảy", time: "8h00 – 20h00" },
  { day: "Chủ nhật", time: "8h00 – 18h00" },
];

const FAQ_GROUPS = [
  {
    title: "Đặt hàng",
    items: [
      { q: "KIGEN có gọi lại xác nhận trước khi giao không?", a: "Có. Nhân viên KIGEN gọi lại trong giờ hành chính để xác nhận địa chỉ và lô hàng trước khi giao." },
      { q: "Có thể đổi trả nếu không hài lòng?", a: "Quý khách liên hệ hotline trong vòng 7 ngày kể từ khi nhận hàng để được hướng dẫn đổi trả." },
      { q: "Đơn hàng dưới 2.000.000₫ có mất phí vận chuyển?", a: "Có, phí vận chuyển tiêu chuẩn là 45.000₫ cho đơn dưới 2.000.000₫." },
    ],
  },
  {
    title: "Sản phẩm & nguồn gốc",
    items: [
      { q: "Làm sao để xem chứng nhận nguồn gốc của một lô hàng?", a: "Quý khách có thể yêu cầu bản chụp chứng nhận trên trang Nguồn gốc hoặc gọi hotline để KIGEN gửi trực tiếp." },
      { q: "Sản phẩm có dùng được cho phụ nữ có thai?", a: "Không khuyến nghị. Quý khách nên hỏi ý kiến chuyên môn trước khi dùng cho phụ nữ có thai hoặc người có bệnh lý nền." },
      { q: "Roots-per-pound nghĩa là gì?", a: "Là số củ sâm cần để đủ một pound — số càng nhỏ, củ càng lớn. Xem thêm trong mục Cẩm nang." },
    ],
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState({});

  const toggleFaq = (key) => setOpenFaq((s) => ({ ...s, [key]: !s[key] }));

  return (
    <>
      <Container className="pt-6">
        <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Liên hệ" }]} />
      </Container>

      <Container className="pt-8">
        <h1 className="m-0 text-[34px] md:text-[40px]">Liên hệ</h1>
        <p className="mt-3 max-w-[60ch] text-[17px] text-kg-moss-900">
          Gọi điện là cách nhanh nhất. KIGEN trực máy từ 8h đến 20h mỗi ngày, kể cả cuối tuần.
        </p>
      </Container>

      <Container className="grid grid-cols-1 gap-14 py-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col gap-5">
          <div>
            <div className="kg-eyebrow mb-2">Hotline</div>
            <a href={`tel:${COMPANY.hotline}`} className="text-[30px] font-display font-semibold text-kg-moss-900 no-underline">
              {COMPANY.hotlineDisplay}
            </a>
            <div className="mt-1 text-[15px] text-kg-sage-500">8h00 – 20h00, tất cả các ngày trong tuần</div>
          </div>
          <TickDivider spacing={12} />
          <div>
            <div className="kg-eyebrow mb-2">Zalo</div>
            <Button variant="secondary" size="lg" as="a" href={`https://zalo.me/${COMPANY.hotline}`} target="_blank" rel="noopener noreferrer">
              Nhắn Zalo
            </Button>
          </div>
          <TickDivider spacing={12} />
          <div>
            <div className="kg-eyebrow mb-2">Email</div>
            <a href="mailto:hotro@kigenlife.vn" className="text-[17px] text-kg-moss-700">
              hotro@kigenlife.vn
            </a>
          </div>
          <TickDivider spacing={12} />
          <div>
            <div className="kg-eyebrow mb-2">Địa chỉ</div>
            <div className="text-[17px] leading-[1.5] text-kg-moss-900">{COMPANY.address}</div>
          </div>
          <TickDivider spacing={12} />
          <div>
            <div className="kg-eyebrow mb-2">Giờ mở cửa</div>
            <div className="flex flex-col">
              {OPEN_HOURS.map((h) => (
                <div key={h.day} className="flex justify-between border-b border-kg-sage-500/15 py-2 text-[15px] text-kg-moss-900">
                  <span>{h.day}</span>
                  <span className="font-mono text-kg-sage-500">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          {submitted ? (
            <Alert variant="success" title="Đã nhận được liên hệ của Quý khách">
              KIGEN sẽ phản hồi trong thời gian sớm nhất.
            </Alert>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-col gap-5 rounded border border-kg-sage-500/25 bg-kg-white p-7"
            >
              <Field label="Họ và tên" htmlFor="c-name" required>
                <Input id="c-name" required />
              </Field>
              <Field label="Số điện thoại" htmlFor="c-tel" required>
                <Input id="c-tel" inputMode="tel" required />
              </Field>
              <Field label="Email" htmlFor="c-email">
                <Input id="c-email" type="email" />
              </Field>
              <Field label="Chủ đề" htmlFor="c-topic" required>
                <Select
                  id="c-topic"
                  options={[
                    { value: "order", label: "Đặt hàng" },
                    { value: "origin", label: "Chứng nhận nguồn gốc" },
                    { value: "agent", label: "Hợp tác đại lý" },
                    { value: "other", label: "Khác" },
                  ]}
                />
              </Field>
              <Field label="Nội dung" htmlFor="c-msg" required>
                <Textarea id="c-msg" rows={5} />
              </Field>
              <Button type="submit" variant="primary" size="lg" fullWidth>
                Gửi liên hệ
              </Button>
            </form>
          )}
        </div>
      </Container>

      <Container className="py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {FAQ_GROUPS.map((g) => (
            <div key={g.title}>
              <h2 className="mb-4 text-[24px]">{g.title}</h2>
              {g.items.map((item, i) => {
                const key = `${g.title}-${i}`;
                const open = !!openFaq[key];
                return (
                  <div key={key} className="border-b border-kg-sage-500/25">
                    <button
                      type="button"
                      onClick={() => toggleFaq(key)}
                      className="flex w-full items-center justify-between gap-4 py-4 text-left text-[16px] font-medium text-kg-moss-900"
                    >
                      <span>{item.q}</span>
                      <ChevronDown size={18} className={`shrink-0 text-kg-sage-500 transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>
                    {open && <div className="pb-4 text-[15px] leading-[1.6] text-kg-sage-500">{item.a}</div>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Container>

      <Container className="pb-18">
        <ComplianceNotice />
      </Container>
    </>
  );
}
