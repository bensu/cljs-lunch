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

app.get('/', (req, res) => {
    const date = new Date();
    request(lunchSuggestion(date), function(error, response, body) {
        res.send("I tried!");
    });
});
app.listen(8888);
