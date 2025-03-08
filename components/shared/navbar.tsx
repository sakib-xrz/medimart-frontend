"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ShoppingCart, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Logo from "@/public/logo.svg";
import Container from "./container";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-1 md:gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-[300px]">
              <div className="flex flex-col gap-6">
                <Link
                  href="/"
                  className="flex w-fit items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Image src={Logo} alt="Medi Mart Logo" className="w-32" />
                </Link>
                <nav className="flex flex-col gap-4">
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className={cn(
                        "text-lg font-medium hover:text-primary",
                        pathname === "/" && "text-primary",
                      )}
                    >
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/products"
                      className={cn(
                        "text-lg font-medium hover:text-primary",
                        pathname === "/products" && "text-primary",
                        pathname.includes("/product") && "text-primary",
                      )}
                    >
                      Products
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/categories"
                      className={cn(
                        "text-lg font-medium hover:text-primary",
                        pathname === "/categories" && "text-primary",
                      )}
                    >
                      Categories
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/about"
                      className={cn(
                        "text-lg font-medium hover:text-primary",
                        pathname === "/about" && "text-primary",
                      )}
                    >
                      About
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/contact"
                      className={cn(
                        "text-lg font-medium hover:text-primary",
                        pathname === "/contact" && "text-primary",
                      )}
                    >
                      Contact
                    </Link>
                  </SheetClose>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center">
            <Image src={Logo} alt="Medi Mart Logo" className="w-32 lg:w-40" />
          </Link>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium hover:text-primary",
              pathname === "/" && "text-primary",
            )}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={cn(
              "text-sm font-medium hover:text-primary",
              pathname === "/products" && "text-primary",
              pathname.includes("/product") && "text-primary",
            )}
          >
            Products
          </Link>
          <Link
            href="/categories"
            className={cn(
              "text-sm font-medium hover:text-primary",
              pathname === "/categories" && "text-primary",
            )}
          >
            Categories
          </Link>
          <Link
            href="/about"
            className={cn(
              "text-sm font-medium hover:text-primary",
              pathname === "/about" && "text-primary",
            )}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={cn(
              "text-sm font-medium hover:text-primary",
              pathname === "/contact" && "text-primary",
            )}
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-1 lg:gap-2">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                0
              </span>
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </Container>
    </header>
  );
}
