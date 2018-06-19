import React, { Component } from 'react'
import BackgroundImage from '../../components/BackgroundImage'
import AppButton from '../../components/AppButton'
import { Alert, View, StyleSheet } from 'react-native'
import * as firebase from 'firebase'
import { Options, Trago } from '../../forms/Restaurant'
import t from 'tcomb-form-native'
import { Card } from 'react-native-elements'
const Form = t.form.Form

export default class AddRestaurant extends Component {

  constructor() {
    super()
    this.state = {
      trago: {
        nombreTrago: '',
        precio: '',
        // capacity: 0,
        // description: ''
      }
    }
  }

  save = () => {
    const validate = this.refs.form.getValue()
    if (validate) {
      let data = {}
      const key = firebase.database().ref().child('trago').push().key
      data[`trago/${key}`] = this.state.trago
      firebase.database().ref().update(data)
        .then(() => {
          Alert.alert('Trago ingresado con éxito')
          this.props.navigation.navigate('ListRestaurants')
        })
        .catch(err => {
          Alert.alert(err.message)
        })
    }
  }

  onChange = (trago) => {
    this.setState({ trago })
  }

  render() {
    const { trago } = this.state
    return (
      <BackgroundImage source={require('../../../assets/images/login_bg.jpg')}>
        <View style={styles.container}>
          <Card title='Formulario para agregar Tragos'>
            <View>
              <Form
                ref='form'
                type={Trago}
                options={Options}
                value={trago}
                onChange={(r) => this.onChange(r)}
              />
            </View>
            <AppButton
              bgColor='rgba(255, 38, 74, 0.9)'
              title='Añadir Trago'
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