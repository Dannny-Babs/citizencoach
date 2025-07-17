import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-sidebar h-screen">
      <AppSidebar />
      <main className="flex-1 bg-white border border-gray-200 rounded-xl m-2 p-2 overflow-hidden font-sans ">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}