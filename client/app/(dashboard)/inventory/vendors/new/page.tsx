import { VendorForm } from "@/components/inventory/VendorForm";

export default function NewVendorPage() {
    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Add New Vendor</h1>
                <p className="text-muted-foreground">
                    Register a new supplier or distributor in the system.
                </p>
            </div>
            <div className="border rounded-lg p-6 bg-card">
                <VendorForm />
            </div>
        </div>
    );
}
