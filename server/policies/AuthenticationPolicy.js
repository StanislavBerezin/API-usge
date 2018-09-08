
const Joi = require('joi')

module.exports = {


    
    //controller with next, which requires next() to be present before going to the next controller function
    policyOne(req, res, next) {


        //can add more validation thing to check
        const schema = {
            username: Joi.string().alphanum().min(3).max(30).required(),
            email: Joi.string.email(),
            password: Joi.string.regex(
                new RegExp('^[a-zA-Z0-9{8,32}') //from a to a, from A to Z, from 0 to 9, at least 8-32 chars
            )
        }


        //comparing the body of request again our schema we've defined above, with a callback function
        //
        Joi.validate(req.body, schema, function (error, value) {

            //in case something happend
            if (error) {


                //this allows us to see what key element in schema failed
                switch (error.details[0].context.key) {
                    case 'email':
                        res.status(400).send({
                            error: 'someting went wrong with email'
                        })
                        break
                    case 'password':
                        res.status(400).send({
                            error: 'something went wrong with password'
                        })
                        break
                    default:
                        res.status(400).send({
                            error: 'dont know what happened'
                        })
                }
            } else {
                // if all good go next
                next();

            }

        })





    }
}