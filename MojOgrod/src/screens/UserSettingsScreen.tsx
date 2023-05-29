import React, { useEffect, useRef } from 'react';
import {View, Button, TextInput, TouchableOpacity, Text} from 'react-native';
import AppHeader from '../components/AppHeader'
import AppTitleText from '../components/AppTitleText';
import { useNavigation } from '@react-navigation/native';
import JsonFileManager from '../services/JsonFileManager';
import PlantsDBApi from '../services/PlantsDBApi';
import {useAuth} from '../auth/AuthContext';
import AuthService from '../services/AuthService';

import signInStyle from '../styles/signInStyle';

const styles = signInStyle;

function UserSettingsScreen(): JSX.Element {

    const navigation = useNavigation();

    const [cos, setCos] = React.useState('');
    const [read, setRead] = React.useState('');

    const xd = React.useCallback(() => {if(cos==0){setCos(1)}else{setCos(0)};},[])
    const xdd = () => {if(read==0){setRead(1)}else{setRead(0)}}

    const {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    } = useAuth()


    const logOut = React.useCallback(() => {
        const get_logged_out = async () => {
              await AuthService.logOut()
              setIsLoggedIn(false)
              setAuthUser(null)
              navigation.navigate('logg' as never)
        }
        get_logged_out()
    }, [cos]);


    let headerText = "";
    headerText = "USTAWIENIA KONTA"

  return (
    <>
    <AppHeader>
       {headerText}
    </AppHeader>
    <View style={styles.container}>
          <TouchableOpacity style={styles.loginButton} onPress = {logOut}>
             <Text>Wyloguj się</Text>
          </TouchableOpacity>

    </View>
    </>
  );
}

export default UserSettingsScreen;