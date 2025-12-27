"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
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
import { mockInventoryItems, mockVendors } from "@/lib/mock-inventory-data";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const purchaseItemSchema = z.object({
    itemId: z.string().min(1, "Item is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    batchNumber: z.string().min(1, "Batch number is required"),
    expiryDate: z.date(),
    purchasePrice: z.number().min(0, "Price must be positive"),
    salePrice: z.number().min(0, "Price must be positive"),
    taxPercentage: z.number().min(0).max(100),
    total: z.number(),
});

const purchaseFormSchema = z.object({
    vendorId: z.string().min(1, "Vendor is required"),
    invoiceNumber: z.string().min(1, "Invoice number is required"),
    purchaseDate: z.date(),
    items: z.array(purchaseItemSchema).min(1, "At least one item is required"),
    totalAmount: z.number(),
    paymentStatus: z.enum(["Paid", "Unpaid", "Partial"]),
    paymentMode: z.enum(["Cash", "Online", "Card", "UPI", "Bank Transfer"]),
    remarks: z.string().optional(),
});

type PurchaseFormValues = z.infer<typeof purchaseFormSchema>;

export function PurchaseForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<PurchaseFormValues>({
        resolver: zodResolver(purchaseFormSchema),
        defaultValues: {
            vendorId: "",
            invoiceNumber: "",
            purchaseDate: new Date(),
            items: [
                {
                    itemId: "",
                    quantity: 1,
                    batchNumber: "",
                    expiryDate: new Date(),
                    purchasePrice: 0,
                    salePrice: 0,
                    taxPercentage: 0,
                    total: 0,
                },
            ],
            totalAmount: 0,
            paymentStatus: "Unpaid",
            paymentMode: "Cash",
            remarks: "",
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items",
    });

    const watchItems = form.watch("items");

    // Calculate totals whenever items change
    useEffect(() => {
        const total = watchItems.reduce((sum, item) => {
            const itemTotal =
                (item.quantity || 0) * (item.purchasePrice || 0) * (1 + (item.taxPercentage || 0) / 100);
            return sum + itemTotal;
        }, 0);
        form.setValue("totalAmount", Math.round(total * 100) / 100);
    }, [watchItems, form]);

    // Auto-fill item details when an item is selected
    const handleItemSelect = (index: number, itemId: string) => {
        const selectedItem = mockInventoryItems.find((i) => i.id === itemId);
        if (selectedItem) {
            form.setValue(`items.${index}.itemId`, itemId);
            form.setValue(`items.${index}.purchasePrice`, selectedItem.purchasePrice);
            form.setValue(`items.${index}.salePrice`, selectedItem.salePrice);
            form.setValue(`items.${index}.taxPercentage`, selectedItem.taxPercentage);
        }
    };

    async function onSubmit(data: PurchaseFormValues) {
        setLoading(true);
        console.log("Submitting purchase data:", data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
        router.push("/inventory/purchases");
        router.refresh();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                        control={form.control}
                        name="vendorId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Vendor</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Vendor" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {mockVendors.map((vendor) => (
                                            <SelectItem key={vendor.id} value={vendor.id}>
                                                {vendor.vendorName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="invoiceNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Invoice Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. INV-001" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="purchaseDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Purchase Date</FormLabel>
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
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Items</h3>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                append({
                                    itemId: "",
                                    quantity: 1,
                                    batchNumber: "",
                                    expiryDate: new Date(),
                                    purchasePrice: 0,
                                    salePrice: 0,
                                    taxPercentage: 0,
                                    total: 0,
                                })
                            }
                        >
                            <Plus className="mr-2 h-4 w-4" /> Add Item
                        </Button>
                    </div>

                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border rounded-lg bg-muted/50 items-end"
                        >
                            <div className="md:col-span-3">
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.itemId`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Item</FormLabel>
                                            <Select
                                                onValueChange={(value) => handleItemSelect(index, value)}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="h-8">
                                                        <SelectValue placeholder="Select Item" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {mockInventoryItems.map((item) => (
                                                        <SelectItem key={item.id} value={item.id}>
                                                            {item.itemName}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="md:col-span-1">
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.quantity`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Qty</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    className="h-8"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.batchNumber`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Batch No</FormLabel>
                                            <FormControl>
                                                <Input className="h-8" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.expiryDate`}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel className="text-xs">Expiry</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal h-8 text-xs",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PP")
                                                            ) : (
                                                                <span>Pick date</span>
                                                            )}
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="md:col-span-1">
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.purchasePrice`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    className="h-8"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="md:col-span-1">
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.taxPercentage`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Tax %</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    className="h-8"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="md:col-span-1">
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.salePrice`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">MRP</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    className="h-8"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="md:col-span-1 flex justify-end pb-1">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive"
                                    onClick={() => remove(index)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t">
                    <FormField
                        control={form.control}
                        name="paymentStatus"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Payment Status</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Paid">Paid</SelectItem>
                                        <SelectItem value="Unpaid">Unpaid</SelectItem>
                                        <SelectItem value="Partial">Partial</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="paymentMode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Payment Mode</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Mode" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Cash">Cash</SelectItem>
                                        <SelectItem value="Online">Online</SelectItem>
                                        <SelectItem value="Card">Card</SelectItem>
                                        <SelectItem value="UPI">UPI</SelectItem>
                                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col justify-end">
                        <div className="text-right">
                            <span className="text-muted-foreground text-sm">Total Amount</span>
                            <div className="text-2xl font-bold">
                                ₹{form.watch("totalAmount").toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="remarks"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Remarks</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Additional notes..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={loading} className="w-full md:w-auto">
                    {loading ? "Saving..." : "Create Purchase Entry"}
                </Button>
            </form>
        </Form>
    );
}
