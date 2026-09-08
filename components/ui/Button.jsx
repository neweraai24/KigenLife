import Link from "next/link";

const sizes = {
  sm: "h-10 px-4 text-[16px] gap-2",
  md: "h-12 px-6 text-[16px] gap-2",
  lg: "h-14 px-8 text-[16px] gap-2",
};

const looks = {
  primary:
    "bg-kg-moss-700 text-kg-ivory-50 border border-transparent hover:bg-kg-moss-900",
  secondary:
    "bg-transparent text-kg-moss-700 border border-kg-sage-500/45 hover:text-kg-moss-900 hover:border-kg-brass-600",
  ghost:
    "bg-transparent text-kg-moss-700 border border-transparent hover:bg-kg-moss-900/[0.04]",
  onDark:
    "bg-transparent text-kg-ivory-50 border border-kg-ivory-50/45 hover:text-kg-gold-500 hover:border-kg-gold-500",
  danger: "bg-kg-alert-600 text-kg-ivory-50 border border-transparent hover:bg-[#8C3224]",
};

export default function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  as,
  href,
  className = "",
  children,
  ...rest
}) {
  const classes = `inline-flex items-center justify-center rounded font-body font-medium leading-none no-underline transition-colors duration-150 ${
    sizes[size]
  } ${looks[variant]} ${fullWidth ? "w-full" : ""} ${
    disabled ? "cursor-not-allowed opacity-45" : "cursor-pointer"
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} aria-disabled={disabled} {...rest}>
        {children}
      </Link>
    );
  }

  const Tag = as || "button";
  return (
    <Tag className={classes} disabled={Tag === "button" ? disabled : undefined} {...rest}>
      {children}
    </Tag>
  );
}
