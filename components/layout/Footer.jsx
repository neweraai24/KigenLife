import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/products";

const PRODUCT_LINKS = [
  { label: "Củ nguyên", href: "/cua-hang?line=cu" },
  { label: "Sâm lát", href: "/cua-hang?line=lat" },
  { label: "Bột sâm", href: "/cua-hang?line=bot" },
  { label: "Chế biến", href: "/cua-hang?line=che" },
];

const ABOUT_LINKS = [
  { label: "Câu chuyện", href: "/ve-kigen" },
  { label: "Nguồn gốc", href: "/nguon-goc" },
  { label: "Cẩm nang", href: "/cam-nang" },
  { label: "Liên hệ", href: "/lien-he" },
];

export default function Footer() {
  return (
    <footer className="mt-18 bg-kg-moss-900 px-5 py-12 lg:px-10 lg:py-14">
      <div className="mx-auto grid max-w-[1160px] grid-cols-1 gap-8 md:grid-cols-4">
        <div>
          <Image
            src="/images/logo-full-light.png"
            alt="KIGEN Life Sciences"
            height={120}
            width={280}
            className="h-[100px] w-auto"
            style={{ width: "auto" }}
          />
          <p className="mt-4 font-display text-[18px] font-medium italic text-kg-gold-500">
            Chất lượng cuộc sống tương ứng với giá trị sống của bạn.
          </p>
        </div>
        <div>
          <div className="mb-4 text-[15px] font-semibold text-kg-ivory-50">Sản phẩm</div>
          {PRODUCT_LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="mb-3 block text-[15px] text-kg-ivory-50/85 no-underline hover:text-kg-gold-500">
              {l.label}
            </Link>
          ))}
        </div>
        <div>
          <div className="mb-4 text-[15px] font-semibold text-kg-ivory-50">Về KIGEN</div>
          {ABOUT_LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="mb-3 block text-[15px] text-kg-ivory-50/85 no-underline hover:text-kg-gold-500">
              {l.label}
            </Link>
          ))}
        </div>
        <div>
          <div className="mb-4 text-[15px] font-semibold text-kg-ivory-50">Thông tin pháp nhân</div>
          <div className="mb-2.5 text-[14px] leading-[1.5] text-kg-ivory-50/75">{COMPANY.name}</div>
          <div className="mb-2.5 text-[14px] leading-[1.5] text-kg-ivory-50/75">{COMPANY.address}</div>
          <div className="mb-2.5 text-[14px] leading-[1.5] text-kg-ivory-50/75">Mã số doanh nghiệp: {COMPANY.taxId}</div>
          <div className="mb-2.5 text-[14px] leading-[1.5] text-kg-ivory-50/75">Hotline: {COMPANY.hotlineDisplay}</div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-[1160px] border-t border-kg-gold-500/30 pt-6 text-center font-body text-[13px] text-kg-ivory-50/70">
        © 2026 Công ty TNHH KIGEN Life Sciences. Đã đăng ký bản quyền.
      </div>
    </footer>
  );
}
