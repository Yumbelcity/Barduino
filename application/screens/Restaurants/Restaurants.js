import React, { Component } from 'react'
import { Alert, StyleSheet, FlatList } from 'react-native'
import BackgroundImage from '../../components/BackgroundImage'
import PreLoader from '../../components/PreLoader'
import SinTragos from '../../components/Restaurant/SinTragos'
import TragoAddButton from '../../components/Restaurant/TragoAddButton'
import { Card, ListItem } from 'react-native-elements'
import * as firebase from 'firebase'
import { NavigationActions } from 'react-navigation'
import Trago from '../../components/Restaurant/Trago'

export default class Restaurants extends Component {
  constructor() {
    super()
    this.state = {
      tragos: [],
      loaded: false,
      pedido: {}
    }

    this.refTragos = firebase.database().ref().child('trago')
  }

  componentDidMount() {
    this.refTragos.on('value', snapshot => {
      let tragos = []
      snapshot.forEach(row => {
        tragos.push({
          _idTrago: row.key,
          nombreTrago: row.val().nombreTrago,
          precio: row.val().precio,
          imagePath: row.val().imagePath,
          marca: row.val().marca,
          grado: row.val().grado,
          ml: row.val().ml
        })
      })

      this.setState({
        tragos,
        loaded: true
      })
    })
  }

  personalizarTrago = (trago) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'PersonalizarTrago',
      params: { trago }
    })
    this.props.navigation.dispatch(navigateAction)
  }

  pedirCon = async (bebida, precio, _idTrago, _idUsuario) => {
    await this.setState({
      pedido: {
        _idTrago: _idTrago,
        _idUsuario: _idUsuario,
        ml: 200 * 60 / 100, //Falta multiplicar por porcentaje para calcular ml
        bebida: bebida,
        estado: 'pendiente',
        total: precio
      }
    })

    let data = {}
    const key = firebase.database().ref().child('pedido').push().key
    data[key] = this.state.pedido
    firebase.database().ref().child('pedido').update(data)
      .then(() => {
        Alert.alert('Pedido Realizado!')
      })
      .catch(err => {
        Alert.alert(err.message)
      })
  }

  renderTragos(trago) {
    return (
      <Trago
        pedirBlanca={() => this.pedirCon('Sprite', trago.precio, trago._idTrago, firebase.auth().currentUser.uid)}
        pedirNegra={() => this.pedirCon('Coca-Cola', trago.precio, trago._idTrago, firebase.auth().currentUser.uid)}
        personalizarTrago={() => this.personalizarTrago(trago)}
        trago={trago}
      />
    )
  }

  render() {
    const { loaded, tragos } = this.state

    if (!loaded) {
      return <PreLoader />
    }

    if (!tragos.length) {
      return (
        <BackgroundImage source={require('../../../assets/images/login_bg.jpg')}>
          <SinTragos text='No hay Tragos Disponibles' />
          <TragoAddButton addTrago={this.addTrago} />
        </BackgroundImage>
      )
    }
    return (
      <BackgroundImage source={require('../../../assets/images/login_bg.jpg')} >
        <FlatList
          data={tragos}
          renderItem={(data) => this.renderTragos(data.item)}
          keyExtractor={(data) => data._idTrago}
        />
      </BackgroundImage>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#fff'
  },
  listIconStyle: {
    marginRight: 10,
    fontSize: 15,
    color: 'rgba(255, 38, 74, 0.6)'
  },
  item: {
    padding: 15,
    marginBottom: 2,
    backgroundColor: 'rgba(206, 206, 206, 0.6)',
  }
})