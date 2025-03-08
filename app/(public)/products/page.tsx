"use client";

import Container from "@/components/shared/container";
import ProductListHeader from "./_components/product-list-header";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import ProductListFilters from "./_components/product-list-filters";
import ProductCard from "../_components/product-card";
import { categoryNames, forms } from "@/lib/constant";

// Mock product data
const allProducts = [
  {
    _id: "67cb1d68714acf32241d5140",
    name: "Medical Tape",
    slug: "med-b74fc3",
    price: 90,
    category: "First Aid",
    category_slug: "first-aid",
    dosage: "N/A",
    form: "Roll",
    description: "Hypoallergenic adhesive medical tape.",
    requires_prescription: false,
    discount: 5,
    discount_type: "PERCENTAGE",
    stock: 45,
    in_stock: true,
    expiry_date: "2027-05-18T00:00:00.000Z",
  },
  {
    _id: "67cb1d68714acf32241d513d",
    name: "Antiseptic Wipes",
    slug: "med-607e16",
    price: 100,
    category: "First Aid",
    category_slug: "first-aid",
    dosage: "N/A",
    form: "Wipes",
    description: "Alcohol-based antiseptic wipes for cleaning wounds.",
    requires_prescription: false,
    discount: 0,
    discount_type: "PERCENTAGE",
    stock: 75,
    in_stock: true,
    expiry_date: "2026-09-15T00:00:00.000Z",
  },
  {
    _id: "67cb1d68714acf32241d513f",
    name: "Sterile Gauze Pads",
    slug: "med-86c788",
    price: 180,
    category: "First Aid",
    category_slug: "first-aid",
    dosage: "N/A",
    form: "Pad",
    description: "Sterile gauze pads for dressing wounds.",
    requires_prescription: false,
    discount: 0,
    discount_type: "PERCENTAGE",
    stock: 60,
    in_stock: true,
    expiry_date: "2027-03-25T00:00:00.000Z",
  },
  {
    _id: "67cb1d68714acf32241d513e",
    name: "Hydrogen Peroxide Solution 3%",
    slug: "med-a1b583",
    price: 120,
    category: "First Aid",
    category_slug: "first-aid",
    dosage: "3%",
    form: "Liquid",
    description: "Disinfects cuts, wounds, and minor burns.",
    requires_prescription: false,
    discount: 10,
    discount_type: "PERCENTAGE",
    stock: 40,
    in_stock: true,
    expiry_date: "2026-06-20T00:00:00.000Z",
  },
  {
    _id: "67cb1d68714acf32241d5141",
    name: "Paracetamol 500mg",
    slug: "med-c45d21",
    price: 50,
    category: "Pain Relief",
    category_slug: "pain-relief",
    dosage: "500mg",
    form: "Tablet",
    description: "For relief of mild to moderate pain and fever reduction.",
    requires_prescription: false,
    discount: 0,
    discount_type: "PERCENTAGE",
    stock: 100,
    in_stock: true,
    expiry_date: "2025-08-10T00:00:00.000Z",
  },
  {
    _id: "67cb1d68714acf32241d5142",
    name: "Ibuprofen 200mg",
    slug: "med-d32e78",
    price: 65,
    category: "Pain Relief",
    category_slug: "pain-relief",
    dosage: "200mg",
    form: "Tablet",
    description: "Anti-inflammatory medication for pain and fever.",
    requires_prescription: false,
    discount: 0,
    discount_type: "PERCENTAGE",
    stock: 85,
    in_stock: true,
    expiry_date: "2025-10-15T00:00:00.000Z",
  },
  {
    _id: "67cb1d68714acf32241d5143",
    name: "Aspirin 300mg",
    slug: "med-e21f56",
    price: 45,
    category: "Pain Relief",
    category_slug: "pain-relief",
    dosage: "300mg",
    form: "Tablet",
    description:
      "For pain relief, fever reduction, and anti-inflammatory effects.",
    requires_prescription: false,
    discount: 0,
    discount_type: "PERCENTAGE",
    stock: 90,
    in_stock: true,
    expiry_date: "2025-09-20T00:00:00.000Z",
  },
  {
    _id: "67cb1d68714acf32241d5144",
    name: "Cetirizine 10mg",
    slug: "med-f12g34",
    price: 70,
    category: "Allergy",
    category_slug: "allergy",
    dosage: "10mg",
    form: "Tablet",
    description: "Antihistamine for allergy relief.",
    requires_prescription: false,
    discount: 0,
    discount_type: "PERCENTAGE",
    stock: 60,
    in_stock: true,
    expiry_date: "2025-11-05T00:00:00.000Z",
  },
  {
    _id: "67cb1d68714acf32241d5145",
    name: "Loratadine 10mg",
    slug: "med-g45h67",
    price: 75,
    category: "Allergy",
    category_slug: "allergy",
    dosage: "10mg",
    form: "Tablet",
    description: "Non-drowsy antihistamine for allergy symptoms.",
    requires_prescription: false,
    discount: 5,
    discount_type: "PERCENTAGE",
    stock: 55,
    in_stock: true,
    expiry_date: "2025-12-10T00:00:00.000Z",
  },
  {
    _id: "67cb1d68714acf32241d5146",
    name: "Vitamin C 500mg",
    slug: "med-h78i90",
    price: 120,
    category: "Vitamins",
    category_slug: "vitamins",
    dosage: "500mg",
    form: "Tablet",
    description: "Supports immune system health.",
    requires_prescription: false,
    discount: 10,
    discount_type: "PERCENTAGE",
    stock: 70,
    in_stock: true,
    expiry_date: "2026-01-15T00:00:00.000Z",
  },
  {
    _id: "67cb1d68714acf32241d5147",
    name: "Vitamin D3 1000IU",
    slug: "med-i91j23",
    price: 150,
    category: "Vitamins",
    category_slug: "vitamins",
    dosage: "1000IU",
    form: "Capsule",
    description: "Supports bone health and immune function.",
    requires_prescription: false,
    discount: 0,
    discount_type: "PERCENTAGE",
    stock: 65,
    in_stock: true,
    expiry_date: "2026-02-20T00:00:00.000Z",
  },
  {
    _id: "67cb1d68714acf32241d5148",
    name: "Multivitamin Complex",
    slug: "med-j24k56",
    price: 200,
    category: "Vitamins",
    category_slug: "vitamins",
    dosage: "Standard",
    form: "Tablet",
    description: "Complete daily vitamin and mineral supplement.",
    requires_prescription: false,
    discount: 15,
    discount_type: "PERCENTAGE",
    stock: 50,
    in_stock: true,
    expiry_date: "2026-03-15T00:00:00.000Z",
  },
  {
    _id: "67cb1d68714acf32241d5149",
    name: "Amoxicillin 500mg",
    slug: "med-k57l89",
    price: 180,
    category: "Antibiotics",
    category_slug: "antibiotics",
    dosage: "500mg",
    form: "Capsule",
    description: "Broad-spectrum antibiotic for bacterial infections.",
    requires_prescription: true,
    discount: 0,
    discount_type: "PERCENTAGE",
    stock: 40,
    in_stock: true,
    expiry_date: "2025-07-10T00:00:00.000Z",
  },
  {
    _id: "67cb1d68714acf32241d514a",
    name: "Azithromycin 250mg",
    slug: "med-l90m12",
    price: 220,
    category: "Antibiotics",
    category_slug: "antibiotics",
    dosage: "250mg",
    form: "Tablet",
    description: "Antibiotic for respiratory, skin, and other infections.",
    requires_prescription: true,
    discount: 0,
    discount_type: "PERCENTAGE",
    stock: 35,
    in_stock: true,
    expiry_date: "2025-08-15T00:00:00.000Z",
  },
  {
    _id: "67cb1d68714acf32241d514b",
    name: "Digital Thermometer",
    slug: "med-m13n45",
    price: 350,
    category: "Medical Devices",
    category_slug: "medical-devices",
    dosage: "N/A",
    form: "Device",
    description: "Fast and accurate temperature measurement.",
    requires_prescription: false,
    discount: 5,
    discount_type: "PERCENTAGE",
    stock: 25,
    in_stock: true,
    expiry_date: "2030-01-01T00:00:00.000Z",
  },
  {
    _id: "67cb1d68714acf32241d514c",
    name: "Blood Pressure Monitor",
    slug: "med-n46o78",
    price: 1200,
    category: "Medical Devices",
    category_slug: "medical-devices",
    dosage: "N/A",
    form: "Device",
    description: "Digital blood pressure monitor for home use.",
    requires_prescription: false,
    discount: 10,
    discount_type: "PERCENTAGE",
    stock: 15,
    in_stock: true,
    expiry_date: "2030-01-01T00:00:00.000Z",
  },
];

