"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronRight,
  Eye,
  FileText,
  Package,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMyOrdersQuery } from "@/redux/features/order/orderApi";
import { formatDate } from "@/lib/utils";
import Container from "@/components/shared/container";
import { DataLoading } from "@/components/ui/data-loading";

type OrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED";

interface OrderItems {
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

interface Order {
  _id: string;
  order_id: string;
  customer_id: string;
  products: OrderItems[];
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  city: string;
  postal_code: string;
  notes: string;
  payment_method: string;
  prescription?: string;
  order_status: OrderStatus;
  payment_status: PaymentStatus;
  transaction_id: string;
  subtotal: number;
  delivery_charge: number;
  grand_total: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const getOrderStatusBadge = (status: string) => {
  switch (status) {
    case "PLACED":
      return (
        <Badge className="rounded-full bg-amber-500 hover:bg-amber-600">
          Placed
        </Badge>
      );
    case "CONFIRMED":
      return (
        <Badge className="rounded-full bg-blue-500 hover:bg-blue-600">
          Confirmed
        </Badge>
      );
    case "SHIPPED":
      return (
        <Badge className="rounded-full bg-purple-500 hover:bg-purple-600">
          Shipped
        </Badge>
      );
    case "DELIVERED":
      return (
        <Badge className="rounded-full bg-green-500 hover:bg-green-600">
          Delivered
        </Badge>
      );
    case "CANCELLED":
      return (
        <Badge variant="destructive" className="rounded-full">
          Cancelled
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="rounded-full">
          {status}
        </Badge>
      );
  }
};

const getPaymentStatusBadge = (status: string) => {
  switch (status) {
    case "PAID":
      return (
        <Badge className="rounded-full bg-green-500 hover:bg-green-600">
          Paid
        </Badge>
      );
    case "PENDING":
      return (
        <Badge className="rounded-full bg-amber-500 hover:bg-amber-600">
          Pending
        </Badge>
      );
    case "FAILED":
      return (
        <Badge variant="destructive" className="rounded-full">
          Failed
        </Badge>
      );
    case "CANCELLED":
      return (
        <Badge variant="destructive" className="rounded-full">
          Cancelled
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="rounded-full">
          {status}
        </Badge>
      );
  }
};

export default function MyOrders() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const { data: myOrdersData, isLoading } = useMyOrdersQuery({});

  const orders = myOrdersData?.data;

