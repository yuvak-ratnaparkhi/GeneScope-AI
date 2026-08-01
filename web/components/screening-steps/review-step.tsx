import { ScreeningFormData } from "@/lib/types";

export default function ReviewStep({ data }: { data: ScreeningFormData }) {
    const rows = [
        { label: "Age", value: data.age || "—" },
        { label: "Gender", value: data.gender || "—" },
        { label: "Height", value: data.height ? `${data.height} cm` : "—" },
        { label: "Weight", value: data.weight ? `${data.weight} kg` : "—" },
        { label: "BMI", value: data.bmi || "—" },
        { label: "Family history", value: data.familyHistory ? "Yes" : "No" },
        { label: "Lifestyle risk", value: data.lifestyleRisk ? "Yes" : "No" },
    ];

    return (
        <div className="rounded-xl border bg-card divide-y">
            {rows.map((row) => (
                <div key={row.label} className="flex justify-between px-4 py-3 text-sm">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-medium">{row.value}</span>
                </div>
            ))}
        </div>
    );
}