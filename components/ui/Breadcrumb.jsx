import Link from "next/link";

export default function Breadcrumb({ items = [], className = "" }) {
  return (
    <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center gap-2 text-[14px] text-kg-sage-500 ${className}`}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true">/</span>}
          {item.href && i < items.length - 1 ? (
            <Link href={item.href} className="text-kg-sage-500 no-underline hover:text-kg-moss-700">
              {item.label}
            </Link>
          ) : (
            <span className="text-kg-moss-900">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
