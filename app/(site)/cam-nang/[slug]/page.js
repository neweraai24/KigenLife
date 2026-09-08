import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ComplianceNotice from "@/components/ui/ComplianceNotice";
import ShareRow from "@/components/ShareRow";
import ProductCard from "@/components/commerce/ProductCard";
import { ARTICLES, findArticle } from "@/lib/articles";
import { findProduct } from "@/lib/products";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.desc };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const mentioned = (article.mentionedSkus || []).map(findProduct).filter(Boolean);
  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  const toc = article.ingredients
    ? [
        { id: "nguyen-lieu", label: "Nguyên liệu" },
        { id: "cach-lam", label: "Cách làm" },
        { id: "luu-y", label: "Lưu ý khi dùng" },
      ]
    : (article.sections || []).map((s, i) => ({ id: `sec-${i}`, label: s.heading }));

  return (
    <>
      <Container className="pt-6">
        <Breadcrumb
          items={[{ label: "Trang chủ", href: "/" }, { label: "Cẩm nang", href: "/cam-nang" }, { label: article.category }]}
        />
      </Container>

      <Container className="max-w-[720px] pt-8">
        <div className="kg-eyebrow">{article.category}</div>
        <h1 className="text-balance my-3 text-[32px] leading-[1.15] md:text-[44px]">{article.title}</h1>
        <div className="mb-7 font-mono text-[14px] text-kg-sage-500">
          {article.date} · {article.readTime} · Biên tập: KIGEN
        </div>
      </Container>

      <div className="mb-10 flex justify-center px-5 lg:px-10">
        <div className="relative h-[240px] w-full max-w-[900px] md:h-[420px]">
          <Image src={article.cover} alt={article.title} fill sizes="(min-width:1024px) 900px, 100vw" className="object-cover" priority />
        </div>
      </div>

      <Container className="flex justify-center gap-12 pb-16">
        <article className="kg-article w-full max-w-[68ch]">
          <p className="mb-5 text-[18px] leading-[1.75] text-[#3A4232]">{article.intro}</p>

          {article.ingredients && (
            <>
              <h2 id="nguyen-lieu" className="mb-4 mt-12 text-[28px] md:text-[30px]">
                Nguyên liệu (6 người)
              </h2>
              <div className="flex flex-col">
                {article.ingredients.map((ing) => (
                  <div key={ing.name} className="flex justify-between border-b border-kg-sage-500/15 py-2.5">
                    <span className="text-[18px] text-kg-moss-900">{ing.name}</span>
                    <span className="font-mono text-[16px] tabular-nums text-kg-moss-900">{ing.qty}</span>
                  </div>
                ))}
              </div>

              <h2 id="cach-lam" className="mb-4 mt-12 text-[28px] md:text-[30px]">
                Cách làm
              </h2>
              <div className="flex flex-col gap-5">
                {article.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-kg-brass-600 font-mono text-[16px] text-kg-brass-600">
                      {i + 1}
                    </span>
                    <p className="m-0 text-[18px] leading-[1.7] text-[#3A4232]">{step}</p>
                  </div>
                ))}
              </div>

              {article.pullQuote && (
                <div className="my-10 border-l-[3px] border-kg-brass-600 bg-kg-moss-900/[0.04] p-6 font-display text-[22px] font-medium italic text-kg-moss-900">
                  {article.pullQuote}
                </div>
              )}

              {article.notes && (
                <>
                  <h2 id="luu-y" className="mb-4 mt-12 text-[28px] md:text-[30px]">
                    Lưu ý khi dùng
                  </h2>
                  <ul className="m-0 mb-5 list-none p-0">
                    {article.notes.map((n, i) => (
                      <li key={i} className="relative mb-2 py-1 pl-5 text-[18px] leading-[1.7] text-[#3A4232]">
                        <span className="absolute left-0 top-[15px] h-px w-2.5 bg-kg-brass-600" />
                        {n}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}

          {article.sections &&
            article.sections.map((s, i) => (
              <div key={i}>
                <h2 id={`sec-${i}`} className="mb-4 mt-12 text-[28px] md:text-[30px]">
                  {s.heading}
                </h2>
                <p className="mb-5 text-[18px] leading-[1.75] text-[#3A4232]">{s.body}</p>
              </div>
            ))}

          <ComplianceNotice className="my-10" />

          <ShareRow />

          {mentioned.length > 0 && (
            <div className="mb-14">
              <h2 className="mb-6 text-[26px]">Sản phẩm nhắc đến trong bài</h2>
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
                {mentioned.map((p) => (
                  <ProductCard key={p.sku} product={p} />
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="mb-6 text-[26px]">Bài liên quan</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((a) => (
                <Link key={a.slug} href={`/cam-nang/${a.slug}`} className="block no-underline">
                  <div className="relative h-[160px] w-full">
                    <Image src={a.cover} alt={a.title} fill sizes="33vw" className="object-cover" />
                  </div>
                  <div className="pt-4">
                    <div className="kg-eyebrow text-[12px] tracking-[0.1em]">{a.category}</div>
                    <div className="mt-2 text-[19px] font-display font-semibold leading-[1.3] text-kg-moss-900">{a.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </article>

        <aside className="sticky top-[132px] hidden w-[200px] shrink-0 self-start xl:block">
          <div className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-kg-sage-500">Mục lục</div>
          <div className="flex flex-col">
            {toc.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="border-l-2 border-transparent py-2 pl-3.5 text-[15px] text-kg-sage-500 no-underline hover:text-kg-moss-900"
              >
                {t.label}
              </a>
            ))}
          </div>
        </aside>
      </Container>
    </>
  );
}
