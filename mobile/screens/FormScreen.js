import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Switch, Button, ActivityIndicator, ScrollView } from 'react-native';
import { getPrediction } from '../services/api';
import OfflineBanner from '../components/OfflineBanner';
import { isOnline } from '../services/network';

export default function FormScreen({ navigation }) {
  const [age, setAge] = useState('');
  const [familyHistory, setFamilyHistory] = useState(false);
  const [lifestyleRisk, setLifestyleRisk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    const online = await isOnline();
    if (!online) {
      setOffline(true);
      return;
    }
    setOffline(false);
    setLoading(true);

    try {
      const result = await getPrediction({
        age: Number(age),
        familyHistory,
        lifestyleRisk,
        // gene marker fields go here once your form has real ones
      });
      setLoading(false);
      navigation.navigate('Result', { result });
    } catch (err) {
      console.error('Prediction error:', err);
      setLoading(false);
      if (err.message === 'OFFLINE') {
        setOffline(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {offline && <OfflineBanner />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Text style={styles.label} accessibilityRole="text">Age</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        accessibilityLabel="Enter your age"
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Family history of condition</Text>
        <Switch
          value={familyHistory}
          onValueChange={setFamilyHistory}
          accessibilityLabel="Toggle family history"
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Lifestyle risk factors present</Text>
        <Switch
          value={lifestyleRisk}
          onValueChange={setLifestyleRisk}
          accessibilityLabel="Toggle lifestyle risk"
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <Button title="Get My Result" onPress={handleSubmit} disabled={offline} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 16 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  errorText: { color: '#b91c1c', marginBottom: 12 },
});