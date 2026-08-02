export function calculateBmi(heightCm: string, weightKg: string): string {
    const h = Number(heightCm);
    const w = Number(weightKg);
    if (!h || !w) return "";
    const heightM = h / 100;
    const bmi = w / (heightM * heightM);
    return bmi.toFixed(1);
}

export function bmiCategory(bmi: number): string {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
}