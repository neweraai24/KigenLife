export default function SpecTable({ rows = [], caption, className = "" }) {
  return (
    <table className={`w-full border-collapse text-[17px] ${className}`}>
      {caption && (
        <caption className="kg-eyebrow pb-3 text-left">{caption}</caption>
      )}
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-b border-kg-sage-500/25">
            <th
              scope="row"
              className="w-[38%] py-3 pr-4 text-left align-top text-[15px] font-normal text-kg-sage-500"
            >
              {r.label}
            </th>
            <td className={`py-3 text-kg-moss-900 ${r.mono ? "font-mono text-[15px]" : "text-[17px]"}`}>
              {r.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
