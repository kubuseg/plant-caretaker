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
import {useAuth} from '../auth/AuthContext';

import infoScrollViewStyle from '../styles/infoScrollViewStyle';

const styles = infoScrollViewStyle;

type InformationSVParams = {
    infoList: any[];
    onTouchScreen: string;
    fadeAnim: Animated.Value;
}

function InformationSVTemplate({ infoList, onTouchScreen, fadeAnim }: InfoSVParams): JSX.Element {
    const navigation = useNavigation();
    const {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
        } = useAuth()
    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Animated.View style={{ opacity: fadeAnim }}>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Image style={styles.icon}
                               source={require('../../assets/info-icons/tap-icon.png')}
                        />
                        <Text style={styles.title}>WODA</Text>
                        <View style={styles.alertContainer}>
                              <Image
                                   style={styles.alertIcon}
                                   source={infoList.waterLevelAlarm ?
                                   require('../../assets/info-icons/alert-icon.png')
                                   : require('../../assets/info-icons/okay-icon.png')}
                              />
                        </View>
                    </View>
                    <View style={styles.card}>
                          <Image style={styles.icon}
                                 source={require('../../assets/info-icons/bag-icon.png')}
                          />
                          <Text style={styles.title}>NAWÓZ</Text>
                          <View style={styles.alertContainer}>
                                <Image
                                      style={styles.alertIcon}
                                      source={infoList.fertilizerLevelAlarm ?
                                      require('../../assets/info-icons/alert-icon.png')
                                      : require('../../assets/info-icons/okay-icon.png')}
                                      />
                          </View>
                    </View>
                    <View style={styles.card}>
                          <Image style={styles.icon}
                                 source={require('../../assets/info-icons/chip-icon.png')}
                          />
                          <Text style={styles.title}>POŁĄCZENIE ZE STEROWANIEM</Text>
                          <View style={styles.alertContainer}>
                                <Image
                                     style={styles.alertIcon}
                                     source={1 == 2 ? // TODO
                                      require('../../assets/info-icons/wifi-icon.png')
                                      : require('../../assets/info-icons/alert-icon.png')}
                                />
                          </View>
                    </View>
                    <TouchableOpacity
                         style={styles.card}
                         onPress={() => {
                         navigation.navigate("UserSettings" as never);
                         }}
                     >
                    <View style={styles.cardInner}>
                         <Image style={styles.icon}
                         source={require('../../assets/info-icons/user-icon.png')}
                         />
                         <Text style={styles.title}>{authUser.name}</Text>
                         <View style={styles.alertContainer}>
                               <Image
                               style={styles.alertIcon}
                               source={require('../../assets/info-icons/settings-icon.png')}
                               />
                                              </View>
                         </View>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </ScrollView>
    )
}

export default InformationSVTemplate;
