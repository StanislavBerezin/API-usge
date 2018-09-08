// Doesnt have to be used untill we start doing authenticaion which is not in a nearest future.

const passport = require('passport')

const GoogleAuthorize = require('../passport/google_passport')


module.exports = {


    //when its executed we know that a user wants to authenticate with google
    //so passport communicated with google
    googleAuth() {
        passport.authenticate('google', {
            scope: ['profile'],
            failureRedirect: '/somewhere'
        })
    },
    //after this is done and the user gets to the URL that is setup in GOOGLE OBJECT
    //we need to use passport.authenticate('google) again to retrieve user's google data
    //and the callback function fires that is GOOGLE object
    googleRetrieve() {
        passport.authenticate('google')
    },
    //that should be in a redirected URL



    jwtAuthCheck(req, res, next) {
        passport.authenticate('jwt', function (error, user) {

            if (error) {
                res.status(403).send({
                    message: 'you dont have an access'
                })

            } else {

                req.user = user
                next();

            }


        })(req, res, next)
    }



}