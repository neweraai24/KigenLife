import Image from "next/image";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import OriginTimeline from "@/components/commerce/OriginTimeline";

export const metadata = {
  title: "Về KIGEN",
  description: "Câu chuyện, giá trị cốt lõi và mốc thời gian của KIGEN Life Sciences — tổng đại lý nhân sâm Canada tại Việt Nam.",
};

const CORE_VALUES = [
  { title: "Chân Thật", desc: "Nói đúng những gì sản phẩm có, không thêm những gì sản phẩm không có." },
  { title: "Chất Lượng", desc: "Giữ đúng thời gian canh tác 5 năm mà cây sâm cần để đạt dược tính." },
  { title: "Minh Bạch", desc: "Mỗi lô hàng đều có mã lô và ngày thu hoạch để Quý khách đối chiếu." },
  { title: "Trách Nhiệm", desc: "Chịu trách nhiệm với từng lô hàng nhập về, từ nông trại đến tay khách." },
];

const TIMELINE = [
  { year: "1976", title: "Great Mountain Ginseng thành lập", body: "Trang trại bắt đầu canh tác nhân sâm tại Ontario, Canada.", tick: 0 },
  { year: "2006", title: "Giải thưởng Doanh nhân Canada gốc Hoa", tick: 1 },
  { year: "2011", title: "Bốn chứng nhận trong một năm", body: "Foodland Ontario, Bộ Nông nghiệp Canada, và Hiệp hội trồng nhân sâm Ontario.", tick: 2 },
  { year: "2019", title: "Phòng Thương mại Greater Niagara", tick: 3 },
  { year: "2026", title: "KIGEN trở thành tổng đại lý tại Việt Nam", tick: 4 },
];

const CERTS = [
  { year: "2006", name: "Giải thưởng Doanh nhân Canada gốc Hoa" },
  { year: "2011", name: "Foodland Ontario" },
  { year: "2011", name: "Bộ Nông nghiệp Canada" },
  { year: "2011", name: "Hiệp hội trồng nhân sâm Ontario" },
  { year: "2019", name: "Phòng Thương mại Greater Niagara" },
];

export default function AboutPage() {
  return (
    <>
      <Container className="pt-6">
        <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Về KIGEN" }]} />
      </Container>

      <Container className="pt-8 md:pt-12">
        <p className="kg-measure text-balance text-[30px] font-display font-semibold leading-[1.3] text-kg-moss-900 md:text-[38px]">
          Mỗi người đều có quyền hiểu rõ những gì mình đưa vào cơ thể — KIGEN tồn tại để câu trả lời đó luôn có sẵn, bằng giấy tờ chứ không phải lời hứa.
        </p>
      </Container>

      <Container className="max-w-[62ch] pt-16 md:pt-20">
        <div className="kg-eyebrow mb-3">Câu chuyện</div>
        <h2 className="mb-6 text-[28px] md:text-[34px]">Từ một trang trại ở Ontario</h2>
        <p className="mb-5 text-[17px] leading-[1.65]">
          KIGEN là tổng đại lý chính ngạch của Great Mountain Ginseng — một trang trại tự vận hành tại Ontario, Canada, hoạt động liên tục từ năm 1976. Cây sâm Panax quinquefolius cần 5 năm dưới lưới che nắng để đạt đủ dược tính trước khi được thu hoạch.
        </p>
        <p className="mb-5 text-[17px] leading-[1.65]">
          Mỗi lô hàng nhập về Việt Nam mang theo mã lô và ngày thu hoạch riêng. KIGEN không pha trộn, không tẩm hương, và không rút ngắn quy trình canh tác để đổi lấy sản lượng.
        </p>
        <div className="relative mt-2 h-[240px] w-full md:h-[320px]">
          <Image src="/images/hero-canh-dong-sam.png" alt="Cánh đồng sâm tại Ontario, Canada" fill sizes="(min-width:1024px) 62ch, 100vw" className="object-cover" />
        </div>
      </Container>

      <Container className="pt-16 md:pt-20">
        <div className="kg-eyebrow mb-3">Giá trị cốt lõi</div>
        <h2 className="mb-2 text-[28px] md:text-[34px]">Bốn điều không đổi</h2>
        <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {CORE_VALUES.map((v) => (
            <div key={v.title} className="rounded border border-kg-sage-500/25 bg-kg-white p-6">
              <div className="mb-2.5 text-[22px] font-display font-semibold text-kg-moss-900">{v.title}</div>
              <div className="text-[15px] leading-[1.55] text-kg-sage-500">{v.desc}</div>
            </div>
          ))}
        </div>
      </Container>

      <Container className="max-w-[62ch] pt-16 md:pt-20">
        <div className="kg-eyebrow mb-3">Mốc thời gian</div>
        <h2 className="mb-6 text-[28px] md:text-[34px]">Năm mươi năm ở một luống đất</h2>
        <OriginTimeline items={TIMELINE} />
      </Container>

      <Container className="max-w-[62ch] pt-16 md:pt-20">
        <div className="kg-eyebrow mb-3">Đội ngũ</div>
        <h2 className="mb-6 text-[28px] md:text-[34px]">Người đứng sau mỗi lô hàng</h2>
        <p className="text-[17px] leading-[1.65] text-kg-sage-500">
          Đội ngũ KIGEN tại Nha Trang trực tiếp kiểm hàng, đối chiếu chứng từ và trực hotline từ 8h đến 20h mỗi ngày để Quý khách luôn có người xác nhận trước khi đặt hàng.
        </p>
      </Container>

      <section className="mt-16 bg-kg-moss-900 py-16 text-center md:mt-20 md:py-20">
        <Container>
          <div className="mb-3 kg-eyebrow" style={{ color: "#C2A552" }}>
            Cam kết chất lượng
          </div>
          <h2 className="mb-12 text-[28px] text-kg-ivory-50 md:text-[34px]">Năm chứng nhận từ Canada</h2>
          <div className="flex gap-8 overflow-x-auto md:justify-between md:gap-4 md:overflow-visible">
            {CERTS.map((c) => (
              <div key={c.name} className="flex w-[140px] shrink-0 flex-col items-center text-center md:w-auto">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-kg-gold-500">
                  <span className="font-mono text-[20px] text-kg-gold-500">{c.year}</span>
                </div>
                <div className="mt-4 max-w-[15ch] text-[14px] leading-[1.4] text-kg-ivory-50/72">{c.name}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="max-w-[62ch] py-16 text-center md:py-22">
        <h2 className="mb-7 text-[26px] md:text-[32px]">Xem những gì KIGEN đang mang về</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/cua-hang" variant="primary" size="lg">
            Xem sản phẩm
          </Button>
          <Button href="/lien-he" variant="secondary" size="lg">
            Liên hệ KIGEN
          </Button>
        </div>
      </Container>
    </>
  );
}
