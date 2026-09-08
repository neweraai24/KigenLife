export default function Tag({ active = false, as: Tag = "span", className = "", children, ...rest }) {
  return (
    <Tag
      className={`inline-flex h-9 items-center whitespace-nowrap rounded px-4 text-[15px] leading-none transition-colors duration-150 ${
        active
          ? "border border-transparent bg-kg-moss-700 font-medium text-kg-ivory-50"
          : "border border-kg-sage-500/25 bg-transparent text-kg-sage-500 hover:text-kg-moss-900"
      } ${Tag === "button" ? "cursor-pointer" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
