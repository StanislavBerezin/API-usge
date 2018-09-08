const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationPolicy = require('./policies/AuthenticationPolicy')
const GetController = require('./controllers/GetController')
const IsAuth = require('./policies/IsAuth')


//recieves object of express app and makes routes

module.exports = (app) => {
    app.post('/post',
        

        // THE FIRST function in this route is used for validation as you can see it comes from
        // Authenticaion policy by using JOI.
        AuthenticationPolicy.policyOne,

        // Once the above policy has passed with (next()), we come to this
        AuthenticationController.firstController
    )

    //can do other methods in the same way
    app.get('/get',
        IsAuth.jwtAuthCheck,
        IsAuth.googleAuth,
        GetController.getController
    )
}