"use client"

import { useQuery } from "@tanstack/react-query"
import { fetcher } from "@/lib/api"
import { InventoryItem, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InventoryPage() {
    const { data: medicines } = useQuery<InventoryItem[]>({
        queryKey: ["medicines"],
        queryFn: () => fetcher("/api/demo/medicines"),
    })

    const { data: vaccines } = useQuery<InventoryItem[]>({
        queryKey: ["vaccines"],
        queryFn: () => fetcher("/api/demo/vaccines"),
    })

    return (
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Inventory</h2>
                    <p className="text-muted-foreground">
                        Manage medicines and vaccines.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Item
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="medicines" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="medicines">Medicines</TabsTrigger>
                    <TabsTrigger value="vaccines">Vaccines</TabsTrigger>
                </TabsList>
                <TabsContent value="medicines" className="space-y-4">
                    <DataTable data={medicines || []} columns={columns} searchKey="name" />
                </TabsContent>
                <TabsContent value="vaccines" className="space-y-4">
                    <DataTable data={vaccines || []} columns={columns} searchKey="name" />
                </TabsContent>
            </Tabs>
        </div>
    )
}
