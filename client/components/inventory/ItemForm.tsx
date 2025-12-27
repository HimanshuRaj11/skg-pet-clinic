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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { InventoryItem, ItemCategory, ItemUnit } from "@/types/inventory";
import { useRouter } from "next/navigation";
import { useState } from "react";

const itemFormSchema = z.object({
    itemName: z.string().min(2, {
        message: "Item name must be at least 2 characters.",
    }),
    itemCode: z.string().min(2, {
        message: "Item code must be at least 2 characters.",
    }),
    category: z.enum([
        "Tablet",
        "Syrup",
        "Injection",
        "Equipment",
        "Consumable",
        "Other",
    ] as [string, ...string[]]),
    description: z.string().optional(),
    unit: z.enum([
        "Strip",
        "Bottle",
        "Piece",
        "Box",
        "Vial",
        "Other",
    ] as [string, ...string[]]),
    purchasePrice: z.coerce.number().min(0, "Price must be positive"),
    salePrice: z.coerce.number().min(0, "Price must be positive"),
    taxPercentage: z.coerce.number().min(0).max(100, "Invalid tax percentage"),
    minStockAlert: z.coerce.number().min(0, "Must be positive"),
});

export type ItemFormValues = z.infer<typeof itemFormSchema>;

interface ItemFormProps {
    initialData?: InventoryItem | ItemFormValues;
}

export function ItemForm({ initialData }: ItemFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<ItemFormValues>({
        resolver: zodResolver(itemFormSchema) as any,
        defaultValues: initialData
            ? {
                itemName: initialData.itemName,
                itemCode: initialData.itemCode,
                category: initialData.category,
                description: initialData.description || "",
                unit: initialData.unit,
                purchasePrice: initialData.purchasePrice,
                salePrice: initialData.salePrice,
                taxPercentage: initialData.taxPercentage,
                minStockAlert: initialData.minStockAlert,
            }
            : {
                itemName: "",
                itemCode: "",
                category: "Tablet",
                description: "",
                unit: "Strip",
                purchasePrice: 0,
                salePrice: 0,
                taxPercentage: 0,
                minStockAlert: 10,
            },
    });

    async function onSubmit(data: ItemFormValues) {
        setLoading(true);
        // Simulate API call
        console.log("Submitting data:", data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
        router.push("/inventory/items");
        router.refresh();
    }

    const isEditing = initialData && 'id' in initialData;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="itemName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Item Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Paracetamol 500mg" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="itemCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Item Code / SKU</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. MED001" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Tablet">Tablet</SelectItem>
                                        <SelectItem value="Syrup">Syrup</SelectItem>
                                        <SelectItem value="Injection">Injection</SelectItem>
                                        <SelectItem value="Equipment">Equipment</SelectItem>
                                        <SelectItem value="Consumable">Consumable</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="unit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Unit</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a unit" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Strip">Strip</SelectItem>
                                        <SelectItem value="Bottle">Bottle</SelectItem>
                                        <SelectItem value="Piece">Piece</SelectItem>
                                        <SelectItem value="Box">Box</SelectItem>
                                        <SelectItem value="Vial">Vial</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="purchasePrice"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Purchase Price (Base)</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.01" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="salePrice"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sale Price (MRP)</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.01" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="taxPercentage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tax Percentage (%)</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.1" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="minStockAlert"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Min Stock Alert Level</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Alert when stock falls below this quantity.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Additional details about the item..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : isEditing ? "Update Item" : "Create Item"}
                </Button>
            </form>
        </Form>
    );
}
