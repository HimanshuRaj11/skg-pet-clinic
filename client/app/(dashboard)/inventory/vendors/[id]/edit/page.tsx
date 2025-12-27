"use client";

import { VendorForm } from "@/components/inventory/VendorForm";
import { mockVendors } from "@/lib/mock-inventory-data";
import { useParams } from "next/navigation";

export default function EditVendorPage() {
    const params = useParams();
    const id = params.id as string;
    const vendor = mockVendors.find((v) => v.id === id);

    if (!vendor) {
        return <div className="p-6">Vendor not found</div>;
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Edit Vendor</h1>
                <p className="text-muted-foreground">
                    Update details for {vendor.vendorName}
                </p>
            </div>
            <div className="border rounded-lg p-6 bg-card">
                <VendorForm initialData={vendor} />
            </div>
        </div>
    );
}
