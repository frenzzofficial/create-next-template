# Guide: Browsing the UI Library (`/dev`)

Before building a new page, you can look at every component this
template ships with — real, live, rendered — instead of reading source
files to guess what something looks like. That's what `/dev` is for.

## Getting there

```bash
bun run dev
```

Then open [http://localhost:3000/dev](http://localhost:3000/dev).

This route **only renders in development.** In a production build
(`bun run build && bun run start`) it returns nothing — it's not part
of the app your users see, and it's not something you need to remember
to hide before deploying.

## How it works

`/dev` is a single route with a sidebar, not a set of separate pages.
Clicking a sidebar item doesn't navigate anywhere — it swaps the
content on the right via a bit of local state
(`src/app/dev/DevProvider.tsx`). Each panel is only fetched the moment
you click it (open your browser's Network tab and watch a new chunk
load in), so browsing this page never costs you more than what you
actually looked at.

The theme toggle in the top right applies to the whole page — every
color swatch, button, and card on `/dev` is reading the same tokens
your real app uses, so switching light/dark here shows you exactly
what switching it anywhere else in the app looks like.

## What's on each panel

| Sidebar item        | What you'll see                                                                                                                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Overview**        | A quick orientation — real counts (token/variant/type totals, not made-up numbers) and two shortcuts into the sections below.                                                                               |
| **Colors & tokens** | Every core color token as a swatch, reading the live CSS custom property. Click a swatch's value to copy `var(--the-token)` straight into your clipboard — paste it directly into whatever you're building. |
| **Style**           | tweakcn themes                                                                                                                                                                                              |
| **Typography**      | The three typefaces (sans/serif/mono) with real sample text, plus the full heading scale (`h1`–`h6`) at actual size, labeled with the fluid `clamp()` value behind each one.                                |
| **Buttons**         | All 6 variants (`primary`, `secondary`, `ghost`, `outline`, `danger`, `success`), shown both normal and disabled.                                                                                           |
| **Form controls**   | Every input type `InputFactory` currently supports — text/email, password (with the show/hide toggle), select, textarea, checkbox — including what an error state looks like.                               |
| **Surfaces**        | The centralized `<Card />`, both the static and interactive (hover-lift) variants.                                                                                                                          |

Each component preview shows the actual JSX tag used to render it
(e.g. `<Button variant={...} />`) underneath the live example, so you
know exactly what to write once you've found the variant you want.

## Using it while you build

The practical workflow this exists for:

1. Need a button? Open **Buttons**, look at all 6 variants side by
   side, pick the one that fits, copy the tag shown underneath it.
2. Need a color for something custom (a one-off background, a border)?
   Open **Colors & tokens**, click the swatch you want, paste
   `var(--x)` — never hardcode a hex value here, it won't follow theme
   changes the way a token reference does.
3. Building a form? Check **Form controls** first — if the input type
   you need already exists, you're wiring up `InputFactory` with a
   config entry (see `packages/forms/`), not writing a new input
   component.
4. Not sure if a heading size is too big or too small? **Typography**
   shows every level at its real rendered size, not a guess from
   reading a `font-size` value in a stylesheet.

## Adding something new to `/dev`

If you build a new component and want it documented here too:

1. Add a panel file under `src/app/dev/panels/` (copy the shape of an
   existing one — `ButtonsPanel.tsx` is a simple example).
2. Register it in the `PANELS` map in `src/app/dev/page.tsx` and add a
   `DevSection` value in `src/app/dev/DevProvider.tsx`.
3. Add a sidebar entry in `src/app/dev/DevSidebarNav.tsx`.

Each panel is lazy-loaded automatically just by being registered this
way — you don't need to do anything extra for the code-splitting to
apply to your new panel.
