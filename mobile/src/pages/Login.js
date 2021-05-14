import React, { useState, useEffect, Component } from 'react';
import { View, KeyboardAvoidingView, /* Platform, */ Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import logo from '../assets/logo.png';
import {useTranslation} from "react-i18next";

export default function Login({ navigation }){
  const [email, setEmail] = useState('');
  const { i18n } = useTranslation();
  const {t} = useTranslation('login');
  const [dishes, setDishes] = useState('');

  // useEffect(() => {
  //   AsyncStorage.getItem('user').then(user => {
  //     if (user) {
  //       navigation.navigate('List');
  //     }
  //   })
  // }, []);

  async function handleSubmit() {
    const response = await api.post('/sessions', {
      email
    })
    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('dishes', dishes);
    navigation.navigate('List');
  }

  function english() {
      i18n.changeLanguage("en-US");
      console.log(i18n);
  }

  function portuguese() {
    i18n.changeLanguage("pt-BR");
    console.log(i18n);
  }

  return (
      <KeyboardAvoidingView /* enabled={Platform.OS === 'ios'} */ behavior="padding" style={styles.container}>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={english}>
          <Text style={styles.underline}>ENGLISH</Text>
        </TouchableOpacity>
          <Text> | </Text>
        <TouchableOpacity onPress={portuguese}>
          <Text style={styles.underline}>PORTUGUÊS</Text>
        </TouchableOpacity>
        </View>



        <Image source={logo} />

        <View style={styles.form}>
          <Text style={styles.label}>{t('emailLabel')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('emailPlaceholder')}
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

        

          <Text style={styles.label}>{t('dishesLabel')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('dishesPlaceholder')}
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={dishes}
            onChangeText={setDishes}
          />
          
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>{t('findButton')}</Text>
          </TouchableOpacity>
          
        </View>
      </KeyboardAvoidingView>
    ) 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  underline: {
    textDecorationLine: 'underline'
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },

  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});