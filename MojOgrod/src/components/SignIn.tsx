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

function SignIn(): JSX.Element {

    const {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    } = useAuth()

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const logIn = (e) =>
    {
        e.preventDefault()
//         const result = AuthService.logIn(username, password)
        // start mock
        const result = {"id": 1,
                        "username": "User1"}
        // end mock
        if (result.id != null){
            setIsLoggedIn(true)
            setAuthUser({
                name: result.username,
                userId: result.id
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
          <TouchableOpacity style={styles.loginButton} onPress = {logIn}>
             <Text>Zaloguj się</Text>
          </TouchableOpacity>
    </View>
  );
}

export default SignIn;