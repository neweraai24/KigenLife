"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import Button from "@/components/ui/Button";

export default function AddToCartButton({ sku, qty = 1, inStock = true, size = "md", className = "" }) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  return (
    <Button
      type="button"
      variant={inStock ? "primary" : "secondary"}
      size={size}
      disabled={!inStock}
      fullWidth
      className={className}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        add(sku, qty);
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 1600);
      }}
    >
      {!inStock ? "Thông báo khi có hàng" : justAdded ? "Đã thêm vào giỏ" : "Thêm vào giỏ"}
    </Button>
  );
}
