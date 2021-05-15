import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import api from '../services/api'
import {useTranslation} from "react-i18next";

function RestaurantList({ dish, navigation }) {
  const [restaurants, setRestaurants] = useState([]);
  const { i18n } = useTranslation();
  const {t} = useTranslation('list');
  const lan = useTranslation().i18n.language;
  
  useEffect(() => {
    async function loadRestaurants() {
      const response = await api.get('/restaurants', {
        params: { dish }
      })

      setRestaurants(response.data);
    }
    loadRestaurants();
  }, []);

  function handleNavigate(id) {
    navigation.navigate('Book', { id });
  }

  function formatarMoeda(m) {
    var moeda = new Intl.NumberFormat(lan, {style: 'currency', currency: t('currency')});
    return moeda.format(m);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('title')}<Text style={styles.bold}>{dish}</Text></Text>

      <FlatList
        style={styles.list}
        data={restaurants}
        keyExtractor={restaurant => restaurant._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image style={styles.image} source={{ uri: item.image_url }} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price ? `${formatarMoeda(item.price)}${t('people')}` : `${t('free')}`}</Text>
            <TouchableOpacity onPress={() => handleNavigate(item.id)} style={styles.button}>
              <Text style={styles.buttonText}>{t('reservation')}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },

  title: {
    fontSize: 20,
    color: '#444',
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  bold: {
    fontWeight: 'bold',
  },

  list: {
    paddingHorizontal: 20,
  },

  listItem: {
    marginRight: 15,
  },

  image: {
    width: 200,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 2,
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },

  price: {
    fontSize: 15,
    color: '#999',
    marginTop: 5
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
  },
});

export default withNavigation(RestaurantList);