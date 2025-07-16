"use client";

import { useState, KeyboardEvent } from 'react';

interface InputBarProps {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
}

export function InputBar({ onSendMessage, disabled = false }: InputBarProps) {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim() && !disabled) {
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-end space-x-2">
                <div className="flex-1">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me about Canadian citizenship, history, or government..."
                        className="w-full resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        rows={1}
                        disabled={disabled}
                        style={{
                            minHeight: '40px',
                            maxHeight: '120px'
                        }}
                        onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
                        }}
                    />
                </div>
                <button
                    onClick={handleSend}
                    disabled={!message.trim() || disabled}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {disabled ? (
                        <div className="flex items-center space-x-1">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <span>Send</span>
                    )}
                </button>
            </div>

            {/* Quick question buttons */}
            <div className="mt-2 flex flex-wrap gap-2">
                {[
                    "Quiz me on Canadian history",
                    "What are citizen rights?",
                    "Tell me about provinces",
                    "Test my knowledge"
                ].map((quickQuestion) => (
                    <button
                        key={quickQuestion}
                        onClick={() => !disabled && onSendMessage(quickQuestion)}
                        disabled={disabled}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {quickQuestion}
                    </button>
                ))}
            </div>
        </div>
    );
} 