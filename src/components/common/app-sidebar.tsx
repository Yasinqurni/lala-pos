'use client'

import { Coffee, EllipsisVertical, LogOut } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SIDEBAR_MENU_LIST, SideBarMenuKey } from "@/constants/sidebar-constant";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import signOut from "@/actions/auth-action";
import { useAuthStore } from "@/stores/auth-store";

export default function AppSidebar() {
  const { isMobile } = useSidebar();

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
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={profile.avatar_url} alt={profile.name}></AvatarImage>
                      <AvatarFallback className="rounded-lg">
                        {profile.name?.charAt(0)}
                      </AvatarFallback>
                  </Avatar> 
                  <div className="leading-tight">
                    <h4 className="truncate font-medium">{profile.name}</h4>
                    <p className="text-muted-foreground truncate text-xs capitalize">{profile.role}</p>
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
                      <AvatarImage src={profile.avatar_url} alt={profile.name}></AvatarImage>
                      <AvatarFallback className="rounded-lg">
                        {profile.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar> 
                    <div className="leading-tight">
                      <h4 className="truncate font-medium">{profile.name}</h4>
                      <p className="text-muted-foreground truncate text-xs capitalize">{profile.role}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                 <form action={signOut}>
                    <button type="submit" className="w-full flex items-center gap-2 px-2 py-1">
                      <LogOut className="size-4" />
                      Logout
                    </button>
                  </form>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}