"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { HistoryItem } from "@/lib/api";
import { ArrowLeft } from "lucide-react";

export default function ComparePage() {
    const router = useRouter();
    const [items, setItems] = useState<HistoryItem[]>([]);

    useEffect(() => {
        const stored = sessionStorage.getItem("gs_compare");
        if (!stored) {
            router.push("/history");
            return;
        }
        setItems(JSON.parse(stored));
    }, [router]);

    if (items.length !== 2) {
        return (
            <AppShell>
                <p className="text-muted-foreground">Loading comparison...</p>
            </AppShell>
        );
    }

    const riskLevel = (pct: number) => (pct >= 65 ? "High" : pct >= 35 ? "Moderate" : "Low");
    const riskColor = (level: string) =>
        level === "High" ? "text-destructive" : level === "Moderate" ? "text-warning" : "text-success";

    const allFeatureKeys = Array.from(
        new Set(items.flatMap((item) => Object.keys(item.top_features)))
    );

    return (
        <AppShell>
            <div className="max-w-3xl mx-auto">
                <Button variant="ghost" className="mb-4" onClick={() => router.push("/history")}>
                    <ArrowLeft size={16} className="mr-2" /> Back to History
                </Button>

                <h1 className="text-2xl font-bold font-heading mb-6">Compare Results</h1>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    {items.map((item) => {
                        const level = riskLevel(item.risk_percentage);
                        return (
                            <div key={item.id} className="rounded-2xl border bg-card p-5 text-center">
                                <p className="text-xs text-muted-foreground">
                                    {new Date(item.created_at).toLocaleDateString(undefined, {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>
                                <p className={`text-3xl font-bold font-heading mt-2 ${riskColor(level)}`}>
                                    {item.risk_percentage}%
                                </p>
                                <p className="text-sm font-medium mt-1">{item.predicted_disorder}</p>
                                <span className={`text-xs font-medium ${riskColor(level)}`}>{level} Risk</span>
                            </div>
                        );
                    })}
                </div>

                <div className="rounded-2xl border bg-card p-6">
                    <h3 className="font-semibold font-heading mb-4">Factor Comparison</h3>
                    <div className="space-y-4">
                        {allFeatureKeys.map((key) => (
                            <div key={key}>
                                <p className="text-sm font-medium capitalize mb-2">{key.replace(/_/g, " ")}</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-2">
                                            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                                                <div
                                                    className="h-full bg-primary"
                                                    style={{ width: `${(item.top_features[key] || 0) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-muted-foreground w-10">
                                                {Math.round((item.top_features[key] || 0) * 100)}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}