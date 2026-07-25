import { TooltipProvider } from "@/components/ui/tooltip";
import { Nav } from "./Nav";

export function Wrapper({ children }: React.PropsWithChildren) {
    return (<TooltipProvider>
        <Nav />
        <header role="banner" className="w-full sm:h-75 h-60 overflow-hidden">
            <img src="/banner.avif" className="object-cover w-full h-full" alt="An old card catalog" fetchPriority="high" />
        </header>
        <main role="main" className="m-auto width-[90%] md:w-[80%] lg:w-[75%] typeset typeset-article bg-muted p-8">{children}</main>
    </TooltipProvider>)
}