"use client";

import { ItemForm } from "@/components/inventory/ItemForm";
import { mockInventoryItems } from "@/lib/mock-inventory-data";
import { useParams } from "next/navigation";

export default function EditItemPage() {
    const params = useParams();
    const id = params.id as string;
    const item = mockInventoryItems.find((i) => i.id === id);

    if (!item) {
        return <div className="p-6">Item not found</div>;
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Edit Item</h1>
                <p className="text-muted-foreground">
                    Update details for {item.itemName} ({item.itemCode})
                </p>
            </div>
            <div className="border rounded-lg p-6 bg-card">
                <ItemForm initialData={item} />
            </div>
        </div>
    );
}
