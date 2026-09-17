import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "turso",
  tablesFilter: ["cms_*"],
  dbCredentials: {
    url:
      process.env.TURSO_DATABASE_URL ||
      process.env.devesh_TURSO_DATABASE_URL ||
      process.env.DATABASE_URL ||
      "",
    authToken:
      process.env.TURSO_AUTH_TOKEN || process.env.devesh_TURSO_AUTH_TOKEN,
  },
});
