import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import SectionHead from "@/components/ui/SectionHead";
import TickDivider from "@/components/ui/TickDivider";
import { ARTICLES } from "@/lib/articles";

export const metadata = {
  title: "Cẩm nang",
  description: "Công thức nấu, hướng dẫn dùng sâm và kiến thức nguồn gốc từ KIGEN Life Sciences.",
};

export default function JournalPage() {
  const [featured, ...rest] = ARTICLES;
  const categories = [...new Set(ARTICLES.map((a) => a.category))];

  return (
    <>
      <section className="relative h-[360px] overflow-hidden md:h-[460px]">
        <Image
          src="/images/lifestyle-06.png"
          alt="Trà và bột nhân sâm pha sẵn trên bàn gỗ"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-kg-moss-900/60" />
        <Container className="relative flex h-full flex-col justify-end pb-10 md:pb-14">
          <Breadcrumb
            items={[{ label: "Trang chủ", href: "/" }, { label: "Cẩm nang" }]}
            className="mb-6 [&_a]:text-kg-ivory-50/70 [&_span]:text-kg-ivory-50"
          />
          <div className="kg-eyebrow text-kg-gold-500">CẨM NANG KIGEN</div>
          <h1 className="mt-2 max-w-[640px] text-[34px] leading-[1.15] text-kg-ivory-50 md:text-[52px]">
            Hiểu sâm, dùng đúng, nấu ngon
          </h1>
          <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-kg-ivory-50/85 md:text-[18px]">
            Công thức nấu, liều dùng khuyến nghị và câu chuyện canh tác 5 năm tại Ontario — mọi kiến thức KIGEN đúc kết để Quý khách dùng sâm an tâm hơn mỗi ngày.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {categories.map((c) => (
              <Badge key={c} variant="certOnDark">
                {c}
              </Badge>
            ))}
          </div>
        </Container>
      </section>

      <Container className="pt-14 md:pt-18">
        <div className="kg-eyebrow mb-3">MỚI NHẤT</div>
        <Link href={`/cam-nang/${featured.slug}`} className="group grid grid-cols-1 gap-8 no-underline lg:grid-cols-[7fr_5fr] lg:gap-12">
          <div className="relative h-[260px] w-full overflow-hidden rounded md:h-[400px]">
            <Image
              src={featured.cover}
              alt={featured.title}
              fill
              sizes="(min-width:1024px) 58vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="kg-eyebrow text-[13px] tracking-[0.1em]">{featured.category}</div>
            <h2 className="my-3 text-[28px] leading-[1.2] md:text-[36px]">{featured.title}</h2>
            <p className="m-0 text-[17px] leading-[1.6] text-kg-sage-500">{featured.desc}</p>
            <div className="mt-4 font-mono text-[13px] text-kg-sage-500">
              {featured.date} · {featured.readTime}
            </div>
            <span className="mt-6 inline-flex w-fit items-center gap-2 text-[16px] font-medium text-kg-moss-700 group-hover:text-kg-moss-900">
              Đọc bài viết
              <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </Link>
      </Container>

      <Container className="pt-14 md:pt-18">
        <TickDivider withRule className="mb-10" />
        <SectionHead eyebrow="LƯU TRỮ" title="Tất cả bài viết" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {rest.map((a) => (
            <Link
              key={a.slug}
              href={`/cam-nang/${a.slug}`}
              className="group block overflow-hidden rounded border border-transparent no-underline transition-colors hover:border-kg-sage-500/25"
            >
              <div className="relative h-[200px] w-full overflow-hidden">
                <Image
                  src={a.cover}
                  alt={a.title}
                  fill
                  sizes="33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-5 pb-2">
                <div className="kg-eyebrow text-[13px] tracking-[0.1em]">{a.category}</div>
                <h3 className="my-2 text-[24px] leading-[1.2]">{a.title}</h3>
                <p className="m-0 text-[15px] leading-[1.5] text-kg-sage-500">{a.desc}</p>
                <div className="mt-3 font-mono text-[13px] text-kg-sage-500">
                  {a.date} · {a.readTime}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>

      <section className="mt-18 bg-kg-moss-900 py-14 md:py-18">
        <Container className="flex flex-col items-center text-center">
          <div className="kg-eyebrow text-kg-gold-500">ĐÃ SẴN SÀNG?</div>
          <h2 className="mt-3 max-w-[32ch] text-[28px] text-kg-ivory-50 md:text-[36px]">
            Đọc xong cẩm nang, chọn đúng dòng sâm cho mình
          </h2>
          <p className="mt-4 max-w-[54ch] text-[17px] leading-[1.6] text-kg-ivory-50/75">
            Củ nguyên và sâm lát để biếu tặng, bột sâm và sản phẩm chế biến để dùng mỗi ngày — mỗi mã sản phẩm đều kèm hồ sơ nguồn gốc.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Button href="/cua-hang" variant="primary" size="lg">
              Xem sản phẩm
            </Button>
            <Button href="/nguon-goc" variant="onDark" size="lg">
              Xem chứng nhận nguồn gốc
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
