# AETHER — Sound has a shape

A concept landing page for a fictional spatial audio instrument. Built as a single-page editorial experience with a custom WebGL field, scroll-driven motion, a pinned horizontal gallery and a smooth-scroll layer.

**Live:** https://shel0309.github.io/aether-landing/

## Stack

- Vite 8 + React 19 + TypeScript
- Motion (Framer Motion) for orchestrated reveals and scroll-linked animation
- Lenis for smooth scrolling and anchor navigation
- Custom WebGL fragment shader (raw WebGL, no 3D library)
- Tailwind CSS v4 for the reset/utilities, custom CSS for the art direction
- self-hosted fonts via Fontsource: Space Grotesk, Instrument Serif, JetBrains Mono
- Google Material Icons (outlined) inlined as SVG
- Playwright Core scripts for visual QA screenshots

## Features

- Preloader with calibrated progress and curtain transition
- WebGL aurora field reacting to the pointer, with reduced-motion fallback
- Mouse parallax, magnetic buttons, custom desktop cursor
- Scroll-linked word reveal and parallax layers
- Pinned horizontal "Experience" rail with measured track width
- Animated counters and a self-drawing technical blueprint
- Working reservation form with validation and success state (client-side only)
- Fully responsive, keyboard accessible, reduced-motion aware

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

The production base path is `/aether-landing/` for GitHub Pages. If you deploy elsewhere, change `base` in `vite.config.ts`.

## Deployment

The site is published from the `dist` folder to the `gh-pages` branch:

```bash
npm run build
# push the contents of dist/ to the gh-pages branch
```

AETHER is a fictional product created as a design study.
