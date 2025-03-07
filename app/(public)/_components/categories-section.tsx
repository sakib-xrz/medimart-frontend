import Container from "@/components/shared/container";
import CategoryCard from "./category-card";

export function CategoriesSection() {
  const categories = [
    {
      id: "1",
      title: "Supplements",
      description:
        "Vitamins and minerals to support overall health and wellness.",
      link: "/categories/supplements",
      icon: "NutIcon",
      productCount: 24,
      color: "#FFD166",
      slug: "supplements",
    },
    {
      id: "2",
      title: "First Aid",
      description: "Essential supplies for treating minor injuries and wounds.",
      link: "/categories/first-aid",
      icon: "Bandage",
      productCount: 20,
      color: "#4ECDC4",
      slug: "first-aid",
    },
    {
      id: "3",
      title: "Women's Health",
      description: "Specialized products for women's wellness needs.",
      link: "/categories/womens-health",
      icon: "Activity",
      productCount: 19,
      color: "#CB429F",
      slug: "womens-health",
    },
    {
      id: "4",
      title: "Pain Relief",
      description:
        "Medications to alleviate pain, reduce inflammation, and lower fever.",
      link: "/categories/pain-relief",
      icon: "Pill",
      productCount: 18,
      color: "#FF6B6B",
      slug: "pain-relief",
    },
    {
      id: "5",
      title: "Skin Care",
      description: "Treatments for various skin conditions and daily care.",
      link: "/categories/skin-care",
      icon: "Sparkles",
      productCount: 22,
      color: "#7A86CB",
      slug: "skin-care",
    },
    {
      id: "6",
      title: "Digestive Health",
      description: "Relief for digestive issues and gut health support.",
      link: "/categories/digestive-health",
      icon: "Leaf",
      productCount: 16,
      color: "#06D6A0",
      slug: "digestive-health",
    },
  ];

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
