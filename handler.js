'use strict'

const alain = require('alain')
const Twitter = require('twitter')

const t = new Twitter(require('./config'))

module.exports.tweet = (event, context, callback) => {
  const name = alain.sync({ exactly: 1 })
  const date = new Date().toISOString()
  let message
  t.post('statuses/update', { status: name }, function (err, tweet, response) {
    if (err) {
      message = `${date} ERROR ${name}`
      console.log(message, err)
      return callback(err, { message, event })
    }
    if (tweet) {
      message = `${date} success! ${name}`
      console.log(message)
      return callback(null, { message, event })
    }
    message = `${date} ¯\\_(ツ)_/¯ ${name}`
    console.log(message, response)
    callback(null, { message, event })
  })
}
