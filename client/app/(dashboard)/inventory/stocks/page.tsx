"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Search, Filter, AlertTriangle } from "lucide-react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockStocks, mockInventoryItems } from "@/lib/mock-inventory-data";
import { Stock, InventoryItem } from "@/types/inventory";

export default function StockListPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [stockFilter, setStockFilter] = useState<"all" | "low" | "expired">("all");

    // Helper to get item details
    const getItem = (itemId: string): InventoryItem | undefined => {
        return mockInventoryItems.find((item) => item.id === itemId);
    };

    // Filter stocks
    const filteredStocks = mockStocks.filter((stock) => {
        const item = getItem(stock.itemId);
        const matchesSearch =
            item?.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stock.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        if (stockFilter === "low") {
            return item && stock.quantityAvailable <= item.minStockAlert;
        }
        if (stockFilter === "expired") {
            return new Date(stock.expiryDate) < new Date();
        }

        return true;
    });

    const getStockStatus = (stock: Stock, item?: InventoryItem) => {
        if (new Date(stock.expiryDate) < new Date()) {
            return <Badge variant="destructive">Expired</Badge>;
        }
        if (item && stock.quantityAvailable <= item.minStockAlert) {
            return <Badge variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-white">Low Stock</Badge>;
        }
        if (stock.quantityAvailable === 0) {
            return <Badge variant="secondary">Out of Stock</Badge>;
        }
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">In Stock</Badge>;
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Stock Overview</h1>
                    <p className="text-muted-foreground">
                        Monitor stock levels, batch details, and expiry dates.
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by item name or batch number..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <Select
                    value={stockFilter}
                    onValueChange={(value: any) => setStockFilter(value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter Stock" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Stock</SelectItem>
                        <SelectItem value="low">Low Stock</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Item Name</TableHead>
                            <TableHead>Batch No.</TableHead>
                            <TableHead>Expiry Date</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Last Updated</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredStocks.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No stock records found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredStocks.map((stock) => {
                                const item = getItem(stock.itemId);
                                return (
                                    <TableRow key={stock.id}>
                                        <TableCell className="font-medium">
                                            {item?.itemName || "Unknown Item"}
                                            <div className="text-xs text-muted-foreground">
                                                {item?.itemCode}
                                            </div>
                                        </TableCell>
                                        <TableCell>{stock.batchNumber}</TableCell>
                                        <TableCell>
                                            {format(new Date(stock.expiryDate), "MMM d, yyyy")}
                                        </TableCell>
                                        <TableCell>
                                            <span className={item && stock.quantityAvailable <= item.minStockAlert ? "text-red-600 font-bold" : ""}>
                                                {stock.quantityAvailable}
                                            </span>
                                        </TableCell>
                                        <TableCell>{item?.unit}</TableCell>
                                        <TableCell>{getStockStatus(stock, item)}</TableCell>
                                        <TableCell className="text-right text-muted-foreground">
                                            {format(new Date(stock.updatedAt), "MMM d, yyyy")}
                                        </TableCell>
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
