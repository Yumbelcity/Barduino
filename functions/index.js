const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

exports.nextOrder = functions.https.onRequest((req, res) => {

  this.refPedidos = admin.database().ref().child('pedido').orderByChild('estado').equalTo('pendiente').limitToFirst(1)
  this.refPedidos.once('value', snapshot => {
    snapshot.forEach(row => {
      admin.database().ref('paraPreparar').remove()
        .then(() => {
          return null
        })
        .catch(err => res.send(err))
      admin.database().ref('paraPreparar').set(row.key)
        .then(() => {
          return res.send(row.key)
        })
        .catch(err => res.send(err))
    })
  })

})