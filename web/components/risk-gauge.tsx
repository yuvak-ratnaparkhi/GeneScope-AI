"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

export default function RiskGauge({ percentage }: { percentage: number }) {
    const [animated, setAnimated] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => setAnimated(percentage), 100);
        return () => clearTimeout(timeout);
    }, [percentage]);

    const color = percentage >= 65 ? "#D85A30" : percentage >= 35 ? "#EF9F27" : "#639922";

    const data = [
        { value: animated },
        { value: 100 - animated },
    ];

    return (
        <div className="relative w-40 h-40 mx-auto">
            <PieChart width={160} height={160}>
                <Pie
                    data={data}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    innerRadius={60}
                    outerRadius={72}
                    strokeWidth={0}
                    isAnimationActive
                    animationDuration={800}
                >
                    <Cell fill={color} />
                    <Cell fill="hsl(var(--muted))" />
                </Pie>
            </PieChart>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold font-heading">{percentage}%</span>
                <span className="text-xs text-muted-foreground">risk score</span>
            </div>
        </div>
    );
}