"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CorrectionForm } from "@/components/inventory/CorrectionForm";

export default function NewCorrectionPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/inventory/corrections">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Log Inventory Correction</h1>
                    <p className="text-muted-foreground">
                        Record a manual adjustment to stock levels.
                    </p>
                </div>
            </div>

            <div className="rounded-md border p-6">
                <CorrectionForm />
            </div>
        </div>
    );
}
