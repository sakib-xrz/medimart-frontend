"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "./_components/sidebar";
import AdminHeader from "./_components/header";

// import AdminHeader from "@/components/admin/admin-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
      if (window.innerWidth >= 1280) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <AdminSidebar
        collapsed={sidebarCollapsed}
        isMobile={isMobile}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
      />

      {/* Main Content */}
      <div
        className={`flex flex-1 flex-col transition-all duration-300 ${sidebarCollapsed ? "xl:ml-20" : "xl:ml-64"}`}
      >
        {/* Header */}
        <AdminHeader onMenuClick={toggleSidebar} isMobile={isMobile} />

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
