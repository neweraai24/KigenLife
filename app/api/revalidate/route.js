import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

// Configured as a webhook in manage.sanity.io -> API -> Webhooks, pointing
// at https://<your-domain>/api/revalidate, so a Studio publish updates the
// live site within seconds instead of waiting for the 60s ISR window.
export async function POST(request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "SANITY_REVALIDATE_SECRET chưa được cấu hình" }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);

  const valid = signature && (await isValidSignature(body, signature, secret));
  if (!valid) {
    return NextResponse.json({ message: "Chữ ký không hợp lệ" }, { status: 401 });
  }

  revalidateTag("product");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
