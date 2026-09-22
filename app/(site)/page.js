import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import TickDivider from "@/components/ui/TickDivider";
import SectionHead from "@/components/ui/SectionHead";
import ComplianceNotice from "@/components/ui/ComplianceNotice";
import ProductCard from "@/components/commerce/ProductCard";
import { productImage } from "@/lib/products";
import { getAllProducts, getFeaturedProducts } from "@/lib/sanity/queries";

const FACTS_INTRO = [
  ["1976", "Trang trại tự vận hành tại Ontario, Canada"],
  ["100%", "Lô hàng nhập khẩu chính ngạch, có chứng nhận xuất xứ"],
];
const CATEGORIES = [
  { label: "Củ nguyên", id: "cu", img: "p02-GB49" },
  { label: "Sâm lát", id: "lat", img: "p12-LDB100" },
  { label: "Bột sâm", id: "bot", img: "p19-NSB114-GOLD" },
  { label: "Chế biến", id: "che", img: "p23-NS-CO-400" },
];
const CERTS = [
  { year: "2006", name: "Giải thưởng Doanh nhân Canada gốc Hoa" },
  { year: "2011", name: "Foodland Ontario" },
  { year: "2011", name: "Bộ Nông nghiệp Canada" },
  { year: "2011", name: "Hiệp hội trồng nhân sâm Ontario" },
  { year: "2019", name: "Phòng Thương mại Greater Niagara" },
];
const CORE_VALUES = ["Chân Thật", "Chất Lượng", "Minh Bạch", "Trách Nhiệm"];
const ARTICLES = [
  {
    href: "/cam-nang/sup-ga-nhan-sam-ky-tu",
    image: "/images/life-01-ca-phe-nhan-sam.png",
    alt: "Cà phê pha cùng bột nhân sâm",
    category: "Cách dùng",
    title: "Ba cách dùng bột sâm mỗi sáng",
    desc: "Pha cùng cà phê, sữa ấm hoặc nước lọc — liều lượng khuyến nghị theo cân nặng.",
  },
  {
    href: "/cam-nang/roots-per-pound",
    image: "/images/life-02-bot-nhan-sam.png",
    alt: "Bột nhân sâm nguyên chất",
    category: "Nguồn gốc",
    title: "Vì sao roots-per-pound quyết định giá",
    desc: "Số củ trên một pound cho biết kích thước và tuổi rễ — đọc mã sản phẩm đúng cách.",
  },
  {
    href: "/cam-nang/nam-nam-duoi-luoi-che-nang",
    image: "/images/cu-sam-tren-tay.png",
    alt: "Củ sâm tươi vừa thu hoạch",
    category: "Canh tác",
    title: "5 năm dưới lưới che nắng ở Ontario",
    desc: "Từ gieo hạt đến thu hoạch: quy trình canh tác của Great Mountain Ginseng.",
  },
];

export const metadata = {
  title: "Trang chủ",
};

