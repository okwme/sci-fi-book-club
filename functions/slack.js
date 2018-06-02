require('dotenv').config()
const GoogleRecaptcha = require('google-recaptcha')
import axios from 'axios'
const googleRecaptcha = new GoogleRecaptcha({
  secret: process.env.google
})

const slackUrl = 'https://slack.com/api/users.admin.invite'
const token = process.env.slack

exports.handler = function(event, context, callback) {
  let headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers':
      'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  }
  if (event.httpMethod === 'POST') {
    if (event.body) {
      let body = JSON.parse(event.body)
      let email = body.email
      let recaptchaResponse = body.recaptchaToken
      googleRecaptcha.verify({ response: recaptchaResponse }, error => {
        if (error) {
          console.log(error)
          callback(null, {
            statusCode: 400,
            headers,
            body: JSON.stringify(error)
          })
        } else {
          // add slack email
          axios
            .get(slackUrl + '?email=' + email + '&token=' + token, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            })
            .then(res => {
              if (res.data.ok) {
                callback(null, {
                  statusCode: 200,
                  headers,
                  body: JSON.stringify(res.data)
                })
              } else {
                callback(null, {
                  statusCode: 400,
                  headers,
                  body: JSON.stringify(res.data)
                })
              }
            })
            .catch(error => {
              console.log(error)
              callback(null, {
                statusCode: 400,
                headers,
                body: JSON.stringify(error)
              })
            })
        }
      })
    } else {
      callback(null, {
        statusCode: 404,
        headers,
        body: '¯\\_(ツ)_/¯'
      })
    }
  } else {
    callback(null, {
      statusCode: 200,
      headers,
      body: ':)'
    })
  }
}
