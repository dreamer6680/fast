'use client';

import { useParams } from 'next/navigation';
import { i18n, t } from './i18n';

// Hook for client components
export function useTranslations() {
  const params = useParams();
  const locale = (params?.lang as string) || i18n.defaultLanguage;

  return {
    t: (key: string, replacements?: Record<string, string>) => {
      let result = t(`common:${key}`, locale);
      
      // Handle string replacements like {docsLink}
      if (replacements) {
        Object.entries(replacements).forEach(([placeholder, value]) => {
          result = result.replace(`{${placeholder}}`, value);
        });
      }
      
      return result;
    },
    locale,
  };
}