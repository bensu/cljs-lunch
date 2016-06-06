require("clojurescript/register")

const app = require('express')();

const helper = require("helpers");

app.get('/', (req, res) => {
    res.send(helpers.message());
});
app.listen();
