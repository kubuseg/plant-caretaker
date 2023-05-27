import React from 'react';
import {
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Image,
    Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import homeScrollViewStyles from '../styles/homeScrollViewStyle';

const styles = homeScrollViewStyles;

type InformationSVParams = {
    infoList: any[];
    onTouchScreen: string;
    fadeAnim: Animated.Value;
}

function InformationSVTemplate({ infoList, onTouchScreen, fadeAnim }: InfoSVParams): JSX.Element {
    const navigation = useNavigation();
    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Animated.View style={{ opacity: fadeAnim }}>
                <View style={styles.container}>
                    <View style={styles.cardInner}>
                        <Image style={styles.icon}
                               source={require('../../assets/info-icons/tap-icon.png')}
                        />
                        <Text style={styles.title}>WODA</Text>
                        <View style={styles.arrowContainer}>
                              <Image
                                   style={styles.arrowIcon}
                                   source={infoList.waterLevelAlarm ?
                                   require('../../assets/info-icons/alert-icon.png')
                                   : require('../../assets/info-icons/okay-icon.png')}
                              />
                        </View>
                    </View>
                          <View style={styles.cardInner}>
                          <Image style={styles.icon}
                                 source={require('../../assets/info-icons/bag-icon.png')}
                          />
                          <Text style={styles.title}>NAWÓZ</Text>
                          <View style={styles.arrowContainer}>
                                <Image
                                      style={styles.arrowIcon}
                                      source={infoList.fertilizerLevelAlarm ?
                                      require('../../assets/info-icons/alert-icon.png')
                                      : require('../../assets/info-icons/okay-icon.png')}
                                      />
                          </View>
                    </View>
                </View>
            </Animated.View>
        </ScrollView>
    )
}

export default InformationSVTemplate;
