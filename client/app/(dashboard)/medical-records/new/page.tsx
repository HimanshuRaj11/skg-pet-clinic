"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MedicalRecordForm } from "@/components/medical/MedicalRecordForm";

export default function NewMedicalRecordPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/medical-records">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">New Medical Record</h1>
                    <p className="text-muted-foreground">
                        Create a new medical record for a patient.
                    </p>
                </div>
            </div>

            <div className="rounded-md border p-6">
                <MedicalRecordForm />
            </div>
        </div>
    );
}
