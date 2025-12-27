"use client"

import PetClinicForm from "@/components/forms/PetClinicForm"
import { useQuery } from "@tanstack/react-query"
import { fetcher } from "@/lib/api"
import { Pet } from "../../columns"
import { useParams } from "next/navigation"
import { differenceInYears, differenceInMonths, differenceInDays, parseISO } from "date-fns"

interface Owner {
    id: string
    name: string
    phone: string
    email: string
    address: string
    notes: string
}

export default function EditPetPage() {
    const params = useParams()
    const id = params.id as string

    const { data: pets, isLoading: isLoadingPets } = useQuery<Pet[]>({
        queryKey: ["pets"],
        queryFn: () => fetcher("/api/demo/pets"),
    })

    const { data: owners, isLoading: isLoadingOwners } = useQuery<Owner[]>({
        queryKey: ["owners"],
        queryFn: () => fetcher("/api/demo/owners"),
    })

    if (isLoadingPets || isLoadingOwners) return <div>Loading...</div>

    const pet = pets?.find((p) => p.id === id)

    if (!pet) return <div>Pet not found</div>

    const owner = owners?.find((o) => o.id === pet.ownerId)

    // Calculate age
    let years = "0", months = "0", days = "0"
    if (pet.dob) {
        const dob = parseISO(pet.dob)
        const now = new Date()
        years = differenceInYears(now, dob).toString()
        months = (differenceInMonths(now, dob) % 12).toString()
        days = (differenceInDays(now, dob) % 30).toString()
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <PetClinicForm initialData={{
                petName: pet.name,
                petSpecies: pet.species,
                petGender: pet.gender,
                petBreed: pet.breed,
                petAgeYears: years,
                petAgeMonths: months,
                petAgeDays: days,
                petDOB: pet.dob,
                microchipNumber: pet.microchipId,
                vaccinationId: "",
                petColor: "",
                petWeight: pet.weight?.toString() || "",
                ownerName: owner?.name || "",
                ownerEmail: owner?.email || "",
                mobileNumber: owner?.phone || "",
                whatsappNumber: "",
                ownerAddress: owner?.address || "",
                petNotes: pet.notes
            }} />
        </div>
    )
}
