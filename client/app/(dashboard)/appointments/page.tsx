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
import { useEffect } from "react"

export default function AppointmentsPage() {
    const { data, isLoading, error } = useQuery<Appointment[]>({
        queryKey: ["appointments"],
        queryFn: () => fetcher("http://localhost:8000/api/appointments"),
    })

    const fetchAppointments = async () => {
        const response = await fetch("http://localhost:8000/api/appointments")
        console.log(response);

        return response.json()
    }
    useEffect(() => {
        fetchAppointments()
    }, [])

    if (isLoading) return <div>Loading...</div>


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

            <Tabs defaultValue="calendar" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                    <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
                <TabsContent value="calendar" className="space-y-4">
                    <AppointmentCalendar appointments={data || []} />
                </TabsContent>
                <TabsContent value="list" className="space-y-4">
                    <DataTable data={data || []} columns={columns} searchKey="type" />
                </TabsContent>
            </Tabs>
        </div>
    )
}
