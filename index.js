import { request } from 'https';

const express    = require('express')
const bodyParser = require('body-parser')
require('./db');
const app = express();
const router = require('./api');

app.use(bodyParser.json());

app.use('*', function(req, res, next) {
    console.log('Request URL: ', req.originalUrl,'Request Type:', req.method, ' Time :' , new Date());
    next();
});

console.log(router);