export default function Product() {
  return (
    <main className="flex-1 bg-muted/30">
      <Container>
        <h1 className="mb-6 text-3xl font-bold tracking-tight">All Products</h1>

        {/* Product List Header with Search, Sort and mobile Filter*/}
        <ProductListHeader />

        <div className="mt-4 text-sm text-muted-foreground">
          Showing {allProducts.length} products
        </div>

        <div className="mt-6 lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block">
            <div className="sticky top-20 rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between pb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="secondary"
                  size="sm"
                  //   onClick={() => {
                  //     setSelectedCategories([]);
                  //     setSelectedForms([]);
                  //     setPriceRange([0, 1500]);
                  //     setInStockOnly(false);
                  //     setPrescriptionFilter("all");
                  //   }}
                >
                  <X className="h-4 w-4" />
                  Clear All
                </Button>
              </div>
              <ProductListFilters categories={categoryNames} forms={forms} />
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {allProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:gap-4 xl:grid-cols-3">
                {allProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex h-60 flex-col items-center justify-center rounded-lg border bg-card p-8 text-center">
                <h3 className="mb-2 text-lg font-semibold">
                  No products found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  //   onClick={() => {
                  //     setSearchQuery("");
                  //     setSelectedCategories([]);
                  //     setSelectedForms([]);
                  //     setPriceRange([0, 1500]);
                  //     setInStockOnly(false);
                  //     setPrescriptionFilter("all");
                  //     setSortOption("featured");
                  //   }}
                >
                  Reset All Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {/* {filteredProducts.length > 0 && (
              <div className="mt-8">
                <ProductListPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )} */}
          </div>
        </div>
      </Container>
    </main>
  );
}
