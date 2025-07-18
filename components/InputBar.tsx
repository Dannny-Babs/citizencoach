"use client";

import { SendIcon, Plus, ImagePlus, FileText, Camera } from 'lucide-react';
import { useState, KeyboardEvent, useEffect } from 'react';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { Provider } from "@/utils/llmClient";

interface InputBarProps {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
    provider: Provider;
    model: string;
}

export function InputBar({ onSendMessage, disabled = false, provider, model }: InputBarProps) {
    const [message, setMessage] = useState('');
    const [currentModel, setCurrentModel] = useState(model);

    useEffect(() => {
        setCurrentModel(model);
    }, [model]);

    const getDisplayName = (modelId: string) => {
        const names: Record<string, string> = {
            'gpt-4': 'GPT-4',
            'gpt-4-turbo': 'GPT-4 Turbo',
            'gpt-3.5-turbo': 'GPT-3.5 Turbo',
            'gpt-4o-mini': 'GPT-4o Mini',
            'gemini-pro': 'Gemini Pro',
            'gemini-pro-vision': 'Gemini Pro Vision',
            'gemini-ultra': 'Gemini Ultra',
        };
        return names[modelId] || modelId;
    };

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
            {/* Quick question buttons - horizontally scrollable */}
            <div className="overflow-x-auto p-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="flex gap-2 min-w-max">
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
                            className="text-xs md:text-sm bg-gray-100 hover:bg-gray-200 border text-ln-gray-900 px-3 py-1 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap flex-shrink-0"
                        >
                            {quickQuestion}
                        </button>
                    ))}
                </div>
            </div>


            <div className="flex flex-col items-end space-y-2 border rounded-3xl border-gray-200 p-2 bg-white">
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className="py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                                aria-label="Attachment options"
                            >
                                <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                            <DropdownMenuItem
                                onClick={() => {
                                    // TODO: Implement image attachment functionality
                                }}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <ImagePlus className="w-4 h-4" />
                                <span>Attach Image</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    // TODO: Implement document upload functionality
                                }}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <FileText className="w-4 h-4" />
                                <span>Upload Document</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    // TODO: Implement camera functionality
                                }}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <Camera className="w-4 h-4" />
                                <span>Take a Picture</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button className="bg-ln-gray-900 hover:bg-ln-gray-800 shadow-ln-button-gray   transition duration-200 ease-out 
                            outline-none focus:outline-none 
                            disabled:pointer-events-none rounded-full py-2 px-2 " onClick={handleSend}>
                        Send
                        <SendIcon className="w-4 h-4 text-white" />
                    </Button>
                </div>
            </div>
        </div>
    );
} 