import { Album, LayoutDashboard, SquareMenu, User } from "lucide-react";

export const SIDEBAR_MENU_LIST = {
    admin: [
        {
            title: "Dashboard",
            url: '/admin',
            icon: LayoutDashboard,
        },
        {
            title: "Order",
            url: '/order',
            icon: Album,
        },
        {
            title: "Menu",
            url: '/menu',
            icon: SquareMenu,
        },
           {
            title: "User",
            url: '/admin/user',
            icon: User,
        },
    ],
    cashier:[],
    kitchen:[],
}

export type SideBarMenuKey = keyof typeof SIDEBAR_MENU_LIST