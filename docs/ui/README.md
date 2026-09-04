# Layout primitives (`@/components/ui/layouts`)

A small, composable vocabulary of layout components. They control **spacing,
alignment, and structure only** — never color, typography, or business
logic. If you find yourself reaching for one of these and then overriding
its colors or fonts via `className`, that's a sign the thing you're
building is a *component*, not a layout.

```ts
import { Stack, Inline, Container, Grid } from "@/components/ui/layouts";
```

All 12 primitives are plain function components with no client-only hooks
or browser APIs, so they render fine from Server Components. You only need
`"use client"` in whatever *parent* component owns interactive state (e.g.
a sidebar's collapsed/expanded toggle) — never in these files themselves.

## Component overview

| Component | Purpose |
|---|---|
| `Box` | Generic element + padding. The base every other primitive is built on. |
| `Stack` | Single-axis flex layout (vertical or horizontal) with a gap. |
| `Inline` | Horizontal `Stack` that wraps by default — rows of same-height items. |
| `Cluster` | Wrapping horizontal group with `justify` control — tag/chip groups. |
| `Split` | Pushes children to opposite ends of a row — title + actions. |
| `Center` | Centers content vertically, horizontally, or both. |
| `Container` | Centers page content and caps its width, with a horizontal gutter. |
| `Grid` | CSS grid with fixed responsive columns or an auto-fit "card grid" mode. |
| `Sidebar` | Sidebar + main content, stacked on mobile, side-by-side above a breakpoint. |
| `AspectRatio` | Locks content (image/video/embed) to a width : height ratio. |
| `ScrollArea` | Native-scrollbar scroll container, one or both axes. |
| `Spacer` | Flexible (`flex: 1`) or fixed-size space inside a flex layout. |

## Design tokens

Every primitive pulls its spacing and alignment from `./tokens.ts` instead
of hardcoding Tailwind classes, so the whole system stays on one scale:

```ts
type Space = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type Align = "start" | "center" | "end" | "stretch" | "baseline";
type Justify = "start" | "center" | "end" | "between" | "around" | "evenly";
```

`Space` maps to `gap-*`/`p-*`/`px-*` classes on the default Tailwind scale
(`md` → `1rem`, etc.). If the product's spacing scale ever changes, this is
the one file to touch — no primitive hardcodes a raw Tailwind class for
spacing.

## API examples

### Stack — vertical by default

```tsx
<Stack gap="sm">
  <Field label="Email" />
  <Field label="Password" />
</Stack>
```

### Inline — a row of chips that wraps

```tsx
<Inline gap="sm">
  <Badge>New</Badge>
  <Badge>Beta</Badge>
</Inline>
```

### Split — title + action on opposite ends

```tsx
<Split>
  <Heading>Team members</Heading>
  <Button>Invite</Button>
</Split>
```

### Container — page-level width cap

```tsx
<Container size="lg">
  <Article />
</Container>
```

### Grid — responsive fixed columns

```tsx
<Grid columns={1} responsive={{ md: 2, lg: 3 }} gap="lg">
  {posts.map((post) => (
    <Card key={post.id} {...post} />
  ))}
</Grid>
```

### Grid — auto-fit card grid (no breakpoints needed)

```tsx
<Grid minItemWidth="220px" gap="md">
  {items.map((item) => (
    <Card key={item.id} {...item} />
  ))}
</Grid>
```

### Sidebar — collapsible, parent owns the state

```tsx
"use client";

function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sidebar
      sidebar={<Nav collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />}
      collapsed={collapsed}
      sticky
    >
      {children}
    </Sidebar>
  );
}
```

### AspectRatio — media that keeps its shape

```tsx
<AspectRatio ratio={16 / 9} className="rounded-lg">
  <img src={cover} alt="" className="h-full w-full object-cover" />
</AspectRatio>
```

### ScrollArea — a bounded, scrollable pane

```tsx
<ScrollArea maxHeight="20rem">
  <ChatMessages />
</ScrollArea>
```

### Spacer — push one item to the far end

```tsx
<Stack direction="horizontal">
  <Logo />
  <Spacer />
  <UserMenu />
</Stack>
```

## Composition examples

Layout primitives are meant to nest. A typical dashboard page:

```tsx
<Container size="xl">
  <Sidebar sidebar={<DashboardNav />} sticky>
    <Stack gap="lg">
      <Split>
        <Heading>Overview</Heading>
        <Inline gap="sm">
          <Button variant="secondary">Export</Button>
          <Button>New report</Button>
        </Inline>
      </Split>

      <Grid columns={1} responsive={{ md: 2, xl: 3 }} gap="md">
        {stats.map((stat) => (
          <Box key={stat.id} as="article" padding="lg" className="rounded-xl border border-border bg-card">
            <Stack gap="xs">
              <span className="text-muted-foreground text-sm">{stat.label}</span>
              <span className="text-2xl font-semibold">{stat.value}</span>
            </Stack>
          </Box>
        ))}
      </Grid>
    </Stack>
  </Sidebar>
</Container>
```

## Responsive examples

Most primitives take responsiveness as an explicit prop rather than asking
you to hand-write breakpoint classes:

```tsx
{/* 1 column on mobile, 2 from md, 3 from xl */}
<Grid columns={1} responsive={{ md: 2, xl: 3 }} />

{/* Stacked on mobile, side-by-side from md, sidebar fixed at 18rem */}
<Sidebar sidebar={<Nav />} width="18rem" breakpoint="md">{children}</Sidebar>
```

When a primitive's props don't cover a responsive need (e.g. changing
`gap` itself per breakpoint), fall back to `className` with Tailwind's
responsive prefixes — that's what `className` is there for:

```tsx
<Stack className="gap-2 md:gap-6" />
```

## Design-system guidelines

- **Layout only.** No color, shadow, typography, border-radius, or business
  logic in these files. Colors/typography come from the design system
  (`bg-card`, `text-muted-foreground`, etc.) applied via `className` at the
  call site.
- **Compose, don't specialize.** `Inline`, `Cluster`, and `Split` are all
  thin wrappers over `Stack`. Prefer composing existing primitives over
  adding a new one-off primitive for a single page.
- **`className` always wins.** Every primitive forwards `className` last
  through `cn()`, so consumer overrides are never fought.
- **Spacing goes through `tokens.ts`.** Don't hardcode `gap-4` in a
  one-off component — either use an existing `Space` value or add a step
  to the scale if the product genuinely needs it.
- **Keep the vocabulary small.** Twelve primitives is already a lot to
  learn — resist growing this list casually.

## When *not* to create a new layout component

Don't add a new primitive here for:

- **A one-off arrangement used in a single place.** Compose existing
  primitives inline instead (e.g. `<Stack><Split>...</Split></Stack>`).
- **Anything with business logic or data fetching.** That belongs in
  `components/features/*`, not `components/ui/layouts`.
- **Page- or feature-specific wrappers** like `DashboardWrapper`,
  `ProfileLayoutWrapper`, or `SettingsContainer`. If a shape really is
  reused across a whole feature, build it as a feature component that
  *composes* these primitives — don't fold feature-specific naming or
  structure into the layout system itself.
- **Anything that needs its own colors, typography, or elevation.** That's
  a UI component (`components/ui/card`, `components/ui/buttons`, ...), not
  a layout primitive.

If a genuinely new *layout shape* (not a styled variant of an existing one)
shows up in three or more unrelated places, that's the signal to promote it
into this folder.
