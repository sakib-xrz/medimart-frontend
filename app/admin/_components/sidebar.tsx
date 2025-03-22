"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  LayoutDashboard,
  Users,
  ShoppingBag,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Logo from "@/public/logo.svg";
import LogoSmall from "@/public/logo-small.svg";
import Image from "next/image";

interface AdminSidebarProps {
  collapsed: boolean;
  isMobile: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

export default function AdminSidebar({
  collapsed,
  isOpen,
  onToggle,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Customers",
      href: "/admin/customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Products",
      href: "/admin/products",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: <ClipboardList className="h-5 w-5" />,
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-30 hidden h-screen border-r bg-card shadow-sm transition-all duration-300 xl:flex xl:flex-col",
          collapsed ? "w-20" : "w-64",
        )}
      >
        <div
          className={cn(
            "flex h-16 items-center justify-between border-b px-4",
            collapsed && "justify-center",
          )}
        >
          <Link href="/" className="flex items-center gap-2">
            {!collapsed && (
              <Image src={Logo} alt="Medi Mart Logo" className="w-32" />
            )}
            {collapsed && (
              <Image src={LogoSmall} alt="Medi Mart Logo" className="w-8" />
            )}
          </Link>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  collapsed && "justify-center",
                )}
              >
                {item.icon}
                {!collapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-30 h-screen border-r bg-card shadow-sm transition-all duration-300 xl:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "w-64",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} alt="Medi Mart Logo" className="w-32" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
