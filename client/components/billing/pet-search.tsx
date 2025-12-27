"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { pets, owners } from "@/lib/demo-data"

interface PetSearchProps {
    onSelect: (petId: string) => void
}

export function PetSearch({ onSelect }: PetSearchProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    // Enrich pet data with owner name for better search context
    const enrichedPets = React.useMemo(() => {
        return pets.map((pet) => {
            const owner = owners.find((o) => o.id === pet.ownerId)
            return {
                ...pet,
                ownerName: owner?.name || "Unknown Owner",
                searchTerm: `${pet.name} ${pet.microchipId} ${owner?.name}`.toLowerCase(),
            }
        })
    }, [])

    const selectedPet = enrichedPets.find((pet) => pet.id === value)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? `${selectedPet?.name} (${selectedPet?.ownerName})`
                        : "Search pet by name, ID, or owner..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search pet..." />
                    <CommandList>
                        <CommandEmpty>No pet found.</CommandEmpty>
                        <CommandGroup>
                            {enrichedPets.map((pet) => (
                                <CommandItem
                                    key={pet.id}
                                    value={pet.searchTerm} // Use the composite search term for filtering
                                    onSelect={() => {
                                        setValue(pet.id)
                                        onSelect(pet.id)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === pet.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-medium">{pet.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            Owner: {pet.ownerName} | Chip: {pet.microchipId}
                                        </span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
