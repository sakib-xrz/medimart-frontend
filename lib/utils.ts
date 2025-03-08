import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateDiscountedPrice = (product: {
  price: number;
  discount: number;
  discount_type: string;
}) => {
  if (!product.discount) return product.price;

  if (product.discount_type === "PERCENTAGE") {
    return product.price - (product.price * product.discount) / 100;
  } else if (product.discount_type === "FLAT") {
    return product.price - product.discount;
  }

  return product.price;
};

export const formatExpiryDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
