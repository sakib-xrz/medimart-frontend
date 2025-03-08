import Link from "next/link";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Container from "@/components/shared/container";

export default function ContactPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-primary/10 py-12 md:py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Contact Us
            </h1>
            <p className="mt-4 text-muted-foreground md:text-xl">
              We&apos;re here to help. Reach out to us with any questions,
              concerns, or feedback.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Information Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">Send Us a Message</h2>

              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please provide details about your inquiry..."
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="mt-1 h-5 w-5 text-primary" />
                        <div>
                          <h3 className="font-medium">Address</h3>
                          <p className="text-sm text-muted-foreground">
                            123 Health Street, Medical District
                            <br />
                            Dhaka, Bangladesh
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="mt-1 h-5 w-5 text-primary" />
                        <div>
                          <h3 className="font-medium">Phone</h3>
                          <p className="text-sm text-muted-foreground">
                            +880 1234 567890
                          </p>
                          <p className="text-sm text-muted-foreground">
                            +880 9876 543210 (Toll-free)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="mt-1 h-5 w-5 text-primary" />
                        <div>
                          <h3 className="font-medium">Email</h3>
                          <p className="text-sm text-muted-foreground">
                            support@medimart.com
                          </p>
                          <p className="text-sm text-muted-foreground">
                            info@medimart.com
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="mt-1 h-5 w-5 text-primary" />
                        <div>
                          <h3 className="font-medium">Business Hours</h3>
                          <p className="text-sm text-muted-foreground">
                            Monday - Friday: 9:00 AM - 8:00 PM
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Saturday: 10:00 AM - 6:00 PM
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Sunday: Closed
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-semibold">Connect With Us</h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" asChild>
                    <Link href="#" aria-label="Facebook">
                      <Facebook className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="#" aria-label="Twitter">
                      <Twitter className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="#" aria-label="Instagram">
                      <Instagram className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 py-12 md:py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-2xl font-bold tracking-tight sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How can I track my order?</AccordionTrigger>
                <AccordionContent>
                  You can track your order by logging into your account and
                  visiting the &quot;My Orders&quot; section. Alternatively, you
                  can use the tracking number provided in your order
                  confirmation email.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  We accept returns within 14 days of delivery for most
                  products, provided they are unused and in their original
                  packaging. Please note that certain items like medications
                  cannot be returned due to safety regulations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Do you offer international shipping?
                </AccordionTrigger>
                <AccordionContent>
                  Currently, we only ship within Bangladesh. We&apos;re working
                  on expanding our services to neighboring countries in the near
                  future.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  How do I upload a prescription?
                </AccordionTrigger>
                <AccordionContent>
                  You can upload your prescription during the checkout process.
                  Simply select the &quot;Upload Prescription&quot; option and
                  follow the instructions to attach a clear image of your valid
                  prescription.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  What payment methods do you accept?
                </AccordionTrigger>
                <AccordionContent>
                  We accept various payment methods including credit/debit
                  cards, mobile banking (bKash, Nagad), and cash on delivery for
                  select areas.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Can&apos;t find what you&apos;re looking for? Contact our
                customer support team.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
