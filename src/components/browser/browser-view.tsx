"use client";
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Lock,
  Plus,
  RefreshCw,
  Search,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '../ui/input';
import { PrivacyAssistantPage } from '@/app/privacy-assistant/page';
import { Dashboard } from '../dashboard/dashboard';


const TABS = [
  { id: 'dashboard', title: 'Dashboard', component: <Dashboard /> },
  { id: 'privacy-assistant', title: 'Privacy Assistant', component: <PrivacyAssistantPage /> },
];

export function BrowserView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState(TABS[0].id);
  const [currentUrl, setCurrentUrl] = React.useState(`citadel://${TABS[0].id}`);
  const [inputValue, setInputValue] = React.useState(currentUrl);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const newUrl = `citadel://${value}`;
    setCurrentUrl(newUrl);
    setInputValue(newUrl);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/search?q=${inputValue}`);
    }
  };

  React.useEffect(() => {
    setInputValue(currentUrl);
  }, [currentUrl]);

  return (
    <div className="flex flex-1 flex-col border-t bg-background">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="flex flex-col h-full"
      >
        <div className="bg-card border-b">
          <div className="flex items-center">
            <TabsList className="bg-transparent border-none p-0 h-auto">
              {TABS.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="h-10 border-b-2 border-transparent rounded-none data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent -mb-px"
                >
                  {tab.title}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-6 h-6 ml-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </TabsTrigger>
              ))}
            </TabsList>
            <Button variant="ghost" size="icon" className="w-8 h-8 ml-1">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 border-b">
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
              className="w-full bg-secondary pl-10"
              placeholder="Search Google or type a URL"
            />
          </div>
        </div>

        {TABS.map(tab => (
           <TabsContent key={tab.id} value={tab.id} className="flex-1 overflow-auto p-4 m-0">
            {tab.component}
           </TabsContent>
        ))}
       
      </Tabs>
    </div>
  );
}
