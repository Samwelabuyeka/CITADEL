
'use client';

import { useSearchParams } from 'next/navigation';
import AppLayout from '@/components/app-layout';
import { Skeleton } from '@/components/ui/skeleton';

export default function SitePage() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');

  if (!url) {
    return (
        <AppLayout>
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <p>No URL specified.</p>
                <p className="text-sm">Enter a URL in the address bar to begin browsing.</p>
            </div>
        </AppLayout>
    );
  }

  return (
    <AppLayout>
        {/* The iframe is now rendered inside the AppLayout itself based on the tab */}
    </AppLayout>
  );
}
