import React, { Component } from 'react'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class AppButton extends Component {
  render() {
    const { action, iconName, iconColor, iconSize, title, bgColor } = this.props
    return (
      <Button
        onPress={action}
        buttonStyle={{
          backgroundColor: bgColor,
          height: 45,
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 5,
          marginBottom: 5,
        }}
        title={title}
        icon={
          <Icon
            name={iconName}
            size={iconSize}
            color={iconColor}
          />
        }
        text={title}
        iconRight
      >
      </Button>
    )
  }
}