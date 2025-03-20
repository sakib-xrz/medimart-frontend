"use client";

import { useState, useEffect } from "react";
import { LoadingSpinner } from "./loading-spinner";

interface OverlayLoadingProps {
  isLoading: boolean;
}

export function OverlayLoading({ isLoading }: OverlayLoadingProps) {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
    } else {
      setShowLoading(false);
    }
  }, [isLoading]);

  if (!showLoading) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <LoadingSpinner size="lg" />
    </div>
  );
}
