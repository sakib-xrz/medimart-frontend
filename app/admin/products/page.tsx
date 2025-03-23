"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit, Eye, MoreHorizontal, Plus, Search, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useGetProductsQuery } from "@/redux/features/product/productApi";
import { IProduct } from "@/app/(public)/_components/products-section";
import { categories } from "@/lib/constant";
import { formatExpiryDate } from "@/lib/utils";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: productsData } = useGetProductsQuery({});

  const products = productsData?.data || [];

  // Check if product is expired
  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };

  // Filter products based on search query, category, and status
  const filteredProducts = products.filter((product: IProduct) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product._id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "in-stock" && product.in_stock) ||
      (statusFilter === "out-of-stock" && !product.in_stock) ||
      (statusFilter === "expired" && isExpired(product.expiry_date));

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/products/create">
            <Button>
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="hidden text-center md:table-cell">
                Price
              </TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="hidden md:table-cell">Expiry</TableHead>
              <TableHead className="hidden text-center md:table-cell">
                Stock
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product: IProduct) => (
              <TableRow key={product._id}>
                <TableCell className="whitespace-nowrap font-medium uppercase">
                  {product.slug}
                </TableCell>
                <TableCell className="max-w-[150px]">
                  <div>
                    <div className="line-clamp-1 font-medium">
                      {product.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {product.form} • {product.dosage}
                    </div>
                    {product.requires_prescription && (
                      <Badge variant="outline" className="mt-1">
                        Prescription Required
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {product.category}
                </TableCell>
                <TableCell className="hidden text-center md:table-cell">
                  <p>
                    BDT{" "}
                    {(product.discount > 0
                      ? product.discount_type === "PERCENTAGE"
                        ? product.price -
                          (product.price * product.discount) / 100
                        : product.price - product.discount
                      : product.price
                    ).toLocaleString()}
                  </p>
                  {product.discount > 0 && (
                    <p className="ml-1 mt-1 border-green-400 text-green-600">
                      {product.discount_type === "PERCENTAGE"
                        ? `${product.discount}% Off`
                        : `BDT ${product.discount} Off`}
                    </p>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {isExpired(product.expiry_date) ? (
                    <Badge variant="destructive">Expired</Badge>
                  ) : !product.in_stock ? (
                    <Badge variant="destructive">Out of Stock</Badge>
                  ) : (
                    <Badge variant="default">In Stock</Badge>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span
                    className={
                      isExpired(product.expiry_date) ? "text-red-600" : ""
                    }
                  >
                    {formatExpiryDate(product.expiry_date)}
                  </span>
                </TableCell>
                <TableCell className="hidden text-center md:table-cell">
                  {product.stock}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <Link href={`/admin/products/${product._id}/edit`}>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4" />
                          Edit Product
                        </DropdownMenuItem>
                      </Link>
                      <Link
                        href={`/products/${product.category_slug}/${product.slug}`}
                      >
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="h-4 w-4" />
                        Delete Product
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
