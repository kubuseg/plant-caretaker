import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import PlantTypeDetails from './src/screens/PlantTypeDetails';
import PlantTypeChoice from './src/screens/PlantTypeChoice';
import InformationChoice from './src/screens/InformationChoice';
import { SafeAreaView, StatusBar } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import UserPlantDetails from './src/screens/UserPlantDetails';
import UserPlantSettings from './src/screens/UserPlantSettings';
import DataManager from './src/services/DataManager';
import PlantTypes from './src/screens/PlantTypes';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const userId = '1';

  useEffect(() => {
    DataManager.updatePlantTypes();
    DataManager.updateUserPlants();

  }, []);

  const backgroundStyle = {
    flex: 1,
    backgroundColor: Colors.lighter,
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Stack.Navigator screenOptions={{ animation: 'fade' }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PlantTypeDetails"
            component={PlantTypeDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PlantTypeChoice"
            component={PlantTypeChoice}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserPlantDetails"
            component={UserPlantDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserPlantSettings"
            component={UserPlantSettings}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PlantTypes"
            component={PlantTypes}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InformationChoice"
            component={InformationChoice}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
