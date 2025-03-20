"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { SectionLoading } from "@/components/ui/section-loading";

interface DataLoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingHeight?: string;
  loadingText?: string;
}

export function DataLoading({
  isLoading,
  children,
  loadingHeight = "h-32",
  loadingText = "Loading...",
}: DataLoadingProps) {
  const [showLoading, setShowLoading] = useState(isLoading);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isLoading) {
      timeout = setTimeout(() => {
        setShowLoading(true);
      }, 300); // Small delay to prevent flashing for quick loads
    } else {
      setShowLoading(false);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  if (showLoading) {
    return <SectionLoading height={loadingHeight} text={loadingText} />;
  }

  return <>{children}</>;
}
