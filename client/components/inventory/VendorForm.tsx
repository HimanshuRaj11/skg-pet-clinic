"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Switch } from "@/components/ui/switch";
import { Vendor } from "@/types/inventory";
import { useRouter } from "next/navigation";
import { useState } from "react";

const vendorFormSchema = z.object({
    vendorName: z.string().min(2, "Vendor name is required"),
    contactName: z.string().min(2, "Contact person name is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    address: z.string().optional(),
    gstNumber: z.string().optional(),
    isActive: z.boolean(),
});

type VendorFormValues = z.infer<typeof vendorFormSchema>;

interface VendorFormProps {
    initialData?: Vendor;
}

export function VendorForm({ initialData }: VendorFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<VendorFormValues>({
        resolver: zodResolver(vendorFormSchema),
        defaultValues: initialData
            ? {
                vendorName: initialData.vendorName,
                contactName: initialData.contactName,
                phone: initialData.phone,
                email: initialData.email || "",
                address: initialData.address || "",
                gstNumber: initialData.gstNumber || "",
                isActive: initialData.isActive,
            }
            : {
                vendorName: "",
                contactName: "",
                phone: "",
                email: "",
                address: "",
                gstNumber: "",
                isActive: true,
            },
    });

    async function onSubmit(data: VendorFormValues) {
        setLoading(true);
        console.log("Submitting vendor data:", data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
        router.push("/inventory/vendors");
        router.refresh();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="vendorName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Vendor Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Pharma Distributors" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contactName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact Person</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Rajesh Kumar" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. 9876543210" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. contact@vendor.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gstNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>GST Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Optional" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isActive"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">Active Status</FormLabel>
                                    <FormDescription>
                                        Disable if you no longer purchase from this vendor.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Vendor address..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={loading}>
                    {loading
                        ? "Saving..."
                        : initialData
                            ? "Update Vendor"
                            : "Create Vendor"}
                </Button>
            </form>
        </Form>
    );
}
