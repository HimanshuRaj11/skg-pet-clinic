import { ItemForm } from "@/components/inventory/ItemForm";

export default function NewItemPage() {
    const initialData = {
        itemName: "",
        itemCode: "",
        category: "Tablet",
        description: "",
        unit: "Strip",
        purchasePrice: 0,
        salePrice: 0,
        taxPercentage: 0,
        minStockAlert: 10,
    };
    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Add New Item</h1>
                <p className="text-muted-foreground">
                    Create a new medicine or equipment entry in the master inventory.
                </p>
            </div>
            <div className="border rounded-lg p-6 bg-card">
                <ItemForm initialData={initialData} />
            </div>
        </div>
    );
}
