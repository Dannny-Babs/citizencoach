// components/ModelSwitcher.tsx
import React from 'react'
import type { Provider } from '@/utils/llmClient'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Check } from 'lucide-react'

type Props = {
    provider: Provider
    model: string
    setProvider: (p: Provider) => void
    setModel: (m: string) => void
}

// OpenAI Icon Component
const OpenAIIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mr-2" >
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" fill="currentColor" />
    </svg>
)

// Gemini Icon Component  
const GeminiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" className="mr-2">
        <path d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z" fill="url(#prefix__paint0_radial_980_20147)" />
        <defs>
            <radialGradient id="prefix__paint0_radial_980_20147" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)">
                <stop offset=".067" stop-color="#9168C0" />
                <stop offset=".343" stop-color="#5684D1" />
                <stop offset=".672" stop-color="#1BA1E3" />
            </radialGradient>
        </defs>
    </svg>
)

const models = {
    openai: [
        { id: 'gpt-4o-mini', name: 'GPT-4o Mini' },
        { id: 'o4-mini', name: 'O4 Mini' },
        { id: 'o3', name: 'O3' },

    ],
    gemini: [
        { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro' },
        { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
        { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash' },
    ]
}

export const ModelSwitcher: React.FC<Props> = ({
    provider,
    model,
    setProvider,
    setModel,
}) => {
    const handleModelSelect = (selectedModel: string, selectedProvider: Provider) => {
        setProvider(selectedProvider)
        setModel(selectedModel)
    }

    const getCurrentModelName = () => {
        const allModels = [...models.openai, ...models.gemini]
        const currentModel = allModels.find(m => m.id === model)
        return currentModel?.name || model
    }

    const getCurrentProviderIcon = () => {
        return provider === 'openai' ? <OpenAIIcon /> : <GeminiIcon />
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-fit justify-between">
                    <div className="flex items-center">
                        {getCurrentProviderIcon()}
                        <span>{getCurrentModelName()}</span>
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                {/* OpenAI Models */}
                {models.openai.map((modelOption) => (
                    <DropdownMenuItem
                        key={modelOption.id}
                        onClick={() => handleModelSelect(modelOption.id, 'openai')}
                        className="flex items-center justify-between"
                    >
                        <div className="flex items-center">
                            <OpenAIIcon />
                            <span>{modelOption.name}</span>
                        </div>
                        {provider === 'openai' && model === modelOption.id && (
                            <Check className="h-4 w-4" />
                        )}
                    </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                {/* Gemini Models */}
                {models.gemini.map((modelOption) => (
                    <DropdownMenuItem
                        key={modelOption.id}
                        onClick={() => handleModelSelect(modelOption.id, 'gemini')}
                        className="flex items-center justify-between"
                    >
                        <div className="flex items-center">
                            <GeminiIcon />
                            <span>{modelOption.name}</span>
                        </div>
                        {provider === 'gemini' && model === modelOption.id && (
                            <Check className="h-4 w-4" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
