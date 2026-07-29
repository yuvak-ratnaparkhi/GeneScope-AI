import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScreeningFormData } from "@/lib/types";

export default function FamilyHistoryStep({
    data,
    onChange,
}: {
    data: ScreeningFormData;
    onChange: (fields: Partial<ScreeningFormData>) => void;
}) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl border bg-card">
            <div>
                <Label htmlFor="familyHistory">Family history of the condition</Label>
                <p className="text-sm text-muted-foreground mt-1">
                    Has a close relative been diagnosed with a similar condition?
                </p>
            </div>
            <Switch
                id="familyHistory"
                checked={data.familyHistory}
                onCheckedChange={(checked) => onChange({ familyHistory: checked })}
            />
        </div>
    );
}