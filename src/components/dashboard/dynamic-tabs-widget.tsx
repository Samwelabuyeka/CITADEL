"use client";

import { mockTabGroups } from "@/lib/mock-data";
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
import { Layers, Link } from "lucide-react";
import { Badge } from "../ui/badge";

export function DynamicTabsWidget() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Dynamic Tab Groups</CardTitle>
        <CardDescription>
          Intelligently grouped tabs for your workflow.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">
        {mockTabGroups.map((group, index) => (
          <div key={group.id}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 bg-secondary p-2 rounded-md">
                   <Layers className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">{group.name}</h3>
                <Badge variant="outline" className="ml-auto">{group.tabs.length} tabs</Badge>
              </div>

              <div className="space-y-2 pl-10">
                {group.tabs.map((tab) => (
                  <div key={tab.id} className="flex items-center gap-3 text-sm">
                    <Link className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-grow truncate">{tab.title}</span>
                    <span className="text-muted-foreground">{tab.domain}</span>
                  </div>
                ))}
              </div>
            </div>
            {index < mockTabGroups.length - 1 && <Separator className="mt-6"/>}
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Manage Tab Groups
        </Button>
      </CardFooter>
    </Card>
  );
}
