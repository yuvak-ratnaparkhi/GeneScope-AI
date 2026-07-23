import { buildAnonymizedPayload } from '../utils/anonymize';
import { getUserHash } from '../utils/userIdentity';
import { isOnline } from './network';

const API_BASE_URL = 'https://YOUR-BACKEND-URL-HERE.com';
const USE_MOCK = true;
const USE_MOCK_HISTORY = true;

export async function getPrediction(formData) {
  const online = await isOnline();
  if (!online) {
    throw new Error('OFFLINE');
  }

  const payload = await buildAnonymizedPayload(formData, { includeHashedId: false });
  const userHash = await getUserHash();

  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const familyPts = formData.familyHistory ? 30 : 5;
    const lifestylePts = formData.lifestyleRisk ? 25 : 5;
    const agePts = formData.age >= 45 ? 25 : formData.age >= 30 ? 12 : 5;
    const basePts = 10;

    const riskScore = Math.min(97, basePts + familyPts + lifestylePts + agePts);

    const familyWeight = formData.familyHistory ? 0.34 : 0.12;
    const lifestyleWeight = formData.lifestyleRisk ? 0.28 : 0.1;
    const ageWeight = formData.age >= 45 ? 0.24 : formData.age >= 30 ? 0.15 : 0.08;
    const activityWeight = Math.max(1 - (familyWeight + lifestyleWeight + ageWeight), 0.05);

    return {
      predicted_disorder: riskScore >= 50 ? 'Type 2 Diabetes Risk' : 'Low Metabolic Risk',
      risk_percentage: riskScore,
      top_features: {
        family_history: familyWeight,
        bmi: lifestyleWeight,
        age: ageWeight,
        physical_activity: activityWeight,
      },
      summary: `Based on the screening, your result was mainly influenced by ${
        familyWeight > 0.2 ? 'family history' : 'lifestyle factors'
      } and ${formData.age >= 45 ? 'your age group' : 'your BMI'}.`,
      user_hash: userHash,
    };
  }

  const response = await fetch(`${API_BASE_URL}/api/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ features: payload, user_hash: userHash }),
  });

  if (!response.ok) {
    throw new Error('API_ERROR');
  }

  return await response.json();
}

export async function getHistory() {
  const userHash = await getUserHash();

  if (USE_MOCK_HISTORY) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [
      {
        id: 1,
        predicted_disorder: 'Type 2 Diabetes Risk',
        created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        id: 2,
        predicted_disorder: 'Low Metabolic Risk',
        created_at: new Date(Date.now() - 86400000 * 9).toISOString(),
      },
    ];
  }

  const response = await fetch(`${API_BASE_URL}/api/history/${userHash}`);
  if (!response.ok) throw new Error('HISTORY_ERROR');
  return await response.json();
}