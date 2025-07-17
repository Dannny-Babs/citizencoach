"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ChevronDownIcon } from "lucide-react"
import Image from "next/image"
import { CredsContext, CredsProvider } from "@/context/credentials"
import { CredsModal } from "@/components/CredsModal"
import { ModelSwitcher } from "@/components/modelSwithcer"
import { useChat } from "@/hooks/useChat"
import { useContext } from "react"



export default function Layout({ children }: { children: React.ReactNode }) {

  const { creds } = useContext(CredsContext)
  const { provider, setProvider, model, setModel } = useChat()
  return (
    <SidebarProvider className="bg-sidebar">
      <AppSidebar />
      <main className="flex-1 flex flex-col bg-white border border-gray-200 rounded-xl m-2 overflow-hidden font-sans">
        {/* Header - Fixed height */}
        <div className="flex flex-row justify-between items-center p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex flex-row items-center space-x-2">
            <SidebarTrigger />
            <ModelSwitcher
              provider={provider}
              model={model}
              setProvider={setProvider}
              setModel={setModel}
            />
          </div>
          <CredsModal />
        </div>

        {/* Content - Flexible height */}
        <div className="flex-1 overflow-hidden">
          <CredsProvider>
            {children}
          </CredsProvider>
        </div>
      </main>
    </SidebarProvider>
  )
}