import React from 'react';
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

    const {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    } = useAuth()

    const logOut = (e) => {
        e.preventDefault()
        AuthService.logOut()
        setAuthUser(null)
        setIsLoggedIn(false)
        navigation.navigate('Home' as never)
    }

    let headerText = "";
    headerText = <AppTitleText />

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