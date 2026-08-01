"use client";

import { useState } from "react";
import AppShell from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ThemeToggle from "@/components/theme-toggle";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export default function SettingsPage() {
    const [confirming, setConfirming] = useState(false);

    const handleClearData = () => {
        sessionStorage.clear();
        toast.success("Local session data cleared");
        setConfirming(false);
    };

    return (
        <AppShell>
            <div className="max-w-md mx-auto space-y-4">
                <h1 className="text-2xl font-bold font-heading mb-2">Settings</h1>

                <div className="rounded-2xl border bg-card p-5 flex items-center justify-between">
                    <div>
                        <Label>Theme</Label>
                        <p className="text-xs text-muted-foreground mt-1">Switch between light and dark mode</p>
                    </div>
                    <ThemeToggle />
                </div>

                <div className="rounded-2xl border bg-card p-5">
                    <Label>Clear local session data</Label>
                    <p className="text-xs text-muted-foreground mt-1 mb-3">
                        Removes any temporary screening data stored in this browser session. Your history in the
                        database (if connected) is not affected.
                    </p>
                    {!confirming ? (
                        <Button variant="outline" size="sm" onClick={() => setConfirming(true)}>
                            <Trash2 size={14} className="mr-2" /> Clear session data
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button variant="destructive" size="sm" onClick={handleClearData}>
                                Confirm clear
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>
                                Cancel
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}