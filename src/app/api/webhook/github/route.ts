import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { handlePullRequestEvent } from "@/lib/github/webhook";

const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-hub-signature-256");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    // Verify the cryptographic signature from GitHub securely
    if (WEBHOOK_SECRET) {
      const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
      const digest = "sha256=" + hmac.update(rawBody).digest("hex");
      
      // Security fix: Use timingSafeEqual to prevent timing attacks on the signature comparison
      const signatureBuffer = Buffer.from(signature);
      const digestBuffer = Buffer.from(digest);
      
      if (signatureBuffer.length !== digestBuffer.length || !crypto.timingSafeEqual(signatureBuffer, digestBuffer)) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    const event = req.headers.get("x-github-event");
    const payload = JSON.parse(rawBody);

    console.log(`Received GitHub webhook: ${event}`);

    // Route event types
    if (event === "pull_request") {
      const result = await handlePullRequestEvent(payload);
      return NextResponse.json(result, { status: 200 });
    }

    return NextResponse.json({ message: "Event ignored" }, { status: 200 });
  } catch (error) {
    console.error("Webhook processing failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
