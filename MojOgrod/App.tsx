import React from 'react';
import AppFooter from './src/components/AppFooter'
import AppHeader from './src/components/AppHeader'
import HomeScreen from './src/screens/HomeScreen'
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const backgroundStyle = {
    flex: 1,
    backgroundColor: Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <AppHeader />
      <HomeScreen />
      <AppFooter />
    </SafeAreaView>
  );
}

export default App;
