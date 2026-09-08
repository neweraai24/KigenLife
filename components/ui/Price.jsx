import { formatVnd } from "@/lib/products";

const sizes = { sm: "text-[17px]", md: "text-[22px]", lg: "text-[28px]" };

export default function Price({ value, unit, size = "md", tone = "default", className = "" }) {
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span
        className={`whitespace-nowrap font-mono font-medium leading-tight tracking-[0.02em] ${sizes[size]} ${
          tone === "onDark" ? "text-kg-gold-500" : "text-kg-brass-600"
        }`}
      >
        {formatVnd(value)}
      </span>
      {unit && <span className="text-[15px] text-kg-sage-500">/ {unit}</span>}
    </span>
  );
}
