export default function Field({ label, htmlFor, required = false, hint, error, className = "", children }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={htmlFor} className="text-[15px] font-medium text-kg-moss-900">
          {label} {required && <span className="text-kg-alert-600">*</span>}
        </label>
      )}
      {children}
      {hint && !error && <span className="text-[13px] text-kg-sage-500">{hint}</span>}
      {error && <span className="text-[13px] text-kg-alert-600">{error}</span>}
    </div>
  );
}
