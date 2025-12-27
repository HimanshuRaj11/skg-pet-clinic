"use client"

import { useQuery } from "@tanstack/react-query"
import { fetcher } from "@/lib/api"
import { Pet, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function PetsPage() {
    const { data, isLoading, error } = useQuery<Pet[]>({
        queryKey: ["pets"],
        queryFn: () => fetcher("/api/demo/pets"),
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading pets</div>

    return (
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Pets</h2>
                    <p className="text-muted-foreground">
                        Manage your patients here.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Link href="/pets/new" className="cursor-pointer">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Pet
                        </Button>
                    </Link>
                </div>
            </div>
            <DataTable data={data || []} columns={columns} searchKey="name" />
        </div>
    )
}
