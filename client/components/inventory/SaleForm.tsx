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
import { mockInventoryItems } from "@/lib/mock-inventory-data";
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

const saleItemSchema = z.object({
    itemId: z.string().min(1, "Item is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    batchNumber: z.string().min(1, "Batch number is required"),
    salePrice: z.number().min(0),
    taxPercentage: z.number().min(0),
    total: z.number(),
});

const saleFormSchema = z.object({
    patientId: z.string().optional(),
    doctorId: z.string().optional(),
    saleDate: z.date(),
    items: z.array(saleItemSchema).min(1, "At least one item is required"),
    totalAmount: z.number(),
    discount: z.number().min(0),
    taxAmount: z.number(),
    finalAmount: z.number(),
    paymentStatus: z.enum(["Paid", "Unpaid"]),
    paymentMode: z.enum(["Cash", "Online", "Card", "UPI"]),
});

type SaleFormValues = z.infer<typeof saleFormSchema>;

export function SaleForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<SaleFormValues>({
        resolver: zodResolver(saleFormSchema),
        defaultValues: {
            patientId: "",
            doctorId: "",
            saleDate: new Date(),
            items: [
                {
                    itemId: "",
                    quantity: 1,
                    batchNumber: "",
                    salePrice: 0,
                    taxPercentage: 0,
                    total: 0,
                },
            ],
            totalAmount: 0,
            discount: 0,
            taxAmount: 0,
            finalAmount: 0,
            paymentStatus: "Paid",
            paymentMode: "Cash",
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items",
    });

    const watchItems = form.watch("items");
    const watchDiscount = form.watch("discount");

    // Calculate totals
    useEffect(() => {
        let totalBase = 0;
        let totalTax = 0;

        watchItems.forEach((item, index) => {
            const qty = item.quantity || 0;
            const price = item.salePrice || 0;
            const tax = item.taxPercentage || 0;

            const itemBase = qty * price;
            const itemTax = itemBase * (tax / 100);
            const itemTotal = itemBase + itemTax;

            totalBase += itemBase;
            totalTax += itemTax;

            // Update individual item total
            form.setValue(`items.${index}.total`, Math.round(itemTotal * 100) / 100, {
                shouldValidate: false,
            });
        });

        const discount = watchDiscount || 0;
        const final = totalBase + totalTax - discount;

        form.setValue("totalAmount", Math.round(totalBase * 100) / 100, {
            shouldValidate: false,
        });
        form.setValue("taxAmount", Math.round(totalTax * 100) / 100, {
            shouldValidate: false,
        });
        form.setValue("finalAmount", Math.round(final * 100) / 100, {
            shouldValidate: false,
        });
    }, [watchItems, watchDiscount, form]);

    const handleItemSelect = (index: number, itemId: string) => {
        const selectedItem = mockInventoryItems.find((i) => i.id === itemId);
        if (selectedItem) {
            form.setValue(`items.${index}.itemId`, itemId);
            form.setValue(`items.${index}.salePrice`, selectedItem.salePrice);
            form.setValue(`items.${index}.taxPercentage`, selectedItem.taxPercentage);
            // Mock batch number for now
            form.setValue(`items.${index}.batchNumber`, "BATCH-001");
        }
    };

    async function onSubmit(data: SaleFormValues) {
        setLoading(true);
        console.log("Submitting sale data:", data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
        router.push("/inventory/sales");
        router.refresh();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                        control={form.control}
                        name="patientId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Patient ID (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. P-123" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="doctorId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Doctor ID (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. D-456" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="saleDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Sale Date</FormLabel>
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
                            <div className="md:col-span-4">
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.itemId`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Item</FormLabel>
                                            <Select
                                                onValueChange={(value) => handleItemSelect(index, value)}
                                                value={field.value}
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
                            <div className="md:col-span-2">
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.batchNumber`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Batch</FormLabel>
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
                                    name={`items.${index}.salePrice`}
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
                                            <FormLabel className="text-xs">Tax%</FormLabel>
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
                                    disabled={fields.length === 1}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="paymentStatus"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Payment Status</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Paid">Paid</SelectItem>
                                            <SelectItem value="Unpaid">Unpaid</SelectItem>
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
                                        value={field.value}
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
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-2 bg-muted/20 p-4 rounded-lg">
                        <div className="flex justify-between text-sm">
                            <span>Subtotal:</span>
                            <span>₹{form.watch("totalAmount").toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Tax:</span>
                            <span>₹{form.watch("taxAmount").toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm">Discount:</span>
                            <FormField
                                control={form.control}
                                name="discount"
                                render={({ field }) => (
                                    <FormItem className="w-24">
                                        <FormControl>
                                            <Input
                                                type="number"
                                                className="h-8 text-right"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2 border-t">
                            <span>Total Payable:</span>
                            <span>₹{form.watch("finalAmount").toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <Button type="submit" disabled={loading} className="w-full md:w-auto">
                    {loading ? "Processing..." : "Generate Invoice"}
                </Button>
            </form>
        </Form>
    );
}