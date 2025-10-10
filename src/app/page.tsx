import AppLayout from "@/components/app-layout";
import { Dashboard } from "@/components/dashboard/dashboard";

export default function BrowserPage() {
  return (
    <AppLayout currentUrl="citadel://dashboard">
      <Dashboard />
    </AppLayout>
  );
}
