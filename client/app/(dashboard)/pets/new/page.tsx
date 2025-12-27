import PetClinicForm from "@/components/forms/PetClinicForm"

export default function NewPetPage() {
    return (
        <div className="flex-1">
            <div className="grid grid-cols-1">
                <PetClinicForm initialData={{
                    petName: "",
                    petSpecies: "",
                    petGender: "",
                    petBreed: "",
                    petAgeYears: "",
                    petAgeMonths: "",
                    petAgeDays: "",
                    petDOB: "",
                    microchipNumber: "",
                    vaccinationId: "",
                    petColor: "",
                    petWeight: "",
                    ownerName: "",
                    ownerEmail: "",
                    mobileNumber: "",
                    whatsappNumber: "",
                    ownerAddress: "",
                    petNotes: ""
                }} />
            </div>
        </div>
    )
}
