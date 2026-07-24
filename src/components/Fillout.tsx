import { FilloutPopupEmbed } from "@fillout/react";
import { useState } from "react";
import { Button } from "./ui/button";

export const NewLibraryStory = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="w-full flex items-center justify-center">
                <Button onClick={() => setIsOpen(true)} size="lg" className="p-4">Submit Your Story!</Button>
            </div>
            <FilloutPopupEmbed
                filloutId="53dLZDa5k3us"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    )
}