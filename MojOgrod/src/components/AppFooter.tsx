import React, { PropsWithChildren } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const AppFooter = ({ children }: PropsWithChildren) => {
  return (
    <View style={styles.appFooter}>
      {children}
    </View>
  );
};

const screenHeight = Dimensions.get('screen').height;
const footerScrRatio = 0.17;

const styles = StyleSheet.create({
  appFooter: {
    flexDirection: 'row',
    backgroundColor: '#77b690',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: screenHeight * footerScrRatio,
  },
});

export default AppFooter;
