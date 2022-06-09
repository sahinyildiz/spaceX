import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './src/SplashScreen';
import DashboardScreen from './src/DashboardScreen';
import ListScreen from './src/ListScreen';
import ListDetailScreen from './src/ListDetailScreen';

const Stack = createStackNavigator();

const General = () => {
  return (<Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SplashScreen" component={SplashScreen} />
    <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
    <Stack.Screen name="ListScreen" component={ListScreen} />
    <Stack.Screen name="ListDetailScreen" component={ListDetailScreen} />
  </Stack.Navigator>)
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="General"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="General" component={General} initial />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

