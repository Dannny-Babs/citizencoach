"use client";

import React, { createContext, useContext } from "react";
import { useFlashcards, Flashcard } from "../hooks/useFlashcards";

interface FlashcardContextType {
    flashcards: Flashcard[];
    addFlashcard: (question: string, answer: string) => Flashcard;
    updateFlashcard: (id: string, updatedCard: Flashcard) => void;
    deleteFlashcard: (id: string) => void;
    getDueFlashcards: () => Flashcard[];
    getFlashcardStats: () => { total: number; due: number; reviewed: number; new: number };
    createFlashcardsFromText: (text: string) => Flashcard[];
    parseQAFromText: (text: string) => Array<{ question: string; answer: string }>;
    clearAllFlashcards: () => void;
}

const FlashcardContext = createContext<FlashcardContextType | undefined>(undefined);

export const FlashcardProvider = ({ children }: { children: React.ReactNode }) => {
    const flashcardApi = useFlashcards();
    return (
        <FlashcardContext.Provider value={flashcardApi}>
            {children}
        </FlashcardContext.Provider>
    );
};

export function useFlashcardContext() {
    const ctx = useContext(FlashcardContext);
    if (!ctx) throw new Error("useFlashcardContext must be used within a FlashcardProvider");
    return ctx;
} 