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

function SignIn(): JSX.Element {

    const {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    } = useAuth()

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [user, setUser] = React.useState('');
    const [cos, setCos] = React.useState('');


    const xd = () => {if(cos==0){setCos(1)}else{setCos(0)}}

    useEffect(() => {
        const get_user = async () => {
              result = await AuthService.logIn(username, password)
              setUser(result)
        }
        get_user()
        }, [cos]);

    useEffect(() => {
         logIn()
        }, [user]);

    const logIn = (e) =>
    {
        if (user.id != null){
            console.log('f')
            setIsLoggedIn(true)
            setAuthUser({
                name: user.username,
                userId: user.id
        })
        }
        else{
            setUsername("");
            setPassword("");
        }
    }

  return (
    <View style={styles.container}>
          <TextInput
            style = {styles.inputView}
            placeholder="Login"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style = {styles.inputView}
            placeholder="Hasło"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.loginButton} onPress = {xd}>
             <Text>Zaloguj się</Text>
          </TouchableOpacity>
    </View>
  );
}

export default SignIn;