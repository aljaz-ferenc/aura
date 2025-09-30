import { verifyWebhook } from "@clerk/nextjs/webhooks";
import type { NextRequest } from "next/server";
import { createUserSchema, type User } from "@/app/api/webhooks/types";
import { createUser, deleteUser, updateUser } from "@/lib/data-access/user";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    console.log("Webhook event:", evt.type, evt.data);

    const { id } = evt.data;
    if (!id) return new Response("User id not found", { status: 200 });

    const eventType = evt.type;

    if (eventType === "user.created") {
      const { email_addresses, first_name, image_url, last_name } = evt.data;

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

    if (eventType === "user.deleted") {
      try {
        await deleteUser(id);
      } catch (dbError) {
        console.error("Could not delete user: ", dbError);
      }
    }

    if (eventType === "user.updated") {
      const { email_addresses, first_name, image_url, last_name } = evt.data;

      const email = email_addresses?.[0]?.email_address ?? undefined;

      const updateData = {
        firstName: first_name,
        lastName: last_name,
        email,
        avatar: image_url,
      };

      const updateDataSchema = z.object({
        firstName: z
          .string()
          .min(1, { error: "firstName is not defined" })
          .optional(),
        lastName: z
          .string()
          .min(1, { error: "lastName is not defined" })
          .optional(),
        email: z.email({ error: "Invalid email format" }).optional(),
        avatar: z.url({ error: "Invalid url format for avatar" }).optional(),
      });

      try {
        const updateDataFiltered: Partial<User> = Object.fromEntries(
          Object.entries(updateData).filter(([_, v]) => v != null),
        ) as Partial<User>;

        const validation = updateDataSchema.safeParse(updateDataFiltered);
        if (!validation.success) {
          console.error("Validation failed:", validation.error.message);
          return new Response("Invalid user data", { status: 200 });
        }

        await updateUser(id, validation.data);
      } catch (dbError) {
        console.error("Could not update user: ", dbError);
      }
    }
    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook: ", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
