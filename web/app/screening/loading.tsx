export default function Loading() {
    return (
        <div className="min-h-screen bg-background flex">
            <div className="hidden md:flex w-60 border-r bg-card flex-col p-4">
                <div className="h-6 w-32 bg-muted rounded animate-pulse" />
            </div>
            <div className="flex-1 p-6">
                <div className="max-w-xl mx-auto space-y-6">
                    <div className="h-8 w-40 bg-muted rounded-lg animate-pulse" />
                    <div className="flex justify-between">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                        ))}
                    </div>
                    <div className="rounded-2xl border bg-card p-6 space-y-4">
                        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                        <div className="h-10 w-full bg-muted rounded-lg animate-pulse" />
                        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                        <div className="h-10 w-full bg-muted rounded-lg animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
}