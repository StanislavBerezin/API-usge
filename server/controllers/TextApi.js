var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
    application_id: "883d946f",
    application_key: "a18910bab0bc6b8975c656f03b0c5460"
});



module.exports = {


    // Displaying news    
    async getSummary(req, res) {

        try {
            let text = await textapi.summarize({
                    'url': 'https://edition.cnn.com/2018/09/08/politics/donald-trump-michael-cohen-stormy-daniels/index.html'
                }, (error, response) => {
                    if (error === null) {
                        console.log("good")
                    }
                    res.send(response.sentences)
                
            })

        

    } catch (err) {
        res.send('failed')
    }







}

}