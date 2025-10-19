import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { EllipsisVertical, LucideIcon } from "lucide-react";

export interface menuAction {
  label: string;
  value: string;
  icon: LucideIcon;
  variant?: "default" | "destructive";
  action?: () => void;
  type?: "link" | "button";
}

interface DropdownActionProps {
  menu: menuAction[];
}

export default function DropdownAction({ menu }: DropdownActionProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-muted-foreground size-8">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {menu.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={item.action}
            className={item.variant === "destructive" ? "text-red-600" : ""}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
