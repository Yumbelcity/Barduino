import React, { Component } from 'react'
import { Alert, Text, View } from 'react-native'
import * as firebase from 'firebase'
import BackgroundImage from '../components/BackgroundImage'
import AppButton from '../components/AppButton'
import { Card, Input } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'

export default class CrearProfile extends Component {

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

  async componentDidMount() {
    await this.checkDatos()
  }

  checkDatos = () => {
    const key = firebase.auth().currentUser.uid
    let usuario = {}
    this.refUsuario = firebase.database().ref(`usuario/${key}`)
    this.refUsuario.once('value')
      .then(snapshot => {
        usuario = snapshot.val()
        this.setState({ usuario })
        if (usuario.nombre !== '' && usuario.apellido !== '') {
          const navigateAction = NavigationActions.navigate({
            routeName: 'EsperarActivacion'
          })
          this.props.navigation.dispatch(navigateAction)
        }
      })
      .catch(err => Alert.alert(err.message))
  }

  actualizarNombre = (val) => {
    let state = this.state.usuario
    this.setState({
      usuario: Object.assign({}, state, {
        nombre: val
      })
    })
  }

  actualizarApellido = (val) => {
    let state = this.state.usuario
    this.setState({
      usuario: Object.assign({}, state, {
        apellido: val
      })
    })
  }

  save = () => {
    const key = firebase.auth().currentUser.uid
    let usuario = this.state.usuario
    this.refUsuario = firebase.database().ref(`usuario/${key}`)
    this.refUsuario.update(usuario)
      .then(() => Alert.alert('Perfil actualizado correctamente'))
      .catch(err => Alert.alert(err.message))
    this.checkDatos()
  }

  render() {
    const { usuario } = this.state

    return (
      <BackgroundImage source={require('../../assets/images/login_bg.jpg')}>
        <Card>
          <Input
            placeholder='Nombre'
            shake={true}
            value={usuario.nombre}
            onChangeText={(val) => this.actualizarNombre(val)}
          />
          <Input
            placeholder='Apellido'
            shake={true}
            value={usuario.apellido}
            onChangeText={(val) => this.actualizarApellido(val)}
          />
          <View style={{ marginTop: 30 }} />
          <AppButton
            bgColor='rgba(200, 38, 74, 1)'
            title='Guardar'
            action={this.save}
            iconSize={20}
            iconColor='#fff'
          />
        </Card>
      </BackgroundImage>
    )
  }
}