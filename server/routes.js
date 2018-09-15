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

    app.post('/searchNews',
        NewsControl.searchedNews)

    app.post('/specific',
        NewsControl.getArticle)

    app.post('/polarity',
        NewsControl.getSentiment)

    app.post('/tweets',
        NewsControl.getTweets)

    app.get('/analyse',
        TextApi.getSummary)

    app.post('/hash',
        NewsControl.getSpecificTweet)


}