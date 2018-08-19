
//CHOSEN 3 API's

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('cad9e31e69314091a346a5063a63d791');


module.exports = {
    async displayWelcome(req, res){
        try{
            let newsResponse = await newsapi.v2.everything({
                q: 'Trump',
                sources: 'bbc-news,the-verge',
                domains: 'bbc.co.uk,techcrunch.com',
                from: '2018-08-01',
                to: '2018-08-18',
                language: 'en',
                sortBy: 'relevancy',
              })
             

              let news = newsResponse.articles.map(key =>{
                    return key
              })
              console.log(news)

              res.render('index',{
                  news
              })
            //   newsResponse.articles.forEach(key => {
            //       console.log(key.title)
            //      
            //   });

              
             
            
            //   

        }
        catch(err){

        }
    }
}
