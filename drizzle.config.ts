import dotenv from "dotenv";

import { defineConfig } from "drizzle-kit";

dotenv.config({ path: ".env.local" }); // Load .env variables at the very start

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error(
		"[drizzle-config.ts]: DATABASE_URL environment variable is not set",
	);
}

export default defineConfig({
	out: "./drizzle",
	schema: "./src/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: databaseUrl,
	},
});
