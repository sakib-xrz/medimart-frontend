import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Container from "@/components/shared/container";
import placeholder from "@/public/placeholder.jpg";

export function CategoriesSection() {
  const categories = [
    {
      title: "Prescription Medicines",
      description:
        "Authorized medications prescribed by healthcare professionals",
      link: "#",
    },
    {
      title: "Over-the-Counter",
      description:
        "Medicines available without a prescription for common ailments",
      link: "#",
    },
    {
      title: "Health Supplements",
      description: "Vitamins, minerals, and supplements for overall wellbeing",
      link: "#",
    },
    {
      title: "Personal Care",
      description: "Products for personal hygiene and skincare needs",
      link: "#",
    },
    {
      title: "Medical Devices",
      description:
        "Equipment and devices for monitoring and managing health conditions",
      link: "#",
    },
    {
      title: "Baby Care",
      description: "Essential products for infant health and wellbeing",
      link: "#",
    },
  ];

  return (
    <section className="bg-muted/30" id="categories">
      <Container className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Browse Categories
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Find What You Need
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Explore our wide range of healthcare products categorized for easy
              navigation.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="rounded-lg">
                  <Image
                    src={placeholder}
                    alt={category.title}
                    className="h-48 w-full object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2 text-xl">{category.title}</CardTitle>
                <p className="line-clamp-1 text-sm text-muted-foreground">
                  {category.description}
                </p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link href={category.link} className="w-full">
                  <Button variant="outline" className="w-full justify-between">
                    View Products <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
