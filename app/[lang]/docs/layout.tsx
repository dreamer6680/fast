import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/app/layout.config';
import { AISearchTrigger } from '@/components/ai';

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;

  return (
    <>
      <DocsLayout {...baseOptions(lang)} tree={source.pageTree[lang]}>
        {children}
      </DocsLayout>
      
      {/* 固定位置的 AI 助手按钮 */}
      <AISearchTrigger className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-110 flex items-center justify-center text-xl z-50">
        💬
      </AISearchTrigger>
    </>
  );
}