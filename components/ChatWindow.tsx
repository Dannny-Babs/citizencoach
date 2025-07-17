"use client";

import { useState, useRef, useEffect } from 'react';
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
    }, [messages]);

    const handleSendMessage = async (content: string) => {
        await sendMessage(content);
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="border-b border-gray-200 p-4">
                <div className="flex items-center space-x-2">
                    
                    <h1 className="text-xl font-semibold text-gray-900">
                        Canadian Citizenship Quiz Coach
                    </h1>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                    Ask me anything about Canadian history, geography, government, or citizenship requirements
                </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-gray-500 mt-8">
                        <div className="text-4xl mb-4">🍁</div>
                        <h3 className="text-lg font-medium mb-2">Welcome to your Citizenship Coach!</h3>
                        <p className="text-sm">Start by asking a question about Canadian citizenship, history, or government.</p>
                        <div className="mt-4 space-y-2 text-xs space-x-2" >
                            <p className="bg-gray-50 rounded p-2 inline-block">
                                &quot;What are the rights and responsibilities of Canadian citizens?&quot;
                            </p>
                            <p className="bg-gray-50 rounded p-2 inline-block">
                                &quot;Tell me about Canada&apos;s confederation&quot;
                            </p>
                            <p className="bg-gray-50 rounded p-2 inline-block">
                                &quot;Quiz me on Canadian geography&quot;
                            </p>
                        </div>
                    </div>
                )}

                {messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                    />
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <InputBar onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
    );
} 