import NetInfo from '@react-native-commnunity/netinfo';

// Returb true if device currently has internet access
export async function isOnline() {
    const state = await NetInfo.fetch();
    return state.isConnected && state.isInternetReachable != false;
}