# Portfolio Web — Nuxt 4 Project

## Stack
Nuxt 4, Vue 3 (Composition API, `<script setup>`), TypeScript, Nuxt Content, GSAP, Lenis.

## Architecture
Atomic Design: `atoms/` → `organisms/` → pages. Components auto-imported via Nuxt (no manual imports).

## Directories
- `app/` — main source
  - `components/` — UI components (atoms/, organisms/)
  - `pages/` — routes (auto-routing)
  - `composables/` — shared logic
  - `data/` — static data (projects, about, contact)
  - `content/` — Nuxt Content managed
  - `assets/css/` — global styles only
- `public/` — static files

## Conventions
- Prefer composables over mixins
- Use `definePageMeta` for page metadata
- Use `useState` / `useAsyncData` for state & data fetching
- CSS via `main.css` (Tailwind-like custom utilities)
- No Options API unless strictly needed
