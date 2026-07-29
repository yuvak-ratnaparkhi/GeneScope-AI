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
                setError("Please enter a valid age.");
                return false;
            }
            if (!formData.gender) {
                setError("Please select a gender.");
                return false;
            }
        }
        return true;
    };

    const handleNext = () => {
        if (!validateStep()) return;
        setStep((s) => Math.min(s + 1, 4));
    };

    const handleBack = () => setStep((s) => Math.max(s - 1, 1));

    const handleSubmit = async () => {
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
                <h1 className="text-2xl font-bold font-heading mb-6">Risk Screening</h1>

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