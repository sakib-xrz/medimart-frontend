"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowDown,
  ArrowUp,
  CreditCard,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import Link from "next/link";
import {
  useGetExpiringProductsQuery,
  useGetLowStockProductsQuery,
  useGetRecentOrdersQuery,
  useGetRevenueSummaryQuery,
  useGetStatsSummeryQuery,
} from "@/redux/features/dashboard/dashboardApi";
import { OverlayLoading } from "@/components/ui/overlay-loading";

// Define types for the data
type OrderStatusType =
  | "PLACED"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

interface RecentOrder {
  _id: string;
  order_id: string;
  customer_name: string;
  grand_total: number;
  order_status: OrderStatusType;
  createdAt: string;
}

interface LowStockProduct {
  _id: string;
  name: string;
  slug: string;
  stock: number;
}

interface ExpiringProduct {
  _id: string;
  name: string;
  slug: string;
  expiry_date: string;
}

interface ChartTheme {
  light: string;
  dark: string;
}

interface ChartConfig {
  label: string;
  theme: ChartTheme;
}

const chartConfig: {
  revenue: ChartConfig;
} = {
  revenue: {
    label: "Revenue",
    theme: {
      light: "hsl(var(--primary))",
      dark: "hsl(var(--primary))",
    },
  },
};

