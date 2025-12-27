import { SaleForm } from "@/components/inventory/SaleForm";

export default function NewSalePage() {
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">New Sale Invoice</h1>
                <p className="text-muted-foreground">
                    Create a new bill for patient or counter sale.
                </p>
            </div>
            <div className="border rounded-lg p-6 bg-card">
                <SaleForm />
            </div>
        </div>
    );
}
