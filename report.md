# Portfolio Clone Report

## Summary

This project was scaffolded as a new `Next.js` app and rebuilt into a close structural clone of the reference portfolio at `https://www.maazscript.com/`, but with placeholder branding so it can be converted into your own personal portfolio.

The result includes:

- a premium one-page homepage with a fixed glass navigation bar
- a large editorial hero section
- skills and selected work sections
- testimonial and final CTA sections
- dedicated `/about`, `/project`, and `/search` routes
- centralized placeholder content for easy replacement

## Stack Used

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `motion`
- `lucide-react`
- self-hosted fonts via `@fontsource-variable/manrope` and `@fontsource/cormorant-garamond`

## What Was Done

### 1. Project setup

The workspace was empty, so a fresh app was created with:

- `create-next-app`
- App Router
- TypeScript
- Tailwind
- ESLint

Extra packages were installed for the clone:

- `motion`
- `lucide-react`
- `@fontsource-variable/manrope`
- `@fontsource/cormorant-garamond`

### 2. Global shell and styling

Created a shared site shell with:

- fixed top navigation
- mobile menu overlay
- back-to-top button
- reusable footer

Global styling was replaced with a custom visual system using:

- dark charcoal background
- brass/cream/silver accent palette
- gradients and soft atmospheric lighting
- custom font pairing
- reusable utility classes like `.section-shell`, `.section-card`, `.hero-grid`, and `.hero-orb`

### 3. Homepage

Replaced the default starter page with a custom portfolio homepage that includes:

- hero section with strong typography and CTA
- premium right-side visual anchor instead of a default card grid
- about preview section
- grouped skills section
- selected projects list
- testimonials
- contact / conversion section

### 4. Additional pages

Built dedicated routes to match the reference site structure more closely:

- `/about`
- `/project`
- `/search`

The search page includes a client-side searchable list of pages, sections, and projects using a local dataset and URL query syncing.

### 5. Centralized content model

All placeholder identity and project data was placed in one file:

- `lib/site-data.ts`

This file controls:

- name
- short initials
- role
- description
- contact links
- social links
- skills
- featured projects
- testimonials
- timeline
- search index entries

## Files Added or Reworked

### App routes

- `app/page.tsx`
- `app/about/page.tsx`
- `app/project/page.tsx`
- `app/search/page.tsx`
- `app/layout.tsx`
- `app/globals.css`

### Components

- `components/site-shell.tsx`
- `components/portfolio-home.tsx`
- `components/search-client.tsx`

### Data

- `lib/site-data.ts`

### Documentation

- `report.md`

## Design / Implementation Notes

- The clone is intentionally very close in mood and structure, but does **not** copy the original portfolio’s personal identity or project content.
- Placeholder text is used throughout so the UI can be reviewed immediately and then customized safely.
- The layout is responsive across desktop and mobile.
- Motion was used for reveal and menu behavior, but kept restrained.
- Search is implemented as a real route instead of a fake overlay, matching the reference site’s navigation pattern.

## Issues Encountered and Resolved

### Dependency install

The initial app scaffold created files successfully, but dependencies were not fully installed. This was resolved with a manual `npm install`.

### Build restriction in sandbox

The first production build failed because the sandbox blocked a local port bind during Next.js CSS processing. The build was rerun outside the sandbox and completed normally.

### TypeScript / lint cleanup

A few issues were fixed during verification:

- motion transition typing needed tightening with `as const`
- an internal navigation anchor was replaced with `Link`
- state updates inside effects were refactored to satisfy React lint rules
- an unused route variable was removed

## Verification

The project was verified with:

- `npm run build`
- `npm run lint`

Both completed successfully after cleanup.

## How To Personalize Next

The main file to edit is:

- `lib/site-data.ts`

Replace the placeholder values there with your real:

- name
- initials
- role/title
- bio copy
- email
- WhatsApp number
- social links
- skills
- project list
- testimonials

If you want the clone to look even closer to the original, the next likely additions would be:

- your real portrait or hero image
- project screenshots
- a loader screen
- live external project URLs
- richer project detail content

## Current Status

The project is in a good handoff state:

- app is scaffolded
- core clone is implemented
- routes are working
- build passes
- lint passes
- branding is still placeholder and ready for your real data
