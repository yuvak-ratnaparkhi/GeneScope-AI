import * as Crypto from 'expo-crypto';

// Fields that must NEVER leave the device as raw values
const PII_FIELDS = ['name', 'email', 'phone', 'dob'];

// Hash any identity reference locally (SHA-256, one-way)
export async function hashIdentifier(value) {
  if (!value) return null;
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    value.trim().toLowerCase()
  );
}

// Strips PII fields, returns only whitelisted/safe fields + optional hashed id
export async function buildAnonymizedPayload(formData, options = {}) {
  const { includeHashedId = false, idField = 'email' } = options;

  const payload = {};
  for (const key in formData) {
    if (!PII_FIELDS.includes(key)) {
      payload[key] = formData[key];
    }
  }

  if (includeHashedId && formData[idField]) {
    payload.userHash = await hashIdentifier(formData[idField]);
  }

  return payload;
}
