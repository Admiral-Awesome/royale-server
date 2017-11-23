const request = require('request');
const cron = require('node-cron');
const async = require('async');
const ONE_SIGNAL = require('../constants').ONESIGNAL;
const CRON = require('../constants').CRON;
const Notification = require('../models').Notification;




const startCron = () => {
    cron.schedule(`*/${CRON.TIME} * * * *`, () => {
        console.log('CRON STARTED ', new Date());
        const now = new Date();
        const nowMinusCron = new Date();
        nowMinusCron.setMinutes(now.getMinutes() - 60);
        const findObj = {
            time: {
                "$gte": nowMinusCron, "$lt": now
            }
        };
        Notification.find(findObj, (err, results) => {
            if (err || results.length === 0)
                return;
            const finalResults = [];
            const gamesIds = [];
            results.forEach(element => {
                let index = gamesIds.indexOf(element.game_id);

                if (index === -1) {
                    gamesIds.push(element.game_id);
                    index = gamesIds.length - 1;
                    finalResults[index] = {};
                    finalResults[index].devices = [element.device_id];
                    finalResults[index].message = element.game_text;
                    finalResults[index].data = { "id": element.game_id };
                } else {
                    finalResults[index].devices.push(element.device_id);
                }

            });

            console.log(finalResults);
            async.parallel(finalResults.map(val => {
                return function (callback) {
                    const data = {
                        "contents": { "en": val.message },
                        "app_id": ONE_SIGNAL.ID,
                        "include_player_ids": val.devices,
                        "data": val.data
                    };
                    request({
                        headers: {
                            "Authorization": `Basic ${ONE_SIGNAL.KEY}`,
                            'Content-Type': 'application/json; charset=utf-8'
                        },
                        uri: ONE_SIGNAL.API_URL,
                        json: data,
                        method: 'POST'
                    },(error, response, body) => {
                        console.log(error);
                        console.log(body);
                        callback(null, `done for ${data.data.id}`);
                    });
                }
            }),(err, res) => {
                console.log(err);
                console.log(res);
            })
        });
    });
};
// user.devices.forEach(elem => {
//     formData.append("include_player_ids[]", elem);
//   });
//   formData.append("contents[en]", message);
//   formData.append("app_id", ONE_SIGNAL.ID );
//   $http.post(ONE_SIGNAL.API_URL, { contents : { en  : message},"app_id" : ONE_SIGNAL.ID, include_player_ids : user.devices, data : { id : myId }}, { headers : {
//     "Content-Type" : "application/json; charset=utf-8",
//     "Authorization" : `Basic ${ONE_SIGNAL.KEY}`
//   }})

module.exports = { startCron };