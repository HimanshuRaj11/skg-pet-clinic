export type ItemCategory = 'Tablet' | 'Syrup' | 'Injection' | 'Equipment' | 'Consumable' | 'Other';
export type ItemUnit = 'Strip' | 'Bottle' | 'Piece' | 'Box' | 'Vial' | 'Other';
export type PaymentStatus = 'Paid' | 'Unpaid' | 'Partial';
export type PaymentMode = 'Cash' | 'Online' | 'Card' | 'UPI';

export interface InventoryItem {
    id: string;
    itemName: string;
    itemCode: string;
    category: ItemCategory;
    description?: string;
    unit: ItemUnit;
    purchasePrice: number;
    salePrice: number;
    taxPercentage: number;
    minStockAlert: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Vendor {
    id: string;
    vendorName: string;
    contactName: string;
    phone: string;
    email?: string;
    address?: string;
    gstNumber?: string;
    bankDetails?: {
        accountName?: string;
        accountNumber?: string;
        ifscCode?: string;
        bankName?: string;
    };
    isActive: boolean;
    createdAt: Date;
}

export interface PurchaseItem {
    itemId: string;
    quantity: number;
    batchNumber: string;
    expiryDate: Date;
    purchasePrice: number;
    salePrice: number;
    taxPercentage: number;
    total: number;
}

export interface Purchase {
    id: string;
    vendorId: string;
    invoiceNumber: string;
    purchaseDate: Date;
    items: PurchaseItem[];
    totalAmount: number;
    paymentStatus: PaymentStatus;
    paymentMode: PaymentMode;
    remarks?: string;
    createdAt: Date;
}

export interface SaleItem {
    itemId: string;
    quantity: number;
    batchNumber: string;
    salePrice: number;
    taxPercentage: number;
    total: number;
}

export interface SaleInvoice {
    id: string;
    patientId?: string;
    doctorId?: string;
    saleDate: Date;
    items: SaleItem[];
    totalAmount: number;
    discount: number;
    taxAmount: number;
    finalAmount: number;
    paymentStatus: PaymentStatus;
    paymentMode: PaymentMode;
    createdAt: Date;
}

export interface SaleInventory {
    id: string;
    saleInvoiceId: string;
    itemId: string;
    quantitySold: number;
    batchNumber: string;
    stockBefore: number;
    stockAfter: number;
    createdAt: Date;
}

export interface Stock {
    id: string;
    itemId: string;
    batchNumber: string;
    expiryDate: Date;
    quantityAvailable: number;
    purchasePrice: number;
    salePrice: number;
    updatedAt: Date;
}

export interface InventoryCorrection {
    id: string;
    itemId: string;
    batchNumber: string;
    previousQuantity: number;
    newQuantity: number;
    difference: number;
    reason: string;
    correctedBy: string; // userId
    correctionDate: Date;
}
