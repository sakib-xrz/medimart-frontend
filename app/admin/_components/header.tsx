"use client";

import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import Logo from "@/public/logo.svg";
import Image from "next/image";

interface AdminHeaderProps {
  onMenuClick: () => void;
  isMobile: boolean;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const user = useCurrentUser();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
      <div className="flex items-center gap-1 md:gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="hidden lg:flex"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <Link href="/" className="flex items-center gap-2 xl:hidden">
          <Image src={Logo} alt="Medi Mart Logo" className="w-32" />
        </Link>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full bg-primary p-1 text-background focus-visible:outline-none">
          <User className="h-5 w-5" />
          <span className="sr-only">Account</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-44 max-w-60" align="end">
          <DropdownMenuLabel className="truncate">
            {user?.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/admin/dashboard">Dashboard</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer focus:bg-destructive focus:text-destructive-foreground"
            asChild
          >
            <Link href="/logout">Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
