import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FormScreen from './screens/FormScreen';
import ResultScreen from './screens/ResultScreen';
import HistoryScreen from './screens/HistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import { colors } from './utils/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Form">
      <Stack.Screen name="Form" component={FormScreen} options={{ title: 'GeneScope AI' }} />
      <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Your Results' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: 'Home' }} />
        <Tab.Screen name="History" component={HistoryScreen} options={{ headerShown: true, title: 'History' }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true, title: 'Profile' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}