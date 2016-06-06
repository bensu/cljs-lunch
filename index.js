
const config = require('./config.json');

const app = require('express')();

const restaurants = [
    {
        "name": "Palmyra",
        "type": "Mediterranean",
        "url": "https://www.orderaheadapp.com/places/palmyra--san-francisco-ca"
    },
    {
        "name": "Krua Thai",
        "type": "Thai",
        "url": "https://www.orderaheadapp.com/places/krua-thai--san-francisco-ca"
    },
    {
        "name": "Pancho Villa",
        "type": "Mexican",
        "url": "https://www.orderaheadapp.com/places/pancho-villa-taqueria-san-francisco--san-francisco-ca"
    },
    {
        "name": "707 Sutter",
        "type": "Korean",
        "url": "https://www.orderaheadapp.com/places/707-sutter--san-francisco-ca"
    }
];

app.get('/', (req, res) => {
    res.send(config.SLACK_WEBHOOK_URL);
});
app.listen(8888);
