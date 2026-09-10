import { Bookmark, BookMarked, BookOpen, CircleQuestionMark, Headphones, Library, Mail, Mic } from "lucide-react"
import { ArticleTags } from "./Tags";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx"

interface ALTArticle {
    id: string
    data: ATLData
}
interface LSArticle {
    id: string
    data: LSData
}
interface LRArticle {
  id: string
  data: LRData
}
interface NewsArticle {
    id: string
    data: NewsData
}
interface ATLData {
    title: string,
    description: string,
    tags: Array<string>
}
interface LSData {
    title: string,
    location: Array<string>,
  country: string
}
interface LRData {
  title: string
}
interface NewsData {
    title: string
}
interface PodcastData {
    id: string,
    title: string
}
export function ATLGallery({ articles }: { articles: Array<ALTArticle> }) {
    return (<div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
            <a className='block no-underline text-inherit h-full' href={`/ask-the-librarian/${article.id}`} key={article.id}>
                <Card className='hover:bg-muted/85 h-full'>
                    <CardHeader><span className='text-[1.1rem]'>{article.data.title}</span></CardHeader>
                    <CardContent><ArticleTags tags={article.data.tags} /><p className='p-2'><em>{article.data.description}</em></p></CardContent>
                </Card>
            </a>

        ))}
    </div>)
}
export function LSGallery({ articles }: { articles: Array<LSArticle> }) {
  const grouped = Object.groupBy(articles,(item => item.data.country)) as Record<string, LSArticle[]>
  // Note: sort by count using a[1].length > b[1].length

  const triggerNames = Object.entries(grouped).map(([name])=>(name))
  const triggers = triggerNames.map((trigger)=>(
    <TabsTrigger value={trigger}>{trigger}</TabsTrigger>
  ))
  const sections = Object.entries(grouped).sort((a,b)=>(a[0].localeCompare(b[0]))).map(([country, items]) => (
    <TabsContent value={country}>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((article) => (
        <a
          className="block h-full text-inherit no-underline"
          href={`/librarian-stories/${article.id}`}
          key={article.id}
        >
          <Card className="h-full hover:bg-muted/85">
            <CardHeader>
              <span className="text-[1.1rem]">{article.data.title}</span>
            </CardHeader>
            <CardContent>
              <ArticleTags tags={article.data.location} />
            </CardContent>
          </Card>
        </a>
      ))}
      </div>
    </TabsContent>
  ))
    // return (
    //
    //
    //   <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
    //     {articles.map((article) => (
    //         <a className='block no-underline text-inherit h-full' href={`/librarian-stories/${article.id}`} key={article.id}>
    //             <Card className='hover:bg-muted/85 h-full'>
    //                 <CardHeader><span className='text-[1.1rem]'>{article.data.title}</span></CardHeader>
    //                 <CardContent><ArticleTags tags={article.data.location} /></CardContent>
    //             </Card>
    //         </a>
    //
    //     ))}
    // </div>
    //
    // )
  return (
    <Tabs >
      <TabsList variant={"line"}>
        {triggers}
      </TabsList>
      {sections}
    </Tabs>
  )
}

export function LRGallery({ articles }: { articles: Array<LRArticle> }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <a
          className="link-wrapper"
          href={`/reflections/${article.id}`}
          key={article.id}
        >
          <div className="h-full rounded-lg bg-card ring-1 ring-foreground/10">
            <div className="flex items-center justify-center rounded-t-lg bg-primary/50 p-4">
              <Bookmark size={50} className="h-15 text-primary" />
            </div>
            <div className="flex h-22 items-center justify-center p-4">
              <h3 className="mt-0 text-center no-underline">
                {article.data.title}
              </h3>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
export function PodcastGallery({ articles }: { articles: Array<PodcastData> }) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((podcast) => (
            <a
              className="link-wrapper"
              href={podcast.id}
              key={podcast.id}
            >
                <div className="h-full rounded-lg bg-card ring-1 ring-foreground/10">
                    <div className="flex items-center justify-center rounded-t-lg bg-primary/50 p-4">
                        <Headphones size={50} className="h-15 text-primary" />
                    </div>
                    <div className="flex h-22 items-center justify-center p-4">
                        <h3 className="mt-0 text-center no-underline">
                            {podcast.title}
                        </h3>
                    </div>
                </div>
            </a>
          ))}
      </div>
    )
}

