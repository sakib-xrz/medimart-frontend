"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Edit,
  MoreHorizontal,
  Plus,
  Search,
  Trash,
  Package,
  Loader2,
  Tag,
  Pill,
  Calendar,
  PackageX,
  PackageCheck,
  X,
} from "lucide-react";
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
import type { IProduct } from "@/app/(public)/_components/products-section";
import { categories } from "@/lib/constant";
import {
  cn,
  formatExpiryDate,
  generateQueryString,
  sanitizeParams,
} from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import CustomPagination from "@/app/(public)/_components/custom-pagination";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchKey, setSearchKey] = useState(searchParams.get("search") || "");

  const [params, setParams] = useState({
    search: searchParams.get("search") || "",
    in_stock: searchParams.get("in_stock") || "all",
    category_slug: searchParams.get("category_slug") || "all",
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 20,
  });

  const debouncedSearch = useDebouncedCallback((value) => {
    setParams((prev) => ({ ...prev, search: value, page: 1 }));
  }, 400);

  const modifyParams = {
    ...params,
    in_stock: params.in_stock === "all" ? "" : params.in_stock,
    category_slug: params.category_slug === "all" ? "" : params.category_slug,
  };

  const updateURL = () => {
    const queryString = generateQueryString(modifyParams);
    router.push(
      decodeURIComponent(`/admin/products${queryString}`),
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

  const { data: productsData, isLoading } = useGetProductsQuery(
    sanitizeParams(modifyParams),
  );
  const products = productsData?.data || [];
  const meta = productsData?.meta || {};

  const totalPages = Math.ceil(meta.total / meta.limit);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setParams((prev) => ({ ...prev, page }));
    }
  };

  // Check if product is expired
  const isExpired = (expiryDate: string) => new Date(expiryDate) < new Date();

  // Calculate discounted price
  const calculateDiscountedPrice = (product: IProduct) => {
    if (product.discount > 0) {
      if (product.discount_type === "PERCENTAGE") {
        return product.price - (product.price * product.discount) / 100;
      } else {
        return product.price - product.discount;
      }
    }
    return product.price;
  };

  // Render product status badge
  const renderStatusBadge = (product: IProduct) => {
    if (isExpired(product.expiry_date)) {
      return <Badge variant="destructive">Expired</Badge>;
    } else if (!product.in_stock) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else {
      return <Badge variant="default">In Stock</Badge>;
    }
  };

  // Get product status
  const getProductStatus = (product: IProduct) => {
    if (isExpired(product.expiry_date))
      return {
        label: "Expired",
        variant: "destructive" as const,
        icon: PackageX,
      };
    if (!product.in_stock)
      return {
        label: "Out of Stock",
        variant: "destructive" as const,
        icon: PackageX,
      };
    return {
      label: "In Stock",
      variant: "default" as const,
      icon: PackageCheck,
    };
  };

  // New state components for consistency
  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
      <p className="text-lg text-muted-foreground">Loading products...</p>
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <Package className="mb-4 h-12 w-12 text-muted-foreground" />
      <h3 className="mb-1 text-lg font-medium">No products yet</h3>
      <p className="text-muted-foreground">
        You haven&apos;t added any products to your inventory yet.
      </p>
      <Link href="/admin/products/create">
        <Button className="mt-6">
          <Plus className="h-4 w-4" />
          Add Your First Product
        </Button>
      </Link>
    </div>
  );

  const EmptySearchState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <Search className="mb-4 h-12 w-12 text-muted-foreground" />
      <h3 className="mb-1 text-lg font-medium">No results found</h3>
      <p className="mb-4 text-muted-foreground">
        No products match your search criteria.
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

  return (
    <div className="space-y-6">
      {/* Header & Filter/Search Panel */}
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
            placeholder="Search products..."
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
            value={params.category_slug}
            onValueChange={(value) =>
              setParams((prev) => ({ ...prev, category_slug: value, page: 1 }))
            }
          >
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
          <Select
            value={params.in_stock}
            onValueChange={(value) =>
              setParams((prev) => ({ ...prev, in_stock: value, page: 1 }))
            }
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="true">In Stock</SelectItem>
              <SelectItem value="false">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Conditional rendering for products list */}
      {isLoading ? (
        <LoadingState />
      ) : products.length === 0 && !params.search.length ? (
        <EmptyState />
      ) : products.length === 0 && params.search.length ? (
        <EmptySearchState />
      ) : (
        <>
          {/* Card view for smaller screens */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:hidden">
            {products.map((product: IProduct) => {
              const status = getProductStatus(product);
              const discountedPrice = calculateDiscountedPrice(product);
              const hasDiscount = product.discount > 0;

              return (
                <Card key={product._id} className="overflow-hidden bg-white">
                  <CardHeader className="relative border-b bg-muted/30 pb-2 pt-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <h3 className="line-clamp-1 text-base font-semibold">
                          {product.name}
                        </h3>
                        <p className="text-xs uppercase text-muted-foreground">
                          {product.slug}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="-mr-2 -mt-1"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <Link href={`/admin/products/${product.slug}/edit`}>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Product
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer focus:bg-destructive focus:text-destructive-foreground">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete Product
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 p-4">
                    {/* Left column */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {product.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Pill className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {product.form} • {product.dosage}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span
                          className={`text-sm ${isExpired(product.expiry_date) ? "font-medium text-destructive" : ""}`}
                        >
                          {formatExpiryDate(product.expiry_date)}
                        </span>
                      </div>
                    </div>

                    <div className="flex w-full items-center gap-4">
                      {/* Price with discount */}
                      <div className="h-[86px] flex-1 rounded-md bg-muted/50 p-3 text-center">
                        <p className="text-xs text-muted-foreground">Price</p>
                        <p className="text-lg font-semibold">
                          BDT {discountedPrice.toLocaleString()}
                        </p>
                        {hasDiscount && (
                          <div className="mt-0.5 flex items-center justify-center gap-1 text-xs text-green-600">
                            <span className="text-muted-foreground line-through">
                              BDT {product.price.toLocaleString()}
                            </span>
                            <span>
                              {product.discount_type === "PERCENTAGE"
                                ? `(${product.discount}% off)`
                                : `(BDT ${product.discount} off)`}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Stock */}
                      <div className="h-[86px] flex-1 rounded-md bg-muted/50 p-3 text-center">
                        <p className="text-xs text-muted-foreground">Stock</p>
                        <p
                          className={cn("text-lg font-semibold", {
                            "text-destructive": !product.in_stock,
                          })}
                        >
                          {product.stock}
                        </p>
                        <p className="text-xs text-muted-foreground">units</p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex items-center justify-between border-t bg-muted/20 px-4 py-2">
                    {product.requires_prescription && (
                      <Badge
                        variant="outline"
                        className="border-amber-400 text-amber-600"
                      >
                        Prescription Required
                      </Badge>
                    )}
                    {!product.requires_prescription && (
                      <span className="text-xs text-muted-foreground">
                        No prescription needed
                      </span>
                    )}

                    <Badge
                      variant={status.variant}
                      className="flex items-center gap-1 shadow-sm"
                    >
                      <status.icon className="h-3 w-3" />
                      {status.label}
                    </Badge>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* Table view for larger screens */}
          <div className="hidden rounded-md border bg-white lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Category
                  </TableHead>
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
                {products.map((product: IProduct) => (
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
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.category}
                    </TableCell>
                    <TableCell className="hidden text-center md:table-cell">
                      <p>
                        BDT {calculateDiscountedPrice(product).toLocaleString()}
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
                      {renderStatusBadge(product)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span
                        className={
                          isExpired(product.expiry_date)
                            ? "text-destructive"
                            : ""
                        }
                      >
                        {formatExpiryDate(product.expiry_date)}
                      </span>
                    </TableCell>
                    <TableCell
                      className={cn("hidden text-center md:table-cell", {
                        "text-destructive": !product.in_stock,
                      })}
                    >
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
                          <Link href={`/admin/products/${product.slug}/edit`}>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4" />
                              Edit Product
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer focus:bg-destructive focus:text-destructive-foreground">
                            <Trash className="h-4 w-4" />
                            Delete Product
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
