
import * as React from "react"
import { ChatRoundLine, Magnifer, Notes, Tuning2, Document, HeadphonesRound, DocumentAdd } from '@solar-icons/react/ssr'
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
import Image from "next/image";
import Link from "next/link";

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
          icon: () => <ChatRoundLine size={32} color='#1e1e1e' />,
          isActive: true
        },
        {
          title: "Review",
          url: "/chat/review",
          icon: () => <Notes size={32} color='#1e1e1e' />,
        },
        {
          title: "Create Flashcards",
          url: "/chat/flashcards",
          icon: () => <DocumentAdd size={32} color='#1e1e1e' />,
        },
        {
          title: "Settings",
          url: "#",
          icon: () => <Tuning2 size={32} color='#1e1e1e' />,
        },
        { 
          title: "Help",
          url: "#",
          icon: () => <HeadphonesRound size={32} color='#1e1e1e' />,
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
          icon: () => <Document size={32} color='#1e1e1e' />,
          isActive: false
        },
        {
          title: "Geography",
          url: "#",
          icon: () => <Document size={32} color='#1e1e1e' />,
        },
        {
          title: "Rights",
          url: "#",
          icon: () => <Document size={32} color='#1e1e1e' />,
        },
        {
          title: "Civics",
          url: "#",
          icon: () => <Document size={32} color='#1e1e1e' />,
        }


      ]
    }
  ]
}

export function AppSidebar() {
  return (
    <Sidebar className="border-none font-sans bg-ln-gray-25">
      <SidebarHeader>
        <div className="flex items-center justify-between py-2 px-3 bg-ln-gray-0 border rounded-xl border-gray-200">
          <div className="flex items-center space-x-2">

            <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Maple_Leaf.svg/1200px-Maple_Leaf.svg.png?20190127193104" alt="CitizenCoach" width={24} height={24} />


            <h1 className="text-lg font-bold text-red-600">CitizenCoach</h1>

          </div>
          <Magnifer size={16} color='#1e1e1e' />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title} >
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
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