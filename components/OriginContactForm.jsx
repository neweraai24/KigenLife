"use client";

import { useState } from "react";
import Field from "@/components/forms/Field";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Textarea from "@/components/forms/Textarea";
import Switch from "@/components/forms/Switch";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { PRODUCTS } from "@/lib/products";

export default function OriginContactForm() {
  const [sent, setSent] = useState(false);
  const [news, setNews] = useState(false);

  if (sent) {
    return (
      <Alert variant="success" title="KIGEN đã nhận được câu hỏi của Quý khách">
        KIGEN gọi lại xác nhận trong giờ hành chính, từ thứ Hai đến thứ Bảy.
      </Alert>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid max-w-[760px] grid-cols-1 gap-6 md:grid-cols-2"
    >
      <Field label="Họ và tên" htmlFor="o-name" required>
        <Input id="o-name" placeholder="Nguyễn Văn A" required />
      </Field>
      <Field label="Số điện thoại" htmlFor="o-tel" hint="KIGEN chỉ dùng để gọi lại xác nhận." required>
        <Input id="o-tel" inputMode="tel" placeholder="09xx xxx xxx" required />
      </Field>
      <Field label="Sản phẩm quan tâm" htmlFor="o-sku" className="md:col-span-2">
        <Select id="o-sku" options={PRODUCTS.slice(0, 8).map((p) => ({ value: p.sku, label: `${p.sku} — ${p.name}` }))} />
      </Field>
      <Field label="Câu hỏi" htmlFor="o-msg" className="md:col-span-2">
        <Textarea id="o-msg" rows={4} placeholder="Quý khách cần KIGEN xác nhận điều gì?" />
      </Field>
      <div className="flex items-center gap-6 md:col-span-2">
        <Button type="submit" variant="primary">
          Gửi câu hỏi
        </Button>
        <Switch id="o-news" checked={news} onChange={(e) => setNews(e.target.checked)} label="Nhận thông báo lô hàng mới" />
      </div>
    </form>
  );
}
