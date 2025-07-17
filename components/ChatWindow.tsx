"use client";

import { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { InputBar } from './InputBar';
import { useChat } from '../hooks/useChat';

export interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
}

export function ChatWindow() {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { messages, isLoading, sendMessage } = useChat();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSendMessage = async (content: string) => {
        await sendMessage(content);
    };

    return (
        <div className="h-screen flex flex-col bg-white relative">
            {/* Scrollable messages area */}
            <div className="flex-1 overflow-y-auto pb-16">
                {messages.length === 0 ? (
                    // Empty state - centered in the scrollable area
                    <div className="h-full flex items-center justify-center p-6">
                        <div className="text-center max-w-md">
                            <div className="text-4xl mb-4">🍁</div>
                            <h3 className="text-lg font-medium mb-2 text-gray-900">Welcome to your Citizenship Coach!</h3>
                            <p className="text-sm text-gray-600 mb-6">Start by asking a question about Canadian citizenship, history, or government.</p>
                            <div className="space-y-2">
                                <button
                                    onClick={() => handleSendMessage("What are the rights and responsibilities of Canadian citizens?")}
                                    className="block w-full bg-gray-50 hover:bg-gray-100 rounded-lg p-3 text-xs text-gray-700 text-left transition-colors border border-gray-200"
                                >
                                    &quot;What are the rights and responsibilities of Canadian citizens?&quot;
                                </button>
                                <button
                                    onClick={() => handleSendMessage("Tell me about Canada's confederation")}
                                    className="block w-full bg-gray-50 hover:bg-gray-100 rounded-lg p-3 text-xs text-gray-700 text-left transition-colors border border-gray-200"
                                >
                                    &quot;Tell me about Canada&apos;s confederation&quot;
                                </button>
                                <button
                                    onClick={() => handleSendMessage("Quiz me on Canadian geography")}
                                    className="block w-full bg-gray-50 hover:bg-gray-100 rounded-lg p-3 text-xs text-gray-700 text-left transition-colors border border-gray-200"
                                >
                                    &quot;Quiz me on Canadian geography&quot;
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Messages list
                    <div className="p-4 space-y-4">
                        {messages.map((message) => (
                            <MessageBubble
                                key={message.id}
                                message={message}
                            />
                        ))}

                        {/* Loading indicator */}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-200 rounded-lg p-3 max-w-xs">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Static input bar - positioned absolutely */}
            <div className="absolute bottom-0 left-0 right-0 bg-white">
                <InputBar onSendMessage={handleSendMessage} disabled={isLoading} />
            </div>
        </div>
    );
} 