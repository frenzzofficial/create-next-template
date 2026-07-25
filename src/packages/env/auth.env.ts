import "server-only";
import { z } from "zod";
import { envClientConfig } from "./client.env";

/**
 * auth.env.ts
 * --------------------------------------------------------------
 * Server-only auth configuration for the BFF proxy in
 * `src/app/api/auth/[...path]/route.ts` and `packages/services/api/backend.ts`.
 *
 * Note on what's deliberately NOT here: a `JWT_SECRET`. This app never
 * verifies or signs the JWT itself — the external backend
 * (`BACKEND_API_ORIGIN` below) issues and validates it. This app's job is
 * only to relay the httpOnly cookie between the browser and that backend.
 * If a future project moves JWT verification into Next.js middleware
 * (edge-side, via `jose`) to skip a network round trip per request, the
 * shared verification secret/public key belongs in this file — not before
 * that's actually built.
 */
const authEnvSchema = z.object({
  // The real backend origin. Defaults to the same value the client config
  // already carries (`NEXT_PUBLIC_CLIENT_API_ORIGIN`) so nothing breaks if
  // this isn't set — but set BACKEND_API_ORIGIN explicitly in production.
  // Once every consumer goes through this BFF, the backend origin no
  // longer needs to be NEXT_PUBLIC_* at all; that's a follow-up cleanup,
  // not done here to avoid breaking any existing direct references.
  BACKEND_API_ORIGIN: z.url().trim().default(envClientConfig.CLIENT_API_ORIGIN),

  // Must match whatever cookie name(s) the backend actually sets in its
  // Set-Cookie header. Wrong name here = the proxy can't find the cookie
  // to relay, and auth silently never persists.
  SESSION_COOKIE_NAME: z.string().min(1).default("access_token"),
  REFRESH_COOKIE_NAME: z.string().min(1).default("refresh_token"),
});

const rawAuthEnv = {
  BACKEND_API_ORIGIN: process.env.BACKEND_API_ORIGIN,
  SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME,
  REFRESH_COOKIE_NAME: process.env.REFRESH_COOKIE_NAME,
};

const parsedAuthEnv = authEnvSchema.safeParse(rawAuthEnv);

if (!parsedAuthEnv.success) {
  console.error("❌ Invalid auth environment variables:");
  parsedAuthEnv.error.issues.forEach((issue) => {
    console.error(`- ${issue.path.join(".")}: ${issue.message}`);
  });
  throw new Error("Auth environment validation failed");
}

export const envAuthConfig = Object.freeze(parsedAuthEnv.data);
export type EnvAuthConfig = typeof envAuthConfig;
