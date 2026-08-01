"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/app-shell";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PredictionResult } from "@/lib/api";
import RiskGauge from "@/components/risk-gauge";
import { ShieldCheck, WifiOff, Download, Share2, Stethoscope } from "lucide-react";
import { toast } from "sonner";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export default function ResultsPage() {
    const reportRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [result, setResult] = useState<PredictionResult | null>(null);

    useEffect(() => {
        const stored = sessionStorage.getItem("gs_result");
        if (!stored) {
            router.push("/screening");
            return;
        }
        setResult(JSON.parse(stored));
    }, [router]);

    if (!result) {
        return (
            <AppShell>
                <div className="max-w-2xl mx-auto space-y-6">
                    <div className="rounded-2xl border bg-card p-8 flex flex-col items-center">
                        <div className="w-40 h-40 rounded-full bg-muted animate-pulse" />
                        <div className="h-5 w-48 bg-muted rounded animate-pulse mt-4" />
                    </div>
                    <div className="rounded-2xl border bg-card p-6 space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-3 bg-muted rounded animate-pulse" />
                        ))}
                    </div>
                </div>
            </AppShell>
        );
    }

    const riskLevel =
        result.risk_percentage >= 65 ? "High" : result.risk_percentage >= 35 ? "Moderate" : "Low";

    const riskColor =
        riskLevel === "High" ? "text-destructive" : riskLevel === "Moderate" ? "text-warning" : "text-success";

    const sortedFeatures = Object.entries(result.top_features).sort((a, b) => b[1] - a[1]);

    const handleDownloadPdf = async () => {
        if (!reportRef.current) return;
        try {
            const dataUrl = await toPng(reportRef.current, { 
                cacheBust: true,
                backgroundColor: "#ffffff",
                pixelRatio: 2 // for better quality
            });
            const pdf = new jsPDF("p", "mm", "a4");
            const width = pdf.internal.pageSize.getWidth();
            const height = (reportRef.current.offsetHeight * width) / reportRef.current.offsetWidth;
            pdf.addImage(dataUrl, "PNG", 0, 0, width, height);
            pdf.save("genescope-ai-report.pdf");
            toast.success("Report downloaded");
        } catch (err) {
            console.error("Failed to generate PDF:", err);
            toast.error("Failed to generate PDF");
        }
    };

    const handleShare = async () => {
        const shareText = `GeneScope AI Screening Result: ${result.predicted_disorder} (${result.risk_percentage}% risk). This is a screening estimate, not a diagnosis.`;
        if (navigator.share) {
            await navigator.share({ title: "GeneScope AI Result", text: shareText });
        } else {
            await navigator.clipboard.writeText(shareText);
            toast.success("Copied to clipboard");
        }
    };

    return (
        <AppShell>
            <div ref={reportRef} className="max-w-2xl mx-auto space-y-6">
                {/* Risk Score Card */}
                <div className="rounded-2xl border bg-card p-8 text-center">
                    <RiskGauge percentage={result.risk_percentage} />
                    <h2 className="text-xl font-semibold font-heading mt-4">{result.predicted_disorder}</h2>
                    <span
                        className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium bg-muted ${riskColor}`}
                    >
                        {riskLevel} Risk
                    </span>
                    <p className="text-xs text-muted-foreground mt-3">
                        Model confidence: {result.confidence}%
                    </p>
                </div>

                {/* Status Card */}
                <div className="rounded-2xl border bg-card p-4 flex items-center justify-around text-sm">
                    <div className="flex items-center gap-2 text-success">
                        <ShieldCheck size={16} />
                        <span>Privacy protected</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <WifiOff size={16} />
                        <span>Works offline</span>
                    </div>
                </div>

                {/* Top Contributing Factors */}
                <div className="rounded-2xl border bg-card p-6">
                    <h3 className="font-semibold font-heading mb-4">Top Contributing Factors</h3>
                    <div className="space-y-4">
                        {sortedFeatures.map(([feature, value]) => (
                            <div key={feature}>
                                <div className="flex justify-between text-sm mb-1.5">
                                    <span className="capitalize font-medium">{feature.replace(/_/g, " ")}</span>
                                    <span className="text-muted-foreground">{Math.round(value * 100)}%</span>
                                </div>
                                <Progress value={value * 100} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* What This Means */}
                <div className="rounded-2xl border bg-card p-6">
                    <h3 className="font-semibold font-heading mb-2">What This Means</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{result.summary}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 print:hidden">
                    <Button variant="outline" className="flex-1" onClick={handleDownloadPdf}>
                        <Download size={16} className="mr-2" /> Download PDF
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={handleShare}>
                        <Share2 size={16} className="mr-2" /> Share
                    </Button>
                </div>

                {/* Doctor CTA */}
                <div className="rounded-2xl border bg-primary/5 p-5 text-center">
                    <Stethoscope size={20} className="mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">Discuss this result with a doctor</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        This screening is a starting point, not a diagnosis. A healthcare professional can help interpret it in context.
                    </p>
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-muted-foreground text-center px-4">
                    This is a screening estimate, not a medical diagnosis. Please consult a doctor for clinical advice.
                </p>
            </div>
        </AppShell>
    );
}