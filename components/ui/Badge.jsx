const variants = {
  cert: "border border-kg-gold-500 text-kg-brass-600 bg-transparent",
  certOnDark: "border border-kg-gold-500 text-kg-gold-500 bg-transparent",
  success: "border border-kg-confirm-600/50 text-kg-confirm-600 bg-kg-confirm-600/[0.08]",
  error: "border border-kg-alert-600/50 text-kg-alert-600 bg-kg-alert-600/[0.08]",
};

export default function Badge({ variant = "cert", className = "", children }) {
  return (
    <span
      className={`inline-flex items-center rounded px-3 py-1.5 font-mono text-[13px] uppercase tracking-[0.1em] ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
