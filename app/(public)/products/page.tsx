"use client";

import Container from "@/components/shared/container";
import ProductListHeader from "./_components/product-list-header";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import ProductListFilters from "./_components/product-list-filters";
import ProductCard from "../_components/product-card";
import { categoryNames, forms } from "@/lib/constant";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { generateQueryString, sanitizeParams } from "@/lib/utils";
import { useGetProductsQuery } from "@/redux/features/product/productApi";
import ProductCardSkeleton from "../_components/product-card-skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { IProduct } from "../_components/products-section";

export type TParams = {
  search: string;
  category: string[];
  form: string[];
  in_stock: string | null;
  requires_prescription: string | null;
  sort: string;
  page: number;
  limit: number;
};

export default function Product() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchKey, setSearchKey] = useState(searchParams.get("search") || "");

  const [params, setParams] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category")?.split(",") || [],
    form: searchParams.get("form")?.split(",") || [],
    in_stock: searchParams.get("in_stock") || null,
    requires_prescription: searchParams.get("requires_prescription") || null,
    sort: searchParams.get("sort") || "createdAt",
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 12,
  });

  const debouncedSearch = useDebouncedCallback((value) => {
    setParams((prev) => ({ ...prev, search: value, page: 1 }));
  }, 400);

  const modifyParams = {
    ...params,
    category: params.category.length > 0 ? params.category.join(",") : null,
    form: params.form.length > 0 ? params.form.join(",") : null,
  };

  const updateURL = () => {
    const queryString = generateQueryString(modifyParams);
    // @ts-expect-error - Fix this later
    router.push(decodeURIComponent(`/products${queryString}`), undefined, {
      shallow: true,
    });
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

  const { data, isLoading } = useGetProductsQuery(sanitizeParams(modifyParams));

  const products = data?.data || [];
  const meta = data?.meta || {};

  const totalPages = Math.ceil(meta.total / meta.limit);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setParams((prev) => ({ ...prev, page }));
    }
  };

  return (
    <main className="flex-1 bg-muted/30">
      <Container>
        <h1 className="mb-6 text-3xl font-bold tracking-tight">All Products</h1>

        {/* Product List Header with Search, Sort and mobile Filter*/}
        <ProductListHeader
          setParams={setParams}
          params={params}
          searchKey={searchKey}
          handleSearchChange={handleSearchChange}
        />

        <div className="mt-4 text-sm text-muted-foreground">
          Showing {products.length} products
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
                  onClick={() => {
                    setSearchKey("");
                    setParams(() => ({
                      search: "",
                      category: [],
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
                categories={categoryNames}
                forms={forms}
                params={params}
                setParams={setParams}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:gap-4 xl:grid-cols-3">
                {[...Array(12)].map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:gap-4 xl:grid-cols-3">
                  {products.map((product: IProduct) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      {/* Previous Button */}
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(params.page - 1);
                          }}
                          className={
                            params.page === 1
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>

                      {/* Page Numbers */}
                      {Array.from({ length: 5 }, (_, index) => {
                        const pageNumber = params.page - 2 + index;

                        if (pageNumber > 0 && pageNumber <= totalPages) {
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handlePageChange(pageNumber);
                                }}
                                className={
                                  params.page === pageNumber
                                    ? "bg-primary text-white"
                                    : ""
                                }
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                        return null;
                      })}

                      {/* Next Button */}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(params.page + 1);
                          }}
                          className={
                            params.page === totalPages
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </>
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
                  onClick={() => {
                    setSearchKey("");
                    setParams(() => ({
                      search: "",
                      category: [],
                      form: [],
                      in_stock: null,
                      requires_prescription: null,
                      sort: "createdAt",
                      page: 1,
                      limit: 12,
                    }));
                  }}
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
