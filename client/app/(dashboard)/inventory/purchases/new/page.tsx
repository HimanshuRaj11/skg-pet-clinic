import { PurchaseForm } from "@/components/inventory/PurchaseForm";

export default function NewPurchasePage() {
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">New Purchase Entry</h1>
                <p className="text-muted-foreground">
                    Record a new purchase invoice and add items to stock.
                </p>
            </div>
            <div className="border rounded-lg p-6 bg-card">
                <PurchaseForm />
            </div>
        </div>
    );
}
