import React from 'react';
import { useNavigation } from '@react-navigation/native';
import FooterTextButton from './FooterTextButton';

function BackButton(): JSX.Element {
    const navigation = useNavigation();
    const onPress = () => navigation.goBack();

    return <FooterTextButton text='POWRÓT' onPress={onPress} />;
}

export default BackButton;
