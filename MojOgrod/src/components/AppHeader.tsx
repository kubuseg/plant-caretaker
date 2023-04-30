import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

type AppHeaderProps = {};

const AppHeader = (props: AppHeaderProps) => {
  const headerHeight = Dimensions.get('screen').height * 0.17;

  return (
    <View style={[styles.appHeader, { height: headerHeight }]}>
      <Text style={styles.headerTitle}>Mój Ogród</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  appHeader: {
    backgroundColor: '#77b690',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    textAlign: 'center',
    fontFamily: 'NewTitleRoman',
    fontSize: 24,
    color: 'white',
  },
});

export default AppHeader;
