"use client";

import { CopyIcon, SaveIcon } from 'lucide-react';
import { Message } from './ChatWindow';
import { Button } from './ui/button';
import ReactMarkdown from 'react-markdown';
import { Components } from 'react-markdown';
import { toast } from 'sonner';

interface MessageBubbleProps {
    message: Message;
}

// Enhanced markdown components with better styling and accessibility
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

export function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === 'user';

    const handleCopyMessage = async () => {
        try {
            await navigator.clipboard.writeText(message.content);


            toast.success('Message copied to clipboard');
        } catch (error) {
            console.error('Failed to copy message:', error);
            toast.error('Failed to copy message');
        }
    };

    const handleSaveAsFlashcard = () => {
        // TODO: Implement save to flashcard functionality
        try {
            // TODO: Implement save to flashcard functionality
            toast.success('Flashcard saved');
        } catch (error) {
            console.error('Failed to save flashcard:', error);
            toast.error('Failed to save flashcard');
        }
    };

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-3 max-w-[90%] md:max-w-[75%] ${isUser ? 'flex-row-reverse space-x-reverse' : 'pb-24'
                }`}>
                {/* Assistant avatar - only for non-user messages */}
                {!isUser && (
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 text-sm">🍁</span>
                    </div>
                )}

                <div className="flex flex-col">
                    {/* Message bubble */}
                    <div className={`rounded-xl ${isUser
                        ? 'bg-gray-900 text-white px-4 py-3'
                        : 'bg-none text-gray-900 px-1 py-1'
                        }`}>
                        {!isUser && (
                            <p className="font-semibold text-sm from-red-500 to-purple-700 bg-gradient-to-r bg-clip-text text-transparent">
                                AI Assistant
                            </p>
                        )}

                        <div className="text-sm md:text-base leading-relaxed">
                            {isUser ? (
                                <div className="whitespace-pre-wrap break-words">
                                    {message.content}
                                </div>
                            ) : (
                                <div className="markdown-content">
                                    <ReactMarkdown components={markdownComponents}>
                                        {message.content}
                                    </ReactMarkdown>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action buttons - only for assistant messages */}
                    {!isUser && (
                        <div className="flex flex-row items-center gap-1">
                            <Button
                                onClick={handleCopyMessage}
                                variant="outline"
                                size="sm"
                                className="mt-2 shadow-none border-none hover:bg-gray-100"
                                aria-label="Copy message to clipboard"
                            >
                                <CopyIcon className="w-4 h-4" />
                            </Button>

                            <Button
                                onClick={handleSaveAsFlashcard}
                                variant="outline"
                                size="sm"
                                className="mt-2 shadow-none border-none hover:bg-gray-100"
                                aria-label="Save as flashcard"
                            >
                                <SaveIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 