import React, { Component } from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-elements'
import AppButton from '../AppButton'

export default class Restaurant extends Component {

  render() {
    const { editRestaurant, goHome, trago } = this.props
    return (
      <Card
        title={trago.nombreTrago}
        image={require('../../../assets/images/login_bg.jpg')}
      >
        <Text style={{ marginTop: 15, marginBottom: 50, textAlign: 'center', fontSize: 20 }} >
          {`$ ${trago.precio}`}
        </Text>
        <AppButton
          bgColor='rgba(255, 38, 74, 0.8)'
          title='Editar Trago'
          action={editRestaurant}
          iconName='pencil'
          iconSize={20}
          iconColor='#fff'
        />
        <AppButton
          bgColor='rgba(255, 38, 74, 0.8)'
          title='Personalizar Trago'
          action={editRestaurant}
          iconName='pencil'
          iconSize={20}
          iconColor='#fff'
        />
        <AppButton
          bgColor='rgba(8, 255, 8, 0.8)'
          title='Pedir Trago'
          action={editRestaurant}
          iconName='pencil'
          iconSize={20}
          iconColor='#fff'
        />
        <AppButton
          bgColor='rgba(28, 25, 21, 0.7)'
          title='Volver'
          action={goHome}
          iconName='arrow-left'
          iconSize={20}
          iconColor='#fff'
        />

      </Card>
    )
  }
}