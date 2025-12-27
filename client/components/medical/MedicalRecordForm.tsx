"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown, Plus, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { pets, users } from "@/lib/demo-data";
import { MedicalRecord } from "@/types/medical-record";

const medicalRecordSchema = z.object({
    patientId: z.string().min(1, "Patient is required"),
    doctorId: z.string().min(1, "Doctor is required"),
    date: z.date({ error: "Date is required" }),
    diagnosisType: z.enum(['General', 'Surgery', 'Vaccination', 'Emergency', 'Dental', 'Dermatology']),
    chiefComplaint: z.string().min(1, "Chief complaint is required"),
    diagnosis: z.string().min(1, "Diagnosis is required"),
    treatment: z.string().min(1, "Treatment details are required"),
    followUpDate: z.date().optional(),
    notes: z.string().optional(),
    prescription: z.array(z.object({
        medicineName: z.string().min(1, "Medicine name is required"),
        dosage: z.string().min(1, "Dosage is required"),
        frequency: z.string().min(1, "Frequency is required"),
        duration: z.string().min(1, "Duration is required"),
        notes: z.string().optional(),
    })).optional(),
});

type MedicalRecordFormValues = z.infer<typeof medicalRecordSchema>;

interface MedicalRecordFormProps {
    initialData?: MedicalRecord;
}

export function MedicalRecordForm({ initialData }: MedicalRecordFormProps) {
    const form = useForm<MedicalRecordFormValues>({
        resolver: zodResolver(medicalRecordSchema),
        defaultValues: initialData
            ? {
                ...initialData,
                prescription: initialData.prescription?.map(p => ({
                    medicineName: p.medicineName,
                    dosage: p.dosage,
                    frequency: p.frequency,
                    duration: p.duration,
                    notes: p.notes
                }))
            }
            : {
                date: new Date(),
                diagnosisType: "General",
                prescription: [],
            },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "prescription",
    });

    function onSubmit(data: MedicalRecordFormValues) {
        console.log("Medical Record Data:", data);
        alert("Medical Record Saved (Mock)");
        // API call would go here
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Patient Selection */}
                    <FormField
                        control={form.control}
                        name="patientId"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Patient</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-full justify-between",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value
                                                    ? pets.find((pet) => pet.id === field.value)?.name
                                                    : "Select patient"}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[400px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search patient..." />
                                            <CommandEmpty>No patient found.</CommandEmpty>
                                            <CommandGroup>
                                                {pets.map((pet) => (
                                                    <CommandItem
                                                        value={pet.name}
                                                        key={pet.id}
                                                        onSelect={() => {
                                                            form.setValue("patientId", pet.id);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                pet.id === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {pet.name} ({pet.species})
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Doctor Selection */}
                    <FormField
                        control={form.control}
                        name="doctorId"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Doctor</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select doctor" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {users.filter(u => u.role === 'vet').map((user) => (
                                            <SelectItem key={user.id} value={user.id}>
                                                {user.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Date */}
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Diagnosis Type */}
                    <FormField
                        control={form.control}
                        name="diagnosisType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="General">General</SelectItem>
                                        <SelectItem value="Surgery">Surgery</SelectItem>
                                        <SelectItem value="Vaccination">Vaccination</SelectItem>
                                        <SelectItem value="Emergency">Emergency</SelectItem>
                                        <SelectItem value="Dental">Dental</SelectItem>
                                        <SelectItem value="Dermatology">Dermatology</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Chief Complaint */}
                    <FormField
                        control={form.control}
                        name="chiefComplaint"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Chief Complaint</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Vomiting, limping, annual checkup" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Diagnosis */}
                    <FormField
                        control={form.control}
                        name="diagnosis"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Diagnosis</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Detailed diagnosis..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Treatment */}
                    <FormField
                        control={form.control}
                        name="treatment"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Treatment Plan</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Treatment details..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Prescription Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Prescription</h3>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => append({ medicineName: "", dosage: "", frequency: "", duration: "" })}
                        >
                            <Plus className="mr-2 h-4 w-4" /> Add Medicine
                        </Button>
                    </div>

                    {fields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end border p-4 rounded-md">
                            <div className="md:col-span-3">
                                <FormField
                                    control={form.control}
                                    name={`prescription.${index}.medicineName`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Medicine</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <FormField
                                    control={form.control}
                                    name={`prescription.${index}.dosage`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Dosage</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. 500mg" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="md:col-span-3">
                                <FormField
                                    control={form.control}
                                    name={`prescription.${index}.frequency`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Frequency</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Twice daily" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <FormField
                                    control={form.control}
                                    name={`prescription.${index}.duration`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Duration</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. 5 days" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="md:col-span-1">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500"
                                    onClick={() => remove(index)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="md:col-span-12">
                                <FormField
                                    control={form.control}
                                    name={`prescription.${index}.notes`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Notes (e.g. After food)" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Follow Up Date */}
                    <FormField
                        control={form.control}
                        name="followUpDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Follow Up Date (Optional)</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Notes */}
                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Additional Notes</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Internal notes..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" size="lg">Save Medical Record</Button>
            </form>
        </Form>
    );
}
