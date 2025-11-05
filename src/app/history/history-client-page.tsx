
'use client';

import { useAuth, useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Globe, History } from "lucide-react";

type HistoryItem = {
    id: string;
    url: string;
    title: string;
    visitedAt: {
        seconds: number;
        nanoseconds: number;
    };
};

export function HistoryClientPage() {
    const { user, isUserLoading } = useAuth();
    const firestore = useFirestore();

    const historyQuery = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return query(
            collection(firestore, `users/${user.uid}/history`),
            orderBy('visitedAt', 'desc'),
            limit(100)
        );
    }, [user, firestore]);

    const { data: historyItems, isLoading } = useCollection<HistoryItem>(historyQuery);

    if (isUserLoading || (user && isLoading)) {
        return (
            <div className="flex items-center justify-center h-40 text-muted-foreground">
                <History className="h-6 w-6 mr-2 animate-spin" />
                <p>Loading your history...</p>
            </div>
        );
    }
    
    if (!user) {
        return (
            <div className="flex items-center justify-center h-40 text-muted-foreground">
                <p>Please log in to see your browsing history.</p>
            </div>
        );
    }

    if (!historyItems || historyItems.length === 0) {
        return (
            <div className="flex items-center justify-center h-40 text-muted-foreground">
                <p>Your browsing history is empty.</p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {historyItems.map((item) => {
                const visitedDate = item.visitedAt ? new Date(item.visitedAt.seconds * 1000) : new Date();
                return (
                    <div key={item.id} className="p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Globe className="h-4 w-4 text-muted-foreground"/>
                                <Link href={`/site?url=${encodeURIComponent(item.url)}`} className="font-medium text-primary hover:underline truncate">
                                    {item.title}
                                </Link>
                            </div>
                            <p className="text-sm text-muted-foreground whitespace-nowrap">
                                {formatDistanceToNow(visitedDate, { addSuffix: true })}
                            </p>
                        </div>
                        <p className="text-sm text-muted-foreground ml-7 truncate">{item.url}</p>
                    </div>
                );
            })}
        </div>
    );
}
