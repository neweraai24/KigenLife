"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Tag from "@/components/ui/Tag";
import Checkbox from "@/components/forms/Checkbox";
import Select from "@/components/forms/Select";
import Field from "@/components/forms/Field";
import ComplianceNotice from "@/components/ui/ComplianceNotice";
import ProductCard from "@/components/commerce/ProductCard";
import { LINES, PRODUCTS } from "@/lib/products";

export default function CatalogClient() {
  const searchParams = useSearchParams();
  const initialLine = searchParams.get("line") || "all";

  const [line, setLine] = useState(initialLine);
  const [sort, setSort] = useState("age");
  const [giftOnly, setGiftOnly] = useState(false);

  const items = useMemo(() => {
    let list = line === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.line === line);
    if (giftOnly) list = list.filter((p) => /Hộp quà|hộp da/.test(p.name));
    list = [...list].sort((a, b) =>
      sort === "price" ? a.price - b.price : (b.age || 0) - (a.age || 0)
    );
    return list;
  }, [line, sort, giftOnly]);

  return (
    <>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-8">
        <div>
          <h1 className="m-0 text-[34px] md:text-[40px]">Danh mục sản phẩm</h1>
          <p className="mt-3 max-w-[62ch] text-[17px] text-kg-moss-900">
            25 mã đang có hàng tại kho Nha Trang. Mã, khối lượng tịnh và năm thu hoạch ghi theo bao bì gốc.
          </p>
        </div>
        <Field label="Sắp xếp" htmlFor="sort" className="w-[220px]">
          <Select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            options={[
              { value: "age", label: "Tuổi sâm giảm dần" },
              { value: "price", label: "Giá tăng dần" },
            ]}
          />
        </Field>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-3 border-b border-kg-sage-500/25 pb-5">
        {LINES.map((l) => (
          <Tag key={l.id} as="button" active={l.id === line} onClick={() => setLine(l.id)}>
            {l.label}
          </Tag>
        ))}
        <Checkbox
          id="giftonly"
          label="Chỉ hộp quà biếu"
          checked={giftOnly}
          onChange={(e) => setGiftOnly(e.target.checked)}
          className="ml-3"
        />
        <span className="ml-auto font-mono text-[15px] text-kg-sage-500">{items.length} mã</span>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {items.map((p) => (
          <ProductCard key={p.sku} product={p} />
        ))}
      </div>

      <ComplianceNotice />
    </>
  );
}
