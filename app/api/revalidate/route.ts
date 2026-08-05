import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity calls this whenever a document is published, so edits go live without a
 * redeploy. Configure the webhook in Sanity under API > Webhooks:
 *
 *   URL:     https://www.doubletap.work/api/revalidate
 *   Dataset: production
 *   Trigger: Create, Update, Delete
 *   Secret:  same value as SANITY_REVALIDATE_SECRET
 */
type WebhookPayload = { _type: string };

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      return new NextResponse("Missing SANITY_REVALIDATE_SECRET", {
        status: 500,
      });
    }

    const { body, isValidSignature } = await parseBody<WebhookPayload>(
      req,
      secret
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse("Bad request: missing _type", { status: 400 });
    }

    revalidateTag(body._type);

    return NextResponse.json({ revalidated: true, tag: body._type });
  } catch (error) {
    console.error("Revalidation webhook failed", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
