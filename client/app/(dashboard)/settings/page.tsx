"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
    return (
        <div className="space-y-6 p-8 pb-16 block">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your clinic settings and preferences.
                </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                        <Button variant="ghost" className="justify-start bg-muted hover:bg-muted">
                            General
                        </Button>
                        <Button variant="ghost" className="justify-start">
                            Notifications
                        </Button>
                        <Button variant="ghost" className="justify-start">
                            Integrations
                        </Button>
                    </nav>
                </aside>
                <div className="flex-1 lg:max-w-2xl">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium">Clinic Profile</h3>
                            <p className="text-sm text-muted-foreground">
                                This is how others will see you on the site.
                            </p>
                        </div>
                        <Separator />
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Clinic Name</Label>
                                <Input id="name" defaultValue="SKG Animal Clinic" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Contact Email</Label>
                                <Input id="email" defaultValue="contact@skg.com" />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="notifications" defaultChecked />
                                <Label htmlFor="notifications">Enable Email Notifications</Label>
                            </div>
                        </div>
                        <Button>Save changes</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
