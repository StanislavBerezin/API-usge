const homePageController = require('./controllers/homePageController')

///news API  cad9e31e69314091a346a5063a63d791
module.exports = (app) => {

    app.get('/', 
            homePageController.displayWelcome)
}