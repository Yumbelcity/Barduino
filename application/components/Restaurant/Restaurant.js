import React, { Component } from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-elements'
import RestaurantRating from './RestaurantRating'
import AppButton from '../AppButton'

export default class Restaurant extends Component {

  render() {
    const { editRestaurant, goHome, restaurant } = this.props
    return (
      <Card
        title={restaurant.name}
        image={require('../../../assets/images/login_bg.jpg')}
      >

        <RestaurantRating restaurantId={restaurant.id} />
        <Text style={{ marginTop: 15, marginBottom: 10 }} >
          {restaurant.description}
        </Text>
        <AppButton
          bgColor='rgba(255, 38, 74, 0.8)'
          title='Editar Restaurante'
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