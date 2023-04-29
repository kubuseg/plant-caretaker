import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  Colors,
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

const AppFooter = () => {
  return (
    <View style={elementsStyles.appFooter}>
      <TouchableOpacity>
        <Image
          source={require('./assets/icon.png')}
          style={elementsStyles.footerButton}
          resizeMode='contain'
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('./assets/icon.png')}
          style={elementsStyles.footerButton}
          resizeMode='contain'
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('./assets/icon.png')}
          style={elementsStyles.footerButton}
          resizeMode='contain'
        />
      </TouchableOpacity>
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
      <AppFooter />
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
  appFooter: {
    flexDirection: 'row',
    backgroundColor: '#77b690',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: headerHeight,
  },
  footerButton: {
    width: "100%",
    height: "100%",
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
});

const textsStyles = StyleSheet.create({
  headerTitle: {
    textAlign: 'center',
    fontFamily: 'NewTitleRoman',
    fontSize: 24,
    color: 'white'
  },
});

export default App;
