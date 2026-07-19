import NetInfo from '@react-native-community/netinfo';

export async function isOnline() {
  try {
    const state = await NetInfo.fetch();
    return state.isConnected && state.isInternetReachable !== false;
  } catch (e) {
    console.warn('NetInfo check failed, assuming online:', e);
    return true;
  }
}