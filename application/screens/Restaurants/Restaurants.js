import React, { Component } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import BackgroundImage from '../../components/BackgroundImage'
import PreLoader from '../../components/PreLoader'
import SinTragos from '../../components/Restaurant/SinTragos'
import TragoAddButton from '../../components/Restaurant/TragoAddButton'
import { ListItem } from 'react-native-elements'
import * as firebase from 'firebase'
import { NavigationActions } from 'react-navigation'

export default class Restaurants extends Component {
  constructor() {
    super()
    this.state = {
      tragos: [],
      loaded: false,
      restaurant_logo: require('../../../assets/images/avatar.png')
    }

    this.refRestaurants = firebase.database().ref().child('trago')
  }

  componentDidMount() {
    this.refRestaurants.on('value', snapshot => {
      let tragos = []
      snapshot.forEach(row => {
        tragos.push({
          id: row.key,
          nombreTrago: row.val().nombreTrago,
          precio: row.val().precio,
          // capacity: row.val().capacity,
          // description: row.val().description
        })
      })

      this.setState({
        tragos,
        loaded: true
      })
    })
  }

  addTrago = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'AddTrago'
    })
    this.props.navigation.dispatch(navigateAction)
  }

  restaurantDetail = (trago) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'DetalleTrago',
      params: { trago }
    })
    this.props.navigation.dispatch(navigateAction)
  }

  renderRestaurant(trago) {
    return (
      <ListItem
        containerStyle={styles.item}
        titleStyle={styles.title}
        roundAvatar
        title={`${trago.nombreTrago}`}
        leftAvatar={{ source: this.state.restaurant_logo }}
        onPress={() => this.restaurantDetail(trago)}
        rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: styles.listIconStyle }}
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
      <BackgroundImage source={require('../../../assets/images/login_bg.jpg')}>
        <FlatList
          data={tragos}
          renderItem={(data) => this.renderRestaurant(data.item)}
          keyExtractor={(data) => data.id}
        />
        <TragoAddButton addTrago={this.addTrago} />
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