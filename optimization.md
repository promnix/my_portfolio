# Optimization Report

Date: 2026-04-29  
Project: `promnix-portfolio`  
Framework: Next.js 16.2.4, React 19.2.4, Turbopack

## Summary

The project builds successfully, but the current app is leaving a lot of static-rendering and client-JavaScript performance on the table. The highest-impact issue is that every route is dynamic because the root layout reads cookies. The next biggest opportunities are reducing the global client boundary, limiting Motion usage on mostly static content, and moving font handling to `next/font`.

## Checks Run

- `npm run lint`: passed with 3 warnings.
- `npm run build`: passed outside the sandbox.
- Initial sandboxed build failed because Turbopack/PostCSS attempted to bind a local port during CSS processing and macOS returned `Operation not permitted`.

Production build result:

```text
▲ Next.js 16.2.4 (Turbopack)
✓ Compiled successfully in 15.5s
Finished TypeScript in 8.5s
Generated static pages: 12/12 in 679ms

Route (app)
┌ ƒ /
├ ƒ /_not-found
├ ƒ /about
├ ƒ /blog
├ ƒ /blog/[slug]
├ ƒ /project
└ ƒ /search

ƒ  Dynamic server-rendered on demand
```

Build artifact snapshot:

```text
.next         690M
.next/static 1.7M
.next/server 8.2M
largest client chunks: 221K, 146K, 131K, 110K, 53K, 48K CSS
```

## Priority Findings

### 1. All routes are dynamic because `cookies()` is used in the root layout

Location: `app/layout.tsx`

`RootLayout` calls `cookies()` to read the theme cookie. In the installed Next.js production guidance, request-time APIs such as `cookies` opt routes into dynamic rendering, and when used in the root layout they can affect the whole application. The build confirms this: `/`, `/about`, `/blog`, `/blog/[slug]`, `/project`, and `/search` are all marked `ƒ Dynamic`.

Impact:

- Static portfolio pages cannot be fully prerendered and CDN-cached as static HTML.
- Each route requires server rendering on demand.
- `generateStaticParams()` on `app/blog/[slug]/page.tsx` is less useful because the root layout still makes the rendered route dynamic.

Recommended fix:

- Remove `cookies()` from `app/layout.tsx`.
- Let the inline `theme-init` script read `localStorage` and `prefers-color-scheme`.
- If the cookie is only for theme persistence, do not use it during server render. Keep the default HTML theme deterministic, then update it before hydration with the existing `beforeInteractive` script.

Expected result:

- Static routes should move from `ƒ Dynamic` to prerendered/static output where no other request-time API is used.

### 2. `SiteShell` makes the global chrome a client component

Location: `components/site-shell.tsx`

The full site shell is marked `"use client"` because it owns menu state, theme toggling, scroll tracking, and Motion header animation. Since a client boundary includes its imports and children in the client module graph, this increases the amount of JavaScript needed across every route.

Impact:

- Every page pays for the shared shell's React state, `motion/react`, `lucide-react` icons used by the shell, scroll listener, and mobile-menu animation logic.
- Static footer/header markup that could be server-rendered is bundled into the client graph.

Recommended fix:

- Split `SiteShell` into a server shell plus small client islands:
  - `ThemeToggle.client.tsx`
  - `MobileMenu.client.tsx`
  - `BackToTop.client.tsx`
  - Optional `HeaderMotion.client.tsx`, or replace with CSS animation.
- Keep header/footer layout, links, and static contact/social data in a Server Component.

### 3. Motion is used broadly on static homepage content

Locations:

- `components/micro-interactions.tsx`
- `components/portfolio-home.tsx`
- `components/site-shell.tsx`

The homepage wraps many static sections with `Reveal`, `InteractiveDiv`, and `InteractiveArticle`. This pulls Motion runtime into the browser and attaches viewport/hover animation logic to content that is mostly presentational.

Impact:

- A Motion-heavy chunk is present in `.next/static/chunks`.
- Scroll reveal effects with `filter: blur(...)` are more expensive than transform/opacity-only animation.
- Many small animated wrappers add hydration and runtime work.

Recommended fix:

- Use CSS `@starting-style`, `animation-timeline` where acceptable, or simple CSS transitions for non-critical reveal effects.
- Keep Motion only where interaction state really needs React-driven animation, such as the mobile menu.
- Remove `filter: "blur(6px)"` from reveal animations first; transform + opacity is cheaper.

### 4. Root-level theme and intro scripts block early rendering work

Location: `app/layout.tsx`

There are two `beforeInteractive` scripts:

- `theme-init`
- `intro-splash-dismiss`

