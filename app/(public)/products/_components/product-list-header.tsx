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

const categories = [
  "Digestive Health",
  "First Aid",
  "Pain Relief",
  "Skin Care",
  "Supplements",
  "Women's Health",
];

const forms = [
  "Bandage",
  "Capsule",
  "Cream",
  "Cup",
  "Gel",
  "Liquid",
  "Pad",
  "Roll",
  "Strips",
  "Tablet",
  "Test Kit",
  "Wipes",
];

export default function ProductListHeader() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          className="pl-8"
          //   value={searchQuery}
          //   onChange={(e) => setSearchQuery(e.target.value)}
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
                  // onClick={() => {
                  //   setSelectedCategories([]);
                  //   setSelectedForms([]);
                  //   setPriceRange([0, 1500]);
                  //   setInStockOnly(false);
                  //   setPrescriptionFilter("all");
                  // }}
                >
                  <X className="h-4 w-4" />
                  Clear All
                </Button>
              </div>
              <ProductListFilters
                categories={categories}
                forms={forms}
                className="h-full pb-20"
              />
            </SheetContent>
          </Sheet>
        </div>
        <div className="w-full xs:w-[180px]">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
