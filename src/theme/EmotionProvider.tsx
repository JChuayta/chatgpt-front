"use client";

import { CacheProvider } from "@emotion/react";
import { emotionCache } from "./emotionCache";

export function EmotionProvider({ children }: { children: React.ReactNode }) {
  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
}
