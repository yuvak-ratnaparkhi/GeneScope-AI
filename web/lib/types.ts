export interface ScreeningFormData {
  age: string;
  gender: string;
  height: string;
  weight: string;
  bmi: string;
  familyHistory: boolean;
  lifestyleRisk: boolean;
}

export const initialFormData: ScreeningFormData = {
  age: "",
  gender: "",
  height: "",
  weight: "",
  bmi: "",
  familyHistory: false,
  lifestyleRisk: false,
};