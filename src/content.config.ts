// src/content/config.ts
import { glob } from "astro/loaders"
import { z } from "astro/zod"
import { defineCollection } from "astro:content"

const askTheLibrarian = defineCollection({
  loader: glob({
    base: "./src/collections/atl/",
    pattern: ["**/*.{md,mdx}", "!**/AGENTS.md"],
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    author: z.string(),
  }),
})
const librarianReflections = defineCollection({
  loader: glob({
    base: "./src/collections/lr/",
    pattern: ["**/*.{md,mdx}", "!**/AGENTS.md"],
  }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    librarianStory: z.number().optional()
  }),
})
const librarianStories = defineCollection({
  loader: glob({
    base: "./src/collections/librarian-stories/",
    pattern: ["**/*.{md,mdx}", "!**/AGENTS.md"],
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    fips: z.array(z.string()).optional(),
    location: z.array(z.string()),
    country: z.string()
  }),
})

const librarianNews = defineCollection({
  loader: glob({
    base: "./src/collections/news/",
    pattern: ["**/*.{md,mdx}", "!**/AGENTS.md"],
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    podcast: z.url().optional(),
    article: z.url().optional(),
    video: z.url().optional(),
    tracks: z
      .array(z.object({ id: z.string(), url: z.url(), title: z.string() }))
      .optional(),
  }),
})

export const collections = {librarianReflections, askTheLibrarian, librarianStories, librarianNews }
