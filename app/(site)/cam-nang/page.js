import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { ARTICLES } from "@/lib/articles";

export const metadata = {
  title: "Cẩm nang",
  description: "Công thức nấu, hướng dẫn dùng sâm và kiến thức nguồn gốc từ KIGEN Life Sciences.",
};

export default function JournalPage() {
  return (
    <Container className="pt-6 pb-18">
      <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Cẩm nang" }]} className="mb-6" />
      <h1 className="mb-10 text-[34px] md:text-[40px]">Cẩm nang KIGEN</h1>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {ARTICLES.map((a) => (
          <Link key={a.slug} href={`/cam-nang/${a.slug}`} className="block no-underline">
            <div className="relative h-[200px] w-full">
              <Image src={a.cover} alt={a.title} fill sizes="33vw" className="object-cover" />
            </div>
            <div className="pt-5">
              <div className="kg-eyebrow text-[13px] tracking-[0.1em]">{a.category}</div>
              <h2 className="my-2 text-[24px] leading-[1.2]">{a.title}</h2>
              <p className="m-0 text-[15px] leading-[1.5] text-kg-sage-500">{a.desc}</p>
              <div className="mt-3 font-mono text-[13px] text-kg-sage-500">
                {a.date} · {a.readTime}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
