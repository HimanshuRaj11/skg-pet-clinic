"use client"

import { useState } from "react"
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths
} from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Appointment } from "@/app/(dashboard)/appointments/columns"

interface AppointmentCalendarProps {
    appointments: Appointment[]
}

export function AppointmentCalendar({ appointments }: AppointmentCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date())

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const days = eachDayOfInterval({ start: startDate, end: endDate })

    return (
        <div className="border rounded-md p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
                <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={prevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextMonth}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-px bg-muted text-center text-xs font-semibold leading-6 text-muted-foreground">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>
            <div className="grid grid-cols-7 gap-px bg-muted mt-2 border border-muted rounded-md overflow-hidden">
                {days.map((day, dayIdx) => {
                    const dayAppointments = appointments.filter(apt => isSameDay(new Date(apt.datetime), day))

                    return (
                        <div
                            key={day.toString()}
                            className={cn(
                                "min-h-[100px] bg-background p-2",
                                !isSameMonth(day, monthStart) && "bg-muted/50 text-muted-foreground"
                            )}
                        >
                            <time dateTime={format(day, "yyyy-MM-dd")} className={cn(
                                "flex h-6 w-6 items-center justify-center rounded-full text-sm",
                                isSameDay(day, new Date()) && "bg-primary text-primary-foreground font-semibold"
                            )}>
                                {format(day, "d")}
                            </time>
                            <div className="mt-2 space-y-1">
                                {dayAppointments.map(apt => (
                                    <div key={apt.id} className="text-xs p-1 rounded bg-blue-100 text-blue-700 truncate dark:bg-blue-900 dark:text-blue-100">
                                        {format(new Date(apt.datetime), "HH:mm")} {apt.type}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
