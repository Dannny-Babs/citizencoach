"use client";

import { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { InputBar } from './InputBar';
import { useChat } from '../hooks/useChat';
import { IOSpinner } from './spinner'

export interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
}

export function ChatWindow() {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { messages, isLoading, sendMessage, provider, model } = useChat();

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
        <div className="h-full flex flex-col bg-white relative">
            {/* Scrollable messages area */}
            <div className="flex-1 overflow-y-auto pb-16 md:pb-32">
                {messages.length === 0 ? (
                    // Empty state - centered in the scrollable area
                    <div className="h-full flex items-center justify-center p-6">
                        <div className="text-center max-w-md">
                            <div className="flex justify-center mb-2">
                                <div
                                    className="relative flex w-[120px] h-[120px] shrink-0 items-center justify-center rounded-full"
                                    style={{ background: 'linear-gradient(rgba(123, 123, 123, 0.1) 0%, rgba(123, 123, 123, 0) 100%)' }}
                                >
                                    <div
                                        className="relative z-10 flex w-20 h-20 items-center justify-center rounded-full bg-white"
                                        style={{
                                            boxShadow: 'rgba(16, 16, 16, 0.06) 0px 4px 8px, rgba(16, 16, 16, 0.04) 0px 2px 4px, rgba(16, 16, 16, 0.04) 0px 1px 2px, rgba(16, 16, 16, 0.06) 0px 0px 0px 1px, rgba(61, 61, 61, 0.08) 0px -0.5px 0.5px inset'
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="650" height="650" viewBox="-2015 -2000 4030 4030" className="w-12 h-12">
                                            <title>maple leaf from the flag of Canada</title>
                                            <path fill="#f00" d="m-90 2030 45-863a95 95 0 0 0-111-98l-859 151 116-320a65 65 0 0 0-20-73l-941-762 212-99a65 65 0 0 0 34-79l-186-572 542 115a65 65 0 0 0 73-38l105-247 423 454a65 65 0 0 0 111-57l-204-1052 327 189a65 65 0 0 0 91-27l332-652 332 652a65 65 0 0 0 91 27l327-189-204 1052a65 65 0 0 0 111 57l423-454 105 247a65 65 0 0 0 73 38l542-115-186 572a65 65 0 0 0 34 79l212 99-941 762a65 65 0 0 0-20 73l116 320-859-151a95 95 0 0 0-111 98l45 863z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl font-medium mb-2 text-ln-gray-900">Welcome to your Citizenship Coach!</h3>
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
                            <div className="flex justify-start gap-2 items-center">
                                <IOSpinner />
                                <p className="text-sm">Generating Response</p>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Static input bar - positioned absolutely */}
            <div className="absolute bottom-0 left-0 right-0 bg-white">
                <InputBar onSendMessage={handleSendMessage} disabled={isLoading} provider={provider} model={model} />
            </div>
        </div>
    );
} 