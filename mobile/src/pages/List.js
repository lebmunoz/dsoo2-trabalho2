import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import {Alert, SafeAreaView, ScrollView, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import logo from '../assets/logo.png'
import RestaurantList from '../components/RestaurantList'

export default function List({navigation}) {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.1.2:3333', {
        query: { user_id }
      })

      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.restaurant.name} em ${booking.date} foi ${booking.approved ? 'APROVADA': 'REJEITADA'}`)
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
  
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <ScrollView>
        {dishes.map(dish => <RestaurantList key={dish} dish={dish} />)}
        <TouchableOpacity onPress={handleNavigate} style={styles.button}>
          <Text style={styles.buttonText}>Voltar</Text>
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