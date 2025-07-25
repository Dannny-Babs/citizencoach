"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { CredsProvider } from "@/context/credentials"
import { CredsModal } from "@/components/CredsModal"
import { ModelSwitcher } from "@/components/modelSwithcer"
import { useChat } from "@/hooks/useChat"
import { Toaster } from "sonner"
import { FlashcardProvider } from "@/context/FlashcardContext";
import { Analytics } from "@vercel/analytics/next"

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { provider, setProvider, model, setModel } = useChat()

  return (
    <SidebarProvider className="bg-ln-gray-25">
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
          {children}
        </div>
      </main>
      <Toaster />
      <Analytics />
    </SidebarProvider>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CredsProvider>
      <FlashcardProvider>
        <LayoutContent>{children}</LayoutContent>
      </FlashcardProvider>
    </CredsProvider>
  )
}