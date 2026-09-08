"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { COMPANY } from "@/lib/products";

const NAV_ITEMS = [
  { href: "/cua-hang", label: "Cửa hàng" },
  { href: "/nguon-goc", label: "Nguồn gốc" },
  { href: "/ve-kigen", label: "Về KIGEN" },
  { href: "/cam-nang", label: "Cẩm nang" },
  { href: "/lien-he", label: "Liên hệ" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <div className="sticky top-0 z-50">
      <header className="flex h-18 items-center justify-between gap-6 border-b border-kg-sage-500/25 bg-kg-ivory-50 px-5 lg:px-10" style={{ height: 72 }}>
        <Link href="/" aria-label="KIGEN Life Sciences" className="flex shrink-0 items-center">
          <Image
            src="/images/logo-full-transparent.png"
            alt="KIGEN Life Sciences"
            height={40}
            width={160}
            className="h-10 w-auto"
            style={{ width: "auto" }}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap text-[15px] no-underline ${
                pathname === item.href
                  ? "font-semibold text-kg-moss-700"
                  : "font-medium text-kg-moss-900 hover:text-kg-moss-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden h-10 w-[200px] items-center gap-2 rounded border border-kg-sage-500/25 bg-kg-white px-3 lg:flex">
            <Search size={16} className="shrink-0 text-kg-sage-500" />
            <input
              type="text"
              placeholder="Tìm sản phẩm"
              className="w-full bg-transparent text-[15px] text-kg-moss-900 outline-none placeholder:text-kg-sage-500"
            />
          </div>
          <Link
            href="/tai-khoan"
            aria-label="Tài khoản"
            className="hidden h-12 w-12 items-center justify-center rounded text-kg-moss-900 hover:bg-kg-moss-900/[0.04] lg:inline-flex"
          >
            <User size={20} />
          </Link>
          <Link
            href="/gio-hang"
            aria-label="Giỏ hàng"
            className="relative flex h-12 w-12 items-center justify-center rounded text-kg-moss-900 hover:bg-kg-moss-900/[0.04]"
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-kg-moss-700 px-1 font-mono text-[10px] text-kg-ivory-50">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            aria-label="Mở menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-12 w-12 items-center justify-center rounded text-kg-moss-900 lg:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav className="flex flex-col border-b border-kg-sage-500/25 bg-kg-ivory-50 px-5 pb-4 pt-2 lg:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-kg-sage-500/25 py-3 text-[16px] font-medium text-kg-moss-900 no-underline"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/tai-khoan"
            onClick={() => setMenuOpen(false)}
            className="py-3 text-[16px] font-medium text-kg-moss-900 no-underline"
          >
            Tài khoản
          </Link>
        </nav>
      )}

      <div className="flex h-9 items-center justify-center bg-kg-moss-900 px-4 text-center text-[14px] text-kg-ivory-50 md:text-[15px]">
        <span className="truncate">
          Nhập khẩu chính ngạch từ Ontario, Canada · Miễn phí giao hàng đơn từ 2.000.000₫ · Hotline {COMPANY.hotlineDisplay}
        </span>
      </div>
    </div>
  );
}
