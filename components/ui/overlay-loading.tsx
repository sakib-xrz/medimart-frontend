"use client";

import { useState, useEffect } from "react";
import { LoadingSpinner } from "./loading-spinner";

interface OverlayLoadingProps {
  isLoading: boolean;
  text?: string;
  delay?: number;
}

export function OverlayLoading({
  isLoading,
  text,
  delay = 300,
}: OverlayLoadingProps) {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isLoading) {
      timeout = setTimeout(() => {
        setShowLoading(true);
      }, delay);
    } else {
      setShowLoading(false);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading, delay]);

  if (!showLoading) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
}
