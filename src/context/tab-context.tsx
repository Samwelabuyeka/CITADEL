"use client";

import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export type Tab = {
  id: string;
  title: string;
  href: string;
  isSite: boolean;
};

type TabContextType = {
  tabs: Tab[];
  setTabs: Dispatch<SetStateAction<Tab[]>>;
  activeTabId: string;
  setActiveTabId: Dispatch<SetStateAction<string>>;
};

export const TabContext = createContext<TabContextType | undefined>(undefined);

const INITIAL_TABS: Tab[] = [
  { id: 'dashboard', title: 'Dashboard', href: '/', isSite: false },
  { id: 'privacy-assistant', title: 'Privacy Assistant', href: '/privacy-assistant', isSite: false },
];

export function TabProvider({ children }: { children: ReactNode }) {
  const [tabs, setTabs] = useState<Tab[]>(INITIAL_TABS);
  const [activeTabId, setActiveTabId] = useState<string>('dashboard');

  return (
    <TabContext.Provider value={{ tabs, setTabs, activeTabId, setActiveTabId }}>
      {children}
    </TabContext.Provider>
  );
}
