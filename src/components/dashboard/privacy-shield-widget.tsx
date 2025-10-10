"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "../ui/separator";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { useEffect, useState } from "react";

const generateWeeklyData = () => [
  { name: "Mon", total: Math.floor(Math.random() * 200) + 50 },
  { name: "Tue", total: Math.floor(Math.random() * 200) + 50 },
  { name: "Wed", total: Math.floor(Math.random() * 200) + 50 },
  { name: "Thu", total: Math.floor(Math.random() * 200) + 50 },
  { name: "Fri", total: Math.floor(Math.random() * 200) + 50 },
  { name: "Sat", total: Math.floor(Math.random() * 200) + 50 },
  { name: "Sun", total: Math.floor(Math.random() * 200) + 50 },
];

export function PrivacyShieldWidget() {
  const [dailyBlockedData, setDailyBlockedData] = useState<any[]>([]);

  useEffect(() => {
    setDailyBlockedData(generateWeeklyData());
  }, []);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Privacy Shield</CardTitle>
        <CardDescription>
          Granular control over your digital footprint.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="tracker-blocker" className="flex flex-col space-y-1">
              <span>Real-time Tracker Blocker</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Block advertising and tracking scripts.
              </span>
            </Label>
            <Switch id="tracker-blocker" defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="script-control" className="flex flex-col space-y-1">
              <span>Script Control</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Manage which websites can run scripts.
              </span>
            </Label>
            <Switch id="script-control" />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="fingerprinting-protection" className="flex flex-col space-y-1">
              <span>Fingerprinting Protection</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Prevent sites from identifying you.
              </span>
            </Label>
            <Switch id="fingerprinting-protection" defaultChecked />
          </div>
        </div>
        <Separator className="my-4" />
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Trackers Blocked This Week</h4>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={dailyBlockedData}>
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
