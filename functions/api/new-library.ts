import type { PagesFunction } from "@cloudflare/workers-types"
import {z} from 'astro/zod'
import {Client} from "@notionhq/client"

const StorySchema = z.object({
  library: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  country: z.string(),
  state: z.string().optional(),
  story: z.string(),
  honey: z.string().optional()
})
interface Env {
  N_API_KEY: string
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context
  if (!env.N_API_KEY)
    return new Response("Server Misconfigured",{ status: 500})

  const notion = new Client({
    auth: env.N_API_KEY,
  })


  try {
    let data: z.infer<typeof StorySchema>
    try{
     data = StorySchema.parse(await request.json())
      if(data.honey&& data.honey.length>0){
        console.error(`AI Request: ${data}`)
        // fake a 200
        return new Response(JSON.stringify({ ok: true }), {
          headers: { "Content-Type": "application/json" },
        })
      }
  }catch (e) {
    console.error(e)
    return new Response(
      "Bad Request", { status: 400}
    )
  }
    await notion.pages.create({
      parent: {
        data_source_id: "3dad7c6a-c15d-805f-b729-000bdfc7c3cd",
      },
      properties: {
        Library: {
          title: [
            {
              type: "text",
              text: {
                content: data.library,
              },
            },
          ],
        },
        "First Name": {
          rich_text: [
            {
              type: "text",
              text: {
                content: data.firstName,
              },
            },
          ],
        },
        "Last Name": {
          rich_text: [
            {
              type: "text",
              text: {
                content: data.lastName,
              },
            },
          ],
        },
        Email: {
          email: data.email,
        },
        Country: {
          rich_text: [
            {
              type: "text",
              text: {
                content: data.country,
              },
            },
          ],
        },
        State: {
          rich_text: [
            {
              type: "text",
              text: {
                content: data.state ?? "",
              },
            },
          ],
        },
      },
      markdown: data.story,
    })
  } catch (e) {
    console.error(e)
    return new Response("External Service error", { status: 502})
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  })
}
