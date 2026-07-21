import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../utils/theme';

export default function RiskGauge({ percentage = 0, size = 160, strokeWidth = 14 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(100, percentage));
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const gaugeColor =
    progress >= 65 ? colors.danger : progress >= 35 ? colors.warning : colors.success;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.border}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={gaugeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.centerText}>
        <Text style={styles.percentValue}>{Math.round(progress)}%</Text>
        <Text style={styles.percentLabel}>risk score</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerText: { position: 'absolute', alignItems: 'center' },
  percentValue: { fontSize: 32, fontWeight: '800', color: colors.textPrimary },
  percentLabel: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
});