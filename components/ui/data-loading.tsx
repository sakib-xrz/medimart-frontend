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
    if (isLoading) {
      setShowLoading(true);
    } else {
      setShowLoading(false);
    }
  }, [isLoading]);

  if (showLoading) {
    return <SectionLoading height={loadingHeight} text={loadingText} />;
  }

  return <>{children}</>;
}
