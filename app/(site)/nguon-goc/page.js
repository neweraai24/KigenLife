import Image from "next/image";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import TickDivider from "@/components/ui/TickDivider";
import SectionHead from "@/components/ui/SectionHead";
import OriginTimeline from "@/components/commerce/OriginTimeline";
import SpecTable from "@/components/commerce/SpecTable";
import OriginContactForm from "@/components/OriginContactForm";
import { COMPANY } from "@/lib/products";

export const metadata = {
  title: "Nguồn gốc",
  description: "Từ Ontario đến kho Nha Trang — hồ sơ lô hàng, chứng nhận xuất xứ và phiếu kiểm nghiệm của KIGEN.",
};

const TIMELINE = [
  { year: "1976", title: "Great Mountain Ginseng", body: "Trang trại tự vận hành tại Ontario, Canada. Đất canh tác luân canh, không tái sử dụng thổ nhưỡng trong 15 năm.", tick: 0 },
  { year: "Năm 1–4", title: "Canh tác", body: "Mỗi năm cây rụng thân một lần và để lại một vết sẹo trên đầu củ. Đếm sẹo là biết tuổi.", tick: 2 },
  { year: "Năm thứ 5–6", title: "Thu hoạch và phân loại", body: "Củ được rửa, sấy và phân loại theo số củ trên mỗi pound: 110, 89, 79, 65, 59, 49.", tick: 4 },
  { year: "2025", title: "Nhập khẩu chính ngạch", body: "Thông quan tại cảng, kèm giấy chứng nhận xuất xứ (CO) và phiếu kiểm nghiệm cho từng lô.", tick: 5 },
  { year: "Hiện tại", title: "Kho Nha Trang", body: "Bảo quản dưới 25 °C. Hàng xuất theo lô, in mã lô trên phiếu giao.", tick: 6 },
];

export default function OriginPage() {
  return (
    <>
      <section className="bg-kg-moss-900 text-kg-ivory-50">
        <Container className="py-16 md:py-20">
          <div className="kg-eyebrow">NGUỒN GỐC</div>
          <h1 className="mt-4 max-w-[24ch] text-[36px] text-kg-ivory-50 md:text-[48px]">Từ Ontario đến kho Nha Trang</h1>
          <p className="mt-5 max-w-[58ch] text-[20px] leading-[1.6] text-kg-ivory-50/85">
            KIGEN công bố toàn bộ chuỗi: trang trại, năm thu hoạch, số lô, số công bố sản phẩm và đơn vị vận chuyển. Quý khách có thể đối chiếu từng bước.
          </p>
        </Container>
      </section>

      <Container className="grid grid-cols-1 items-start gap-14 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <OriginTimeline items={TIMELINE} />
        <div className="flex flex-col gap-6">
          <Card accentTop>
            <div className="kg-eyebrow">HỒ SƠ LÔ HÀNG HIỆN TẠI</div>
            <SpecTable
              className="mt-4"
              rows={[
                { label: "Số lô", value: "LOT-ON-2025-11", mono: true },
                { label: "Giấy chứng nhận xuất xứ", value: "CO/CA/2025/11-0842", mono: true },
                { label: "Phiếu kiểm nghiệm", value: "QT-2025-11-0117", mono: true },
                { label: "Số công bố sản phẩm", value: COMPANY.taxId, mono: true },
                { label: "Ngày thông quan", value: "18/11/2025" },
              ]}
            />
            <Button variant="secondary" fullWidth className="mt-5">
              Yêu cầu bản chụp chứng nhận
            </Button>
          </Card>
          <Card tone="dark">
            <div className="font-mono text-[13px] tracking-[0.14em] text-kg-gold-500">CÒN CÂU HỎI</div>
            <p className="my-3 text-[17px] leading-[1.65] text-kg-ivory-50">
              KIGEN trả lời trong giờ hành chính, từ thứ Hai đến thứ Bảy.
            </p>
            <Button variant="onDark" as="a" href={`tel:${COMPANY.hotline}`} fullWidth>
              Gọi {COMPANY.hotlineDisplay}
            </Button>
          </Card>
          <div className="relative h-[220px] w-full">
            <Image src="/images/kho-hang-kiem-dinh.png" alt="Kho hàng KIGEN tại Nha Trang" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </Container>

      <Container className="pb-18">
        <TickDivider withRule className="mb-10" />
        <SectionHead eyebrow="LIÊN HỆ" title="Gửi câu hỏi cho KIGEN" lead="KIGEN gọi lại xác nhận trước khi giao hàng." />
        <OriginContactForm />
      </Container>
    </>
  );
}
