"use client";

import { useState } from "react";
import { mockVendors } from "@/lib/mock-inventory-data";
import { Vendor } from "@/types/inventory";
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
import { Plus, Search, Filter, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function VendorListPage() {
    const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredVendors = vendors.filter(
        (vendor) =>
            vendor.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.phone.includes(searchQuery)
    );

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Vendor Details</h1>
                    <p className="text-muted-foreground">
                        Manage your suppliers and distributors.
                    </p>
                </div>
                <Link href="/inventory/vendors/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add New Vendor
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search vendors..."
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
                            <TableHead>Vendor Name</TableHead>
                            <TableHead>Contact Person</TableHead>
                            <TableHead>Contact Details</TableHead>
                            <TableHead>GST Number</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredVendors.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No vendors found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredVendors.map((vendor) => (
                                <TableRow key={vendor.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span>{vendor.vendorName}</span>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <MapPin className="h-3 w-3" /> {vendor.address}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{vendor.contactName}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-3 w-3 text-muted-foreground" />
                                                {vendor.phone}
                                            </div>
                                            {vendor.email && (
                                                <div className="flex items-center gap-2">
                                                    <Mail className="h-3 w-3 text-muted-foreground" />
                                                    {vendor.email}
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>{vendor.gstNumber || "-"}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={vendor.isActive ? "default" : "secondary"}
                                            className={
                                                vendor.isActive
                                                    ? "bg-green-500 hover:bg-green-600"
                                                    : "bg-gray-500"
                                            }
                                        >
                                            {vendor.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/inventory/vendors/${vendor.id}/edit`}>
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
