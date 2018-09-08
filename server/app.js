//packages
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const config = require('./config/config')
//will need sequalise(SQL) at some point later




const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(helmet())
app.use(cors())


//requireing app and passing the object of this app
require('./routes')(app)



app.listen(config.port, function(err){
	if (err) throw err;
	console.log("Server started on port " + config.port);
});

