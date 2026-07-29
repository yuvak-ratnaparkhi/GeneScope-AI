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
                    value={data.age}
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
                <Label htmlFor="bmi">BMI</Label>
                <Input
                    id="bmi"
                    type="number"
                    placeholder="e.g. 22.5"
                    value={data.bmi}
                    onChange={(e) => onChange({ bmi: e.target.value })}
                    className="mt-1.5"
                />
            </div>
        </div>
    );
}