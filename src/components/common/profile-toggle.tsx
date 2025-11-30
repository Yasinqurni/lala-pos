'use client'

import { LogOut } from "lucide-react";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuthStore } from "@/stores/auth-store";
import signOut from "@/actions/auth/auth-action";

export default function ProfileToggle() {
  const profile = useAuthStore((state) => state.profile);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted transition">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={profile.avatar_url} alt={profile.name} />
            <AvatarFallback className="rounded-lg">
              {profile.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block text-left leading-tight">
            <h4 className="truncate font-medium">{profile.name}</h4>
            <p className="text-muted-foreground text-xs capitalize">{profile.role}</p>
          </div>
        </button>
      </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={8} className="min-w-56 rounded-lg">
            <DropdownMenuGroup>
            <form action={signOut}>
                <button type="submit" className="w-full flex items-center gap-2 px-2 py-1 text-left hover:bg-muted rounded-md">
                <LogOut className="size-4" />
                Logout
                </button>
            </form>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
