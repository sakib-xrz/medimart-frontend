"use client";

import { useState } from "react";
import {
  ClipboardList,
  MoreHorizontal,
  Search,
  Trash,
  UserCog,
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

// Sample customer data
const customers = [
  {
    id: "CUST-001",
    name: "Ahmed Khan",
    email: "ahmed.khan@example.com",
    phone: "+880 1712 345678",
    orders: 12,
    totalSpent: 15420,
    status: "active",
    joinedDate: "2023-05-12",
  },
  {
    id: "CUST-002",
    name: "Fatima Rahman",
    email: "fatima.r@example.com",
    phone: "+880 1812 345678",
    orders: 8,
    totalSpent: 9850,
    status: "active",
    joinedDate: "2023-06-24",
  },
  {
    id: "CUST-003",
    name: "Mohammad Ali",
    email: "mohammad.ali@example.com",
    phone: "+880 1912 345678",
    orders: 5,
    totalSpent: 4250,
    status: "inactive",
    joinedDate: "2023-07-15",
  },
  {
    id: "CUST-004",
    name: "Nusrat Jahan",
    email: "nusrat.j@example.com",
    phone: "+880 1612 345678",
    orders: 15,
    totalSpent: 18750,
    status: "active",
    joinedDate: "2023-04-08",
  },
  {
    id: "CUST-005",
    name: "Kamal Hossain",
    email: "kamal.h@example.com",
    phone: "+880 1512 345678",
    orders: 3,
    totalSpent: 2150,
    status: "blocked",
    joinedDate: "2023-08-19",
  },
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter customers based on search query and status
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (customerId: string, newStatus: string) => {
    // In a real application, this would call an API to update the status
    console.log(`Changing customer ${customerId} status to ${newStatus}`);
    // For demo purposes, we would update the state here
  };

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
            type="search"
            placeholder="Search customers..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden text-center md:table-cell">
                Orders
              </TableHead>
              <TableHead className="hidden text-center md:table-cell">
                Total Spent
              </TableHead>
              <TableHead className="hidden text-center md:table-cell">
                Joined
              </TableHead>
              <TableHead className="hidden text-center sm:table-cell">
                Change Status
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {customer.email}
                    </div>
                    <div className="text-sm text-muted-foreground md:hidden">
                      {customer.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden text-center md:table-cell">
                  {customer.orders}
                </TableCell>
                <TableCell className="hidden text-center md:table-cell">
                  BDT {customer.totalSpent.toLocaleString()}
                </TableCell>
                <TableCell className="hidden text-center md:table-cell">
                  {new Date(customer.joinedDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="hidden text-center sm:table-cell">
                  <Select
                    defaultValue={customer.status}
                    onValueChange={(value) =>
                      handleStatusChange(customer.id, value)
                    }
                  >
                    <SelectTrigger className="mx-auto w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
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
                        <UserCog className="mr-1 h-4 w-4" />
                        Edit Details
                      </DropdownMenuItem>
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
    </div>
  );
}
