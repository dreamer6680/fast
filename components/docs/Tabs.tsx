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
  return <div>{children}</div>;
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
      <div className="tab-content" style={{ marginTop: '0.25rem' }}>
        {tabs[activeTab]}
      </div>
      <style jsx>{`
        .tabs-container {
          margin: 1rem 0;
          background: var(--content-bg);
          border-radius: 8px;
          border: 1px solid var(--border-color);
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
        }

        .tabs-header {
          display: flex;
          gap: 1rem;
          padding: 0 0.75rem;
          background: var(--header-bg);
          border-bottom: 1px solid var(--border-color);
          position: relative;
        }

        .tab-button {
          position: relative;
          padding: 0.5rem 0;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 0.875rem;
          color: var(--text-color);
          font-weight: 400;
          transition: all 0.15s ease;
          max-width: fit-content;
          white-space: nowrap;
        }

        .tab-button:hover {
          color: #2563eb;
        }

        .tab-button.active {
          color: #2563eb;
          font-weight: 500;
        }

        .tab-button.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: #2563eb;
          border-radius: 2px;
        }

        .tab-content {
          padding: 0.75rem;
          background: var(--content-bg);
        }

        /* 浅色主题变量 */
        [data-theme="light"] {
          --border-color: #d1d5db;
          --header-bg: rgba(249, 250, 251, 0.8);
          --text-color: #64748b;
          --content-bg: #ffffff;
        }

        /* 深色主题变量 */
        [data-theme="dark"] {
          --border-color: #374151;
          --header-bg: rgba(17, 24, 39, 0.8);
          --text-color: #94a3b8;
          --content-bg: #1e293b;
        }
      `}</style>
    </div>
  );
};