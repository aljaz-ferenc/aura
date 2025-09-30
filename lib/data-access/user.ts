"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { cache } from "react";
import type { InitUserData } from "@/app/api/webhooks/types";
import type { User } from "@/app/types";
import clientPromise from "@/lib/db/db";

export const getCurrentUser = cache(async (): Promise<User> => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  try {
    const client = await clientPromise;
    const db = client.db("prod");
    const user = await db
      .collection<User>("users")
      .findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return user;
  } catch (err) {
    throw new Error(`Could not get current user: ${err}`);
  }
});

export async function createUser(userData: InitUserData) {
  try {
    const client = await clientPromise;
    const db = client.db("prod");
    await db.collection("users").insertOne(userData);
  } catch (err) {
    throw new Error(`Could not create user: ${err}`);
  }
  return;
}
