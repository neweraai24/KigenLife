const DEFAULT_TEXT =
  "Thực phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.";

// Legally required on every product listing and product detail page.
export default function ComplianceNotice({ tone = "dark", text = DEFAULT_TEXT, className = "" }) {
  const dark = tone === "dark";
  return (
    <p
      className={`m-0 rounded border-l-[3px] border-kg-brass-600 px-5 py-4 text-[15px] leading-[1.55] ${
        dark ? "bg-kg-moss-900 text-kg-ivory-50" : "bg-kg-moss-900/[0.04] text-kg-moss-900"
      } ${className}`}
    >
      {text}
    </p>
  );
}
