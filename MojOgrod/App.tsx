import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import PlantTypeDetails from './src/screens/PlantTypeDetails';
import PlantTypeChoice from './src/screens/PlantTypeChoice';
import { SafeAreaView, StatusBar } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import UserPlantDetails from './src/screens/UserPlantDetails';
import UserPlantDetailsEdit from './src/screens/UserPlantDetailsEdit';
import DataManager from './src/services/DataManager';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const userId = '1';

  useEffect(() => {
    DataManager.updatePlantTypes();
    DataManager.updateUserPlants(userId);

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
            name="UserPlantDetailsEdit"
            component={UserPlantDetailsEdit}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
