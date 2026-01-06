"use client"

import { Pet, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { useEffect, useState } from "react"

export default function PetsPage() {
    const [pets, setPets] = useState<Pet[]>([]);

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
            console.log('Form submitted:', data);
            alert('Pet registration submitted successfully!');

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        fetchPets();
    }, []);



    return (
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Pets</h2>
                    <p className="text-muted-foreground">
                        Manage your patients here.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Link href="/pets/new" className="cursor-pointer">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Pet
                        </Button>
                    </Link>
                </div>
            </div>
            <DataTable data={pets || []} columns={columns} searchKey="name" />
        </div>
    )
}
