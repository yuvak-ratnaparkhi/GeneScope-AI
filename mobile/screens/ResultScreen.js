import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import * as Speech from 'expo-speech';

export default function ResultScreen({ route }) {
  const { result } = route.params;
  const { predicted_disorder, top_features, summary } = result;

  const speakSummary = () => {
    Speech.speak(summary);
  };

  const sortedFeatures = Object.entries(top_features).sort((a, b) => b[1] - a[1]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title} accessibilityRole="text">{predicted_disorder}</Text>

      <Text style={styles.sectionHeader}>Top Contributing Factors</Text>
      {sortedFeatures.map(([feature, value]) => (
        <View key={feature} style={styles.barRow}>
          <Text style={styles.barLabel} accessibilityRole="text">{feature.replace(/_/g, ' ')}</Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${value * 100}%` }]} />
          </View>
          <Text style={styles.barValue}>{Math.round(value * 100)}%</Text>
        </View>
      ))}

      <Text style={styles.sectionHeader}>Summary</Text>
      <Text style={styles.summaryText} accessibilityRole="text">{summary}</Text>

      <Button 
        title="🔊 Read Summary Aloud" 
        onPress={speakSummary} 
        accessibilityLabel="Read summary aloud"
        accessibilityHint="Plays the summary text using text to speech"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  sectionHeader: { fontSize: 16, fontWeight: '600', marginTop: 16, marginBottom: 8 },
  barRow: { marginBottom: 10 },
  barLabel: { fontSize: 14, marginBottom: 4, textTransform: 'capitalize' },
  barTrack: { height: 10, backgroundColor: '#e5e7eb', borderRadius: 5, overflow: 'hidden' },
  barFill: { height: 10, backgroundColor: '#2563eb' },
  barValue: { fontSize: 12, color: '#555', marginTop: 2 },
  summaryText: { fontSize: 15, lineHeight: 22, marginBottom: 20 },
});