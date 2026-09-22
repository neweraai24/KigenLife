import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/sanity/queries";

// Read by the cart context on the client, so cart line items can resolve
// current name/price/image for whatever SKUs are stored in localStorage.
export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json({ products });
}
