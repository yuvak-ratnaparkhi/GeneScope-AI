export function calculateBmi(heightCm: string, weightKg: string): string {
    const h = Number(heightCm);
    const w = Number(weightKg);
    if (!h || !w) return "";
    const heightM = h / 100;
    const bmi = w / (heightM * heightM);
    return bmi.toFixed(1);
}

export function bmiCategory(bmi: number, age?: number): string {
  if (age && age < 18) return "Category not standard for under-18 (uses growth percentiles, not adult BMI)";
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}