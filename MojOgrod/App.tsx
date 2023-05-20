import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import PlantTypeDetails from './src/screens/PlantTypeDetails';
import PlantTypeChoice from './src/screens/PlantTypeChoice';
import { SafeAreaView, StatusBar } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getPlantsDescriptions } from './src/services/PlantsDBApi';
import JsonFileManager from './src/services/JsonFileManager';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  let x = 0;
  useEffect(() => {
    const updateDescriptions = async () => {
      try {
        const descriptions = await getPlantsDescriptions();
        JsonFileManager.save('typesDescriptions', descriptions);
      } catch (error) {
        // toDo - implement alert
      }
    };

    updateDescriptions();
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
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
