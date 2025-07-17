import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon, PlusIcon } from "lucide-react"
import Image from "next/image"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-sidebar">
      <AppSidebar />
      <main className="flex-1 flex flex-col bg-white border border-gray-200 rounded-xl m-2 overflow-hidden font-sans">
        {/* Header - Fixed height */}
        <div className="flex flex-row justify-between items-center p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex flex-row items-center space-x-2">
            <SidebarTrigger />
            <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Maple_Leaf.svg/1200px-Maple_Leaf.svg.png?20190127193104" alt="CitizenCoach" width={24} height={24} />
            <p className="text-sm text-gray-500">ChatGPT 4o Mini</p>
            <ChevronDownIcon className="w-4 h-4" />
          </div>
          <Button variant="outline" size="sm">
            <PlusIcon className="w-4 h-4" />
            Switch Models
          </Button>
        </div>

        {/* Content - Flexible height */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}