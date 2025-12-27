import { InventoryItem, Vendor, Purchase, SaleInvoice, Stock, InventoryCorrection } from "@/types/inventory";

export const mockInventoryItems: InventoryItem[] = [
    {
        id: "1",
        itemName: "Paracetamol 500mg",
        itemCode: "MED001",
        category: "Tablet",
        description: "Fever and pain relief",
        unit: "Strip",
        purchasePrice: 15,
        salePrice: 25,
        taxPercentage: 12,
        minStockAlert: 50,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
    },
    {
        id: "2",
        itemName: "Amoxicillin 250mg",
        itemCode: "MED002",
        category: "Syrup",
        description: "Antibiotic syrup for kids",
        unit: "Bottle",
        purchasePrice: 45,
        salePrice: 80,
        taxPercentage: 12,
        minStockAlert: 20,
        createdAt: new Date("2024-01-02"),
        updatedAt: new Date("2024-01-02"),
    },
    {
        id: "3",
        itemName: "Disposable Syringe 5ml",
        itemCode: "EQP001",
        category: "Consumable",
        description: "Sterile disposable syringe",
        unit: "Piece",
        purchasePrice: 5,
        salePrice: 10,
        taxPercentage: 18,
        minStockAlert: 100,
        createdAt: new Date("2024-01-03"),
        updatedAt: new Date("2024-01-03"),
    },
    {
        id: "4",
        itemName: "Vitamin C 500mg",
        itemCode: "MED003",
        category: "Tablet",
        description: "Immunity booster",
        unit: "Strip",
        purchasePrice: 20,
        salePrice: 35,
        taxPercentage: 12,
        minStockAlert: 30,
        createdAt: new Date("2024-01-04"),
        updatedAt: new Date("2024-01-04"),
    },
    {
        id: "5",
        itemName: "Bandage Roll 4 inch",
        itemCode: "EQP002",
        category: "Consumable",
        description: "Cotton bandage roll",
        unit: "Piece",
        purchasePrice: 12,
        salePrice: 20,
        taxPercentage: 5,
        minStockAlert: 40,
        createdAt: new Date("2024-01-05"),
        updatedAt: new Date("2024-01-05"),
    },
];

export const mockVendors: Vendor[] = [
    {
        id: "1",
        vendorName: "Pharma Distributors Ltd",
        contactName: "Rajesh Kumar",
        phone: "9876543210",
        email: "rajesh@pharmadist.com",
        address: "123, Industrial Area, Mumbai",
        gstNumber: "27ABCDE1234F1Z5",
        isActive: true,
        createdAt: new Date("2024-01-01"),
    },
    {
        id: "2",
        vendorName: "MediCare Supplies",
        contactName: "Suresh Gupta",
        phone: "9876543211",
        email: "suresh@medicare.com",
        address: "456, Market Road, Delhi",
        gstNumber: "07ABCDE1234F1Z5",
        isActive: true,
        createdAt: new Date("2024-01-02"),
    },
    {
        id: "3",
        vendorName: "Surgicals & Co",
        contactName: "Amit Singh",
        phone: "9876543212",
        email: "amit@surgicals.com",
        address: "789, Hospital Road, Bangalore",
        gstNumber: "29ABCDE1234F1Z5",
        isActive: false,
        createdAt: new Date("2024-01-03"),
    },
];

export const mockPurchases: Purchase[] = [
    {
        id: "1",
        vendorId: "1",
        invoiceNumber: "INV-2024-001",
        purchaseDate: new Date("2024-01-10"),
        items: [
            {
                itemId: "1",
                quantity: 100,
                batchNumber: "B001",
                expiryDate: new Date("2025-12-31"),
                purchasePrice: 15,
                salePrice: 25,
                taxPercentage: 12,
                total: 1680, // 100 * 15 + 12% tax
            },
            {
                itemId: "2",
                quantity: 50,
                batchNumber: "B002",
                expiryDate: new Date("2025-06-30"),
                purchasePrice: 45,
                salePrice: 80,
                taxPercentage: 12,
                total: 2520, // 50 * 45 + 12% tax
            }
        ],
        totalAmount: 4200,
        paymentStatus: "Paid",
        paymentMode: "Online",
        remarks: "Initial stock purchase",
        createdAt: new Date("2024-01-10"),
    },
    {
        id: "2",
        vendorId: "2",
        invoiceNumber: "INV-2024-002",
        purchaseDate: new Date("2024-01-15"),
        items: [
            {
                itemId: "3",
                quantity: 200,
                batchNumber: "B003",
                expiryDate: new Date("2026-01-01"),
                purchasePrice: 5,
                salePrice: 10,
                taxPercentage: 18,
                total: 1180, // 200 * 5 + 18% tax
            }
        ],
        totalAmount: 1180,
        paymentStatus: "Partial",
        paymentMode: "Online",
        createdAt: new Date("2024-01-15"),
    }
];

export const mockSales: SaleInvoice[] = [
    {
        id: "1",
        patientId: "P001",
        doctorId: "D001",
        saleDate: new Date("2024-01-20"),
        items: [
            {
                itemId: "1",
                quantity: 2,
                batchNumber: "B001",
                salePrice: 25,
                taxPercentage: 12,
                total: 56, // 2 * 25 + 12%
            },
            {
                itemId: "3",
                quantity: 5,
                batchNumber: "B003",
                salePrice: 10,
                taxPercentage: 18,
                total: 59, // 5 * 10 + 18%
            }
        ],
        totalAmount: 115,
        discount: 5,
        taxAmount: 15, // Approx
        finalAmount: 110,
        paymentStatus: "Paid",
        paymentMode: "Cash",
        createdAt: new Date("2024-01-20"),
    }
];

export const mockStocks: Stock[] = [
    {
        id: "1",
        itemId: "1",
        batchNumber: "B001",
        expiryDate: new Date("2025-12-31"),
        quantityAvailable: 98, // 100 purchased - 2 sold
        purchasePrice: 15,
        salePrice: 25,
        updatedAt: new Date("2024-01-20"),
    },
    {
        id: "2",
        itemId: "2",
        batchNumber: "B002",
        expiryDate: new Date("2025-06-30"),
        quantityAvailable: 50,
        purchasePrice: 45,
        salePrice: 80,
        updatedAt: new Date("2024-01-10"),
    },
    {
        id: "3",
        itemId: "3",
        batchNumber: "B003",
        expiryDate: new Date("2026-01-01"),
        quantityAvailable: 195, // 200 purchased - 5 sold
        purchasePrice: 5,
        salePrice: 10,
        updatedAt: new Date("2024-01-20"),
    },
    {
        id: "4",
        itemId: "4",
        batchNumber: "B004",
        expiryDate: new Date("2025-08-15"),
        quantityAvailable: 20, // Below min stock alert (30)
        purchasePrice: 20,
        salePrice: 35,
        updatedAt: new Date("2024-01-05"),
    }
];

export const mockCorrections: InventoryCorrection[] = [
    {
        id: "1",
        itemId: "1",
        batchNumber: "B001",
        previousQuantity: 100,
        newQuantity: 98,
        difference: -2,
        reason: "Damaged during handling",
        correctedBy: "U001",
        correctionDate: new Date("2024-01-18"),
    }
];
