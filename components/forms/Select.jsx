export default function Select({ invalid = false, options = [], className = "", ...rest }) {
  return (
    <select
      className={`h-13 w-full rounded border bg-kg-white px-4 font-body text-[16px] text-kg-moss-900 outline-none transition-colors duration-150 focus:border-kg-moss-700 ${
        invalid ? "border-kg-alert-600" : "border-kg-sage-500/45"
      } ${className}`}
      style={{ height: 52 }}
      {...rest}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
