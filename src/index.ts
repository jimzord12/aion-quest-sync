import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { Elysia } from "elysia";
import { envHealthCheck } from "./core/helpers/env-health-check";

dotenv.config({ path: ".env.local" }); // Load .env variables at the very start

// import postgres from "postgres";

const { envVars, isHealthy, missingEnvVars } = envHealthCheck(); // Check for required environment variables before proceeding

if (!isHealthy) {
	throw new Error(
		`Missing required environment variables: ${missingEnvVars.join(", ")}`,
	);
}

// const migrationsClient = postgres(databaseUrl, { max: 1 });
// await migrate(db, { migrationsFolder: "drizzle" });

const db = drizzle(envVars.DATABASE_URL);

const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
