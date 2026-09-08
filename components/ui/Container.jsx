export default function Container({ as: Tag = "div", className = "", children, ...rest }) {
  return (
    <Tag className={`mx-auto max-w-[1160px] px-5 lg:px-10 ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
