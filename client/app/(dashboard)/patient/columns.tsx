"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import moment from "moment"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PetFormData } from "@/components/forms/PetClinicForm"


export const columns: ColumnDef<PetFormData>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    patients Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        {/* <AvatarImage src={row.original.photoUrl} /> */}
                        <AvatarFallback>{row.original.pet_name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{row.original.pet_name}</span>
                </div>
            )
        }
    },

    {
        accessorKey: "owner_name",
        header: "Owner Name",
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <span>Registration date</span>
            )
        },
        cell: ({ row }) => {
            const date = moment.utc(row.original.created_at!).local();
            const formatted = date.format('DD-MMM-YYYY').toLowerCase();
            return <span>{formatted}</span>
        }
    },
    {
        accessorKey: "gender",
        header: "Gender",
    },
    {
        accessorKey: "species",
        header: "Species",
    },
    {
        accessorKey: "breed",
        header: "Breed",
    },
    {
        accessorKey: "owner_phone",
        header: "Mobile",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const pet = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(pet.id!)}
                        >
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Link href={`/pets/${pet.id}`}>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                        </Link>
                        <Link href={`/pets/${pet.id}/edit`}>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
