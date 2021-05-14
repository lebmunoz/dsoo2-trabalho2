import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import {Alert, SafeAreaView, ScrollView, StyleSheet, Image, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../assets/logo.png'
import RestaurantList from '../components/RestaurantList'
import {useTranslation} from "react-i18next";

export default function List({navigation}) {
  const [dishes, setDishes] = useState([]);
  const { i18n } = useTranslation();
  const {t} = useTranslation('list');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.1.2:3333', {
        query: { user_id }
      })

      socket.on('booking_response', booking => {
        Alert.alert(`${t('yourReservation')}${booking.restaurant.name}${t('in')}${booking.date}${t('was')}${booking.approved ? t('approved') : t('rejected')}`)
      })
    })
  }, []);

  // [ReactJS, [ Node.js]]

  useEffect(() => {
    AsyncStorage.getItem('dishes').then(storagedDishes => {
      const dishesArray = storagedDishes.split(',').map(dish => dish.trim());

      setDishes(dishesArray);
    })/*.catch(setDishes('Nenhum'))*/
  }, []);

  function handleNavigate() {
    navigation.navigate('Login');
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
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={english}>
          <Text style={styles.underline}>ENGLISH</Text>
        </TouchableOpacity>
        <Text> | </Text>
        <TouchableOpacity onPress={portuguese}>
          <Text style={styles.underline}>PORTUGUÊS</Text>
        </TouchableOpacity>
      </View>

      <Image style={styles.logo} source={logo} />

      <ScrollView>
        {dishes.map(dish => <RestaurantList key={dish} dish={dish} />)}
        <TouchableOpacity onPress={handleNavigate} style={styles.button}>
          <Text style={styles.buttonText}>{t('return')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 45,
  },

  underline: {
    textDecorationLine: 'underline'
  },

  button: {
    height: 32,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  }
});