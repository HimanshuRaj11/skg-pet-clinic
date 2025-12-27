"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    Dog,
    Pill,
    Calendar,
    Receipt,
    Settings,
    Activity,
    Bell,
    FileText,
    LogOut,
    Menu,
    Truck,
    ShoppingBag,
    Package,
    ClipboardList,
    ReceiptText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Create Invoice",
        icon: ReceiptText,
        href: "/Invoice/new",
        color: "text-green-700",
    },
    {
        label: "Pets",
        icon: Dog,
        href: "/pets",
        color: "text-pink-700",
    },
    {
        label: "Billing",
        icon: Receipt,
        href: "/billing",
        color: "text-green-700",
    },
    {
        label: "Appointments",
        icon: Calendar,
        href: "/appointments",
        color: "text-orange-700",
    },
    {
        label: "Inventory Items",
        icon: Pill,
        href: "/inventory/items",
        color: "text-emerald-500",
    },
    {
        label: "Vendors",
        icon: Truck,
        href: "/inventory/vendors",
        color: "text-emerald-600",
    },
    {
        label: "Purchases",
        icon: ShoppingBag,
        href: "/inventory/purchases",
        color: "text-emerald-700",
    },
    {
        label: "Sales",
        icon: Receipt,
        href: "/inventory/sales",
        color: "text-emerald-800",
    },
    {
        label: "Stock Levels",
        icon: Package,
        href: "/inventory/stocks",
        color: "text-teal-500",
    },
    {
        label: "Corrections",
        icon: ClipboardList,
        href: "/inventory/corrections",
        color: "text-teal-600",
    },
    {
        label: "Medical Records",
        icon: Activity,
        href: "/medical-records",
        color: "text-red-500",
    },

    {
        label: "Reminders",
        icon: Bell,
        href: "/reminders",
        color: "text-yellow-500",
    },
    {
        label: "Audit Log",
        icon: FileText,
        href: "/audit-log",
        color: "text-gray-500",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white ">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        {/* Logo placeholder */}
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold">S</div>
                    </div>
                    <h1 className="text-2xl font-bold">
                        SKG Clinic
                    </h1>
                </Link>
                <div className="space-y-1 overflow-y-auto h-[calc(100vh-8rem)] scrollbar scrollbar-thumb-blue-500 scrollbar-track-blue-200">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}

                    <div className="px-3 py-2">
                        <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/10">
                            <LogOut className="h-5 w-5 mr-3" />
                            Logout
                        </Button>
                    </div>

                </div>
            </div>

        </div>
    );
}

export function MobileSidebar() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-slate-900 text-white border-none w-72">
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}
