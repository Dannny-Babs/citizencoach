// context/CredsContext.tsx
"use client"
import React, { createContext, useState, useEffect } from 'react'

type Creds = {
  openaiKey?: string
  geminiKey?: string
}

export const CredsContext = createContext<{
  creds: Creds
  setCreds: (c: Creds) => void
}>({ creds: {}, setCreds: () => { } })

export const CredsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [creds, setCredsState] = useState<Creds>({})

  useEffect(() => {
    const saved = localStorage.getItem('llmCreds')
    if (saved) setCredsState(JSON.parse(saved))
  }, [])

  const setCreds = (c: Creds) => {
    setCredsState(c)
    localStorage.setItem('llmCreds', JSON.stringify(c))
  }

  return (
    <CredsContext.Provider value={{ creds, setCreds }}>
      {children}
    </CredsContext.Provider>
  )
}
