const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const config = require('../config/config')


//import user

///need to go developers google console => make a project, create 
//enable api and services google+, ENABLE
//create credentials, chose the port, from there we can get clientID and clientSecret
//there you also chose where to redirect
let options = {
    clientID: config.auth.google.googleID,
    clientSecret: config.auth.google.googleSecret,
    //need to refer the route
    callbackURL: "http://www.example.com/auth/google/callback"
}


//its done to send a cookie to the browser to allow further
//interaction with our server
//taking user_id to save it in a cookie
passport.serializeUser((user, done) => {
    done(null, user.id)
})

//from serialise goes to deserialise
//when the cookie comes back from a browser we find a user by that id

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})


//access token from google
//refresh to refresh access token
//profile its what we have after initial request
//can do console.log(profile) and we will see id and etc
//can be used to save data in mongoose model
passport.use(
    new GoogleStrategy(options,
        function (accessToken, refreshToken, profile, done) {

            User.findOne({
                googleId: profile.id
            }).then((currentUser) => {
                if (currentUser) {
                    //it jumps to serialise user
                    done(null, currentUser)
                } else {


                    NewUser({
                        username: profile.displayName,
                        googleId: profile.id
                    }).save().then((newUser) => {
                        //also jumps to serialise user
                        done(null, newUser)
                    })
                }
            })

//we can find URL for thumbnail picture

        }))
//npm install cookie-session is needed

//it happens after serialiseUser, encrypting the cookie and giving a lifespan
/*app.use(cookieSession({
    maxAge: of a cookie
    keys: [config.cookie] could be "qwekklsdjwewqwe" just to encrypt the cookie
}))

then

app.use(passport.initialise)
app.use(passport.session)


*/
//req.logout() to quit on any route, for example /logout