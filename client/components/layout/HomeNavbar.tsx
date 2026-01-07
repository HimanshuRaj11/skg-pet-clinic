'use client';
import { FetchUser } from '@/app/Redux/Slice/User.slice';
import Link from 'next/link';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/button';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomeNavbar() {
    const { User } = useSelector((state: any) => state.User);
    const router = useRouter();

    useEffect(() => {
        if (User && User.role === "STAFF" && "ADMIN") {
            router.push("/dashboard");
        }
    }, [User, router]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchUser() as any)
    }, []);
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Heart className="h-6 w-6 text-primary filled" />
                    <span className="text-xl font-bold tracking-tight">SKG Animal Clinic</span>
                </div>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="#services" className="transition-colors hover:text-primary">Services</Link>
                    <Link href="#about" className="transition-colors hover:text-primary">About</Link>
                    <Link href="#team" className="transition-colors hover:text-primary">Team</Link>
                    <Link href="#testimonials" className="transition-colors hover:text-primary">Testimonials</Link>
                </nav>
                <div className="flex items-center gap-4">
                    {User ? (
                        <Link href="/dashboard">
                            <Button>Go to Dashboard</Button>
                        </Link>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost">Log In</Button>
                            </Link>
                            <Link href="/register">
                                <Button>Get Started</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
