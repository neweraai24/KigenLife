export default function Textarea({ invalid = false, rows = 4, className = "", ...rest }) {
  return (
    <textarea
      rows={rows}
      className={`w-full resize-y rounded border bg-kg-white px-4 py-3 font-body text-[16px] text-kg-moss-900 outline-none transition-colors duration-150 placeholder:text-kg-sage-500 focus:border-kg-moss-700 ${
        invalid ? "border-kg-alert-600" : "border-kg-sage-500/45"
      } ${className}`}
      {...rest}
    />
  );
}