  return (
    <main className="bg-muted/30">
      <Container>
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
          <Button asChild variant="outline" className="mt-4 sm:mt-0">
            <Link href="/products">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>
        <DataLoading isLoading={isLoading} loadingHeight="h-96">
          {orders?.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mb-2 text-xl font-semibold">No orders found</h2>
              <p className="mb-6 text-muted-foreground">
                You haven&apos;t placed any orders yet.
              </p>
              <Button asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders?.map((order: Order) => (
                <Card key={order._id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50 pb-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          Order #{order.order_id}
                        </CardTitle>
                        <CardDescription className="mt-1 flex items-center">
                          <Calendar className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                          <span>Placed on {formatDate(order.createdAt)}</span>
                        </CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {getOrderStatusBadge(order.order_status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">
                            Total:
                          </span>{" "}
                          BDT {order.grand_total.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">
                            Items:
                          </span>{" "}
                          {order.products.length}{" "}
                          {order.products.length === 1 ? "product" : "products"}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleOrderDetails(order._id)}
                        >
                          {expandedOrder === order._id ? (
                            <>
                              Hide Details
                              <ChevronDown className="ml-1 h-4 w-4" />
                            </>
                          ) : (
                            <>
                              View Details
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/track-order/${order.order_id}`}>
                            <Package className="mr-1 h-4 w-4" />
                            Track Order
                          </Link>
                        </Button>
                      </div>
                    </div>

                    {expandedOrder === order._id && (
                      <div className="mt-6 space-y-6">
                        <Separator />

                        {/* Order Items */}
                        <div>
                          <h3 className="mb-3 font-medium">Order Items</h3>
                          <div className="space-y-3">
                            {order.products.map((product, index) => {
                              const discountedPrice =
                                product.discount > 0 &&
                                product.discount_type === "PERCENTAGE"
                                  ? product.price -
                                    (product.price * product.discount) / 100
                                  : product.price;

                              return (
                                <div
                                  key={index}
                                  className="flex flex-col justify-between rounded-lg border p-3 sm:flex-row sm:items-center"
                                >
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-medium">
                                        {product.name}
                                      </h4>
                                      {product.requires_prescription && (
                                        <Badge
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          Prescription
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="mt-1 flex flex-wrap gap-x-3 text-sm text-muted-foreground">
                                      <span>Dosage: {product.dosage}</span>
                                      <span>Qty: {product.quantity}</span>
                                    </div>
                                  </div>
                                  <div className="mt-2 text-right sm:mt-0">
                                    <div className="font-medium">
                                      BDT{" "}
                                      {(
                                        discountedPrice * product.quantity
                                      ).toFixed(2)}
                                    </div>
                                    {product.discount > 0 && (
                                      <div className="text-xs text-muted-foreground line-through">
                                        BDT{" "}
                                        {(
                                          product.price * product.quantity
                                        ).toFixed(2)}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Order Details Accordion */}
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="shipping-details">
                            <AccordionTrigger className="text-sm font-medium">
                              Shipping Details
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2 text-sm">
                                <p>
                                  <span className="font-medium">Name:</span>{" "}
                                  {order.customer_name}
                                </p>
                                <p>
                                  <span className="font-medium">Phone:</span>{" "}
                                  {order.customer_phone}
                                </p>
                                <p>
                                  <span className="font-medium">Email:</span>{" "}
                                  {order.customer_email}
                                </p>
                                <p>
                                  <span className="font-medium">Address:</span>{" "}
                                  {order.address}, {order.city},{" "}
                                  {order.postal_code}
                                </p>
                                {order.notes && (
                                  <p>
                                    <span className="font-medium">Notes:</span>{" "}
                                    {order.notes}
                                  </p>
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="payment-details">
                            <AccordionTrigger className="text-sm font-medium">
                              Payment Details
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2 text-sm">
                                <p>
                                  <span className="font-medium">
                                    Payment Method:
                                  </span>{" "}
                                  {order.payment_method.toUpperCase()}
                                </p>
                                <p>
                                  <span className="font-medium">
                                    Transaction ID:
                                  </span>{" "}
                                  {order.transaction_id}
                                </p>
                                <p>
                                  <span className="font-medium">
                                    Payment Status:
                                  </span>{" "}
                                  {getPaymentStatusBadge(order.payment_status)}
                                </p>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="order-summary">
                            <AccordionTrigger className="text-sm font-medium">
                              Order Summary
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Subtotal:</span>
                                  <span>BDT {order.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Delivery Charge:</span>
                                  <span>
                                    BDT {order.delivery_charge.toFixed(2)}
                                  </span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between font-medium">
                                  <span>Total:</span>
                                  <span>
                                    BDT {order.grand_total.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                        {/* Prescription and Actions */}
                        <div className="flex flex-wrap justify-end gap-3">
                          {order.prescription && (
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={order.prescription}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Eye className="mr-1 h-4 w-4" />
                                View Prescription
                              </a>
                            </Button>
                          )}

                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/invoice/${order.order_id}`}>
                              <FileText className="mr-1 h-4 w-4" />
                              View Invoice
                            </Link>
                          </Button>

                          {order.order_status === "DELIVERED" && (
                            <Button size="sm">
                              <ArrowRight className="mr-1 h-4 w-4" />
                              Reorder
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </DataLoading>
      </Container>
    </main>
  );
}
