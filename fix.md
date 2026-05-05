# Motion Transition Type Fix

## Issue

TypeScript reported that a `transition` object passed to `motion.button` was not assignable to Motion's `Transition` type.

The failing part was the `ease` value:

```tsx
ease: [0.22, 1, 0.36, 1]
```

When this array was returned from the `mobileMenuItemMotion()` helper, TypeScript inferred it as `number[]`. Motion does not accept a generic `number[]` for `ease`; it expects a valid easing value, such as a named easing, an easing function, or a fixed four-number cubic bezier tuple.

So even though the runtime value was correct, the inferred type was too broad.

## Fix

I imported Motion's `Easing` type and created a typed reusable easing constant:

```tsx
import type { Easing } from "motion/react";

const siteEase: Easing = [0.22, 1, 0.36, 1];
```

Then I replaced the inline easing arrays in `components/site-shell.tsx` with `siteEase`.

I also updated `components/micro-interactions.tsx` so its shared transition uses:

```tsx
ease: [0.22, 1, 0.36, 1] satisfies Easing
```

This tells TypeScript that the array is intentionally a valid Motion easing tuple, not an arbitrary `number[]`.

## Verification

The fix was verified with:

```bash
npx tsc --noEmit
npm run lint
```

Both commands passed.
