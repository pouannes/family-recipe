# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Family recipe website built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4. Recipes are stored as MDX files in `content/recipes/` and processed by Velite into typed content collections at build time. Client-side search uses Fuse.js. No database or CMS — content lives in the repo.

See `PROJECT.md` for the full specification including the Velite schema, content format, and design system ("Cucina Style Guide").

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build (includes Velite content processing)
pnpm start        # Serve production build
pnpm lint         # ESLint (flat config format)
```

No test framework is configured yet.

## Architecture

- **Routing:** Next.js App Router with file-based routing in `app/`
- **Content pipeline:** MDX files (`content/recipes/*.mdx`) → Velite → typed collections → static pages via `generateStaticParams()`
- **Styling:** Tailwind CSS v4 with `@tailwindcss/postcss` plugin; theme uses CSS variables in `app/globals.css`
- **Path alias:** `@/*` maps to project root (`./`)

### Planned route structure

```
app/page.tsx                  # Recipe list
app/recipes/[slug]/page.tsx   # Recipe detail
app/tags/[tag]/page.tsx       # Recipes filtered by tag
```

### Recipe frontmatter format

```yaml
title: string
description: string
prepTime: number (minutes)
cookTime: number (minutes)
servings: number
tags: string[]
ingredients:
  - name: string
    quantity: number
    unit: string
    group: string
```

## Design System

Defined in `PROJECT.md` under "Cucina Style Guide":
- **Fonts:** Playfair Display (headings), Source Serif 4 (body)
- **Colors:** Parchment (#F7F1E6) background, Espresso (#3A2E24) text, Terracotta (#9B3B1E) accent
- **Layout:** 720px max-width, two-column grid (260px sidebar + flexible method column)
