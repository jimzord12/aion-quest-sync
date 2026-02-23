import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { Elysia } from "elysia";

dotenv.config({ path: ".env.local" }); // Load .env variables at the very start

// import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error("DATABASE_URL environment variable is not set");
}

// const migrationsClient = postgres(databaseUrl, { max: 1 });
// await migrate(db, { migrationsFolder: "drizzle" });

const db = drizzle(databaseUrl);

const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
