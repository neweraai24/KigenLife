import { Cormorant_Garamond, Be_Vietnam_Pro, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://kigenlife.vn"),
  title: {
    default: "KIGEN Life Sciences — Nhân sâm Canada nhập khẩu chính ngạch",
    template: "%s · KIGEN Life Sciences",
  },
  description:
    "KIGEN là tổng đại lý nhân sâm Canada (Panax quinquefolius) của Great Mountain Ginseng, Ontario, từ năm 1976. Nhập khẩu chính ngạch, có chứng nhận nguồn gốc theo từng lô.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="vi"
      className={`${cormorant.variable} ${beVietnam.variable} ${plexMono.variable}`}
    >
      <body className="bg-kg-ivory-50 font-body text-kg-moss-900 antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
