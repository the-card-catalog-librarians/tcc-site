import { Search } from "lucide-react"
import HamburgerMenu, { type HamburgerMenuProps } from "./menu"

const links: HamburgerMenuProps["links"] = [
  { label: "Ask The Librarian", href: "/ask-the-librarian" },
  { label: "Librarian Stories", href: "/librarian-stories" },
  { label: "News", href: "/news" },
  { label: "Michelle Howard", href: "/michelle-howard" },
  { label: "Librarian Reflections", href: "/reflections" },
  { label: "Librarian Podcast", href: "/podcast" },
]

export const Nav = () => (
  <nav
    role="navigation"
    className="sticky top-0 z-1000 m-0 flex w-full items-center justify-between bg-primary p-4 shadow-lg"
  >
    <a href="/" className="text-background">
      The Card Catalog
    </a>
    <div className="flex items-center gap-2">
      <a className="link-wrapper hover:text-muted" href="/search">
        <Search className="size-4 cursor-pointer text-white" />
      </a>
      <HamburgerMenu links={links} />
    </div>
  </nav>
)
