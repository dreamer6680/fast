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
    <div className="border-1 border-gray-300 dark:border-gray-200 rounded-lg overflow-hidden my-4">
      <div className="flex gap-2 p-2 border-b-1 border-gray-300 dark:border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-6 py-3 rounded-md text-base transition-all duration-200 
              ${activeTab === index 
                ? 'bg-blue-50/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium border border-blue-200 dark:border-blue-800' 
                : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/20'
              }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.props.title}
          </button>
        ))}
      </div>
      <div className="p-6">
        {tabs[activeTab]}
      </div>
    </div>
  );
};