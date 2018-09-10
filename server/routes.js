const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationPolicy = require('./policies/AuthenticationPolicy')
const GetController = require('./controllers/GetController')
const IsAuth = require('./policies/IsAuth')
const NewsControl = require('./controllers/News')
const TextApi = require('./controllers/TextApi')

//recieves object of express app and makes routes

module.exports = (app) => {
    
    app.get('/news', 
        NewsControl.getNews)
    
    app.get('/analyse',
        TextApi.getSummary)


}