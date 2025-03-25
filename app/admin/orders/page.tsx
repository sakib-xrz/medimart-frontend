/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Eye, Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Sample order data based on the provided JSON
const orders = [
  {
    _id: "67e1b8cf2706362620bf1b96",
    order_id: "5C5943",
    customer_id: "67e1b88c2706362620bf1b7d",
    products: [
      {
        product_id: "67cb1d68714acf32241d5141",
        name: "Menstrual Cup",
        dosage: "N/A",
        quantity: 1,
        price: 350,
        discount: 10,
        discount_type: "PERCENTAGE",
        requires_prescription: false,
        _id: "67e1b8cf2706362620bf1b97",
      },
      {
        product_id: "67cb1d68714acf32241d5142",
        name: "Prenatal Vitamins",
        dosage: "Daily",
        quantity: 1,
        price: 250,
        discount: 5,
        discount_type: "PERCENTAGE",
        requires_prescription: false,
        _id: "67e1b8cf2706362620bf1b98",
      },
      {
        product_id: "67cb1d68714acf32241d5144",
        name: "Ovulation Test Kit",
        dosage: "N/A",
        quantity: 1,
        price: 220,
        discount: 5,
        discount_type: "PERCENTAGE",
        requires_prescription: false,
        _id: "67e1b8cf2706362620bf1b99",
      },
      {
        product_id: "67cb1d68714acf32241d5145",
        name: "Yeast Infection Treatment",
        dosage: "7-day treatment",
        quantity: 1,
        price: 200,
        discount: 0,
        discount_type: "PERCENTAGE",
        requires_prescription: false,
        _id: "67e1b8cf2706362620bf1b9a",
      },
    ],
    customer_name: "Md Sakibul Islam",
    customer_email: "sakibxrz21@gmail.com",
    customer_phone: "01540581443",
    address: "Mirpur 10",
    city: "Dhaka",
    postal_code: "1216",
    notes: "",
    payment_method: "sslcommerz",
    order_status: "PLACED",
    payment_status: "CANCELLED",
    transaction_id: "TRX-D1E990CEA2",
    subtotal: 961.5,
    delivery_charge: 50,
    grand_total: 1011.5,
    createdAt: "2025-03-24T19:55:59.068Z",
    updatedAt: "2025-03-24T19:56:35.273Z",
  },
  {
    _id: "67ddb6eead4860ccb8db5b6f",
    order_id: "5F901D",
    customer_id: "67d862be810819c69ae9c685",
    products: [
      {
        product_id: "67cafd143c440dc4900edfc2",
        name: "Ibuprofen 400mg Capsules",
        dosage: "400mg",
        quantity: 1,
        price: 150,
        discount: 0,
        discount_type: "PERCENTAGE",
        requires_prescription: true,
        _id: "67ddb6eead4860ccb8db5b70",
      },
      {
        product_id: "67cafd143c440dc4900edfc9",
        name: "Aloe Vera Gel",
        dosage: "N/A",
        quantity: 1,
        price: 200,
        discount: 0,
        discount_type: "PERCENTAGE",
        requires_prescription: false,
        _id: "67ddb6eead4860ccb8db5b71",
      },
    ],
    customer_name: "Md Sakibul Islam",
    customer_email: "sakibxrz21@gmail.com",
    customer_phone: "01540581443",
    address: "Lean 2",
    city: "Dhaka",
    postal_code: "1216",
    notes: "",
    payment_method: "sslcommerz",
    prescription:
      "https://res.cloudinary.com/talent-pro/image/upload/v1742583533/medimart/prescriptions/5F901D.png",
    order_status: "PLACED",
    payment_status: "PENDING",
    transaction_id: "TRX-836037B5A1",
    subtotal: 350,
    delivery_charge: 50,
    grand_total: 400,
    createdAt: "2025-03-21T18:58:54.101Z",
    updatedAt: "2025-03-21T18:58:54.101Z",
  },
  {
    _id: "67ddb0304f193899f0c168fc",
    order_id: "4DC0C6",
    customer_id: "67d862be810819c69ae9c685",
    products: [
      {
        product_id: "67cb1d68714acf32241d513d",
        name: "Antiseptic Wipes",
        dosage: "N/A",
        quantity: 1,
        price: 100,
        discount: 0,
        discount_type: "PERCENTAGE",
        requires_prescription: false,
        _id: "67ddb0304f193899f0c168fd",
      },
      {
        product_id: "67cb1d68714acf32241d5140",
        name: "Medical Tape",
        dosage: "N/A",
        quantity: 1,
        price: 90,
        discount: 5,
        discount_type: "PERCENTAGE",
        requires_prescription: false,
        _id: "67ddb0304f193899f0c168fe",
      },
    ],
    customer_name: "Md Sakibul Islam",
    customer_email: "sakibxrz21@gmail.com",
    customer_phone: "01540581443",
    address: "Lean 2",
    city: "Dhaka",
    postal_code: "1216",
    notes: "",
    payment_method: "sslcommerz",
    order_status: "PLACED",
    payment_status: "PENDING",
    transaction_id: "TRX-8BCC764D09",
    subtotal: 185.5,
    delivery_charge: 50,
    grand_total: 235.5,
    createdAt: "2025-03-21T18:30:08.613Z",
    updatedAt: "2025-03-21T18:30:08.613Z",
  },
  {
    _id: "67dd2ff9a28c4289a6be1534",
    order_id: "8A7E8B",
    customer_id: "67d862be810819c69ae9c685",
    products: [
      {
        product_id: "67cafd143c440dc4900edfc5",
        name: "Omeprazole 20mg Capsules",
        dosage: "20mg",
        quantity: 1,
        price: 180,
        discount: 0,
        discount_type: "PERCENTAGE",
        requires_prescription: false,
        _id: "67dd2ff9a28c4289a6be1535",
      },
      {
        product_id: "67cafd143c440dc4900edfc9",
        name: "Aloe Vera Gel",
        dosage: "N/A",
        quantity: 1,
        price: 200,
        discount: 0,
        discount_type: "PERCENTAGE",
        requires_prescription: false,
        _id: "67dd2ff9a28c4289a6be1536",
      },
    ],
    customer_name: "Md Sakibul Islam",
    customer_email: "sakibxrz21@gmail.com",
    customer_phone: "01540581443",
    address: "Mirpur 10",
    city: "Dhaka",
    postal_code: "1216",
    notes: "",
    payment_method: "sslcommerz",
    order_status: "PLACED",
    payment_status: "PAID",
    transaction_id: "TRX-5F66F31350",
    subtotal: 380,
    delivery_charge: 50,
    grand_total: 430,
    status_history: [
      {
        _id: "67dd2ff9a28c4289a6be1537",
        status: "PLACED",
        timestamp: "2025-03-21T09:23:05.723Z",
      },
    ],
    createdAt: "2025-03-21T09:23:05.727Z",
    updatedAt: "2025-03-21T09:23:45.254Z",
  },
];

