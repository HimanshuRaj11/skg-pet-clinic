"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"

export type Reminder = {
    id: string
    petId: string
    ownerId: string
    type: string
    triggerDate: string
    channel: string
    status: string
}

export const columns: ColumnDef<Reminder>[] = [
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "triggerDate",
        header: "Date",
    },
    {
        accessorKey: "channel",
        header: "Channel",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <Badge variant={status === "Sent" ? "default" : "secondary"}>
                    {status}
                </Badge>
            )
        }
    }
]
