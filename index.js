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



let arr = [{ name : 'test'}, { name : 'test1'}, { name: 'test'}];

let nameArr = [];  
arr.forEach(el => !nameArr.includes(el.name) && nameArr.push(el.name) );

console.log(nameArr);