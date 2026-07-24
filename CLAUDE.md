@AGENTS.md

## Claude Code session workflow

- Before editing anything under a folder covered by the stage table in
  AGENTS.md, read that stage's doc in `src/docs/dev/` first — it explains
  the "why," not just the "what."
- Adding a form? Check `components/features/forms/DynamicForm.tsx` and an
  existing config (`packages/forms/contact.forms.ts` is the shortest one)
  before writing a new form component from scratch — it's almost
  certainly a config object plus a thin wrapper, not new form-rendering
  logic.
- Before finishing any task that touched `.ts`/`.tsx`/`.css` files, run:

  ```bash
  bun run verify
  ```

  (lint + format + check + typecheck). A change that compiles but fails
  `biome check` isn't done — fix it in the same session rather than
  leaving it for the next one. If `tsc` fails only on an image import on
  a fresh clone, run `bun run dev` once first — see the `next-env.d.ts`
  landmine in AGENTS.md.

- If a change touches anything CSS-related, remember: this project's
  tokens are OKLCH, not HSL — see the landmines section in AGENTS.md
  before writing `hsl(...)` anywhere.
- If a change touches animation (CSS or `packages/utils/animation.ts`),
  use `getAnimationStyle()` directly in a `style`
  prop — see the bare-keyframe-name landmine in AGENTS.md.
- Prefer extending an existing pattern (see `packages/utils`,
  `packages/schemas`, `packages/forms` for examples of the established
  shape) over introducing a new one for the same kind of problem.
