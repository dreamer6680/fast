import { type ReactNode } from "react";
import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { baseOptions } from "@/app/layout.config";
import { t } from "@/lib/i18n";
import LogoLight from "@/components/docs/logo";
import LogoDark from "@/components/docs/logoDark";
import "@/app/global.css";
import { CustomSidebarComponents } from "@/components/sideBar";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;

  const tab = [
    {
      title: t("common:introduction", lang),
      url: lang === "zh-CN" ? "/docs/introduction" : "/en/docs/introduction",
      className: "nav-tabs",
    },
    {
      title: t("common:use-cases", lang),
      url: lang === "zh-CN" ? "/docs/use-cases" : "/en/docs/use-cases",
      className: "nav-tabs-link-active-color",
    },
    {
      title: t("common:api", lang),
      url: lang === "zh-CN" ? "/docs/api" : "/en/docs/api",
      className: "nav-tabs-link-active-color",
    },
    {
      title: t("common:protocol", lang),
      url: lang === "zh-CN" ? "/docs/protocol" : "/en/docs/protocol",
      className: "nav-tabs-link-active-color",
    },
  ];

  return (
    <DocsLayout
      {...baseOptions(lang)}
      nav={{
        title: (
          <div className="flex flex-row items-center gap-2 h-14 ml-10">
            <div className="block dark:hidden">
              <LogoLight className="w-48 h-auto" />
            </div>
            <div className="hidden dark:block">
              <LogoDark className="w-48 h-auto" />
            </div>
          </div>
        ),
        mode: "top",
      }}
      links={[
        {
          type: "icon",
          icon: (
            <svg
              width="24"
              height="24"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 29C21 29 25 26.9339 28 23.4065C36 14 41.4242 16.8166 44 17.9998C38.5 20.9998 40.5 29.6233 33 35.9998C28.382 39.9259 23.4945 41.014 19 41C12.5231 40.9799 6.86226 37.7637 4 35.4063V16.9998"
                stroke="#737373"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.64808 15.8669C5.02231 14.9567 3.77715 14.7261 2.86694 15.3519C1.95673 15.9777 1.72615 17.2228 2.35192 18.1331L5.64808 15.8669ZM36.0021 35.7309C36.958 35.1774 37.2843 33.9539 36.7309 32.9979C36.1774 32.042 34.9539 31.7157 33.9979 32.2691L36.0021 35.7309ZM2.35192 18.1331C5.2435 22.339 10.7992 28.144 16.8865 32.2239C19.9345 34.2667 23.217 35.946 26.449 36.7324C29.6946 37.522 33.0451 37.4428 36.0021 35.7309L33.9979 32.2691C32.2049 33.3072 29.9929 33.478 27.3947 32.8458C24.783 32.2103 21.9405 30.7958 19.1135 28.9011C13.4508 25.106 8.2565 19.661 5.64808 15.8669L2.35192 18.1331Z"
                fill="#676666"
              />
              <path
                d="M33.5947 17C32.84 14.7027 30.8551 9.94054 27.5947 7H11.5947C15.2174 10.6757 23.0002 16 27.0002 24"
                stroke="#5f5e5e"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
          url: "https://oss.laf.run/otnvvf-imgs/fastgpt-feishu1.png",
          text: "飞书群",
        },
      ]}
      tree={source.pageTree[lang]}
      searchToggle={{
        enabled: true,
      }}
      sidebar={{
        tabs: tab,
        collapsible: false,
        components: CustomSidebarComponents
      }}
      tabMode="navbar"
    >
      {children}
    </DocsLayout>
  );
}
