# Sanity Portable Text Fix

## Problem

Sanity `body` content was rendering, but custom Portable Text marks were not being recognized.

The runtime warnings were:

```txt
[@portabletext/react] Unknown mark type "externalLink", specify a component for it in the `components.marks` prop
[@portabletext/react] Unknown mark type "internalLink", specify a component for it in the `components.marks` prop
```

## Root Cause

The Sanity schema stores link annotations with these exact mark names:

- `externalLink`
- `internalLink`

`@portabletext/react` only knows how to render built-in marks and any custom marks explicitly provided through `components.marks`. The project had an empty `components/portableText.tsx`, so the renderer had no components for those Sanity annotation names.

There was also a duplicate `externalLink` annotation in `sanity/schemaTypes/blogPostSchema.ts`, which made the schema noisier and harder to reason about.

## What Changed

### `components/portableText.tsx`

Created a full Portable Text component map.

Added custom mark renderers for:

- `externalLink`
- `internalLink`
- inline `code`

`externalLink` now renders a normal `<a>` tag with:

- `href`
- optional `_blank` target
- `noopener noreferrer` when opening in a new tab
- site-consistent Tailwind link styling

`internalLink` now resolves Sanity reference data from the GROQ query into app routes:

- `blogPost` references become `/blog/[slug]`
- `project` references become `/projects#[slug]`

Also added renderers for the custom Portable Text body block types already present in the schema:

- image blocks
- callouts
- code blocks
- block styles like normal text, `h2`, `h3`, and blockquotes
- bullet and numbered lists

### `sanity/schemaTypes/blogPostSchema.ts`

Removed the duplicate `externalLink` annotation definition.

The schema now has one `externalLink` annotation and one `internalLink` annotation, matching the mark component names used by the frontend.

### `app/blog/[slug]/page.tsx`

Removed the temporary debug line:

```ts
console.dir(post?.body, { depth: null });
```

This prevents server logs from printing the full Portable Text body on every blog post render.

### `lib/types.ts`

Updated the global post type so `body` is typed as:

```ts
PortableTextBlock[]
```

instead of:

```ts
any[]
```

This fixed the ESLint `no-explicit-any` error and made the type compatible with `<PortableText />`.

The global interfaces were also wrapped in `declare global` so TypeScript keeps them available across the app without ESLint treating them as unused local declarations.

## Verification

Passed:

```bash
npm run lint
npx tsc --noEmit
```

Attempted:

```bash
npm run build
```

The production build did not complete inside the sandbox because Turbopack tried to create a process and bind to a port while processing `sanity/lib/bundle.css`, which the sandbox blocked:

```txt
Operation not permitted (os error 1)
```

That failure was environment-related, not caused by the Portable Text changes. I requested permission to rerun the build outside the sandbox, but that command was interrupted before completion.

## Result

The warnings should be resolved because the frontend now provides `components.marks.externalLink` and `components.marks.internalLink`, matching the exact mark types stored by Sanity.
