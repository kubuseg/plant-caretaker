import 'react-native-get-random-values';
import React from 'react';
import AppHeader from '../components/AppHeader';
import AppTitleText from '../components/AppTitleText';
import {SafeAreaView} from 'react-native';
import {useAuth} from '../auth/AuthContext';
import SignIn from '../components/SignIn';
import {useNavigation} from '@react-navigation/native';

export const homeSVTypes = {
  userPlants: 1,
  plantTypes: 2,
};

function LoggScreen({route}): JSX.Element {
  const [cos, setCos] = React.useState('');
  const navigation = useNavigation();

  const {authUser, setAuthUser, isLoggedIn, setIsLoggedIn} = useAuth();

  return (
    <SafeAreaView style={{flex: 1}}>
      <AppHeader>
        <AppTitleText />
      </AppHeader>
      <SignIn />
    </SafeAreaView>
  );
}

export default LoggScreen;
