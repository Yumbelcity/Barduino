import React, { Component } from 'react'
import { Alert, ActivityIndicator, Text, View, Button } from 'react-native'
import * as firebase from 'firebase'
import BackgroundImage from '../components/BackgroundImage'
import AppButton from '../components/AppButton'
import { Card, Input } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import RestaurantsScreen from '../screens/Restaurants/Restaurants'

export default class EsperarActivacion extends Component {

  constructor() {
    super()
    this.state = {
      usuario: {
        nombre: '',
        apellido: '',
        activado: false,
        logueado: true
      }
    }
  }

  componentDidMount() {
    // const key = firebase.auth().currentUser.uid
    // let usuario = {}
    // this.refUsuario = firebase.database().ref(`usuario/${key}`)
    // this.refUsuario.on('value', snapshot => {
    //   usuario = snapshot.val()
    //   this.setState({ usuario })
    //   console.log(usuario)
    // })
    /* .then(snapshot => {
      usuario = snapshot.val()
      this.setState({ usuario })
      if (this.state.usuario.activado) {
        const navigateAction = NavigationActions.navigate({
          routeName: 'ListarRestaurants'
        })
        this.props.navigation.dispatch(navigateAction)
      }
    })
    .catch(err => Alert.alert(err.message)) */
  }

  render() {

    return (
      <BackgroundImage source={require('../../assets/images/login_bg.jpg')}>
        <View style={{ flex: 1, justifyContent: 'center', }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 0, color: 'white', paddingLeft: 20, paddingRight: 20, textAlign: 'center' }}>Bienvenido a</Text>
          <Text style={{ fontSize: 35, fontWeight: 'bold', marginTop: 0, color: 'white', paddingLeft: 20, paddingRight: 20, textAlign: 'center' }}>Bistro Restobar</Text>
          <Text style={{ fontSize: 18, marginTop: 20, color: 'white', paddingLeft: 20, paddingRight: 20, textAlign: 'center' }}>Por favor acércate a la barra y pídele al encargado en caja que active tu cuenta para comenzar a pedir</Text>
          <ActivityIndicator size='large' style={{ marginTop: 30, }} color='white' />
        </View>
      </BackgroundImage>
    )
  }
}