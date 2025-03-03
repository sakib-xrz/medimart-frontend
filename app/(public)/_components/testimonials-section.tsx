import Image from "next/image";
import { Star } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Container from "@/components/shared/container";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Customer",
      content:
        "Medi Mart has been my go-to pharmacy for the past year. Their delivery is always on time, and the medicines are genuine. The customer service is exceptional!",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Chronic Patient",
      content:
        "As someone who needs regular medication, Medi Mart has made my life so much easier. Their subscription service ensures I never run out of my essential medicines.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "New Customer",
      content:
        "I was skeptical about ordering medicines online, but Medi Mart exceeded my expectations. The packaging was secure, and they even followed up to ensure I received everything correctly.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4,
    },
  ];

  return (
    <section className="bg-background">
      <Container className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              What Our Customers Say
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Don&apos;t just take our word for it. Here&apos;s what our
              customers have to say about their experience with Medi Mart.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={"https://avatar.iran.liara.run/public"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-muted-foreground">{testimonial.content}</p>
              </CardContent>
              <CardFooter>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? "fill-primary text-primary" : "text-muted"}`}
                    />
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
