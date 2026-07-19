import { buildAnonymizedPayload } from '../utils/anonymize';
import { isOnline } from './network';

const API_BASE_URL = 'https://YOUR-BACKEND-URL-HERE.com';
const USE_MOCK = true;

export async function getPrediction(formData) {
    const online = await isOnline();
    if (!online) {
        throw new Error('OFFLINE');
    }

    const payload = await buildAnonymizedPayload(formData, { includeHashedId: true });

    if (USE_MOCK) {
        // Fake delay to simulate a real network call 
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
            predicted_disorder: 'Type 2 Diabetes Risk',
            top_features: {
                family_history: 0.34,
                bmi: 0.27,
                age: 0.19,
                physical_activity: 0.12,
            },
            summary: 
                'Based on the screeming, you were flagged under the "Type 2 Diabetes Risk" category, mainly influenced by family history and BMI.',  
        };
    }

    const response = await fetch(`${API_BASE_URL}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('API_ERROR');
    }

    return await response.json();
}