export default async function HomePage() {
  const [featured, allProducts] = await Promise.all([getFeaturedProducts(4), getAllProducts()]);
  const countByLine = allProducts.reduce((acc, p) => {
    acc[p.line] = (acc[p.line] || 0) + 1;
    return acc;
  }, {});
  const FACTS = [
    FACTS_INTRO[0],
    [String(allProducts.length), "Sản phẩm trong danh mục, có mã và khối lượng công bố"],
    FACTS_INTRO[1],
  ];

  return (
    <>
      <section className="relative h-[420px] overflow-hidden md:h-[560px]">
        <Image
          src="/images/hero-canh-dong-sam.png"
          alt="Cánh đồng sâm tại Ontario, Canada"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-kg-moss-900/55" />
        <div className="relative flex h-full max-w-[780px] flex-col items-start justify-center px-6 md:px-20">
          <Image src="/images/logo-icon.png" alt="" height={56} width={56} className="mb-6 h-14 w-auto" style={{ width: "auto" }} />
          <h1 className="m-0 text-[34px] leading-[1.15] text-kg-ivory-50 md:text-[56px]">
            Nhân sâm Canada, minh bạch từ luống đất
          </h1>
          <p className="mt-4 max-w-[46ch] text-[18px] leading-[1.6] text-kg-ivory-50/85">
            Trồng và thu hoạch tại trang trại tự vận hành ở Ontario từ năm 1976. Mỗi lô hàng về Việt Nam đều kèm giấy chứng nhận nguồn gốc.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Button href="/cua-hang" variant="primary" size="lg">
              Xem sản phẩm
            </Button>
            <Button href="/nguon-goc" variant="onDark" size="lg">
              Xem chứng nhận
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Badge variant="certOnDark">PRODUCT OF CANADA</Badge>
            <Badge variant="certOnDark">SINCE 1976</Badge>
          </div>
        </div>
      </section>

      <Container className="grid grid-cols-1 gap-6 py-10 md:grid-cols-3">
        {FACTS.map(([n, t]) => (
          <Card key={n} accentTop className="flex items-start gap-5">
            <span className="font-display text-[44px] font-semibold leading-none text-kg-moss-900">{n}</span>
            <span className="text-[15px] leading-[1.5] text-kg-sage-500">{t}</span>
          </Card>
        ))}
      </Container>

      <Container className="pt-14 md:pt-18">
        <SectionHead
          eyebrow="DANH MỤC"
          title="Bốn dòng sản phẩm"
          lead="Củ nguyên và sâm lát cho quà biếu; bột sâm và sản phẩm chế biến để dùng hằng ngày."
          action={
            <Button href="/cua-hang" variant="secondary">
              Xem tất cả
            </Button>
          }
        />
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={`/cua-hang?line=${c.id}`}
              className="block overflow-hidden rounded border border-kg-sage-500/25 bg-kg-white no-underline transition-colors hover:border-kg-brass-600"
            >
              <div className="relative aspect-[4/3] w-full bg-kg-moss-900/[0.04]">
                <Image src={productImage(c.img)} alt="" fill sizes="25vw" className="object-contain" />
              </div>
              <div className="flex items-baseline justify-between gap-3 p-5">
                <span className="font-display text-[24px] font-semibold text-kg-moss-900">{c.label}</span>
                <span className="font-mono text-[15px] text-kg-sage-500">{countByLine[c.id] || 0} mã</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>

      {featured.length > 0 && (
        <Container className="pt-14 md:pt-18">
          <TickDivider withRule className="mb-10" />
          <SectionHead eyebrow="ĐƯỢC CHỌN NHIỀU DỊP TẾT" title="Hộp quà biếu" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {featured.map((p) => (
              <ProductCard key={p.sku} product={p} />
            ))}
          </div>
          <ComplianceNotice className="mt-8" />
        </Container>
      )}

      <section className="mt-18 bg-kg-moss-900 py-14 md:py-18">
        <Container>
          <h2 className="mb-10 text-center text-[28px] text-kg-ivory-50 md:text-[34px]">Năm chứng nhận từ Canada</h2>
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

      <Container className="pt-14 md:pt-18">
        <SectionHead
          eyebrow="GIÁ TRỊ CỐT LÕI"
          title="Mỗi người đều có quyền hiểu rõ những gì mình dùng"
        />
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-14">
          <div className="relative h-[280px] w-full md:h-[380px]">
            <Image
              src="/images/cu-sam-tren-tay.png"
              alt="Củ sâm tươi vừa thu hoạch trên tay"
              fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="kg-measure text-[17px] leading-[1.65] text-kg-moss-900">
              KIGEN là tổng đại lý chính ngạch của Great Mountain Ginseng, trang trại tự vận hành tại Ontario, Canada từ năm 1976. Mỗi lô hàng nhập về đều có mã lô, ngày thu hoạch và chứng nhận nguồn gốc đi kèm để Quý khách đối chiếu trước khi đặt hàng. KIGEN không pha trộn, không tẩm hương và không rút ngắn quy trình canh tác 5 năm mà cây sâm cần để đạt dược tính.
            </p>
            <div className="mb-7 flex flex-col gap-3.5">
              {CORE_VALUES.map((v) => (
                <div key={v} className="flex items-center gap-3">
                  <span className="h-0.5 w-3 shrink-0 bg-kg-brass-600" />
                  <span className="text-[17px] font-medium text-kg-moss-900">{v}</span>
                </div>
              ))}
            </div>
            <Link href="/ve-kigen" className="text-[16px] font-medium text-kg-moss-700">
              Đọc toàn bộ triết lý KIGEN →
            </Link>
          </div>
        </div>
      </Container>

      <Container className="py-14 md:py-18">
        <SectionHead eyebrow="CẨM NANG" title="Cẩm nang KIGEN" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {ARTICLES.map((a) => (
            <Link key={a.title} href={a.href} className="block no-underline">
              <div className="relative h-[180px] w-full">
                <Image src={a.image} alt={a.alt} fill sizes="33vw" className="object-cover" />
              </div>
              <div className="pt-5">
                <div className="kg-eyebrow text-[13px] tracking-[0.1em]">{a.category}</div>
                <h3 className="my-2 text-[22px] leading-[1.2]">{a.title}</h3>
                <p className="m-0 text-[15px] leading-[1.5] text-kg-sage-500">{a.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>

      <section className="bg-kg-moss-900/[0.04] py-14 md:py-16">
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative h-[280px] w-full md:h-[340px]">
            <Image src="/images/life-02-bot-nhan-sam.png" alt="Bột nhân sâm pha nước ấm" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <div className="kg-eyebrow">CÁCH DÙNG</div>
            <h2 className="my-4 text-[28px] md:text-[34px]">Mỗi ngày 2 g bột, pha nước ấm dưới 70 °C</h2>
            <p className="mb-6 text-[17px] leading-[1.65]">
              KIGEN ghi rõ liều dùng và cách bảo quản trên từng bao bì. Sản phẩm hỗ trợ bồi bổ cơ thể; không dùng thay thuốc. Quý khách có thể gọi hotline để KIGEN tư vấn theo độ tuổi và thể trạng người dùng.
            </p>
            <Button href="/nguon-goc" variant="secondary">
              Xem hồ sơ nguồn gốc
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
