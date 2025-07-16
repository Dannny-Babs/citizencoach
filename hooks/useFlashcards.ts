"use client";

import { useState, useEffect, useCallback } from "react";

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  created: Date;
  lastReviewed?: Date;
  nextReview: Date;
  reviewCount: number;
  difficulty?: "easy" | "medium" | "hard";
}

const STORAGE_KEY = "citizencoach-flashcards";

export function useFlashcards() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  // Load flashcards from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Convert date strings back to Date objects
        const flashcardsWithDates = parsed.map((card: any) => ({
          ...card,
          created: new Date(card.created),
          lastReviewed: card.lastReviewed
            ? new Date(card.lastReviewed)
            : undefined,
          nextReview: new Date(card.nextReview),
        }));
        setFlashcards(flashcardsWithDates);
      }
    } catch (error) {
      console.error("Error loading flashcards:", error);
    }
  }, []);

  // Save flashcards to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(flashcards));
    } catch (error) {
      console.error("Error saving flashcards:", error);
    }
  }, [flashcards]);

  const addFlashcard = useCallback((question: string, answer: string) => {
    const newCard: Flashcard = {
      id: Date.now().toString(),
      question: question.trim(),
      answer: answer.trim(),
      created: new Date(),
      nextReview: new Date(), // Due immediately
      reviewCount: 0,
    };

    setFlashcards((prev) => [...prev, newCard]);
    return newCard;
  }, []);

  const updateFlashcard = useCallback((id: string, updatedCard: Flashcard) => {
    setFlashcards((prev) =>
      prev.map((card) => (card.id === id ? updatedCard : card))
    );
  }, []);

  const deleteFlashcard = useCallback((id: string) => {
    setFlashcards((prev) => prev.filter((card) => card.id !== id));
  }, []);

  const getDueFlashcards = useCallback(() => {
    const now = new Date();
    return flashcards.filter((card) => card.nextReview <= now);
  }, [flashcards]);

  const getFlashcardStats = useCallback(() => {
    const total = flashcards.length;
    const due = getDueFlashcards().length;
    const reviewed = flashcards.filter((card) => card.reviewCount > 0).length;

    return {
      total,
      due,
      reviewed,
      new: total - reviewed,
    };
  }, [flashcards, getDueFlashcards]);

  // Parse potential Q&A from AI responses
  const parseQAFromText = useCallback(
    (text: string): Array<{ question: string; answer: string }> => {
      const qaPairs: Array<{ question: string; answer: string }> = [];

      // Look for Q: ... A: ... patterns
      const qaPattern = /Q:\s*(.+?)\s*A:\s*(.+?)(?=\n\s*Q:|$)/gs;
      let match;

      while ((match = qaPattern.exec(text)) !== null) {
        const question = match[1].trim();
        const answer = match[2].trim();
        if (question && answer) {
          qaPairs.push({ question, answer });
        }
      }

      // Look for numbered question patterns
      if (qaPairs.length === 0) {
        const numberedPattern = /(\d+\.\s*.+?\?)\s*(.+?)(?=\n\s*\d+\.|$)/gs;
        while ((match = numberedPattern.exec(text)) !== null) {
          const question = match[1].trim();
          const answer = match[2].trim();
          if (question && answer && question.includes("?")) {
            qaPairs.push({ question, answer });
          }
        }
      }

      return qaPairs;
    },
    []
  );

  const createFlashcardsFromText = useCallback(
    (text: string) => {
      const qaPairs = parseQAFromText(text);
      const newCards = qaPairs.map(({ question, answer }) =>
        addFlashcard(question, answer)
      );
      return newCards;
    },
    [parseQAFromText, addFlashcard]
  );

  const clearAllFlashcards = useCallback(() => {
    setFlashcards([]);
  }, []);

  return {
    flashcards,
    addFlashcard,
    updateFlashcard,
    deleteFlashcard,
    getDueFlashcards,
    getFlashcardStats,
    createFlashcardsFromText,
    parseQAFromText,
    clearAllFlashcards,
  };
}