export function NewsGallery({ articles }: { articles: Array<NewsArticle> }) {
    return (<div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
            <a className="link-wrapper" href={`/news/${article.id}`} key={article.id}>
                <div className="bg-card rounded-lg  ring-1 ring-foreground/10 h-full ">
                    <div className="bg-primary/50 items-center flex justify-center rounded-t-lg p-4">
                        <Mic size={50} className="text-primary h-15" />
                    </div>
                    <div className=" flex items-center justify-center h-22 p-4">
                        <h2 className="mt-0 no-underline text-center">{article.data.title}</h2>
                    </div>
                </div>
            </a>

        ))}
    </div>)
}

export function FrontGallery() {

    return (<div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-4 py-4">
        {/* ATL */}
        <a className="link-wrapper" href="/ask-the-librarian">
            <div className=" bg-card rounded-lg  ring-1 ring-foreground/10 h-full ">
                <div className="bg-primary/50 items-center flex justify-center rounded-t-lg p-4">
                    <CircleQuestionMark size={50} className="text-primary h-15" />
                </div>
                <div className=" flex items-center justify-center h-22 p-4">
                    <h2 className="mt-0 no-underline text-center">Ask the Librarian</h2>
                </div>
            </div>
        </a>
        {/* Shelf Notes */}

        <a className="link-wrapper" href="/shelf-notes">
            <div className="bg-card rounded-lg  ring-1 ring-foreground/10 h-full ">
                <div className="bg-primary/50 items-center flex justify-center rounded-t-lg p-4">
                    <Mail size={50} className="text-primary h-15" />
                </div>
                <div className=" flex items-center justify-center h-22 p-4">
                    <h2 className="mt-0 no-underline text-center">The Shelf Notes</h2>
                </div>
            </div>
        </a>
        {/* Librarian Stories */}
        <a className="link-wrapper" href="/librarian-stories">
            <div className="bg-card rounded-lg  ring-1 ring-foreground/10 h-full ">
                <div className="bg-primary/50 items-center flex justify-center rounded-t-lg p-4">
                    <BookMarked size={50} className="text-primary h-15" />
                </div>
                <div className=" flex items-center justify-center h-22 p-4">
                    <h2 className="mt-0 no-underline text-center">Librarian Stories</h2>
                </div>
            </div>
        </a>
        {/* Librarian Reflections */}
        <a className="link-wrapper" href="/reflections">
            <div className="bg-card rounded-lg  ring-1 ring-foreground/10 h-full ">
                <div className="bg-primary/50 items-center flex justify-center rounded-t-lg p-4">
                    <Bookmark size={50} className="text-primary h-15" />
                </div>
                <div className=" flex items-center justify-center h-22 p-4">
                    <h2 className="mt-0 no-underline text-center">Librarian Reflections</h2>
                </div>
            </div>
        </a>

        {/* Michelle Howard */}
        <a className="link-wrapper" href="/michelle-howard">
            <div className="bg-card rounded-lg  ring-1 ring-foreground/10 h-full ">
                <div className="bg-primary/50 items-center flex justify-center rounded-t-lg p-4">
                    <Library size={50} className="text-primary h-15" />
                </div>
                <div className=" flex items-center justify-center h-22 p-4">
                    <h2 className="mt-0 no-underline text-center">Michelle Howard</h2>
                </div>
            </div>
        </a>
        {/*    PBP    */}
        <a className="link-wrapper" href="/ask-the-librarian/6">
            <div className="bg-card rounded-lg  ring-1 ring-foreground/10 h-full ">
                <div className="bg-primary/50 items-center flex justify-center rounded-t-lg p-4">
                    <BookOpen size={50} className="text-primary h-15" />
                </div>
                <div className=" flex items-center justify-center h-22 p-4">
                    <h2 className="mt-0 no-underline text-center">Picture Book Preschool</h2>
                </div>
            </div>
        </a>
        {/*    Podcast    */}
        <a className="link-wrapper" href="/podcast">
            <div className="bg-card rounded-lg  ring-1 ring-foreground/10 h-full ">
                <div className="bg-primary/50 items-center flex justify-center rounded-t-lg p-4">
                    <Headphones size={50} className="text-primary h-15" />
                </div>
                <div className=" flex items-center justify-center h-22 p-4">
                    <h2 className="mt-0 no-underline text-center">Librarian Podcast</h2>
                </div>
            </div>
        </a>
        {/* Libraries in the News */}

        <a className="link-wrapper" href="/news">
            <div className="bg-card rounded-lg  ring-1 ring-foreground/10 h-full ">
                <div className="bg-primary/50 items-center flex justify-center rounded-t-lg p-4">
                    <Mic size={50} className="text-primary h-15" />
                </div>
                <div className=" flex items-center justify-center h-22 p-4">
                    <h2 className="mt-0 no-underline text-center">Libraries in the News</h2>
                </div>
            </div>
        </a>
    </div>)

}