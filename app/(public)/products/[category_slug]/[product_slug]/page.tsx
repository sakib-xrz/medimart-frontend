"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  FileText,
  Heart,
  Info,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Thermometer,
  Truck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Container from "@/components/shared/container";

const productData = {
  name: "Vitamin C 1000mg Tablets",
  price: 80.0,
  category: "Supplements",
  dosage: "1000mg",
  form: "Tablet",
  packSize: "60 tablets per pack",
  manufacturer: "NutriHealth",
  description: "Boosts immune system and skin health.",
  id: "med-13",
  requiresPrescription: false,
  inStock: true,
  maxQuantity: 3,
};

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = productData.maxQuantity || 5;

  const increaseQuantity = () => {
    setQuantity((prev) => (prev < maxQuantity ? prev + 1 : prev));
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  return (
    <main className="flex-1 bg-muted/30">
      <Container className="px-4 md:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="mx-2 h-4 w-4" />
          <Link href="/products" className="hover:text-primary">
            Products
          </Link>
          <ChevronRight className="mx-2 h-4 w-4" />
          <Link
            href={`/products/${productData.category.toLowerCase().replace(/\s+/g, "-")}`}
            className="hover:text-primary"
          >
            {productData.category}
          </Link>
          <ChevronRight className="mx-2 h-4 w-4" />
          <span className="text-foreground">{productData.name}</span>
        </nav>

        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </div>

        {/* Product Header */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Product Info Column */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{productData.category}</Badge>
              {productData.requiresPrescription && (
                <Badge
                  variant="outline"
                  className="border-red-400 text-red-500"
                >
                  Prescription Required
                </Badge>
              )}
              {!productData.inStock && (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
              {productData.inStock && (
                <Badge
                  variant="outline"
                  className="border-green-400 text-green-600"
                >
                  In Stock
                </Badge>
              )}
            </div>

            <h1 className="mb-2 text-3xl font-bold tracking-tight">
              {productData.name}
            </h1>

            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Package className="h-4 w-4" />
                <span>{productData.packSize}</span>
              </div>
            </div>

            <div className="mb-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4 text-primary" />
                <span>{productData.form}</span>
              </div>
              <div className="flex items-center gap-1">
                <Thermometer className="h-4 w-4 text-primary" />
                <span>{productData.dosage}</span>
              </div>
              <div className="flex items-center gap-1">
                <Info className="h-4 w-4 text-primary" />
                <span>Manufactured by {productData.manufacturer}</span>
              </div>
            </div>

            <p className="mb-6 text-muted-foreground">
              {productData.description}
            </p>

            {/* Price and Add to Cart */}
            <div className="mb-8 flex flex-col gap-4 rounded-lg bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-3xl font-bold text-primary">
                  BDT {productData.price.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-r-none"
                    onClick={decreaseQuantity}
                    disabled={!productData.inStock || quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease quantity</span>
                  </Button>
                  <div className="flex h-10 w-16 items-center justify-center border border-x-0 border-input text-lg">
                    {quantity}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-l-none"
                    onClick={increaseQuantity}
                    disabled={!productData.inStock || quantity >= maxQuantity}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                  {quantity === maxQuantity && (
                    <div className="ml-2 flex items-center text-xs text-amber-600">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Max quantity
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="lg"
                    className="gap-2"
                    disabled={!productData.inStock}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-[42px] w-[42px]"
                  >
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Add to wishlist</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
                <Truck className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Fast Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    Free delivery on orders over BDT 1000. Delivered within
                    24-48 hours.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
                <ShieldCheck className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Genuine Products</h3>
                  <p className="text-sm text-muted-foreground">
                    All medicines are sourced directly from authorized
                    manufacturers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Prescription Alert */}
            {productData.requiresPrescription && (
              <Alert className="mb-6 border-amber-200 bg-amber-50 text-amber-800">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Prescription Required</AlertTitle>
                <AlertDescription>
                  This medication requires a valid prescription. Please upload
                  your prescription during checkout.
                </AlertDescription>
              </Alert>
            )}

            {/* Quick Info Card */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Product ID
                  </span>
                  <span className="font-medium">{productData.id}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Form</span>
                  <span className="font-medium">{productData.form}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Dosage</span>
                  <span className="font-medium">{productData.dosage}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Pack Size
                  </span>
                  <span className="font-medium">{productData.packSize}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Manufacturer
                  </span>
                  <span className="font-medium">
                    {productData.manufacturer}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
}
