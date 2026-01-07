"use client"

import { useQuery } from "@tanstack/react-query"
import { fetcher } from "@/lib/api"
import { Pet } from "../columns"
import { Button } from "@/components/ui/button"
import { Edit, Activity, Syringe, Calendar } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function PetProfilePage() {
    const params = useParams()
    const id = params.id as string

    const { data: pets } = useQuery<Pet[]>({
        queryKey: ["pets"],
        queryFn: () => fetcher("/api/demo/pets"),
    })

    const pet = pets?.find((p) => p.id === id)

    if (!pet) return <div>Loading...</div>

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Pet Profile</h2>
                <div className="flex items-center space-x-2">
                    <Link href={`/pets/${id}/edit`}>
                        <Button variant="outline">
                            <Edit className="mr-2 h-4 w-4" /> Edit Pet
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Details</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center space-y-4">
                        <Avatar className="h-32 w-32">
                            <AvatarImage src={pet.photoUrl} />
                            <AvatarFallback>{pet.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold">{pet.name}</h3>
                            <p className="text-muted-foreground">{pet.breed} ({pet.species})</p>
                        </div>
                        <div className="w-full space-y-2">
                            <div className="flex justify-between">
                                <span className="font-semibold">Gender:</span>
                                <span>{pet.gender}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Weight:</span>
                                <span>{pet.weight} kg</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">DOB:</span>
                                <span>{pet.dob}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Microchip:</span>
                                <span>{pet.microchipId || "N/A"}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-5">
                    <CardHeader>
                        <CardTitle>Medical History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex">
                                <div className="flex flex-col items-center mr-4">
                                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                                        <Syringe className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="w-px h-full bg-gray-200 my-2"></div>
                                </div>
                                <div className="pb-8">
                                    <p className="text-sm text-muted-foreground">Oct 12, 2023</p>
                                    <h4 className="text-lg font-bold">Rabies Vaccination</h4>
                                    <p className="text-gray-600">Administered Rabies vaccine. Next due in 1 year.</p>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex flex-col items-center mr-4">
                                    <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                                        <Activity className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="w-px h-full bg-gray-200 my-2"></div>
                                </div>
                                <div className="pb-8">
                                    <p className="text-sm text-muted-foreground">Aug 15, 2023</p>
                                    <h4 className="text-lg font-bold">General Checkup</h4>
                                    <p className="text-gray-600">Weight check and general physical exam. All good.</p>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex flex-col items-center mr-4">
                                    <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full">
                                        <Calendar className="w-5 h-5 text-orange-600" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">May 10, 2023</p>
                                    <h4 className="text-lg font-bold">Initial Registration</h4>
                                    <p className="text-gray-600">Pet registered in the system.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
