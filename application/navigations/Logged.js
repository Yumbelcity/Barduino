import React, { Component } from 'react'
import RestaurantsScreen from '../screens/Restaurants/Restaurants'
import AddRestaurantScreen from '../screens/Restaurants/AddRestaurant'
import LogoutScreen from '../screens/Logout'
import PersonalizarTragoScreen from '../screens/Restaurants/DetailRestaurant'
import EditRestaurantScreen from '../screens/Restaurants/EditRestaurant'
import ProfileScreen from '../screens/Profile'
import PedidosScreen from '../screens/Restaurants/Pedidos'
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

const restaurantsScreenStack = createStackNavigator(
  {
    ListRestaurants: {
      screen: RestaurantsScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Bistro RestoBar',
        headerLeft: leftIcon(navigation, 'bars')
      })
    },
    PersonalizarTrago: {
      screen: PersonalizarTragoScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Trago a tu medida',
        headerRight: rightIcon(navigation, 'home'),
        headerLeft: leftIcon(navigation, 'bars')
      })
    }
  },
  navigationOptions
)

const profileScreenStack = createStackNavigator(
  {
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Perfil',
        headerLeft: leftIcon(navigation, 'bars'),
        headerRight: rightIcon(navigation, 'home'),
      })
    }
  },
  navigationOptions
)

const misPedidosScreenStack = createStackNavigator(
  {
    PedidosScreen: {
      screen: PedidosScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Mis pedidos',
        headerLeft: leftIcon(navigation, 'bars'),
        headerRight: rightIcon(navigation, 'home'),
      })
    }
  },
  navigationOptions
)

export default createDrawerNavigator(
  {
    RestaurantsScreen: {
      screen: restaurantsScreenStack,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (<Icon name='home' size={24} style={{ color: tintColor }} />)
      })
    },
    ProfileScreen: {
      screen: profileScreenStack,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: 'Perfil',
        drawerIcon: ({ tintColor }) => (<Icon name='user' size={24} style={{ color: tintColor }} />)
      })
    },
    MisPedidosScreen: {
      screen: misPedidosScreenStack,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: 'Mis pedidos',
        drawerIcon: ({ tintColor }) => (<Icon name='list-ul' size={24} style={{ color: tintColor }} />)
      })
    },
    LogoutScreen: {
      screen: LogoutScreen,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: 'Cerrar Sesión',
        drawerIcon: ({ tintColor }) => (<Icon name='sign-out' size={24} style={{ color: tintColor }} />)
      })
    }
  },
  {
    drawerBackgroundColor: 'rgba(128, 35, 60, 0.7)',
    contentOptions: {
      activeTintColor: 'white',
      activeBackgroubdColor: 'transparent',
      inactiveTintColor: 'white',
      itemsContainerStyle: {
        marginVertical: 0,
      }
    }
  }
)