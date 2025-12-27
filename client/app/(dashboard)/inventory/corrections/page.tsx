"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { mockCorrections, mockInventoryItems } from "@/lib/mock-inventory-data";
import { InventoryItem } from "@/types/inventory";

export default function CorrectionListPage() {
    const [searchTerm, setSearchTerm] = useState("");

    // Helper to get item details
    const getItem = (itemId: string): InventoryItem | undefined => {
        return mockInventoryItems.find((item) => item.id === itemId);
    };

    // Filter corrections
    const filteredCorrections = mockCorrections.filter((correction) => {
        const item = getItem(correction.itemId);
        const matchesSearch =
            item?.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            correction.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            correction.reason.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Inventory Corrections</h1>
                    <p className="text-muted-foreground">
                        View and log manual stock adjustments.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/inventory/corrections/new">
                        <Plus className="mr-2 h-4 w-4" /> Log Correction
                    </Link>
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by item, batch, or reason..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Item Name</TableHead>
                            <TableHead>Batch No.</TableHead>
                            <TableHead>Prev. Qty</TableHead>
                            <TableHead>New Qty</TableHead>
                            <TableHead>Difference</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead>Corrected By</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCorrections.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="h-24 text-center">
                                    No corrections found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredCorrections.map((correction) => {
                                const item = getItem(correction.itemId);
                                return (
                                    <TableRow key={correction.id}>
                                        <TableCell>
                                            {format(new Date(correction.correctionDate), "MMM d, yyyy")}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {item?.itemName || "Unknown Item"}
                                        </TableCell>
                                        <TableCell>{correction.batchNumber}</TableCell>
                                        <TableCell>{correction.previousQuantity}</TableCell>
                                        <TableCell>{correction.newQuantity}</TableCell>
                                        <TableCell className={correction.difference < 0 ? "text-red-600" : "text-green-600"}>
                                            {correction.difference > 0 ? `+${correction.difference}` : correction.difference}
                                        </TableCell>
                                        <TableCell className="max-w-[200px] truncate" title={correction.reason}>
                                            {correction.reason}
                                        </TableCell>
                                        <TableCell>{correction.correctedBy}</TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
