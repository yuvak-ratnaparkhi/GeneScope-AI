"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/app-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Trash2, Eye, ArrowLeftRight } from "lucide-react";
import { getHistory, HistoryItem } from "@/lib/api";
import { toast } from "sonner";

export default function HistoryPage() {
    const router = useRouter();
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [riskFilter, setRiskFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [selected, setSelected] = useState<number[]>([]);

    useEffect(() => {
        getHistory().then((data) => {
            setHistory(data);
            setLoading(false);
        });
    }, []);

    const riskLevel = (pct: number) => (pct >= 65 ? "High" : pct >= 35 ? "Moderate" : "Low");
    const riskColor = (level: string) =>
        level === "High" ? "text-destructive" : level === "Moderate" ? "text-warning" : "text-success";

    const filtered = useMemo(() => {
        let items = history.filter((h) =>
            h.predicted_disorder.toLowerCase().includes(query.toLowerCase())
        );
        if (riskFilter !== "all") {
            items = items.filter((h) => riskLevel(h.risk_percentage) === riskFilter);
        }
        items.sort((a, b) => {
            if (sortBy === "newest") return +new Date(b.created_at) - +new Date(a.created_at);
            if (sortBy === "oldest") return +new Date(a.created_at) - +new Date(b.created_at);
            return b.risk_percentage - a.risk_percentage;
        });
        return items;
    }, [history, query, riskFilter, sortBy]);

    const toggleSelect = (id: number) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 2 ? [...prev, id] : prev
        );
    };

    const handleOpen = (item: HistoryItem) => {
        sessionStorage.setItem("gs_result", JSON.stringify(item));
        router.push("/results");
    };

    const handleDelete = (id: number) => {
        setHistory((prev) => {
            const updated = prev.filter((h) => h.id !== id);
            localStorage.setItem("gs_history", JSON.stringify(updated));
            return updated;
        });
        toast.success("Screening removed from history");
    };

    const handleCompare = () => {
        const items = history.filter((h) => selected.includes(h.id));
        sessionStorage.setItem("gs_compare", JSON.stringify(items));
        router.push("/history/compare");
    };

    const handleExportCsv = () => {
        const headers = "Disorder,Risk %,Date\n";
        const rows = history.map((h) => `${h.predicted_disorder},${h.risk_percentage},${h.created_at}`).join("\n");
        const blob = new Blob([headers + rows], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "genescope-history.csv";
        a.click();
        toast.success("History exported");
    };

    if (loading) {
        return (
            <AppShell>
                <div className="max-w-3xl mx-auto space-y-3">
                    <div className="h-8 w-32 bg-muted rounded-lg animate-pulse mb-6" />
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="rounded-xl border bg-card p-4 flex items-center gap-4 transition-all hover:shadow-md hover:border-primary/30">
                            <div className="w-5 h-5 rounded bg-muted animate-pulse" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-40 bg-muted rounded animate-pulse" />
                                <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                            </div>
                            <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold font-heading">History</h1>
                    <Button variant="outline" size="sm" onClick={handleExportCsv} disabled={history.length === 0}>
                        Export CSV
                    </Button>
                </div>

                {history.length === 0 ? (
                    <div className="rounded-2xl border bg-card p-10 text-center">
                        <p className="font-medium">No screenings yet</p>
                        <p className="text-sm text-muted-foreground mt-1">
                            Your past results will appear here once you complete a screening.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col sm:flex-row gap-3 mb-4">
                            <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border bg-card">
                                <Search size={16} className="text-muted-foreground" />
                                <Input
                                    placeholder="Search by disorder..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="border-0 shadow-none focus-visible:ring-0 h-auto p-0"
                                />
                            </div>
                            <Select value={riskFilter} onValueChange={(val) => val && setRiskFilter(val)}>
                                <SelectTrigger className="w-full sm:w-40">
                                    <SelectValue placeholder="Risk level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All risk levels</SelectItem>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Moderate">Moderate</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={sortBy} onValueChange={(val) => val && setSortBy(val)}>
                                <SelectTrigger className="w-full sm:w-40">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest first</SelectItem>
                                    <SelectItem value="oldest">Oldest first</SelectItem>
                                    <SelectItem value="risk">Highest risk</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {selected.length === 2 && (
                            <Button className="mb-4" onClick={handleCompare}>
                                <ArrowLeftRight size={16} className="mr-2" /> Compare Selected
                            </Button>
                        )}

                        <div className="space-y-3">
                            {filtered.map((item) => {
                                const level = riskLevel(item.risk_percentage);
                                return (
                                    <div
                                        key={item.id}
                                        className="rounded-xl border bg-card p-4 flex items-center gap-4 transition-all hover:shadow-md hover:border-primary/30"
                                    >
                                        <Checkbox
                                            checked={selected.includes(item.id)}
                                            onCheckedChange={() => toggleSelect(item.id)}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">{item.predicted_disorder}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                {new Date(item.created_at).toLocaleDateString(undefined, {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>
                                        <span className={`font-semibold text-sm ${riskColor(level)}`}>
                                            {item.risk_percentage}% · {level}
                                        </span>
                                        <div className="flex gap-1">
                                            <Button size="icon" variant="ghost" onClick={() => handleOpen(item)}>
                                                <Eye size={16} />
                                            </Button>
                                            <Button size="icon" variant="ghost" onClick={() => handleDelete(item.id)}>
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </AppShell>
    );
}