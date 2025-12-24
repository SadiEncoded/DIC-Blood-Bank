"use client";

import { ThemeProvider } from "@/lib/contexts/ThemeContext";
import React from "react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Toaster position="top-right" richColors />
      {children}
    </ThemeProvider>
  );
}
