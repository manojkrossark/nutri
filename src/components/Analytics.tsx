// src/components/Analytics.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import * as gtag from "@/lib/gtag";

const Analytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    gtag.pageview(pathname);
  }, [pathname]);

  return null;
};

export default Analytics;
