"use client";

import Link from "next/link";
import { CheckCircle, Package, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Container from "@/components/shared/container";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearCart } from "@/redux/features/cart/cartSlice";

export default function PaymentSuccess({
  searchParams,
}: {
  searchParams: {
    order_id: string;
  };
}) {
  const orderId = searchParams?.order_id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="bg-muted/30">
      <Container>
        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Order Confirmed!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Thank you for your order. We&apos;ve received your payment and
              will process your order shortly.
            </p>

            <div className="rounded-lg bg-muted p-4">
              <div className="flex justify-between">
                <span className="font-medium">Order ID:</span>
                <span className="font-medium">#{orderId}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">What happens next?</h3>
              <div className="space-y-4 rounded-lg border p-4">
                <div>
                  <div>
                    <h4 className="font-medium">Order Processing</h4>
                    <p className="text-sm text-muted-foreground">
                      Our team will verify your order and prepare it for
                      shipping.
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <h4 className="font-medium">Shipping</h4>
                    <p className="text-sm text-muted-foreground">
                      Your order will be shipped within 24 hours. You can track
                      the status of your order in my orders page.
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <h4 className="font-medium">Delivery</h4>
                    <p className="text-sm text-muted-foreground">
                      Your order will be delivered to your doorstep within 1-2
                      business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="text-center text-sm text-muted-foreground">
              <p>
                If you have any questions about your order, please contact our
                customer support team at{" "}
                <Link
                  href="mailto:support@medimart.com"
                  className="text-primary hover:underline"
                >
                  support@medimart.com
                </Link>
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button asChild className="w-full">
              <Link href="/my-orders">
                <Package className="mr-2 h-4 w-4" />
                Track Your Order
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/products">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </Container>
    </main>
  );
}
