import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import logo from '../assets/logo.png'
import RestaurantList from '../components/RestaurantList'

export default function List() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://localhost:3333', {
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
    }).catch(setDishes('Nenhum'))
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <ScrollView>
        {dishes.map(dish => <RestaurantList key={dish} dish={dish} />)}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 45,
  }
});