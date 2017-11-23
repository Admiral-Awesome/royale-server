const express    = require('express')
const bodyParser = require('body-parser')
require('./db');
const app = express();
const routerNotification = require('./api').notificationRouter;
const cron = require('./cron');
const port    =   process.env.PORT || 8080;
app.use(bodyParser.json());

app.use('*', function(req, res, next) {
    console.log(req.method,': ', req.originalUrl, ' Time :' , new Date());
    next();
});

app.use('/api', routerNotification);

app.listen(port, function() {
    console.log("SERVER STARTED ON PORT ", port);
    cron.startCron();
});