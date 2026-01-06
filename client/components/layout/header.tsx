"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MobileSidebar } from "@/components/layout/sidebar";
import { ModeToggle } from "@/components/theme-toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FetchUser } from "@/app/Redux/Slice/User.slice";
import { useDispatch, useSelector, } from "react-redux";

export function Header() {
    const { User } = useSelector((state: any) => state.User);
    console.log(User);

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchUser() as any)
    }, []);

    return (
        <div className="border-b p-4 flex items-center justify-between h-16 bg-background">
            <MobileSidebar />
            <div className="flex items-center gap-x-4 ml-auto">
                <ModeToggle />

                {User ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    {User?.image ? (
                                        <AvatarImage src={User?.image} alt={User.name} />
                                    ) : (
                                        <AvatarFallback>
                                            {User.name.split(" ").map((n: any) => n[0]).slice(0, 2).join("")}
                                        </AvatarFallback>
                                    )}
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{User.name}</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {User.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button onClick={() => router.push("/login")}>Login</Button>
                )}
            </div>
        </div>
    );
}