The theme script is useful to avoid flicker, but the intro script adds early main-thread work and intentionally delays the visible app with a cinematic splash for up to 1600ms on non-touch devices.

Impact:

- Perceived performance is intentionally slower.
- The intro overlay can delay access to useful content even after the page is ready.
- Extra DOM, timers, media queries, and animation CSS are loaded on every route.

Recommended fix:

- Keep the theme script minimal.
- Consider showing the intro only once per session via `sessionStorage`.
- Prefer no intro on repeat visits and non-home routes.
- If retained, reduce non-touch `minVisibleMs` from `1600` to a much shorter value or let the page content be immediately usable beneath it.

### 5. Fonts are imported through global CSS instead of `next/font`

Locations:

- `app/globals.css`
- `package.json`

The project imports font packages with CSS:

```css
@import "@fontsource-variable/manrope";
@import "@fontsource/cormorant-garamond/400.css";
@import "@fontsource/cormorant-garamond/500.css";
@import "@fontsource/cormorant-garamond/600.css";
@import "@fontsource/cormorant-garamond/700.css";
```

Next's production guidance recommends the Font Module because it hosts font files with static assets, avoids external requests, and reduces layout shift. The current approach is local, but `next/font/local` would give better integration with preloading and CSS variable assignment.

Recommended fix:

- Replace `@fontsource` imports with `next/font/local` if keeping these exact font files.
- Define CSS variables in `app/layout.tsx` and map them into Tailwind theme variables.
- Remove unused font package imports after migration.

### 6. Search updates the URL on every keystroke

Location: `components/search-client.tsx`

`router.replace()` runs inside `onChange` for every input change. The component uses `useTransition` and `useDeferredValue`, which helps, but each keystroke still schedules navigation state work.

Impact:

- More client-side routing work than necessary for a small in-memory search index.
- Browser history is not polluted because `replace` is used, but route state still changes continuously.

Recommended fix:

- Keep input state local while typing.
- Debounce URL updates by 200-300ms, or update the URL on submit/blur.
- Precompute a lowercase search blob in `searchEntries` or memoize normalized entries to avoid building a concatenated lowercase string for every entry on every render.

### 7. CSS effects are visually rich but paint-heavy

Location: `app/globals.css`

Notable effects:

- Fixed `.grain::before` overlay on every page.
- `backdrop-filter: blur(16px)` on section cards.
- Multiple large radial gradients on `body` and intro elements.
- `will-change: transform` on `.micro-card`.

Impact:

- Fixed overlays, backdrop filters, large gradients, and blur effects can increase paint/composite cost, especially on mobile.
- `will-change` should be used sparingly because it can reserve compositor resources even when the element is idle.

Recommended fix:

- Remove or reduce the global fixed grain overlay on mobile.
- Scope `will-change` to hover-capable devices, or apply it only during interaction.
- Audit `backdrop-filter` usage and replace common cards with opaque/translucent backgrounds where possible.

### 8. Lint warnings indicate dead imports

Location: `components/portfolio-home.tsx`

Warnings:

```text
'BriefcaseBusiness' is defined but never used
'InteractiveBlockquote' is defined but never used
'testimonials' is defined but never used
```

Cause: the testimonial section is commented out but its imports remain.

Recommended fix:

- Remove the unused imports, or restore the testimonial section.
- Keep `npm run lint` warning-free so future optimization regressions are easier to spot.

## What Is Already Good

- App Router pages are mostly Server Components by default.
- Blog detail pages use `generateStaticParams()` and `dynamicParams = false`.
- The search route keeps the dataset local and small; there is no avoidable network waterfall.
- `content-visibility: auto` is already used on `.project-row`.
- Scroll listeners use `{ passive: true }`.
- Reduced-motion handling exists for the intro and global animations.
- `next/script` is used for inline boot scripts instead of raw script tags.

## Suggested Implementation Order

1. Remove `cookies()` from `app/layout.tsx` and verify routes become static where expected.
2. Split `SiteShell` into a Server Component plus small client islands.
3. Reduce Motion usage on homepage sections; remove blur from reveal transitions first.
4. Make the intro splash home-only and once-per-session, or remove the enforced delay.
5. Migrate fonts to `next/font/local`.
6. Debounce or defer search URL updates.
7. Trim paint-heavy CSS effects on mobile.
8. Remove unused imports and keep lint clean.

## Verification Plan After Changes

Run:

```bash
npm run lint
npm run build
```

Check:

- Build output should show static/prerendered routes instead of all `ƒ Dynamic`.
- `.next/static` should not grow unexpectedly.
- Largest client chunks should shrink after reducing global client boundaries and Motion usage.
- No lint warnings should remain.
