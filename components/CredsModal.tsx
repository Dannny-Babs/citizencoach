"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useContext, useState } from 'react'
import { CredsContext } from '@/context/credentials'
import { toast } from 'sonner'

export function CredsModal() {

    const { creds, setCreds } = useContext(CredsContext)
    const [openaiKey, setOpenaiKey] = useState(creds.openaiKey || '')
    const [geminiKey, setGeminiKey] = useState(creds.geminiKey || '')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setCreds({ openaiKey, geminiKey })
        toast.success('API Keys saved successfully!')
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center justify-center rounded-[9px] transition duration-200 ease-out outline-none focus:outline-none disabled:pointer-events-none bg-ln-gray-0 text-ln-gray-900 shadow-ln-button-white hover:bg-ln-gray-50 hover:shadow-none disabled:opacity-50 ">Add your Keys</Button>

            </DialogTrigger>

            <DialogContent className="w-[90vw] max-w-[450px] font-sans border rounded-3xl">
                <DialogHeader className="flex flex-col items-center text-center gap-2">
                    {/* Security Icon */}
                    <div className="flex justify-center mb-2">
                        <div
                            className="relative flex w-[72px] h-[72px] shrink-0 items-center justify-center rounded-full"
                            style={{ background: 'linear-gradient(rgba(123, 123, 123, 0.1) 0%, rgba(123, 123, 123, 0) 100%)' }}
                        >
                            <div
                                className="relative z-10 flex w-12 h-12 items-center justify-center rounded-full bg-white"
                                style={{
                                    boxShadow: 'rgba(16, 16, 16, 0.06) 0px 4px 8px, rgba(16, 16, 16, 0.04) 0px 2px 4px, rgba(16, 16, 16, 0.04) 0px 1px 2px, rgba(16, 16, 16, 0.06) 0px 0px 0px 1px, rgba(61, 61, 61, 0.08) 0px -0.5px 0.5px inset'
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6 text-gray-500"
                                >
                                    <path
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        d="M12 2a5 5 0 0 0-5 5v2H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5m3 7V7a3 3 0 1 0-6 0v2zm-3 4a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <DialogTitle className="text-2xl font-bold text-gray-900">Enter your API Keys</DialogTitle>
                    <DialogDescription className="text-sm text-center">
                        Add your OpenAI and Google Gemini API keys, your keys are stored locally and never shared.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4">



                    <div className="grid gap-4 ">
                        <div className="grid gap-2">
                            <Label htmlFor="openai-key">OpenAI API Key</Label>
                            <Input
                                id="openai-key"
                                type="password"
                                value={openaiKey}
                                onChange={(e) => setOpenaiKey(e.target.value)}
                                placeholder="sk-..."
                                className="font-mono text-sm h-11"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="gemini-key">Google Gemini API Key</Label>
                            <Input
                                id="gemini-key"
                                type="password"
                                value={geminiKey}
                                onChange={(e) => setGeminiKey(e.target.value)}
                                placeholder="AIza..."
                                className="font-mono text-sm h-11"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <DialogClose asChild>
                            <Button variant="outline" type="button" className="group relative inline-flex items-center justify-center whitespace-nowrap transition duration-200 ease-out outline-none focus:outline-none disabled:pointer-events-none bg-ln-gray-0 text-ln-gray-900 shadow-ln-button-white hover:bg-ln-gray-50 hover:shadow-none disabled:opacity-50 h-11 gap-2.5 rounded-[11px] px-6 py-3 flex-1 sm:w-48 ">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" className="group relative 
                            inline-flex items-center justify-center 
                            whitespace-nowrap transition duration-200 ease-out 
                            outline-none focus:outline-none 
                            disabled:pointer-events-none bg-ln-gray-900 
                            text-ln-gray-0 shadow-ln-button-gray 
                            hover:bg-ln-gray-800 disabled:bg-ln-gray-25 
                            disabled:text-ln-gray-450 disabled:shadow-none h-11 
                            gap-2.5 rounded-[11px] px-3.5 py-3 flex-1 sm:w-48 
                            ">
                                Save Keys</Button>
                        </DialogClose>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
