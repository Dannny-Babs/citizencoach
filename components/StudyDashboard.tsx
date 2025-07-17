"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ViewMode = 'topics' | 'flashcards' | 'progress';


export function StudyDashboard() {
    const [viewMode] = useState<ViewMode>('topics');

    const topics = [
        { name: 'Canadian History', progress: 85, questions: 45, color: 'bg-red-100 text-red-700' },
        { name: 'Government & Law', progress: 60, questions: 38, color: 'bg-blue-100 text-blue-700' },
        { name: 'Geography', progress: 92, questions: 25, color: 'bg-green-100 text-green-700' },
        { name: 'Rights & Responsibilities', progress: 45, questions: 32, color: 'bg-purple-100 text-purple-700' },
        { name: 'Canadian Symbols', progress: 78, questions: 18, color: 'bg-amber-100 text-amber-700' }
    ];

    const flashcards = [
        { question: "What year did Canada become a country?", answer: "1867", difficulty: "easy" },
        { question: "Who was the first Prime Minister of Canada?", answer: "John A. Macdonald", difficulty: "medium" },
        { question: "What are the three levels of government in Canada?", answer: "Federal, Provincial/Territorial, Municipal", difficulty: "hard" }
    ];

    return (
        <div className="flex flex-col h-full ">
            {/* Header */}
            <div className="p-6">
                <div className="flex flex-col  justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Study    </h2>
                    
                </div>

                <Tabs defaultValue="topics" className="w-full">
                    <TabsList className="w-full text-gray-700">
                        <TabsTrigger value="topics" className="text-sm text-gray-700 ">Topics</TabsTrigger>
                        <TabsTrigger value="flashcards" className="text-sm text-gray-700 ">Cards</TabsTrigger>
                        <TabsTrigger value="progress" className="text-sm text-gray-700 ">Progress</TabsTrigger>
                    </TabsList>
                    <TabsContent value="topics"> {viewMode === 'topics' && (
                        <div className="space-y-4">
                            <div className="text-sm text-gray-600 mb-4">
                                Click any topic to start a focused study session
                            </div>

                            {topics.map((topic, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-medium text-gray-900">{topic.name}</h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${topic.color}`}>
                                            {topic.questions} questions
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Progress</span>
                                        <span className="font-medium text-gray-900">{topic.progress}%</span>
                                    </div>

                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${topic.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}</TabsContent>
                    <TabsContent value="flashcards"> {viewMode === 'flashcards' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-sm text-gray-600">3 cards due for review</div>
                                <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700">
                                    Start Review
                                </button>
                            </div>

                            {flashcards.map((card, index) => (
                                <div key={index} className="bg-white rounded-xl p-4 border border-slate-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${card.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                                            card.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                            {card.difficulty}
                                        </span>
                                        <button className="text-gray-400 hover:text-gray-600">⋯</button>
                                    </div>

                                    <div className="text-sm text-gray-900 mb-2 font-medium">
                                        {card.question}
                                    </div>

                                    <div className="text-xs text-gray-500 bg-gray-50 rounded p-2">
                                        Answer: {card.answer}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}</TabsContent>
                    <TabsContent value="progress"> {viewMode === 'progress' && (
                        <div className="space-y-6">
                            {/* Overall Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
                                    <div className="text-2xl font-bold text-blue-600">73%</div>
                                    <div className="text-sm text-gray-600">Overall Progress</div>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
                                    <div className="text-2xl font-bold text-green-600">158</div>
                                    <div className="text-sm text-gray-600">Questions Answered</div>
                                </div>
                            </div>

                            {/* Study Streak */}
                            <div className="bg-white rounded-xl p-4 border border-slate-200">
                                <h3 className="font-medium text-gray-900 mb-3">Study Streak</h3>
                                <div className="flex items-center justify-between">
                                    <div className="text-3xl">🔥</div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-orange-600">7 days</div>
                                        <div className="text-xs text-gray-600">Keep it up!</div>
                                    </div>
                                </div>
                            </div>

                            {/* Weak Areas */}
                            <div className="bg-white rounded-xl p-4 border border-slate-200">
                                <h3 className="font-medium text-gray-900 mb-3">Areas to Focus</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-700">Rights & Responsibilities</span>
                                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">45%</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-700">Government & Law</span>
                                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">60%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}</TabsContent>
                </Tabs>

            </div>

        </div>
    );
} 