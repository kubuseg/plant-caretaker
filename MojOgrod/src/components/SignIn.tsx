import React, {useEffect, useState} from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AuthService from '../services/AuthService';
import DataManager from '../services/DataManager';
import signInStyle from '../styles/signInStyle';
import LoadingScreen from '../screens/LoadingScreen';

const styles = signInStyle;

function SignIn(): JSX.Element {
  const navigation = useNavigation();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogIn = async () => {
    setIsLoading(true);
    const user = await AuthService.logIn(username, password);
    if (user) {
      await DataManager.updatePlantTypes();
      await DataManager.updateUserPlants();
      await DataManager.updateController(user.mcId);
      navigation.navigate('Home' as never);
    } else {
      setUsername('');
      setPassword('');
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View style={styles.container}>
      <TextInput
        style={styles.inputView}
        placeholder="Login"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.inputView}
        placeholder="Hasło"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogIn}>
        <Text>Zaloguj się</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignIn;
