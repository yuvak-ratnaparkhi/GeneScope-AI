import { useEffect, useState, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Card from '../components/Card';
import { getHistory } from '../services/api';
import { colors, spacing } from '../utils/theme';

export default function HistoryScreen({ navigation }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (err) {
      console.error('History load error:', err);
    }
    setLoading(false);
  };

  useFocusEffect(useCallback(() => { loadHistory(); }, []));

  if (!loading && history.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No screenings yet</Text>
        <Text style={styles.emptyText}>Your past results will appear here once you complete a screening.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={loadHistory} />}
    >
      {history.map((item) => (
        <Card key={item.id} style={styles.row}>
          <Text style={styles.disorder}>{item.predicted_disorder}</Text>
          <Text style={styles.date}>
            {new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </Text>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  disorder: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  date: { fontSize: 13, color: colors.textSecondary },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, backgroundColor: colors.background },
  emptyTitle: { fontSize: 17, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.sm },
  emptyText: { fontSize: 14, color: colors.textSecondary, textAlign: 'center' },
});