"use client";

import { useEffect, useState } from "react";
import { ClipboardList, Eye, Loader2, Phone, Search, X } from "lucide-react";
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
import { cn, generateQueryString, sanitizeParams } from "@/lib/utils";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/features/order/orderApi";
import CustomPagination from "@/app/(public)/_components/custom-pagination";
import { toast } from "sonner";

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

type DiscountType = "PERCENTAGE" | "FIXED";

interface Product {
  product_id: string;
  name: string;
  dosage: string;
  quantity: number;
  price: number;
  discount: number;
  discount_type: DiscountType;
  requires_prescription: boolean;
  _id: string;
}

interface Order {
  _id: string;
  order_id: string;
  customer_id: string;
  products: Product[];
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  city: string;
  postal_code: string;
  notes: string;
  payment_method: string;
  order_status: "PLACED" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  payment_status: "PENDING" | "PAID" | "FAILED" | "CANCELLED";
  transaction_id: string;
  prescription?: string;
  subtotal: number;
  delivery_charge: number;
  grand_total: number;
  createdAt: string;
  updatedAt: string;
}

const getPaymentStatusBadge = (status: string) => {
  switch (status) {
    case "PAID":
      return (
        <Badge className="rounded-full bg-green-500 uppercase hover:bg-green-600">
          Paid
        </Badge>
      );
    case "PENDING":
      return (
        <Badge className="rounded-full bg-amber-500 uppercase hover:bg-amber-600">
          Pending
        </Badge>
      );
    case "FAILED":
      return (
        <Badge variant="destructive" className="rounded-full uppercase">
          Failed
        </Badge>
      );
    case "CANCELLED":
      return (
        <Badge variant="destructive" className="rounded-full uppercase">
          Cancelled
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="rounded-full uppercase">
          {status}
        </Badge>
      );
  }
};

