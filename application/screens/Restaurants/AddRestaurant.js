import React, { Component } from 'react'
import BackgroundImage from '../../components/BackgroundImage'
import AppButton from '../../components/AppButton'
import { Alert, View, StyleSheet } from 'react-native'
import * as firebase from 'firebase'
import { Options, Restaurant } from '../../forms/Restaurant'
import t from 'tcomb-form-native'
import { Card } from 'react-native-elements'
const Form = t.form.Form

export default class AddRestaurant extends Component {

  constructor() {
    super()
    this.state = {
      restaurant: {
        name: '',
        address: '',
        capacity: 0,
        description: ''
      }
    }
  }

  save = () => {
    const validate = this.refs.form.getValue()
    if (validate) {
      let data = {}
      const key = firebase.database().ref().child('restaurants').push().key
      data[`restaurants/${key}`] = this.state.restaurant
      firebase.database().ref().update(data)
        .then(() => {
          Alert.alert('Restaurante Ingresado con Éxito')
          this.props.navigation.navigate('ListRestaurants')
        })
        .catch(err => {
          Alert.alert(err.message)
        })
    }
  }

  onChange = (restaurant) => {
    this.setState({ restaurant })
  }

  render() {
    const { restaurant } = this.state
    return (
      <BackgroundImage source={require('../../../assets/images/login_bg.jpg')}>
        <View style={styles.container}>
          <Card title='Formulario de Restaurantes'>
            <View>
              <Form
                ref='form'
                type={Restaurant}
                options={Options}
                value={restaurant}
                onChange={(r) => this.onChange(r)}
              />
            </View>
            <AppButton
              bgColor='rgba(255, 38, 74, 0.9)'
              title='Dar de alta'
              action={this.save}
              iconName='plus'
              iconSize={20}
              iconColor='#fff'
            />
          </Card>
        </View>
      </BackgroundImage>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(231, 228, 224, 0.8)',
    padding: 10
  }
})