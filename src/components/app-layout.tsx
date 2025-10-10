"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Settings,
  UserCircle,
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

const TABS = [
  { id: 'dashboard', title: 'Dashboard', href: '/' },
  { id: 'privacy-assistant', title: 'Privacy Assistant', href: '/privacy-assistant' },
];

export default function AppLayout({
  children,
  currentUrl: initialUrl,
}: {
  children: React.ReactNode;
  currentUrl?: string;
}) {
  const router = useRouter();
  const [inputValue, setInputValue] = React.useState(initialUrl || '');

  React.useEffect(() => {
    if (initialUrl) {
      setInputValue(initialUrl);
    }
  }, [initialUrl]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/search?q=${inputValue}`);
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
                <MenubarItem>New Tab</MenubarItem>
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
          {TABS.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex items-center h-10 border-b-2 px-4 text-sm ${
                initialUrl === `citadel://${tab.id}`
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.title}
              <Button variant="ghost" size="icon" className="w-6 h-6 ml-2 hover:bg-muted-foreground/20">
                <X className="w-4 h-4" />
              </Button>
            </Link>
          ))}
          <Button variant="ghost" size="icon" className="w-8 h-8 ml-1">
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
            placeholder="Search Google or type a URL"
          />
        </div>
      </div>

      <main className="flex-1 flex flex-col bg-background overflow-auto">{children}</main>
    </div>
  );
}
