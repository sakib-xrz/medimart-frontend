"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Pill,
  NutIcon,
  LigatureIcon as Bandage,
  Sparkles,
  Leaf,
  Activity,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: {
    id: string;
    title: string;
    description: string;
    link: string;
    icon: string;
    productCount: number;
    color: string;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Map of icons to use based on category type
  const iconMap: { [key: string]: JSX.Element } = {
    Supplements: <NutIcon className="h-6 w-6" />,
    "First Aid": <Bandage className="h-6 w-6" />,
    "Women's Health": <Activity className="h-6 w-6" />,
    "Pain Relief": <Pill className="h-6 w-6" />,
    "Skin Care": <Sparkles className="h-6 w-6" />,
    "Digestive Health": <Leaf className="h-6 w-6" />,
  };

  // Get the appropriate icon or default to Pill
  const CategoryIcon = iconMap[category.title] || <Pill className="h-6 w-6" />;

  return (
    <Link href={category.link} className="block h-full">
      <Card
        className={cn(
          "group relative flex h-full flex-col overflow-hidden border-none p-0 shadow-md transition-all duration-300",
          isHovered ? "translate-y-[-5px] shadow-lg" : "",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: `linear-gradient(135deg, ${category.color}15 0%, ${category.color}30 100%)`,
        }}
      >
        {/* Decorative elements */}
        <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10 blur-xl" />
        <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/5 blur-xl" />

        <div className="z-10 flex flex-1 flex-col p-6">
          <div className="mb-6 flex items-center justify-between">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-md transition-transform duration-300 group-hover:rotate-[-5deg]"
              style={{
                background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}90 100%)`,
                color: "white",
              }}
            >
              {CategoryIcon}
            </div>
            <span
              className="rounded-full px-3 py-1 text-xs font-medium shadow-sm"
              style={{
                background: "white",
                color: category.color,
              }}
            >
              {category.productCount} products
            </span>
          </div>

          <h3 className="mb-2 text-xl font-bold tracking-tight">
            {category.title}
          </h3>
          <p className="mb-6 flex-1 text-sm text-muted-foreground">
            {category.description}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <span
              className="text-sm font-medium"
              style={{ color: category.color }}
            >
              View Products
            </span>
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
                isHovered ? "translate-x-1" : "",
              )}
              style={{
                background: category.color,
                color: "white",
              }}
            >
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
