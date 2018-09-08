const passport = require('passport-jwt')

//user model is needed!

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('../config/config')

//can also be a website the request coming from, etc
let options = {

    JwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.auth.jwtSecret
}



passport.use( new JwtStrategy(options , function (jwtPayload, done)

{
        try{
            //find user based on id, jwtPayload.id to id in DB
             
            
            if(!user){
                return done(new Error(), false)
            }
            return done(null, user)
        }
        catch(error) {
            return done(new Error(), false)
        }
    })

)


//because we are simply making a passport object which will be used in IsAuth
module.exports = null




