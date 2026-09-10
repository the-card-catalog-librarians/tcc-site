import type { APIRoute } from "astro"
import MiniSearch from "minisearch"
import { randomUUID } from "node:crypto"

interface IndexedArticle {
  id: string
  title: string
  text: string
  excerpt: string
  slug: string
}

export const GET: APIRoute = async () => {
  const { getCollection } = await import("astro:content")
  const atl = await getCollection("askTheLibrarian")
  const ls = await getCollection("librarianStories")
  const lr = await getCollection("librarianReflections")

  const miniSearch = new MiniSearch<IndexedArticle>({
    fields: ["title", "text"],
    storeFields: ["title", "excerpt", "slug"],
  })
  //TODO: add smart excerpts
  const askTheLibrarian: IndexedArticle[] = atl.map((article) => ({
    id: randomUUID(),
    title: article.data.title,
    text: article.body ?? "",
    excerpt: article.data.description,
    slug: `/ask-the-librarian/${article.id}/`,
  }))

  const librarianStories: IndexedArticle[] = ls.map((article) => ({
    id: randomUUID(),
    title: article.data.title,
    text: article.body ?? "",
    excerpt: article.data.description,
    slug: `/librarian-stories/${article.id}/`,
  }))

  const librarianReflections: IndexedArticle[] = lr.map((article) => ({
    id: randomUUID(),
    title: article.data.title,
    text: article.body ?? "" + " "+article.data.author,
    excerpt: `A reflection by ${article.data.author}`,
    slug: `/reflections/${article.id}/`,
  }))
  // TODO: add remaining datasources
  const articles = [...askTheLibrarian, ...librarianStories, ...librarianReflections]
  miniSearch.addAll(articles)
  return new Response(JSON.stringify(miniSearch), {
    headers: { "Content-Type": "application/json" },
  })
}
