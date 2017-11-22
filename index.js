const express    = require('express')
const bodyParser = require('body-parser')
require('./db')
var app = express()

// parse application/json
app.use(bodyParser.json())