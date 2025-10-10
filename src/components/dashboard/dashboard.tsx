import { DynamicTabsWidget } from "@/components/dashboard/dynamic-tabs-widget";
import { PrivacyShieldWidget } from "@/components/dashboard/privacy-shield-widget";
import { WorkspaceWidget } from "@/components/dashboard/workspace-widget";

export function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="space-y-4">
        <WorkspaceWidget />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-4">
            <PrivacyShieldWidget />
          </div>
          <div className="lg:col-span-3">
            <DynamicTabsWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
