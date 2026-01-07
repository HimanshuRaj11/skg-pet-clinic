"use client"

import { useQuery } from "@tanstack/react-query"
import { fetcher } from "@/lib/api"
import { Appointment, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppointmentCalendar } from "@/components/appointments/appointment-calendar"
import React, { useEffect } from "react"
import axios from "axios"

export default function AppointmentsPage() {

    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState<Appointment[] | null>(null);
    console.log(data, "appointments data");
    const fetchAppointments = async () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1];
        if (!token) {
            throw new Error("No access token found");
        }
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/appointments/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(data);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!data) {
            fetchAppointments();
        }
    }, [])

    if (loading) return <div>Loading...</div>


    return (
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Appointments</h2>
                    <p className="text-muted-foreground">
                        Manage clinic schedule.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Link href="/appointments/new">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Book Appointment
                        </Button>
                    </Link>
                </div>
            </div>
            <DataTable data={data || []} columns={columns} searchKey="type" />
        </div>
    )
}
