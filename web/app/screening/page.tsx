"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/app-shell";
import StepIndicator from "@/components/step-indicator";
import PersonalInfoStep from "@/components/screening-steps/personal-info-step";
import FamilyHistoryStep from "@/components/screening-steps/family-history-step";
import LifestyleStep from "@/components/screening-steps/lifestyle-step";
import ReviewStep from "@/components/screening-steps/review-step";
import { Button } from "@/components/ui/button";
import { ScreeningFormData, initialFormData } from "@/lib/types";
import { getPrediction } from "@/lib/api";
import { toast } from "sonner";

export default function ScreeningPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<ScreeningFormData>(initialFormData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateFormData = (fields: Partial<ScreeningFormData>) => {
        setFormData((prev) => ({ ...prev, ...fields }));
    };

    const validateStep = (): boolean => {
        setError(null);

        if (step === 1) {
            if (!formData.age || Number(formData.age) <= 0) {
                const msg = "Please fill the details first — enter a valid age.";
                setError(msg);
                return false;
            }
            if (!formData.gender) {
                const msg = "Please fill the details first — select a gender.";
                setError(msg);
                return false;
            }
            if (!formData.height || Number(formData.height) <= 0) {
                const msg = "Please fill the details first — enter a valid height.";
                setError(msg);
                return false;
            }
            if (!formData.weight || Number(formData.weight) <= 0) {
                const msg = "Please fill the details first — enter a valid weight.";
                setError(msg);
                return false;
            }
        }

        return true;
    };

    const loadSampleData = () => {
        setFormData({
            age: "42",
            gender: "male",
            height: "175",
            weight: "70",
            bmi: "22.9",
            familyHistory: true,
            lifestyleRisk: true,
        });
        toast.success("Sample data loaded");
    };

    const handleNext = () => {
        if (!validateStep()) return;
        setStep((s) => Math.min(s + 1, 4));
    };

    const handleBack = () => setStep((s) => Math.max(s - 1, 1));

    const handleSubmit = async () => {
        if (!formData.age || !formData.gender || !formData.height || !formData.weight) {
            toast.error("Please fill the details first before generating a prediction.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const result = await getPrediction(formData);
            sessionStorage.setItem("gs_result", JSON.stringify(result));
            router.push("/results");
        } catch (err) {
            console.error("Prediction error:", err);
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <AppShell>
            <div className="max-w-xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold font-heading">Risk Screening</h1>
                    <Button variant="outline" size="sm" onClick={loadSampleData}>
                        Load Sample Patient Data
                    </Button>
                </div>

                <StepIndicator currentStep={step} />

                <div className="mb-8">
                    {step === 1 && <PersonalInfoStep data={formData} onChange={updateFormData} />}
                    {step === 2 && <FamilyHistoryStep data={formData} onChange={updateFormData} />}
                    {step === 3 && <LifestyleStep data={formData} onChange={updateFormData} />}
                    {step === 4 && <ReviewStep data={formData} />}
                </div>

                {error && <p className="text-destructive text-sm mb-4">{error}</p>}

                <div className="flex justify-between">
                    <Button variant="outline" onClick={handleBack} disabled={step === 1 || loading}>
                        Back
                    </Button>

                    {step < 4 ? (
                        <Button onClick={handleNext}>Next</Button>
                    ) : (
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading ? "Analyzing..." : "Generate Prediction"}
                        </Button>
                    )}
                </div>
            </div>
        </AppShell>
    );
}