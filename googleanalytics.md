# Google Analytics Integration

## Summary

Integrated Google Analytics 4 using the official Next.js `@next/third-parties/google` package and added custom event tracking for meaningful portfolio conversion and engagement actions.

The implementation avoids manually duplicated Google tag scripts, only renders analytics when `NEXT_PUBLIC_GA_ID` exists, and keeps tracking handlers isolated to small client-side surfaces where possible.

## Package Changes

- Added `@next/third-parties` to `package.json`.
- Updated `package-lock.json` through `npm install @next/third-parties@latest`.

## Environment Variable

The integration reads:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

No real GA measurement ID is hardcoded in components.

There was no `.env.example` file in the project, so no example env file was updated.

## Global Google Analytics Setup

Updated `app/layout.tsx`:

- Imported `GoogleAnalytics` from `@next/third-parties/google`.
- Removed the previous manual `next/script` Google tag setup.
- Added one global `<GoogleAnalytics gaId={gaId} />` in the root layout.
- Wrapped rendering with `gaId ? ... : null`, so the tag only loads when `NEXT_PUBLIC_GA_ID` is present.

This is the only Google Analytics setup in the app.

## Reusable Analytics Helper

Created `lib/analytics.ts`.

It imports `sendGAEvent` from `@next/third-parties/google` and exposes these helpers:

- `trackContactClick(location, label)`
- `trackWhatsAppClick(location, label)`
- `trackEmailClick(location, label)`
- `trackProjectView(projectTitle, location)`
- `trackProjectVisit(projectTitle, url, location)`
- `trackBlogView(postTitle, location)`
- `trackExternalLinkClick(label, url, location)`
- `trackResumeDownload(location, label)`

The helper no-ops when `NEXT_PUBLIC_GA_ID` is missing and wraps `sendGAEvent` in `try/catch` so analytics cannot break navigation or user actions.

## Client Tracking Wrapper

Created `components/tracked-link.tsx`.

This is a small Client Component wrapper for tracked links. It supports internal Next links and external anchors while keeping large server-rendered pages as Server Components.

It prevents unnecessary conversion of full page components to client components.

## Events Added

### Contact and Email

Event names:

- `contact_click`
- `email_click`

Tracked in:

- Header contact button
- Mobile menu contact button
- Homepage hero contact CTA
- Homepage launch card CTA
- Homepage contact section email CTA
- Projects page "Discuss a similar build"
- Project detail "Discuss a similar build"
- Blog page "Contact the desk"

Useful parameters include `location` and `label`.

### WhatsApp

Event name:

- `whatsapp_click`

Tracked in:

- Homepage hero "Start a project"
- Homepage contact section WhatsApp CTA
- Footer "Start a project"

Useful parameters include `location` and `label`.

### Project Views

Event name:

- `project_view`

Tracked in:

- Homepage project card "View project"
- Homepage "See Work"
- Projects page project card "View project"

Useful parameters include `location`, `label`, and `project_title`.

### Project Live Site Visits

Event name:

- `project_visit`

Tracked in:

- Project detail "View live" links.

Useful parameters include `location`, `label`, `project_title`, and `url`.

### Project Source / External Links

Event name:

- `external_link_click`

Tracked in:

- Project detail GitHub/source links.
- Footer social links.

Useful parameters include `location`, `label`, and `url`.

### Blog Views

Event name:

- `blog_view`

Tracked in:

- Homepage blog cards.
- Blog featured article CTA.
- Blog recent post cards.
- Blog detail related post cards.

Useful parameters include `location`, `label`, and `post_title`.

### Resume Download

Event name:

- `resume_download`

The helper exists, but no resume/CV download link or file was found in the current repo, so no live UI element was wired for this event.

## Files Changed

- `app/layout.tsx`
- `app/projects/page.tsx`
- `app/projects/[slug]/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `components/portfolio-home.tsx`
- `components/site-shell.tsx`
- `components/tracked-link.tsx`
- `lib/analytics.ts`
- `package.json`
- `package-lock.json`

## Performance Notes

- The Google tag is loaded through Next's optimized `@next/third-parties/google` integration.
- Analytics renders only when `NEXT_PUBLIC_GA_ID` exists.
- No manual page-view tracking was added, since Google Analytics handles route changes.
- Event tracking is limited to meaningful CTAs, project/blog engagement, external social links, and outbound project links.
- Large Server Components were not converted to Client Components; event handlers are isolated in `TrackedLink` or already-client shell components.

## Verification

Searched the repo for duplicate Google tag usage and found only:

- `GoogleAnalytics` in `app/layout.tsx`
- `sendGAEvent` in `lib/analytics.ts`

Attempted `npm run build`. The sandboxed build failed with a Turbopack internal error caused by sandbox restrictions:

```text
creating new process
binding to a port
Operation not permitted (os error 1)
```

An escalated build rerun was requested because of that sandbox permission issue, but it was interrupted before completion.
