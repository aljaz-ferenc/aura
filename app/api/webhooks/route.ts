import { verifyWebhook } from "@clerk/nextjs/webhooks";
import type { NextRequest } from "next/server";
import { createUserSchema } from "@/app/api/webhooks/types";
import { createUser } from "@/lib/data-access/user";

export async function POST(req: NextRequest) {
  console.log("Webhook request received");
  try {
    const evt = await verifyWebhook(req);
    console.log("Webhook event:", evt.type, evt.data);

    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
      const { email_addresses, first_name, image_url, last_name } = evt.data;
      console.log("EVT TYPE: ", evt.type);

      const clerkData = {
        clerkId: id,
        firstName: first_name,
        lastName: last_name,
        email: email_addresses[0].email_address,
        avatar: image_url,
      };

      const validation = createUserSchema.safeParse(clerkData);

      if (!validation.success) {
        console.error("Validation failed:", validation.error.message);
        return new Response("Invalid user data", { status: 200 });
      }

      try {
        await createUser(validation.data);
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
