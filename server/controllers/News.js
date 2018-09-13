const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('6fd2b09b18ec4132afdf4c52f3bf2116');
let _ = require('lodash')

var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
    application_id: "883d946f",
    application_key: "a18910bab0bc6b8975c656f03b0c5460"
});

var Twit = require('twit')
var T = new Twit({
    consumer_key: 'C2tUjaWK9qOOU6BFWIMd52v45',
    consumer_secret: 'FIAjgruq3Kx09Iwwh0NiQYPp7wLyzG4wFzfSHiRowLBjy8S4md',
    access_token: '843837609797287938-qcJFHUWUJY74tJ2Hdn6Jm4obRII7IlI',
    access_token_secret: 'eSdfw7DUEa0zMTpBBYmHcVjSrkwr8TGcETRP4hYLO795m'
})



let summarisedText;

module.exports = {


    // Displaying news    
    async getNews(req, res) {

        let news = await newsapi.v2.everything({
            q: "Trump",
            sources: 'bbc-news,the-verge',
            domains: 'bbc.co.uk, techcrunch.com',
            from: '2018-08-13',
            to: '2018-08-13',
            language: 'en',
            sortBy: 'relevancy',
            page: 1
        })

        res.send(news)

    },

    async searchedNews(req, res) {

        try {
            let newsDecision;
            if (req.body.specific) {
                newsDecision = req.body.specific.toString()
            } else {
                newsDecision = req.body.search.toString()
            }

            let news = await newsapi.v2.everything({
                q: newsDecision,
                sources: 'bbc-news,the-verge',
                domains: 'bbc.co.uk, techcrunch.com',
                from: '2018-08-13',
                to: '2018-08-13',
                language: 'en',
                sortBy: 'relevancy',
                page: 1
            })

            res.send(news)






        } catch (e) {
            res.send("Something went wrong")
        }

    },


    async getArticle(req, res) {

        try {


            let newsDecision = req.body.specific.toString()

            newsapi.v2.everything({
                q: newsDecision,
                sources: 'bbc-news,the-verge',
                domains: 'bbc.co.uk, techcrunch.com',
                from: '2018-08-13',
                to: '2018-08-13',
                language: 'en',
                sortBy: 'relevancy',
                page: 1
            }).then((response) => {

                let news = response
                textapi.summarize({
                    'url': response.articles[0].url.toString()
                }, (error, response) => {

                    if (error === null) {

                        let text = response.sentences
                        res.send({
                            news,
                            text
                        })
                    } else {
                        res.send("Something went wrong with summary")
                    }



                })
            })






        } catch (e) {
            res.send("Something went wrong")
        }


    },



    async getSentiment(req, res) {
        let newsDecision = req.body.title.toString()
        newsapi.v2.everything({
            q: newsDecision,
            sources: 'bbc-news,the-verge',
            domains: 'bbc.co.uk, techcrunch.com',
            from: '2018-08-13',
            to: '2018-08-13',
            language: 'en',
            sortBy: 'relevancy',
            page: 1
        }).then((response) => {
            let url = response.articles[0].url
            textapi.sentiment({
                'url': url
            }, function (error, response) {
                if (error === null) {
                    let polarity = response.polarity
                    let subject = response.subjectivity
                    let confidence = response.polarity_confidence
                    res.send({
                        url,
                        polarity,
                        subject,
                        confidence
                    })
                }
            });
        })



    },

    async getTweets(req, res) {


        let newsDecision = req.body.specific.toString()

        newsapi.v2.everything({
            q: newsDecision,
            sources: 'bbc-news,the-verge',
            domains: 'bbc.co.uk, techcrunch.com',
            from: '2018-08-13',
            to: '2018-08-13',
            language: 'en',
            sortBy: 'relevancy',
            page: 1
        }).then((response) => {
            let url = response.articles[0].url

            textapi.hashtags({
                    'url': url
                },
                function (error, response) {
                    if (error === null) {
                        let cut = response.hashtags.splice(0, 2)
                        let search = cut.join()
                        var regexp = /#(\S)/g;

                        search = search.replace(regexp, '$1');
                        console.log(search)
                        T.get('search/tweets', {
                            q: `${search} since:2017-01-11`,
                            count: 10
                        }, function (err, data, response) {
                            console.log(data)
                            res.send(data)
                        })

                    }
                })

        })




    }

}