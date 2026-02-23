## Runtime & Framework

- **Bun**
  - JavaScript/TypeScript runtime used to run the backend server.
  - Handles script running, dev server (`bun dev`), and production server process.

- **Elysia**
  - HTTP framework used to define routes, middlewares, and plugins.
  - All API endpoints (REST-style) are registered as Elysia routes.
  - Integrates with validation (Zod), OpenAPI generation, and auth middleware.

## Validation & Types

- **Zod (v4)**
  - Primary schema validation library for:
    - Request params, query, headers, and body.
    - Response payloads from each route.
  - Zod schemas are the single source of truth for:
    - Runtime validation.
    - TypeScript types (via `z.infer`).
    - JSON Schema / OpenAPI generation (via `z.toJSONSchema()`).

## Persistence Layer

- **Drizzle ORM**
  - Type-safe ORM used to interact with Postgres.
  - Defines database schema in TypeScript (tables, relations, enums).
  - Used in route handlers / services to perform queries and mutations.
  - Migration tooling manages schema changes over time.

- **PostgreSQL**
  - Primary relational database.
  - Stores all persistent data (users, sessions, domain entities, etc.).
  - Accessed only through Drizzle in application code.

## Authentication & Authorization

- **BetterAuth** (or similar auth toolkit)
  - Handles user authentication flows (sign up, login, sessions).
  - Integrates with Elysia middleware to:
    - Parse auth headers/cookies.
    - Attach user/session info to the request context.
  - Protects routes via guards (e.g., `authRequired` middleware).

## API Contract & Client Generation

- **Elysia OpenAPI Plugin (`@elysiajs/openapi`)**
  - Scans Elysia routes and Zod schemas to produce an OpenAPI spec (`/openapi.json`).
  - Uses Zod v4’s native JSON Schema support via `z.toJSONSchema()` to describe schemas.
  - The OpenAPI spec is exported and versioned for client generation.

- **OpenAPI TypeScript Generator (`@hey-api/openapi-ts`)**
  - Consumes the generated OpenAPI JSON file.
  - Produces a TypeScript client SDK and types used by the frontend (e.g., Next.js).
  - Ensures the frontend always calls backend APIs with correct paths, params, and types.

## Application Structure (High-Level)

- `src/app.ts`
  - Bootstraps Elysia app, registers global plugins (OpenAPI, auth), and mounts routes.

- `src/routes/*`
  - Route modules for each domain (e.g., `user`, `auth`, `posts`).
  - Each route defines:
    - Zod schemas for request/response.
    - Route handlers that call Drizzle and other services.

- `src/db/*`
  - Drizzle configuration and schema definitions.
  - Database connection setup.

- `scripts/*`
  - Scripts to:
    - Export `openapi.json` from the running Elysia server.
    - Run `@hey-api/openapi-ts` to regenerate the client SDK.
