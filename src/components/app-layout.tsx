"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Settings,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Home,
  Lock,
  Plus,
  X,
  Shield,
} from 'lucide-react';
import { Icons } from './icons';
import { UserNav } from './user-nav';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Button } from './ui/button';
import { Input } from './ui/input';

type Tab = {
  id: string;
  title: string;
  href: string;
};

const INITIAL_TABS: Tab[] = [
  { id: 'dashboard', title: 'Dashboard', href: '/' },
  { id: 'privacy-assistant', title: 'Privacy Assistant', href: '/privacy-assistant' },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [tabs, setTabs] = useState<Tab[]>(INITIAL_TABS);
  const [activeTabId, setActiveTabId] = useState<string>('dashboard');
  const [inputValue, setInputValue] = useState('');

  const getUrlFromPath = (path: string, params: URLSearchParams): string => {
    if (path === '/') return 'citadel://dashboard';
    if (path.startsWith('/search')) {
      const query = params.get('q') || '';
      return `citadel://search?q=${query}`;
    }
    if (path.startsWith('/privacy-assistant')) return 'citadel://privacy-assistant';
    return '';
  };
  
  useEffect(() => {
    const currentUrl = getUrlFromPath(pathname, searchParams);
    setInputValue(currentUrl);

    if (pathname === '/') {
      setActiveTabId('dashboard');
    } else if (pathname.startsWith('/privacy-assistant')) {
      setActiveTabId('privacy-assistant');
    } else if (pathname.startsWith('/search')) {
      const query = searchParams.get('q') || '';
      const searchTabId = `search-${query}`;
      const existingTab = tabs.find(t => t.id === searchTabId);
      if (!existingTab) {
        setTabs(prevTabs => [...prevTabs, { id: searchTabId, title: `Search: ${query}`, href: `/search?q=${query}` }]);
      }
      setActiveTabId(searchTabId);
    }
  }, [pathname, searchParams, tabs]);


  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isUrl = inputValue.startsWith('http://') || inputValue.startsWith('https://');
      if (isUrl) {
        // In a real browser, we would navigate. For now, let's just log it.
        console.log(`Navigating to: ${inputValue}`);
      } else {
        router.push(`/search?q=${inputValue.replace('citadel://search?q=', '')}`);
      }
    }
  };

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    e.preventDefault();
    const tabIndex = tabs.findIndex(t => t.id === tabId);
    if (tabIndex === -1) return;

    // Prevent closing the last tab
    if (tabs.length === 1) return;

    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);

    // If closing the active tab, switch to a new one
    if (activeTabId === tabId) {
      const newActiveTab = newTabs[tabIndex] || newTabs[tabIndex - 1] || newTabs[0];
      if (newActiveTab) {
        router.push(newActiveTab.href);
      }
    }
  };
  
  const handleAddNewTab = () => {
    router.push('/');
  }

  return (
    <div className="flex flex-col h-screen bg-card">
      <header className="flex h-14 items-center gap-2 border-b bg-card px-2">
        <Link href="/" className="p-2">
          <Icons.logo className="size-6 text-primary" />
          <span className="sr-only">Citadel</span>
        </Link>
        <div className="w-full flex-1">
          <Menubar className="border-none shadow-none">
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={handleAddNewTab}>New Tab</MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Close Tab</MenubarItem>
                <MenubarItem>Close Window</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Undo</MenubarItem>
                <MenubarItem>Redo</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Cut</MenubarItem>
                <MenubarItem>Copy</MenubarItem>
                <MenubarItem>Paste</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Toggle Fullscreen</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Developer Tools</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>History</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Show Full History</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Help</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>About Citadel</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Shield className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Settings className="h-5 w-5 text-muted-foreground cursor-pointer" />
          <UserNav />
        </div>
      </header>
      
      {/* Tabs */}
      <div className="bg-card border-b">
        <div className="flex items-center">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex items-center h-10 border-b-2 px-4 text-sm ${
                activeTabId === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.title}
              <Button variant="ghost" size="icon" className="w-6 h-6 ml-2 hover:bg-muted-foreground/20" onClick={(e) => handleCloseTab(e, tab.id)}>
                <X className="w-4 h-4" />
              </Button>
            </Link>
          ))}
          <Button variant="ghost" size="icon" className="w-8 h-8 ml-1" onClick={handleAddNewTab}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Address Bar */}
      <div className="flex items-center gap-2 p-2 border-b bg-card">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => router.forward()}>
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => router.refresh()}>
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
          <Home className="h-4 w-4" />
        </Button>
        <div className="relative flex-grow">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full bg-background pl-10"
            placeholder="Search with Citadel or type a URL"
          />
        </div>
      </div>

      <main className="flex-1 flex flex-col bg-background overflow-auto">{children}</main>
    </div>
  );
}
