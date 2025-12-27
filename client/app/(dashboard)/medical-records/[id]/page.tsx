"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MedicalRecordForm } from "@/components/medical/MedicalRecordForm";
import { mockMedicalRecords } from "@/lib/mock-medical-data";

interface MedicalRecordDetailPageProps {
    params: {
        id: string;
    };
}

export default function MedicalRecordDetailPage({ params }: MedicalRecordDetailPageProps) {
    const record = mockMedicalRecords.find((r) => r.id === params.id);

    if (!record) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/medical-records">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Medical Record Details</h1>
                    <p className="text-muted-foreground">
                        View and edit medical record #{record.id}
                    </p>
                </div>
            </div>

            <div className="rounded-md border p-6">
                <MedicalRecordForm initialData={record} />
            </div>
        </div>
    );
}
