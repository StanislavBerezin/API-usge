//importing models and other things that are needed
//when working with routes (responses and requests)
const model = require('../models/Model')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

//jwt tokens, can be a week, or 24 hours, or 3 days
function jwtOneWeek(user) {
    const oneWeek = 60 * 60 * 24 * 7

    return jwt.sign(user, config.auth.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}





module.exports = {
    //typical controller
    //can be async if await inside
    firstController(req, res) {
        res.send({
            message: 'Controller'
        })
    },


    

    //quite usable
    authenticate(req, res, next) {
        var token = req.header('x-auth');

        User.findByToken(token).then((user) => {
            if (!user) {
                return Promise.reject();
            }

            req.user = user;
            req.token = token;

            next();
        }).catch((e) => {
            res.status(401).send()
        })


    }
}