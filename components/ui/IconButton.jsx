const looks = {
  ghost: "border border-transparent text-kg-moss-900 hover:bg-kg-moss-900/[0.04]",
  outline: "border border-kg-sage-500/45 bg-kg-white text-kg-moss-900 hover:border-kg-brass-600",
  onDark: "border border-transparent text-kg-ivory-50 hover:text-kg-gold-500",
};

export default function IconButton({
  label,
  size = 48,
  variant = "ghost",
  disabled = false,
  className = "",
  children,
  ...rest
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded transition-colors duration-150 ${
        looks[variant]
      } ${disabled ? "cursor-not-allowed opacity-45" : "cursor-pointer"} ${className}`}
      style={{ width: size, height: size }}
      {...rest}
    >
      {children}
    </button>
  );
}
