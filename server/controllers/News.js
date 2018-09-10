const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('6fd2b09b18ec4132afdf4c52f3bf2116');


module.exports = {


    // Displaying news    
   async getNews(req, res){

        let news = await newsapi.v2.topHeadlines({
            q: 'trump',
            category: 'politics',
            language: 'en',
            country: 'us'
          })

        res.send(news)
          
    }

}