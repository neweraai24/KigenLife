export default function Checkbox({ id, label, className = "", ...rest }) {
  return (
    <label htmlFor={id} className={`flex cursor-pointer items-center gap-3 text-[15px] text-kg-moss-900 ${className}`}>
      <input
        id={id}
        type="checkbox"
        className="h-5 w-5 accent-kg-moss-700"
        {...rest}
      />
      {label}
    </label>
  );
}
