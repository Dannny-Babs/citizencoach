"use client";

import { CopyIcon, SaveIcon } from 'lucide-react';
import { Message } from './ChatWindow';
import { Button } from './ui/button';

interface MessageBubbleProps {
    message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === 'user';

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-3 max-w-[75%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Assistant avatar - only for non-user messages */}
                {!isUser && (
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 text-sm">🍁</span>
                    </div>
                )}

                <div className="flex flex-col">
                    {/* Message bubble */}
                    <div
                        className={`rounded-lg px-4 py-3 ${isUser
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-900'
                            }`}
                    >
                        <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                            {message.content}
                        </div>
                    </div>

                    {/* Save as flashcard button - only for assistant messages */}
                    {!isUser && (
                        <div className="flex flex-row items-center ">
                            <Button onClick={() => {
                                // TODO: Implement save to flashcard
                                console.log('Save as flashcard:', message.content);
                            }
                            } variant="outline" size="sm" className="mt-2 shadow-none border-none">
                                <CopyIcon className="w-4 h-4" />
                            </Button>



                            <Button onClick={() => {
                                // TODO: Implement save to flashcard
                                console.log('Save as flashcard:', message.content);
                            }
                            } variant="outline" size="sm" className="mt-2 shadow-none border-none">
                                <SaveIcon className="w-4 h-4" />

                            </Button>


                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 