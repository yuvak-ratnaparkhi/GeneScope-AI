import { useState } from 'react';
import { ScrollView, View, Text, TextInput, Switch, StyleSheet } from 'react-native';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import OfflineBanner from '../components/OfflineBanner';
import { getPrediction } from '../services/api';
import { isOnline } from '../services/network';
import { colors, spacing, radius } from '../utils/theme';

export default function FormScreen({ navigation }) {
  const [age, setAge] = useState('');
  const [familyHistory, setFamilyHistory] = useState(false);
  const [lifestyleRisk, setLifestyleRisk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);

  const validate = () => {
    if (!age || isNaN(age) || Number(age) <= 0) {
      setError('Please enter a valid age.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setError(null);
    if (!validate()) return;

    const online = await isOnline();
    if (!online) {
      setOffline(true);
      return;
    }
    setOffline(false);
    setLoading(true);

    try {
      const result = await getPrediction({ age: Number(age), familyHistory, lifestyleRisk });
      setLoading(false);
      navigation.navigate('Result', { result });
    } catch (err) {
      console.error('Prediction error:', err);
      setLoading(false);
      err.message === 'OFFLINE' ? setOffline(true) : setError('Something went wrong. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {offline && <OfflineBanner />}

      <Text style={styles.title}>Genetic Risk Screening</Text>
      <Text style={styles.subtitle}>Answer a few questions to get your personalized risk assessment.</Text>
      <Card>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          placeholder="e.g. 35"
          placeholderTextColor={colors.textSecondary}
          accessibilityLabel="Enter your age"
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </Card>
      <Card>
        <View style={styles.switchRow}>
          <Text style={styles.label}>Family history of condition</Text>
          <Switch
            value={familyHistory}
            onValueChange={setFamilyHistory}
            trackColor={{ true: colors.accent }}
            accessibilityLabel="Toggle family history"
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.switchRow}>
          <Text style={styles.label}>Lifestyle risk factors present</Text>
          <Switch
            value={lifestyleRisk}
            onValueChange={setLifestyleRisk}
            trackColor={{ true: colors.accent }}
            accessibilityLabel="Toggle lifestyle risk"
          />
        </View>
      </Card>
      <PrimaryButton
        title="Get My Result"
        onPress={handleSubmit}
        disabled={offline}
        loading={loading}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  title: { fontSize: 22, fontWeight: '800', color: colors.textPrimary, marginBottom: spacing.sm },
  subtitle: { fontSize: 14, color: colors.textSecondary, marginBottom: spacing.lg, lineHeight: 20 },
  label: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.button,
    padding: 14,
    marginTop: spacing.sm,
    fontSize: 15,
    color: colors.textPrimary,
  },
  errorText: { color: colors.danger, fontSize: 13, marginTop: spacing.sm },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.sm },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
});

