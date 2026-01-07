"use client"

import { useState, useRef, useEffect } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Plus, Trash2, Save, Printer, Search, Edit2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import axios from "axios"
import { Pet } from "../../pets/columns"
import { PetFormData } from "@/components/forms/PetClinicForm"

// Mock pre-fetched service items
const SERVICE_ITEMS = [
    { id: "1", name: "General Consultation", price: 50 },
    { id: "2", name: "Vaccination - Rabies", price: 35 },
    { id: "3", name: "Vaccination - DHPP", price: 40 },
    { id: "4", name: "Dental Cleaning", price: 150 },
    { id: "5", name: "Surgery - Spay/Neuter", price: 300 },
    { id: "6", name: "X-Ray", price: 125 },
    { id: "7", name: "Blood Test - Complete", price: 85 },
    { id: "8", name: "Microchipping", price: 45 },
    { id: "9", name: "Deworming", price: 25 },
    { id: "10", name: "Emergency Visit", price: 100 },
]

interface InvoiceItem {
    id: string
    serviceId: string | null
    description: string
    quantity: number
    unitPrice: number
    isCustom: boolean
    isEditing: boolean
}


export default function EnhancedInvoicePage() {
    const [pets, setPets] = useState<PetFormData[]>([]);


    const [date, setDate] = useState<Date | undefined>(new Date())
    const [selectedPetId, setSelectedPetId] = useState<string>("")
    const [notes, setNotes] = useState<string>("")
    const [items, setItems] = useState<InvoiceItem[]>([])
    const [showItemSearch, setShowItemSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isSaving, setIsSaving] = useState(false)
    const printRef = useRef<HTMLDivElement>(null)

    const selectedPet = pets.find((p) => p.id === selectedPetId)
    const fetchPets = async () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1];
        if (!token) {
            throw new Error("No access token found");
        }
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/customers/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPets(data);

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        if (!pets.length) {
            fetchPets();
        }
    }, []);
    const handleAddServiceItem = (service: typeof SERVICE_ITEMS[0]) => {
        const newItem: InvoiceItem = {
            id: Math.random().toString(36).substr(2, 9),
            serviceId: service.id,
            description: service.name,
            quantity: 1,
            unitPrice: service.price,
            isCustom: false,
            isEditing: false,
        }
        setItems([...items, newItem])
        setShowItemSearch(false)
        setSearchQuery("")
    }

    const handleAddCustomItem = () => {
        const newItem: InvoiceItem = {
            id: Math.random().toString(36).substr(2, 9),
            serviceId: null,
            description: "",
            quantity: 1,
            unitPrice: 0,
            isCustom: true,
            isEditing: true,
        }
        setItems([...items, newItem])
        setShowItemSearch(false)
    }

    const handleRemoveItem = (id: string) => {
        setItems(items.filter((item) => item.id !== id))
    }

    const handleItemChange = (id: string, field: keyof InvoiceItem, value: any) => {
        setItems(
            items.map((item) => {
                if (item.id === id) {
                    return { ...item, [field]: value }
                }
                return item
            })
        )
    }

    const toggleEditMode = (id: string) => {
        setItems(
            items.map((item) => {
                if (item.id === id) {
                    return { ...item, isEditing: !item.isEditing }
                }
                return item
            })
        )
    }

    const calculateSubtotal = () => {
        return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
    }

    const calculateTax = () => {
        return calculateSubtotal() * 0.1
    }

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax()
    }

    const handleSave = async () => {
        if (!selectedPet) {
            alert("Please select a pet first")
            return
        }
        if (items.length === 0) {
            alert("Please add at least one item to the invoice")
            return
        }

        setIsSaving(true)

        const invoiceData = {
            date: date?.toISOString(),
            petId: selectedPetId,
            pet: selectedPet,
            items: items.map(item => ({
                serviceId: item.serviceId,
                description: item.description,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                total: item.quantity * item.unitPrice
            })),
            subtotal: calculateSubtotal(),
            tax: calculateTax(),
            total: calculateTotal(),
            notes,
        }

        try {
            console.log(invoiceData);

        } catch (error) {
            alert("Error saving invoice: " + error)
        } finally {
            setIsSaving(false)
        }
    }

    const handlePrint = () => {
        const printContent = printRef.current
        if (!printContent) return

        const printWindow = window.open('', '', 'width=800,height=600')
        if (!printWindow) return
        handleSave()

        printWindow.document.write(`
            <html>
                <head>
                    <title>Invoice</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 40px; }
                        .invoice-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
                        .invoice-header h1 { margin: 0 0 10px 0; color: #333; font-size: 36px; }
                        .invoice-header p { margin: 5px 0; color: #666; }
                        .invoice-info { display: flex; justify-content: space-between; margin: 30px 0; }
                        .info-section h3 { margin: 0 0 10px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
                        .info-section p { margin: 3px 0; font-size: 14px; }
                        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
                        th { background-color: #f5f5f5; font-weight: bold; text-transform: uppercase; font-size: 12px; }
                        .text-right { text-align: right; }
                        .totals { margin-top: 20px; float: right; width: 300px; }
                        .totals div { display: flex; justify-content: space-between; padding: 8px 0; }
                        .totals .total-row { font-weight: bold; font-size: 20px; border-top: 2px solid #333; padding-top: 12px; margin-top: 8px; }
                        .notes { margin-top: 60px; clear: both; }
                        .notes h3 { margin-bottom: 10px; color: #666; font-size: 14px; }
                        .footer { margin-top: 60px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px; }
                        @media print {
                            body { padding: 20px; }
                        }
                    </style>
                </head>
                <body>
                    ${printContent.innerHTML}
                </body>
            </html>
        `)
        printWindow.document.close()
        printWindow.focus()
        setTimeout(() => {
            printWindow.print()
            printWindow.close()
        }, 250)
    }

    const filteredItems = SERVICE_ITEMS.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">New Invoice</h2>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" onClick={handlePrint} disabled={!selectedPet || items.length === 0}>
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                        <Save className="mr-2 h-4 w-4" />
                        {isSaving ? "Saving..." : "Save Invoice"}
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Bill To</CardTitle>
                            <CardDescription>Select a patient to fetch owner details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Select patient</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-start">
                                            <Search className="mr-2 h-4 w-4" />
                                            {selectedPet ? selectedPet.pet_name : "Search pet..."}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0" align="start">
                                        <Command>
                                            <CommandInput placeholder="Search pet..." />
                                            <CommandEmpty>No patient found.</CommandEmpty>
                                            <CommandGroup>
                                                {pets?.map((pet: PetFormData) => (
                                                    <CommandItem
                                                        key={pet.id}
                                                        onSelect={() => setSelectedPetId(pet.id!)}
                                                    >
                                                        <div>
                                                            <div className="font-medium">{pet.pet_name}</div>
                                                            <div className="text-sm text-muted-foreground">
                                                                {pet.species} - {pet.breed}
                                                            </div>
                                                        </div>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {selectedPet && (
                                <div className="rounded-md border p-4 bg-muted/50">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                                                Owner Details
                                            </h4>
                                            <p className="font-medium">{selectedPet.owner_name}</p>
                                            <p className="text-sm">{selectedPet.owner_address}</p>
                                            <p className="text-sm">{selectedPet.owner_email}</p>
                                            <p className="text-sm">{selectedPet.owner_phone}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                                                patient Details
                                            </h4>
                                            <p className="font-medium">{selectedPet.pet_name}</p>
                                            <p className="text-sm">
                                                {selectedPet.species} - {selectedPet.breed}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Invoice Items</CardTitle>
                                    <CardDescription>Add services or custom items</CardDescription>
                                </div>
                                <Popover open={showItemSearch} onOpenChange={setShowItemSearch}>
                                    <PopoverTrigger asChild>
                                        <Button size="sm">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Item
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80 p-0" align="end">
                                        <Command>
                                            <CommandInput
                                                placeholder="Search services..."
                                                value={searchQuery}
                                                onValueChange={setSearchQuery}
                                            />
                                            <CommandEmpty>
                                                <div className="p-4 text-center">
                                                    <p className="text-sm text-muted-foreground mb-2">No service found</p>
                                                    <Button size="sm" onClick={handleAddCustomItem}>
                                                        Add Custom Item
                                                    </Button>
                                                </div>
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {filteredItems.map((service) => (
                                                    <CommandItem
                                                        key={service.id}
                                                        onSelect={() => handleAddServiceItem(service)}
                                                    >
                                                        <div className="flex justify-between w-full">
                                                            <span>{service.name}</span>
                                                            <span className="text-muted-foreground">₹{service.price}</span>
                                                        </div>
                                                    </CommandItem>
                                                ))}
                                                <CommandItem onSelect={handleAddCustomItem}>
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Add Custom Item
                                                </CommandItem>
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {items.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground border border-dashed rounded-md">
                                    <p>No items added yet. Click "Add Item" to start.</p>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Description</TableHead>
                                            <TableHead className="w-24">Qty</TableHead>
                                            <TableHead className="w-32">Price</TableHead>
                                            <TableHead className="w-32">Total</TableHead>
                                            <TableHead className="w-24"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {items.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    {item.isEditing ? (
                                                        <Input
                                                            value={item.description}
                                                            onChange={(e) =>
                                                                handleItemChange(item.id, "description", e.target.value)
                                                            }
                                                            placeholder="Item description"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-between">
                                                            <span>{item.description}</span>
                                                            {!item.isCustom && (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8"
                                                                    onClick={() => toggleEditMode(item.id)}
                                                                >
                                                                    <Edit2 className="h-4 w-4" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        value={item.quantity}
                                                        onChange={(e) =>
                                                            handleItemChange(
                                                                item.id,
                                                                "quantity",
                                                                parseInt(e.target.value) || 1
                                                            )
                                                        }
                                                        className="w-full"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {item.isEditing ? (
                                                        <Input
                                                            type="number"
                                                            min="0"
                                                            step="0.01"
                                                            value={item.unitPrice}
                                                            onChange={(e) =>
                                                                handleItemChange(
                                                                    item.id,
                                                                    "unitPrice",
                                                                    parseFloat(e.target.value) || 0
                                                                )
                                                            }
                                                        />
                                                    ) : (
                                                        <span>₹{item.unitPrice.toFixed(2)}</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    ₹{(item.quantity * item.unitPrice).toFixed(2)}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-1">
                                                        {item.isEditing && (
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                                onClick={() => toggleEditMode(item.id)}
                                                            >
                                                                <Check className="h-4 w-4 text-green-600" />
                                                            </Button>
                                                        )}
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            onClick={() => handleRemoveItem(item.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="col-span-3 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Invoice Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Invoice Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label>Notes</Label>
                                <Textarea
                                    placeholder="Additional notes or payment terms..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={4}
                                />
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>₹{calculateSubtotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Tax (10%)</span>
                                    <span>₹{calculateTax().toFixed(2)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold text-xl">
                                    <span>Total Due</span>
                                    <span>₹{calculateTotal().toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Hidden Print Template */}
            <div ref={printRef} style={{ display: 'none' }}>
                <div className="invoice-header">
                    <h1>INVOICE</h1>
                    <p>Veterinary Clinic</p>
                    <p>123 Pet Care Street, City, State 12345</p>
                    <p>Phone: (555) 000-0000 | Email: info@vetclinic.com</p>
                    <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Date: {date ? format(date, "MMMM dd, yyyy") : ""}</p>
                </div>

                <div className="invoice-info">
                    <div className="info-section">
                        <h3>BILL TO:</h3>
                        {selectedPet && (
                            <>
                                <p><strong>{selectedPet.owner_name}</strong></p>
                                <p>{selectedPet.owner_address}</p>
                                <p>{selectedPet.owner_email}</p>
                                <p>{selectedPet.owner_phone}</p>
                            </>
                        )}
                    </div>
                    <div className="info-section">
                        <h3>PET DETAILS:</h3>
                        {selectedPet && (
                            <>
                                <p><strong>{selectedPet.pet_name}</strong></p>
                                <p>{selectedPet.species}</p>
                                <p>{selectedPet.breed}</p>
                            </>
                        )}
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th className="text-right">Qty</th>
                            <th className="text-right">Price</th>
                            <th className="text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.description}</td>
                                <td className="text-right">{item.quantity}</td>
                                <td className="text-right">${item.unitPrice.toFixed(2)}</td>
                                <td className="text-right">${(item.quantity * item.unitPrice).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="totals">
                    <div>
                        <span>Subtotal:</span>
                        <span>₹{calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div>
                        <span>Tax (10%):</span>
                        <span>₹{calculateTax().toFixed(2)}</span>
                    </div>
                    <div className="total-row">
                        <span>Total Due:</span>
                        <span>₹{calculateTotal().toFixed(2)}</span>
                    </div>
                </div>

                {notes && (
                    <div className="notes">
                        <h3>Notes:</h3>
                        <p>{notes}</p>
                    </div>
                )}

                <div className="footer">
                    <p>Thank you for your business!</p>
                    <p>Payment is due within 30 days. Please make checks payable to Veterinary Clinic.</p>
                </div>
            </div>
        </div>
    )
}