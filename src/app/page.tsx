import AppLayout from "@/components/app-layout";
import { DynamicTabsWidget } from "@/components/dashboard/dynamic-tabs-widget";
import { PrivacyShieldWidget } from "@/components/dashboard/privacy-shield-widget";
import { WorkspaceWidget } from "@/components/dashboard/workspace-widget";

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-12 lg:col-span-4">
            <DynamicTabsWidget />
          </div>
          <div className="col-span-12 lg:col-span-3">
            <PrivacyShieldWidget />
          </div>
          <div className="col-span-12">
            <WorkspaceWidget />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
