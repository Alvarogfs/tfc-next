"use client";

import { useEffect, type ReactElement, type ReactNode, useRef } from "react";
import { I18nProviderClient } from "@/locales/client";
import { SessionProvider } from "next-auth/react";
type ProviderProps = {
  locale: string;
  children: ReactNode;
};
export const dynamic = "force-dynamic"
export default function SubLayout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactElement;
}) {
  return (
    <SessionProvider>
      <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
    </SessionProvider>
  );
}
