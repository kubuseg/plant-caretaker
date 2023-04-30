import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

type AppFooterProps = {};

const AppFooter = (props: AppFooterProps) => {
  return (
    <View style={styles.appFooter}>
      <TouchableOpacity>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.footerButton}
          resizeMode='contain'
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.footerButton}
          resizeMode='contain'
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.footerButton}
          resizeMode='contain'
        />
      </TouchableOpacity>
    </View>
  );
};

const headerHeight = Dimensions.get('screen').height * 0.17;

const styles = StyleSheet.create({
  appFooter: {
    flexDirection: 'row',
    backgroundColor: '#77b690',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: headerHeight,
  },
  footerButton: {
    width: '100%',
    height: '100%',
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
});

export default AppFooter;
