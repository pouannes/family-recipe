import { defineConfig, s } from "velite";

export default defineConfig({
  collections: {
    recipes: {
      name: "Recipe",
      pattern: "recipes/**/*.mdx",
      schema: s.object({
        locale: s.enum(["fr", "en"]),
        title: s.string(),
        slug: s.string(),
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
