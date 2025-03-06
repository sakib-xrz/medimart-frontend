import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/container";
import ProductCard from "./product-card";

export function ProductsSection() {
  const products = [
    {
      id: "1",
      name: "Ibuprofen",
      description:
        "Non-steroidal anti-inflammatory drug (NSAID) used to relieve pain and reduce inflammation and fever.",
      price: 8.99,
      category: "Pain Relief",
      dosage: "200mg",
      form: "Tablets",
      requiresPrescription: false,
      link: "/medications/ibuprofen",
      inStock: true,
      maxQuantity: 3,
    },
    {
      id: "2",
      name: "Amoxicillin",
      description:
        "Antibiotic used to treat a number of bacterial infections. May cause side effects including diarrhea, rash, nausea, and vomiting.",
      price: 15.99,
      category: "Antibiotics",
      dosage: "500mg",
      form: "Capsules",
      requiresPrescription: true,
      link: "/medications/amoxicillin",
      inStock: true,
    },
    {
      id: "3",
      name: "Cetirizine",
      description:
        "Antihistamine used to relieve allergy symptoms such as watery eyes, runny nose, itching eyes/nose, and sneezing.",
      price: 12.49,
      category: "Allergy",
      dosage: "10mg",
      form: "Tablets",
      requiresPrescription: false,
      link: "/medications/cetirizine",
      inStock: false,
    },
    {
      id: "4",
      name: "Vitamin D3",
      description:
        "Dietary supplement to support bone health, immune function, and overall wellness when sun exposure is limited.",
      price: 9.99,
      category: "Supplements",
      dosage: "1000 IU",
      form: "Softgels",
      requiresPrescription: false,
      link: "/medications/vitamin-d3",
      inStock: true,
    },
  ];

  return (
    <section className="bg-background py-12" id="products">
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
        <div className="mx-auto mt-12 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
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
