"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/container";
import ProductCard from "./product-card";
import { useGetFeaturedProductsQuery } from "@/redux/features/product/productApi";
import ProductCardSkeleton from "./product-card-skeleton";

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  category_slug: string;
  dosage: string;
  form: string;
  description: string;
  requires_prescription: boolean;
  discount: number;
  discount_type: string;
  stock: number;
  in_stock: boolean;
  expiry_date: string;
}

export function ProductsSection() {
  const { data: productData, isLoading: productLoading } =
    useGetFeaturedProductsQuery({});

  const products = productData?.data || [];

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
          {productLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : products?.map((product: IProduct) => (
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
