"use client";

import type React from "react";

import { useEffect, useState } from "react";
import {
  ClipboardList,
  MoreHorizontal,
  Search,
  Trash,
  X,
  Users,
  Loader2,
  FileSearch,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCustomerQuery } from "@/redux/features/user/userApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { generateQueryString, sanitizeParams } from "@/lib/utils";
import CustomPagination from "@/app/(public)/_components/custom-pagination";

interface Customer {
  _id: string;
  name: string;
  email: string;
  role: "CUSTOMER";
  status: "ACTIVE" | "BLOCKED";
  createdAt: string;
  total_spent: number;
  total_orders: number;
}

export default function CustomersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchKey, setSearchKey] = useState(searchParams.get("search") || "");

  const [params, setParams] = useState({
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "",
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 20,
  });

  const debouncedSearch = useDebouncedCallback((value) => {
    setParams((prev) => ({ ...prev, search: value, page: 1 }));
  }, 400);

  const modifyParams = {
    ...params,
    status: params.status === "all" ? "" : params.status,
  };

  const updateURL = () => {
    const queryString = generateQueryString(modifyParams);
    router.push(
      decodeURIComponent(`/admin/customers${queryString}`),
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

  // const handleStatusChange = (customerId: string, newStatus: string) => {};

  const { data: customersData, isLoading: isCustomersLoading } =
    useGetCustomerQuery(sanitizeParams(modifyParams));

  const customers = customersData?.data || [];

  const meta = customersData?.meta || {};

  const totalPages = Math.ceil(meta.total / meta.limit);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setParams((prev) => ({ ...prev, page }));
    }
  };

  // Loading state component
  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
      <p className="text-lg text-muted-foreground">Loading customers...</p>
    </div>
  );

  // Empty state component (no customers at all)
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <Users className="mb-4 h-12 w-12 text-muted-foreground" />
      <h3 className="mb-1 text-lg font-medium">No customers yet</h3>
      <p className="text-muted-foreground">
        You don&apos;t have any customers in your store yet.
      </p>
    </div>
  );

  // Empty search results component
  const EmptySearchState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <FileSearch className="mb-4 h-12 w-12 text-muted-foreground" />
      <h3 className="mb-1 text-lg font-medium">No results found</h3>
      <p className="mb-4 text-muted-foreground">
        No customers match your search criteria.
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer accounts</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
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
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Select
            value={params.status}
            onValueChange={(value) => {
              setParams((prevParams) => ({
                ...prevParams,
                status: value,
              }));
            }}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="BLOCKED">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isCustomersLoading ? (
        <LoadingState />
      ) : customers.length === 0 && !params.search.length ? (
        <EmptyState />
      ) : customers.length === 0 && params.search.length ? (
        <EmptySearchState />
      ) : (
        <>
          {/* Card view for medium devices */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:hidden">
            {customers.map((customer: Customer) => (
              <div
                key={customer._id}
                className="rounded-lg border bg-white p-4 shadow-sm"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-medium">{customer.name}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem className="cursor-pointer">
                        <ClipboardList className="mr-1 h-4 w-4" />
                        View Orders
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer focus:bg-destructive focus:text-destructive-foreground">
                        <Trash className="mr-1 h-4 w-4" />
                        Delete Customer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="text-sm text-muted-foreground">
                  {customer.email}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-md bg-muted p-2 text-center">
                    <div className="text-xs text-muted-foreground">Orders</div>
                    <div className="font-medium">{customer.total_orders}</div>
                  </div>
                  <div className="rounded-md bg-muted p-2 text-center">
                    <div className="text-xs text-muted-foreground">
                      Total Spent
                    </div>
                    <div className="font-medium">
                      BDT {customer.total_spent.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Joined: {new Date(customer.createdAt).toLocaleDateString()}
                  </div>
                  <Select
                    defaultValue={customer.status}
                    // onValueChange={(value) => handleStatusChange(customer._id, value)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="BLOCKED">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>

          {/* Table view for large devices */}
          <div className="hidden rounded-md border bg-white lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-center">Orders</TableHead>
                  <TableHead className="text-center">Total Spent</TableHead>
                  <TableHead className="text-center">Joined</TableHead>
                  <TableHead className="text-center">Change Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer: Customer) => (
                  <TableRow key={customer._id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {customer.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {customer.total_orders}
                    </TableCell>
                    <TableCell className="text-center">
                      BDT {customer.total_spent.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <Select
                        defaultValue={customer.status}
                        // onValueChange={(value) => handleStatusChange(customer._id, value)}
                      >
                        <SelectTrigger className="mx-auto w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ACTIVE">Active</SelectItem>
                          <SelectItem value="BLOCKED">Blocked</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem className="cursor-pointer">
                            <ClipboardList className="mr-1 h-4 w-4" />
                            View Orders
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer focus:bg-destructive focus:text-destructive-foreground">
                            <Trash className="mr-1 h-4 w-4" />
                            Delete Customer
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
