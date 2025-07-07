'use client';

import Link from 'next/link';
import { AISearchTrigger } from '@/components/ai';
import { useTranslations } from '@/lib/use-translations';

export default function HomePage() {
  const { t } = useTranslations();

  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <h1 className="mb-4 text-2xl font-bold">{t('home.title')}</h1>
      <p className="text-fd-muted-foreground mb-8">
        {t('home.subtitle', { 
          docsLink: (
            <Link
              href="/docs"
              className="text-fd-foreground font-semibold underline"
            >
              /docs
            </Link>
          ) as any
        })}
      </p>
      
      {/* AI Chat 功能 */}
      <div className="flex flex-col items-center gap-4">
        <AISearchTrigger className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
          {t('ai.chat.trigger')}
        </AISearchTrigger>
        <p className="text-sm text-fd-muted-foreground">
          {t('ai.chat.description')}
        </p>
      </div>

      {/* 固定位置的 AI 按钮 */}
      <AISearchTrigger className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-110 flex items-center justify-center text-xl z-50">
        {t('ai.chat.triggerShort')}
      </AISearchTrigger>
    </main>
  );
}
