"use client";

import { useState } from 'react';
import { useFlashcards } from '../hooks/useFlashcards';
import ReactMarkdown from 'react-markdown';
import { Components } from 'react-markdown';

// Enhanced markdown components for flashcard rendering
const markdownComponents: Components = {
    h1: ({ children }) => (
        <h1 className="text-lg font-bold mt-4 mb-4 text-gray-900">
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-base font-bold mt-3 mb-4 text-gray-900">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-sm font-bold mt-2 mb-4 text-gray-900">
            {children}
        </h3>
    ),
    strong: ({ children }) => (
        <strong className="font-semibold text-gray-900">
            {children}
        </strong>
    ),
    p: ({ children }) => (
        <p className="mb-2 leading-relaxed last:mb-0">
            {children}
        </p>
    ),
    ul: ({ children }) => (
        <ul className="list-disc list-outside mb-2 ml-4 space-y-1">
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal list-outside mb-2 ml-4 space-y-1">
            {children}
        </ol>
    ),
    li: ({ children }) => (
        <li className="text-gray-900 leading-relaxed pl-1">
            {children}
        </li>
    ),
    a: ({ children, href, ...props }) => (
        <a
            href={href}
            className="text-blue-500 hover:text-blue-600 hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            {...props}
        >
            {children}
        </a>
    ),
    code: ({ children }) => (
        <code className="text-red-600 bg-red-50 px-1 py-0.5 rounded text-xs font-mono">
            {children}
        </code>
    ),
    pre: ({ children }) => (
        <pre className="bg-gray-100 border border-gray-200 rounded-md p-3 overflow-x-auto text-sm font-mono mb-4">
            {children}
        </pre>
    ),
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4">
            {children}
        </blockquote>
    ),
};

export function FlashcardReview() {
    const { flashcards, updateFlashcard, getDueFlashcards } = useFlashcards();
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [studyMode, setStudyMode] = useState<'due' | 'all'>('due');

    const cardsToStudy = studyMode === 'due' ? getDueFlashcards() : flashcards;
    const currentCard = cardsToStudy[currentCardIndex];

    const handleDifficultyResponse = (difficulty: 'easy' | 'medium' | 'hard') => {
        if (!currentCard) return;

        // Simple spaced repetition algorithm
        const now = new Date();
        const nextReviewDate = new Date(now);

        switch (difficulty) {
            case 'easy':
                nextReviewDate.setDate(now.getDate() + 7); // Review in 1 week
                break;
            case 'medium':
                nextReviewDate.setDate(now.getDate() + 3); // Review in 3 days
                break;
            case 'hard':
                nextReviewDate.setDate(now.getDate() + 1); // Review tomorrow
                break;
        }

        updateFlashcard(currentCard.id, {
            ...currentCard,
            lastReviewed: now,
            nextReview: nextReviewDate,
            reviewCount: currentCard.reviewCount + 1
        });

        // Move to next card
        if (currentCardIndex < cardsToStudy.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
        } else {
            setCurrentCardIndex(0);
        }
        setShowAnswer(false);
    };

    if (cardsToStudy.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white">
                <div className="text-center max-w-md">
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {studyMode === 'due' ? 'All caught up!' : 'No flashcards yet'}
                    </h2>
                    <p className="text-gray-600 mb-6">
                        {studyMode === 'due'
                            ? 'You\'ve reviewed all your due flashcards. Great job!'
                            : 'Start chatting with CitizenCoach to automatically generate flashcards from your study sessions.'
                        }
                    </p>
                    <div className="space-y-2">
                        {studyMode === 'due' && flashcards.length > 0 && (
                            <button
                                onClick={() => setStudyMode('all')}
                                className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Review All Flashcards ({flashcards.length})
                            </button>
                        )}
                        <button
                            onClick={() => window.location.href = '/chat'}
                            className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Start Studying
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="border-b border-gray-200 p-4">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">Flashcard Review</h1>
                        <p className="text-sm text-gray-600">
                            {currentCardIndex + 1} of {cardsToStudy.length} cards
                            {studyMode === 'due' && ` • ${getDueFlashcards().length} due for review`}
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setStudyMode(studyMode === 'due' ? 'all' : 'due')}
                            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded transition-colors"
                        >
                            {studyMode === 'due' ? 'Show All' : 'Show Due Only'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Flashcard */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="max-w-2xl w-full">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 min-h-64">
                        <div className="text-center">
                            <div className="text-sm text-gray-500 mb-4">
                                {showAnswer ? 'Answer' : 'Question'}
                            </div>

                            <div className="text-lg leading-relaxed mb-8">
                                <div className="markdown-content">
                                    <ReactMarkdown components={markdownComponents}>
                                        {showAnswer ? currentCard.answer : currentCard.question}
                                    </ReactMarkdown>
                                </div>
                            </div>

                            {!showAnswer ? (
                                <button
                                    onClick={() => setShowAnswer(true)}
                                    className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    Show Answer
                                </button>
                            ) : (
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-600 mb-4">
                                        How well did you know this?
                                    </p>
                                    <div className="flex justify-center space-x-4">
                                        <button
                                            onClick={() => handleDifficultyResponse('hard')}
                                            className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
                                        >
                                            Hard (1 day)
                                        </button>
                                        <button
                                            onClick={() => handleDifficultyResponse('medium')}
                                            className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-200 transition-colors"
                                        >
                                            Medium (3 days)
                                        </button>
                                        <button
                                            onClick={() => handleDifficultyResponse('easy')}
                                            className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors"
                                        >
                                            Easy (1 week)
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-6">
                        <div className="bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-red-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((currentCardIndex + 1) / cardsToStudy.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 