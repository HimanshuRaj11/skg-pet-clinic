"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export type InventoryItem = {
    id: string
    name: string
    manufacturer: string
    batchNo: string
    expiryDate: string
    quantity: number
    minStock: number
}

export const columns: ColumnDef<InventoryItem>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "manufacturer",
        header: "Manufacturer",
    },
    {
        accessorKey: "batchNo",
        header: "Batch No",
    },
    {
        accessorKey: "expiryDate",
        header: "Expiry Date",
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
        cell: ({ row }) => {
            const quantity = row.getValue("quantity") as number
            const minStock = row.original.minStock

            return (
                <div className="flex items-center gap-2">
                    {quantity <= minStock && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    <span className={quantity <= minStock ? "text-red-500 font-bold" : ""}>{quantity}</span>
                </div>
            )
        }
    },
    {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
            const quantity = row.getValue("quantity") as number
            const minStock = row.original.minStock

            if (quantity === 0) return <Badge variant="destructive">Out of Stock</Badge>
            if (quantity <= minStock) return <Badge variant="destructive">Low Stock</Badge>
            return <Badge variant="outline">In Stock</Badge>
        }
    }
]
