# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Family recipe website built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4. Recipes are stored as MDX files in `content/recipes/` and processed by Velite into typed content collections at build time. No database or CMS — content lives in the repo.

See `PROJECT.md` for the full specification including the Velite schema, content format, and design system ("Cucina Style Guide").

## Commands

```bash
pnpm dev          # Start dev server (runs Velite watch + Next.js in parallel)
pnpm build        # Production build (runs Velite then Next.js)
pnpm start        # Serve production build
pnpm lint         # ESLint (flat config format)
```

No test framework is configured yet.

## Architecture

- **Routing:** Next.js App Router with file-based routing in `app/`
- **Content pipeline:** MDX files (`content/recipes/*.mdx`) → Velite → `.velite/` typed output → static pages via `generateStaticParams()`
- **Styling:** Tailwind CSS v4 with `@tailwindcss/postcss` plugin; Cucina theme tokens defined in `app/globals.css`
- **Path aliases:** `@/*` → project root (`./`), `#site/content` → `.velite/` (Velite output)
- **Bundler:** Turbopack (Next.js 16 default) — no webpack config; Velite runs as a pre-script, not a webpack plugin

### Route structure

```
app/page.tsx                  # Recipe list (home)
app/recipes/[slug]/page.tsx   # Recipe detail
app/tags/[tag]/page.tsx       # Recipes filtered by tag (not yet implemented)
```

### Key directories

```
content/recipes/     # MDX recipe files (source of truth)
components/          # Flat dir of Cucina UI components (all server components, named exports)
types/               # Shared TypeScript interfaces (Ingredient, Recipe)
.velite/             # Generated output (gitignored)
```

### Recipe frontmatter format

```yaml
title: string
slug: string          # must be explicit (s.slug validates uniqueness)
description: string   # optional
prepTime: number      # minutes
cookTime: number      # minutes
servings: number
tags: string[]
ingredients:
  - name: string
    quantity: number
    unit: string
    group: string     # used for grouping (e.g. "broth", "sauce", "topping")
```

### MDX rendering

Velite compiles MDX to a function body string stored in `content`. The `MDXContent` component (`components/mdx-content.tsx`) evaluates it via `new Function(code)` with `react/jsx-runtime` and passes shared component overrides (SectionHeader, Divider, Tip, styled `p`/`ol`/`li`). Call the result as a function, not JSX — using `<Component />` triggers the `react-hooks/static-components` lint error.

## Design System

Defined in `PROJECT.md` under "Cucina Style Guide":
- **Fonts:** Playfair Display (headings via `font-heading`), Source Serif 4 (body via `font-body`)
- **Colors:** Parchment (`#F7F1E6`) bg, Espresso (`#3A2E24`) text, Walnut (`#2A1F17`) headings, Terracotta (`#9B3B1E`) accent, Taupe (`#7A6B5D`) muted, Wheat (`#C8B99A`) borders, Sand (`#D4C5AE`) subtle bg
- **Layout:** 720px max-width, two-column grid (260px sidebar + flexible method column)

## Gotchas

- **Next.js 16 async params:** `params` in pages/layouts/`generateMetadata` is a `Promise` — must `await` before accessing properties
- **Velite slug field:** `s.slug("recipes")` requires an explicit `slug` in frontmatter; it does not auto-derive from the filename
- **Turbopack:** Webpack plugins don't work; Velite integration is via `package.json` scripts only
