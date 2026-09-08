export default function Input({ invalid = false, className = "", ...rest }) {
  return (
    <input
      className={`h-13 w-full rounded border bg-kg-white px-4 font-body text-[16px] text-kg-moss-900 outline-none transition-colors duration-150 placeholder:text-kg-sage-500 focus:border-kg-moss-700 ${
        invalid ? "border-kg-alert-600" : "border-kg-sage-500/45"
      } ${className}`}
      style={{ height: 52 }}
      {...rest}
    />
  );
}
