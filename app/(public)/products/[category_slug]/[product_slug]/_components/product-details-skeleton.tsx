import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Container from "@/components/shared/container";

export default function ProductDetailsSkeleton() {
  return (
    <main className="flex-1 bg-muted/30">
      <Container>
        {/* Breadcrumb Skeleton */}
        <div className="mb-6 flex items-center space-x-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-5 w-16" />
        </div>

        {/* Back Button Skeleton */}
        <Skeleton className="mb-6 h-5 w-32" />

        {/* Product Details Skeleton */}
        <div className="mb-8 grid gap-8 lg:grid-cols-3">
          {/* Product Info Column */}
          <div className="lg:col-span-2">
            <Skeleton className="mb-4 h-5 w-40" />
            <Skeleton className="mb-2 h-8 w-3/4" />
            <Skeleton className="mb-4 h-6 w-40" />

            <div className="mb-6 space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-32" />
            </div>

            {/* Price and Add to Cart Skeleton */}
            <Skeleton className="mb-6 h-20 w-full" />

            {/* Delivery Info Skeleton */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div>
            {/* Quick Info Card Skeleton */}
            <Card className="mb-6">
              <CardHeader>
                <Skeleton className="h-8 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-5 w-full" />
                <hr />
                <Skeleton className="h-5 w-full" />
                <hr />
                <Skeleton className="h-5 w-full" />
                <hr />
                <Skeleton className="h-5 w-full" />
                <hr />
                <Skeleton className="h-5 w-full" />
                <hr />
                <Skeleton className="h-5 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
}
