import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Price from "@/components/ui/Price";
import GinsengRing from "@/components/ui/GinsengRing";
import AddToCartButton from "@/components/commerce/AddToCartButton";
import { productImage } from "@/lib/products";

export default function ProductCard({ product }) {
  const { sku, name, weight, age, price, unit, note, img, inStock = true } = product;
  const href = `/san-pham/${sku}`;

  return (
    <article className="flex flex-col rounded border border-kg-sage-500/25 bg-kg-white transition-colors duration-150 hover:border-kg-brass-600">
      <Link href={href} className="relative block bg-kg-moss-900/[0.04] no-underline">
        <div className="relative aspect-square w-full">
          <Image src={productImage(img)} alt={name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-contain" />
        </div>
        {age != null && (
          <span className="absolute right-3 top-3 rounded-full bg-kg-white">
            <GinsengRing age={age} size={40} />
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex gap-3 font-mono text-[15px] tracking-[0.02em] text-kg-sage-500">
          <span>{sku}</span>
          {weight && <span>· {weight}</span>}
        </div>
        <h3 className="m-0 text-[28px] leading-[1.2]">
          <Link href={href} className="text-inherit no-underline">
            {name}
          </Link>
        </h3>
        {note && <p className="m-0 text-[15px] leading-[1.5] text-kg-sage-500">{note}</p>}
        <div className="mt-1 flex items-center justify-between gap-3">
          <Price value={price} unit={unit} />
          {!inStock && <Badge variant="error">Hết hàng</Badge>}
        </div>
        <AddToCartButton sku={sku} inStock={inStock} className="mt-2" />
      </div>
    </article>
  );
}
