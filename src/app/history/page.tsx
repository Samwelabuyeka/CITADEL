
import AppLayout from "@/components/app-layout";
import { HistoryClientPage } from "./history-client-page";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function HistoryPage() {
  return (
    <AppLayout>
      <div className="container mx-auto p-4 md:p-6">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold">Browsing History</h1>
          <p className="text-muted-foreground">
            A record of the sites you’ve visited.
          </p>
        </div>
        <Suspense fallback={<HistorySkeleton />}>
          <HistoryClientPage />
        </Suspense>
      </div>
    </AppLayout>
  );
}

function HistorySkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-2 rounded-lg">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  )
}
