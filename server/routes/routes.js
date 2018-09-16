const MainControl = require('../controllers/MainController')

//recieves object of express app and makes routes

module.exports = (app) => {

    // setting up routes

    app.get('/news',
        MainControl.getNews)

    app.post('/searchNews',
        MainControl.searchedNews)

    app.post('/specific',
        MainControl.getArticle)

    app.post('/polarity',
        MainControl.getSentiment)

    app.post('/tweets',
        MainControl.getTweets)

    app.post('/hash',
        MainControl.getSpecificTweet)


}