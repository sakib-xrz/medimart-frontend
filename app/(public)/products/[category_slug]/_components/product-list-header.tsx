/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ProductListFilters from "./product-list-filters";
import { forms } from "@/lib/constant";
import { TParams } from "../page";

interface ProductListHeaderProps {
  params: TParams;
  setParams: (params: TParams) => void;
  searchKey: string;
  setSearchKey: (value: string) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProductListHeader({
  params,
  setParams,
  searchKey,
  setSearchKey,
  handleSearchChange,
}: ProductListHeaderProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          className="pl-8"
          onChange={handleSearchChange}
          value={searchKey}
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center lg:hidden">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:block">Filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <div className="flex items-center justify-between pb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setSearchKey("");
                    setParams(() => ({
                      search: "",
                      form: [],
                      in_stock: null,
                      requires_prescription: null,
                      sort: "createdAt",
                      page: 1,
                      limit: 12,
                    }));
                  }}
                >
                  <X className="h-4 w-4" />
                  Clear All
                </Button>
              </div>
              <ProductListFilters
                forms={forms}
                params={params}
                setParams={setParams}
                className="h-full pb-20"
              />
            </SheetContent>
          </Sheet>
        </div>
        <div className="w-full xs:w-[180px]">
          <Select
            onValueChange={(value) => {
              setParams((prev: TParams) => ({
                ...prev,
                sort: value,
              }));
            }}
            value={params.sort}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Default</SelectItem>
              <SelectItem value="price">Price: Low to High</SelectItem>
              <SelectItem value="-price">Price: High to Low</SelectItem>
              <SelectItem value="name">Name: A to Z</SelectItem>
              <SelectItem value="-name">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
