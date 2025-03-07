import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/container";
import ProductCard from "./product-card";

export function ProductsSection() {
  const products = [
    {
      _id: "67cb1d68714acf32241d5140",
      name: "Medical Tape",
      slug: "med-b74fc3",
      price: 90,
      category: "First Aid",
      category_slug: "first-aid",
      dosage: "N/A",
      form: "Roll",
      description: "Hypoallergenic adhesive medical tape.",
      requires_prescription: false,
      discount: 5,
      discount_type: "PERCENTAGE",
      stock: 45,
      in_stock: true,
      expiry_date: "2027-05-18T00:00:00.000Z",
    },
    {
      _id: "67cb1d68714acf32241d513d",
      name: "Antiseptic Wipes",
      slug: "med-607e16",
      price: 100,
      category: "First Aid",
      category_slug: "first-aid",
      dosage: "N/A",
      form: "Wipes",
      description: "Alcohol-based antiseptic wipes for cleaning wounds.",
      requires_prescription: false,
      discount: 0,
      discount_type: "PERCENTAGE",
      stock: 75,
      in_stock: true,
      expiry_date: "2026-09-15T00:00:00.000Z",
    },
    {
      _id: "67cb1d68714acf32241d513f",
      name: "Sterile Gauze Pads",
      slug: "med-86c788",
      price: 180,
      category: "First Aid",
      category_slug: "first-aid",
      dosage: "N/A",
      form: "Pad",
      description: "Sterile gauze pads for dressing wounds.",
      requires_prescription: false,
      discount: 0,
      discount_type: "PERCENTAGE",
      stock: 60,
      in_stock: true,
      expiry_date: "2027-03-25T00:00:00.000Z",
    },
    {
      _id: "67cb1d68714acf32241d513e",
      name: "Hydrogen Peroxide Solution 3%",
      slug: "med-a1b583",
      price: 120,
      category: "First Aid",
      category_slug: "first-aid",
      dosage: "3%",
      form: "Liquid",
      description: "Disinfects cuts, wounds, and minor burns.",
      requires_prescription: false,
      discount: 10,
      discount_type: "PERCENTAGE",
      stock: 40,
      in_stock: true,
      expiry_date: "2026-06-20T00:00:00.000Z",
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
        <div className="mx-auto mt-12 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
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
