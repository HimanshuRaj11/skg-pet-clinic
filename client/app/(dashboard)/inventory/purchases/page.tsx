"use client";

import { useState } from "react";
import { mockPurchases, mockVendors } from "@/lib/mock-inventory-data";
import { Purchase } from "@/types/inventory";
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

export default function PurchaseListPage() {
    const [purchases, setPurchases] = useState<Purchase[]>(mockPurchases);
    const [searchQuery, setSearchQuery] = useState("");

    const getVendorName = (vendorId: string) => {
        return mockVendors.find((v) => v.id === vendorId)?.vendorName || "Unknown";
    };

    const filteredPurchases = purchases.filter(
        (purchase) =>
            purchase.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            getVendorName(purchase.vendorId)
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Purchase Details</h1>
                    <p className="text-muted-foreground">
                        Track your inventory purchases and invoices.
                    </p>
                </div>
                <Link href="/inventory/purchases/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> New Purchase
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by invoice or vendor..."
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
                            <TableHead>Invoice No</TableHead>
                            <TableHead>Vendor</TableHead>
                            <TableHead className="text-center">Items</TableHead>
                            <TableHead className="text-right">Total Amount</TableHead>
                            <TableHead>Payment Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPurchases.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No purchases found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredPurchases.map((purchase) => (
                                <TableRow key={purchase.id}>
                                    <TableCell>
                                        {format(new Date(purchase.purchaseDate), "dd MMM yyyy")}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {purchase.invoiceNumber}
                                    </TableCell>
                                    <TableCell>{getVendorName(purchase.vendorId)}</TableCell>
                                    <TableCell className="text-center">
                                        {purchase.items.length}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        ₹{purchase.totalAmount.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                purchase.paymentStatus === "Paid"
                                                    ? "default"
                                                    : purchase.paymentStatus === "Unpaid"
                                                        ? "destructive"
                                                        : "secondary"
                                            }
                                        >
                                            {purchase.paymentStatus}
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
