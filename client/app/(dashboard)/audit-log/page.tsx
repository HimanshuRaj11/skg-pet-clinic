"use client"

import { useQuery } from "@tanstack/react-query"
import { fetcher } from "@/lib/api"
import { AuditLog, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

export default function AuditLogPage() {
    const { data: logs } = useQuery<AuditLog[]>({
        queryKey: ["auditLogs"],
        queryFn: () => fetcher("/api/demo/auditLogs"),
    })

    return (
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Audit Log</h2>
                    <p className="text-muted-foreground">
                        System activity history.
                    </p>
                </div>
            </div>
            <DataTable data={logs || []} columns={columns} searchKey="action" />
        </div>
    )
}
