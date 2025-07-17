"use client";

import { Message } from './ChatWindow';

interface MessageBubbleProps {
    message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === 'user';

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className="flex items-start space-x-2 max-w-lg">
                {!isUser && (
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 text-sm">🍁</span>
                    </div>
                )}

                <div
                    className={`rounded-lg px-4 py-2 ${isUser
                        ? 'bg-slate-900 text-white ml-8'
                        : 'bg-gray-100 text-gray-900'
                        }`}
                >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                    </div>

                    {/* Save as flashcard button for AI responses */}
                    {!isUser && (
                        <button
                            className="mt-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                            onClick={() => {
                                // TODO: Implement save to flashcard
                                console.log('Save as flashcard:', message.content);
                            }}
                        >
                            💾 Save as flashcard
                        </button>
                    )}
                </div>

                
            </div>
        </div>
    );
} 