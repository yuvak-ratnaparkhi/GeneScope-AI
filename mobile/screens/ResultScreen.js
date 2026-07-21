import { ScrollView, View, Text, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import Card from '../components/Card';
import RiskGauge from '../components/RiskGauge';
import RiskBadge from '../components/RiskBadge';
import FactorBar from '../components/FactorBar';
import PrimaryButton from '../components/PrimaryButton';
import { colors, spacing } from '../utils/theme';

export default function ResultScreen({ route, navigation }) {
  const { result } = route.params;
  const { predicted_disorder, top_features, summary, risk_percentage } = result;

  const sortedFeatures = Object.entries(top_features).sort((a, b) => b[1] - a[1]);
  const riskPercentage = result.risk_percentage ?? 50;
  const riskLevel = riskPercentage >= 65 ? 'High' : riskPercentage >= 35 ? 'Moderate' : 'Low';

  const speakSummary = () => Speech.speak(summary);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Card style={styles.heroCard}>
        <RiskGauge percentage={riskPercentage} />
        <Text style={styles.disorderName} accessibilityRole="text">{predicted_disorder}</Text>
        <RiskBadge level={riskLevel} />
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Top Contributing Factors</Text>
        {sortedFeatures.map(([feature, value]) => (
          <FactorBar key={feature} label={feature} value={value} />
        ))}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>What This Means</Text>
        <Text style={styles.summaryText} accessibilityRole="text">{summary}</Text>
        <View style={{ height: spacing.md }} />
        <PrimaryButton title="Read Summary Aloud" icon="🔊" onPress={speakSummary} />
      </Card>

      <PrimaryButton
        title="Ask the AI Assistant"
        icon="💬"
        onPress={() => navigation.navigate('Chat', { context: result })}
      />

      <Text style={styles.disclaimer}>
        This is a screening estimate, not a medical diagnosis. Please consult a doctor for clinical advice.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  heroCard: { alignItems: 'center', paddingVertical: spacing.xl },
  disorderName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.md },
  summaryText: { fontSize: 15, lineHeight: 22, color: colors.textSecondary },
  disclaimer: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
});