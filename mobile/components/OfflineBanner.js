import { StyleSheet, Text, View } from 'react-native';

export default function OfflineBanner() {
    return (
        <View style={StyleSheet.banner}>
            <Text style={StyleSheet.text}>
                You're offline. Please reconnect to run a prediction.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    banner: {
        backgroundColor: '#fef3c7',
        padding: 10,
        borderRadius: 6,
        marginBottom: 12,
    },
    text: {
        color: '#92400e',
        textAlign: 'center',
        fontWeight: '600',
    },
});