import React, { Component } from 'react'
import LogoutScreen from '../screens/Logout'
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
  onPress={() => navigation.navigate('CrearProfileScreen')}
/>

const rightIcon = (navigation, icon) => <Icon
  name={icon}
  style={{ marginRight: 20 }}
  size={20}
  color='white'
  onPress={() => navigation.navigate('Logout')} //Hay que agregarlo abajo
/>

export default crearProfileScreenStack = createStackNavigator(
  {
    CrearProfileScreen: {
      screen: CrearProfileScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Nuevo Perfil',
      })
    },
    EsperarActivacion: {
      screen: EsperarActivacionScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Bistro RestoBar',
        headerRight: rightIcon(navigation, 'sign-out'),
        headerLeft: leftIcon(navigation, null)
      })
    },
    Logout: {
      screen: LogoutScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Cerrar Sesión'
      })
    }
  },
  navigationOptions
)