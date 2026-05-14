# Performance Audit

Date: May 14, 2026

Scope: Next.js 16.2.4 App Router portfolio, Sanity-backed content, global shell, image usage, data fetching, rendering, and production build behavior.

## Build Verification

`npm run build` was run twice:

- Sandbox run failed with a Turbopack internal permission error while processing `node_modules/sanity/lib/bundle.css`. This looked environment-related: `creating new process`, `binding to a port`, `Operation not permitted`.
- Escalated build completed successfully.

Final build summary:

```text
Compiled successfully in 110s
Finished TypeScript in 12.9s
Generated static pages in 46s

ƒ /                 Dynamic
ƒ /about            Dynamic
ƒ /blog             Dynamic
ƒ /blog/[slug]      Dynamic
ƒ /projects         Dynamic
● /projects/[slug]  SSG
ƒ /search           Dynamic
○ /sitemap.xml      Static
○ /studio/[[...tool]] Static
```

The build passes, but several routes that should be mostly static are dynamic.

## High Priority

### 1. Root layout reads cookies, making almost every page dynamic

File: `app/layout.tsx`

Issue: `RootLayout` calls `cookies()` to read the theme:

```tsx
const cookieStore = await cookies();
const initialTheme = cookieStore.get("theme")?.value === "light" ? "light" : "dark";
```

In Next 16, runtime request APIs such as `cookies()` make the route depend on request-time data. Because this is in the root layout, it affects the whole app shell. The build output confirms `/`, `/about`, `/blog`, `/projects`, `/search`, and `/blog/[slug]` are dynamic.

Impact:

- More server work per request.
- Less static HTML/CDN benefit for portfolio pages.
- Slower TTFB than necessary for mostly public marketing/content pages.

Fix:

- Remove `cookies()` from the root layout.
- Default the server-rendered document to one theme, then apply the saved theme with a tiny inline script before hydration or keep the current `AppBoot` approach if a small post-load theme adjustment is acceptable.
- If server-side theme personalization is required, isolate it in a small component wrapped with `Suspense` instead of the root layout.

### 2. Sanity fetches are uncached and use the live API for public pages

File: `sanity/lib/client.ts`

Issue: the Sanity client uses:

```ts
useCdn: false
```

Most pages fetch public portfolio/blog data that can tolerate CDN caching or explicit revalidation. With `useCdn: false`, requests go directly to Sanity's API, increasing latency and load.

Impact:

- Slower page rendering on dynamic routes.
- More external API dependency during builds and runtime.
- Static generation took 46 seconds for only 11 pages, which is high for this project size.

Fix:

- Use `useCdn: true` for published public reads.
- Add a separate preview/draft client with `useCdn: false` only for Studio previews or authenticated draft content.
- Wrap repeated Sanity reads in cached helper functions using Next 16's `"use cache"` and `cacheLife(...)`, or use Sanity/Next revalidation tags if content needs controlled freshness.

### 3. Detail pages fetch the same document multiple times

Files:

- `app/blog/[slug]/page.tsx`
- `app/projects/[slug]/page.tsx`

Issue: detail routes fetch all slugs in `generateStaticParams`, then fetch the current document in `generateMetadata`, then fetch the same document again in the page. Blog detail also fetches all posts again for related posts.

Examples:

- Blog metadata fetch: `app/blog/[slug]/page.tsx`
- Blog page fetch: `app/blog/[slug]/page.tsx`
- Related posts fetch: `app/blog/[slug]/page.tsx`
- Project metadata fetch: `app/projects/[slug]/page.tsx`
- Project page fetch: `app/projects/[slug]/page.tsx`

Impact:

- Extra Sanity requests during builds and runtime.
- Slower static generation as the number of posts/projects grows.
- More repeated computation for metadata and page content.

Fix:

- Create cached data helpers such as `getPostBySlug(slug)`, `getProjectBySlug(slug)`, `getAllPosts()`, and `getAllProjects()`.
- Add `"use cache"` inside those helpers and set a suitable `cacheLife`.
- For related posts, prefer a focused GROQ query that returns only the related posts instead of fetching every post and filtering in JS.

### 4. Global client shell hydrates the full site chrome on every page

File: `components/site-shell.tsx`

Issue: `SiteShell` is a Client Component and owns the whole header, footer, nav, mobile menu, theme state, scroll listener, and back-to-top button. It imports `motion/react`, `lucide-react`, and `usePathname`, so all of that becomes part of the client bundle for normal pages.

Impact:

- Larger JavaScript payload on first load.
- More hydration work before the page becomes interactive.
- Motion code is loaded even for mostly static content pages.

Fix:

- Split the shell into a Server Component for static header/footer markup.
- Move only interactive controls into small Client Components: theme toggle, mobile menu, same-page smooth-scroll handling, and back-to-top button.
- Consider dynamically importing the mobile menu/motion overlay because it is only needed after the menu button is used.

