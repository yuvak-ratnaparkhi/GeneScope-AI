import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../utils/theme';

const LEVEL_CONFIG = {
  Low: { bg: '#E7F2DC', text: colors.success, label: 'Low Risk' },
  Moderate: { bg: '#FCEED2', text: colors.warning, label: 'Moderate Risk' },
  High: { bg: '#FBE1D6', text: colors.danger, label: 'High Risk' },
};

export default function RiskBadge({ level = 'Moderate' }) {
  const config = LEVEL_CONFIG[level] || LEVEL_CONFIG.Moderate;
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]} accessibilityRole="text">
      <View style={[styles.dot, { backgroundColor: config.text }]} />
      <Text style={[styles.text, { color: config.text }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: spacing.sm / 2,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
  },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  text: { fontSize: 13, fontWeight: '700' },
});