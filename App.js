import React, { Component } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import PreLoader from './application/components/PreLoader'
import firebaseConfig from './application/utils/Firebase'
import * as firebase from 'firebase'
firebase.initializeApp(firebaseConfig)
import GuestNavigation from './application/navigations/Guest'
import LoggedNavigation from './application/navigations/Logged'
import CrearProfileNavigation from './application/navigations/CrearProfile'
console.disableYellowBox = true;

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      usuario: {
        nombre: '',
        apellido: '',
        activado: false,
        logueado: false
      },
      loaded: false,
      uid: ''
    }
  }

  async componentDidMount() { //Revisar y hacer Async Await

    await firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        this.setState({ uid: firebase.auth().currentUser.uid })
        let usuario = {}
        this.refUsuario = firebase.database().ref(`usuario/${user.uid}`)
        this.refUsuario.once('value')
          .then(snapshot => {
            usuario = snapshot.val()
            if (usuario === null) {
              Alert.alert('falta crearlo')
              this.setState({
                usuario: {
                  nombre: '',
                  apellido: '',
                  activado: false,
                  logueado: true
                }
              })
              usuario = this.state.usuario
              // firebase.database().ref('usuario').push(user.uid)
              firebase.database().ref(`usuario/${user.uid}`).set(usuario)
            }
            else {
              firebase.database().ref(`usuario/${user.uid}/logueado`).set(true)
              this.setState({
                usuario: {
                  nombre: usuario.nombre,
                  apellido: usuario.apellido,
                  activado: usuario.activado,
                  logueado: true
                }
              })
            }
          })
          .catch(err => Alert.alert(err.message))
        this.setState({
          loaded: true
        })
      } else {
        this.setState({
          usuario: {
            nombre: '',
            apellido: '',
            activado: false,
            logueado: false
          },
          uid: '',
          loaded: true
        })
      }

      firebase.database().ref(`usuario/${this.state.uid}/activado`)
        .on('value', snapshot => {
          const activado = snapshot.val()
          // this.setState({ usuario })
          console.log(activado)
          let state = this.state.usuario
          this.setState({
            usuario: Object.assign({}, state, {
              activado: activado
            })
          })
        })

      firebase.database().ref(`usuario/${this.state.uid}/logueado`)
        .on('value', snapshot => {
          const logueado = snapshot.val()
          // this.setState({ usuario })
          console.log(logueado)
          let state = this.state.usuario
          this.setState({
            usuario: Object.assign({}, state, {
              logueado: logueado
            })
          })
        })

    })

  }

  render() {
    const { loaded, usuario } = this.state
    console.log(usuario)

    if (!loaded) {
      return <PreLoader />
    }
    if (!usuario.activado && usuario.logueado) {
      //else if (true) {
      return (<CrearProfileNavigation />)
    }
    if (usuario.activado && usuario.logueado) {
      return (<LoggedNavigation />)
    }
    if (!usuario.logueado) {
      return (<GuestNavigation />)
    }
  }

}