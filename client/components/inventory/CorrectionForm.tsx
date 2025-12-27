"use client";

import { useState, useEffect } from "react";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { mockInventoryItems, mockStocks } from "@/lib/mock-inventory-data";
import { InventoryItem, Stock } from "@/types/inventory";

const correctionFormSchema = z.object({
    itemId: z.string().min(1, "Item is required"),
    batchNumber: z.string().min(1, "Batch number is required"),
    correctionDate: z.date({
        error: "Correction date is required",
    }),
    newQuantity: z.coerce.number().min(0, "Quantity cannot be negative"),
    reason: z.string().min(5, "Reason must be at least 5 characters"),
});

type CorrectionFormValues = z.infer<typeof correctionFormSchema>;

export function CorrectionForm() {
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
    const [availableBatches, setAvailableBatches] = useState<Stock[]>([]);
    const [currentStock, setCurrentStock] = useState<number | null>(null);
    const [difference, setDifference] = useState<number | null>(null);

    const form = useForm<CorrectionFormValues>({
        resolver: zodResolver(correctionFormSchema) as Resolver<CorrectionFormValues>,
        defaultValues: {
            correctionDate: new Date(),
            newQuantity: 0,
            reason: "",
        },
    });

    // Watch for item changes to filter batches
    const watchItemId = form.watch("itemId");
    useEffect(() => {
        if (watchItemId) {
            const item = mockInventoryItems.find((i) => i.id === watchItemId);
            setSelectedItem(item || null);

            const batches = mockStocks.filter((s) => s.itemId === watchItemId);
            setAvailableBatches(batches);

            // Reset batch and stock info if item changes
            form.setValue("batchNumber", "");
            setCurrentStock(null);
            setDifference(null);
        }
    }, [watchItemId, form]);

    // Watch for batch changes to set current stock
    const watchBatchNumber = form.watch("batchNumber");
    useEffect(() => {
        if (watchBatchNumber && watchItemId) {
            const stock = mockStocks.find(
                (s) => s.itemId === watchItemId && s.batchNumber === watchBatchNumber
            );
            if (stock) {
                setCurrentStock(stock.quantityAvailable);
                form.setValue("newQuantity", stock.quantityAvailable); // Default to current
            }
        }
    }, [watchBatchNumber, watchItemId, form]);

    // Calculate difference when new quantity changes
    const watchNewQuantity = form.watch("newQuantity");
    useEffect(() => {
        if (currentStock !== null) {
            setDifference(watchNewQuantity - currentStock);
        }
    }, [watchNewQuantity, currentStock]);

    function onSubmit(data: CorrectionFormValues) {
        console.log("Correction Data:", {
            ...data,
            previousQuantity: currentStock,
            difference: difference,
        });
        alert("Stock correction logged (Mock)");
        // Here you would call the API to save the correction
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Item Selection */}
                    <FormField
                        control={form.control}
                        name="itemId"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Select Item</FormLabel>
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
                                                    ? mockInventoryItems.find(
                                                        (item) => item.id === field.value
                                                    )?.itemName
                                                    : "Select item"}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[400px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search item..." />
                                            <CommandEmpty>No item found.</CommandEmpty>
                                            <CommandGroup>
                                                {mockInventoryItems.map((item) => (
                                                    <CommandItem
                                                        value={item.itemName}
                                                        key={item.id}
                                                        onSelect={() => {
                                                            form.setValue("itemId", item.id);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                item.id === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {item.itemName} ({item.itemCode})
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

                    {/* Batch Selection */}
                    <FormField
                        control={form.control}
                        name="batchNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Batch Number</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={!watchItemId || availableBatches.length === 0}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select batch" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {availableBatches.map((batch) => (
                                            <SelectItem key={batch.id} value={batch.batchNumber}>
                                                {batch.batchNumber} (Exp: {format(new Date(batch.expiryDate), "MMM d, yyyy")})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {watchItemId && availableBatches.length === 0 && (
                                    <FormDescription className="text-yellow-600">
                                        No stock batches found for this item.
                                    </FormDescription>
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Current Stock Display */}
                    <div className="flex flex-col space-y-2">
                        <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Current Quantity
                        </span>
                        <div className="h-10 w-full rounded-md border border-input bg-secondary/50 px-3 py-2 text-sm ring-offset-background">
                            {currentStock !== null ? currentStock : "-"}
                        </div>
                    </div>

                    {/* New Quantity */}
                    <FormField
                        control={form.control}
                        name="newQuantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Quantity</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} disabled={currentStock === null} />
                                </FormControl>
                                <FormDescription>
                                    Difference: {difference !== null ? (difference > 0 ? `+${difference}` : difference) : "-"}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Correction Date */}
                    <FormField
                        control={form.control}
                        name="correctionDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date of Correction</FormLabel>
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

                    {/* Reason */}
                    <FormField
                        control={form.control}
                        name="reason"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Reason for Correction</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="e.g., Damaged stock, Counting error, Expired disposal"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" disabled={currentStock === null}>Save Correction</Button>
            </form>
        </Form>
    );
}
