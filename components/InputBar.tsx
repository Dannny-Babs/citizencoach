"use client";

import { PlusIcon, SendIcon } from 'lucide-react';
import { useState, KeyboardEvent } from 'react';
import { Button } from './ui/button';

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
        <div className="flex flex-col gap-2 p-2 m-2 bg-slate-50 border rounded-3xl border-gray-200">
            {/* Quick question buttons */}
            <div className="flex flex-wrap gap-2 p-2">
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
                        className="text-xs bg-slate-300 hover:bg-slate-400   text-slate-700 px-2 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {quickQuestion}
                    </button>
                ))}
            </div>


            <div className="flex flex-col items-end space-y-2 border rounded-3xl border-gray-200 p-4 bg-white">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about Canadian citizenship, history, or government..."
                    className="w-full resize-none focus:outline-none focus:ring-0 focus:border-transparent text-sm text-slate-800 placeholder:text-slate-300"
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

                <div className="flex flex-row w-full items-center justify-between">
                    <PlusIcon className="w-4 h-4 text-gray-500" />
                    <Button className="bg-black rounded-full py-2 px-2 " onClick={handleSend}>
                        <SendIcon className="w-4 h-4 text-white" />
                    </Button>
                </div>
            </div>
        </div>
    );
} 