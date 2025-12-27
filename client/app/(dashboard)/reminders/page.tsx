"use client"

import { useQuery } from "@tanstack/react-query"
import { fetcher } from "@/lib/api"
import { Reminder, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

export default function RemindersPage() {
    const { data: reminders } = useQuery<Reminder[]>({
        queryKey: ["reminders"],
        queryFn: () => fetcher("/api/demo/reminders"),
    })

    return (
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Reminders</h2>
                    <p className="text-muted-foreground">
                        Automated patient reminders.
                    </p>
                </div>
            </div>
            <DataTable data={reminders || []} columns={columns} searchKey="type" />
        </div>
    )
}
