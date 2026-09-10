import { Client, iteratePaginatedAPI } from "@notionhq/client"
import * as dotenv from "dotenv"
import { promises as fs } from "fs"
dotenv.config()
async function Main() {
  const API_KEY = process.env.N_PAT
  if (!API_KEY) {
    console.error("Missing API Key")
    return
  }

  const notion = new Client({
    auth: process.env.N_PAT,
  })
  try {
    for await (const page of iteratePaginatedAPI(notion.dataSources.query, {
      data_source_id: "1c2d7c6a-c15d-8089-8d48-000b4f9fd153",
    })) {
      const md = await notion.pages.retrieveMarkdown({ page_id: page.id })
      const filepath = "./ntn_rf/" + page.id + ".md"

      try {
        await fs.writeFile(filepath, md.markdown, "utf8")
        console.log(`${page.id} - markdown saved!`)
      } catch (error) {
        console.error("Error writing file:", error)
      }
    }
  } catch (error) {
    console.error(error)
  }
}
Main()
