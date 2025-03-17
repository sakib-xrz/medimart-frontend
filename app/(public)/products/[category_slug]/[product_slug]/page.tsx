"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  Clock,
  FileText,
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
import { calculateDiscountedPrice, cn, formatExpiryDate } from "@/lib/utils";
import Container from "@/components/shared/container";
import { useGetProductDetailQuery } from "@/redux/features/product/productApi";
import ProductDetailsSkeleton from "./_components/product-details-skeleton";
import { useDispatch } from "react-redux";
import { addToCart, useCartProduct } from "@/redux/features/cart/cartSlice";

export default function ProductDetailsPage({
  params,
}: {
  params: {
    category_slug: string;
    product_slug: string;
  };
}) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const product_slug = params.product_slug;
  const { data, isLoading } = useGetProductDetailQuery(product_slug);
  const productData = data?.data || {};

  // Get cart status using the product id from productData
  const productId = productData?._id;
  const cartProduct = useCartProduct(productId);
  const isProductExistInCart = !!cartProduct;

  useEffect(() => {
    setQuantity(cartProduct?.quantity || 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData]);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  const increaseQuantity = () => {
    setQuantity((prev) => (prev < productData.stock ? prev + 1 : prev));
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const discountedPrice = calculateDiscountedPrice(productData);
  const hasDiscount =
    productData.discount > 0 && discountedPrice < productData.price;

  const isExpiringSoon = () => {
    const expiryDate = new Date(productData.expiry_date);
    const today = new Date();
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(today.getMonth() + 3);
    return expiryDate <= threeMonthsFromNow && expiryDate > today;
  };

  const isExpired = () => {
    const expiryDate = new Date(productData.expiry_date);
    const today = new Date();
    return expiryDate < today;
  };

  // Check if product is available for purchase
  const isAvailableForPurchase = () => {
    return productData.in_stock && !isExpired();
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product: { id: productData._id, quantity } }));
  };

  return (
    <main className="flex-1 bg-muted/30">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center whitespace-nowrap text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="mx-2 h-4 w-4" />
          <Link href="/products" className="hover:text-primary">
            Products
          </Link>
          <ChevronRight className="mx-2 h-4 w-4" />
          <Link
            href={`/products/${productData.category_slug}`}
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
        <div className="mb-8 grid gap-8 lg:grid-cols-3">
          {/* Product Info Column */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{productData.category}</Badge>
              {isExpired() && <Badge variant="destructive">Expired</Badge>}
              {!isExpired() && !productData.in_stock && (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
              {productData.requires_prescription && (
                <Badge variant="outline">Prescription Required</Badge>
              )}
              {!isExpired() && productData.in_stock && hasDiscount && (
                <Badge className="border-green-600 bg-green-600 text-white hover:border-green-500/90 hover:bg-green-500/90">
                  {productData.discount_type === "PERCENTAGE"
                    ? `${productData.discount}% Off`
                    : `BDT ${productData.discount} Off`}
                </Badge>
              )}
            </div>

            <h1 className="mb-2 text-3xl font-bold tracking-tight">
              {productData.name}
            </h1>

            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Package className="h-4 w-4" />
                <span>{productData.pack_size}</span>
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
              {/* Expiry date information */}
              <div
                className={cn(
                  "flex items-center gap-1",
                  isExpiringSoon() && "text-amber-600",
                  isExpired() && "text-red-600",
                )}
              >
                <Clock className="h-4 w-4" />
                <span>
                  {isExpired()
                    ? `Expired on ${formatExpiryDate(productData.expiry_date)}`
                    : `Expires: ${formatExpiryDate(productData.expiry_date)}`}
                </span>
              </div>
            </div>

            <p className="mb-6 text-muted-foreground">
              {productData.description}
            </p>

            {/* Price and Add to Cart */}
            <div className="mb-8 flex flex-col gap-4 rounded-lg bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <div className="flex items-center gap-2">
                  {hasDiscount && !isExpired() && productData.in_stock ? (
                    <>
                      <p className="text-3xl font-bold text-primary">
                        BDT {discountedPrice.toFixed(2)}
                      </p>
                      <p className="text-lg text-muted-foreground line-through">
                        BDT {productData.price.toFixed(2)}
                      </p>
                    </>
                  ) : (
                    <p className="text-3xl font-bold text-primary">
                      BDT {productData.price.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <div className="flex items-center">
                  {quantity === productData.stock && (
                    <div className="ml-2 mr-4 flex items-center text-xs text-amber-600">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Max quantity
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-r-none"
                    onClick={decreaseQuantity}
                    disabled={
                      !isAvailableForPurchase() ||
                      quantity <= 1 ||
                      isProductExistInCart
                    }
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
                    disabled={
                      !isAvailableForPurchase() ||
                      quantity >= productData.stock ||
                      isProductExistInCart
                    }
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="lg"
                    className="gap-2"
                    disabled={!isAvailableForPurchase() || isProductExistInCart}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {isProductExistInCart ? "Added to Cart" : "Add to Cart"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
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
            {/* Availability Alert */}
            {isExpired() ? (
              <Alert className="mb-6 border-red-200 bg-red-50 text-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="flex items-center gap-2">
                  <div>
                    <AlertCircle className="size-4" />
                  </div>{" "}
                  Product Expired
                </AlertTitle>
                <AlertDescription>
                  This product has expired and is not available for purchase.
                </AlertDescription>
              </Alert>
            ) : !productData.in_stock ? (
              <Alert className="mb-6 border-red-200 bg-red-50 text-red-800">
                <AlertTitle className="flex items-center gap-2">
                  <div>
                    <AlertCircle className="size-4" />
                  </div>{" "}
                  Out of Stock
                </AlertTitle>
                <AlertDescription>
                  This product is currently out of stock. Please check back
                  later.
                </AlertDescription>
              </Alert>
            ) : productData.requires_prescription ? (
              <Alert className="mb-6 border-amber-200 bg-amber-50 text-amber-800">
                <AlertTitle className="flex items-center gap-2">
                  <div>
                    <AlertCircle className="size-4" />
                  </div>{" "}
                  Prescription Required
                </AlertTitle>
                <AlertDescription>
                  This medication requires a valid prescription. Please upload
                  your prescription during checkout.
                </AlertDescription>
              </Alert>
            ) : null}

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
                  <span className="font-medium">{productData.slug}</span>
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
                  <span className="font-medium">{productData.pack_size}</span>
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
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Stock</span>
                  <span
                    className={cn(
                      "font-medium",
                      productData.stock < 10
                        ? "text-amber-600"
                        : "text-green-600",
                      productData.stock === 0 && "text-destructive",
                    )}
                  >
                    {productData.stock} units
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
