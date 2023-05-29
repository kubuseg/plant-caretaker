import React, { useEffect, useRef, useState} from 'react';
import {View, Button, TextInput, TouchableOpacity, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import BackButton from '../components/BackButton';
import AppTitleText from '../components/AppTitleText';
import { useNavigation } from '@react-navigation/native';
import JsonFileManager from '../services/JsonFileManager';
import PlantsDBApi from '../services/PlantsDBApi';
import {useAuth} from '../auth/AuthContext';
import AuthService from '../services/AuthService';
import FooterTextButton from '../components/FooterTextButton';

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

    if (authUser){
       user_name = authUser.name
       userId = authUser.userId
       mcId = authUser.mcId
       }else{
       user_name = "";
       mcId = "";
       userId = "";
       }


    const logOut = React.useCallback(() => {
        const get_logged_out = async () => {
              await AuthService.logOut()
              setIsLoggedIn(false)
              setAuthUser(null)
              navigation.navigate('logg' as never)
        }
        get_logged_out()
    }, [cos]);

    async function onPressSave() {
        try{
        await PlantsDBApi.updateUserMicrocontroller(userId, microcontroller)
        } catch(error) {
         console.log("Error updating microcontroller");
        }
    }


    let headerText = "";
    headerText = "USTAWIENIA KONTA";

    const footerContents = (<>
                             <BackButton/>
                             <FooterTextButton text="ZAPISZ" onPress={onPressSave} />
                             </>);

    const [microcontroller, setMicrocontroller] = useState(mcId);

  return (
    <>
    <AppHeader>
       {headerText}
    </AppHeader>
    <View style={styles.container}>
          <Text style={{width: "80%", fontSize: 20, marginTop: 10}}>
          Login: {user_name}
          </Text>
          <Text style={{width: "80%", fontSize: 20, marginTop: 10}}>
          Mikrokontroler: {mcId}
          </Text>
{/*           <Picker */}
{/*               selectedValue={microcontroller} */}
{/*               onValueChange={(itemValue) => setMicrocontroller(itemValue)} */}
{/*           > */}
{/*               <Picker.Item label="Kontroler 1" value="1" /> */}
{/*               <Picker.Item label="Kontroler 2" value="2" />} */}
{/*           </Picker> */}
          <TouchableOpacity style={styles.loginButton} onPress = {logOut}>
             <Text>Wyloguj się</Text>
          </TouchableOpacity>
    </View>
    <AppFooter children={footerContents} />
    </>
  );
}

export default UserSettingsScreen;