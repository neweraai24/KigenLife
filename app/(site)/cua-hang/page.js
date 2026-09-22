import { Suspense } from "react";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CatalogClient from "@/components/commerce/CatalogClient";
import { getAllProducts } from "@/lib/sanity/queries";

export const metadata = {
  title: "Cửa hàng",
  description: "Sản phẩm nhân sâm Canada đang có hàng tại kho Nha Trang.",
};

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <Container className="pt-6 pb-4">
      <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Sản phẩm" }]} className="mb-5" />
      <Suspense fallback={null}>
        <CatalogClient products={products} />
      </Suspense>
    </Container>
  );
}
