"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/app-shell";
import { getHistory } from "@/lib/api";
import { ShieldCheck } from "lucide-react";

export default function ProfilePage() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        getHistory().then((data) => setCount(data.length));
    }, []);

    return (
        <AppShell>
            <div className="max-w-md mx-auto space-y-4">
                <div className="rounded-2xl border bg-card p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-2xl">
                        🧬
                    </div>
                    <p className="font-semibold">Anonymous User</p>
                    <p className="text-sm text-muted-foreground mt-1">Your identity is never stored</p>
                </div>

                <div className="rounded-2xl border bg-card p-6 text-center">
                    <p className="text-3xl font-bold font-heading text-primary">{count}</p>
                    <p className="text-sm text-muted-foreground mt-1">Screenings completed</p>
                </div>

                <div className="rounded-2xl border bg-card p-5 flex items-center gap-3">
                    <ShieldCheck size={20} className="text-success" />
                    <p className="text-sm text-muted-foreground">
                        Anonymized via a local hash — no name, email, or phone is ever stored.
                    </p>
                </div>
            </div>
        </AppShell>
    );
}