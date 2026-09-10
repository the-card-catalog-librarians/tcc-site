import { Badge } from "./ui/badge";

export function ArticleTags({ tags, className }: { tags: Array<string>, className?: string }) {
    return (
      <div className={`flex gap-2 ${className}`}>
            {tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
            ))}
        </div>
    )
}
