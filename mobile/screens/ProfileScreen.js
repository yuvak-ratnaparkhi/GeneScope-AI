import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../components/Card';
import { getHistory } from '../services/api';
import { colors, spacing } from '../utils/theme';

export default function ProfileScreen() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {
      const history = await getHistory();
      setCount(history.length);
    })();
  }, []);

  return (
    <View style={styles.screen}>
      <Card style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🧬</Text>
        </View>
        <Text style={styles.name}>Anonymous User</Text>
        <Text style={styles.sub}>Your identity is never stored</Text>
      </Card>

      <Card style={styles.statRow}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{count}</Text>
          <Text style={styles.statLabel}>Screenings</Text>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  header: { alignItems: 'center', paddingVertical: spacing.xl },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  avatarText: { fontSize: 28 },
  name: { fontSize: 17, fontWeight: '700', color: colors.textPrimary },
  sub: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
  statRow: { flexDirection: 'row', justifyContent: 'space-around' },
  stat: { alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: '800', color: colors.primary },
  statLabel: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
});