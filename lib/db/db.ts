import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "@/lib/env/env";

const client = new MongoClient(env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function pingDB() {
  try {
    await client.connect();
    await client.db("aura").command({ ping: 1 });
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

async function getDB(dbName: string) {
  try {
    await client.connect();
    return client.db(dbName);
  } catch (err) {
    console.error(err);
  }
}

export async function getCollection(collectionName: string) {
  const db = await getDB("aura");
  if (db) return db.collection(collectionName);

  return null;
}
