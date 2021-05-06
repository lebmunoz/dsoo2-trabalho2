import React, { useState } from 'react';
import {Alert, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';
import {useTranslation} from "react-i18next";

export default function Book({ navigation }) {
  const [date, setDate] = useState('');
  const id = navigation.getParam('id');

  const { i18n } = useTranslation();
  const {t} = useTranslation('book');

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');

    await api.post(`/restaurants/${id}/bookings`, {
      date
    }, {
      headers: { user_id }
    })

    Alert.alert(t('sendSolicitation'));

    navigation.navigate('List');
  }

  function handleCancel() {
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
      <SafeAreaView style={styles.container}>

        <View style={{flexDirection:'row', justifyContent: 'center'}}>
          <TouchableOpacity onPress={english}>
            <Text style={styles.underline}>ENGLISH</Text>
          </TouchableOpacity>
          <Text> | </Text>
          <TouchableOpacity onPress={portuguese}>
            <Text style={styles.underline}>PORTUGUÊS</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>{t('dateInterest')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('dateReserve')}
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={date}
          onChangeText={setDate}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>{t('request')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
          <Text style={styles.buttonText}>{t('cancel')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },

  underline: {
    textDecorationLine: 'underline'
  },
  
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    marginTop: 30
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

  cancelButton: {
    backgroundColor: '#ccc',
    marginTop: 10,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});