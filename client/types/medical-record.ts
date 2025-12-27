export type DiagnosisType = 'General' | 'Surgery' | 'Vaccination' | 'Emergency' | 'Dental' | 'Dermatology';

export interface PrescriptionItem {
    medicineId: string;
    medicineName: string;
    dosage: string;
    frequency: string;
    duration: string;
    notes?: string;
}

export interface MedicalRecordAttachment {
    id: string;
    fileName: string;
    fileUrl: string;
    fileType: string;
    uploadedAt: Date;
}

export interface MedicalRecord {
    id: string;
    patientId: string; // Pet ID
    doctorId: string;
    date: Date;
    diagnosisType: DiagnosisType;
    chiefComplaint: string;
    diagnosis: string;
    treatment: string;
    prescription: PrescriptionItem[];
    attachments: MedicalRecordAttachment[];
    followUpDate?: Date;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