## Medium Priority

### 5. `motion` is used for many small interactions

Files:

- `components/site-shell.tsx`
- `components/micro-interactions.tsx`
- `components/portfolio-home.tsx`

Issue: many cards, reveal wrappers, and header/menu elements use `motion/react`. The visual effect is nice, but this adds client JavaScript and hydration cost to pages that could otherwise be static.

Impact:

- Heavier client bundle.
- Extra runtime work for simple hover/reveal effects.

Fix:

- Keep `motion` only where the interaction meaningfully improves UX, such as the mobile menu.
- Replace simple reveal/hover card effects with CSS transitions and `@media (prefers-reduced-motion)`.
- Dynamically import larger motion-only components when possible.

### 6. Scroll listener updates React state during scroll

File: `components/site-shell.tsx`

Issue: the global shell installs a scroll listener and calls `setShowTop(window.scrollY > 420)`.

Impact:

- React state can be updated frequently during scroll.
- The listener exists on every non-Studio route.

Fix:

- Use `IntersectionObserver` with a sentinel element near the top of the page.
- Or throttle/requestAnimationFrame the scroll handler and only call `setShowTop` when the boolean actually changes.

### 7. Cormorant Garamond loads four separate font files

File: `app/layout.tsx`

Issue: Manrope is a variable font, but Cormorant Garamond loads separate 400, 500, 600, and 700 WOFF2 files.

Impact:

- More font requests and bytes.
- Potentially slower first text render on cold cache.

Fix:

- Use a variable Cormorant Garamond font if available.
- If not, audit actual CSS usage and keep only the weights that are used above the fold.

### 8. Remote Sanity images do not use blur placeholders

Files:

- `app/projects/page.tsx`
- `app/projects/[slug]/page.tsx`
- `app/blog/[slug]/page.tsx`
- `components/portableText.tsx`

Issue: remote Sanity images use `next/image`, which is good, but there are no `placeholder="blur"` or low-quality placeholders.

Impact:

- Image areas can feel blank during slow network loads.
- Detail page hero images are prioritized, so missing placeholders are most visible there.

Fix:

- Store or generate `lqip`/blur data in Sanity image queries.
- Pass `placeholder="blur"` and `blurDataURL` to `Image`.

### 9. Several image queries request fixed large dimensions

Files:

- `app/projects/[slug]/page.tsx`
- `app/blog/[slug]/page.tsx`
- `components/portableText.tsx`

Issue: detail and portable text images request 1200-1600px wide assets regardless of actual viewport/container needs.

Impact:

- Larger image transformations and downloads than necessary on smaller screens.

Fix:

- Keep `next/image` but add more accurate `sizes` to all large images.
- Consider Sanity hotspot/crop-aware responsive image helpers.
- Use narrower transforms for article body images where the content column is much smaller than 1200px.

## Lower Priority

### 10. Search filters on every render and updates the URL on every keystroke

File: `components/search-client.tsx`

Issue: the component filters entries directly during render and calls `router.replace(...)` on every input change.

Impact:

- Fine for the current small static dataset.
- Can become janky if the search index grows.

Fix:

- Memoize normalized search text for entries.
- Debounce URL replacement while keeping local input responsive.
- If content grows, move to a small generated search index or a server-side search route.

### 11. Heavy visual CSS effects are used globally

File: `app/globals.css`

Issue: the site uses fixed grain overlays, multiple body radial gradients, backdrop blurs, large shadows, and several translucent layers.

Impact:

- More paint/compositing work, especially on lower-end mobile devices.

Fix:

- Test on mobile with Chrome Performance/Lighthouse.
- Reduce `backdrop-filter` usage on repeated cards.
- Keep blur effects mainly on the fixed header/menu, where they have the highest visual value.

### 12. Some list pages render full datasets

Files:

- `app/projects/page.tsx`
- `app/blog/page.tsx`
- `app/page.tsx`

Issue: list pages fetch full project/post records and then slice or render subsets. For example, the home page fetches all projects/posts, then `PortfolioHome` slices them down.

Impact:

- Extra query payload and serialization as content grows.

Fix:

- Add focused queries for home page previews, project cards, blog cards, and related posts.
- Keep rich fields like `contribution` and `body` only on detail pages.

## Recommended Fix Order

1. Remove `cookies()` from the root layout or isolate it so public pages can become static.
2. Add cached Sanity data helpers and switch published reads to CDN-backed fetching.
3. Split `SiteShell` into mostly server-rendered markup plus small client islands.
4. Reduce repeated detail-route fetches and replace all-post filtering with focused GROQ queries.
5. Tune fonts and image placeholders.
6. Profile CSS effects and motion after the major server/client changes.
