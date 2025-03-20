"use client";

import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Container from "@/components/shared/container";
import { useMyOrderQuery } from "@/redux/features/order/orderApi";
import { OverlayLoading } from "@/components/ui/overlay-loading";

interface Product {
  product_id: string;
  name: string;
  dosage: string;
  quantity: number;
  price: number;
  discount: number;
  discount_type: string;
  requires_prescription: boolean;
  _id: string;
}

export default function InvoicePage({
  params,
}: {
  params: { orderId: string };
}) {
  const orderId = params.orderId;

  const { data: orderDataResponse, isLoading } = useMyOrderQuery(orderId);

  if (isLoading) {
    return <OverlayLoading isLoading={isLoading} />;
  }

  // Function to handle printing
  const handlePrint = () => {
    window.print();
  };

  const orderData = orderDataResponse?.data;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-muted/30 print:bg-white print:py-0">
        <Container className="print:p-0">
          <div className="mb-6 print:hidden">
            <Link
              href="/my-orders"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to My Orders
            </Link>
          </div>

          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between print:hidden">
            <h1 className="text-3xl font-bold tracking-tight">Invoice</h1>
            <div className="mt-4 flex gap-2 sm:mt-0">
              <Button onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Print Invoice
              </Button>
            </div>
          </div>

          <Card className="print:border-none print:shadow-none">
            <CardHeader className="print:pt-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <CardTitle className="text-2xl">Invoice</CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Invoice for order #{orderData?.order_id}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:text-right">
                  <h3 className="font-semibold">Medi Mart</h3>
                  <p className="text-sm text-muted-foreground">
                    123 Health Street, Medical District
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Dhaka, Bangladesh
                  </p>
                  <p className="text-sm text-muted-foreground">
                    support@medimart.com
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Invoice Details */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-sm font-semibold">Bill To:</h3>
                    <p className="text-sm">{orderData.customer_name}</p>
                    <p className="text-sm">{orderData.address}</p>
                    <p className="text-sm">
                      {orderData.city}, {orderData.postal_code}
                    </p>
                    <p className="text-sm">{orderData.customer_phone}</p>
                    <p className="text-sm">{orderData.customer_email}</p>
                  </div>
                  <div className="text-sm sm:text-right">
                    <div className="space-y-1">
                      <div className="flex justify-between sm:justify-end sm:gap-4">
                        <span className="font-medium">Invoice Date:</span>
                        <span>{orderData.order_date}</span>
                      </div>
                      <div className="flex justify-between sm:justify-end sm:gap-4">
                        <span className="font-medium">Order ID:</span>
                        <span>#{orderData.order_id}</span>
                      </div>
                      <div className="flex justify-between sm:justify-end sm:gap-4">
                        <span className="font-medium">Payment Method:</span>
                        <span>{orderData.payment_method.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between sm:justify-end sm:gap-4">
                        <span className="font-medium">Transaction ID:</span>
                        <span>{orderData.transaction_id}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Order Items */}
                <div>
                  <h3 className="mb-2 text-sm font-semibold">Order Items</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Dosage</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderData.products.map(
                        (product: Product, index: number) => {
                          const discountedPrice =
                            product.discount > 0 &&
                            product.discount_type === "PERCENTAGE"
                              ? product.price -
                                (product.price * product.discount) / 100
                              : product.price;

                          return (
                            <TableRow key={index}>
                              <TableCell>{product.name}</TableCell>
                              <TableCell>{product.dosage}</TableCell>
                              <TableCell className="text-right">
                                {product.quantity}
                              </TableCell>
                              <TableCell className="text-right">
                                BDT {discountedPrice.toFixed(2)}
                              </TableCell>
                              <TableCell className="text-right">
                                BDT{" "}
                                {(discountedPrice * product.quantity).toFixed(
                                  2,
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        },
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-end">
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>BDT {orderData.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery Charge:</span>
                      <span>BDT {orderData.delivery_charge.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>BDT {orderData.grand_total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Notes */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">Notes</h3>
                  <p className="text-sm text-muted-foreground">
                    Thank you for your purchase. For any questions or concerns
                    regarding this invoice, please contact our customer support.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </main>
    </div>
  );
}
