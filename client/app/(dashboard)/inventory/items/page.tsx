"use client";

import { useState } from "react";
import { mockInventoryItems } from "@/lib/mock-inventory-data";
import { InventoryItem } from "@/types/inventory";
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

export default function ItemListPage() {
    const [items, setItems] = useState<InventoryItem[]>(mockInventoryItems);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredItems = items.filter(
        (item) =>
            item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Item Details</h1>
                    <p className="text-muted-foreground">
                        Manage your medicine and equipment inventory master data.
                    </p>
                </div>
                <Link href="/inventory/items/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add New Item
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search items by name, code or category..."
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
                            <TableHead>Item Code</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead className="text-right">Purchase Price</TableHead>
                            <TableHead className="text-right">Sale Price</TableHead>
                            <TableHead className="text-center">Min Stock</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredItems.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="h-24 text-center">
                                    No items found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.itemCode}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{item.itemName}</span>
                                            <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                {item.description}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{item.category}</Badge>
                                    </TableCell>
                                    <TableCell>{item.unit}</TableCell>
                                    <TableCell className="text-right">
                                        ₹{item.purchasePrice.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        ₹{item.salePrice.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {item.minStockAlert}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/inventory/items/${item.id}/edit`}>
                                                Edit
                                            </Link>
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
