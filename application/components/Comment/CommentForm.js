import React, { Component } from 'react'
import { Alert, View } from 'react-native'
import AppButton from '../AppButton'
import { Options, Comment } from '../../forms/Comment'
import t from 'tcomb-form-native'
const Form = t.form.Form
import { Card } from 'react-native-elements'
import * as firebase from 'firebase'

export default class CommentForm extends Component {

  constructor() {
    super()
    this.state = {
      comment: {
        comment: '',
        rating: 1
      }
    }
  }

  addComment = () => {
    const validate = this.refs.form.getValue()
    if (validate) {
      let data = {}
      let comment = Object.assign({}, validate)
      let ref = firebase.database().ref().child('comments')
      const key = ref.push().key

      data[`${this.props.restaurantId}/${key}`] = comment

      ref.update(data)
        .then(() => {
          this.setState((prevState, props) => {
            return ({
              comment: {
                comment: '',
                rating: 1
              }
            })
          })
          Alert.alert('Comentario publicado!')
        })
        .catch(err => {
          Alert.alert(err.message)
        })
    }
  }

  onChange = (comment) => {
    this.setState({ comment })
  }

  render() {
    const { comment } = this.state
    return (
      <Card title='Dános tu opinión'>

        <View>
          <Form
            ref='form'
            type={Comment}
            options={Options}
            value={comment}
            onChange={(c) => this.onChange(c)}
          />
        </View>
        <AppButton
          bgColor='rgba(255, 38, 74, 0.9)'
          title='Publicar opinión'
          action={this.addComment}
          iconName='comments'
          iconSize={20}
          iconColor='#fff'
        />

      </Card>
    )
  }
}