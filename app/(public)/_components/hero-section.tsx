import Image from "next/image";
import { ArrowRight, Clock, ShieldCheck, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import Container from "@/components/shared/container";
import hero from "@/public/hero.png";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-8">
      <Container className="px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="order-2 flex flex-col justify-center space-y-4 lg:order-1">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Your Health, Our <span className="text-primary">Priority</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Quality medicines delivered to your doorstep. Fast, reliable,
                and secure online pharmacy service.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="gap-1">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                View Categories
              </Button>
            </div>
            <div className="flex flex-wrap justify-evenly gap-2 pt-4 lg:gap-4">
              <div className="flex w-fit items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Free Delivery</span>
              </div>
              <div className="flex w-fit items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Genuine Products</span>
              </div>
              <div className="flex w-fit items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
          <div className="order-1 flex items-center justify-center lg:order-2 lg:justify-end">
            <div className="relative">
              <Image
                src={hero}
                alt="Medicine Delivery"
                className="object-cover"
                quality={100}
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