// Order status options
const ORDER_STATUSES = [
  { value: "PLACED", label: "Placed" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
];

// Payment status options
const PAYMENT_STATUSES = [
  { value: "PENDING", label: "Pending" },
  { value: "PAID", label: "Paid" },
  { value: "FAILED", label: "Failed" },
  { value: "CANCELLED", label: "Cancelled" },
];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>(
    {},
  );
  const [orderStatusChanges, setOrderStatusChanges] = useState<
    Record<string, string>
  >({});
  const [paymentStatusChanges, setPaymentStatusChanges] = useState<
    Record<string, string>
  >({});

  // Initialize status changes with current values
  useEffect(() => {
    const initialOrderStatuses: Record<string, string> = {};
    const initialPaymentStatuses: Record<string, string> = {};

    orders.forEach((order) => {
      initialOrderStatuses[order._id] = order.order_status;
      initialPaymentStatuses[order._id] = order.payment_status;
    });

    setOrderStatusChanges(initialOrderStatuses);
    setPaymentStatusChanges(initialPaymentStatuses);
  }, []);

  // Filter orders based on search query, status, and payment status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.order_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.order_status === statusFilter;
    const matchesPayment =
      paymentFilter === "all" || order.payment_status === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Toggle product visibility for an order
  const toggleProductsVisibility = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  // Handle order status change
  const handleOrderStatusChange = (orderId: string, status: string) => {
    setOrderStatusChanges((prev) => ({
      ...prev,
      [orderId]: status,
    }));
    // Here you would typically make an API call to update the status
    console.log(`Updating order ${orderId} status to ${status}`);
  };

  // Handle payment status change
  const handlePaymentStatusChange = (orderId: string, status: string) => {
    setPaymentStatusChanges((prev) => ({
      ...prev,
      [orderId]: status,
    }));
    // Here you would typically make an API call to update the status
    console.log(`Updating payment for order ${orderId} status to ${status}`);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy • HH:mm");
  };

  // Calculate total items in an order
  const getTotalItems = (order: any) => {
    return order.products.reduce(
      (total: number, product: any) => total + product.quantity,
      0,
    );
  };

  // Render product list for an order
  const renderProductList = (products: any[]) => {
    return (
      <div className="mt-2 space-y-3">
        <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground">
          <div className="col-span-5">Product</div>
          <div className="col-span-2 text-center">Qty</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-3 text-right">Total</div>
        </div>
        {products.map((product) => {
          const discountAmount =
            product.discount_type === "PERCENTAGE"
              ? (product.price * product.discount) / 100
              : product.discount;
          const finalPrice = product.price - discountAmount;
          const totalPrice = finalPrice * product.quantity;

          return (
            <div
              key={product._id}
              className="grid grid-cols-12 border-b pb-2 text-sm"
            >
              <div className="col-span-5">
                <div className="font-medium">{product.name}</div>
                {product.requires_prescription && (
                  <Badge variant="outline" className="mt-1 text-xs">
                    Prescription
                  </Badge>
                )}
              </div>
              <div className="col-span-2 self-center text-center">
                {product.quantity}
              </div>
              <div className="col-span-2 self-center text-center">
                BDT {finalPrice.toFixed(2)}
                {product.discount > 0 && (
                  <div className="text-xs text-muted-foreground line-through">
                    BDT {product.price.toFixed(2)}
                  </div>
                )}
              </div>
              <div className="col-span-3 self-center text-right font-medium">
                BDT {totalPrice.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Manage and process customer orders
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {ORDER_STATUSES.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              {PAYMENT_STATUSES.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Table view for large screens (lg and above) */}
      <div className="hidden rounded-md border bg-white lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <>
                <TableRow
                  key={order._id}
                  className={cn(expandedOrders[order._id] ? "bg-muted/50" : "")}
                >
                  <TableCell className="font-medium">
                    #{order.order_id}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{order.customer_name}</div>
                    <div className="text-xs text-muted-foreground">
                      {order.customer_email}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {order.customer_phone}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>
                    <Select
                      value={
                        orderStatusChanges[order._id] || order.order_status
                      }
                      onValueChange={(value) =>
                        handleOrderStatusChange(order._id, value)
                      }
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Order Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {ORDER_STATUSES.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={
                        paymentStatusChanges[order._id] || order.payment_status
                      }
                      onValueChange={(value) =>
                        handlePaymentStatusChange(order._id, value)
                      }
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Payment Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {PAYMENT_STATUSES.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      BDT {order.grand_total.toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {getTotalItems(order)} items
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => toggleProductsVisibility(order._id)}
                      >
                        {expandedOrders[order._id] ? (
                          <>Hide Details</>
                        ) : (
                          <>View Details</>
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Expanded product details */}
                {expandedOrders[order._id] && (
                  <TableRow className="rounded-b-lg bg-muted hover:bg-muted">
                    <TableCell colSpan={7} className="p-0">
                      <div className="p-4">
                        {renderProductList(order.products)}

                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="mb-2 font-medium">
                              Shipping Address
                            </h4>
                            <div className="text-sm">
                              <p>{order.address}</p>
                              <p>
                                {order.city}, {order.postal_code}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Subtotal:
                                </span>
                                <span>BDT {order.subtotal.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Delivery:
                                </span>
                                <span>
                                  BDT {order.delivery_charge.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between border-t pt-1 font-medium">
                                <span>Total:</span>
                                <span>BDT {order.grand_total.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {order.prescription && (
                          <div className="mt-4">
                            <h4 className="mb-2 font-medium">Prescription</h4>
                            <a
                              href={order.prescription}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-sm text-primary hover:underline"
                            >
                              <Eye className="mr-1 h-4 w-4" />
                              View Prescription
                            </a>
                          </div>
                        )}

                        {order.notes && (
                          <div className="mt-4">
                            <h4 className="mb-2 font-medium">Customer Notes</h4>
                            <p className="text-sm">{order.notes}</p>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Card view for small screens (lg and below) */}
      <div className="space-y-4 lg:hidden">
        {filteredOrders.map((order) => (
          <Card key={order._id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">
                    Order #{order.order_id}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    BDT {order.grand_total.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {getTotalItems(order)} items
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Customer</div>
                  <div className="text-right text-sm">
                    <div>{order.customer_name}</div>
                    <div className="text-xs text-muted-foreground">
                      {order.customer_phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Order Status</div>
                  <Select
                    value={orderStatusChanges[order._id] || order.order_status}
                    onValueChange={(value) =>
                      handleOrderStatusChange(order._id, value)
                    }
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Order Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {ORDER_STATUSES.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Payment Status</div>
                  <Select
                    value={
                      paymentStatusChanges[order._id] || order.payment_status
                    }
                    onValueChange={(value) =>
                      handlePaymentStatusChange(order._id, value)
                    }
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Payment Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {PAYMENT_STATUSES.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Payment Method</div>
                  <div className="text-sm capitalize">
                    {order.payment_method}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Transaction ID</div>
                  <div className="text-sm">{order.transaction_id}</div>
                </div>
              </div>

              {/* Product accordion */}
              <Accordion type="single" collapsible className="mt-4">
                <AccordionItem value="products">
                  <AccordionTrigger className="py-2 text-sm font-medium">
                    Order Items ({getTotalItems(order)})
                  </AccordionTrigger>
                  <AccordionContent>
                    {renderProductList(order.products)}

                    <div className="mt-4 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span>BDT {order.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Delivery:</span>
                        <span>BDT {order.delivery_charge.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-1 font-medium">
                        <span>Total:</span>
                        <span>BDT {order.grand_total.toFixed(2)}</span>
                      </div>
                    </div>

                    {order.prescription && (
                      <div className="mt-4">
                        <h4 className="mb-2 font-medium">Prescription</h4>
                        <a
                          href={order.prescription}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-primary hover:underline"
                        >
                          <Eye className="mr-1 h-4 w-4" />
                          View Prescription
                        </a>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="address">
                  <AccordionTrigger className="py-2 text-sm font-medium">
                    Shipping Address
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-sm">
                      <p>{order.address}</p>
                      <p>
                        {order.city}, {order.postal_code}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {order.notes && (
                  <AccordionItem value="notes">
                    <AccordionTrigger className="py-2 text-sm font-medium">
                      Customer Notes
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">{order.notes}</p>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-end pt-2">
              <Button size="sm" asChild>
                <Link href={`tel:${order.customer_phone}`} passHref>
                  <Phone className="h-4 w-4" />
                  Call Customer
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
