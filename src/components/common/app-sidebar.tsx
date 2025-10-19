'use client'

import { Coffee } from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
} from "../ui/sidebar";
import { SIDEBAR_MENU_LIST, SideBarMenuKey } from "@/constants/sidebar-constant";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";

export default function AppSidebar() {

  const pathname = usePathname();

  const profile = useAuthStore((state) => state.profile)

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="font-semibold">
                <div className="flex items-center gap-2 self-center font-medium text-2xl">
                  <Coffee className="size-5" />
                  Es Teh Ibukota
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {SIDEBAR_MENU_LIST[profile.role as SideBarMenuKey]?.map((v) => (
                <SidebarMenuItem key={v.title}>
                  <SidebarMenuButton asChild tooltip={v.title}>
                    <a href={v.url} className={cn('pc-4 py-3 h-auto', {
                      'bg-teal-500 text-white hover:bg-teal-500 hover:text-white': pathname == v.url
                    })}>
                      {v.icon && <v.icon />}
                      <span>{v.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  )
}