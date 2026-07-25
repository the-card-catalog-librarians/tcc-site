import { Button } from '@/components/ui/button'
import { X as ResetIcon, Search as SearchIcon } from 'lucide-react'
import MiniSearch, { type SearchResult } from 'minisearch'
import { useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group'
interface ArticleResult extends SearchResult {
    title: string
    excerpt: string
    slug: string
}

function SearchBar({ searchTerm, setSearchTerm, onSearch, reset }: {
    searchTerm: string
    setSearchTerm: (value: string) => void
    onSearch: () => void
    reset: () => void
}) {
    return (
        <InputGroup>
            <InputGroupInput
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === "Return") onSearch() }}
            />
            <InputGroupAddon>
                <Button onClick={onSearch} size="icon-xs" variant={"ghost"}>
                    <SearchIcon />
                </Button>
            </InputGroupAddon>
            <InputGroupAddon align={"inline-end"}>
                <Button onClick={reset} size="icon-xs" variant={"ghost"}>
                    <ResetIcon />
                </Button>
            </InputGroupAddon>
        </InputGroup>
    )
}

export function Search() {
    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState<ArticleResult[] | undefined>()
    const [json, setJson] = useState("")


    useEffect(() => {
        fetch("/search-index.json")
            .then((resp) => resp.text())
            .then((d) => setJson(d))
    }, [])

    const search = useMemo(() => {
        if (!json) return null

        return MiniSearch.loadJSON(json, {
            fields: ['title', 'text'],
            storeFields: ['title', 'excerpt', 'slug']
        })
    }, [json])
    function reset() {
        setSearchTerm("")
        setResults([])
    }

    function searchIndex() {
        if (!search) return

        setResults(search.search(searchTerm) as ArticleResult[])
    }

    return (
        <div>
            {/* <h1 className='text-center'>Search</h1> */}
            <Card>
                <CardHeader>
                    <CardTitle className='text-center text-2xl'>Search</CardTitle>
                </CardHeader>
                <CardContent>
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={searchIndex} reset={reset} />
                    <div className='pt-4'>
                        <ResultsList results={results || []} />
                    </div>
                </CardContent>
            </Card>
        </div>

    )

}

const ResultsList = ({ results }: { results: ArticleResult[] }) => (
    <div className='w-full flex flex-col gap-2'>
        {results.length > 0 ?
            results.map((result) => (
                <Card>
                    <CardHeader>
                        <CardTitle><a className='no-underline text-foreground' href={result.slug}>{result.title}</a></CardTitle>
                    </CardHeader>
                    <CardContent>
                        {result.excerpt}
                    </CardContent>
                </Card>
            ))
            :
            <p className='text-center'>No Results</p>
        }
    </div>
)

