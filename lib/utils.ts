import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const AUTH_TOKEN_KEY = "ACCESS_TOKEN";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
