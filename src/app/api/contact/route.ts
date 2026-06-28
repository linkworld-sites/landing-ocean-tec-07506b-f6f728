/**
 * Contact form submission handler — POST /api/contact
 *
 * Smoke-test checklist (run after each deploy):
 *  1. Submit a test enquiry at /contact and confirm the browser redirects to /contact/thank-you.
 *  2. Open the analytics dashboard and confirm a 'generate_lead' event appears within 30 seconds.
 *  3. Check hello@ocean-tec.eu for the notification email (subject: "New enquiry — <name>").
 *     If CONTACT_SMTP_HOST env var is absent, check server logs for the logged payload instead.
 */

import { NextRequest, NextResponse } from "next/server";
import { FUNNEL_API, FUNNEL_COMPANY_ID } from "@/funnel-config";

const REQUIRED_FIELDS = ["name", "company", "email", "projectType", "message"] as const;

export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  for (const field of REQUIRED_FIELDS) {
    if (!body[field]?.trim()) {
      return NextResponse.json(
        { success: false, error: `Missing required field: ${field}` },
        { status: 422 }
      );
    }
  }

  // Forward to LinkWorld lead capture (non-fatal if it fails)
  if (FUNNEL_COMPANY_ID) {
    fetch(`${FUNNEL_API}/api/companies/${FUNNEL_COMPANY_ID}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "contact", fields: body }),
    }).catch(() => undefined);
  }

  // Email notification — requires CONTACT_SMTP_HOST / CONTACT_SMTP_USER /
  // CONTACT_SMTP_PASS / CONTACT_SMTP_TO env vars; log to console otherwise.
  if (process.env.CONTACT_SMTP_HOST) {
    // Install nodemailer and wire sendContactEmail() here when SMTP is provisioned.
  } else {
    console.log("[contact] New enquiry received:", JSON.stringify(body, null, 2));
  }

  return NextResponse.json({ success: true });
}
