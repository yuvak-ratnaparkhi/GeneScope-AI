"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { getHistory, HistoryItem } from "@/lib/api";
import { Stethoscope, History as HistoryIcon, MessageCircle } from "lucide-react";

export default function DashboardPage() {
  const [recent, setRecent] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, avgRisk: 0 });

  useEffect(() => {
    getHistory().then((data) => {
      setRecent(data.slice(0, 1));
      setStats({
        total: data.length,
        avgRisk: data.length ? Math.round(data.reduce((s, h) => s + h.risk_percentage, 0) / data.length) : 0,
      });
      setLoading(false);
    });
  }, []);

  const riskLevel = (pct: number) => (pct >= 65 ? "High" : pct >= 35 ? "Moderate" : "Low");
  const riskColor = (level: string) =>
    level === "High" ? "text-destructive" : level === "Moderate" ? "text-warning" : "text-success";

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-heading">Welcome back</h1>
          <p className="text-muted-foreground mt-1">Here's a quick look at your health screening activity.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border bg-card p-5 text-center">
            <p className="text-2xl font-bold font-heading text-primary">{stats.total}</p>
            <p className="text-xs text-muted-foreground mt-1">Total screenings</p>
          </div>
          <div className="rounded-2xl border bg-card p-5 text-center">
            <p className="text-2xl font-bold font-heading text-primary">{stats.avgRisk}%</p>
            <p className="text-xs text-muted-foreground mt-1">Average risk score</p>
          </div>
        </div>

        {!loading && recent.length > 0 && (
          <div className="rounded-2xl border bg-card p-6">
            <p className="text-sm text-muted-foreground mb-1">Most recent screening</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">{recent[0].predicted_disorder}</p>
                <p className={`text-sm font-medium ${riskColor(riskLevel(recent[0].risk_percentage))}`}>
                  {recent[0].risk_percentage}% · {riskLevel(recent[0].risk_percentage)} Risk
                </p>
              </div>
              <Link href="/results">
                <Button variant="outline" size="sm">View</Button>
              </Link>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/screening">
            <div className="rounded-2xl border bg-card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
              <Stethoscope size={22} className="text-primary mb-3" />
              <p className="font-medium">New Screening</p>
              <p className="text-xs text-muted-foreground mt-1">Start a fresh risk assessment</p>
            </div>
          </Link>
          <Link href="/history">
            <div className="rounded-2xl border bg-card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
              <HistoryIcon size={22} className="text-primary mb-3" />
              <p className="font-medium">View History</p>
              <p className="text-xs text-muted-foreground mt-1">Browse your past results</p>
            </div>
          </Link>
          <Link href="/assistant">
            <div className="rounded-2xl border bg-card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
              <MessageCircle size={22} className="text-primary mb-3" />
              <p className="font-medium">Ask AI Assistant</p>
              <p className="text-xs text-muted-foreground mt-1">Get help understanding your results</p>
            </div>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}