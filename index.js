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
            channel: "#general"
        },
	      json: true
    }
};

function lunchSuggestion(date) {
    const today = date.getDay();
    const restaurant = restaurants[today - 1];
    const text = "Hey guys, today we should eat at " + restaurant.name +
          ": <" + restaurant.url + ">";
    return slackRequest(text);
}

var log = [];

function makeSuggestion() {
    const date = new Date();
    request(lunchSuggestion(date), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Sent the request");
        } else {
            log.push(error);
            console.log("Failed for reasons...");
        }
    });
}

makeSuggestion();
