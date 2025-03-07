"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, Minus, Plus, ShoppingCart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface ProductCardProps {
  product: {
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
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prev) => (prev < product.stock ? prev + 1 : prev));
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-lg shadow-sm">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="mb-2">
            {product.category}
          </Badge>
          {product.requires_prescription && (
            <Badge
              variant="outline"
              className="mb-2 border-red-400 text-red-500"
            >
              Prescription Required
            </Badge>
          )}
          {!product.in_stock && (
            <Badge variant="destructive" className="mb-2">
              Out of Stock
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 py-0">
        <h3 className="mb-1 line-clamp-1 text-sm font-semibold sm:text-base">
          {product.name}
        </h3>
        <div className="mb-2 flex flex-wrap gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <span>{product.form}</span>
          <span>•</span>
          <span>{product.dosage}</span>
        </div>
        <p className="mb-2 line-clamp-2 text-xs">{product.description}</p>
        <p className="text-lg font-medium text-primary">
          BDT {product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="mt-auto p-4 pt-0">
        <div className="flex w-full flex-col gap-3">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={decreaseQuantity}
              disabled={!product.in_stock || quantity <= 1}
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
              disabled={!product.in_stock || quantity >= product.stock}
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
              disabled={!product.in_stock}
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
