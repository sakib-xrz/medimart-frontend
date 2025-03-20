"use client";

import { LoadingSpinner } from "./loading-spinner";

interface SectionLoadingProps {
  height?: string;
  text?: string;
}

export function SectionLoading({
  height = "h-32",
  text = "Loading...",
}: SectionLoadingProps) {
  return (
    <div className={`flex w-full items-center justify-center ${height}`}>
      <LoadingSpinner text={text} />
    </div>
  );
}
