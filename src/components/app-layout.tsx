
"use client";

import React, { useState, useEffect, useRef } from 'react';
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
  ShieldCheck,
  History,
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
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';

type Tab = {
  id: string;
  title: string;
  href: string;
  isSite: boolean;
};

const INITIAL_TABS: Tab[] = [
  { id: 'dashboard', title: 'Dashboard', href: '/', isSite: false },
  { id: 'privacy-assistant', title: 'Privacy Assistant', href: '/privacy-assistant', isSite: false },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [tabs, setTabs] = useState<Tab[]>(INITIAL_TABS);
  const [activeTabId, setActiveTabId] = useState<string>('dashboard');
  const [inputValue, setInputValue] = useState('');
  
  const getUrlFromPath = (path: string, params: URLSearchParams): string => {
    if (path === '/') return 'citadel://dashboard';
    if (path.startsWith('/search')) {
      const query = params.get('q') || '';
      return `https://www.google.com/search?q=${query}`;
    }
    if (path.startsWith('/privacy-assistant')) return 'citadel://privacy-assistant';
    if (path.startsWith('/site')) {
      return params.get('url') || '';
    }
    return '';
  };
  
  const activeTab = tabs.find(tab => tab.id === activeTabId);

  useEffect(() => {
    const currentUrl = getUrlFromPath(pathname, searchParams);
    setInputValue(currentUrl);

    let currentTabId = '';
    if (pathname === '/') {
      currentTabId = 'dashboard';
    } else if (pathname.startsWith('/privacy-assistant')) {
      currentTabId = 'privacy-assistant';
    } else if (pathname.startsWith('/search')) {
      const query = searchParams.get('q') || '';
      currentTabId = `search-${query}`;
      const existingTab = tabs.find(t => t.id === currentTabId);
      if (!existingTab) {
        setTabs(prevTabs => [...prevTabs, { id: currentTabId, title: `Search: ${query}`, href: `/search?q=${query}`, isSite: false }]);
      }
    } else if (pathname.startsWith('/site')) {
        const url = searchParams.get('url') || '';
        currentTabId = `site-${url}`;
        const existingTab = tabs.find(t => t.id === currentTabId);
        if (!existingTab && url) {
            try {
                const hostname = new URL(url).hostname;
                setTabs(prevTabs => [...prevTabs, { id: currentTabId, title: hostname, href: `/site?url=${encodeURIComponent(url)}`, isSite: true }]);
            } catch (e) {
                console.error("Invalid URL:", url);
                setTabs(prevTabs => [...prevTabs, { id: currentTabId, title: 'Invalid URL', href: `/site?url=${encodeURIComponent(url)}`, isSite: true }]);
            }
        }
    }
    if (currentTabId) {
        setActiveTabId(currentTabId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);


  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isUrl = inputValue.startsWith('http://') || inputValue.startsWith('https://');
      if (isUrl) {
        router.push(`/site?url=${encodeURIComponent(inputValue)}`);
      } else {
        router.push(`/search?q=${inputValue}`);
      }
    }
  };

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    e.preventDefault();
    const tabIndex = tabs.findIndex(t => t.id === tabId);
    if (tabIndex === -1 || tabs.length <= 1) return;

    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);

    if (activeTabId === tabId) {
      const newActiveTab = newTabs[tabIndex] || newTabs[tabIndex - 1] || newTabs[0];
      if (newActiveTab) {
        router.push(newActiveTab.href);
      }
    }
  };
  
  const handleAddNewTab = () => {
    router.push('/');
  };

  const handleBack = () => {
    if (activeTab?.isSite && iframeRef.current) {
        iframeRef.current.contentWindow?.history.back();
    } else {
        router.back();
    }
  };

  const handleForward = () => {
      if (activeTab?.isSite && iframeRef.current) {
          iframeRef.current.contentWindow?.history.forward();
      } else {
          router.forward();
      }
  };

  const handleRefresh = () => {
      if (activeTab?.isSite && iframeRef.current) {
          iframeRef.current.contentWindow?.location.reload();
      } else {
          router.refresh();
      }
  };


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
            <History className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Settings className="h-5 w-5 text-muted-foreground cursor-pointer" />
          <UserNav />
        </div>
      </header>
      
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
      
      <div className="flex items-center gap-2 p-2 border-b bg-card">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleForward}>
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
          <Home className="h-4 w-4" />
        </Button>
        <div className="relative flex-grow">
            <Popover>
                <PopoverTrigger asChild>
                    <button className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground">
                        <Lock />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none text-primary">Connection is secure</h4>
                            <p className="text-sm text-muted-foreground">
                                Your information (for example, passwords or credit card numbers) is private when it is sent to this site.
                            </p>
                        </div>
                        <Separator />
                         <div className="grid gap-2">
                            <div className="flex items-start gap-4">
                                <ShieldCheck className="h-6 w-6 text-green-500 mt-1" />
                                <div>
                                    <p className="text-sm font-medium">Certificate is valid</p>
                                    <p className="text-sm text-muted-foreground">Issued by: Citadel Root CA</p>
                                </div>
                            </div>
                         </div>
                    </div>
                </PopoverContent>
            </Popover>
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full bg-background pl-10"
            placeholder="Search or type a URL"
          />
        </div>
      </div>

      <main className="flex-1 flex flex-col bg-background overflow-auto">
        {activeTab?.isSite ? (
            <iframe
                ref={iframeRef}
                src={getUrlFromPath(pathname, searchParams)}
                className="w-full h-full border-0"
                title="Browser content"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
        ) : (
            children
        )}
      </main>
    </div>
  );
}
    

    