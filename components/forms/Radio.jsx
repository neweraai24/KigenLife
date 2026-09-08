export default function Radio({ id, name, label, description, className = "", ...rest }) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-start gap-3 rounded border border-kg-sage-500/25 p-4 text-[15px] text-kg-moss-900 has-[:checked]:border-kg-brass-600 ${className}`}
    >
      <input id={id} type="radio" name={name} className="mt-1 h-5 w-5 accent-kg-moss-700" {...rest} />
      <span>
        <span className="block font-medium">{label}</span>
        {description && <span className="mt-1 block text-[14px] text-kg-sage-500">{description}</span>}
      </span>
    </label>
  );
}
