import { NextResponse } from "next/server";

type Body = {
  name?: string;
  email?: string;
  message?: string;
};

function sanitize(input: string, max = 2000) {
  return String(input || "").replace(/[\u{1F300}-\u{1FAFF}]/gu, "").slice(0, max);
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = sanitize(body.name || "", 120).trim();
  const email = sanitize(body.email || "", 200).trim();
  const message = sanitize(body.message || "", 4000).trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
  }

  // Very basic email check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const to = process.env.CONTACT_TO_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!to || !apiKey) {
    // Graceful fallback: no email configured
    console.log("Contact message (email not configured)", { name, email, message: message.slice(0, 200) + (message.length > 200 ? "…" : "") });
    return NextResponse.json({
      ok: true,
      message: "Message received. Email service not configured; please set RESEND_API_KEY and CONTACT_TO_EMAIL.",
    });
  }

  try {
    const { Resend } = await eval('import("resend")');
    const resend = new Resend(apiKey);
    const subject = `[Contact] ${name} <${email}>`;
    const html = `
      <h2>New contact message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;font-family:ui-monospace,Menlo,Consolas,monospace;">${message}</pre>
    `;

    await resend.emails.send({ to, from: to, subject, html });
    return NextResponse.json({ ok: true, message: "Message sent successfully." });
  } catch (err) {
    console.error("Contact send error", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}

