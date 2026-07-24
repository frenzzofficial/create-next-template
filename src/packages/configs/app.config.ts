import { envClientConfig } from "@/packages/env/client.env";
/**
 * config.app.ts
 * --------------------------------------------------------------
 * Non-secret, non-environment app constants.
 */

export const appConfig = Object.freeze({
  name: envClientConfig.APP_NAME,
  version: envClientConfig.APP_VERSION,
  locale: "en",
  defaultPageSize: 20,
  site: {
    url: envClientConfig.SITE_URL,
    name: envClientConfig.SITE_NAME,
    title: envClientConfig.SITE_TITLE,
    description: envClientConfig.SITE_DESCRIPTION,
    logoUrl: envClientConfig.LOGO_URL,
    Style: envClientConfig.ACTIVE_STYLE,
    Theme: envClientConfig.ACTIVE_THEME,
    ogImageUrl: envClientConfig.OG_IMAGE_URL,
  },
  socialMedia: {
    twitter: envClientConfig.TWITTER,
    github: envClientConfig.GITHUB,
    linkedin: envClientConfig.LINKEDIN,
  },
  routes: {
    home: "/",
    api: "/api",
    signin: "/signin",
    signup: "/signup",
    signout: "/signout",
    forgotPassword: "/forget-password",
    dashboard: "/dashboard",
    profile: "/profile",
    blogs: "/blogs",
    about: "/about",
    careers: "/careers",
    contact: "/contact",
  },
  keywords: ["bun", "typescript", "next.js", "react.js", "frontend"],
});

export type AppConfig = typeof appConfig;
