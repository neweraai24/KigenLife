import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Sản phẩm",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tên sản phẩm",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sku",
      title: "Mã sản phẩm (SKU)",
      type: "slug",
      description: "Mã dùng trong đường dẫn, ví dụ: GB227-110. Bấm Generate để tạo từ tên, hoặc gõ tay.",
      options: { source: "name", maxLength: 40 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "line",
      title: "Dòng sản phẩm",
      type: "string",
      options: {
        list: [
          { title: "Củ nguyên", value: "cu" },
          { title: "Sâm lát", value: "lat" },
          { title: "Bột sâm", value: "bot" },
          { title: "Chế biến", value: "che" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Ảnh sản phẩm",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Giá bán (₫)",
      type: "number",
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: "unit",
      title: "Đơn vị tính",
      type: "string",
      description: "Ví dụ: hộp, túi, lon, hũ, gói",
    }),
    defineField({
      name: "weight",
      title: "Khối lượng tịnh",
      type: "string",
      description: "Ví dụ: 227 g, 60 × 3 g",
    }),
    defineField({
      name: "age",
      title: "Tuổi sâm (năm)",
      type: "number",
      description: "Để trống nếu sản phẩm chế biến không ghi tuổi sâm.",
      validation: (Rule) => Rule.min(1).max(20),
    }),
    defineField({
      name: "note",
      title: "Mô tả ngắn",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "inStock",
      title: "Còn hàng",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Hiển thị ở Trang chủ (Hộp quà biếu)",
      type: "boolean",
      initialValue: false,
      description: "Bật để đưa sản phẩm này vào mục nổi bật trên trang chủ.",
    }),
    defineField({
      name: "order",
      title: "Thứ tự hiển thị",
      type: "number",
      description: "Số nhỏ hơn hiển thị trước. Để trống thì xếp theo tên.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "sku.current", media: "image" },
  },
});
