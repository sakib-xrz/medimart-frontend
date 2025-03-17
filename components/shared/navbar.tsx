"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ShoppingCart, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useCartCount } from "@/redux/features/cart/cartSlice";
import { useCurrentUser } from "@/redux/features/auth/authSlice";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const cartCount = useCartCount();

  const user = useCurrentUser();

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
        <div className="flex items-center gap-2 lg:gap-3">
          <Link href="/cart">
            <Button variant="link" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          {!user ? (
            <>
              <Link href="/login">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full bg-primary p-1 text-background">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-44 max-w-60" align="end">
                <DropdownMenuLabel className="truncate">
                  {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
                {user.role === "ADMIN" && (
                  <DropdownMenuItem className="cursor-pointer">
                    Dashboard
                  </DropdownMenuItem>
                )}

                {user.role === "CUSTOMER" && (
                  <DropdownMenuItem className="cursor-pointer">
                    My Orders
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer focus:bg-destructive focus:text-destructive-foreground"
                  asChild
                >
                  <Link href="/logout">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </Container>
    </header>
  );
}
