"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { calculateDiscountedPrice } from "@/lib/utils";
import Container from "@/components/shared/container";

// Mock cart data - in a real app, this would come from a state management solution
const initialCartItems = [
  {
    id: "67cb1d68714acf32241d5140",
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
    quantity: 2,
    in_stock: true,
    expiry_date: "2027-05-18T00:00:00.000Z",
  },
  {
    id: "67cb1d68714acf32241d513e",
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
    quantity: 1,
    in_stock: true,
    expiry_date: "2026-06-20T00:00:00.000Z",
  },
  {
    id: "67cb1d68714acf32241d5149",
    name: "Amoxicillin 500mg",
    slug: "med-k57l89",
    price: 180,
    category: "Antibiotics",
    category_slug: "antibiotics",
    dosage: "500mg",
    form: "Capsule",
    description: "Broad-spectrum antibiotic for bacterial infections.",
    requires_prescription: true,
    discount: 0,
    discount_type: "PERCENTAGE",
    quantity: 1,
    in_stock: true,
    expiry_date: "2025-07-10T00:00:00.000Z",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Check if any item requires a prescription
  const requiresPrescription = cartItems.some(
    (item) => item.requires_prescription,
  );

  // Calculate cart totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = calculateDiscountedPrice({
        price: item.price,
        discount: item.discount,
        discount_type: item.discount_type,
      });
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shippingFee = 60;
  const total = subtotal + shippingFee;

  // Update item quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <main className="flex-1 bg-muted/30 py-8 md:py-12">
      <Container>
        <h1 className="mb-6 text-3xl font-bold tracking-tight">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="rounded-lg border bg-card p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
            <p className="mb-6 text-muted-foreground">
              Looks like you haven&apos;t added any products to your cart yet.
            </p>
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {requiresPrescription && (
                    <Alert className="mb-4 border-amber-200 bg-amber-50 text-amber-800">
                      <AlertDescription className="flex items-start gap-2">
                        <div>
                          <AlertCircle className="mt-0.5 size-4" />
                        </div>
                        One or more items in your cart require a prescription.
                        You&apos;ll need to upload a valid prescription during
                        checkout.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-4">
                    {cartItems.map((item) => {
                      const itemPrice = calculateDiscountedPrice({
                        price: item.price,
                        discount: item.discount,
                        discount_type: item.discount_type,
                      });
                      const hasDiscount =
                        item.discount > 0 && itemPrice < item.price;

                      return (
                        <div key={item.id} className="rounded-lg border p-4">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="flex-1 space-y-1">
                              <div className="flex flex-wrap-reverse items-center gap-2">
                                <h3 className="font-medium">{item.name}</h3>
                                {item.requires_prescription && (
                                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                                    Prescription Required
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-muted-foreground">
                                <span>{item.form}</span>
                                <span>•</span>
                                <span>{item.dosage}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {hasDiscount ? (
                                  <>
                                    <span className="font-medium text-primary">
                                      BDT {itemPrice.toFixed(2)}
                                    </span>
                                    <span className="text-sm text-muted-foreground line-through">
                                      BDT {item.price.toFixed(2)}
                                    </span>
                                  </>
                                ) : (
                                  <span className="font-medium text-primary">
                                    BDT {item.price.toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-r-none"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                  <span className="sr-only">
                                    Decrease quantity
                                  </span>
                                </Button>
                                <div className="flex h-8 w-12 items-center justify-center border border-x-0 border-input">
                                  {item.quantity}
                                </div>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-l-none"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                >
                                  <Plus className="h-3 w-3" />
                                  <span className="sr-only">
                                    Increase quantity
                                  </span>
                                </Button>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:bg-destructive-foreground hover:text-destructive"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                                <span className="sr-only">Remove item</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>BDT {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>BDT ${shippingFee.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>BDT {total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full gap-2">
                    <Link href="/checkout">
                      Proceed to Checkout <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