// Helper function to get status badge
const getOrderStatusBadge = (status: OrderStatusType): JSX.Element => {
  switch (status) {
    case "PLACED":
      return (
        <Badge className="rounded-full bg-amber-500 uppercase hover:bg-amber-600">
          Placed
        </Badge>
      );
    case "CONFIRMED":
      return (
        <Badge className="rounded-full bg-blue-500 uppercase hover:bg-blue-600">
          Confirmed
        </Badge>
      );
    case "SHIPPED":
      return (
        <Badge className="rounded-full bg-purple-500 uppercase hover:bg-purple-600">
          Shipped
        </Badge>
      );
    case "DELIVERED":
      return (
        <Badge className="rounded-full bg-green-500 uppercase hover:bg-green-600">
          Delivered
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

export default function AdminDashboard(): JSX.Element {
  const [isMobile, setIsMobile] = useState(false);

  const { data: statsSummaryData, isLoading: statsSummaryLoading } =
    useGetStatsSummeryQuery({});
  const { data: revenueSummaryData, isLoading: revenueSummaryLoading } =
    useGetRevenueSummaryQuery({});
  const { data: recentOrdersData, isLoading: recentOrdersLoading } =
    useGetRecentOrdersQuery({});
  const { data: lowStockProductsData, isLoading: lowStockProductsLoading } =
    useGetLowStockProductsQuery({});
  const { data: expiringProductsData, isLoading: expiringProductsLoading } =
    useGetExpiringProductsQuery({});

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      // Initial check
      setIsMobile(window.innerWidth < 1024);

      // Add resize listener
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1024);
      };

      window.addEventListener("resize", handleResize);

      // Clean up
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  if (isMobile) {
    return (
      <div className="flex h-[calc(100svh-100px)] flex-col items-center justify-center bg-muted/10 px-4 text-center">
        <Package className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h1 className="mb-2 text-3xl font-bold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="mb-6 text-muted-foreground">
          The admin dashboard is optimized for larger screens. Please access it
          from a desktop device.
        </p>
        <Button asChild variant="outline">
          <a href="/">Return to Home</a>
        </Button>
      </div>
    );
  }

  const statsSummary = statsSummaryData?.data || {};
  const revenueSummary = revenueSummaryData?.data || {};
  const recentOrders = recentOrdersData?.data || [];
  const lowStockProducts = lowStockProductsData?.data || [];
  const expiringProducts = expiringProductsData?.data || [];

  return (
    <div className="w-full space-y-6">
      <OverlayLoading
        isLoading={
          statsSummaryLoading ||
          revenueSummaryLoading ||
          recentOrdersLoading ||
          lowStockProductsLoading ||
          expiringProductsLoading
        }
      />
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your store performance and statistics
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              BDT {statsSummary?.total_revenue?.toLocaleString()}
            </div>
            <div className="flex items-center pt-1">
              {statsSummary?.comparisons?.revenue_growth > 0 ? (
                <span className="flex items-center text-xs text-green-500">
                  <ArrowUp className="mr-1 h-3 w-3" />+
                  {statsSummary?.comparisons?.revenue_growth}%
                </span>
              ) : (
                <span className="flex items-center text-xs text-red-500">
                  <ArrowDown className="mr-1 h-3 w-3" />
                  {statsSummary?.comparisons?.revenue_growth}%
                </span>
              )}
              <span className="ml-2 text-xs text-muted-foreground">
                from last month
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsSummary?.total_orders?.toLocaleString()}
            </div>
            <div className="flex items-center pt-1">
              {statsSummary?.comparisons?.orders_growth > 0 ? (
                <span className="flex items-center text-xs text-green-500">
                  <ArrowUp className="mr-1 h-3 w-3" />+
                  {statsSummary?.comparisons?.orders_growth}%
                </span>
              ) : (
                <span className="flex items-center text-xs text-red-500">
                  <ArrowDown className="mr-1 h-3 w-3" />
                  {statsSummary?.comparisons?.orders_growth}%
                </span>
              )}
              <span className="ml-2 text-xs text-muted-foreground">
                from last month
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsSummary?.total_customers?.toLocaleString()}
            </div>
            <div className="flex items-center pt-1">
              {statsSummary?.comparisons?.customers_growth > 0 ? (
                <span className="flex items-center text-xs text-green-500">
                  <ArrowUp className="mr-1 h-3 w-3" />+
                  {statsSummary?.comparisons?.customers_growth}%
                </span>
              ) : (
                <span className="flex items-center text-xs text-red-500">
                  <ArrowDown className="mr-1 h-3 w-3" />
                  {statsSummary?.comparisons?.customers_growth}%
                </span>
              )}
              <span className="ml-2 text-xs text-muted-foreground">
                from last month
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsSummary?.active_products?.toLocaleString()}
            </div>
            <div className="flex items-center pt-1">
              {statsSummary?.comparisons?.products_growth > 0 ? (
                <span className="flex items-center text-xs text-green-500">
                  <ArrowUp className="mr-1 h-3 w-3" />+
                  {statsSummary?.comparisons?.products_growth}%
                </span>
              ) : (
                <span className="flex items-center text-xs text-red-500">
                  <ArrowDown className="mr-1 h-3 w-3" />
                  {statsSummary?.comparisons?.products_growth}%
                </span>
              )}
              <span className="ml-2 text-xs text-muted-foreground">
                from last month
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <div className="grid w-full grid-cols-12 gap-4">
        <Card className="col-span-7">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                  Monthly revenue for the current year
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[340px]">
              <ChartContainer config={chartConfig} className="h-[340px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={revenueSummary}>
                    <defs>
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="95%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="url(#colorRevenue)"
                      dot={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest transactions from your store
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order: RecentOrder) => (
                <div key={order._id} className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <CreditCard className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center">
                      <p className="text-sm font-medium">#{order.order_id}</p>
                      <div className="ml-2">
                        {getOrderStatusBadge(order.order_status)}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {order.customer_name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      BDT {order.grand_total.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={`/admin/orders?search=${order.order_id}&page=1&limit=20`}
                      >
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/orders">View All Orders</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Alerts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Low Stock Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Low Stock Products</CardTitle>
              <CardDescription>
                Products that need to be restocked
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">
                      Product ID
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Name</TableHead>
                    <TableHead className="whitespace-nowrap text-center">
                      Stock
                    </TableHead>
                    <TableHead className="whitespace-nowrap text-right">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowStockProducts.map((product: LowStockProduct) => (
                    <TableRow key={product._id}>
                      <TableCell className="whitespace-nowrap font-medium uppercase">
                        {product.slug}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {product.name}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-center">
                        <Badge
                          variant="outline"
                          className="border-amber-200 bg-amber-50 text-amber-700"
                        >
                          {product.stock} left
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/admin/products/${product.slug}/edit`}>
                            Restock
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Expiring Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Expiring Products</CardTitle>
              <CardDescription>
                Products are already expired or will expire soon
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">
                      Product ID
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Name</TableHead>
                    <TableHead className="whitespace-nowrap text-center">
                      Expiry Date
                    </TableHead>
                    <TableHead className="whitespace-nowrap text-right">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expiringProducts.map((product: ExpiringProduct) => (
                    <TableRow key={product._id}>
                      <TableCell className="whitespace-nowrap font-medium uppercase">
                        {product.slug}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {product.name}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-center">
                        <Badge
                          variant="outline"
                          className="border-red-200 bg-red-50 text-red-700"
                        >
                          {new Date(product.expiry_date).toLocaleDateString()}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/admin/products/${product.slug}/edit`}>
                            Manage
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
