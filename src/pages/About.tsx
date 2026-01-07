import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <main className="container mx-auto px-4 md:px-6 py-20 space-y-24">
      {/* Intro */}
      <section className="max-w-3xl space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          About the Platform
        </h1>
        <p className="text-muted-foreground text-lg">
          This Ride Management System is designed to simplify how rides are
          requested, managed, and monitored — providing a unified experience for
          riders, drivers, and administrators.
        </p>
      </section>

      <Separator />

      {/* What We Built */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">What We Built</h2>
          <p className="text-muted-foreground">
            The platform is a full-stack system that handles real-time ride
            requests, driver availability, tracking, and operational control
            through a single, structured workflow.
          </p>
          <p className="text-muted-foreground">
            Instead of isolated features, the system focuses on coordination,
            visibility, and reliability — ensuring every role knows exactly
            what’s happening at every stage of a ride.
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-3">
            <p className="font-medium">Core Capabilities</p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
              <li>Real-time ride requests and matching</li>
              <li>Driver availability and status control</li>
              <li>Centralized admin monitoring</li>
              <li>Clear role-based system access</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Who It’s For */}
      <section className="space-y-10">
        <h2 className="text-2xl font-semibold">Who the System Is For</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 space-y-2">
              <p className="font-medium">Riders</p>
              <p className="text-sm text-muted-foreground">
                Riders can request rides easily, track drivers in real time, and
                access their ride history without confusion.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-2">
              <p className="font-medium">Drivers</p>
              <p className="text-sm text-muted-foreground">
                Drivers manage availability, accept ride requests, and monitor
                earnings through a focused and distraction-free interface.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-2">
              <p className="font-medium">Administrators</p>
              <p className="text-sm text-muted-foreground">
                Admins oversee system activity, manage users, and ensure
                operational consistency across all rides.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Values */}
      <section className="max-w-3xl space-y-6">
        <h2 className="text-2xl font-semibold">Our Approach</h2>
        <p className="text-muted-foreground">
          The system is built with clarity, structure, and scalability in mind.
          Every design and technical decision prioritizes predictability and
          ease of understanding over unnecessary complexity.
        </p>
        <p className="text-muted-foreground">
          The goal is not just to move people — but to manage movement in a way
          that is transparent, controlled, and reliable.
        </p>
      </section>
    </main>
  );
};

export default About;
