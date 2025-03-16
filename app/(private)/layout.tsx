"use client";

import { ReactNode } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
