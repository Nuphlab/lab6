var session = require("express-session")
const express = require(`express`)
const router = express.Router()
// const router = require("./tasks")
const passport = require("passport");
const { Store } = require("express-session");
const app = require("..");
//const { authenticate } = require("passport");
const { userInfo } = require("os");
const { error } = require("console");
const { authenticate } = require("passport");
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//app.use(passport.initialize())
//app.use(passport.session())

router.get(`/google`,
    passport.authenticate('google', { scope: [`https://www.googleapis.com/auth/userinfo.email`]})
    //function(req, res) { console.log('/google path'); res.redirect(`/`)}
)


router.get('/google/callback', passport.authenticate('google'), async (req, res) => {
    // This tries to save the session, and if it fails it makes sure the passport session is deleted via req.logout()
    req.session.save(err => {
        if (err) {
          req.logout()
          res.sendStatus(500)
        }
        else res.redirect(process.env.CLIENT_ORIGIN)
      })
    })

router.get(`/logout`, async (req,res) => {
    req.session.destroy()
    req.logout()
    res.redirect(process.env.CLIENT_ORIGIN)
  })

  router.get('/', (req, res, next) => {
    //const { user } = req;
    //res.render('home', { user });
    //res.send(Object)
    console.log('router.get')
});
module.exports = router
