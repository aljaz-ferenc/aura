import { verifyWebhook } from "@clerk/nextjs/webhooks";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const { id } = evt.data;
    const eventType = evt.type;

    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`,
    );
    console.log("Webhook payload:", evt.data);

    switch (eventType) {
      case "user.created": {
        const { email_addresses, first_name, image_url, last_name, username } =
          evt.data;
        const user = {
          email: email_addresses[0].email_address,
          firstName: first_name,
          clerkId: id,
          image: image_url,
          lastName: last_name,
          username,
        };
        console.log("USER CREATED: ", user);
        // TODO: Create user
        break;
      }
      case "user.deleted":
        console.log("USER DELETED EVT");
        // TODO: Delete user
        break;
      case "user.updated":
        console.log("USER UPDATED EVT");
        break;
      // TODO: Update user
      default:
        console.warn(`Unhandled event type: ${eventType}`);
    }
    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
