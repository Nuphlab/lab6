/*

This file is for initializing passport.
Some of this file is provided for you.
Read this file and try to understand what
is happening.

*/

// Require passport dependency
var passport = require('passport')
// Here you will require() anything else you need
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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
const { getUserFromAzure } = require('./util');
//const { userInfo } = require('os');
//console.log(`${process.env.API_ORIGIN}${process.env.GOOGLE_CALLBACK_PATH}`)
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.API_ORIGIN}${process.env.GOOGLE_CALLBACK_PATH}`
},
  async function(accessToken, refreshToken, profile, done) {
    const user = await getUserFromAzure(profile.emails[0].value)
    return done(null, user);
  }
));

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
