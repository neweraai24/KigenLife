import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductDetailClient from "@/components/commerce/ProductDetailClient";
import { getAllProductSkus, getProductBySku, getRelatedProducts } from "@/lib/sanity/queries";

export async function generateStaticParams() {
  const skus = await getAllProductSkus();
  return skus.map((sku) => ({ sku }));
}

export async function generateMetadata({ params }) {
  const { sku } = await params;
  const product = await getProductBySku(sku);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.name} (${product.sku}) — ${product.weight}. Nhân sâm Canada nhập khẩu chính ngạch, có chứng nhận nguồn gốc.`,
  };
}

export default async function ProductPage({ params }) {
  const { sku } = await params;
  const product = await getProductBySku(sku);
  if (!product) notFound();

  const related = await getRelatedProducts(product.line, product.sku, 3);
  const thumbImages = related.slice(0, 2).map((p) => p.imageUrl).filter(Boolean);

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
      <ProductDetailClient product={product} related={related} thumbImages={thumbImages} />
    </Container>
  );
}
