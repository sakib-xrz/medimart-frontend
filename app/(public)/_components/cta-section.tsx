import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "@/components/shared/container";

export function CTASection() {
  return (
    <section className="bg-primary py-12 text-primary-foreground" id="contact">
      <Container className="px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Experience Better Healthcare?
              </h2>
              <p className="max-w-[600px] md:text-xl">
                Join thousands of satisfied customers who trust Medi Mart for
                their healthcare needs. Sign up today and get 10% off your first
                order.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" variant="secondary" className="gap-1">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 rounded-lg bg-primary-foreground/10 p-6 lg:p-8">
            <div className="space-y-2 text-center">
              <h3 className="text-2xl font-bold">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-primary-foreground/80">
                Stay updated with the latest health tips, product launches, and
                exclusive offers.
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  placeholder="Enter your email"
                  className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60"
                />
                <Button variant="secondary">Subscribe</Button>
              </div>
              <p className="text-center text-xs text-primary-foreground/70">
                By subscribing, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
