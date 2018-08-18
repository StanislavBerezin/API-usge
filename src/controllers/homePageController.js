
//CHOSEN 3 API's

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('cad9e31e69314091a346a5063a63d791');


module.exports = {
    async displayWelcome(req, res){
        try{
            let newsResponse = await newsapi.v2.everything({
                q: 'Russia',
                sources: 'bbc-news,the-verge',
                domains: 'bbc.co.uk,techcrunch.com',
                from: '2018-08-01',
                to: '2018-08-18',
                language: 'en',
                sortBy: 'relevancy',
              })
              res.send(newsResponse)
              res.render('index', { title: 'Express' });

        }
        catch(err){

        }
    }
}
