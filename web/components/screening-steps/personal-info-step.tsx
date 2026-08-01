import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScreeningFormData } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useEffect } from "react";
import { calculateBmi, bmiCategory } from "@/lib/bmi";

export default function PersonalInfoStep({
    data,
    onChange,
}: {
    data: ScreeningFormData;
    onChange: (fields: Partial<ScreeningFormData>) => void;
}) {
    return (
        <div className="space-y-5">
            <div>
                <Label htmlFor="age">Age</Label>
                <Input
                    id="age"
                    type="number"
                    placeholder="e.g. 35"
                    value={data.age ?? ""}
                    onChange={(e) => onChange({ age: e.target.value })}
                    className="mt-1.5"
                />
            </div>

            <div>
                <Label htmlFor="gender">Gender</Label>
                <Select value={data.gender} onValueChange={(value) => onChange({ gender: value ?? "" })}>
                    <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                    id="height"
                    type="number"
                    placeholder="e.g. 170"
                    value={data.height ?? ""}
                    onChange={(e) => {
                        const height = e.target.value;
                        onChange({ height, bmi: calculateBmi(height, data.weight ?? "") });
                    }}
                    className="mt-1.5"
                />
            </div>

            <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                    id="weight"
                    type="number"
                    placeholder="e.g. 68"
                    value={data.weight ?? ""}
                    onChange={(e) => {
                        const weight = e.target.value;
                        onChange({ weight, bmi: calculateBmi(data.height ?? "", weight) });
                    }}
                    className="mt-1.5"
                />
            </div>

            <div>
                <div className="flex items-center gap-1.5">
                    <Label htmlFor="bmi">BMI</Label>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger><Info size={13} className="text-muted-foreground" /></TooltipTrigger>
                            <TooltipContent>Body Mass Index — calculated automatically from your height and weight.</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <Input
                    id="bmi"
                    value={data.bmi ?? ""}
                    readOnly
                    placeholder="Auto-calculated"
                    className="mt-1.5 bg-muted cursor-not-allowed"
                />
                {data.bmi && (
                    <p className="text-xs text-muted-foreground mt-1.5">
                        Category: <span className="font-medium">{bmiCategory(Number(data.bmi))}</span>
                    </p>
                )}
            </div>
        </div>
    );
}