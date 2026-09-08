import GinsengRing from "@/components/ui/GinsengRing";

export default function OriginTimeline({ items = [], className = "" }) {
  return (
    <ol className={`m-0 flex list-none flex-col gap-6 p-0 ${className}`}>
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-5">
          <GinsengRing age={(it.tick ?? i) + 1} size={48} showNumber={false} className="mt-0.5" />
          <div
            className={`flex flex-1 flex-col gap-1 pb-4 ${
              i < items.length - 1 ? "border-b border-kg-sage-500/25" : ""
            }`}
          >
            <span className="font-mono text-[15px] tracking-[0.02em] text-kg-brass-600">{it.year}</span>
            <span className="text-[26px] leading-[1.2] font-display font-semibold text-kg-moss-900">{it.title}</span>
            {it.body && <p className="kg-measure m-0 text-[17px] leading-[1.65] text-kg-moss-900">{it.body}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
