const tones = {
  card: "bg-kg-white text-kg-moss-900 border border-kg-sage-500/25",
  inset: "bg-kg-moss-900/[0.04] text-kg-moss-900 border border-kg-sage-500/25",
  dark: "bg-kg-moss-900 text-kg-ivory-50 border border-kg-gold-500/30",
  bare: "bg-transparent text-kg-moss-900 border border-kg-sage-500/25",
};

export default function Card({
  tone = "card",
  accentTop = false,
  as: Tag = "div",
  className = "",
  children,
  ...rest
}) {
  return (
    <Tag
      className={`rounded p-5 ${tones[tone]} ${
        accentTop ? "border-t-kg-brass-600" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
