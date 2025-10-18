'use client'

import { Coffee, EllipsisVertical, LogOut } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SIDEBAR_MENU_LIST, SideBarMenuKey } from "@/constants/sidebar-constant";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AppSidebar() {
  const { isMobile } = useSidebar();

  const pathname = usePathname();

  const profile = {
    name: "Nurul Nur Afifah",
    role: "admin",
    avatar_url: '',
  }
  return (
    <Sidebar>
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
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src='' alt=''></AvatarImage>
                    <AvatarFallback className="rounded-lg">A</AvatarFallback>
                  </Avatar> 
                  <div className="leading-tight">
                    <h4 className="truncate font-medium">Nurul Nur Afifah</h4>
                    <p className="text-muted-foreground truncate text-xs">Admin</p>
                  </div>
                  <EllipsisVertical className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="min-w-56 rounded-lg" 
                side={isMobile ? 'bottom' : 'right'} 
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="padding-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src='' alt=''></AvatarImage>
                      <AvatarFallback className="rounded-lg">A</AvatarFallback>
                    </Avatar> 
                    <div className="leading-tight">
                      <h4 className="truncate font-medium">Nurul Nur Afifah</h4>
                      <p className="text-muted-foreground truncate text-xs">Admin</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <LogOut />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}