import Container from "@/components/shared/container";
import {
  Clock,
  HeartPulse,
  Pill,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="bg-background" id="about">
      <Container className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Why Choose Us
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Healthcare Made Simple
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              We&apos;re committed to making healthcare accessible, affordable,
              and convenient for everyone.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Pill className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Quality Medicines</h3>
            <p className="text-sm text-muted-foreground">
              All our products are sourced from certified manufacturers and
              undergo strict quality checks.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Fast Delivery</h3>
            <p className="text-sm text-muted-foreground">
              Get your medicines delivered to your doorstep within 24-48 hours
              of placing your order.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Secure Payments</h3>
            <p className="text-sm text-muted-foreground">
              Multiple secure payment options available for your convenience and
              peace of mind.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Expert Consultation</h3>
            <p className="text-sm text-muted-foreground">
              Get advice from our team of qualified pharmacists for your
              medication queries.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <HeartPulse className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Health Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Track your medication schedule and health progress with our
              easy-to-use tools.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">24/7 Support</h3>
            <p className="text-sm text-muted-foreground">
              Our customer support team is available round the clock to assist
              you with any issues.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
