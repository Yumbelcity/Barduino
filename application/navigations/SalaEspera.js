import React, { Component } from 'react'
import RestaurantsScreen from '../screens/Restaurants/Restaurants'
import AddRestaurantScreen from '../screens/Restaurants/AddRestaurant'
import LogoutScreen from '../screens/Logout'
import PersonalizarTragoScreen from '../screens/Restaurants/DetailRestaurant'
import EditRestaurantScreen from '../screens/Restaurants/EditRestaurant'
import CrearProfileScreen from '../screens/CrearProfile'
import EsperarActivacionScreen from '../screens/EsperarActivacion'
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

const navigationOptions = {
  navigationOptions: {
    headerStyle: {
      backgroundColor: 'rgba(200, 38, 74, 1)',
    },
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center',
      color: '#fff',
    }
  }
}

const leftIcon = (navigation, icon) => <Icon
  name={icon}
  style={{ marginLeft: 20 }}
  size={20}
  color='white'
  onPress={() => navigation.openDrawer()}
/>

const rightIcon = (navigation, icon) => <Icon
  name={icon}
  style={{ marginRight: 20 }}
  size={30}
  color='white'
  onPress={() => navigation.navigate('ListRestaurants')}
/>

export default esperarActivacionScreenStack = createStackNavigator(
  {
    EsperarActivacion: {
      screen: EsperarActivacionScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Bistro RestoBar'
      })
    },
  },
  navigationOptions
)