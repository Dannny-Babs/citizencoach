"use client";

import { useState } from 'react';
import { useFlashcardContext } from '../context/FlashcardContext';
import { Button } from './ui/button';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import { Components } from 'react-markdown';

// Enhanced markdown components for content preview
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

export function FlashcardCreator() {
    const { addFlashcard, createFlashcardsFromText } = useFlashcardContext();
    const [content, setContent] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedCards, setGeneratedCards] = useState<Array<{ question: string; answer: string }>>([]);
    const [showPreview, setShowPreview] = useState(false);

    const handleGenerateFlashcards = async () => {
        if (!content.trim()) {
            toast.error('Please enter some content to generate flashcards');
            return;
        }

        setIsGenerating(true);
        try {
            // Call the AI to generate flashcards from the content
            const response = await fetch('/api/generate-flashcards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate flashcards');
            }

            const data = await response.json();
            setGeneratedCards(data.flashcards || []);
            setShowPreview(true);
            toast.success(`Generated ${data.flashcards?.length || 0} flashcards`);
        } catch (error) {
            console.error('Error generating flashcards:', error);
            toast.error('Failed to generate flashcards');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSaveFlashcards = () => {
        if (generatedCards.length === 0) return;

        generatedCards.forEach(({ question, answer }) => {
            addFlashcard(question, answer);
        });

        toast.success(`Saved ${generatedCards.length} flashcards`);
        setGeneratedCards([]);
        setShowPreview(false);
        setContent('');
    };

    const handleSaveSingleCard = (question: string, answer: string) => {
        addFlashcard(question, answer);
        toast.success('Flashcard saved');
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Flashcards</h1>
                <p className="text-gray-600">
                    Paste your study content below and we'll generate flashcards to help you learn.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                            Study Content
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Paste your study notes, textbook content, or any text you want to turn into flashcards..."
                            className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                    </div>

                    <Button
                        onClick={handleGenerateFlashcards}
                        disabled={isGenerating || !content.trim()}
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                        {isGenerating ? 'Generating...' : 'Generate Flashcards'}
                    </Button>
                </div>

                {/* Preview Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900">Generated Flashcards</h2>
                        {generatedCards.length > 0 && (
                            <Button
                                onClick={handleSaveFlashcards}
                                className="bg-green-600 hover:bg-green-700 text-white"
                            >
                                Save All ({generatedCards.length})
                            </Button>
                        )}
                    </div>

                    {showPreview && (
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {generatedCards.map((card, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                                    <div className="mb-3">
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Question:</h3>
                                        <div className="text-sm text-gray-900 font-medium">
                                            {card.question}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Answer:</h3>
                                        <div className="text-sm text-gray-900">
                                            <ReactMarkdown components={markdownComponents}>
                                                {card.answer}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => handleSaveSingleCard(card.question, card.answer)}
                                        size="sm"
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        Save This Card
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}

                    {!showPreview && (
                        <div className="text-center text-gray-500 py-8">
                            <div className="text-4xl mb-2">📝</div>
                            <p>Enter content and click "Generate Flashcards" to see preview</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 