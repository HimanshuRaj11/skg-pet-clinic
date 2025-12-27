
import { addDays, subDays, format } from "date-fns";

export const users = [
  { id: "u1", name: "Dr. Smith", role: "vet", email: "smith@skg.com" },
  { id: "u2", name: "Sarah Jones", role: "receptionist", email: "sarah@skg.com" },
  { id: "u3", name: "Mike Manager", role: "manager", email: "mike@skg.com" },
];

export const owners = [
  { id: "o1", name: "Alice Johnson", phone: "555-0101", email: "alice@example.com", address: "123 Maple St", notes: "VIP Client" },
  { id: "o2", name: "Bob Williams", phone: "555-0102", email: "bob@example.com", address: "456 Oak Ave", notes: "" },
  { id: "o3", name: "Charlie Brown", phone: "555-0103", email: "charlie@example.com", address: "789 Pine Ln", notes: "Late payer" },
];

export const pets = [
  { id: "p1", ownerId: "o1", name: "Bella", species: "Dog", breed: "Labrador", dob: "2020-05-10", weight: 25, gender: "Female", microchipId: "MC-12345", photoUrl: "/pets/dog1.jpg", notes: "Allergic to chicken" },
  { id: "p2", ownerId: "o1", name: "Max", species: "Dog", breed: "Beagle", dob: "2019-08-15", weight: 12, gender: "Male", microchipId: "MC-67890", photoUrl: "/pets/dog2.jpg", notes: "" },
  { id: "p3", ownerId: "o2", name: "Luna", species: "Cat", breed: "Siamese", dob: "2021-02-20", weight: 4, gender: "Female", microchipId: "MC-11223", photoUrl: "/pets/cat1.jpg", notes: "Scared of loud noises" },
];

export const medicines = [
  { id: "m1", name: "Amoxicillin", manufacturer: "PharmaCorp", batchNo: "B-101", expiryDate: format(addDays(new Date(), 180), "yyyy-MM-dd"), quantity: 50, minStock: 10 },
  { id: "m2", name: "Rimadyl", manufacturer: "Zoetis", batchNo: "B-102", expiryDate: format(addDays(new Date(), 60), "yyyy-MM-dd"), quantity: 5, minStock: 10 }, // Low stock
  { id: "m3", name: "Frontline", manufacturer: "Merial", batchNo: "B-103", expiryDate: format(addDays(new Date(), 10), "yyyy-MM-dd"), quantity: 30, minStock: 5 }, // Expiring soon
];

export const vaccines = [
  { id: "v1", name: "Rabies", manufacturer: "Merck", batchNo: "V-201", expiryDate: format(addDays(new Date(), 365), "yyyy-MM-dd"), quantity: 100, minStock: 20 },
  { id: "v2", name: "DHPP", manufacturer: "Zoetis", batchNo: "V-202", expiryDate: format(addDays(new Date(), 200), "yyyy-MM-dd"), quantity: 80, minStock: 15 },
];

export const appointments = [
  { id: "a1", petId: "p1", ownerId: "o1", vetId: "u1", datetime: format(addDays(new Date(), 1), "yyyy-MM-dd HH:mm"), status: "Confirmed", type: "Checkup" },
  { id: "a2", petId: "p3", ownerId: "o2", vetId: "u1", datetime: format(new Date(), "yyyy-MM-dd HH:mm"), status: "Pending", type: "Vaccination" },
  { id: "a3", petId: "p2", ownerId: "o1", vetId: "u1", datetime: format(subDays(new Date(), 1), "yyyy-MM-dd HH:mm"), status: "Completed", type: "Surgery" },
];

export const invoices = [
  {
    id: "i1",
    invoiceNo: "INV-001",
    ownerId: "o1",
    items: [{ desc: "Consultation", amount: 50 }, { desc: "Rabies Vaccine", amount: 25 }],
    total: 75,
    status: "Paid",
    createdAt: format(subDays(new Date(), 2), "yyyy-MM-dd")
  },
  { id: "i2", invoiceNo: "INV-002", ownerId: "o2", items: [{ desc: "Surgery", amount: 500 }], total: 500, status: "Unpaid", createdAt: format(subDays(new Date(), 1), "yyyy-MM-dd") },
];

export const reminders = [
  { id: "r1", petId: "p1", ownerId: "o1", type: "Vaccination", triggerDate: format(addDays(new Date(), 5), "yyyy-MM-dd"), channel: "Email", status: "Pending" },
  { id: "r2", petId: "p2", ownerId: "o1", type: "Checkup", triggerDate: format(subDays(new Date(), 1), "yyyy-MM-dd"), channel: "SMS", status: "Sent" },
];

export const auditLogs = [
  { id: "l1", userId: "u1", action: "Created Appointment", entity: "Appointment", entityId: "a1", timestamp: format(subDays(new Date(), 2), "yyyy-MM-dd HH:mm:ss") },
  { id: "l2", userId: "u2", action: "Updated Owner", entity: "Owner", entityId: "o1", timestamp: format(subDays(new Date(), 1), "yyyy-MM-dd HH:mm:ss") },
];

export const auditLog = [
  { id: "l1", userId: "u1", action: "Created Appointment", entity: "Appointment", entityId: "a1", timestamp: format(subDays(new Date(), 2), "yyyy-MM-dd HH:mm:ss") },
  { id: "l2", userId: "u2", action: "Updated Owner", entity: "Owner", entityId: "o1", timestamp: format(subDays(new Date(), 1), "yyyy-MM-dd HH:mm:ss") },
];
