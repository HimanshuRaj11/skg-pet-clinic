"use client"

import { useQuery } from "@tanstack/react-query"
import { fetcher } from "@/lib/api"
import { Invoice, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function BillingPage() {
    const { data: invoices } = useQuery<Invoice[]>({
        queryKey: ["invoices"],
        queryFn: () => fetcher("/api/demo/invoices"),
    })

    return (
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Billing & Invoices</h2>
                    <p className="text-muted-foreground">
                        Manage invoices and payments.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create Invoice
                    </Button>
                </div>
            </div>
            <DataTable data={invoices || []} columns={columns} searchKey="invoiceNo" />
        </div>
    )
}
