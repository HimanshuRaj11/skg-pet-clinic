import { MedicalRecord } from "@/types/medical-record";

export const mockMedicalRecords: MedicalRecord[] = [
    {
        id: "1",
        patientId: "p1", // Bella
        doctorId: "u1", // Dr. Smith
        date: new Date("2024-01-15"),
        diagnosisType: "General",
        chiefComplaint: "Vomiting and lethargy",
        diagnosis: "Gastroenteritis",
        treatment: "Administered anti-emetics and fluids.",
        prescription: [
            {
                medicineId: "1", // Paracetamol (Mock ID)
                medicineName: "Paracetamol 500mg",
                dosage: "1/2 tablet",
                frequency: "Twice daily",
                duration: "3 days",
                notes: "Give after food"
            }
        ],
        attachments: [],
        followUpDate: new Date("2024-01-18"),
        notes: "Monitor water intake.",
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
    },
    {
        id: "2",
        patientId: "p2", // Max
        doctorId: "u1", // Dr. Smith
        date: new Date("2024-01-20"),
        diagnosisType: "Vaccination",
        chiefComplaint: "Annual vaccination due",
        diagnosis: "Healthy",
        treatment: "Administered DHPP and Rabies vaccines.",
        prescription: [],
        attachments: [
            {
                id: "a1",
                fileName: "vaccination_cert.pdf",
                fileUrl: "/docs/vaccination_cert.pdf",
                fileType: "application/pdf",
                uploadedAt: new Date("2024-01-20")
            }
        ],
        createdAt: new Date("2024-01-20"),
        updatedAt: new Date("2024-01-20"),
    },
    {
        id: "3",
        patientId: "p3", // Luna
        doctorId: "u1", // Dr. Smith
        date: new Date("2024-01-22"),
        diagnosisType: "Dermatology",
        chiefComplaint: "Itching and hair loss on back",
        diagnosis: "Flea Allergy Dermatitis",
        treatment: "Applied topical flea treatment.",
        prescription: [
            {
                medicineId: "2", // Amoxicillin (Mock ID)
                medicineName: "Amoxicillin 250mg",
                dosage: "2ml",
                frequency: "Twice daily",
                duration: "5 days",
            }
        ],
        attachments: [],
        followUpDate: new Date("2024-02-05"),
        createdAt: new Date("2024-01-22"),
        updatedAt: new Date("2024-01-22"),
    }
];
