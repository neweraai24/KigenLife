// "Vòng Niên Sâm" — the signature age mark.
// Ticks = age - 1 (a 5-year root carries 4 stem scars), counted
// counter-clockwise from 12 o'clock.
export default function GinsengRing({
  age = 5,
  size = 40,
  showNumber = true,
  tone = "default",
  label,
  className = "",
}) {
  const ticks = Math.max(0, Math.round(age) - 1);
  const stroke = tone === "onDark" ? "#C2A552" : "#9B8B4F";
  const tickColor = "#C2A552";
  const numColor = tone === "onDark" ? "#FBFCF9" : "#27351F";
  const tickLen = Math.max(4, Math.round(size * 0.15));

  return (
    <span
      role="img"
      aria-label={label || `Sâm ${age} năm tuổi`}
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full ${className}`}
      style={{ width: size, height: size, border: `1px solid ${stroke}` }}
    >
      {Array.from({ length: ticks }).map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute left-1/2 top-0"
          style={{
            width: 2,
            height: tickLen,
            background: tickColor,
            transform: `rotate(${-i * (360 / Math.max(ticks, 1))}deg)`,
            transformOrigin: `1px ${size / 2}px`,
          }}
        />
      ))}
      {showNumber && (
        <span
          className="font-mono leading-none"
          style={{ fontSize: Math.max(11, Math.round(size * 0.34)), color: numColor }}
        >
          {age}
        </span>
      )}
    </span>
  );
}
