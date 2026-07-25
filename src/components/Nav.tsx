import HamburgerMenu, { type HamburgerMenuProps } from "./menu";

const links: HamburgerMenuProps["links"] = [
    { label: "Ask The Librarian", href: "/ask-the-librarian" },
    { label: "Librarian Stories", href: "/librarian-stories" },
    { label: "News", href: "/news" },
    { label: "Michelle Howard", href: "/michelle-howard" }
]

export const Nav = () => (
    <nav role="navigation" className="w-full m-0 flex items-center justify-between bg-primary p-4 sticky top-0 shadow-lg z-1000">
        <a href="/" className="text-background">The Card Catalog</a>
        <HamburgerMenu links={links} />
    </nav>
)