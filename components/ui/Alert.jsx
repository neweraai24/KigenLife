const looks = {
  info: { border: "border-kg-sage-500/25", accent: "border-t-kg-brass-600", bg: "bg-kg-moss-900/[0.04]", fg: "text-kg-brass-600" },
  success: { border: "border-kg-confirm-600/35", accent: "border-t-kg-confirm-600", bg: "bg-kg-confirm-600/[0.05]", fg: "text-kg-confirm-600" },
  error: { border: "border-kg-alert-600/35", accent: "border-t-kg-alert-600", bg: "bg-kg-alert-600/[0.05]", fg: "text-kg-alert-600" },
};

export default function Alert({ variant = "info", title, children, className = "" }) {
  const l = looks[variant];
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={`rounded border ${l.border} border-t ${l.accent} ${l.bg} px-5 py-4 text-kg-moss-900 ${className}`}
    >
      {title && <div className={`text-[17px] font-semibold ${children ? "mb-1" : ""} ${l.fg}`}>{title}</div>}
      {children && <div className="kg-measure text-[15px] leading-[1.55]">{children}</div>}
    </div>
  );
}
