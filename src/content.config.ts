// src/content/config.ts
import { glob } from "astro/loaders"
import { z } from "astro/zod"
import { defineCollection } from "astro:content"

const askTheLibrarian = defineCollection({
  loader: glob({ base: "./src/collections/atl/", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    author: z.string(),
  }),
})
const librarianStories = defineCollection({
  loader: glob({
    base: "./src/collections/librarian-stories/",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    fips: z.array(z.string()).optional(),
    location: z.array(z.string()),
  }),
})

const librarianNews = defineCollection({
  loader: glob({
    base: "./src/collections/news/",
    pattern: "**/*.{md,mdx}",
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

export const collections = { askTheLibrarian, librarianStories, librarianNews }
