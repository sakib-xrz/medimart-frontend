"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

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
import Container from "@/components/shared/container";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearCart } from "@/redux/features/cart/cartSlice";

export default function PaymentFail() {
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
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Payment Failed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              We were unable to process your payment. No charges have been made
              to your account.
            </p>

            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertDescription>
                Your payment was declined by the payment provider. Please check
                your payment details or try a different payment method.
              </AlertDescription>
            </Alert>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-medium">
                Common reasons for payment failure:
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Insufficient funds in your account</li>
                <li>• Incorrect card details entered</li>
                <li>• Card expired or blocked for online transactions</li>
                <li>• Transaction flagged by bank&apos;s security system</li>
                <li>• Temporary issue with the payment gateway</li>
              </ul>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>
                If you continue to experience issues, please contact our
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
