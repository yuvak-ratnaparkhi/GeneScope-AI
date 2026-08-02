import { ScreeningFormData } from "./types";

const HISTORY_KEY = "gs_history";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function loadHistory(): HistoryItem[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
}

function saveToHistory(item: HistoryItem) {
    const current = loadHistory();
    localStorage.setItem(HISTORY_KEY, JSON.stringify([item, ...current]));
}

const USE_MOCK = false;

export interface PredictionResult {
    predicted_disorder: string;
    top_features: Record<string, number>;
    summary: string;
    disclaimer: string;
    risk_percentage: number;
    confidence: number;
}

export async function getPrediction(formData: ScreeningFormData): Promise<PredictionResult> {
    if (USE_MOCK) {
        // ...(keep all existing mock code exactly as-is, unchanged)...
    }

    const response = await fetch(`${API_BASE_URL}/api/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: formData }),
    });

    if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        console.error(`Prediction API error (${response.status}):`, errorText);
        throw new Error("API_ERROR");
    }
    const data = await response.json();

    const topVals = Object.values(data.top_features || {}) as number[];
    const calculatedRisk = data.risk_percentage ?? Math.min(95, Math.max(15, Math.round((topVals[0] || 0.45) * 100)));

    const result: PredictionResult = {
        predicted_disorder: data.predicted_disorder,
        top_features: data.top_features,
        summary: data.summary_text || data.summary || "",
        disclaimer: data.disclaimer || "This is an informational estimate, not a medical diagnosis.",
        risk_percentage: calculatedRisk,
        confidence: data.confidence ?? 89,
    };

    saveToHistory({
        id: Date.now(),
        predicted_disorder: result.predicted_disorder,
        top_features: result.top_features,
        summary: result.summary,
        created_at: new Date().toISOString(),
        risk_percentage: result.risk_percentage,
    });

    return result;
}

export interface HistoryItem {
    id: number;
    predicted_disorder: string;
    top_features: Record<string, number>;
    summary: string;
    created_at: string;
    risk_percentage: number;
}

const USE_MOCK_HISTORY = true; // keep history mocked (local-only) for now, backend history route is separate scope

export async function getHistory(): Promise<HistoryItem[]> {
    if (USE_MOCK_HISTORY) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        const saved = loadHistory();

        if (saved.length === 0) {
            return [
                {
                    id: 1,
                    predicted_disorder: "Type 2 Diabetes Risk",
                    top_features: { family_history: 0.34, bmi: 0.28, age: 0.15, physical_activity: 0.23 },
                    summary: "Mainly influenced by family history and BMI.",
                    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
                    risk_percentage: 68,
                },
                {
                    id: 2,
                    predicted_disorder: "Low Metabolic Risk",
                    top_features: { family_history: 0.12, bmi: 0.1, age: 0.08, physical_activity: 0.7 },
                    summary: "Overall low risk based on current lifestyle factors.",
                    created_at: new Date(Date.now() - 86400000 * 9).toISOString(),
                    risk_percentage: 24,
                },
            ];
        }
        return saved.map((item) => ({
            ...item,
            risk_percentage: item.risk_percentage ?? 45,
        }));
    }

    const response = await fetch(`${API_BASE_URL}/api/history/USER_HASH`);
    if (!response.ok) throw new Error("HISTORY_ERROR");
    return await response.json();
}

export async function sendChatMessage(message: string, context?: object): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, context: context || null }),
    });
    if (!response.ok) throw new Error("CHAT_ERROR");
    const data = await response.json();
    return data.reply;
}