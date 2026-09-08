"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PRODUCTS } from "@/lib/products";

const CartContext = createContext(null);
const STORAGE_KEY = "kigen-cart-v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage, unavailable during SSR
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, loaded]);

  const api = useMemo(() => {
    const add = (sku, qty = 1) => {
      setItems((cur) => {
        const existing = cur.find((i) => i.sku === sku);
        if (existing) {
          return cur.map((i) => (i.sku === sku ? { ...i, qty: i.qty + qty } : i));
        }
        return [...cur, { sku, qty }];
      });
    };
    const setQty = (sku, qty) => {
      setItems((cur) => cur.map((i) => (i.sku === sku ? { ...i, qty } : i)));
    };
    const remove = (sku) => {
      setItems((cur) => cur.filter((i) => i.sku !== sku));
    };
    const clear = () => setItems([]);

    const lines = items
      .map((i) => {
        const product = PRODUCTS.find((p) => p.sku === i.sku);
        return product ? { ...product, qty: i.qty } : null;
      })
      .filter(Boolean);

    const count = lines.reduce((s, i) => s + i.qty, 0);
    const subtotal = lines.reduce((s, i) => s + i.price * i.qty, 0);

    return { items, lines, count, subtotal, add, setQty, remove, clear, loaded };
  }, [items, loaded]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
