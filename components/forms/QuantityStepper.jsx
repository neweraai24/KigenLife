"use client";

import { Minus, Plus } from "lucide-react";

export default function QuantityStepper({ value = 1, onChange, min = 1, max = 99, className = "" }) {
  const dec = () => onChange?.(Math.max(min, value - 1));
  const inc = () => onChange?.(Math.min(max, value + 1));

  return (
    <div
      className={`inline-flex h-13 items-center rounded border border-kg-brass-600 ${className}`}
      style={{ height: 52 }}
    >
      <button
        type="button"
        aria-label="Giảm số lượng"
        onClick={dec}
        disabled={value <= min}
        className="flex h-full w-11 items-center justify-center text-kg-moss-900 disabled:opacity-30"
      >
        <Minus size={16} />
      </button>
      <span className="w-10 text-center font-mono text-[17px] text-kg-moss-900">{value}</span>
      <button
        type="button"
        aria-label="Tăng số lượng"
        onClick={inc}
        disabled={value >= max}
        className="flex h-full w-11 items-center justify-center text-kg-moss-900 disabled:opacity-30"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
