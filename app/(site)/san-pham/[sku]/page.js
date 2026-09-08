import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductDetailClient from "@/components/commerce/ProductDetailClient";
import { PRODUCTS, findProduct } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ sku: p.sku }));
}

export async function generateMetadata({ params }) {
  const { sku } = await params;
  const product = findProduct(sku);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.name} (${product.sku}) — ${product.weight}. Nhân sâm Canada nhập khẩu chính ngạch, có chứng nhận nguồn gốc.`,
  };
}

export default async function ProductPage({ params }) {
  const { sku } = await params;
  const product = findProduct(sku);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.line === product.line && p.sku !== product.sku).slice(0, 3);
  const thumbSkus = PRODUCTS.filter((p) => p.sku !== product.sku)
    .slice(0, 2)
    .map((p) => p.img);

  return (
    <Container className="pt-6 pb-16">
      <Breadcrumb
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm", href: "/cua-hang" },
          { label: product.name },
        ]}
        className="mb-6"
      />
      <ProductDetailClient product={product} related={related} thumbSkus={thumbSkus} />
    </Container>
  );
}
