import "server-only";
import { z } from "zod";

/**
 * auth.env.ts
 * --------------------------------------------------------------
 * Server-only auth configuration for the BFF proxy in
 * `src/app/api/auth/[...path]/route.ts` and `packages/services/api/backend.ts`.
 */
const authEnvSchema = z.object({
  SESSION_COOKIE_NAME: z.string().min(1).default("access_token"),
  REFRESH_COOKIE_NAME: z.string().min(1).default("refresh_token"),
});

const rawAuthEnv = {
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
