<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Agent Operating Manual — create-next-template

This file is the single source of truth for any agent (Claude Code, Cursor,
Copilot, or a human) working in this repository. `CLAUDE.md` imports this
file directly (`@AGENTS.md`) rather than duplicating it — edit this file,
not that one.

## What this project is

An opinionated, enterprise-grade Next.js starter template (App Router).
The goal is a codebase that reads the same whether it was written by
Vivek or by an agent six months from now — consistent conventions over
clever one-offs. It ships as a `create-next-app`-style template, not an
application with business logic of its own.

## Read this first: the stage docs

The architecture isn't ad-hoc — it's built out in ten staged guides under
`src/docs/dev/`, each one a deliverable with an explicit checklist:

| Stage | File                                         | Status                                                                                                                                                                                  |
| ----- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | `01-project-initialization.md`               | ✅ Done                                                                                                                                                                                 |
| 2     | `02-professional-development-environment.md` | ✅ Done                                                                                                                                                                                 |
| 3     | `03-enterprise-architecture.md`              | ✅ Done — canonical folder-structure reference                                                                                                                                          |
| 4     | `04-design-system-guide.md`                  | ✅ Done                                                                                                                                                                                 |
| 5     | `05-design-implementation-guide.md`          | ✅ Done                                                                                                                                                                                 |
| 6     | `06-reusable-ui-guide.md`                    | ✅ Done                                                                                                                                                                                 |
| 7     | `07-icons-guide.md`                          | ✅ Done (with a caveat — see Landmines: lucide-react's brand icons)                                                                                                                     |
| 8     | `08-project-env-setup.md`                    | ✅ Done                                                                                                                                                                                 |
| 9     | `09-shadcn-design-guide.md`                  | ⬜ Not started — no `components/ui/shadcn` yet. `Drawer`/`Card`/`Background` were hand-built instead of via shadcn; revisit when this stage lands                                       |
| 10    | `10-api-layer-guide.md`                      | ◐ Partially pulled forward — `errors.ts` + `asyncHandler.ts` exist and are used throughout; the shared `apiClient` with interceptors/token refresh described in this stage does not yet |

**Before touching a folder this table covers, read that stage's doc first.**
It documents _why_ the structure is what it is, not just what it is — the
"why" is usually the difference between a good change and a plausible-looking
one that breaks a documented convention.

## What's actually built (beyond the 10 stages)

The stage docs cover the foundation; a fair amount of feature work has
landed on top of it since:

- **Navigation** — `Header.tsx` + `Footer.tsx` are real, not placeholders.
  Desktop mega-dropdown (hover-driven, `NavigationProvider` +
  `useHoverDropdown`), a mobile `Drawer` (slide-in panel,
  `components/ui/drawer/`), both reading from `navigation.config.ts`.
- **Forms** — one generic engine, `components/features/forms/DynamicForm.tsx`
  (schema validation, Card-wrapped layout, field rendering), with thin
  wrappers per domain: `AuthForm`, `ContactForm`, `ProfileForm` /
  `ChangePasswordForm`. Each domain's field/schema config lives in
  `packages/forms/{auth,contact,profile}.forms.ts`, sharing types from
  `packages/forms/form.types.ts`.
- **Full auth flow (frontend only, no backend wired)** — sign in, sign up,
  and a complete forgot-password → OTP → reset-password sequence
  (`app/(auth)/forget-password/{,verify-otp,reset-password}`), handing
  state between steps via search params.
- **`Background.tsx`** — scopes a color/gradient/image/slideshow background
  to whatever it wraps (a `<Hero />`, not the whole page). Slideshow variant
  supports any animation type from `animation.config.ts` (fade, blur, zoom,
  slide, scale, rotate, flip, bounce, skew).
- **`Card.tsx`** — centralized surface component (`variants="interactive"|"static"`,
  `flush` to drop the default padding for a card with its own header/content/
  footer sections). `AuthForm`/`ContactForm`/`ProfileForm` all render through it.

## Non-negotiable conventions

- **TypeScript strict mode.** `type` over `interface`. Never `any` — use
  `unknown` and narrow it.
- **Arrow function components.** No `function Component() {}`.
- **`@/*` path aliases only** (`@/packages/...`, `@/components/...`,
  `@/types/...`) — configured in `tsconfig.json`. Never a deep relative
  import (`../../../foo`).
- **Zod is the only validation layer.** Form/input rules live in
  `packages/configs/schema.config.ts` (the shared field-rule primitives)
  and get composed in `packages/schemas/*.schema.ts`. Don't hand-roll a
  regex or a length check somewhere else.
- **No raw `process.env` outside `packages/env`.** Every environment
  variable is read once, through a Zod schema, in `client.env.ts`,
  `app.env.ts`, or `auth.env.ts` — see Stage 8. If you need a new env var,
  add it to the relevant schema, not to a `process.env.X` call site.
  Client-readable vars **must** be prefixed `NEXT_PUBLIC_` or Next.js
  won't inline them into the browser bundle (this exact bug shipped once
  already — see Landmines).
- **`asyncHandler` + `AppError` for anything that can fail.** Wrap service
  calls in `asyncHandler(promise)` (`packages/utils/asyncHandler.ts`) and
  destructure `[error, data]` — don't `try/catch` at the call site.
  Anything thrown gets normalized to `AppError` via `toAppError`
  (`packages/utils/errors.ts`).
