import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { baseOptions } from '@/app/layout.config';
import { t } from '@/lib/i18n';
import '@/app/global.css';

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;

  const tabs = [
    {
      title: t('common:introduction'),
      url: '/docs/introduction',
      className: 'nav-tabs-link-active-color'
    },
    {
      title: t('common:use-cases'),
      url: '/docs/use-cases',
      className: "nav-tabs-link-active-color"
    },
    {
      title: t('common:api'),
      url: '/docs/api',
      className: "nav-tabs-link-active-color"
    },
    {
      title: t('common:protocol'),
      url: '/docs/protocol',
      className: "nav-tabs-link-active-color"
    }
  ];
  

  return (
    <DocsLayout {
      ...baseOptions(lang)} 
    nav={{
      title: (
      <div className="flex flex-row items-center gap-2 h-14">
        <img src="/logo.svg" alt="FastGPT" width={49} height={48} />
        FastGPT
      </div>
    ),
    mode: 'top',
    }}
    tree={source.pageTree[lang]} 
    searchToggle={{
      enabled: true
    }}
    sidebar={{
        tabs: tabs,
        collapsible: false,
    }}
    tabMode="navbar"
    >
      {children}
    </DocsLayout>
  );
}