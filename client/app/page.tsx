import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, Heart, Syringe, Calendar, Users, Activity, ArrowRight, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

import HomeNavbar from "@/components/layout/HomeNavbar"

export default async function Home() {

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <HomeNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-6 lg:px-8 py-24 lg:py-32 overflow-hidden bg-slate-50 dark:bg-slate-900">
          <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <Badge className="mb-4" variant="secondary">Premium Veterinary Care</Badge>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-slate-900 dark:text-slate-100 mb-6">
                  Caring for Your <span className="text-primary">Pets</span> as if They Were Our Own
                </h1>
                <p className="text-lg leading-8 text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0">
                  Comprehensive veterinary services provided by a dedicated team of professionals. We ensure your furry friends lead happy, healthy lives with our state-of-the-art facilities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/register">
                    <Button size="lg" className="w-full sm:w-auto gap-2">
                      Book an Appointment <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#services">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      View Services
                    </Button>
                  </Link>
                </div>
                <div className="mt-10 flex items-center justify-center lg:justify-start gap-8 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Experienced Vets</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                {/* Abstract decorative elements */}
                <div className="absolute top-0 right-0 -z-10 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -z-10 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl"></div>

                {/* Mockup or Illustration Placeholder - using CSS grid for visual interest */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 pt-10">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border">
                      <Stethoscope className="h-8 w-8 text-blue-500 mb-4" />
                      <h3 className="font-semibold mb-2">Checkups</h3>
                      <p className="text-sm text-muted-foreground">Regular health monitoring</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border">
                      <Activity className="h-8 w-8 text-green-500 mb-4" />
                      <h3 className="font-semibold mb-2">Surgery</h3>
                      <p className="text-sm text-muted-foreground">Advanced procedures</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border">
                      <Syringe className="h-8 w-8 text-purple-500 mb-4" />
                      <h3 className="font-semibold mb-2">Vaccines</h3>
                      <p className="text-sm text-muted-foreground">Preventive care</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border">
                      <Users className="h-8 w-8 text-orange-500 mb-4" />
                      <h3 className="font-semibold mb-2">Dental</h3>
                      <p className="text-sm text-muted-foreground">Professional cleaning</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-white dark:bg-slate-950">
          <div className="container px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Services</h2>
              <p className="text-lg text-muted-foreground">
                We offer a wide range of veterinary services to ensure the best care for your pets.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'General Checkup', icon: Stethoscope, desc: 'Comprehensive nose-to-tail physical examinations.' },
                { title: 'Vaccination', icon: Syringe, desc: 'Essential protection against common diseases.' },
                { title: 'Surgery', icon: Activity, desc: 'Soft tissue and orthopedic surgical procedures.' },
                { title: 'Dental Care', icon: Heart, desc: 'Cleaning, polishing, and dental health management.' },
                { title: 'Laboratory', icon: Calendar, desc: 'In-house diagnostics for quick and accurate results.' },
                { title: 'Emergency', icon: Users, desc: 'Urgent care for critical situations during clinic hours.' },
              ].map((service, index) => (
                <Card key={index} className="transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{service.desc}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Ready to Give Your Pet the Best Care?</h2>
            <p className="text-lg mb-10 opacity-90 max-w-2xl mx-auto">
              Join thousands of satisfied pet owners who trust SKG Animal Clinic. Schedule your first appointment today.
            </p>
            <Link href="/register">
              <Button size="lg" variant="secondary" className="gap-2">
                Create Account <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-50 dark:bg-slate-900 border-t py-12">
          <div className="container grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl">
                <Heart className="h-6 w-6 text-primary" />
                SKG Animal Clinic
              </div>
              <p className="text-sm text-muted-foreground">
                Providing compassionate care for animals since 2010. Your pet's health is our top priority.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary">Services</Link></li>
                <li><Link href="#" className="hover:text-primary">Doctors</Link></li>
                <li><Link href="#" className="hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <address className="text-sm text-muted-foreground not-italic space-y-2">
                <p>123 Vet Street, Pet City</p>
                <p>contact@skgclinic.com</p>
                <p>+1 (555) 123-4567</p>
              </address>
            </div>
          </div>
          <div className="container mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} SKG Animal Clinic. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  )
}
