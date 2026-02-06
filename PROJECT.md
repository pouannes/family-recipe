# Family Recipe Website

A simple, personal recipe website for storing and browsing family recipes. Built to be low-maintenance, easy to update, and pleasant to use.

## Project Goals

- Store recipes we cook regularly so we don't forget them
- Easy to add new recipes (no database, no CMS)
- Searchable by ingredients and tags
- Clean, warm aesthetic that feels like a family cookbook

## Technical Approach

### Stack

- **Framework:** Next.js (App Router)
- **Content layer:** Velite (typed content collections from markdown)
- **Content:** Markdown files with YAML frontmatter, stored directly in the repo
- **Styling:** Tailwind CSS
- **Search:** Fuse.js (client-side fuzzy search over a generated JSON index)
- **Hosting:** Vercel

### Content Structure

Recipes live in `content/recipes/` as `.mdx` files. Velite processes them at build time into typed, importable data.

```
content/
  recipes/
    tonkotsu-ramen.mdx
    shakshuka.mdx
    dutch-apple-pie.mdx
app/
  page.tsx              # recipe list
  recipes/
    [slug]/
      page.tsx          # recipe detail
  tags/
    [tag]/
      page.tsx          # recipes by tag
velite.config.ts        # content schema definition
```

### Velite Configuration

```ts
// velite.config.ts
import { defineConfig, s } from "velite";

export default defineConfig({
  collections: {
    recipes: {
      name: "Recipe",
      pattern: "recipes/**/*.mdx",
      schema: s.object({
        title: s.string(),
        slug: s.slug("recipes"),
        description: s.string().optional(),
        prepTime: s.number(),
        cookTime: s.number(),
        servings: s.number(),
        tags: s.array(s.string()),
        ingredients: s.array(
          s.object({
            name: s.string(),
            quantity: s.number(),
            unit: s.string(),
            group: s.string(),
          }),
        ),
        content: s.mdx(),
      }),
    },
  },
});
```

### Recipe File Format

```mdx
---
title: Tonkotsu Ramen
description: Rich pork bone broth with all the fixings
prepTime: 30
cookTime: 720
servings: 4
tags:
  - japanese
  - soup
  - pork
ingredients:
  - name: pork bones
    quantity: 1
    unit: kg
    group: broth
  - name: garlic
    quantity: 8
    unit: cloves
    group: broth
  - name: soy sauce
    quantity: 100
    unit: ml
    group: tare
---

## Steps

1. Blanch the pork bones in boiling water for 10 minutes...
2. Place cleaned bones in a large pot with fresh water...

<Tip>For extra richness, add a split pig's foot to the broth.</Tip>
```

### Usage in Components

```tsx
// app/recipes/[slug]/page.tsx
import { recipes } from "#site/content";

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export default function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = recipes.find((r) => r.slug === params.slug);
  // recipe is fully typed with ingredients, tags, etc.
}
```

---

## Cucina Style Guide

A rustic Italian warmth inspired by old cookbooks and handwritten recipe cards. Approachable, timeless, and cozy.

### Color Palette

| Role        | Color      | Hex       | Usage                            |
| ----------- | ---------- | --------- | -------------------------------- |
| Background  | Parchment  | `#F7F1E6` | Page background                  |
| Text        | Espresso   | `#3A2E24` | Body text                        |
| Heading     | Walnut     | `#2A1F17` | Titles, strong emphasis          |
| Accent      | Terracotta | `#9B3B1E` | Links, labels, section headers   |
| Muted       | Taupe      | `#7A6B5D` | Secondary text, metadata         |
| Border      | Wheat      | `#C8B99A` | Dividers, dotted lines           |
| Hover/Light | Sand       | `#D4C5AE` | Step numbers, subtle backgrounds |

### Typography

| Element         | Font             | Size    | Weight | Style                           |
| --------------- | ---------------- | ------- | ------ | ------------------------------- |
| Recipe title    | Playfair Display | 48px    | 700    | Normal                          |
| Section headers | Playfair Display | 22px    | 600    | Normal                          |
| Body text       | Source Serif 4   | 16px    | 400    | Normal                          |
| Subtitle        | Source Serif 4   | 18px    | 400    | Italic                          |
| Labels/tags     | Playfair Display | 12-13px | 600    | Uppercase, letter-spacing 2-3px |
| Step numbers    | Playfair Display | 28px    | 700    | Normal                          |

**Font imports:**

```css
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap");
```

### Layout

- **Max width:** 720px, centered
- **Two-column grid:** 260px ingredients sidebar + flexible method column (48px gap)
- **Spacing:** Generous vertical rhythm — 32-40px between major sections
- **Dividers:** Horizontal lines with centered decorative element (✦)

### Component Patterns

**Ingredient list:**

- Grouped by category (Broth, Tare, Toppings)
- Group label: uppercase, terracotta, letter-spaced
- Each item: flex row with dotted border-bottom, quantity right-aligned in italic taupe

**Method steps:**

- Large faded step number (28px, wheat color) left of text
- Step text at 16px with 1.7 line-height
- 24px margin between steps

**Tags:**

- Uppercase, letter-spaced
- Terracotta text on subtle terracotta background (`rgba(155, 59, 30, 0.08)`)
- Small border-radius (2px)
- Displayed in a row at the bottom of the recipe

**Meta info (prep/cook/serves):**

- Inline row with 32px gaps
- Label in bold terracotta, value in muted taupe

### Visual Details

- Section headers have a 2px terracotta bottom border
- Decorative divider: `──── ✦ ────` pattern using flex + border + centered symbol
- No harsh shadows — flat, warm, paper-like
- Subtle hierarchy through color and weight, not boxes or cards

---

## Future Considerations

- **Tina CMS:** Add later if editing via git becomes tedious
- **Ingredient search:** Build a `/ingredients/[ingredient]` page showing all recipes containing that ingredient
- **Print stylesheet:** Optimize layout for printing recipe cards
- **Servings scaler:** Client-side component to adjust ingredient quantities
