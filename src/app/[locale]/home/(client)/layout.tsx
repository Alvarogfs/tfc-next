'use client';

import type { ReactElement, ReactNode } from 'react';
import { I18nProviderClient } from '@/locales/client';
import { SessionProvider } from 'next-auth/react';

type ProviderProps = {
  locale: string;
  children: ReactNode;
};

export default function SubLayout({ params: { locale }, children }: { params: { locale: string }, children: ReactElement }) {
  return (
    <SessionProvider>
    <I18nProviderClient locale={locale}>
      {children}
    </I18nProviderClient>
    </SessionProvider>
  )
}