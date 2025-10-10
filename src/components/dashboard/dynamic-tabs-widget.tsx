"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Layers, Link, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import { getTabGroups } from "@/app/dashboard/actions";
import { Skeleton } from "../ui/skeleton";

type Tab = {
  title: string;
  url: string;
};

type TabGroup = {
  name: string;
  tabs: Tab[];
};

export function DynamicTabsWidget() {
  const [tabGroups, setTabGroups] = useState<TabGroup[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGenerate = async () => {
    setLoading(true);
    const groups = await getTabGroups({ interest: 'web development' });
    if (groups) {
      setTabGroups(groups.groups);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGenerate();
  }, []);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>AI-Generated Tab Groups</CardTitle>
            <CardDescription>
              Intelligently grouped tabs for your workflow.
            </CardDescription>
          </div>
           <Button variant="ghost" size="sm" onClick={handleGenerate} disabled={loading}>
              <Sparkles className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">
        {loading ? (
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-6 w-1/4 ml-auto" />
                </div>
                <div className="space-y-2 pl-10">
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/5" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          tabGroups.map((group, index) => (
            <div key={index}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 bg-secondary p-2 rounded-md">
                    <Layers className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">{group.name}</h3>
                  <Badge variant="outline" className="ml-auto">
                    {group.tabs.length} tabs
                  </Badge>
                </div>

                <div className="space-y-2 pl-10">
                  {group.tabs.map((tab, tabIndex) => (
                    <div key={tabIndex} className="flex items-center gap-3 text-sm">
                      <Link className="h-4 w-4 text-muted-foreground" />
                      <span className="flex-grow truncate">{tab.title}</span>
                      <span className="text-muted-foreground">{new URL(tab.url).hostname}</span>
                    </div>
                  ))}
                </div>
              </div>
              {index < tabGroups.length - 1 && <Separator className="mt-6" />}
            </div>
          ))
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Manage Tab Groups
        </Button>
      </CardFooter>
    </Card>
  );
}
