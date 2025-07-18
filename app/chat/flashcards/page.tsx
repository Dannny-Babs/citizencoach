import { FlashcardCreator } from "@/components/FlashcardCreator";
import { FlashcardProvider } from "@/context/FlashcardContext";

export default function CreateFlashcardsPage() {
    return (
        <FlashcardProvider>
            <FlashcardCreator />
        </FlashcardProvider>
    );
} 