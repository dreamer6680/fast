'use client';

import React, { useState } from 'react';

interface TabProps {
  title: string;
  children: React.ReactNode;
}

interface TabsProps {
  children: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <div className="tab-content">{children}</div>;
};

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const tabs = React.Children.toArray(children) as React.ReactElement<TabProps>[];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.props.title}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs[activeTab]}
      </div>
      <style jsx>{`
        .tabs-container {
          margin: 1rem 0;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          overflow: hidden;
        }
        .tabs-header {
          display: flex;
          gap: 0.5rem;
          padding: 0.5rem;
          background-color: var(--header-bg);
          border-bottom: 1px solid var(--border-color);
        }
        .tab-button {
          padding: 0.75rem 1.5rem;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 1rem;
          color: var(--text-color);
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        .tab-button:hover {
          color: var(--primary-color);
          background-color: var(--hover-bg);
        }
        .tab-button.active {
          color: var(--primary-color);
          background-color: var(--active-bg);
          font-weight: 500;
        }
        .tab-content {
          padding: 1.5rem;
          background-color: var(--content-bg);
        }

        /* 浅色主题变量 */
        [data-theme="light"] {
          --border-color: #e5e7eb;
          --header-bg: #f9fafb;
          --text-color: #6b7280;
          --primary-color: #2563eb;
          --hover-bg: #eff6ff;
          --active-bg: #eff6ff;
          --content-bg: white;
        }

        /* 深色主题变量 */
        [data-theme="dark"] {
          --border-color: #d1d5db;  /* 更亮的边框颜色 */
          --header-bg: #1f2937;
          --text-color: #9ca3af;
          --primary-color: #60a5fa;
          --hover-bg: rgba(96, 165, 250, 0.1);
          --active-bg: rgba(96, 165, 250, 0.15);
          --content-bg: #111827;
        }
      `}</style>
    </div>
  );
};