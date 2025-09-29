import { verifyWebhook } from "@clerk/nextjs/webhooks";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/db/db";
import { User } from "@/lib/db/models/User.model";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
      const { email_addresses, first_name, image_url, last_name } = evt.data;

      const userData = {
        clerkId: id,
        firstName: first_name,
        lastName: last_name,
        email: email_addresses[0].email_address,
        avatar: image_url,
      };

      try {
        await connectDB();
        await User.create(userData);
      } catch (dbError) {
        console.error("Database error creating user:", dbError);
      }
    }
    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook: ", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
