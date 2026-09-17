import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@/lib/db/schema";

function readEnv(name: string) {
  return (
    process.env[name]?.trim() ||
    process.env[`devesh_${name}`]?.trim() ||
    ""
  );
}

function databaseUrl() {
  return readEnv("TURSO_DATABASE_URL") || readEnv("DATABASE_URL");
}

function createDb() {
  const url = databaseUrl();
  if (!url) {
    throw new Error("TURSO_DATABASE_URL or DATABASE_URL is required");
  }

  const client = createClient({
    url,
    authToken: readEnv("TURSO_AUTH_TOKEN") || undefined,
  });

  return drizzle(client, { schema });
}

type AppDb = ReturnType<typeof createDb>;

const globalForDb = globalThis as unknown as {
  db?: AppDb;
};

function getDb(): AppDb {
  if (!globalForDb.db) {
    globalForDb.db = createDb();
  }
  return globalForDb.db;
}

export const db = new Proxy({} as AppDb, {
  get(_target, prop) {
    const instance = getDb();
    const value = Reflect.get(instance, prop, instance);
    if (typeof value === "function") {
      return value.bind(instance);
    }
    return value;
  },
});
