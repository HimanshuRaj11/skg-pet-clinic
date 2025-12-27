"use client";

import { useState } from "react";
import { mockSales } from "@/lib/mock-inventory-data";
import { SaleInvoice } from "@/types/inventory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Search, Filter } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function SaleListPage() {
    const [sales, setSales] = useState<SaleInvoice[]>(mockSales);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredSales = sales.filter(
        (sale) =>
            sale.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (sale.patientId && sale.patientId.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Sale Invoices</h1>
                    <p className="text-muted-foreground">
                        View and manage patient bills and counter sales.
                    </p>
                </div>
                <Link href="/inventory/sales/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> New Sale
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by ID or Patient..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Invoice ID</TableHead>
                            <TableHead>Patient/Doctor</TableHead>
                            <TableHead className="text-center">Items</TableHead>
                            <TableHead className="text-right">Total Amount</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredSales.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No sales found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredSales.map((sale) => (
                                <TableRow key={sale.id}>
                                    <TableCell>
                                        {format(new Date(sale.saleDate), "dd MMM yyyy")}
                                    </TableCell>
                                    <TableCell className="font-medium">#{sale.id}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col text-sm">
                                            {sale.patientId && <span>Pt: {sale.patientId}</span>}
                                            {sale.doctorId && <span className="text-muted-foreground">Dr: {sale.doctorId}</span>}
                                            {!sale.patientId && !sale.doctorId && <span className="text-muted-foreground">Counter Sale</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {sale.items.length}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        ₹{sale.finalAmount.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                sale.paymentStatus === "Paid"
                                                    ? "default"
                                                    : "destructive"
                                            }
                                        >
                                            {sale.paymentStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
