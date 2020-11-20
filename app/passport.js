/*

This file is for initializing passport.
Some of this file is provided for you.
Read this file and try to understand what
is happening.

*/

// Require passport dependency
var passport = require('passport')
// Here you will require() anything else you need


// This defines what will be in the session cookie
passport.serializeUser(function (user, done) {
    done(null, user)
})
// Find the user from the session and use result in callback function
passport.deserializeUser(async (user, done) => {
    try {
      done(null, user)
    } catch (error) {
      console.error(error)
      done(error.message)
    }
  })

// Here you will set up a connection to Google using variables from your .env file

// Initilize Session storage in MongoDB
const initStore = session => {
    const MongoDbStore = require(`connect-mongodb-session`)(session)
    const store = new MongoDbStore({
      uri: process.env.ATLAS_CONNECTION_STRING,
      collection: `Sessions`,
    }, err => {
      if (err) console.error(err)
      else console.log(`Session Store Initialized`)
    })
    store.on(`error`, console.error)
    return store
  }
  
  module.exports = initStore
