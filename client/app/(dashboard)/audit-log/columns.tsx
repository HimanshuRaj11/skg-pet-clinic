"use client"

import { ColumnDef } from "@tanstack/react-table"

export type AuditLog = {
    id: string
    userId: string
    action: string
    entity: string
    entityId: string
    timestamp: string
}

export const columns: ColumnDef<AuditLog>[] = [
    {
        accessorKey: "action",
        header: "Action",
    },
    {
        accessorKey: "entity",
        header: "Entity",
    },
    {
        accessorKey: "userId",
        header: "User ID",
    },
    {
        accessorKey: "timestamp",
        header: "Timestamp",
    }
]
