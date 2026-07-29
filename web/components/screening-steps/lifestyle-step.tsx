import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScreeningFormData } from "@/lib/types";

export default function LifestyleStep({
    data,
    onChange,
}: {
    data: ScreeningFormData;
    onChange: (fields: Partial<ScreeningFormData>) => void;
}) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl border bg-card">
            <div>
                <Label htmlFor="lifestyleRisk">Lifestyle risk factors present</Label>
                <p className="text-sm text-muted-foreground mt-1">
                    Smoking, low physical activity, or similar risk factors?
                </p>
            </div>
            <Switch
                id="lifestyleRisk"
                checked={data.lifestyleRisk}
                onCheckedChange={(checked) => onChange({ lifestyleRisk: checked })}
            />
        </div>
    );
}