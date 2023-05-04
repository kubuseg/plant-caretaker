import React, { PropsWithChildren } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

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
    backgroundColor: '#77b690',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppHeader;
