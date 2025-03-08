import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function ProductCardSkeleton() {
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-lg shadow-sm">
      <CardHeader className="p-4 pb-0">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 pt-4">
        <Skeleton className="mb-1 h-6 w-3/4" />
        <div className="mb-2 flex gap-x-2 gap-y-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="mb-2 h-4 w-full" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="mt-1 flex items-center text-xs">
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
      <CardFooter className="mt-auto p-4 pt-0">
        <div className="flex w-full flex-col gap-3">
          <div className="flex items-center">
            <Skeleton className="h-8 w-8 rounded-r-none" />
            <Skeleton className="h-8 w-12 rounded-none" />
            <Skeleton className="h-8 w-8 rounded-l-none" />
          </div>
          <div className="flex w-full gap-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
