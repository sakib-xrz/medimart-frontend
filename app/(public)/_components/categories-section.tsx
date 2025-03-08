import Container from "@/components/shared/container";
import CategoryCard from "./category-card";
import { categories } from "@/lib/constant";

export function CategoriesSection() {
  return (
    <section className="bg-muted/30" id="categories">
      <Container className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Browse Categories
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Find What You Need
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Explore our wide range of healthcare products categorized for easy
              navigation.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
