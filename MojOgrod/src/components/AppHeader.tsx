import React, { PropsWithChildren } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import appColors from '../styles/appColors';

const AppHeader = ({ children }: PropsWithChildren) => {
  const headerHeight = Dimensions.get('screen').height * 0.17;

  return (
    <View style={[styles.appHeader, { height: headerHeight }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  appHeader: {
    backgroundColor: appColors.turquoise,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppHeader;
