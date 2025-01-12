"use node";
import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { createHmac } from "crypto";

const webhookSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!;

function verifySignature(payload: string, signature: string): boolean {
  // Ensure `webhookSecret` is defined (e.g., through environment variables)
  if (!webhookSecret) {
    throw new Error("Webhook secret is not defined.");
  }

  // Create HMAC using SHA256 and the webhook secret
  const hmac = createHmac("sha256", webhookSecret);
  const computedSignature = hmac.update(payload).digest("hex");

  // Compare the computed signature with the provided signature
  return computedSignature === signature;
}

export const verifyWebhook = internalAction({
  args: {
    payload: v.string(),
    signature: v.string(),
  },
  handler: async (ctx, args) => {
    const isValid = verifySignature(args.payload, args.signature);

    if (!isValid) {
      throw new Error("Invalid signature");
    }

    return JSON.parse(args.payload);
  },
});
