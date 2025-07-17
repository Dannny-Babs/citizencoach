import { Inbox, MessageCircle, Settings } from "lucide-react"
import * as React from "react"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const data = {
  navMain: [
    {
      title: "Main",
      url: "#",
      items: [
        {
          title: "Chat",
          url: "/chat",
          icon: MessageCircle,
          isActive: true
        },
        {
          title: "Review",
          url: "/review",
          icon: Inbox,
        },

        {
          title: "Settings",
          url: "#",
          icon: Settings,
        },
      ],
    },
    {
      title: "Modules",
      url: "#",
      items: [
        {
          title: "History",
          url: "#",
          icon: Inbox,
          isActive: false
        },
        {
          title: "Geography",
          url: "#",
          icon: Inbox,
        },
        {
          title: "Rights",
          url: "#",
          icon: Inbox,
        },


      ]
    }
  ]
}

export function AppSidebar() {
  return (
    <Sidebar className="border-none font-sans bg-ln-gray-900">
      <SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}