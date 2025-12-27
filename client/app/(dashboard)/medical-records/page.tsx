"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, Search, Filter, FileText, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockMedicalRecords } from "@/lib/mock-medical-data";
import { pets, users } from "@/lib/demo-data";

export default function MedicalRecordsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState<string>("all");

    // Helper to get patient details
    const getPatient = (patientId: string) => {
        return pets.find((p) => p.id === patientId);
    };

    // Helper to get doctor details
    const getDoctor = (doctorId: string) => {
        return users.find((u) => u.id === doctorId);
    };

    // Filter records
    const filteredRecords = mockMedicalRecords.filter((record) => {
        const patient = getPatient(record.patientId);
        const doctor = getDoctor(record.doctorId);

        const matchesSearch =
            patient?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        if (typeFilter !== "all" && record.diagnosisType !== typeFilter) {
            return false;
        }

        return true;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Medical Records</h1>
                    <p className="text-muted-foreground">
                        View and manage patient medical history, diagnoses, and treatments.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/medical-records/new">
                        <Plus className="mr-2 h-4 w-4" /> New Record
                    </Link>
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by patient, doctor, or diagnosis..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <Select
                    value={typeFilter}
                    onValueChange={setTypeFilter}
                >
                    <SelectTrigger className="w-[180px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="Vaccination">Vaccination</SelectItem>
                        <SelectItem value="Surgery">Surgery</SelectItem>
                        <SelectItem value="Dermatology">Dermatology</SelectItem>
                        <SelectItem value="Dental">Dental</SelectItem>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Patient</TableHead>
                            <TableHead>Doctor</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Diagnosis</TableHead>
                            <TableHead>Follow Up</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredRecords.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No medical records found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredRecords.map((record) => {
                                const patient = getPatient(record.patientId);
                                const doctor = getDoctor(record.doctorId);
                                return (
                                    <TableRow key={record.id}>
                                        <TableCell>
                                            {format(new Date(record.date), "MMM d, yyyy")}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {patient?.name || "Unknown"}
                                            <div className="text-xs text-muted-foreground">
                                                {patient?.species} - {patient?.breed}
                                            </div>
                                        </TableCell>
                                        <TableCell>{doctor?.name || "Unknown"}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{record.diagnosisType}</Badge>
                                        </TableCell>
                                        <TableCell className="max-w-[200px] truncate" title={record.diagnosis}>
                                            {record.diagnosis}
                                        </TableCell>
                                        <TableCell>
                                            {record.followUpDate ? format(new Date(record.followUpDate), "MMM d, yyyy") : "-"}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/medical-records/${record.id}`}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
