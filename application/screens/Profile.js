import React, { Component } from 'react'
import { Alert, AsyncStorage, Text, View } from 'react-native'
import * as firebase from 'firebase'
import BackgroundImage from '../components/BackgroundImage'
import AppButton from '../components/AppButton'
import { Card, Input } from 'react-native-elements'

export default class Profile extends Component {

  constructor() {
    super()
    this.state = {
      usuario: {
        _idUsuario: '',
        nombre: '',
        apellido: '',
        activado: false,
        estado: 'offline'
      }
    }
  }

  componentDidMount() {
    const key = firebase.auth().currentUser.uid
    let usuario = {}
    this.refUsuario = firebase.database().ref(`usuario/${key}`)
    this.refUsuario.once('value')
      .then(snapshot => {
        usuario = snapshot.val()
        this.setState({ usuario })
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
          <AppButton
            bgColor='rgba(203, 78, 72, 0.9)'
            title='Guardar'
            action={this.save}
            iconName='save'
            iconSize={20}
            iconColor='#fff'
          />
        </Card>
      </BackgroundImage>
    )
  }
}