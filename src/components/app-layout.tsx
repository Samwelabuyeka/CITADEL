"use client";

import React from 'react';
import Link from 'next/link';
import {
  Settings,
  UserCircle,
} from 'lucide-react';
import { Icons } from './icons';
import { UserNav } from './user-nav';
import { Separator } from './ui/separator';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Icons.logo className="size-8 text-primary" />
          <span className="text-xl">Citadel</span>
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
        <div className="flex items-center gap-4">
          <Settings className="h-5 w-5 text-muted-foreground cursor-pointer" />
          <UserNav />
        </div>
      </header>
      <main className="flex-1 flex flex-col bg-background">{children}</main>
    </div>
  );
}
