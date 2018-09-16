const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("6fd2b09b18ec4132afdf4c52f3bf2116");
let _ = require("lodash");

var AYLIENTextAPI = require("aylien_textapi");
var textapi = new AYLIENTextAPI({
    application_id: "883d946f",
    application_key: "a18910bab0bc6b8975c656f03b0c5460"
});

var Twit = require("twit");
var T = new Twit({
    consumer_key: "C2tUjaWK9qOOU6BFWIMd52v45",
    consumer_secret: "FIAjgruq3Kx09Iwwh0NiQYPp7wLyzG4wFzfSHiRowLBjy8S4md",
    access_token: "843837609797287938-qcJFHUWUJY74tJ2Hdn6Jm4obRII7IlI",
    access_token_secret: "eSdfw7DUEa0zMTpBBYmHcVjSrkwr8TGcETRP4hYLO795m"
});

let summarisedText;

function returningDate(){
    var date = new Date();
    var converted = JSON.stringify(date);
    var sliced = converted.slice(0, 11);
    return sliced;

}


module.exports = {
    // Displaying the basic news on the first page
    async getNews(req, res) {
        try {

            let sliced = returningDate()
            // does the news search by default
            let news = await newsapi.v2.everything({
                q: "Australia",
                sources: "bbc-news,the-verge",
                domains: "bbc.co.uk, techcrunch.com",
                from: sliced,
                to: sliced,
                language: "en",
                sortBy: "relevancy",
                page: 1
            });
            news.articles.map(each=>{
                each.title = each.title.replace('%', ' percent')  
            })
            res.send(news);
        } catch (e) {
            res.status(404).send("An error occured while getting your news");
        }
    },
// when a user performs a serach on the website
    async searchedNews(req, res) {
        try {
            let newsDecision;
            if (req.body.specific) {
                // if there is a specific search then assign to news decision used for searching
                newsDecision = req.body.specific.toString();
            } else {
                
                newsDecision = req.body.search.toString();
            }
            let sliced = returningDate()
            // perform the search itself
            let news = await newsapi.v2.everything({
                q: newsDecision,
                sources: "bbc-news,the-verge",
                domains: "bbc.co.uk, techcrunch.com",
                from: sliced,
                to: sliced,
                language: "en",
                sortBy: "relevancy",
                page: 1
            });
// send everything and if there is something wrong send an error
            
            // fix due to the react router not liking % inside of it
            news.articles.map(each=>{
                each.title = each.title.replace('%', ' percent')  
            })
            res.send(news);
        } catch (e) {
            res.status(404).send("Something went wrong");
        }
    },
// this route is responsible for getting a specific article and summarising it 
    async getArticle(req, res) {
        try {
            let newsDecision = req.body.specific.toString();
            let sliced = returningDate();
            // we search for desired article
            newsapi.v2
                .everything({
                    q: newsDecision,
                    sources: "bbc-news,the-verge",
                    domains: "bbc.co.uk, techcrunch.com",
                    from: sliced,
                    to: sliced,
                    language: "en",
                    sortBy: "relevancy",
                    page: 1
                })
                // after we recieve it, we call text.APi to analyse the topic
                .then(response => {
                    let news = response;
                    textapi.summarize({
                            url: response.articles[0].url.toString()
                        },
                        (error, response) => {
                            if (error === null) {
                                // after we've analysed everything we send it to the client
                                let text = response.sentences;
                                res.send({
                                    news,
                                    text
                                });
                            } else {
                                res.send("Something went wrong with summary");
                            }
                        }
                    );
                });
        } catch (e) {
            res.send("Something went wrong");
        }
    },
// getting sentiments on chosen news topic
    async getSentiment(req, res) {
        try{
        let newsDecision = req.body.title.toString();
        let sliced = returningDate()
        // getting the news
        newsapi.v2
            .everything({
                q: newsDecision,
                sources: "bbc-news,the-verge",
                domains: "bbc.co.uk, techcrunch.com",
                from: sliced,
                to: sliced,
                language: "en",
                sortBy: "relevancy",
                page: 1
            })
            // after reciee a response call another API to assess the news
            .then(response => {
                let url = response.articles[0].url;
                textapi.sentiment({
                        url: url
                    },
                    function (error, response) {
                        if (error === null) {
                            let polarity = response.polarity;
                            let subject = response.subjectivity;
                            let confidence = response.polarity_confidence;
                            // eventually send everything
                            res.send({
                                url,
                                polarity,
                                subject,
                                confidence
                            });
                        }
                    }
                );

                // in case something went wrong
            }).catch(e => {
                res.status(404).send("Something happened while getting sentiment")
            });
        }catch(e){
            res.status(404).send("Something large happened while getting your sentiment")
        }
    },

    // getting all tweets based on the first hashtag in the array
    async getTweets(req, res) {
        try{
        let newsDecision = req.body.specific.toString();
        let sliced = returningDate()

        // searches for the news first
        newsapi.v2
            .everything({
                q: newsDecision,
                sources: "bbc-news,the-verge",
                domains: "bbc.co.uk, techcrunch.com",
                from: sliced,
                to: sliced,
                language: "en",
                sortBy: "relevancy",
                page: 1
            })
            // then based on the news find hashtags
            .then(response => {
                let url = response.articles[0].url;

                // here it implements the hashtags search, this functon requires a call back
                textapi.hashtags({
                        url: url
                    },
                    function (error, response) {
                        if (error === null) {
                            let allHashtags = response.hashtags;
                            let search = response.hashtags[0];
                        // once we got hashtags now we fetch the tweets
                            T.get(
                                "search/tweets", {
                                    q: `${search} since:2017-01-11`,
                                    count: 10,
                                    language: "en"
                                },
                                function (err, data, response) {
                                    res.send({
                                        data,
                                        allHashtags
                                    });
                                }
                            );
                        }
                    }
                );
            });
        }catch(e){
            res.status(404).send("Something happened while getting tweets and hashtags")
        }
    },

    // getting tweets based on selected hashtags
    getSpecificTweet(req, res) {
        try{

       
        let hash = req.body.hash;
        T.get(
            "search/tweets", {
                q: `${hash} since:2017-01-11`,
                count: 10,
                language: "en"
            },
            function (err, data, response) {
                res.send({
                    data
                });
            }
        );
    }catch(e){
        res.status(404).send("Something happened while getting specific tweets")
    }
    }
};