/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const AppHeader = () => {
  return (
    <View style={elementsStyles.appHeader}>
      <Text style={textsStyles.headerTitle}>Mój Ogród</Text>
    </View>
  );
};

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
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={elementsStyles.scrollView}>
        <View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const screenHeight = Dimensions.get('screen').height;
const headerHeight = screenHeight * 0.17

const elementsStyles = StyleSheet.create({
  appHeader: {
    backgroundColor: '#77b690',
    alignItems: 'center',
    justifyContent: 'center',
    height: headerHeight,
  },
  scrollView: {
    backgroundColor: 'white'
  },
});

const textsStyles = StyleSheet.create({
  headerTitle: {
    textAlign: 'center',
    fontFamily: 'NewTitleRoman',
    fontSize: 24,
    color: '#fff'
  },
});

export default App;
