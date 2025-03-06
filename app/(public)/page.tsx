import { CategoriesSection } from "./_components/categories-section";
import { CTASection } from "./_components/cta-section";
import { FeaturesSection } from "./_components/features-section";
import { HeroSection } from "./_components/hero-section";
import { ProductsSection } from "./_components/products-section";
import { TestimonialsSection } from "./_components/testimonials-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategoriesSection />
      <ProductsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
