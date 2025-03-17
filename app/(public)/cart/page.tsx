"use client";

import { useEffect, useState } from "react";
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
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  useCartProducts,
} from "@/redux/features/cart/cartSlice";
import { useGetCartItemsMutation } from "@/redux/features/cart/cartApi";
import { useDispatch } from "react-redux";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ICartItem {
  _id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  dosage: string;
  form: string;
  description: string;
  requires_prescription: boolean;
  discount: number;
  discount_type: "PERCENTAGE" | "FLAT";
  in_stock: boolean;
  expiry_date: string;
  quantity: number;
}

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useCurrentUser();

  const cartItems = useCartProducts();
  const [getCart] = useGetCartItemsMutation();
  const [localCart, setLocalCart] = useState<ICartItem[]>([]);
  const [localSubtotal, setLocalSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [requiresPrescription, setRequiresPrescription] = useState(false);

  useEffect(() => {
    getCart({ cart_items: cartItems }).then(({ data }) => {
      setLocalCart(data?.data?.products || []);
      setLocalSubtotal(data?.data?.subtotal || 0);
      setShippingFee(data?.data?.shipping_charge || 0);
      setTotal(data?.data?.grand_total || 0);
      setRequiresPrescription(data?.data?.prescription_required || false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  const subtotal = localSubtotal;

  // Check if any item is expired or out of stock
  const hasUnavailableItems = localCart.some((item) => {
    return isExpired(item.expiry_date) || !item.in_stock;
  });

  // Helper function to check if a product is expired
  function isExpired(expiryDate: string): boolean {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  }

  return (
    <main className="flex-1 bg-muted/30">
      <Container>
        <div className="flex items-center justify-between">
          <h1 className="mb-6 text-3xl font-bold tracking-tight">Your Cart</h1>
          {localCart.length > 0 && (
            <p
              className="cursor-pointer text-muted-foreground hover:text-destructive hover:underline"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </p>
          )}
        </div>

        {localCart.length === 0 ? (
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
                  <CardTitle>Cart Items ({localCart.length})</CardTitle>
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

                  {hasUnavailableItems && (
                    <Alert className="mb-4 border-red-200 bg-red-50 text-red-800">
                      <AlertDescription className="flex items-start gap-2">
                        <div>
                          <AlertCircle className="mt-0.5 size-4" />
                        </div>
                        Some items in your cart are expired or out of stock.
                        These items cannot be purchased and should be removed
                        before checkout.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-4">
                    {localCart?.map((item: ICartItem) => {
                      const itemPrice = calculateDiscountedPrice({
                        price: item.price,
                        discount: item.discount,
                        discount_type: item.discount_type,
                      });
                      const hasDiscount =
                        item.discount > 0 && itemPrice < item.price;

                      const itemExpired = isExpired(item.expiry_date);
                      const itemInStock = item.in_stock;
                      const isAvailable = !itemExpired && itemInStock;

                      return (
                        <div key={item._id} className="rounded-lg border p-4">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="flex-1 space-y-1">
                              <div className="flex flex-wrap-reverse items-center gap-2">
                                <h3 className="font-medium">{item.name}</h3>
                                {item.requires_prescription && (
                                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                                    Prescription Required
                                  </span>
                                )}
                                {itemExpired && (
                                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-800">
                                    Expired
                                  </span>
                                )}
                                {!itemInStock && !itemExpired && (
                                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-800">
                                    Out of Stock
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
                              {itemExpired && (
                                <p className="text-xs text-red-600">
                                  This product has expired and cannot be
                                  purchased.
                                </p>
                              )}
                              {!itemInStock && !itemExpired && (
                                <p className="text-xs text-red-600">
                                  This product is currently out of stock.
                                </p>
                              )}
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-r-none"
                                  onClick={() =>
                                    dispatch(
                                      decrementQuantity({
                                        id: item._id,
                                      }),
                                    )
                                  }
                                  disabled={item.quantity <= 1 || !isAvailable}
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
                                    dispatch(
                                      incrementQuantity({
                                        id: item._id,
                                      }),
                                    )
                                  }
                                  disabled={!isAvailable}
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
                                onClick={() =>
                                  dispatch(
                                    removeFromCart({
                                      id: item._id,
                                    }),
                                  )
                                }
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
                      <span>
                        {shippingFee === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `BDT ${shippingFee.toFixed(2)}`
                        )}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>BDT {total.toFixed(2)}</span>
                  </div>

                  {/* Free Shipping Notice */}
                  {subtotal < 1000 && (
                    <div className="rounded-md bg-primary/10 p-3 text-center text-sm">
                      Add BDT {(1000 - subtotal).toFixed(2)} more to qualify for
                      free shipping
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {hasUnavailableItems ? (
                    <div className="w-full space-y-2">
                      <Button disabled className="w-full gap-2">
                        Proceed to Checkout <ArrowRight className="h-4 w-4" />
                      </Button>
                      <p className="text-center text-xs text-red-600">
                        Please remove expired or out-of-stock items to proceed
                      </p>
                    </div>
                  ) : (
                    <Button
                      className="w-full gap-2"
                      onClick={() => {
                        if (user && user?.role === "ADMIN") {
                          toast.warning(
                            "Only customers can proceed to checkout.",
                          );
                        } else {
                          router.push("/checkout");
                        }
                      }}
                    >
                      Proceed to Checkout <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
