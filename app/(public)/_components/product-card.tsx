"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, Clock, Minus, Plus, ShoppingCart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { calculateDiscountedPrice, cn, formatExpiryDate } from "@/lib/utils";
import { IProduct } from "./products-section";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prev) => (prev < product.stock ? prev + 1 : prev));
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const discountedPrice = calculateDiscountedPrice(product);
  const hasDiscount = product.discount > 0 && discountedPrice < product.price;

  const isExpiringSoon = () => {
    const expiryDate = new Date(product.expiry_date);
    const today = new Date();
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(today.getMonth() + 3);

    return expiryDate <= threeMonthsFromNow && expiryDate > today;
  };

  const isExpired = () => {
    const expiryDate = new Date(product.expiry_date);
    const today = new Date();
    return expiryDate < today;
  };

  // Check if product is available for purchase
  const isAvailableForPurchase = () => {
    return product.in_stock && !isExpired();
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-lg shadow-sm">
      <CardHeader className="p-4 pb-0">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{product.category}</Badge>

            {/* Primary status badge - show the most critical status */}
            {isExpired() && <Badge variant="destructive">Expired</Badge>}

            {/* Only show out of stock badge if product is out of stock */}
            {!isExpired() && !product.in_stock && (
              <Badge variant="destructive">Out of Stock</Badge>
            )}

            {/* Only show discount if product is not expired */}
            {!isExpired() && product.in_stock && hasDiscount && (
              <Badge className="border-green-600 bg-green-600 text-white hover:border-green-500/90 hover:bg-green-500/90">
                {product.discount_type === "PERCENTAGE"
                  ? `${product.discount}% Off`
                  : `BDT ${product.discount} Off`}
              </Badge>
            )}
          </div>

          {/* Secondary status badges - show all applicable statuses */}
          <div className="flex gap-1">
            {product.requires_prescription && (
              <Badge variant="outline">Prescription Required</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 pt-3">
        <h3 className="mb-1 line-clamp-1 text-sm font-semibold sm:text-base">
          {product.name}
        </h3>
        <div className="mb-2 flex flex-wrap gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <span>{product.form}</span>
          <span>•</span>
          <span>{product.dosage}</span>
        </div>
        <p className="mb-2 line-clamp-1 text-xs">{product.description}</p>

        {/* Price display with discount */}
        <div className="flex items-center gap-2">
          {hasDiscount && !isExpired() && product.in_stock ? (
            <>
              <p className="text-lg font-medium text-primary">
                BDT {discountedPrice.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground line-through">
                BDT {product.price.toFixed(2)}
              </p>
            </>
          ) : (
            <p className="text-lg font-medium text-primary">
              BDT {product.price.toFixed(2)}
            </p>
          )}
        </div>

        {/* Expiry date information */}
        <div
          className={cn(
            "mt-1 flex items-center text-xs text-muted-foreground",
            isExpiringSoon() && "text-amber-600",
            isExpired() && "text-red-600",
          )}
        >
          <Clock className="mr-1 h-3 w-3" />
          <span>
            {isExpired()
              ? `Expired on ${formatExpiryDate(product.expiry_date)}`
              : `Expires: ${formatExpiryDate(product.expiry_date)}`}
          </span>
        </div>
      </CardContent>
      <CardFooter className="mt-auto p-4 pt-0">
        <div className="flex w-full flex-col gap-3">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={decreaseQuantity}
              disabled={!isAvailableForPurchase() || quantity <= 1}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <div className="flex h-8 w-12 items-center justify-center border border-x-0 border-input">
              {quantity}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={increaseQuantity}
              disabled={!isAvailableForPurchase() || quantity >= product.stock}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
            {quantity === product.stock && (
              <div className="ml-2 flex items-center text-xs text-amber-600">
                <AlertCircle className="mr-1 h-3 w-3" />
                Max quantity
              </div>
            )}
          </div>
          <div className="flex w-full gap-2">
            <Button
              variant="default"
              size="sm"
              className="w-full"
              disabled={!isAvailableForPurchase()}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Link
              href={`/products/${product.category_slug}/${product.slug}`}
              className="w-full"
            >
              <Button variant="outline" size="sm" className="w-full">
                Details
              </Button>
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
