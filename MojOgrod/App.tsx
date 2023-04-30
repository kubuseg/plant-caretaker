import React from 'react';
import type { PropsWithChildren } from 'react';
import { useNavigation } from '@react-navigation/native';
import AppFooter from './src/components/AppFooter'
import AppHeader from './src/components/AppHeader'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

type PlantType = {
  id: number;
  name: string;
  icon: any;
};

const plantTypes: PlantType[] = [
  {
    id: 1,
    name: 'Kaktus1',
    icon: require('./assets/icon.png'),
  },
  {
    id: 2,
    name: 'Kaktus2',
    icon: require('./assets/icon.png'),
  },
  {
    id: 3,
    name: 'Kaktus3',
    icon: require('./assets/icon.png'),
  },
  {
    id: 4,
    name: 'Kaktus4',
    icon: require('./assets/icon.png'),
  },
  {
    id: 5,
    name: 'Kaktus5',
    icon: require('./assets/icon.png'),
  },
];

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
        <View style={styles.container}>
          {plantTypes.map((plantType) => (
            <TouchableOpacity
              key={plantType.id}
              style={styles.card}
              onPress={() => {
                // navigation.navigate('PlantDetails', { plantType });
              }}
            >
              <View style={styles.cardInner}>
                <Image style={styles.icon} source={plantType.icon} />
                <Text style={styles.title}>{plantType.name}</Text>
                <View style={styles.arrowContainer}>
                  <Image
                    style={styles.icon}
                    source={require('./assets/icon.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <AppFooter />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white'
  },
  container: {
    flexDirection: 'column',
    marginVertical: screenHeight * 0.025,
    alignItems: 'center'
  },
  card: {
    marginHorizontal: 10,
    marginBottom: screenHeight * 0.025,
    width: screenWidth * 0.93,
    height: screenHeight * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    elevation: 5,
  },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: screenHeight * 0.1,
    height: screenHeight * 0.1,
  },
  title: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  arrowContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default App;
