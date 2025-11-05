
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
import { Shield, Ban, Fingerprint } from "lucide-react";

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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="tracker-blocker" className="text-base font-semibold">Tracker Blocker</Label>
                        <Switch id="tracker-blocker" defaultChecked />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Shield className="h-8 w-8 text-primary" />
                        <p className="text-sm text-muted-foreground">
                            Block ads and tracking scripts.
                        </p>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="script-control" className="text-base font-semibold">Script Control</Label>
                        <Switch id="script-control" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Ban className="h-8 w-8 text-primary" />
                        <p className="text-sm text-muted-foreground">
                            Manage which sites can run scripts.
                        </p>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="fingerprinting-protection" className="text-base font-semibold">Anti-Fingerprint</Label>
                        <Switch id="fingerprinting-protection" defaultChecked />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Fingerprint className="h-8 w-8 text-primary" />
                        <p className="text-sm text-muted-foreground">
                            Prevent sites from identifying you.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
        <Separator className="my-4" />
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Trackers Blocked This Week</h4>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={dailyBlockedData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
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
