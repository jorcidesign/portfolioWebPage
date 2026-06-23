# Portfolio Web — Next.js 15 Project

## Stack
Next.js 15, React 19, TypeScript, SCSS, GSAP, Lenis.

## Architecture
Atomic Design: `atoms/` → `organisms/` → pages. CSS Modules for scoped styles.

## Directories
- `app/` — App Router pages and layouts
- `components/` — UI components (atoms/, organisms/)
- `data/` — static data (projects, about, contact)
- `hooks/` — React hooks (useSmoothScroll)
- `styles/` — SCSS design tokens and utilities
- `public/` — static files

## Conventions
- Prefer hooks over HOCs
- Use `'use client'` only when browser APIs needed
- CSS Modules for component styles, global SCSS for design system
- No Tailwind — custom design system with CSS variables
