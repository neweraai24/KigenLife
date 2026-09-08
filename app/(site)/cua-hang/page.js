import { Suspense } from "react";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CatalogClient from "@/components/commerce/CatalogClient";

export const metadata = {
  title: "Cửa hàng",
  description: "25 sản phẩm nhân sâm Canada đang có hàng tại kho Nha Trang.",
};

export default function ShopPage() {
  return (
    <Container className="pt-6 pb-4">
      <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Sản phẩm" }]} className="mb-5" />
      <Suspense fallback={null}>
        <CatalogClient />
      </Suspense>
    </Container>
  );
}
