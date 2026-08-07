import { envAppConfig } from "../env/app.env";
import { envClientConfig } from "../env/client.env";
import { envPublicConfig } from "../env/public.env";
import { createRoutes } from "../utils/endpoint";

const api = `${envClientConfig.CLIENT_ORIGIN}/${envClientConfig.CLIENT_PREFIX}`;

export const appConfig = Object.freeze({
  app: {
    name: envPublicConfig.APP_NAME,
    version: envPublicConfig.APP_VERSION,
    description: envPublicConfig.APP_DESCRIPTION,
    environment: envAppConfig.NODE_ENV,
    locale: "en",
    timezone: "UTC",
  },

  site: {
    url: envPublicConfig.SITE_URL,
    name: envPublicConfig.APP_NAME,
    title: envPublicConfig.SITE_TITLE,
    description: envPublicConfig.APP_DESCRIPTION,

    logoUrl: envPublicConfig.LOGO_URL,
    ogImageUrl: envPublicConfig.OG_IMAGE_URL,

    style: envPublicConfig.ACTIVE_STYLE,
    theme: envPublicConfig.ACTIVE_THEME,
  },

  author: {
    name: envPublicConfig.AUTHOR_NAME,
    email: envPublicConfig.AUTHOR_EMAIL,
  },

  logging: {
    enabled: envAppConfig.NODE_ENV !== "production",
    stackTrace: envAppConfig.NODE_ENV !== "production",
  },

  headers: {
    requestId: "X-Request-Id",
    traceId: "X-Trace-Id",
    poweredBy: "X-Powered-By",
  },

  pagination: {
    defaultPage: 1,
    defaultLimit: 20,
    maxLimit: 100,
  },

  socialMedia: {
    twitter: envPublicConfig.TWITTER,
    github: envPublicConfig.GITHUB,
    linkedin: envPublicConfig.LINKEDIN,
  },

  routes: {
    home: "/",
    about: "/about",

    docs: "/documentation",
    openapi: "/openapi",

    robots: "/robots.txt",
    sitemap: "/sitemap.xml",
    favicon: "/favicon.ico",

    blogs: "/blogs",
    contact: "/contact",
    careers: "/careers",
    dashboard: "/dashboard",
    profile: "/profile",

    auth: {
      signup: "/signup",
      signin: "/signin",
      signout: "/signout",
      forgotPassword: "/forgot-password",
    },
  },

  api: {
    auth: {
      email: createRoutes(`${api}/auth/email`, {
        signin: "/signin",
        signup: "/signup",
        signout: "/signout",
        refresh: "/refresh",
        me: "/me",
        verifyEmail: "/verify-email",
        forgotPassword: "/forgot-password",
        resetPassword: "/reset-password",
      }),

      phone: createRoutes(`${api}/auth/phone`, {
        signin: "/signin",
        signup: "/signup",
        sendOtp: "/send-otp",
        verifyOtp: "/verify-otp",
      }),
    },
  },

  keywords: ["next.js", "react", "typescript", "frontend", "template"],
});

export type AppConfig = typeof appConfig;
