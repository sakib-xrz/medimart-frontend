import Link from "next/link";
import { Award, Clock, Heart, Shield, Star, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Container from "@/components/shared/container";

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-primary/10 py-12">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              About Medi Mart
            </h1>
            <p className="mt-4 text-muted-foreground md:text-xl">
              Your trusted partner in healthcare, delivering quality medicines
              and wellness products to your doorstep.
            </p>
          </div>
        </Container>
      </section>

      {/* Our Story Section */}
      <section className="py-12">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2015, Medi Mart began with a simple mission: to make
                healthcare accessible to everyone. What started as a small
                pharmacy in the heart of the city has now grown into a
                nationwide online platform serving thousands of customers daily.
              </p>
              <p>
                Our journey began when our founder, Dr. Sarah Rahman, noticed
                how difficult it was for many people to access quality
                medicines, especially those with mobility issues or living in
                remote areas. Combining her medical expertise with a passion for
                technology, she created Medi Mart to bridge this gap.
              </p>
              <p>
                Over the years, we&apos;ve expanded our services and product
                range, but our core values remain unchanged. We believe that
                everyone deserves access to quality healthcare products at
                affordable prices, delivered with care and compassion.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Mission Section */}
      <section className="bg-muted/30 py-12">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
              Our Mission
            </h2>
            <p className="text-xl font-medium">
              &quot;To enhance the quality of life by making healthcare
              accessible, affordable, and convenient for everyone.&quot;
            </p>
            <Separator className="mx-auto my-8 w-16 bg-primary" />
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <Heart className="mb-4 h-10 w-10 text-primary" />
                <h3 className="text-lg font-semibold">Care</h3>
                <p className="text-center text-sm text-muted-foreground">
                  We put our customer&apos;s health and wellbeing at the center
                  of everything we do.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="mb-4 h-10 w-10 text-primary" />
                <h3 className="text-lg font-semibold">Quality</h3>
                <p className="text-center text-sm text-muted-foreground">
                  We ensure all our products meet the highest standards of
                  quality and safety.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="mb-4 h-10 w-10 text-primary" />
                <h3 className="text-lg font-semibold">Convenience</h3>
                <p className="text-center text-sm text-muted-foreground">
                  We make healthcare accessible anytime, anywhere with fast and
                  reliable delivery.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Team Section */}
      <section className="py-12">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-center text-2xl font-bold tracking-tight sm:text-3xl">
              Our Leadership Team
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Dr. Sarah Rahman</CardTitle>
                  <p className="text-sm text-primary">Founder & CEO</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A pharmacist with over 15 years of experience, Dr. Rahman
                    combines her medical expertise with business acumen to lead
                    Medi Mart&apos;s mission of making healthcare accessible to
                    all.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Dr. Ahmed Khan</CardTitle>
                  <p className="text-sm text-primary">Chief Medical Officer</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    With a background in public health, Dr. Khan oversees our
                    medical advisory board and ensures all our health
                    information and product recommendations are accurate and
                    up-to-date.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Fatima Jahan</CardTitle>
                  <p className="text-sm text-primary">
                    Chief Operations Officer
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Fatima brings over a decade of experience in supply chain
                    management, ensuring our operations run smoothly and
                    customers receive their orders promptly and accurately.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Mohammad Hasan</CardTitle>
                  <p className="text-sm text-primary">
                    Chief Technology Officer
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A tech innovator with a passion for healthcare, Mohammad
                    leads our digital transformation, creating seamless online
                    experiences that make healthcare more accessible.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Achievements Section */}
      <section className="bg-muted/30 py-12">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-10 text-center text-2xl font-bold tracking-tight sm:text-3xl">
              Our Achievements
            </h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Award className="mt-1 h-8 w-8 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">
                    Best Online Pharmacy 2023
                  </h3>
                  <p className="text-muted-foreground">
                    Recognized for our exceptional service, product quality, and
                    customer satisfaction by the National Healthcare
                    Association.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="mt-1 h-8 w-8 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">
                    1 Million+ Customers Served
                  </h3>
                  <p className="text-muted-foreground">
                    We&apos;re proud to have helped over a million customers
                    access quality healthcare products since our founding.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Star className="mt-1 h-8 w-8 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">
                    4.8/5 Customer Satisfaction Rating
                  </h3>
                  <p className="text-muted-foreground">
                    Our commitment to excellence is reflected in our
                    consistently high customer satisfaction ratings across all
                    platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
              Join Our Journey
            </h2>
            <p className="mb-8 text-muted-foreground">
              We&apos;re on a mission to transform healthcare access. Whether
              you&apos;re a customer, partner, or potential team member,
              we&apos;d love to connect with you.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
