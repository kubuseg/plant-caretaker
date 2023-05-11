import React, { PropsWithChildren } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import appColors from '../styles/appColors';
import sizes from '../styles/sizes';

const AppFooter = ({ children }: PropsWithChildren) => {
  return (
    <View style={styles.appFooter}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  appFooter: {
    flexDirection: 'row',
    backgroundColor: appColors.turquoise,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: sizes.footerHeight,
  },
});

export default AppFooter;
