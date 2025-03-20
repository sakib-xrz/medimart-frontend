"use client";

import Link from "next/link";
import { ArrowLeft, RefreshCw, XCircle } from "lucide-react";

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

export default function PaymentCancel() {
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
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <XCircle className="h-8 w-8 text-amber-600" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Payment Cancelled
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Your payment process has been cancelled. No charges have been made
              to your account.
            </p>

            <div className="rounded-lg bg-muted p-4">
              <h3 className="mb-2 font-medium">What happened?</h3>
              <p className="text-sm text-muted-foreground">
                You chose to cancel the payment process before it was completed.
                Your order has not been placed and your cart items are still
                saved.
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-medium">What would you like to do next?</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Return to your cart and review your items</li>
                <li>• Try the checkout process again</li>
                <li>• Continue shopping for more products</li>
              </ul>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>
                If you experienced any issues during checkout, please contact
                our customer support team at{" "}
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
              <Link href="/products">
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry Payment
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full">
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </Container>
    </main>
  );
}