- **Icons go through the registry.** `LucideIcon`
  (`components/ui/images/LucideIcon.tsx`) — never
  `import { X } from "lucide-react"` directly in a feature component. See
  Stage 7, and the barrel-export + brand-icon landmines below.
- **New form = a config object, not a new component.** Adding a form means
  adding an entry to (or a new file alongside) `auth.forms.ts` /
  `contact.forms.ts` / `profile.forms.ts` and rendering `<DynamicForm />`
  (or a thin domain wrapper around it) — not copy-pasting `FormLayout`/
  `FormFields` again.
- **Biome, not ESLint/Prettier.** Suppression comments are
  `// biome-ignore lint/<rule>: <reason>` on the line directly above the
  flagged one — an `eslint-disable` comment is silently ignored here.
- **Bun is the package manager and runtime.** `bun install`, `bun run dev`,
  etc. `bun.lock` is the real lockfile; don't commit a `package-lock.json`
  or `yarn.lock`.

## Commands

```bash
bun install           # install deps
bun run dev            # dev server (Turbopack)
bun run build           # production build
bun run verify          # lint + format + check + typecheck — run before any PR
```

## Known landmines (found the hard way — don't reintroduce these)

- **Never wrap a token in `hsl()`.** Every color custom property in
  `globals.css` is a full OKLCH value (`--primary: oklch(0.59 0.11 216)`).
  `hsl(var(--primary))` is invalid CSS — the browser silently drops the
  declaration, no console error. Always `var(--x)` directly, or
  `color-mix(in oklch, var(--x) N%, transparent)` for an alpha-blended
  variant (see `input.css` or `button.css` for the pattern). This shipped
  broken in `button.css`, `link.css`, `typography.css`, and twice in
  `AuthForm.tsx`'s inline styles before being caught.
- **`server-only` modules can't be re-exported from a barrel a Client
  Component also imports from.** `components/ui/index.ts` deliberately
  does NOT export `LucideIcon` or `NavigationLogo` — both transitively
  import `server-only` (directly, and via `appConfig` → `app.env.ts`,
  respectively), and `app/error.tsx` / `app/dev/design-system/page.tsx`
  are Client Components that import from that same barrel. Adding either
  export back in breaks the build for every consumer of the barrel, not
  just the one that needed the server-only piece. Import them by their
  direct path from a Server Component instead.
- **A bare keyframe name is not a full `animation` value.**
  `getAnimationStyle()` (`packages/utils/animation.ts`) returns the full
  `animationName`/`animationDuration`/`animationTimingFunction`/
  `animationFillMode` set — spread it into `style`. `FindAnimation()`
  alone only returns the name; using that as `{ animation: name }` sets
  _just_ `animation-name`, duration defaults to `0s`, and nothing visibly
  plays. This shipped broken in the mega-dropdown's entrance animation.
- **A hover-driven "close after a delay" needs to check it's still the
  active one when the timer fires.** With multiple sibling dropdowns
  sharing one `activeId`, a naive `setTimeout(() => onSelect(null), delay)`
  on mouseleave races: moving A → B opens B immediately, but A's _delayed_
  close then fires anyway and clobbers B back to closed. See
  `packages/hooks/useHoverDropdown.ts` — it tracks the latest id in a ref
  and only closes if nothing claimed the slot in the meantime. Reuse this
  hook for any future hover-group UI rather than re-deriving the fix.
- **A CSS transition needs a committed "before" frame.** Setting an
  element's opacity (or any transitioned property) to its _target_ value
  in the same render that creates the element means there's nothing to
  transition from — it just appears at the target value instantly. This
  is why `Background.tsx`'s slideshow crossfade works by having the
  _incoming_ layer fade itself in (`getAnimationStyle`) over the outgoing
  layer sitting still underneath, rather than trying to fade the outgoing
  layer out.
- **`lucide-react` (this version) has no brand/logo icons.** `Github`,
  `Twitter`, `Linkedin`, etc. don't exist in the icon registry — they were
  removed upstream. `components/ui/svg/{GithubIcon,XIcon,LinkedinIcon}.tsx`
  are hand-written SVGs for this, following the same escape-hatch pattern
  as `EyeOpen`/`EyeClose`. Check `Object.keys(require("lucide-react").icons)`
  before assuming a brand icon exists.
- **`next-env.d.ts` doesn't exist until the first `dev`/`build` run.** It's
  gitignored and auto-generated. A fresh clone's `tsc --noEmit` will fail
  on `.png`/image imports (`next/image-types/global` isn't referenced yet)
  until `bun run dev` or `bun run build` runs once. Not a real bug if you
  hit it on a brand-new checkout.
- **`packages/store` and `packages/services` are flat files today**
  (`app.store.ts`, `auth.services.ts`, `navigation.store.ts`), not the
  `context/reducers/slices` or `api/auth/storage` subfolder structure
  Stage 3's doc describes. Known, not-yet-resolved gap — don't "fix" it
  by moving files without checking every import site first.
- **`InputFactory` supports 6 of the 11 types Stage 6 documents** (text,
  email, password, checkbox, select, textarea — missing number, radio,
  switch, date, search). Extend it there; don't build a parallel input
  component.
