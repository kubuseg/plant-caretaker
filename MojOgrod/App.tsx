import React from 'react';
import type { PropsWithChildren } from 'react';
import AppFooter from './src/components/AppFooter'
import AppHeader from './src/components/AppHeader'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

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
        style={styles.scrollView}>
        <View>
        </View>
      </ScrollView>
      <AppFooter />
    </SafeAreaView>
  );
}

const screenHeight = Dimensions.get('screen').height;
const headerHeight = screenHeight * 0.17

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white'
  },
});

export default App;
