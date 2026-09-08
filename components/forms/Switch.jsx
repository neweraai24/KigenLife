export default function Switch({ id, label, checked, onChange, className = "" }) {
  return (
    <label htmlFor={id} className={`flex cursor-pointer items-center gap-3 text-[15px] text-kg-moss-900 ${className}`}>
      <span
        role="switch"
        aria-checked={checked}
        onClick={() => onChange?.({ target: { checked: !checked } })}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-150 ${
          checked ? "bg-kg-moss-700" : "bg-kg-sage-500/30"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-kg-white transition-transform duration-150 ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </span>
      {label}
    </label>
  );
}
