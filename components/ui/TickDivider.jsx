// Section divider drawn as an evenly spaced row of ring ticks instead of a plain rule.
export default function TickDivider({ tone = "default", withRule = false, spacing = 12, className = "" }) {
  const tick = "#C2A552";
  const rule = tone === "onDark" ? "rgba(194,165,82,.35)" : "rgba(126,140,90,.25)";
  return (
    <div aria-hidden="true" className={`flex w-full flex-col gap-2 ${className}`}>
      <div
        style={{
          height: 6,
          backgroundImage: `repeating-linear-gradient(90deg, ${tick} 0 2px, transparent 2px ${spacing}px)`,
        }}
      />
      {withRule && <div style={{ height: 1, background: rule }} />}
    </div>
  );
}
