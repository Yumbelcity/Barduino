import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { NavigationActions } from 'react-navigation'
import BackgroundImage from '../../components/BackgroundImage'
import Restaurant from '../../components/Restaurant/Restaurant'

export default class DetailRestaurant extends Component {

  constructor(props) {
    super(props)
    const { params } = props.navigation.state
    this.state = {
      trago: params.trago
    }
  }

  editRestaurant = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'EditRestaurant',
      params: { trago: this.state.trago }
    })
    this.props.navigation.dispatch(navigateAction)
  }

  goHome = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'ListRestaurants'
    })
    this.props.navigation.dispatch(navigateAction)
  }

  render() {

    const { trago } = this.state
    return (
      <BackgroundImage source={require('../../../assets/images/login_bg.jpg')}>
        <ScrollView>

          <Restaurant
            goHome={this.goHome}
            editRestaurant={this.editRestaurant}
            trago={trago}
          />

        </ScrollView>
      </BackgroundImage>
    )
  }
}