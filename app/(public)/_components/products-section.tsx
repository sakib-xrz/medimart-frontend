import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/shared/container";
import placeholder from "@/public/placeholder.jpg";

export function ProductsSection() {
  const products = [
    {
      name: "Vitamin C Complex",
      description: "Immune support supplement with added zinc and elderberry",
      price: 19.99,
      category: "Supplements",
      badge: "Bestseller",
      link: "#",
    },
    {
      name: "Digital Thermometer",
      description: "Fast reading digital thermometer with fever alert",
      price: 12.99,
      category: "Medical Devices",
      badge: "New",
      link: "#",
    },
    {
      name: "Pain Relief Gel",
      description: "Fast-acting topical gel for muscle and joint pain relief",
      price: 15.99,
      category: "Over-the-Counter",
      badge: null,
      link: "#",
    },
    {
      name: "First Aid Kit",
      description:
        "Comprehensive first aid kit for home and travel emergencies",
      price: 29.99,
      category: "Medical Supplies",
      badge: "Essential",
      link: "#",
    },
  ];

  return (
    <section className="bg-background" id="products">
      <Container className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Featured Products
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Popular Health Products
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Discover our most popular and highly-rated healthcare products.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative px-4 pt-4">
                  <Badge
                    className="absolute right-3 top-3 z-10"
                    variant={"secondary"}
                  >
                    {product.category}
                  </Badge>

                  <div className="aspect-square rounded-lg">
                    <Image src={placeholder} alt={product.name} fill />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="line-clamp-1 font-semibold">{product.name}</h3>
                  <span className="font-bold text-primary">
                    ${product.price}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <div className="flex w-full gap-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Link href={product.link} className="w-full">
                    <Button size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link href="#">
            <Button variant="outline" className="gap-1">
              View All Products <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
