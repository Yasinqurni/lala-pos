import { Eye, Edit, Trash } from "lucide-react";
import { menuAction } from "@/components/common/dropdown-action";


export const DEFAULT_ACTION_DROPDOWN: menuAction[] = [
  { label: "View", value: "view", icon: Eye },
  { label: "Edit", value: "edit", icon: Edit },
  { label: "Delete", value: "delete", icon: Trash, variant: "destructive" },
];
