import React, { PropsWithChildren } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import appColors from '../styles/appColors';
import sizes from '../styles/sizes';

type AppHeaderProps = {
  children: string;
};

const AppHeader = ({ children }: PropsWithChildren<AppHeaderProps>) => {

  return (
    <View style={localStyles.appHeader}>
      <Text style={localStyles.headerTitle}>{children}</Text>
    </View>
  );
};

const localStyles = StyleSheet.create({
  appHeader: {
    backgroundColor: appColors.turquoise,
    alignItems: 'center',
    justifyContent: 'center',
    height: sizes.headerHeight,
  },
  headerTitle: {
    fontFamily: "AmaticSC-Bold",
    textAlign: 'center',
    fontSize: 40,
    color: 'white',
    width: '100%'
  },
});

export default AppHeader;
