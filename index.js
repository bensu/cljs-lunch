const request = require('request');
const app = require('express')();

const config = require('./config.json');
const restaurants = require('./restaurants.json');

function slackRequest(text) {
    return {
	      url: config.SLACK_WEBHOOK_URL,
	      method: 'POST',
	      body: {
            text: text,
            username: "charlie-lunch",
            channel: "#hooktest"
        },
	      json: true
    }
};

function lunchSuggestion(date) {
    const today = date.getDay();
    const restaurant = restaurants[today];
    const text = "@here Hey guys, today we should eat at " + restaurant.name +
          ": <" + restaurant.url + ">";
    return slackRequest(text);
}

var log = [];

var CronJob = require('cron').CronJob;
new CronJob('00 07 10 * * 1-5', function() {
    const date = new Date();
    request(lunchSuggestion(date), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Sent the request");
        } else {
            log.push(error);
            console.log("Failed for reasons...");
        }
    });
}, null, true, 'America/Los_Angeles');

app.get('/', (req, res) => {
    const date = new Date();
    res.send("I've had some errors " + log.length);
});
app.listen(8888);