export default function OrdersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchKey, setSearchKey] = useState(searchParams.get("search") || "");

  const [updateOrderStatus, { isLoading: isUpdatingOrderStatus }] =
    useUpdateOrderStatusMutation();

  const [params, setParams] = useState({
    search: searchParams.get("search") || "",
    order_status: searchParams.get("order_status") || "",
    payment_status: searchParams.get("payment_status") || "",
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 20,
  });

  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>(
    {},
  );

  const debouncedSearch = useDebouncedCallback((value) => {
    setParams((prev) => ({ ...prev, search: value, page: 1 }));
  }, 400);

  const modifyParams = {
    ...params,
    order_status: params.order_status === "all" ? "" : params.order_status,
    payment_status:
      params.payment_status === "all" ? "" : params.payment_status,
  };

  const updateURL = () => {
    const queryString = generateQueryString(modifyParams);
    router.push(
      decodeURIComponent(`/admin/orders${queryString}`),
      undefined,
      // @ts-expect-error - Fix this later
      {
        shallow: true,
      },
    );
  };

  const debouncedUpdateURL = useDebouncedCallback(updateURL, 500);

  useEffect(() => {
    debouncedUpdateURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchKey(value);
    debouncedSearch(value);
  };

  const { data: ordersData, isLoading } = useGetAllOrdersQuery(
    sanitizeParams(modifyParams),
  );

  const orders = ordersData?.data || [];
  const meta = ordersData?.meta || {};

  const totalPages = Math.ceil(meta.total / meta.limit);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setParams((prev) => ({ ...prev, page }));
    }
  };

  const toggleProductsVisibility = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const getTotalItems = (order: Order) => {
    return order.products.reduce(
      (total: number, product: Product) => total + product.quantity,
      0,
    );
  };

  const renderProductList = (products: Product[]) => {
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
                  <Badge
                    variant="outline"
                    className="mt-1 border-amber-400 text-amber-600"
                  >
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

  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
      <p className="text-lg text-muted-foreground">Loading Orders...</p>
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <ClipboardList className="mb-4 h-12 w-12 text-muted-foreground" />
      <h3 className="mb-1 text-lg font-medium">
        No orders found in the database
      </h3>
      <p className="text-muted-foreground">
        Orders will appear here once customers place orders.
      </p>
    </div>
  );

  const EmptySearchState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <Search className="mb-4 h-12 w-12 text-muted-foreground" />
      <h3 className="mb-1 text-lg font-medium">No results found</h3>
      <p className="mb-4 text-muted-foreground">
        We couldn&apos;t find any orders matching your search query.
      </p>
      <Button
        variant="outline"
        onClick={() => {
          setSearchKey("");
          setParams((prevParams) => ({
            ...prevParams,
            search: "",
            page: 1,
          }));
        }}
      >
        Clear Search
      </Button>
    </div>
  );

  const handleOrderStatusChange = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus({ id: orderId, status }).unwrap();
      toast.success("Order status updated successfully");
    } catch (error) {
      console.error(error);
      // @ts-expect-error - error has data property
      toast.error(error?.data?.message || "Failed to update order status");
    }
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
            placeholder="Search orders..."
            className="w-full pl-8"
            value={searchKey}
            onChange={handleSearchChange}
          />
          {searchKey && (
            <button
              className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
              onClick={() => {
                setSearchKey("");
                setParams((prevParams) => ({
                  ...prevParams,
                  search: "",
                  page: 1,
                }));
              }}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row">
          <Select
            value={params.order_status}
            onValueChange={(value) =>
              setParams((prev) => ({ ...prev, order_status: value, page: 1 }))
            }
          >
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
          <Select
            value={params.payment_status}
            onValueChange={(value) =>
              setParams((prev) => ({ ...prev, payment_status: value, page: 1 }))
            }
          >
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
      {isLoading ? (
        <LoadingState />
      ) : orders.length === 0 && !params.search.length ? (
        <EmptyState />
      ) : orders.length === 0 && params.search.length ? (
        <EmptySearchState />
      ) : (
        <>
          {/* Table view for large screens (lg and above) */}
          <div className="hidden rounded-md border bg-white lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-center">Payment</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-end">Total</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order: Order) => (
                  <>
                    <TableRow
                      key={order._id}
                      className={cn(
                        expandedOrders[order._id] ? "bg-muted/50" : "",
                      )}
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
                      <TableCell>
                        {format(order.createdAt, "dd MMM, yyyy - hh:mm a")}
                      </TableCell>
                      <TableCell className="text-center">
                        {getPaymentStatusBadge(order.payment_status)}
                      </TableCell>
                      <TableCell className="flex justify-center text-center">
                        <Select
                          value={order.order_status}
                          onValueChange={(value) =>
                            handleOrderStatusChange(order._id, value)
                          }
                          disabled={isUpdatingOrderStatus}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Order Status" />
                          </SelectTrigger>
                          <SelectContent>
                            {ORDER_STATUSES.map((status) => (
                              <SelectItem
                                key={status.value}
                                value={status.value}
                              >
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-end">
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
                                    <span>
                                      BDT {order.grand_total.toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {order.prescription && (
                              <div className="mt-4">
                                <h4 className="mb-2 font-medium">
                                  Prescription
                                </h4>
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
                                <h4 className="mb-2 font-medium">
                                  Customer Notes
                                </h4>
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
            {orders.map((order: Order) => (
              <Card key={order._id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">
                        Order #{order.order_id}
                      </CardTitle>
                      <div className="text-sm text-muted-foreground">
                        {format(order.createdAt, "dd MMM, yyyy - hh:mm a")}
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
                        value={order.order_status}
                        onValueChange={(value) =>
                          handleOrderStatusChange(order._id, value)
                        }
                        disabled={isUpdatingOrderStatus}
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
                      {getPaymentStatusBadge(order.payment_status)}
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
                            <span className="text-muted-foreground">
                              Subtotal:
                            </span>
                            <span>BDT {order.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Delivery:
                            </span>
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

          <CustomPagination
            params={params}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
