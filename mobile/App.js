import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FormScreen from './screens/FormScreen';
import ResultScreen from './screens/ResultScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Form">
        <Stack.Screen
        name="Form"
        component={FormScreen}
        options={{ title: 'GeneScope AI' }}
        />
        <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{ title: 'Your Results' }}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}