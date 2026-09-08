export default function SectionHead({ eyebrow, title, lead, action, className = "" }) {
  return (
    <div className={`mb-8 flex flex-wrap items-end justify-between gap-8 ${className}`}>
      <div>
        {eyebrow && <div className="kg-eyebrow">{eyebrow}</div>}
        <h2 className="mt-2 text-[28px] md:text-[34px]">{title}</h2>
        {lead && <p className="mt-3 max-w-[60ch] text-[17px] text-kg-moss-900">{lead}</p>}
      </div>
      {action}
    </div>
  );
}
