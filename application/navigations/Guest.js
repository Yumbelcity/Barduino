import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'
import LandingPage from '../screens/LandingPage'
import Register from '../screens/Register'
import Login from '../screens/Login'

export default createStackNavigator(
  {
    landing_page: {
      screen: LandingPage,
      navigationOptions: () => ({
        title: 'Bistro Restobar'
      })
    },
    register_page: {
      screen: Register,
      navigationOptions: () => ({
        title: 'Registro'
      })
    },
    login_page: {
      screen: Login,
      navigationOptions: () => ({
        title: 'Inicio de Sesión'
      })
    }
  },
  {
    initialRouteName: 'landing_page',
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'rgba(200, 38, 74, 1)'
      },
      headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
      },
      headerBackTitleStyle: {
        color: '#fff'
      }
    }
  }
)