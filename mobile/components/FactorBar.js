import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../utils/theme';

export default function FactorBar({ label, value }) {
  const percent = Math.round(value * 100);
  return (
    <View style={styles.row} accessibilityRole="text">
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label.replace(/_/g, ' ')}</Text>
        <Text style={styles.value}>{percent}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { marginBottom: spacing.md },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { fontSize: 14, fontWeight: '600', color: colors.textPrimary, textTransform: 'capitalize' },
  value: { fontSize: 13, fontWeight: '600', color: colors.textSecondary },
  track: { height: 8, backgroundColor: colors.border, borderRadius: radius.pill, overflow: 'hidden' },
  fill: { height: 8, backgroundColor: colors.accent, borderRadius: radius.pill },
});