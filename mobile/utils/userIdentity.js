import AsyncStorage from '@react-native-async-storage/async-storage';
import { hashIdentifier } from './anonymize';

const DEVICE_ID_KEY = 'genescope_device_id';

export async function getUserHash() {
    let deviceId = await AsyncStorage.getItem(DEVICE_ID_KEY);

    if (!deviceId) {
        deviceId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        await AsyncStorage.setItem(DEVICE_ID_KEY, deviceId);
    }

    return await hashIdentifier(deviceId);
    
}