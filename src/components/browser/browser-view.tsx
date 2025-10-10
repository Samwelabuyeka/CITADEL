"use client";
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

const tabs = [
  { id: 'dashboard', title: 'Dashboard' },
  { id: 'privacy-assistant', title: 'Privacy Assistant' },
];

export function BrowserView() {
  const [activeTab, setActiveTab] = React.useState(tabs[0].id);
  const [currentUrl, setCurrentUrl] = React.useState('citadel://dashboard');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentUrl(`citadel://${value}`);
  };

  return (
    <div className="flex flex-1 flex-col border-t">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="flex flex-col h-full"
      >
        <div className="bg-card border-b">
          <div className="flex items-center px-2">
            <TabsList className="bg-transparent border-none p-0 h-auto">
              {tabs.map((tab) => (
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
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Home className="h-4 w-4" />
          </Button>
          <div className="relative flex-grow">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              value={currentUrl}
              readOnly
              className="w-full bg-secondary pl-10"
            />
          </div>
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <TabsContent value="dashboard" className="flex-1 overflow-auto p-4 m-0">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold">Welcome to Citadel</h2>
              <p className="text-muted-foreground">
                Your secure and private web browser.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="privacy-assistant" className="flex-1 overflow-auto p-4 m-0">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold">AI-Powered Privacy Assistant</h2>
              <p className="text-muted-foreground">
                Get personalized privacy recommendations.
              </p>
              {/* Future content for privacy assistant can go here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
