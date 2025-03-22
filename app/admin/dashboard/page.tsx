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
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";

// Define types for the data
type OrderStatusType =
  | "PLACED"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

interface RevenueData {
  name: string;
  revenue: number;
}

interface RecentOrder {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: OrderStatusType;
  items: number;
}

interface LowStockProduct {
  id: string;
  name: string;
  stock: number;
  threshold: number;
}

interface ExpiringProduct {
  id: string;
  name: string;
  expiryDate: string;
  stock: number;
}

interface ChartTheme {
  light: string;
  dark: string;
}

interface ChartConfig {
  label: string;
  theme: ChartTheme;
}

// Sample data
const revenueData: RevenueData[] = [
  { name: "Jan", revenue: 18500 },
  { name: "Feb", revenue: 21500 },
  { name: "Mar", revenue: 19800 },
  { name: "Apr", revenue: 22500 },
  { name: "May", revenue: 25300 },
  { name: "Jun", revenue: 28900 },
  { name: "Jul", revenue: 27200 },
  { name: "Aug", revenue: 32100 },
  { name: "Sep", revenue: 35800 },
  { name: "Oct", revenue: 39500 },
  { name: "Nov", revenue: 42100 },
  { name: "Dec", revenue: 45200 },
];

const recentOrders: RecentOrder[] = [
  {
    id: "ORD-5123",
    customer: "Ahmed Khan",
    date: "2023-11-20",
    total: 1250,
    status: "CONFIRMED",
    items: 3,
  },
  {
    id: "ORD-5122",
    customer: "Fatima Rahman",
    date: "2023-11-20",
    total: 850,
    status: "PLACED",
    items: 2,
  },
  {
    id: "ORD-5121",
    customer: "Mohammad Ali",
    date: "2023-11-19",
    total: 2100,
    status: "SHIPPED",
    items: 5,
  },
  {
    id: "ORD-5120",
    customer: "Nusrat Jahan",
    date: "2023-11-19",
    total: 450,
    status: "DELIVERED",
    items: 1,
  },
  {
    id: "ORD-5119",
    customer: "Kamal Hossain",
    date: "2023-11-18",
    total: 1800,
    status: "CANCELLED",
    items: 4,
  },
];

const lowStockProducts: LowStockProduct[] = [
  { id: "PROD-001", name: "Paracetamol 500mg", stock: 8, threshold: 10 },
  { id: "PROD-015", name: "Vitamin D3 1000IU", stock: 5, threshold: 15 },
  {
    id: "PROD-023",
    name: "Blood Glucose Test Strips",
    stock: 12,
    threshold: 20,
  },
];

const expiringProducts: ExpiringProduct[] = [
  {
    id: "PROD-007",
    name: "Amoxicillin 500mg",
    expiryDate: "2023-12-15",
    stock: 45,
  },
  {
    id: "PROD-019",
    name: "Insulin 100IU/ml",
    expiryDate: "2023-12-20",
    stock: 18,
  },
];

const chartConfig: {
  revenue: ChartConfig;
  sales: ChartConfig;
  value: ChartConfig;
} = {
  revenue: {
    label: "Revenue",
    theme: {
      light: "hsl(var(--primary))",
      dark: "hsl(var(--primary))",
    },
  },
  sales: {
    label: "Sales",
    theme: {
      light: "hsl(var(--primary))",
      dark: "hsl(var(--primary))",
    },
  },
  value: {
    label: "Value",
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

  return (
    <div className="w-full space-y-6">
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
            <div className="text-2xl font-bold">BDT 45,231.89</div>
            <div className="flex items-center pt-1">
              <span className="flex items-center text-xs text-green-500">
                <ArrowUp className="mr-1 h-3 w-3" />
                +20.1%
              </span>
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
            <div className="text-2xl font-bold">573</div>
            <div className="flex items-center pt-1">
              <span className="flex items-center text-xs text-green-500">
                <ArrowUp className="mr-1 h-3 w-3" />
                +12.2%
              </span>
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
            <div className="text-2xl font-bold">2,350</div>
            <div className="flex items-center pt-1">
              <span className="flex items-center text-xs text-green-500">
                <ArrowUp className="mr-1 h-3 w-3" />
                +18.7%
              </span>
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
            <div className="text-2xl font-bold">12,234</div>
            <div className="flex items-center pt-1">
              <span className="flex items-center text-xs text-red-500">
                <ArrowDown className="mr-1 h-3 w-3" />
                -2.5%
              </span>
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
            <div className="h-[300px]">
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={revenueData}>
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
                      dataKey="name"
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
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltipContent>
                              <div className="font-medium">
                                Month: {payload[0].payload.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Revenue: BDT {payload[0].value}
                              </div>
                            </ChartTooltipContent>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="url(#colorRevenue)"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
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
              {recentOrders.slice(0, 4).map((order) => (
                <div key={order.id} className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <CreditCard className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center">
                      <p className="text-sm font-medium">{order.id}</p>
                      <div className="ml-2">
                        {getOrderStatusBadge(order.status)}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {order.customer}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      BDT {order.total.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">
                View All Orders
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
                  {lowStockProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="whitespace-nowrap font-medium">
                        {product.id}
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
                        <Button size="sm" variant="outline">
                          Restock
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
              <CardTitle>Expiring Soon</CardTitle>
              <CardDescription>
                Products expiring within 30 days
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
                  {expiringProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="whitespace-nowrap font-medium">
                        {product.id}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {product.name}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-center">
                        <Badge
                          variant="outline"
                          className="border-red-200 bg-red-50 text-red-700"
                        >
                          {new Date(product.expiryDate).toLocaleDateString()}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        <Button size="sm" variant="outline">
                          Manage
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
