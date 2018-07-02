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
        <Card
          title='Esperando Activación'
          image={require('../../assets/images/login_bg.jpg')}
          //featuredSubtitle={<ActivityIndicator size='large' />}
          featuredSubtitle='HOLA'
        >
        </Card>
      </BackgroundImage>
    )
  }
}