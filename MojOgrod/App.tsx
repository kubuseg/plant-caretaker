import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import PlantTypeDetails from './src/screens/PlantTypeDetails';
import LoggScreen from './src/screens/logg_screen';
import PlantTypeChoice from './src/screens/PlantTypeChoice';
import InformationChoice from './src/screens/InformationChoice';
import {SafeAreaView, StatusBar} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import UserPlantDetails from './src/screens/UserPlantDetails';
import UserPlantSettings from './src/screens/UserPlantSettings';
import UserPlantStatistics from './src/screens/UserPlantStatistics';
import DataManager from './src/services/DataManager';
import PlantTypes from './src/screens/PlantTypes';
import UserSettingsScreen from './src/screens/UserSettingsScreen';
import JsonFileManager from './src/services/JsonFileManager';
import {AuthProvider} from './src/auth/AuthContext';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const backgroundStyle = {
    flex: 1,
    backgroundColor: Colors.lighter,
  };

  return (
    <AuthProvider>
      <NavigationContainer>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Stack.Navigator screenOptions={{animation: 'fade'}}>
            <Stack.Screen
              name="logg"
              component={LoggScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PlantTypeDetails"
              component={PlantTypeDetails}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PlantTypeChoice"
              component={PlantTypeChoice}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UserPlantDetails"
              component={UserPlantDetails}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UserPlantSettings"
              component={UserPlantSettings}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UserPlantStatistics"
              component={UserPlantStatistics}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PlantTypes"
              component={PlantTypes}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="InformationChoice"
              component={InformationChoice}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UserSettings"
              component={UserSettingsScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
