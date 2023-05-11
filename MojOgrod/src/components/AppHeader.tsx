import React, { PropsWithChildren } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import appColors from '../styles/appColors';

type AppHeaderProps = {
  children: string;
};

const AppHeader = ({ children }: PropsWithChildren<AppHeaderProps>) => {
  const headerHeight = Dimensions.get('screen').height * 0.17;

  return (
    <View style={[styles.appHeader, { height: headerHeight }]}>
      <Text style={styles.headerTitle}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  appHeader: {
    backgroundColor: appColors.turquoise,
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
